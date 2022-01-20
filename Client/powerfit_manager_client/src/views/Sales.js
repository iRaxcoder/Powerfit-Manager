import React, { useEffect, useState, useRef } from "react";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import DownloadButton from "../components/DownloadButton";
import {CustomInput, SingleCustomInput} from "../components/CustomInput";
import commonDB from "../service/CommonDB";
import CancelButton from "../components/CancelButton";
import { exportToPdf, ExportToCsv } from "../utils/exportData";
import moment from "moment";

export default function Sales(){
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [saleEdited, setSaleEdited] = useState({id:0, name:"def", stock:"def", price:0, lastModified: "def", details:"def"});
  const [saleList, setSaleList] = useState(null);
  const saleListRef= useRef();
  const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});
  saleListRef.current=saleList;

  const dataHeaderPDF = [["ID Venta","ID Cliente","Fecha","Total"]];
  const dataHeaderCSV = [ 
    { label: "ID Venta", key: 'ID_VENTA',},
    { label: "ID Cliente", key: 'ID_CLIENTE'},
    { label: "Fecha",key: 'FECHA'},
    { label: "Total",key: 'TOTAL'},
                      ]

  const columns = React.useMemo(
      () => [
          { Header: "ID Venta", accessor: 'ID_VENTA',},
          { Header: "ID Cliente", accessor: 'ID_CLIENTE'},
          { Header: "Fecha",accessor: 'FECHA'},
          { Header: "Total",accessor: 'TOTAL'},
        ],
      []
  )

  const formatDate = (e) => {
    e.map(entrada => (
        entrada.FECHA = moment(entrada.FECHA).format('LL')
    ))
}

  const fetchSales = () => {
      commonDB.getAll({header:"venta"}).then(response=>{
      formatDate(response)
      setSaleList(response)
    })
  }
  
  useEffect(()=>{
    fetchSales();
  },[]);

  if(!saleList) return "No se encuentran ventas aún.";
    
    const handleInsert = (e) => {
      commonDB.insert({header:"venta",size:"5", object: e}).then(response=>{   
          setModalMsg(prevState =>({
            ...prevState,
            msg: response,
            isMsgOpen: true
          }));
        fetchSales();
      })
      setIsOpenInsert(false);
    }

    const HandleOpenDelete = (e) => {
      const sale = JSON.parse(e.target.dataset.row);
      setSaleEdited({id:sale.ID_VENTA})
      setIsOpenDelete(true);
    }

    const HandleDelete = () => {
      commonDB.delete({header:"venta", object: {id:saleEdited.id}}).then(response=>{   
        setModalMsg(prevState =>({
          ...prevState,
          msg: response,
          isMsgOpen: true
        }));
        fetchSales();
      })
    setIsOpenDelete(false);
    }

    const handleSearch = (e) => {
      console.log(e.target.value);
      if(e.target.value===undefined || e.target.value ===""){
        fetchSales();
      }else{
        commonDB.getSearch({header: "producto",find:e.target.value}).then(response=>{
          formatDate(response)
          setSaleList(response);
        })
      }
    }

    const exportPDF=()=>{
      const data = saleListRef.current.map((product)=>
      ([product.ID_PRODUCTO,product.NOMBRE,product.STOCK,product.PRECIO_UNITARIO,product.ULT_INGRESO,product.DETALLES]));
      exportToPdf(dataHeaderPDF,data, "Reporte de productos en inventario");
    }

    return (
        <div>
            <h1 className="text-left">Control de ventas</h1>
            <hr/>
            <div className="container">
                <div className="container-insert-search__">
                  <div>
                    <AddButton text="Insertar" onClick={()=>setIsOpenInsert(true)} />
                    <DownloadButton onClick={exportPDF} text="PDF"/>
                    <ExportToCsv headers={dataHeaderCSV} data={saleList} fileName={"ventas_powerfit_"+moment()+".csv"}/>
                  </div>
                  <SingleCustomInput onChange={handleSearch} placeholder="Buscar" name="input-search" className="search__"/>
                </div>    
                <Table
                  columns={columns}
                  editRestricted={true}
                  data={saleList}
                  aux={saleListRef.current}
                  funDelete={HandleOpenDelete}
                />
            </div>
            <CustomModal
              props={{title: 'Insertar producto', isOpen: isOpenInsert}}
              methods={{toggleOpenModal: ()=>setIsOpenInsert(!isOpenInsert)}}
                >
              <CustomForm onSubmit={handleInsert}>
                <CustomInput errorMsg="nombre requerido" className='mt-2' name='product_name_insert' placeholder='Nombre'></CustomInput>
                <CustomInput type="number" min="1" errorMsg="cantidad requerida" className='mt-2' name='stock_insert' placeholder='Cantidad'></CustomInput>
                <CustomInput min="1" type="number" errorMsg="precio requerido" className='mt-2' name='price_insert' placeholder='Precio'></CustomInput>
                <CustomInput type="date" errorMsg="ingreso requerido" className='mt-2' name='date_insert' placeholder='fecha de ingreso'></CustomInput>
                <CustomInput errorMsg="detalles requeridos" className='mt-2' name='details_insert' placeholder='Detalles'></CustomInput>
                <AddButton text="Insertar"/>
                <CancelButton fun={()=>setIsOpenInsert(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal
              props={{title: "¿Está seguro que desea eliminar la venta número #'"+ saleEdited.id+"'?", isOpen: isOpenDelete}}
              methods={{toggleOpenModal: ()=>setIsOpenDelete(!isOpenDelete)}}
                >
              <CustomForm onSubmit={HandleDelete}>
                <CustomInput type="hidden" value={saleEdited.id} className='form-control mt-2' name='exerciseIdDelete'/>
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