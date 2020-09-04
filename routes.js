const express = require('express');
const router = express.Router();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const passport = require('passport')
const AuthController = require('./controllers/authController');
const PostController = require("./controllers/postController");
const MessageController = require("./controllers/messageController");

router.post("/login", AuthController.index);
router.get("/posts", PostController.index);
router.post("/posts/create", passport.authenticate('jwt', { session: false }), PostController.store);
//routes.put("posts/update/:id", passport.authenticate('jwt', { session: false }), ItemController.update);
//routes.delete("/posts/delete/:id", passport.authenticate('jwt', { session: false }), ItemController.destroy);
router.post("/contact/messages", MessageController.store);
router.get("/contact/messages", passport.authenticate('jwt', { session: false }), MessageController.index);
module.exports = router;