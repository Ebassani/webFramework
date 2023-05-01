const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000
const uri = fs.readFileSync('secrets.txt').toString()

const blogRoutes = require('./routes/blog')
const usersApiRouter = require('./routes/users')
const commentsApiRouter = require('./routes/comments')
const topicsApiRouter = require('./routes/topics')
const cardsApiRouter = require('./routes/topics')

const auth = require('./controllers/auth')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(blogRoutes)
app.use('/api/users', usersApiRouter);
app.use('/api/comments', commentsApiRouter);
app.use('/api/topics', topicsApiRouter);
app.use('/api/cards', cardsApiRouter);

app.get('/login', function(req, res){
  res.render(__dirname +  '/views/login/login.ejs')
})
app.post('/login', async (req, res) => {
  const body = req.body 
  const correct = await auth.validateUser(body.username, body.password);
  res.json({msg: correct})
})
app.get('/register', function (req, res) {
  res.render(__dirname + '/views/registration/registration.ejs')
})

mongoose.connect(uri)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
})
.catch(err => console.error(err));
