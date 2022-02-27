const jwtAgentAuthSecret = process.env.JWT_AGENT_AUTH_TOKEN_SECRET;
const jwtAgentAuthTokenValidity = process.env.JWT_AGENT_AUTH_TOKEN_VALIDITY;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../helpers/db');

exports.login = async function (req, res, next) {
	const { agent_num, password } = req.body;

	if (!agent_num || !password) {
		return res.status(400).send();
	}

	const { rows } = await db.query('SELECT * FROM agent WHERE agent_num = $1', [agent_num]);

	if (rows.length <= 0) {
		return res.status(404).json({ error: 'No user found' });
	}

	const hashedPassword = rows[0].password;

	if (!hashedPassword) {
		return res.status(404).json({ set_password: true, error: 'No password set' });
	}

	const match = await bcrypt.compare(password, hashedPassword);

	if (match) {
		const { agent_num, agentfirstname, agentlastname, agentrole, collectid } = rows[0];
		const token = jwt.sign({ agent_num }, jwtAgentAuthSecret, { expiresIn: jwtAgentAuthTokenValidity });
		res.status(200).json({ agent_num, agentfirstname, agentlastname, agentrole, collectid, token });
	} else {
		res.status(401).json({ error: 'Incorrect password' });
	}
};

exports.setPassword = async function (req, res, next) {
	const { agent_num, password } = req.body;

	if (!agent_num || !password) {
		return req.status(400).send();
	}

	const { rows } = await db.query('SELECT * FROM agent WHERE agent_num = $1', [agent_num]);

	if (rows.length <= 0) {
		return res.status(404).json({ error: 'No user found' });
	}

	if (rows[0].password) {
		return res.status(401).json({ error: 'Password already set' });
	}

	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		await db.query('UPDATE public.agent SET password = $1 WHERE agent_num = $2', [hashedPassword, agent_num]);
		return res.status(200).send();
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

exports.sendMessage = async function (req, res, next) {
	const { agent_num, recipient, msgcontent } = req.body;

	try {
		await db.query('INSERT INTO message (msgcontent, msgsenddate, agent_num, recipient) VALUES ($1, $2, $3, $4)', [
			msgcontent,
			new Date(),
			agent_num,
			recipient,
		]);
		return res.status(200).send();
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

exports.getPenPals = async function (req, res, next) {
	const { agent_num } = req.body;

	try {
		const { rows } = await db.query('SELECT agent_num, recipient FROM message WHERE agent_num = $1 OR recipient = $1', [
			agent_num,
		]);
		let penpals = rows.map((row) => Object.values(row));
		penpals = [...new Set(penpals.flat())].filter((recipient) => recipient != agent_num);
		return res.status(200).json(penpals);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

exports.getConversation = async function (req, res, next) {
	const { agent_num, penpal } = req.body;

	try {
		const { rows } = await db.query(
			'SELECT * FROM message WHERE agent_num = $1 AND recipient = $2 OR agent_num = $2 AND recipient = $1 ORDER BY msgsenddate',
			[agent_num, penpal]
		);
		return res.status(200).json(rows);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

exports.getAgentInfo = async function (req, res, next) {
	const agent_num = req.params.num;

	try {
		const { rows } = await db.query(
			'SELECT agent_num, agentfirstname, agentlastname, agentrole, collect_id FROM agent WHERE agent_num = $1',
			[agent_num]
		);
		if (rows.length < 1) {
			return res.status(404).send('No agent found');
		}
		return res.status(200).json(rows[0]);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

exports.searchAgent = async function (req, res, next) {
	const query = req.query.q;

	if (!query) {
		return res.status(400).send('Invalid request');
	}

	try {
		const { rows } = await db.query(
			'SELECT agent_num, agentfirstname, agentlastname, agentrole, agent.collect_id, collectname FROM agent, collectivite WHERE agent.collect_id = collectivite.collect_id AND (LOWER(agent_num) = $1 OR LOWER(collectname) LIKE $1 OR LOWER(agentfirstname) LIKE $1 OR LOWER(agentlastname) LIKE $1)',
			[query.toLowerCase()]
		);
		if (rows.length < 1) {
			return res.status(404).send('No results');
		}
		return res.status(200).json(rows);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};
