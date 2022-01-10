const client = require('./client')
const assistence = require('./assistance')
const exercise = require('./exercise')
const measurement = require('./measurements')
const muscle_group = require('./muscle-group')
const payment = require('./payment')
const routine = require('./routine')
const authentication= require('./authentication');
const commom = require('./common')

//this is middleware
//this function allows to verify if a session is currently active
var auth_validate = function(req, res, next) {
    if (req.session)
      return next();
    else
      return res.sendStatus(401);
};

module.exports.set= function(app,connection){
    commom.set(app,connection)
    client.set(app,connection);
    assistence.set(app,connection);
    exercise.set(app,connection);
    measurement.set(app,connection);
    muscle_group.set(app,connection);
    payment.set(app,connection);
    routine.set(app,connection);
    authentication.set(app,connection);
}