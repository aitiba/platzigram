var express = require('express');
var multer = require('multer');
var ext = require('file-extension');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var config = require('./config');
var port = process.env.PORT || 3000;
var platzigram = require('platzigram-client');
var auth = require('./auth');
var client = platzigram.createClient(config.client);

var s3 = new aws.S3({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey,
  endpoint: 's3-eu-central-1.amazonaws.com',
  signatureVersion: 'v4',
  region: 'eu-central-1'
})

var storage = multerS3({
  s3: s3,
  bucket: 'platzigram-aitoribanez',
  acl: 'public-read',
  metadata: function(req, file, cb) {
    cb(null, {fieldName: file.fieldname})
  },
  key: function(req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))

  }
})

/* var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
}) */

var upload = multer({ storage: storage }).single('picture');

var app = express();

// serializa los objetos json
app.set(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveInitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');

app.use(express.static('public'));

passport.use(auth.localStrategy);
passport.deserializeUser(auth.deserializeUser);
passport.serializeUser(auth.serializeUser);

app.get('/', function (req, res) {
  // res.send("Hola mundo!");
  res.render('index', { title: 'Platzigram' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Platzigram - Signup' });
})

app.post('/signup', function (req, res) {
  var user = req.body
  client.saveUser(user, function (err, usr) {
    if (err) return res.status(500).send(err.message);

    res.redirect('/signin');
  })
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'Platzigram - Signin' });
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));

function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send({ error: 'not authenticated' });
}

app.get('/api/pictures', function (req, res) {

    var pictures = [
      {
        user: {
          username: 'aitor',
          avatar: 'https://pbs.twimg.com/profile_images/565680017737125888/ad1qqkg0.jpeg'
        },
        url: 'office.jpg',
        likes: 0,
        liked: false,
        createdAt: new Date().getTime()
      },
      {
        user: {
          username: 'aitor',
          avatar: 'https://pbs.twimg.com/profile_images/565680017737125888/ad1qqkg0.jpeg'
        },
        url: 'office.jpg',
        likes: 1,
        liked: true,
        createdAt: new Date().setDate(new Date().getDate() - 10)
      }
    ];

    setTimeout(function () {
      res.send(pictures);
    }, 2000)

})

app.post('/api/pictures', ensureAuth, function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send("File uploaded");
  })
})

app.get('/user/platzi', function(req, res) {
  res.render('index');
})

app.listen(3000, function(err) {
  if (err) return console.log('ERROR'), process.exit(1);

  console.log('Escuchando en el puerto 3000');
})
