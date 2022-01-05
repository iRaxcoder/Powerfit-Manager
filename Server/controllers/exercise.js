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
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    })
    
}