const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const { restart } = require('nodemon');
const { response } = require('express');
const controllers = require('./controllers/index')
const session= require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.port

const app = express()
app.use(cookieParser());
app.use(session({
    name:"PowerFit-server-cookie",
	secret: '123abcuuid',
	resave: true,
	saveUninitialized: true,
    cookie: {
    path: '/',
    //   httpOnly: true,
      secure: false,
    }
}));
var productionOrigin='http://localhost:3000';
// productionOrigin='http://localhost/powerfitmanagerclient';
const cors = require('cors');
const corsOptions = {
    origin:productionOrigin, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(error=>{
    if(error)throw error;
    console.log('connection succeed!')
});

controllers.set(app,connection);

app.listen(process.env.PORT ||3050)
