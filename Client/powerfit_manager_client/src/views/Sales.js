import React, { useEffect, useState, useRef } from "react";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import DownloadButton from "../components/DownloadButton";
import {CustomInput, SingleCustomInput, LiveCustomSelect} from "../components/CustomInput";
import ProductItem from "../components/ProductItem";
import commonDB from "../service/CommonDB";
import CancelButton from "../components/CancelButton";
import { exportToPdf, ExportToCsv } from "../utils/exportData";
import moment from "moment";

export default function Sales(){
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [saleEdited, setSaleEdited] = useState({id:0, name:"def", stock:"def", price:0, lastModified: "def", details:"def"});
  const [saleList, setSaleList] = useState(null);
  const [productList, setProductList] = useState(null);
  const saleListRef= useRef();
  const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});
  saleListRef.current=saleList;
  const [selectedClients, setSelectedClients] = useState(null);

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

  const fetchProducts = () => {
    commonDB.getAll({header:"producto"}).then(response=>{
    formatDate(response)
    setProductList(response)
    })
  }
  
  useEffect(()=>{
    fetchSales();
    fetchProducts();
  },[]);

  if(!saleList) return "No se encuentran ventas aún.";
  if(!productList) return "No se encuentran productos aún."

  const searchClient = (find, callback) => {
    commonDB.getSearch({ header: "cliente", find: find }).then(response => {
        setSelectedClients(response);
    })

    callback(selectedClients.map(client => ({
        label: client.NOMBRE_CLIENTE + " " + client.APELLIDOS,
        value: client.ID_CLIENTE
    })))
  }

  const onChangeSearchClient = (selected) => {
    setSelectedClients(selected);
  }
    
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

    const showProducts = productList.map((product,index)=>{
        return (
          <ProductItem 
          key={index}
          name={product.NOMBRE} 
          stock={product.STOCK} 
          details={product.DETALLES} 
          price={product.PRECIO_UNITARIO}/>
        );
    })

    const handleSearchProduct = (e) => {
      if(e.target.value===undefined || e.target.value ===""){
        fetchProducts();
      }else{
        commonDB.getSearch({header: "producto",find:e.target.value}).then(response=>{
          formatDate(response)
          setProductList(response);
        })
      }
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
              props={{title: 'Realizar venta', isOpen: isOpenInsert}}
              methods={{toggleOpenModal: ()=>setIsOpenInsert(!isOpenInsert)}}
                >
                <LiveCustomSelect data={selectedClients} onChange={onChangeSearchClient} className='mt-2' placeHolder={"Seleccionar comprador (cliente)..."} loadOptions={searchClient} />
                <CustomForm>
                  <CustomInput onChange={handleSearchProduct} placeHolder="Buscar un producto..." type="text" className='form-control mt-2 mb-2' name='searchProducto'/>
                </CustomForm>
                {showProducts}
            </CustomModal>
            <CustomModal
              props={{title: "¿Está seguro que desea eliminar la venta número #'"+ saleEdited.id+"'?", isOpen: isOpenDelete}}
              methods={{toggleOpenModal: ()=>setIsOpenDelete(!isOpenDelete)}}
                >
              <CustomForm onSubmit={HandleDelete}>
                <CustomInput type="hidden" value={saleEdited.id} className='form-control mt-2' name='salesIdDelete'/>
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