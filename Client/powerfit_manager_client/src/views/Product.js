import React, { useEffect, useState, useRef } from "react";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import DownloadButton from "../components/DownloadButton";
import {CustomInput, SingleCustomInput} from "../components/CustomInput";
import commonDB from "../service/CommonDB";
import CancelButton from "../components/CancelButton";
import { exportToPdf } from "../utils/exportData";

export default function Client(){
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [productEdited, setProductEdited] = useState({id:0, name:"def", lastName:"def", age:0, number: "def", email:"def", illness: "def"});
  const [productList, setProductList] = useState(null);
  const productListRef= useRef();
  const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});
  productListRef.current=productList;

  const dataHeader = [["Nombre","Stock","Precio Unitario","Ultimo ingreso","Detalles"]];

  const columns = React.useMemo(
      () => [
          { Header: "ID", accessor: 'ID_CLIENTE',},
          { Header: "Nombre", accessor: 'NOMBRE_CLIENTE'},
          { Header: "Disponible",accessor: 'APELLIDOS'},
          { Header: "Precio Unit",accessor: 'EDAD'},
          { Header: "Ult.Ingreso",accessor: 'TELEFONO'},
          { Header: "Detalles", accessor: 'EMAIL'},
        ],
      []
  )

  const fetchClients = () => {
      commonDB.getAll({header:"cliente"}).then(response=>{
      setProductList(response)
    })
  }
  
  useEffect(()=>{
    fetchClients();
  },[]);

  if(!productList) return "No se encuentran clientes aún.";
    
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
      setProductEdited(
      {name:client.NOMBRE_CLIENTE, lastName: client.APELLIDOS, age: client.EDAD, number: client.TELEFONO, email: client.EMAIL, illness: client.ENFERMEDAD})
      setIsOpenEdit(true);
    }

    const HandleEdit = () => {
        commonDB.update({header:"cliente",size:"7", object: productEdited}).then(response=>{   
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
      setProductEdited({id:client.ID_CLIENTE,name:client.NOMBRE_CLIENTE,lastName:client.APELLIDOS})
      setIsOpenDelete(true);
    }

    const HandleDelete = () => {
      commonDB.delete({header:"cliente", object: {id:productEdited.id}}).then(response=>{   
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
          setProductList(response);
        })
      }
    }

    const exportPDF=()=>{
      const data = productListRef.current.map((cliente)=>
      ([cliente.ID_CLIENTE,cliente.NOMBRE_CLIENTE,cliente.APELLIDOS,cliente.EDAD,cliente.TELEFONO,cliente.EMAIL,cliente.ENFERMEDAD]));
      exportToPdf(dataHeader,data, "Reporte de clientes");
    }

    return (
        <div>
            <h1 className="text-left">Control de clientes</h1>
            <hr/>
            <div className="container">
                <div className="container-insert-search__">
                  <div>
                    <AddButton text="Insertar" onClick={()=>setIsOpenInsert(true)} />
                    <DownloadButton onClick={exportPDF} text="PDF"/>
                  </div>
                  <SingleCustomInput onChange={handleSearch} placeholder="Buscar" name="input-search" className="search__"/>
                </div>    
                <Table
                  columns={columns}
                  data={productList}
                  aux={productListRef.current}
                  funEdit={HandleOpenEdit}
                  funDelete={HandleOpenDelete}
                />
            </div>
            <CustomModal
              props={{title: 'Insertar cliente', isOpen: isOpenInsert}}
              methods={{toggleOpenModal: ()=>setIsOpenInsert(!isOpenInsert)}}
                >
              <CustomForm onSubmit={handleInsert}>
                <CustomInput errorMsg="Nombre requerido" className='mt-2' name='client_name_insert' placeholder='Nombre'></CustomInput>
                <CustomInput errorMsg="Apellidos requeridos" className='mt-2' name='last_name_insert' placeholder='Apellidos'></CustomInput>
                <CustomInput errorMsg="Edad requerida" className='mt-2' name='age_name_insert' placeholder='Edad'></CustomInput>
                <CustomInput errorMsg="Teléfono requerido" className='mt-2' name='number_insert' placeholder='Teléfono'></CustomInput>
                <CustomInput errorMsg="Correo requerido" className='mt-2' name='email_insert' placeholder='Email'></CustomInput>
                <CustomInput errorMsg="Este campo es requerido" className='mt-2' name='illness_insert' placeholder='Enfermedad'></CustomInput>
                <AddButton text="Insertar"/>
                <CancelButton fun={()=>setIsOpenInsert(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal
              props={{title: 'Modificar cliente', isOpen: isOpenEdit}}
              methods={{toggleOpenModal: ()=>setIsOpenEdit(!isOpenEdit)}}
                >
              <CustomForm onSubmit={HandleEdit}>
                <CustomInput type="hidden" value={productEdited.id} className='form-control mt-2' name='client_id_edit'/>
                <CustomInput errorMsg="Nombre requerido" onChange={(e)=>setProductEdited(prevState =>({...prevState,name:e.target.value}))} value={productEdited.name} className='form-control mt-2' name='client_name_edit' placeholder='Nombre'></CustomInput>
                <CustomInput errorMsg="Apellidos requeridos" onChange={(e)=>setProductEdited(prevState =>({...prevState,lastName:e.target.value}))} value={productEdited.lastName} className='form-control mt-2' name='last_name_editt' placeholder='Apellidos'></CustomInput>
                <CustomInput errorMsg="Edad requerida" onChange={(e)=>setProductEdited(prevState =>({...prevState,age:e.target.value}))} value={productEdited.age} className='form-control mt-2' name='age_name_edit' placeholder='Edad'></CustomInput>
                <CustomInput errorMsg="Teléfono requerido" onChange={(e)=>setProductEdited(prevState =>({...prevState,number:e.target.value}))}value={productEdited.number} className='form-control mt-2' name='number_edit' placeholder='Teléfono'></CustomInput>
                <CustomInput errorMsg="Correo requerido"onChange={(e)=>setProductEdited(prevState =>({...prevState,email:e.target.value}))} value={productEdited.email} className='form-control mt-2' name='email_edit' placeholder='Email'></CustomInput>
                <CustomInput errorMsg="Este campo es requerido"onChange={(e)=>setProductEdited(prevState =>({...prevState,illness:e.target.value}))} value={productEdited.illness} className='form-control mt-2' name='illness_edit' placeholder='Enfermedad'></CustomInput>
                <AddButton type="submit" text="Guardar cambios"/>
                <CancelButton fun={()=>setIsOpenEdit(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal
              props={{title: "¿Está seguro que desea eliminar el cliente '"+ productEdited.name+ " "+productEdited.lastName+"'?", isOpen: isOpenDelete}}
              methods={{toggleOpenModal: ()=>setIsOpenDelete(!isOpenDelete)}}
                >
              <CustomForm onSubmit={HandleDelete}>
                <CustomInput type="hidden" value={productEdited.id} className='form-control mt-2' name='exerciseIdDelete'/>
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