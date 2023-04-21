const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const mongoose = require('mongoose');
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const uri = fs.readFileSync("secrets.txt").toString();

const blogRoutes = require('./routes/blog')

mongoose.connect(uri)

.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
})
.catch(err => console.error(err));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', 'views')

// app.use(blogRoutes)
app.get('/', (req, res) => {
  res.render('index')
})

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

