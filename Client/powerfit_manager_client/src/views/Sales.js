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
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [productEdited, setProductEdited] = useState({id:0, name:"def", stock:"def", price:0, lastModified: "def", details:"def"});
  const [productList, setProductList] = useState(null);
  const productListRef= useRef();
  const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});
  productListRef.current=productList;

  const dataHeaderPDF = [["ID","Nombre","Stock","Precio Unitario","Ultimo ingreso","Detalles"]];
  const dataHeaderCSV = [ 
    { label: "ID", key: 'ID_PRODUCTO',},
    { label: "Nombre", key: 'NOMBRE'},
    { label: "Disponible",key: 'STOCK'},
    { label: "Precio Unit",key: 'PRECIO_UNITARIO'},
    { label: "Ult.Ingreso",key: 'ULT_INGRESO'},
    { label: "Detalles", key: 'DETALLES'}
                      ]

  const columns = React.useMemo(
      () => [
          { Header: "ID", accessor: 'ID_PRODUCTO',},
          { Header: "Nombre", accessor: 'NOMBRE'},
          { Header: "Disponible",accessor: 'STOCK'},
          { Header: "Precio Unit",accessor: 'PRECIO_UNITARIO'},
          { Header: "Ult.Ingreso",accessor: 'ULT_INGRESO'},
          { Header: "Detalles", accessor: 'DETALLES'},
        ],
      []
  )

  const formatDate = (e) => {
    e.map(entrada => (
        entrada.ULT_INGRESO = moment(entrada.ULT_INGRESO).format('LL')
    ))
}

  const fetchProducts = () => {
      commonDB.getAll({header:"producto"}).then(response=>{
      formatDate(response)
      setProductList(response)
    })
  }
  
  useEffect(()=>{
    fetchProducts();
  },[]);

  if(!productList) return "No se encuentran ventas aún.";
    
    const handleInsert = (e) => {
      commonDB.insert({header:"producto",size:"5", object: e}).then(response=>{   
          setModalMsg(prevState =>({
            ...prevState,
            msg: response,
            isMsgOpen: true
          }));
        fetchProducts();
      })
      setIsOpenInsert(false);
    }

    const HandleOpenDelete = (e) => {
      const product = JSON.parse(e.target.dataset.row);
      setProductEdited({id:product.ID_PRODUCTO,name:product.NOMBRE})
      setIsOpenDelete(true);
    }

    const HandleDelete = () => {
      commonDB.delete({header:"producto", object: {id:productEdited.id}}).then(response=>{   
        setModalMsg(prevState =>({
          ...prevState,
          msg: response,
          isMsgOpen: true
        }));
        fetchProducts();
      })
    setIsOpenDelete(false);
    }

    const handleSearch = (e) => {
      console.log(e.target.value);
      if(e.target.value===undefined || e.target.value ===""){
        fetchProducts();
      }else{
        commonDB.getSearch({header: "producto",find:e.target.value}).then(response=>{
          formatDate(response)
          setProductList(response);
        })
      }
    }

    const exportPDF=()=>{
      const data = productListRef.current.map((product)=>
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
                    <ExportToCsv headers={dataHeaderCSV} data={productList} fileName={"productos_powerfit_"+moment()+".csv"}/>
                  </div>
                  <SingleCustomInput onChange={handleSearch} placeholder="Buscar" name="input-search" className="search__"/>
                </div>    
                <Table
                  columns={columns}
                  data={productList}
                  aux={productListRef.current}
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
              props={{title: "¿Está seguro que desea eliminar la venta '"+ productEdited.name+"'?", isOpen: isOpenDelete}}
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