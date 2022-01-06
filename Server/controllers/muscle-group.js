module.exports.set = function (app, connection) {
    app.get("/musculo/get", (req, res) => {
        connection.query('CALL 	sp_select_grupo_muscular()', (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log("Ocurrio un error");
            }
        })
    })

    app.post("/muscle/insert", function(request, response){
        var name = request.body.name;
        connection.query('CALL sp_insert_grupo_muscular(?)',name, function(error,results,fields){
            if (error) throw error;
            response.send("Registro insertado")
            }

        );

    });

    app.put("/muscle/update", function(request, response){
        var id = request.body.id;
        var name = request.body.name;
        
        connection.query('CALL sp_update_grupo_muscular(?,?)',[id, name], function(error,results,fields){
            if (!error) {
                response.send("Actualización exitosa");
            }
            else {
                response.send("Ocurrio un error");
            }

        });

    });

    app.put("/muscle/delete", function(request, response){
        var id = request.body.id;
         connection.query('CALL sp_delete_grupo_muscular(?)',[id], function(error,results,fields){
            if (!error) {
                response.send("Se borro exitosamente");
            }
            else {
                response.send("Ocurrio un error");
            }

        });

    });

    
}