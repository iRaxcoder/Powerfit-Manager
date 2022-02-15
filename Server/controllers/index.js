const client = require('./client')
const measurement = require('./measurements')
const routine = require('./routine')
const authentication= require('./authentication');
const commom = require('./common');
const sales = require('./sales');
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
    measurement.set(app,connection);
    routine.set(app,connection);
    authentication.set(app,connection);
    sales.set(app,connection);
}