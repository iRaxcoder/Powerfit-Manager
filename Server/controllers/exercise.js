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
}