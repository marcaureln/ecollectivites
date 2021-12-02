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
