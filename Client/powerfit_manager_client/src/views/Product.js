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

export default function Client(){
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

  if(!productList) return "No se encuentran productos aún.";
    
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

    const HandleOpenEdit = (e) => {
      const product = JSON.parse(e.target.dataset.row);
      product.ULT_INGRESO=moment(product.ULT_INGRESO).format('YYYY-MM-DD');
      setProductEdited(
      {id: product.ID_PRODUCTO,name:product.NOMBRE, stock: product.STOCK, price: product.PRECIO_UNITARIO, lastModified: product.ULT_INGRESO, details: product.DETALLES})
      setIsOpenEdit(true);
    }

    const HandleEdit = () => {
        commonDB.update({header:"producto",size:"6", object: productEdited}).then(response=>{   
          setModalMsg(prevState =>({
            ...prevState,
            msg: response,
            isMsgOpen: true
          }));
          fetchProducts();
        })
      setIsOpenEdit(false);
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
            <h1 className="text-left">Control de inventario</h1>
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
                  funEdit={HandleOpenEdit}
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
              props={{title: 'Modificar producto', isOpen: isOpenEdit}}
              methods={{toggleOpenModal: ()=>setIsOpenEdit(!isOpenEdit)}}
                >
              <CustomForm onSubmit={HandleEdit}>
                <CustomInput type="hidden" value={productEdited.id} className='form-control mt-2' name='product_id_edit'/> 
                <CustomInput errorMsg="Nombre requerido" onChange={(e)=>setProductEdited(prevState =>({...prevState,name:e.target.value}))} value={productEdited.name} className='form-control mt-2' name='name_edit' placeholder='Nombre'></CustomInput>
                <CustomInput type="number" errorMsg="cantidad requerida" onChange={(e)=>setProductEdited(prevState =>({...prevState,stock:e.target.value}))} value={productEdited.stock} className='form-control mt-2' name='stock_editt' placeholder='cantidad'></CustomInput>
                <CustomInput type="number" errorMsg="precio requerido" onChange={(e)=>setProductEdited(prevState =>({...prevState,price:e.target.value}))} value={productEdited.price} className='form-control mt-2' name='price_edit' placeholder='precio'></CustomInput>
                <CustomInput type="date" errorMsg="fecha ingreso requerida" onChange={(e)=>setProductEdited(prevState =>({...prevState,lastModified:e.target.value}))}value={moment(productEdited.lastModified).format('YYYY-MM-DD')} className='form-control mt-2' name='date_edit' placeholder='Teléfono'></CustomInput>
                <CustomInput errorMsg="detalle requerido"onChange={(e)=>setProductEdited(prevState =>({...prevState,details:e.target.value}))} value={productEdited.details} className='form-control mt-2' name='details_edit' placeholder='detalles'></CustomInput>
                <AddButton type="submit" text="Guardar cambios"/>
                <CancelButton fun={()=>setIsOpenEdit(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal
              props={{title: "¿Está seguro que desea eliminar el producto '"+ productEdited.name+"'?", isOpen: isOpenDelete}}
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