module.exports.set = function(app,connection){
    app.get(process.env.BASE_URL+'/user/hello', (req, res) => res.send('Hello World from client.js!'))
}