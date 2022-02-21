module.exports.set = function(app,connection){
    app.post(process.env.BASE_URL+'/aut/iniciar-sesion', function(request, response) {
        var username = request.body.username;
        var password = request.body.password;
        if (username && password) {
            connection.query('CALL sp_INICIAR_SESION(?,?)', [username, password], function(error, results, fields) {
                if (results[0][0]!=null) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    request.session.save(()=>{});
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

    app.get(process.env.BASE_URL+'/aut/cerrar-sesion', function (req, res) {
        if (req.session.loggedin===true) {
            console.log("sesion cerrada");
            req.session.destroy(function() {
                req.session=null;
                res.clearCookie('PowerFit-server-cookie', { path: '/' });           
            });
        } else {
            res.status(500).send('No se ha podido cerrar la sesión');
        }
    });

    app.get(process.env.BASE_URL+'/aut/validar', function (req, res) {
        if(req.session.loggedin){
            res.status(200).send("Se encuentra dentro del sistema")
        }else{
            res.status(200).send("Se encuentra fuera del sistema")
        }
    });
}