const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const { restart } = require('nodemon');
const { response } = require('express');
const controllers = require('./controllers/index')
const session= require('express-session');
require('dotenv').config();

const port = process.env.port

const app = express()

const cors = require('cors');
const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
