const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

exports.singupPostController = async (req, res, next) => {
	try {
		const { name, username, email, phone, password, country, gender, birthday } = req.body

		const error = {}

		const msg = 'Please Provied Your'
		if (!name) {
			error.name = `${msg} Name`
		}
		if (!username) {
			error.username = `${msg} Username`
		} else if (username.length > 16) {
			error.username = 'Username Must Be Between 6 to 16 charcs'
		}
		if (!email) {
			error.email = `${msg} Email`
		} else if (!email.includes('@' || !email.includes('.'))) {
			error.email = 'Please Provied Your Valid Email'
		}
		if (!phone) {
			error.phone = `${msg} Phone`
		} else if (phone.length > 11) {
			error.phone = 'Please Provied Valid Phone'
		}
		if (!password) {
			error.password = `${msg} Password`
		} else if (!password.length > 5) {
			error.password = 'Password Mast Be Greater The Five Charc'
		}
		if (!country) {
			error.country = 'Please Select Your Country'
		}
		if (!gender) {
			error.gender = 'Please Select Your Gender'
		}
		if (!birthday) {
			error.birthday = `${msg} Birthday`
		}
		if (Object.keys(error).length !== 0) {
			return res.status(400).json({ message: 'Invalid Creadentuals!', error })
		}

		const hasPassword = await bcrypt.hash(password, 11)

		const createUser = new User({
			name,
			username,
			email,
			phone,
			password: hasPassword,
			gender,
			country,
			birthday,
		})
		const createdUser = await createUser.save()

		if (!createdUser) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
		res.status(201).json({ message: 'Successfully Created Account' })
		console.log('Successfully Created Account!')
	} catch (e) {
		next(e)
	}
}

exports.loginPostController = async (req, res, next) => {
	try {
		const { type, password } = req.body

		const user = await User.findOne({ email: type })

		if (!user) {
			return res.status(404).json({ message: 'User Not Available' })
		}

		const isMatched = await bcrypt.compare(password, user.password)

		if (!isMatched) {
			return res.status(422).json({ message: 'Invalid Password!' })
		}

		// req.session.save(error=>{
		// 	if(error){
		// 		return res.status(500).json({message:'Internal Server Error'})
		// 	}
		// 	req.session.isLoggedIn = true
		// 	req.session.user = user
		// 	res.status(200).json({message:'Successfully Login'})
		// })

		const token = jwt.sign({ token: user._id }, process.env.TOKEN_SECRET, { expiresIn: '12h' })

		res.status(200).json({
			user: {
				id: user._id,
				name: user.name,
				username: user.username,
				gender: user.gender,
			},
			token,
		})
	} catch (e) {
		next(e)
	}
}
exports.verifyTokenGetController = async (req, res, next) => {
	try {
		const token = req.header('x-auth-token')
		if (!token) return res.json(false)
		res.json(true)
	} catch (e) {
		next(e)
	}
}

exports.userGetController = async (req, res, next) => {
	try {
		const token = req.header('x-auth-token')
		if (!token) {
			return res.status(401).json({ message: 'Unauthenticated User' })
		}
		const verified = jwt.verify(token, process.env.TOKEN_SECRET)

		if (verified) {
			const hasUser = await User.findById(verified.token)

			if (!hasUser) {
				return res.status(401).json({ message: 'Unauthenticated User --access-denied' })
			}
			res.status(200).json({
				token,
				user: {
					name: hasUser.name,
					username: hasUser.username,
					email: hasUser.email,
					gender: hasUser.gender,
				},
			})
		}
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
}
