const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000
const uri = fs.readFileSync('secrets.txt').toString()
const session = require('express-session');

const blogRoutes = require('./routes/blog')
const usersRouter = require('./routes/users')
const commentsRouter = require('./routes/comments')
const topicsRouter = require('./routes/topics')
const auth = require('./controllers/auth')
const profileRoutes = require('./routes/profile')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(blogRoutes)
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/topics', topicsRouter);
app.use('/profile', profileRoutes)

app.get('/login', function(req, res){
  res.render(__dirname +  '/views/login/login.ejs')
})
app.post('/login', async (req, res) => {
  const body = req.body 
  const correct = await auth.validateUser(body.username, body.password);
  if(correct){
    req.session.loggedIn = true;
    req.session.username = body.username

    res.redirect('/')
  }
  else{
    res.render(__dirname + '/views/login/login.ejs')
  }
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
