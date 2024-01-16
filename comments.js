// create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//var db = require('./db.js');
var mongoose = require('mongoose');
var Comment = require('./models/comment.js');
var User = require('./models/user.js');
var Post = require('./models/post.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
var moment = require('moment');
var methodOverride = require('method-override');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var _ = require('underscore');
var sanitizeHtml = require('sanitize-html');
var helmet = require('helmet');
var compression = require('compression');
var sharp = require('sharp');
var Jimp = require('jimp');
var moment = require('moment');

var port = process.env.PORT || 3000;

// connect to mongo db
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// set up express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(helmet());
app.use(compression());
app.use(flash());

// set up session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// set up passport local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
app.use(function(req, res, next) {
  //res.locals.currentUser = req.user;
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// set up ejs
app.set

