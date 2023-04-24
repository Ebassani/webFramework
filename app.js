const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000
const uri = fs.readFileSync('secrets.txt').toString()

const blogRoutes = require('./routes/blog')
const usersRouter = require('./routes/users')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(blogRoutes)

// app.use(usersRouter)

mongoose
	.connect(uri)
	.then(app.listen(PORT))
	.catch(err => {
		console.log(err)
	})
