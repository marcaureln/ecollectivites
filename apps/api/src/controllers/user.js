exports.changePassword = async function (req, res, next) {
	const { email, currentPassword, newPassword } = req.body;

	if (!email || !currentPassword || !newPassword) {
		return req.status(400).send();
	}

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const match = await bcrypt.compare(currentPassword, user.password);

	if (match) {
		try {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			await prisma.user.update({
				data: { password: hashedPassword, passChangedAt: new Date(), passMaxAge: 99999 },
			});
			return res.status(200).send();
		} catch (error) {
			return res.status(500).send(error.message);
		}
	} else {
		res.status(404).json({ error: 'Passwords do not match' });
	}
};
