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
    app.post("/ejercicio/post", (req, res) => {
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
    
}