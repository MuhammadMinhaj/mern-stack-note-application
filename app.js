require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('express')
const cors = require('cors')
const app = express()

const setMiddlewares = require('./api/middlewares/middleware')
const setRoutes = require('./api/routes/routes')

app.use(helmet())
app.use(cors())


setMiddlewares(app)
setRoutes(app)

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Database Connection Established')
		const PORT = process.env.PORT || 8080
		app.listen(PORT, () => {
			console.log(`Server Is Running On Port ${PORT}`)
		})
	})
	.catch(error => {
		console.log('Failed To Database Connection!', error)
	})
