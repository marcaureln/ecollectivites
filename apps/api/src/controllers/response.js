const { PrismaClient } = require('@prisma/client');
const { ac } = require('../helpers/accesscontrol');
const { AppError } = require('../helpers/error');
const { sendSMS, sendMail } = require('../helpers/messaging');

/** @type { PrismaClient } **/
const prisma = require('../helpers/prisma').default;

exports.makeResponse = async function (req, res, next) {
  const userId = req.auth.userId;
  const { resContent, reqId } = JSON.parse(req.body.data);

  try {
    if (!resContent || !reqId) {
      throw new AppError(400, 'Missing required fields');
    }

    const resAttachments = req.files.reduce((list, file) => (list += `${file.location};`), '');
    const request = await prisma.request.findUnique({ where: { reqId } });

    if (!request) {
      throw new AppError(404, 'Request not found');
    }

    const response = await prisma.response.create({
      data: {
        resContent,
        resAttachments,
        reqId,
        userId,
      },
    });

    // Fetch all participants
    const responses = await prisma.response.findMany({ where: { reqId: request.reqId } });
    let participants = responses.map((response) => response.userId);
    participants.push(request.userId);
    participants = [...new Set(participants)];

    // Send them an SMS or an email
    for (const participant of participants) {
      const user = await prisma.user.findUnique({ where: { userId: participant } });

      if (user.phone) {
        sendSMS(`+225${user.phone}`, `La requête ${request.reqId} vient de recevoir une réponse.`);
      } else if (user.email) {
        sendMail(
          user.email,
          `La requête ${request.reqId} vient de recevoir une réponse.`,
          "Connectez-vous au portail eCollectivités pour consulter l'avancement de la requête."
        );
      }
    }

    res.status(201).json({ response });
  } catch (error) {
    next(error);
  }
};

exports.getResponse = async function (req, res, next) {
  const userId = req.auth.userId;
  const resId = req.params.id;

  try {
    if (!resId) {
      throw AppError(400, 'Missing required fields');
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    const response = await prisma.response.findUnique({ where: { resId } });

    if (!response) {
      throw new AppError(404, 'Response not found');
    }

    const isOwn = response.userId === user.userId || (await isSameCollectivite(user, response.userId));
    const permission = isOwn ? ac.can(req.auth.role).readOwn('response') : ac.can(req.auth.role).readAny('response');

    if (!permission.granted) {
      throw new AppError(403, 'Forbidden');
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
