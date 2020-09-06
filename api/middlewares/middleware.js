const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)


const store = new MongoDBStore({
	uri:process.env.DB_URI,
	collection:'sessions'
})

const middlewares = [
    express.urlencoded({ extended: false }),
	express.json(),
	session({
		secret:process.env.SECRET_KEY,
		resave:false,
		saveUninitialized:true,
		cookie:{
			maxAge:60*60*1000*2
		},
		store
	})
]

module.exports = app => {
	middlewares.forEach(m => {
		app.use(m)
		if (process.env.NODE_ENV === 'development') {
			app.use(morgan('dev'))
		}
	})
}
