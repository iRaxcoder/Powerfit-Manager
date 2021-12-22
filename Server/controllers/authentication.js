module.exports.set = function(app,connection){
    app.post('/aut/iniciar-sesion', function(request, response) {
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
            connection.query('CALL sp_INICIAR_SESION(?,?)', [username, password], function(error, results, fields) {
                if (results[0][0]!=null) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.send("1");
                } else {
                    response.send("Los datos de inicio no coinciden");
                }	
                response.end();
            });
        } else {
            response.send('Datos erróneos');
            response.end();
        }
    });

    app.get('/aut/cerrar-sesion', function (req, res) {
        if (req.session.loggedin) {
            req.session.destroy(function() {
                delete req.session.username;
                req.session.loggedin = false;
                res.clearCookie('connect.sid', { path: '/' });           
            });
        } else {
            res.send('No se ha podido cerrar la sesión', 500); // public sessions don't containt sensible information so we leave them
        }
    });

    app.get('/aut/validar', function (req, res) {
        if(req.session.loggedin){
            res.status(200).send("Se encuentra dentro del sistema")
        }else{
            res.status(200).send("Se encuentra fuera del sistema")
        }
    });
}