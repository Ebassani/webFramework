const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const blogRoutes = require('./routes/blog')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', 'views')

// app.use(blogRoutes)
app.get('/', (req, res) => {
	res.render('index')
})

app.listen(3000)
