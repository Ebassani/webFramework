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
const auth = require('./controllers/auth')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(blogRoutes)

app.use('/users', usersRouter);

mongoose.connect(uri)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
})
.catch(err => console.error(err));

app.get('/hello', async (req, res) => {
  const correct = await auth.validateUser('eduardo', 'tantofaz');
  res.json({msg: correct})
})