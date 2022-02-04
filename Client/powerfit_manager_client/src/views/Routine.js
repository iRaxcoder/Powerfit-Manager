import React, { useEffect, useState, useRef } from "react";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import DownloadButton from "../components/DownloadButton";
import {CustomInput, SingleCustomInput, LiveCustomSelect} from "../components/CustomInput";
import commonDB from "../service/CommonDB";
import CancelButton from "../components/CancelButton";
import { exportToPdf, ExportToCsv } from "../utils/exportData";
import moment from "moment/min/moment-with-locales";
import { useForm } from "react-hook-form"
import '../styles/Routine/routine.css'
import RoutineDay from "../components/RoutineDay";

export default function Routine(){
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [routineEdited, setRoutineEdited] = useState({id:0, name:"def", lastName:"def", age:0, number: "def", email:"def", illness: "def"});
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [routineList, setRoutineList] = useState(null);
  const routineListRef= useRef();
  const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});
  routineListRef.current=routineList;
  const [routineHeader,setRoutineHeader]=useState({routineId:0,client:"def",date:"def"});
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [selectedGroupMuscle, setSelectedGroupMuscle] = useState([]);
  const [routineClient, setRoutineClient]= useState({id:"def", name:'def'});
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [selectedDay,setSelectedDay]=useState(1);

//   const dataHeader = [["Nombre","Apellidos","Edad","Teléfono","Correo","Enfermedades"]];

  const columns = React.useMemo(
      () => [
          { Header: "ID rutina", accessor: 'ID_RUTINA',},
          { Header: "Cliente", accessor: 'NOMBRE_CLIENTE'},
          { Header: "Fecha",accessor: 'FECHA'},
        ],
      []
  )

//   const dataHeaderCSV = [ 
//     { label: "ID cliente", key: 'ID_CLIENTE',},
//     { label: "Nombre", key: 'NOMBRE_CLIENTE'},
//     { label: "Apellidos", key: 'APELLIDOS'},
//     { label: "Edad", key: 'EDAD'},
//     { label: "Teléfono", key: 'TELEFONO'},
//     { label: "Email", key: 'EMAIL'},
//     { label: "Enfermedad", key: 'ENFERMEDAD'},
//                       ]
   const formatDate = (e) => {
    e.map(entrada => (
        entrada.FECHA = moment(entrada.FECHA).locale('es').format('LL')
    ))
  }

  const fetchRoutines = () => {
      commonDB.getAll({header:"rutina"}).then(response=>{
      formatDate(response)
      setRoutineList(response)
    })
  }
  
  useEffect(()=>{
    fetchRoutines();
  },[]);

  if(!routineList) return "No se encuentran clientes aún.";
    
    const handleInsert = (e) => {
    //   commonDB.insert({header:"rutina",size:"6", object: e}).then(response=>{   
    //       setModalMsg(prevState =>({
    //         ...prevState,
    //         msg: response,
    //         isMsgOpen: true
    //       }));
    //     fetchRoutines();
    //   })
      setIsOpenInsert(false);
    }

    // const HandleOpenEdit = (e) => {
    //   const client = JSON.parse(e.target.dataset.row);
    //   setClientEdited(
    //   {name:client.NOMBRE_CLIENTE, lastName: client.APELLIDOS, age: client.EDAD, number: client.TELEFONO, email: client.EMAIL, illness: client.ENFERMEDAD})
    //   setIsOpenEdit(true);
    // }

    // const HandleEdit = () => {
    //     commonDB.update({header:"cliente",size:"7", object: clientEdited}).then(response=>{   
    //       setModalMsg(prevState =>({
    //         ...prevState,
    //         msg: response,
    //         isMsgOpen: true
    //       }));
    //       fetchRoutines();
    //     })
    //   setIsOpenEdit(false);
    // }

    const HandleOpenDelete = (e) => {
      const routine = JSON.parse(e.target.dataset.row);
      setRoutineEdited({id:routine.ID_RUTINA,name:routine.NOMBRE_CLIENTE});
      setIsOpenDelete(true);
    }

    const HandleDelete = () => {
      commonDB.delete({header:"rutina", object: {id:routineEdited.id}}).then(response=>{   
        setModalMsg(prevState =>({
          ...prevState,
          msg: response,
          isMsgOpen: true
        }));
        fetchRoutines();
      })
    setIsOpenDelete(false);
    }

    const handleSearch = (e) => {
      console.log(e.target.value);
      if(e.target.value===undefined || e.target.value ===""){
        fetchRoutines();
      }else{
        commonDB.getSearch({header: "rutina",find:e.target.value}).then(response=>{
          setRoutineList(response);
        })
      }
    }

    // const exportPDF=()=>{
    //   const data = routineListRef.current.map((cliente)=>
    //   ([cliente.ID_CLIENTE,cliente.NOMBRE_CLIENTE,cliente.APELLIDOS,cliente.EDAD,cliente.TELEFONO,cliente.EMAIL,cliente.ENFERMEDAD]));
    //   exportToPdf(dataHeader,data, "Reporte de rutina");
    // }

    const handleOpenSaleInfo = async (e) => {
        const row= JSON.parse(e.target.dataset.row);
        setRoutineHeader({routineId:row.ID_VENTA,client:row.NOMBRE_CLIENTE,date:row.FECHA});
        // setisOpenSaleInfo(true);
        // await(new Promise((resolve,reject)=>{
        //   SalesDB.getSaleInfo({find: row.ID_RUTINA}).then(response=>{
        //     // setSaleInfo(response);
        //     // setSaleInfoRef(response);
        //     resolve();
        //     });
        // }));
      };

      const searchClient = (find, callback) => {
        if(find!==undefined){
          commonDB.getSearch({ header: "cliente", find: find }).then(response => {
            setSelectedClients(response);
          })
        }
        if(Array.isArray(selectedClients)){
          callback(selectedClients.map(client => ({
            label: client.NOMBRE_CLIENTE + " " + client.APELLIDOS,
            value: client.ID_CLIENTE
          })))
        }
      };

      const searchExercise = (find, callback) => {
        if(find!==undefined){
          commonDB.getSearch({ header: "ejercicio", find: find}).then(response => {
            setSelectedExercise(response);
          })
        }
        if(Array.isArray(selectedExercise)){
          callback(selectedExercise.map(exercise => ({
            label: exercise.NOMBRE_EJERCICIO,
            value: exercise.ID_EJERCICIO
          })))
        }
      };

      const searchMuscleGroup = (find, callback) => {
        if(find!==undefined){
          commonDB.getSearch({ header: "grupo_muscular", find: find }).then(response => {
            setSelectedGroupMuscle(response);
          })
        }
        if(Array.isArray(selectedClients)){
          callback(selectedClients.map(client => ({
            label: client.NOMBRE_GRUPO_MUSCULAR,
            value: client.ID_MUSCULAR
          })))
        }
      };

      const onChangeSearchClient = (selected) => {
        setSelectedClients(selected);
        setRoutineClient({id:selectedClients[0].ID_CLIENTE,name:selectedClients[0].NOMBRE_CLIENTE+' '+selectedClients[0].APELLIDOS});
      };
      const onChangeSearchMuscleGroup = (selected) => {
        setSelectedClients(selected.value);
      }; 
      const onChangeSearchExercise = (selected) => {
        setSelectedClients(selected.value);
      }; 

      const addExercise = () => {

      }

      const onSelectDay = (e) => {
        setSelectedDay(e.target.value);
      }

    return (
        <div>
            <h1 className="text-left module__title">Control de rutinas</h1>
            <div className="container">
                <div className="container-insert-search__">
                <div>
                    <AddButton text="Insertar" onClick={()=>setIsOpenInsert(true)} />
                  </div>
                  <SingleCustomInput onChange={handleSearch} placeholder="Buscar" name="input-search" className="search__"/>
                </div>    
                <Table
                  columns={columns}
                  editRestricted={true}
                  data={routineList}
                  aux={routineListRef.current}
                  funDelete={HandleOpenDelete}
                  funSee={handleOpenSaleInfo}
                />
            </div>
            <CustomModal
              props={{title: 'Insertar rutina', isOpen: isOpenInsert}}
              methods={{toggleOpenModal: ()=>setIsOpenInsert(!isOpenInsert)}}
                >
                <div className="d-flex flex-row-reverse">
                    <button className="btn btn-dark mb-2">Reiniciar formulario</button>
                </div>
                <h5>Cliente</h5>
                <LiveCustomSelect data={selectedClients} onChange={onChangeSearchClient} className='mt-2' placeHolder={"Seleccionar cliente"} loadOptions={searchClient} />
                <h5 className="text-left mt-3">Datos generales</h5>
                <div className="general__data">
                    <form noValidate onSubmit={handleSubmit(handleInsert)}>
                        <div className="row">
                            <input type="hidden" register={register} name="client_id" value={routineClient.ID_CLIENTE}></input>
                            <div className="col">
                                <input disabled errorMsg="Ingrese el cliente" type="text" placeholder='Cliente' value={routineClient.name}></input>
                            </div>
                            <div className="col">
                                <input register={register} name="level-insert" errorMsg="Ingrese el nivel de rutina"  placeholder='Nivel'></input>
                            </div>
                            <div className="col">
                                <input register={register} errorMsg="Ingrese el tipo" placeholder='Tipo'></input>
                            </div>
                            <div className="col">
                                <input register={register} errorMsg="Ingrese el objetivo" placeholder='Objetivo'></input>
                            </div>
                            <div className="col">
                                <input register={register} errorMsg="Ingrese el porcentaje" placeholder='Porcentaje'></input>
                            </div>
                            <div className="col">
                                <input register={register} errorMsg="Ingrese la pausa" placeholder='Pausa'></input>
                            </div>
                        </div>
                        <AddButton text="Guardar datos generales"/>
                    </form>
                </div>
                <h5 className="text-left mt-3">Agregar ejercicios</h5>
                <div className="general__data">
                    <div className="row">
                        <div className="col">
                            <LiveCustomSelect  data={selectedGroupMuscle} onChange={onChangeSearchMuscleGroup} className='mt-2' placeHolder={"Seleccionar grupo muscular"} loadOptions={searchMuscleGroup} />
                        </div>
                        <div className="col">
                            <LiveCustomSelect data={selectedExercise} onChange={onChangeSearchExercise} className='mt-2' placeHolder={"Seleccionar ejercicio"} loadOptions={searchExercise} />
                        </div>
                        <div className="col">
                            <select defaultValue={1} onChange={onSelectDay} placeholder="Seleccione el dia">
                                <option value={1}>Lunes</option>
                                <option value={2}>Martes</option>
                                <option value={3}>Miércoles</option>
                                <option value={4}>Jueves</option>
                                <option value={5}>Viernes</option>
                                <option value={6}>Sábado</option>
                                <option value={7}>Domingo</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                       <div className="col col-md-3">
                            <textarea className="mt-2" placeholder="detalles (peso,ejecucion,repeticiones)" rows="3"></textarea>
                       </div>
                       <div className="col d-flex">
                            <AddButton onClick={addExercise} text="Agregar ejercicio"/>
                       </div>
                    </div>
                </div>
                <h5 className="mt-2">Semana</h5>
                <hr/>
                <div className="routine__days">
                    <RoutineDay DayName={"Lunes"} ExerciseName={"Nombre de ejercicio"}/>
                    <RoutineDay DayName={"Martes"} ExerciseName={"Nombre de ejercicio"}/>
                    <RoutineDay DayName={"Miércoles"} ExerciseName={"Nombre de ejercicio"}/>
                    <RoutineDay DayName={"Jueves"} ExerciseName={"Nombre de ejercicio"}/>
                    <RoutineDay DayName={"Viernes"} ExerciseName={"Nombre de ejercicio"}/>
                    <RoutineDay DayName={"Sábado"} ExerciseName={"Nombre de ejercicio"}/>
                    <RoutineDay DayName={"Domingo"} ExerciseName={"Nombre de ejercicio"}/>
                </div>
            </CustomModal>
            <CustomModal
              props={{title: "¿Está seguro que desea eliminar la rutina #'"+ routineEdited.id+" de "+ routineEdited.name+"'?", isOpen: isOpenDelete}}
              methods={{toggleOpenModal: ()=>setIsOpenDelete(!isOpenDelete)}}
                >
              <CustomForm onSubmit={HandleDelete}>
                <CustomInput type="hidden" value={routineEdited.id} className='form-control mt-2' name='routineIdDelete'/>
                <AddButton text="Sí, estoy seguro."/>
                <CancelButton fun={()=>setIsOpenDelete(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal 
              props={{title: 'Mensaje del sistema', isOpen: modalMsg.isMsgOpen}}
              methods={{toggleOpenModal: ()=>setModalMsg(!modalMsg.isMsgOpen)}}
              >
              <p>{modalMsg.msg}</p>
            </CustomModal>
        </div>
    );
}