
var routineId=0;

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
    app.post("/routine/insert", (req, res) => {
        data = req.body.data;
        connection.beginTransaction(async (err) => {
            if (err) {
                throw err;
            }
            query = 'CALL sp_insert_rutina' + getSpParamSize[data["size"]];
            connection.query(query, Object.values(data["generalInfo"]), (err, rows, fields) => {
                if (!err) {
                    routineId = rows[0][0].ID_RUTINA;
                } else {
                    connection.rollback(() => {
                        res.send("No se ha registrar la rutina");
                        console.log(err);
                    });
                }
                query = 'INSERT INTO tb_rutina_ejercicio (ID_RUTINA,ID_EJERCICIO,DIA,INDICACIONES) VALUES ?';
                var generalExerciseList = data["exerciseList"];
                var exerciseListInsert = [generalExerciseList.length];
                for (var i = 0; i < generalExerciseList.length; i++) {
                    exerciseListInsert[i] = [routineId, generalExerciseList[i].idExercise, generalExerciseList[i].day, generalExerciseList[i].details];
                }
                connection.query(query, [exerciseListInsert], (err, rows, fields) => {
                    if (err) {
                        connection.rollback(() => {
                            res.send("No se ha podido registrar la rutina.");
                            console.log(err);
                        })
                    }
                    connection.commit((err) => {
                        if (!err) {
                            res.send("rutina realizada con éxito.");
                        } else {
                            connection.rollback(() => {
                                res.send("No se ha podido realizar la rutina.");
                                console.log(err);
                            })
                        }
                    })
                });
            });
        })
    });
    app.post("/routine/get-search", (req, res) => {
        data = req.body.data;
        connection.query('CALL sp_select_search_rutina_fecha'+getSpParamSize["2"], [data["find"],data["filter"]], (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            }
            else {
                console.log(err);
            }
        })
    })
}