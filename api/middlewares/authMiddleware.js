const jwt = require('jsonwebtoken')
const User = require('../../models/User')
exports.isAuthenticated = async (req, res, next) => {
	try {
		const token = req.header('x-auth-token')
		if (!token) {
			return res.status(401).json({ message: 'Unauthenticated User' })
		}

		const verified = jwt.verify(token, process.env.TOKEN_SECRET)

		if (!verified) {
			return res.status(401).json({ message: 'Invalid Token' })
		}

		const hasUser = await User.findById(verified.token)

		if (!hasUser) {
			return res.status(401).json({ message: 'Unauthenticated User --access-denied' })
		}
		next()
	} catch (error) {
        res.status(500).json(error)
    }
}
