require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
require('./auth/auth');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

app.use(cors())
//   ({
//   credentials: true,
//   origin: ['https://portfolio-frontend-ten.vercel.app/']
// }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())
app.use(routes)

//Handle errors
app.use(function (err, req, res, next) {
    res.json({ error: err });
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started')
});

module.exports = app