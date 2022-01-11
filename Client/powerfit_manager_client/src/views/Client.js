import React, { useEffect, useState, useRef } from "react";
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import {CustomInput, CustomSelect, SingleCustomInput} from "../components/CustomInput";
import commonDB from "../service/CommonDB";
import CancelButton from "../components/CancelButton";

export default function Client(){
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [clientEdited, setClientEdited] = useState({id:0, name:"def", lastName:"def", age:0, number: "def", email:"def", illness: "def"});
  const [clientList, setClientList] = useState(null);
  const clientsListRef= useRef();
  const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});
  clientsListRef.current=clientList;
    
  const columns = React.useMemo(
      () => [
          { Header: '#', accessor: 'ID_CLIENTE',},
          { Header: 'Nombre', accessor: 'NOMBRE_CLIENTE'},
          { Header: 'Apellidos',accessor: 'APELLIDOS'},
          { Header: 'Edad',accessor: 'EDAD'},
          { Header: 'Teléfono',accessor: 'TELEFONO'},
          { Header: 'Correo', accessor: 'EMAIL'},
          { Header: 'Enfermedades', accessor: 'ENFERMEDAD'},
        ],
      []
  )

  const fetchClients = () => {
      commonDB.getAll({header:"cliente"}).then(response=>{
      setClientList(response)
    })
  }
  
  useEffect(()=>{
    fetchClients();
  },[]);

  if(!clientList) return "No se encuentran ejercicios";
    
    const handleInsert = (e) => {
      commonDB.insert({header:"cliente",size:"6", object: e}).then(response=>{   
          setModalMsg(prevState =>({
            ...prevState,
            msg: response,
            isMsgOpen: true
          }));
        fetchClients();
      })
      setIsOpenInsert(false);
    }

    const HandleOpenEdit = (e) => {
      const client = JSON.parse(e.target.dataset.row);
      setClientEdited(
      {id:client.ID_CLIENTE,name:client.NOMBRE_CLIENTE, lastName: client.APELLIDOS, age: client.EDAD, number: client.TELEFONO, email: client.EMAIL, illness: client.ENFERMEDAD})
      setIsOpenEdit(true);
    }

    const HandleEdit = () => {
        commonDB.update({header:"cliente",size:"7", object: clientEdited}).then(response=>{   
          setModalMsg(prevState =>({
            ...prevState,
            msg: response,
            isMsgOpen: true
          }));
          fetchClients();
        })
      setIsOpenEdit(false);
    }

    const HandleOpenDelete = (e) => {
      const client = JSON.parse(e.target.dataset.row);
      setClientEdited({id:client.ID_CLIENTE,name:client.NOMBRE_CLIENTE,lastName:client.APELLIDOS})
      setIsOpenDelete(true);
    }

    const HandleDelete = () => {
      commonDB.delete({header:"cliente", object: {id:clientEdited.id}}).then(response=>{   
        setModalMsg(prevState =>({
          ...prevState,
          msg: response,
          isMsgOpen: true
        }));
        fetchClients();
      })
    setIsOpenDelete(false);
    }

    const handleSearch = (e) => {
      console.log(e.target.value);
      if(e.target.value===undefined || e.target.value ===""){
        fetchClients();
      }else{
        commonDB.getSearch({header: "cliente",find:e.target.value}).then(response=>{
          setClientList(response);
        })
      }
    }

    return (
        <div>
            <h1 className="text-left">Control de clientes</h1>
            <hr/>
            <div className="container">
                <div className="container-insert-search__">
                  <div>
                    <AddButton text="Insertar" onClick={()=>setIsOpenInsert(true)} />
                  </div>
                  <SingleCustomInput onChange={handleSearch} placeholder="Buscar" name="input-search" className="form-control"/>
                </div>    
                <Table
                  columns={columns}
                  data={clientList}
                  aux={clientsListRef.current}
                  funEdit={HandleOpenEdit}
                  funDelete={HandleOpenDelete}
                />
            </div>
            <CustomModal
              props={{title: 'Insertar cliente', isOpen: isOpenInsert}}
              methods={{toggleOpenModal: ()=>setIsOpenInsert(!isOpenInsert)}}
                >
              <CustomForm onSubmit={handleInsert}>
                <CustomInput errorMsg="Nombre requerido" className='form-control mt-2' name='client_name_insert' placeholder='Nombre'></CustomInput>
                <CustomInput errorMsg="Apellidos requeridos" className='form-control mt-2' name='last_name_insert' placeholder='Apellidos'></CustomInput>
                <CustomInput errorMsg="Edad requerida" className='form-control mt-2' name='age_name_insert' placeholder='Edad'></CustomInput>
                <CustomInput errorMsg="Teléfono requerido" className='form-control mt-2' name='number_insert' placeholder='Teléfono'></CustomInput>
                <CustomInput errorMsg="Correo requerido" className='form-control mt-2' name='email_insert' placeholder='Email'></CustomInput>
                <CustomInput errorMsg="Este campo es requerido" className='form-control mt-2' name='illness_insert' placeholder='Enfermedad'></CustomInput>
                <AddButton text="Insertar"/>
                <CancelButton fun={()=>setIsOpenInsert(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal
              props={{title: 'Modificar cliente', isOpen: isOpenEdit}}
              methods={{toggleOpenModal: ()=>setIsOpenEdit(!isOpenEdit)}}
                >
              <CustomForm onSubmit={HandleEdit}>
                <CustomInput type="hidden" value={clientEdited.id} className='form-control mt-2' name='client_id_edit'/>
                <CustomInput errorMsg="Nombre requerido" onChange={(e)=>setClientEdited(prevState =>({...prevState,name:e.target.value}))} value={clientEdited.name} className='form-control mt-2' name='client_name_edit' placeholder='Nombre'></CustomInput>
                <CustomInput errorMsg="Apellidos requeridos" onChange={(e)=>setClientEdited(prevState =>({...prevState,lastName:e.target.value}))} value={clientEdited.lastName} className='form-control mt-2' name='last_name_editt' placeholder='Apellidos'></CustomInput>
                <CustomInput errorMsg="Edad requerida" onChange={(e)=>setClientEdited(prevState =>({...prevState,age:e.target.value}))} value={clientEdited.age} className='form-control mt-2' name='age_name_edit' placeholder='Edad'></CustomInput>
                <CustomInput errorMsg="Teléfono requerido" onChange={(e)=>setClientEdited(prevState =>({...prevState,number:e.target.value}))}value={clientEdited.number} className='form-control mt-2' name='number_edit' placeholder='Teléfono'></CustomInput>
                <CustomInput errorMsg="Correo requerido"onChange={(e)=>setClientEdited(prevState =>({...prevState,email:e.target.value}))} value={clientEdited.email} className='form-control mt-2' name='email_edit' placeholder='Email'></CustomInput>
                <CustomInput errorMsg="Este campo es requerido"onChange={(e)=>setClientEdited(prevState =>({...prevState,illness:e.target.value}))} value={clientEdited.illness} className='form-control mt-2' name='illness_edit' placeholder='Enfermedad'></CustomInput>
                <AddButton type="submit" text="Guardar cambios"/>
                <CancelButton fun={()=>setIsOpenEdit(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal
              props={{title: "¿Está seguro que desea eliminar el cliente '"+ clientEdited.name+ " "+clientEdited.lastName+"'?", isOpen: isOpenDelete}}
              methods={{toggleOpenModal: ()=>setIsOpenDelete(!isOpenDelete)}}
                >
              <CustomForm onSubmit={HandleDelete}>
                <CustomInput type="hidden" value={clientEdited.id} className='form-control mt-2' name='exerciseIdDelete'/>
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