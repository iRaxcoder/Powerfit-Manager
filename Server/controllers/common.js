const SUCCESS= 1;
const TIP = 0;
const ERROR = -1;
var data = {};
var query = "";
const getSpParamSize = {
    1: '(?)',
    2: '(?,?)',
    3: '(?,?,?)',
    4: '(?,?,?,?)',
    5: '(?,?,?,?,?)',
    6: '(?,?,?,?,?,?)',
    7: '(?,?,?,?,?,?,?)',
    8: '(?,?,?,?,?,?,?,?)',
    9: '(?,?,?,?,?,?,?,?,?)',
    10: '(?,?,?,?,?,?,?,?,?,?)',
    11: '(?,?,?,?,?,?,?,?,?,?,?)',
}

module.exports.set = function(app,connection){
    app.post("/module/get", (req, res) => {
        data=req.body.data;
        connection.query('CALL sp_select_' + data["header"]+'()', (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    })
    app.post("/module/get-search", (req, res) => {
        data=req.body.data;
        connection.query('CALL sp_select_search_' + data["find"]+getSpParamSize["1"], (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    })
    app.post("/module/insert", (req, res) => {
        data=req.body.data;
        query='CALL sp_insert_'+data["header"]+getSpParamSize[data["size"]];
        connection.query(query, Object.values(data["object"]), (err, rows, fields) => {
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
    app.put("/module/put", (req, res) => {
        data=req.body.data;
        query='CALL sp_update_'+data["header"]+getSpParamSize[data["size"]];
        connection.query(query, Object.values(data["object"]), (err, rows, fields) => {
            if (!err) {
                if(rows[0][0].msg===SUCCESS){
                    res.send("Modificado con éxito");
                }else if(rows[0][0].msg===ERROR){
                    res.send("Ha ocurrido un error al modificar");
                }else if (rows[0][0].msg===TIP){
                    res.send("Error. Los datos coinciden con otro registro");
                }
            }
            else {
                console.log(err);
            }
        })
    })
    app.put("/module/delete", (req, res) => {
        data=req.body.data;
        query='CALL sp_delete_'+data["header"]+getSpParamSize["1"];
        console.log(Object.values(data["object"]));
        connection.query(query, Object.values(data["object"]), (err, rows, fields) => {
            if (!err) {
                if(rows[0][0].msg===SUCCESS){
                    res.send("Eliminado con éxito");
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