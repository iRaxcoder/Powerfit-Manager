import React, { useEffect, useState, useRef } from "react";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import DownloadButton from "../components/DownloadButton";
import {CustomInput, SingleCustomInput, LiveCustomSelect} from "../components/CustomInput";
import commonDB from "../service/CommonDB";
import RoutineDB from "../service/Routine";
import CancelButton from "../components/CancelButton";
import { exportToPdf, ExportToCsv } from "../utils/exportData";
import moment from "moment/min/moment-with-locales";
import { useForm } from "react-hook-form"
import '../styles/Routine/routine.css'
import RoutineDay from "../components/RoutineDay";
import RoutineExercise from '../components/RoutineExercise';

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
  const [routineClient, setRoutineClient]= useState({id:undefined, name:''});
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [selectedDay,setSelectedDay]=useState(1);
  const [addExerciseSection, setAddExerciseSection]=useState(false);
  const [generalDataSection, setGeneralDataSection]=useState(true);
  const [daysExercises,setDaysExercises]=useState({1:[],2:[],3:[],4:[],5:[],6:[],7:[]});
  const [exerciseDetails, setExerciseDetails]=useState("sin detalles");
  const [isOpenConfirmRoutine, setIsOpenConfirmRoutine]=useState(false);
  const [isOpenConfirmClearRoutine, setIsOpenConfirmClearRoutine]=useState(false);
  const [generalExerciseList, setGeneralExerciseList]=useState({counter:0,list:[]});
  const[routineGeneralInfo,setRoutineGeneralInfo]=useState({level:'',type:'',objetive:'',percent:'',pause:''});

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

  const fetchMuscleGroup = () => {
    commonDB.getAll({ header: "grupo_muscular" }).then(response => {
      setSelectedGroupMuscle(response)
    })
  }
  
  useEffect(()=>{
    fetchRoutines();
    fetchMuscleGroup();
  },[]);

  if(!routineList) return "No se encuentran rutinas aún.";
    
    const handleInsertGeneralData = (e) => {
      if(routineClient.id===undefined){
        setModalMsg(prevState =>({
          ...prevState,
          msg: "Debe seleccionar un  cliente",
          isMsgOpen: true
          }));
      }else{
        setRoutineGeneralInfo(e);
        setGeneralDataSection(!generalDataSection);
        setAddExerciseSection(!addExerciseSection);
      }
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
        var filteredExercises=[];
        if(find!==undefined){
          filteredExercises= selectedExercise.filter(e =>e.NOMBRE_EJERCICIO.toUpperCase().includes(find.toUpperCase()));
        }
        if(Array.isArray(filteredExercises)){
          callback(filteredExercises.map(exercise => ({
            label: exercise.NOMBRE_EJERCICIO,
            value: {id:exercise.ID_EJERCICIO,name:exercise.NOMBRE_EJERCICIO}
          })))
        }
      };

      // const searchMuscleGroup = (find, callback) => {
      //   if(find!==undefined){
      //     commonDB.getSearch({ header: "grupo_muscular", find: find }).then(response => {
      //       setSelectedGroupMuscle(response);
      //     })
      //   }else{
      //     fetchMuscleGroup();
      //   }
      //   if(Array.isArray(selectedGroupMuscle)){
      //     callback(selectedGroupMuscle.map(client => ({
      //       label: client.NOMBRE_GRUPO_MUSCULAR,
      //       value: client.ID_MUSCULAR
      //     })))
      //   }
      // };
      const onChangeSearchClient = (selected) => {
        setSelectedClients(selected);
        setRoutineClient({id:selectedClients[0].ID_CLIENTE,name:selectedClients[0].NOMBRE_CLIENTE+' '+selectedClients[0].APELLIDOS});
      };
      const onChangeSearchExercise = (selected) => {
        setSelectedExercise(selected);
      };

      const addExercise = () => {
        if(selectedExercise.value===undefined){
          setModalMsg(prevState =>({
            ...prevState,
            msg: "Debe seleccionar un ejercicio primero",
            isMsgOpen: true
          }));
        }else{
          const exerciseItem = {generalId: generalExerciseList.counter,exerciseId: selectedExercise.value.id, exerciseName:selectedExercise.value.name, details: exerciseDetails};
          const day = daysExercises[selectedDay+""];
          day.push(exerciseItem);
          setDaysExercises({
            ...daysExercises,
            [selectedDay+""]:day
          })
          const generalDayExercises=generalExerciseList.list;
          const counter = generalExerciseList.counter;
          generalDayExercises.push({idExercise: selectedExercise.value.id,day:selectedDay,details:exerciseDetails});
          setGeneralExerciseList({
            ...generalExerciseList,
            counter:counter+1,
            list:generalDayExercises
          });
        }
      };

      const onSelectDay = (e) => {
        setSelectedDay(Number(e.target.value));
      };

      const onSelectMuscleGroup = (e) => {
        if(e.target.value!==-1){
          commonDB.getSearch({ header: "ejercicio_grupo", find: e.target.value }).then(response => {
            setSelectedExercise(response);
          })
        }
      };

      const onChangeExerciseDetails = (e) => {
        setExerciseDetails(e.target.value);
      };

      const onDeleteDayExercise = (day,index) => {
        const dayExercise = daysExercises[day+""];
        const newGeneralExerciseList= generalExerciseList.list.filter((_,i)=>i!==dayExercise.generalId);
        const newExerciseList = dayExercise.filter((_,i)=>i!==index);
        setDaysExercises({
          ...daysExercises,
          [day+""]:newExerciseList
        });
        setGeneralExerciseList({
          ...generalExerciseList,
          counter:generalExerciseList.counter-1,
          list:newGeneralExerciseList
        });
        console.log(generalExerciseList.counter);
      };

      const clearRoutineDays = () => {
        setDaysExercises({1:[],2:[],3:[],4:[],5:[],6:[],7:[]});
        setGeneralExerciseList({counter:0,list:[]});
        setIsOpenConfirmClearRoutine(false);
      };

      const saveRoutine = () => {
        if(generalExerciseList.length===0){
          setModalMsg(prevState =>({
            ...prevState,
            msg: "No se ha podido guardar la rutina porque no se han agregado ejercicios.",
            isMsgOpen: true
          }));
        }else{
          RoutineDB.insert({size:"6", generalInfo:{clientId: routineClient.id,
            level:routineGeneralInfo.level,type:routineGeneralInfo.type,obj:routineGeneralInfo.objetive,porc:routineGeneralInfo.percent,pause:routineGeneralInfo.pause},
            exerciseList:generalExerciseList.list}).then(response=>{
            setIsOpenConfirmRoutine(false);
            clearRoutineDays();
            setRoutineGeneralInfo({level:'',type:'',objetive:'',percent:'',pause:''});
            setRoutineClient({id:undefined, name:''});
            setModalMsg(prevState =>({
              ...prevState,
              msg: response,
              isMsgOpen: true
            }));
        })
        }
      };

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
                {generalDataSection?
                <>
                <h5>Cliente</h5>
                <LiveCustomSelect data={selectedClients} onChange={onChangeSearchClient} className='mt-2' placeHolder={"Seleccionar cliente"} loadOptions={searchClient} />
                <h5 className="text-left mt-3">1. Datos generales</h5>
                <div className="general__data">
                    <form noValidate onSubmit={handleSubmit(handleInsertGeneralData)}>
                        <div className="row">
                            <input type="hidden" register={register} name="client_id" value={routineClient.ID_CLIENTE}></input>
                            <div className="col">
                                <input register={register} readOnly name="client_name" type="text" placeholder='Cliente' value={routineClient.name}></input>
                            </div>
                            <div className="col">
                                <CustomInput register={register} name="level" placeholder='Nivel'/>
                            </div>
                            <div className="col">
                                <CustomInput name="type" register={register} placeholder='Tipo'/>
                            </div>
                            <div className="col">
                                <CustomInput name="objetive" register={register} placeholder='Objetivo'/>
                            </div>
                            <div className="col">
                                <CustomInput name="percent" register={register} placeholder='Porcentaje'/>
                            </div>
                            <div className="col">
                                <CustomInput name="pause" register={register} placeholder='Pausa'/>
                            </div>
                        </div>
                        <AddButton text="Guardar datos generales"/>
                    </form>
                </div>
                </>
                :
                <>
                  <AddButton onClick={()=>{setGeneralDataSection(true);setAddExerciseSection(false)}} text="<<-- Volver a la información general"/>
                  <hr/>
                </>
                }
               {
                 addExerciseSection?
                 <>
                 <h5 className="text-left mt-3">2. Agregar ejercicios</h5>
                 <div className="general__data">
                     <div className="row">
                         <div className="col">
                         <select onChange={onSelectMuscleGroup} placeholder="Seleccione el dia">
                                  <option key={-1} value={-1}>Seleccionar grupo muscular</option>
                                  {selectedGroupMuscle.map((value)=>(
                                     <option key={value.ID_MUSCULAR} value={value.ID_MUSCULAR}>{value.NOMBRE_GRUPO_MUSCULAR}</option>
                                  ))}
                             </select>
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
                             <textarea className="mt-2" onChange={onChangeExerciseDetails} placeholder="detalles (peso,ejecucion,repeticiones)" rows="3"></textarea>
                        </div>
                        <div className="col d-flex">
                             <AddButton onClick={addExercise} text="Agregar ejercicio"/>
                        </div>
                     </div>
                 </div>
                 <hr/>
                 <div className="container d-flex justify-content-between">
                    <div>
                    <AddButton onClick={()=>setIsOpenConfirmRoutine(!isOpenConfirmRoutine)} text="Guardar rutina"/>
                    </div>
                    <button onClick={()=>setIsOpenConfirmClearRoutine(!isOpenConfirmClearRoutine)} className="btn btn-dark mb-2">Reiniciar rutina</button>
                  </div>
                 <div className="routine__days">
                   <RoutineDay DayName={"Lunes"}>{daysExercises["1"].map((value,index)=><RoutineExercise exercise={value} onDelete={()=>onDeleteDayExercise(1,index)}/>)}</RoutineDay>
                   <RoutineDay DayName={"Martes"}>{daysExercises["2"].map((value,index)=><RoutineExercise exercise={value}onDelete={()=>onDeleteDayExercise(2,index)}/>)}</RoutineDay>
                   <RoutineDay DayName={"Miércoles"}>{daysExercises["3"].map((value,index)=><RoutineExercise exercise={value}onDelete={()=>onDeleteDayExercise(3,index)}/>)}</RoutineDay>
                   <RoutineDay DayName={"Jueves"}>{daysExercises["4"].map((value,index)=><RoutineExercise exercise={value}onDelete={()=>onDeleteDayExercise(4,index)}/>)}</RoutineDay>
                   <RoutineDay DayName={"Viernes"}>{daysExercises["5"].map((value,index)=><RoutineExercise exercise={value}onDelete={()=>onDeleteDayExercise(5,index)}/>)}</RoutineDay>
                   <RoutineDay DayName={"Sábado"}>{daysExercises["6"].map((value,index)=><RoutineExercise exercise={value}onDelete={()=>onDeleteDayExercise(6,index)}/>)}</RoutineDay>
                   <RoutineDay DayName={"Domingo"}>{daysExercises["7"].map((value,index)=><RoutineExercise exercise={value}onDelete={()=>onDeleteDayExercise(7,index)}/>)}</RoutineDay>
                 </div>
                 </>
                 :
                 <h5>Esperando datos generales...</h5>
                }  
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
            <CustomModal
              props={{title: "¿Guardar rutina?",isOpen:isOpenConfirmRoutine}}
              methods={{toggleOpenModal: ()=>setIsOpenConfirmRoutine(!isOpenConfirmRoutine)}}
                >
              <CustomForm onSubmit={saveRoutine}>
                <AddButton text="Sí"/>
                <CancelButton fun={()=>setIsOpenConfirmRoutine(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal
              props={{title: "¿Reiniciar rutina?",isOpen:isOpenConfirmClearRoutine}}
              methods={{toggleOpenModal: ()=>setIsOpenConfirmClearRoutine(!isOpenConfirmClearRoutine)}}
                >
              <CustomForm onSubmit={clearRoutineDays}>
                <AddButton text="Sí"/>
                <CancelButton fun={()=>setIsOpenConfirmClearRoutine(false)}/>
              </CustomForm>
            </CustomModal>
        </div>
    );
}