const client = require('./client')
const assistence = require('./assistance')
const exercise = require('./exercise')
const measurement = require('./measurements')
const muscle_group = require('./muscle-group')
const payment = require('./payment')
const routine = require('./routine')

module.exports.set= function(app,connection){
    client.set(app,connection);
    assistence.set(app,connection);
    exercise.set(app,connection);
    measurement.set(app,connection);
    muscle_group.set(app,connection);
    payment.set(app,connection);
    routine.set(app,connection);
}