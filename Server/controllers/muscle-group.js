module.exports.set = function (app, connection) {
    app.get("/musculo/get", (req, res) => {
        connection.query('CALL 	sp_select_grupo_muscular()', (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    })

    app.post("/muscle/insert", function(request, response){
        var name = request.body.name;
        connection.query('CALL sp_insert_grupo_muscular(?)',name, function(error,results,fields){
            if (err) throw err;
            response.send("Registro insertado")
            }

        );

    });

    // app.post()
}