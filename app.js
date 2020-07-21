const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');

var PORT = process.env.PORT || 3000;

mongoose.connect(config.database);
let db = mongoose.connection;


//init app
const app = express();

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//app.use(require('connect').bodyParser());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express session  middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//Express messages Middleware
app.use(require('connect-flash')());
app.use(function (req,res,next) {
    res.locals.messages = require('express-messages')(req,res);
    next();
});

//Express validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
            ,root = namespace.shift()
            ,formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value:value
        };
    }
}));

//Passport config
require('./config/passport')(passport);

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req,res,next) {
   res.locals.user = req.user || null;
   next();
});



//Home route
app.get('/', function(req,res){
    res.json({
        message: "Welcome!!!"
    })
});

//each funtion page route


//use routes

const users = require('./routes/users');
const product = require('./routes/product')
const deal = require('./routes/deal');
const category = require('./routes/category');
const shop = require('./routes/shop')

app.use('/users', users);
app.use('/product', product);
app.use('/deal', deal);
app.use('/category', category);
app.use('/shop', shop)

//start server
app.listen(PORT, function() {
    console.log('server running at port 3000...')
});
