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
	write_to_mayor: 'Écrire au maire',
	report_incident: 'Signaler un incident',
	question: 'Poser une question',
	feedback: 'Commentaires',
	complaint: 'Plainte',
	other: 'Autre',
};

exports.makeRequest = async function (req, res, next) {
	const { user_id, reqtype, reqdesc, collect_id } = req.body;

	if (!user_id || !reqtype || !reqdesc || !collect_id) {
		return res.status(400).send();
	}

	if (!REQUEST_TYPE[reqtype]) {
		return res.status(400).json({ error: 'Invalid request type' });
	}

	try {
		const queryResult = await db.query(
			'INSERT INTO request (reqstatus, reqtype, reqcreatedate, reqdescription, user_id, collect_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING num_req, reqstatus',
			[REQUEST_STATUS.open, REQUEST_TYPE[reqtype], new Date(), reqdesc, user_id, collect_id]
		);
		const { num_req, reqstatus } = queryResult.rows[0];
		res.status(201).json({ numReq: num_req, reqStatus: reqstatus });
	} catch (e) {
		res.status(500).send();
	}
};

exports.getRequest = async function (req, res, next) {
	const user_id = req.query.user_id;
	const num_req = req.params.numreq;

	if (!user_id || !num_req) {
		return res.status(400).send();
	}

	try {
		const queryResult = await db.query(
			'SELECT num_req, reqstatus, reqtype, reqcreatedate, reqclosingdate, reqdescription, reqattachments, user_id, collect_id FROM request WHERE user_id = $1 AND num_req = $2',
			[user_id, num_req]
		);
		if (queryResult.rowCount < 1) {
			res.status(404).send();
		} else {
			res.status(200).json(queryResult.rows[0]);
		}
	} catch {
		res.status(500).send();
	}
};

exports.getRequests = async function (req, res, next) {
	const user_id = req.query.user_id;

	if (!user_id) {
		return res.status(400).send();
	}

	try {
		const queryResult = await db.query(
			'SELECT num_req, reqstatus, reqtype, reqcreatedate, reqclosingdate, reqdescription, reqattachments, user_id, request.collect_id, collectname FROM request LEFT JOIN collectivite ON request.collect_id = collectivite.collect_id WHERE user_id = $1',
			[user_id]
		);
		res.status(200).json(queryResult.rows);
	} catch {
		res.status(500).send();
	}
};

exports.requestTypes = function (req, res, next) {
	let list = [];
	for (let type in REQUEST_TYPE) {
		list.push({ name: type, desc: REQUEST_TYPE[type] });
	}
	res.status(200).json(list);
};
