module.exports.set = function(app,connection){
    app.get('/user/hello', (req, res) => res.send('Hello World from client.js!'))
}