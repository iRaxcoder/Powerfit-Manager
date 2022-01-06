const SUCCESS= 1;
const TIP = 0;
const ERROR = -1;
module.exports.set = function(app,connection){
    app.get("/ejercicio/get", (req, res) => {
        connection.query('CALL sp_select_ejercicio()', (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    })
    app.post("/ejercicio/insert", (req, res) => {
        var exercise= req.body.object;
        connection.query('CALL sp_insert_ejercicio(?,?)', [exercise.exercise, exercise.muscule_group], (err, rows, fields) => {
            if (!err) {
                if(rows[0][0].msg===SUCCESS){
                    res.send("Agregado con éxito");
                }else if(rows[0][0].msg===ERROR){
                    res.send("Ha ocurrido un error al agregar");
                } 
            }
            else {
                console.log(err);
            }
        })
    })
    app.put("/ejercicio/put", (req, res) => {
        var exercise= req.body.object;
        console.log(exercise);
        connection.query('CALL sp_update_ejercicio(?,?,?)', [exercise.id,exercise.exercise, exercise.muscleGroup], (err, rows, fields) => {
            if (!err) {
                if(rows[0][0].msg===SUCCESS){
                    res.send("modificado con éxito");
                }else if(rows[0][0].msg===ERROR){
                    res.send("Ha ocurrido un error al modificar");
                }else if (rows[0][0].msg===TIP){
                    res.send("Error. Los datos coinciden con otro ejercicio");
                }
            }
            else {
                console.log(err);
            }
        })
    })
    app.put("/ejercicio/delete", (req, res) => {
        var id= req.body.id;
        console.log(id)
        connection.query('CALL sp_delete_ejercicio(?)', [id], (err, rows, fields) => {
            if (!err) {
                if(rows[0][0].msg===SUCCESS){
                    res.send("eliminado con éxito");
                }else if(rows[0][0].msg===ERROR){
                    res.send("Ha ocurrido un error al modificar");
                } 
            }
            else {
                console.log("error de bd:"+err);
            }
        })
    })
    
}