const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const { restart } = require('nodemon');
const { response } = require('express');
const controllers = require('./controllers/index')

const port = process.env.port || 3050;

const app = express()

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: '163.178.107.10',
    user: 'laboratorios',
    password: 'KmZpo.2796',
    database: 'powerfit_manager_tcu'
});

connection.connect(error=>{
    if(error)throw error;
    console.log('connection succeed!')
});

controllers.set(app,connection);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
