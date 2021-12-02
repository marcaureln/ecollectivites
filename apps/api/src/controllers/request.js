const { query } = require('express');
const db = require('../helpers/db');

exports.makeRequest = async function (req, res, next) {
	const { user_id, reqtype, reqdesc, collect_id } = JSON.parse(req.body.data);

	if (!user_id || !reqtype || !reqdesc || !collect_id) {
		return res.status(400).send();
	}

	if ((await db.query('SELECT * FROM request_type WHERE req_type_id = $1', [reqtype])).rows < 1) {
		return res.status(400).json({ error: 'Invalid request type' });
	}

	let reqattachements = '';

	for (const file of req.files) {
		reqattachements += file.path + ';';
	}

	try {
		const queryResult = await db.query(
			'INSERT INTO request (reqstatus, reqtype, reqcreatedate, reqdescription, reqattachments, user_id, collect_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING num_req, reqstatus',
			[1, reqtype, new Date(), reqdesc, reqattachements, user_id, collect_id]
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
		const queryString = `SELECT num_req, labelreqstatus AS reqstatus, labelreqtype AS reqtype, reqcreatedate, reqclosingdate, reqdescription, reqattachments, user_id, request.collect_id, collectname
		FROM request
			LEFT JOIN collectivite ON request.collect_id = collectivite.collect_id
			LEFT JOIN request_status rs on request.reqstatus = rs.req_status_id
			LEFT JOIN request_type rt on request.reqtype = rt.req_type_id
		WHERE user_id = $1 AND num_req = $2
		`;
		const queryResult = await db.query(queryString, [user_id, num_req]);
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
		const queryString = `SELECT num_req, labelreqstatus AS reqstatus, labelreqtype AS reqtype, reqcreatedate, reqclosingdate, reqdescription, reqattachments, user_id, request.collect_id, collectname
		FROM request
			LEFT JOIN collectivite ON request.collect_id = collectivite.collect_id
			LEFT JOIN request_status rs on request.reqstatus = rs.req_status_id
			LEFT JOIN request_type rt on request.reqtype = rt.req_type_id
		WHERE user_id = $1`;
		const queryResult = await db.query(queryString, [user_id]);
		res.status(200).json(queryResult.rows);
	} catch {
		res.status(500).send();
	}
};

exports.requestTypes = async function (req, res, next) {
	try {
		const queryResult = await db.query('SELECT req_type_id AS name, labelreqtype AS desc FROM request_type');
		res.status(200).json(queryResult.rows);
	} catch {
		res.status(500).send();
	}
};
