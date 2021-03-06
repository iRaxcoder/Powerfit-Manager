import React, { useEffect, useState, useRef } from "react";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import DownloadButton from "../components/DownloadButton";
import { CustomInput, SingleCustomInput, LiveCustomSelect } from "../components/CustomInput";
import commonDB from "../service/CommonDB";
import RoutineDB from "../service/Routine";
import CancelButton from "../components/CancelButton";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from "moment/min/moment-with-locales";
import { useForm } from "react-hook-form"
import '../styles/Routine/routine.css'
import RoutineDay from "../components/RoutineDay";
import RoutineExercise from '../components/RoutineExercise';
import RoutineItem from "../components/RoutineItem";
import ListRoutineDay from "../components/ListRoutineDay";

export default function Routine() {
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [routineList, setRoutineList] = useState(null);
  const routineListRef = useRef();
  const [modalMsg, setModalMsg] = useState({ isMsgOpen: false, msg: "" });
  routineListRef.current = routineList;
  const [routineHeader, setRoutineHeader] = useState({ routineId: 0, clientId: 0, client: "def", date: "def" });
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [selectedGroupMuscle, setSelectedGroupMuscle] = useState([]);
  const [selectedGroupMuscleRoutine, setSelectedGroupMuscleRoutine] = useState("");
  const [routineClient, setRoutineClient] = useState({ id: undefined, name: '' });
  const { register, handleSubmit } = useForm();
  const [selectedDay, setSelectedDay] = useState(1);
  const [addExerciseSection, setAddExerciseSection] = useState(false);
  const [generalDataSection, setGeneralDataSection] = useState(true);
  const [daysExercises, setDaysExercises] = useState({ 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] });
  const [daysExercisesRoutine, setDaysExercisesRoutine] = useState({ 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] });
  const [daysDominantGroup, setDaysDominantGroup] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" });
  const [exerciseDetails, setExerciseDetails] = useState("");
  const [isOpenConfirmRoutine, setIsOpenConfirmRoutine] = useState(false);
  const [isOpenConfirmClearRoutine, setIsOpenConfirmClearRoutine] = useState(false);
  const [generalExerciseList, setGeneralExerciseList] = useState({ counter: 0, list: [] });
  const [routineGeneralInfo, setRoutineGeneralInfo] = useState({ date: '', level: '', type: '', objetive: '', percent: '', pause: '' });
  const [isOpenVisualRoutine, setIsOpenVisualRoutine] = useState(false);
  const [clientRoutineList, setClientRoutineList] = useState([]);
  const [routineListSize, setRoutineListSize] = useState(5);

  const columns = React.useMemo(
    () => [
      { Header: "ID rutina", accessor: 'ID_RUTINA', },
      { Header: "Cliente", accessor: 'NOMBRE_CLIENTE' },
      { Header: "Ult. registrada", accessor: 'FECHA' },
    ],
    []
  );

  const formatDate = (e) => {
    e.map(entrada => (
      entrada.FECHA = moment(entrada.FECHA).locale('es').format('L')
    ))
  };

  const fetchRoutines = () => {
    commonDB.getAll({ header: "rutina" }).then(response => {
      formatDate(response)
      setRoutineList(response)
    })
  };

  const fetchMuscleGroup = () => {
    commonDB.getAll({ header: "grupo_muscular" }).then(response => {
      setSelectedGroupMuscle(response)
    })
  };

  useEffect(() => {
    fetchRoutines();
    fetchMuscleGroup();
  }, []);

  if (!routineList) return "No se encuentran rutinas a??n.";

  const handleInsertGeneralData = (e) => {
    if (routineClient.id === undefined) {
      setModalMsg(prevState => ({
        ...prevState,
        msg: "Debe seleccionar un  cliente",
        isMsgOpen: true
      }));
    } else {
      setRoutineGeneralInfo(e);
      setGeneralDataSection(!generalDataSection);
      setAddExerciseSection(!addExerciseSection);
    }
  };

  const HandleDeleteFetch = (id) => {
    commonDB.delete({ header: "rutina", object: { id: id } }).then(response => {
      RoutineDB.getSearch({ find: routineHeader.clientId, filter: routineListSize }).then(response => {
        formatDate(response);
        setClientRoutineList(response);
      });
    })
  };

  const handleSearch = (e) => {
    if (e.target.value === undefined || e.target.value === "") {
      fetchRoutines();
    } else {
      commonDB.getSearch({ header: "rutina", find: e.target.value }).then(response => {
        formatDate(response)
        setRoutineList(response);
      })
    }
  };

  const filterRoutineList = async (clientId, size) => {
    setDaysExercisesRoutine({ 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] });
    setRoutineGeneralInfo({ date: '', level: '', type: '', objetive: '', percent: '', pause: '' });
    await (new Promise((resolve, reject) => {
      RoutineDB.getSearch({ find: clientId, filter: size }).then(response => {
        formatDate(response);
        setClientRoutineList(response);
        resolve();
      });
    }));
  };

  const handleOpenViewRoutine = async (e) => {
    setDaysExercisesRoutine({ 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] });
    setRoutineGeneralInfo({ date: '', level: '', type: '', objetive: '', percent: '', pause: '' });
    const row = JSON.parse(e.target.dataset.row);
    setRoutineHeader({ routineId: row.ID_RUTINA, clientId: row.ID_CLIENTE, client: row.NOMBRE_CLIENTE, date: row.FECHA });
    setIsOpenVisualRoutine(true);
    filterRoutineList(row.ID_CLIENTE, routineListSize);
  };

  const searchClient = (find, callback) => {
    if (find !== undefined) {
      commonDB.getSearch({ header: "cliente", find: find }).then(response => {
        setSelectedClients(response);
      })
    }
    if (Array.isArray(selectedClients)) {
      callback(selectedClients.map(client => ({
        label: client.NOMBRE_CLIENTE + " " + client.APELLIDOS,
        value: client.ID_CLIENTE
      })))
    }
  };

  const searchExercise = (find, callback) => {
    var filteredExercises = [];
    if (find !== undefined) {
      filteredExercises = selectedExercise.filter(e => e.NOMBRE_EJERCICIO.toUpperCase().includes(find.toUpperCase()));
    }
    if (Array.isArray(filteredExercises)) {
      callback(filteredExercises.map(exercise => ({
        label: exercise.NOMBRE_EJERCICIO,
        value: { id: exercise.ID_EJERCICIO, name: exercise.NOMBRE_EJERCICIO }
      })))
    }
  };

  const onChangeSearchClient = (selected) => {
    setSelectedClients(selected);
    setRoutineClient({ id: selectedClients[0].ID_CLIENTE, name: selectedClients[0].NOMBRE_CLIENTE + ' ' + selectedClients[0].APELLIDOS });
  };
  const onChangeSearchExercise = (selected) => {
    setSelectedExercise(selected);
  };

  const exerciseDayExists = (day, exerciseId) => {
    for (let i = 0; i < day.length; i++) {
      if (day[i].exerciseId === exerciseId) {
        return true;
      }
    }
    return false;
  }

  const addExercise = () => {
    if (selectedExercise.value === undefined) {
      setModalMsg(prevState => ({
        ...prevState,
        msg: "Debe seleccionar un ejercicio primero",
        isMsgOpen: true
      }));
    } else {
      const day = daysExercises[selectedDay + ""];
      if (!exerciseDayExists(day, selectedExercise.value.id)) {
        const exerciseItem = { generalId: generalExerciseList.counter, exerciseId: selectedExercise.value.id, exerciseName: selectedExercise.value.name, details: exerciseDetails };
        day.push(exerciseItem);
        setDaysExercises({
          ...daysExercises,
          [selectedDay + ""]: day
        })
        const generalDayExercises = generalExerciseList.list;
        const counter = generalExerciseList.counter;
        generalDayExercises.push({ idExercise: selectedExercise.value.id, day: selectedDay, details: exerciseDetails });
        setGeneralExerciseList({
          ...generalExerciseList,
          counter: counter + 1,
          list: generalDayExercises
        });
        setSelectedExercise([]);
        commonDB.getSearch({ header: "ejercicio_grupo", find: selectedGroupMuscleRoutine}).then(response => {
          setSelectedExercise(response);
        });
        setExerciseDetails("");
      } else {
        setModalMsg(prevState => ({
          ...prevState,
          msg: "El ejercicio ya ha sido seleccionado en ese d??a.",
          isMsgOpen: true
        }));
      }
    }
  };

  const onSelectDay = (e) => {
    setSelectedDay(Number(e.target.value));
  };

  const onSelectMuscleGroup = (e) => {
    if (e.target.value !== -1) {
      setSelectedGroupMuscleRoutine(e.target.value);
      commonDB.getSearch({ header: "ejercicio_grupo", find: e.target.value }).then(response => {
        setSelectedExercise(response);
      })
    }
  };

  const onChangeExerciseDetails = (e) => {
    setExerciseDetails(e.target.value);
  };

  const onDeleteDayExercise = (day, index) => {
    const dayExercise = daysExercises[day + ""];
    console.log(dayExercise);
    const newGeneralExerciseList = generalExerciseList.list.filter((_, i) => i !== dayExercise[index].generalId);
    const newExerciseList = dayExercise.filter((_, i) => i !== index);
    setDaysExercises({
      ...daysExercises,
      [day + ""]: newExerciseList
    });
    setGeneralExerciseList({
      ...generalExerciseList,
      counter: generalExerciseList.counter - 1,
      list: newGeneralExerciseList
    });
  };

  const clearRoutineDays = () => {
    setDaysExercises({ 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] });
    setGeneralExerciseList({ counter: 0, list: [] });
    setIsOpenConfirmClearRoutine(false);
  };

  const saveRoutine = () => {
    if (generalExerciseList.length === 0) {
      setModalMsg(prevState => ({
        ...prevState,
        msg: "No se ha podido guardar la rutina porque no se han agregado ejercicios.",
        isMsgOpen: true
      }));
    } else {
      RoutineDB.insert({
        size: "6", generalInfo: {
          clientId: routineClient.id,
          level: routineGeneralInfo.level, type: routineGeneralInfo.type, obj: routineGeneralInfo.objetive, porc: routineGeneralInfo.percent, pause: routineGeneralInfo.pause
        },
        exerciseList: generalExerciseList.list
      }).then(response => {
        setIsOpenConfirmRoutine(false);
        clearRoutineDays();
        setRoutineGeneralInfo({ level: '', type: '', objetive: '', percent: '', pause: '' });
        setRoutineClient({ id: undefined, name: '' });
        setModalMsg(prevState => ({
          ...prevState,
          msg: response,
          isMsgOpen: true
        }));
        setSelectedClients([]);
        setIsOpenInsert(false);
        setGeneralDataSection(true);
        setAddExerciseSection(false)
        fetchRoutines();
      })
    }
  };

  const onFilterRoutines = (e) => {
    filterRoutineList(routineHeader.clientId, e.target.value);
  };

  const onViewRoutine = (routineId) => {
    var dayList = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
    var dominantGroup={ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "" };
    commonDB.getSearch({ header: "rutina_id", find: routineId }).then(response => {
      formatDate(response);
      setRoutineGeneralInfo({ date: response[0].FECHA, level: response[0].NIVEL, pause: response[0].PAUSA, objetive: response[0].OBJETIVO, percent: response[0].PORCENTAJE, type: response[0].TIPO });
      commonDB.getSearch({ header: "rutina_ejercicio_id", find: routineId }).then(response => {
        response.forEach((e) => {
          const day = dayList[e.DIA + ""];
          day.push({ exerciseName: e.NOMBRE_EJERCICIO, details: e.INDICACIONES });
        });
        setDaysExercisesRoutine(dayList);
        commonDB.getSearch({ header: "rutina_musculo_id", find: routineId }).then(response => {
           response.forEach((day)=>{
             dominantGroup[day.DIA]="MD: "+day.NOMBRE_GRUPO_MUSCULAR.toLowerCase();
           });
           setDaysDominantGroup(dominantGroup);
        });
      });
    });
  };

  const exportPdf = () => {
    html2canvas(document.querySelector("#rountine")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save("Entrenamiento Powerfit-"+routineHeader.client+"-"+routineGeneralInfo.date+".pdf");
    });
  };

  return (
    <div>
      <h1 className="text-left module__title">Control de rutinas</h1>
      <div className="container">
        <div className="container-insert-search__">
          <div>
            <AddButton text="Insertar" onClick={() => setIsOpenInsert(true)} />
          </div>
          <SingleCustomInput onChange={handleSearch} placeholder="Buscar" name="input-search" className="search__" />
        </div>
        <Table
          columns={columns}
          onlyView
          data={routineList}
          aux={routineListRef.current}
          funSee={handleOpenViewRoutine}
        />
      </div>
      <CustomModal
        props={{ title: 'Insertar rutina', isOpen: isOpenInsert }}
        methods={{ toggleOpenModal: () => setIsOpenInsert(!isOpenInsert) }}
      >
        {generalDataSection ?
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
                    <CustomInput register={register} name="level" placeholder='Nivel' />
                  </div>
                  <div className="col">
                    <CustomInput name="type" register={register} placeholder='Tipo' />
                  </div>
                  <div className="col">
                    <CustomInput name="objetive" register={register} placeholder='Objetivo' />
                  </div>
                  <div className="col">
                    <CustomInput name="percent" register={register} placeholder='Porcentaje' />
                  </div>
                  <div className="col">
                    <CustomInput name="pause" register={register} placeholder='Pausa' />
                  </div>
                </div>
                <AddButton text="Guardar datos generales" />
              </form>
            </div>
          </>
          :
          <>
            <AddButton onClick={() => { setGeneralDataSection(true); setAddExerciseSection(false) }} text="<<-- Volver a la informaci??n general" />
            <hr />
          </>
        }
        {
          addExerciseSection ?
            <>
              <h5 className="text-left mt-3">2. Agregar ejercicios</h5>
              <div className="general__data">
                <div className="row">
                  <div className="col">
                    <select onChange={onSelectMuscleGroup} placeholder="Seleccione el dia">
                      <option key={-1} value={-1}>Seleccionar grupo muscular</option>
                      {selectedGroupMuscle.map((value) => (
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
                      <option value={3}>Mi??rcoles</option>
                      <option value={4}>Jueves</option>
                      <option value={5}>Viernes</option>
                      <option value={6}>S??bado</option>
                      <option value={7}>Domingo</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-md-3">
                    <textarea className="mt-2" value={exerciseDetails} onChange={onChangeExerciseDetails} placeholder="detalles (peso,ejecucion,repeticiones)" rows="3"></textarea>
                  </div>
                  <div className="col d-flex">
                    <AddButton onClick={addExercise} text="Agregar ejercicio" />
                  </div>
                </div>
              </div>
              <hr />
              <div className="container d-flex justify-content-between">
                <div>
                  <AddButton onClick={() => setIsOpenConfirmRoutine(!isOpenConfirmRoutine)} text="Guardar rutina" />
                </div>
                <button onClick={() => setIsOpenConfirmClearRoutine(!isOpenConfirmClearRoutine)} className="btn btn-dark mb-2">Reiniciar rutina</button>
              </div>
              <div className="routine__days">
                <RoutineDay DayName={"Lunes"}>{daysExercises["1"].map((value, index) => <RoutineExercise exercise={value} onDelete={() => onDeleteDayExercise(1, index)} />)}</RoutineDay>
                <RoutineDay DayName={"Martes"}>{daysExercises["2"].map((value, index) => <RoutineExercise exercise={value} onDelete={() => onDeleteDayExercise(2, index)} />)}</RoutineDay>
                <RoutineDay DayName={"Mi??rcoles"}>{daysExercises["3"].map((value, index) => <RoutineExercise exercise={value} onDelete={() => onDeleteDayExercise(3, index)} />)}</RoutineDay>
                <RoutineDay DayName={"Jueves"}>{daysExercises["4"].map((value, index) => <RoutineExercise exercise={value} onDelete={() => onDeleteDayExercise(4, index)} />)}</RoutineDay>
                <RoutineDay DayName={"Viernes"}>{daysExercises["5"].map((value, index) => <RoutineExercise exercise={value} onDelete={() => onDeleteDayExercise(5, index)} />)}</RoutineDay>
                <RoutineDay DayName={"S??bado"}>{daysExercises["6"].map((value, index) => <RoutineExercise exercise={value} onDelete={() => onDeleteDayExercise(6, index)} />)}</RoutineDay>
                <RoutineDay DayName={"Domingo"}>{daysExercises["7"].map((value, index) => <RoutineExercise exercise={value} onDelete={() => onDeleteDayExercise(7, index)} />)}</RoutineDay>
              </div>
            </>
            :
            <h5>Esperando datos generales...</h5>
        }
      </CustomModal>
      <CustomModal
        props={{ title: 'Mensaje del sistema', isOpen: modalMsg.isMsgOpen }}
        methods={{ toggleOpenModal: () => setModalMsg(!modalMsg.isMsgOpen) }}
      >
        <p>{modalMsg.msg}</p>
      </CustomModal>
      <CustomModal
        props={{ title: "??Guardar rutina?", isOpen: isOpenConfirmRoutine }}
        methods={{ toggleOpenModal: () => setIsOpenConfirmRoutine(!isOpenConfirmRoutine) }}
      >
        <CustomForm onSubmit={saveRoutine}>
          <AddButton text="S??" />
          <CancelButton fun={() => setIsOpenConfirmRoutine(false)} />
        </CustomForm>
      </CustomModal>
      <CustomModal
        props={{ title: "??Reiniciar rutina?", isOpen: isOpenConfirmClearRoutine }}
        methods={{ toggleOpenModal: () => setIsOpenConfirmClearRoutine(!isOpenConfirmClearRoutine) }}
      >
        <CustomForm onSubmit={clearRoutineDays}>
          <AddButton text="S??" />
          <CancelButton fun={() => setIsOpenConfirmClearRoutine(false)} />
        </CustomForm>
      </CustomModal>

      <CustomModal
        props={{ title: "Visualizaci??n de rutinas", isOpen: isOpenVisualRoutine }}
        methods={{ toggleOpenModal: () => setIsOpenVisualRoutine(!isOpenVisualRoutine) }}
      >
        <div className="routine__container">
          <div className="routine__list">
            <h4 className="routine__list_title">Rutinas de {routineHeader.client}</h4>
            <hr />
            <select onChange={onFilterRoutines} defaultValue={5} placeholder="Mostrar">
              <option value={5}>??ltimas 5</option>
              <option value={10}>??ltimas 10</option>
              <option value={20}>??ltimas 20</option>
            </select>
            {clientRoutineList.map((item) => <RoutineItem onFetch={() => filterRoutineList(routineHeader.clientId, routineListSize)} onDelete={() => HandleDeleteFetch(item.ID_RUTINA)} Routine={item} client={routineHeader.client} onViewRoutine={() => onViewRoutine(item.ID_RUTINA)} />)}
          </div>
          <div id="rountine" className="routine__view">
            <h4 className="routine__list_title">Semana</h4>
            <hr />
            <div className="row">
              <div className="col ml-2">
                <p>Cliente: {routineHeader.client} </p>
              </div>
              <div className="col ml-2">
                <p>Fecha: {routineGeneralInfo.date} </p>
              </div>
              <div className="col">
                <p>Nivel: {routineGeneralInfo.level} </p>
              </div>
              <div className="col">
                <p>Tipo: {routineGeneralInfo.type} </p>
              </div>
              <div className="col">
                <p>Objetivo: {routineGeneralInfo.objetive} </p>
              </div>
              <div className="col">
                <p>Porcentaje: {routineGeneralInfo.percent} </p>
              </div>
              <div className="col">
                <p>Pausa: {routineGeneralInfo.pause} </p>
              </div>
            </div>
            <RoutineDay className="view__day" DayName={"Lunes"}><p className="gm__day">{daysDominantGroup["1"]}</p>{daysExercisesRoutine["1"].map((e) => <ListRoutineDay ExerciseName={e.exerciseName} Details={e.details} />)}</RoutineDay>
            <RoutineDay className="view__day" DayName={"Martes"}><p className="gm__day">{daysDominantGroup["2"]}</p>{daysExercisesRoutine["2"].map((e) => <ListRoutineDay ExerciseName={e.exerciseName} Details={e.details} />)}</RoutineDay>
            <RoutineDay className="view__day" DayName={"Mi??rcoles"}><p className="gm__day">{daysDominantGroup["3"]}</p>{daysExercisesRoutine["3"].map((e) => <ListRoutineDay ExerciseName={e.exerciseName} Details={e.details} />)}</RoutineDay>
            <RoutineDay className="view__day" DayName={"Jueves"}><p className="gm__day">{daysDominantGroup["4"]}</p>{daysExercisesRoutine["4"].map((e) => <ListRoutineDay ExerciseName={e.exerciseName} Details={e.details} />)}</RoutineDay>
            <RoutineDay className="view__day" DayName={"Viernes"}><p className="gm__day">{daysDominantGroup["5"]}</p>{daysExercisesRoutine["5"].map((e) => <ListRoutineDay ExerciseName={e.exerciseName} Details={e.details} />)}</RoutineDay>
            <RoutineDay className="view__day" DayName={"S??bado"}><p className="gm__day">{daysDominantGroup["6"]}</p>{daysExercisesRoutine["6"].map((e) => <ListRoutineDay ExerciseName={e.exerciseName} Details={e.details} />)}</RoutineDay>
            <RoutineDay className="view__day last__day" DayName={"Domingo"}><p className="gm__day">{daysDominantGroup["7"]}</p>{daysExercisesRoutine["7"].map((e) => <ListRoutineDay ExerciseName={e.exerciseName} Details={e.details} />)}</RoutineDay>
            <div className="routine__export">
              <DownloadButton onClick={exportPdf} text="PDF" />
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}