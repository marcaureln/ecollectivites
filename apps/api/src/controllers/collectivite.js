const db = require('../helpers/db');

exports.getCollectivite = async function (req, res, next) {
	const collect_id = parseInt(req.params.id);

	if (!collect_id) {
		return res.status(400).send();
	}

	const queryResult = await db.query(
		'SELECT collect_id, collectname, collecttype FROM collectivite, collectivite_type WHERE collect_id = $1 AND collecttype = collectivite_type.collect_type_id',
		[collect_id]
	);

	if (queryResult.rowCount <= 0) {
		return res.status(404).send();
	}

	const collectivite = queryResult.rows[0];
	res.status(200).json(collectivite);
};

exports.getCommunes = async function (req, res, next) {
	const queryResult = await db.query(
		"SELECT collect_id, collectname FROM collectivite, collectivite_type WHERE collecttype = collectivite_type.collect_type_id AND labelcollecttype = 'Commune'"
	);
	const communes = queryResult.rows;
	res.status(200).json(communes);
};

exports.getRegions = async function (req, res, next) {
	const queryResult = await db.query(
		"SELECT collect_id, collectname FROM collectivite, collectivite_type WHERE collecttype = collectivite_type.collect_type_id AND labelcollecttype = 'Région'"
	);
	const regions = queryResult.rows;
	res.status(200).json(regions);
};

exports.getAll = async function (req, res, next) {
	const queryResult = await db.query(
		'SELECT collect_id, collectname, labelcollecttype AS collecttype  FROM collectivite, collectivite_type WHERE collecttype = collectivite_type.collect_type_id'
	);
	const collectivites = queryResult.rows;
	res.status(200).json(collectivites);
};
