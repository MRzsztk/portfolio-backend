//seed the admin & put the password in env
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');

const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync(process.env.PASSWD, salt);

mongoose.connect('mongodb://localhost/myportfolio-backend', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const users = [
  {
    username: 'MRzsztk',
    password: hash
  }
];

const posts = [
  {
    title: 'first',
    tags: ['tag1', 'tag2', 'tag3'],
    content: 'The Oxygen typeface family is created as part of the KDE Project, a libre desktop for the GNU+Linux operating system. The design is optimized for the FreeType font rendering system and works well in all graphical user interfaces, desktops and devices.',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    title: 'second',
    tags: ['tag1', 'tag3'],
    content: 'Lexend is a collection of seven font families intended to improve reading proficiency. As prescription eyeglasses achieve proficiency for persons with short-sightedness, Lexends families were developed using Shaver-Troup Formulations.',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    title: 'third',
    tags: ['tag1', 'tag4'],
    content: 'Lexend is a collection of seven font families intended to improve reading proficiency. As prescription eyeglasses achieve proficiency for persons with short-sightedness, Lexends families were developed using Shaver-Troup Formulations.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

User.insertMany(users)
  .then(users => {
    console.log('Success! Added ' + users.length + ' administrators to the database');
    //mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
  
  BlogPost.insertMany(posts)
    .then(posts => {
      console.log('Success! Added ' + posts.length + ' blog posts to the database');
      mongoose.connection.close();
    })
    .catch(err => {
      console.log(err);
    });