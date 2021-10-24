const db = require('../helpers/db');

const REQUEST_STATUS = {
	open: 'OUVERT',
	pending: 'EN ATTENTE',
	inProgress: 'EN COURS',
	closed: 'FRERMÉ',
};

const REQUEST_TYPE = {
	document: 'État civil',
	authorization: 'Autorisation',
	feedback: 'Commentaires',
	complaint: 'Plainte',
	other: 'Autre',
};

exports.makeRequest = async function (req, res, next) {
	const { userId, reqType, reqDesc, collectId } = req.body;

	if (!userId || !reqType || !reqDesc || !collectId) {
		return res.status(400).send();
	}

	if (!REQUEST_TYPE[reqType]) {
		return res.status(400).json({ error: 'Invalid request type' });
	}

	try {
		const queryResult = await db.query(
			'INSERT INTO request (reqstatus, reqtype, reqcreatedate, reqdescription, user_id, collect_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING num_req, reqstatus',
			[REQUEST_STATUS.open, REQUEST_TYPE[reqType], new Date(), reqDesc, userId, collectId]
		);
		const { num_req, reqstatus } = queryResult.rows[0];
		res.status(201).json({ numReq: num_req, reqStatus: reqstatus });
	} catch (e) {
		res.status(500).send();
	}
};

exports.requestTypes = function (req, res, next) {
	let list = [];
	for (let type in REQUEST_TYPE) {
		list.push({ name: type, description: REQUEST_TYPE[type] });
	}
	res.status(200).json(list);
};
