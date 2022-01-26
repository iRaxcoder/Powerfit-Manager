import React, { useEffect, useState, useRef } from "react";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import DownloadButton from "../components/DownloadButton";
import {CustomInput, SingleCustomInput, LiveCustomSelect} from "../components/CustomInput";
import ProductItem from "../components/ProductItem";
import commonDB from "../service/CommonDB";
import SalesDB from "../service/Sales";
import CancelButton from "../components/CancelButton";
import { exportToPdf, ExportToCsv } from "../utils/exportData";
import moment from "moment";
import "../styles/Sales/shopingCar.css"

export default function Sales(){
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [saleEdited, setSaleEdited] = useState({id:0, name:"def", stock:"def", price:0, lastModified: "def", details:"def"});
  const [saleList, setSaleList] = useState(null);
  const [productList, setProductList] = useState(null);
  const [carProducts, setCarProducts] = useState([]);
  const saleListRef= useRef();
  const [modalMsg, setModalMsg]= useState({isMsgOpen: false, msg: ""});
  saleListRef.current=saleList;
  const [selectedClients, setSelectedClients] = useState([]);
  const [totalCarAmount, setTotalCarAmount] = useState(0);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [orderClient, setOrderClient]= useState("def");

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
    if(find!==undefined){
      commonDB.getSearch({ header: "cliente", find: find }).then(response => {
        setOrderClient(response[0].ID_CLIENTE);
        setSelectedClients(response);
      })
    }
    if(Array.isArray(selectedClients)){
      callback(selectedClients.map(client => ({
        label: client.NOMBRE_CLIENTE + " " + client.APELLIDOS,
        value: client.ID_CLIENTE
      })))
    }
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

    const onQueueProduct = (e) =>{
      const selectedProduct= productList[e.productId];
      selectedProduct.ordered=e.quantityOrder;
      selectedProduct.listPosition=e.productId;
      selectedProduct.subtotal=Number(selectedProduct.PRECIO_UNITARIO)*Number(selectedProduct.ordered);
      setTotalCarAmount(totalCarAmount+selectedProduct.subtotal);
      if(selectedProduct.ordered>selectedProduct.STOCK){
        setModalMsg(prevState =>({
          ...prevState,
          msg: "El producto excede lo disponible",
          isMsgOpen: true
        }));
      }else{
        selectedProduct.STOCK=selectedProduct.STOCK-e.quantityOrder;
        setCarProducts([...carProducts,selectedProduct]);
      }
    }

    const showProducts = productList.map((product,index)=>{
        return (
          <>
          <ProductItem
          ordered={product.ordered}
          id={index}
          onQueue={onQueueProduct}
          name={product.NOMBRE} 
          stock={product.STOCK} 
          details={product.DETALLES}
          price={product.PRECIO_UNITARIO}/>
          </>
        );
    })

    const onDeleteProductCar= (index) => {
      const selectedProduct= productList[carProducts[index].listPosition];
      selectedProduct.STOCK=Number(selectedProduct.STOCK)+Number(selectedProduct.ordered);
      selectedProduct.ordered=undefined;
      setTotalCarAmount(totalCarAmount-Number(carProducts[index].subtotal));
      setCarProducts(carProducts.filter((_,i)=>i!==index));
    }

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
    const refreshCar = () => {
      setTotalCarAmount(0);
      carProducts.forEach(
        product =>{
          productList[product.listPosition].STOCK = Number(productList[product.listPosition].STOCK) + Number(product.ordered)
          productList[product.listPosition].ordered = undefined
        });
      setCarProducts([]);
    }
    const getTotalCar = () => {
      let total=0;
      if(carProducts.length!==0){
        carProducts.forEach(product => total+=(Number(product.subtotal)));
      }
      setTotalCarAmount(total);
    }
    const onCarItemAmount = (e,index) => {
      const carProductsCopy=[...carProducts];
      const carItem=carProductsCopy[index];
      carItem.subtotal=Number(carItem.PRECIO_UNITARIO) * Number(e.target.value);
      setCarProducts(carProductsCopy);
      getTotalCar();
    }

    const onFinishSell = () => {
      if (selectedClients!==null && selectedClients.label !==undefined){
          if(carProducts.length>=1){
            console.log(selectedClients);
            setIsOpenOrder(true);
          }else{
            setModalMsg(prevState =>({
              ...prevState,
              msg: "Debe agregar al menos un producto en el carrito.",
              isMsgOpen: true
            }));
          }
      }else{
        setModalMsg(prevState =>({
          ...prevState,
          msg: "Debe seleccionar un cliente para proceeder con la venta.",
          isMsgOpen: true
        }));
      }
    }

    const handleOrder = () => {
      SalesDB.insert({header:"venta", orderHeader: {clientId:orderClient,total:totalCarAmount},
      orderProducts:carProducts}).then(response=>{   
        setModalMsg(prevState =>({
          ...prevState,
          msg: response,
          isMsgOpen: true
        }));
        fetchSales();
      })
    setIsOpenOrder(false);
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
                <div className="shoping-car">
                  <h3 className="shoping-car-title">Cola de productos</h3>
                  {carProducts.map((product,index)=>{
                    return (
                      <>
                      <div className="car-item">
                          <div>
                            <h4 className="car-item-subtotal">subtotal: ₡{product.subtotal}</h4>
                          </div>
                          <div className="car-item-order">
                            <h4 className="car-item-title">{product.NOMBRE}</h4>
                            <input className="product-quantity" type="number" onChange={(e)=>onCarItemAmount(e,index)} defaultValue={product.ordered} max={product.STOCK===0?product.ordered:Number(product.STOCK) + Number(product.ordered)} min={1}></input>
                            <button onClick={()=>onDeleteProductCar(index)} className="btn btn-danger">X</button>
                          </div>
                      </div>
                     </>
                    );
                  })}
                  <h4 className="car-total">Total: ₡{totalCarAmount} </h4>
                  <ul className="car-options">
                    <a onClick={onFinishSell} className="car-option confirm">Finalizar venta</a>
                    <a onClick={refreshCar} className="car-option quit">Limpiar</a>
                  </ul> 
                </div>
                <LiveCustomSelect data={selectedClients} onChange={onChangeSearchClient} className='mt-2' placeHolder={"Seleccionar comprador (cliente)..."} loadOptions={searchClient} />
                <CustomForm>
                  <CustomInput onChange={handleSearchProduct} placeHolder="Buscar un producto..." type="text" className='form-control mt-2 mb-2' name='searchProducto'/>
                </CustomForm>
                <div className="product-list">
                 {showProducts}
                </div>
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
              props={{title: "Confirmar compra a nombre de '"+ selectedClients.label+"'?", isOpen: isOpenOrder}}
              methods={{toggleOpenModal: ()=>setIsOpenDelete(!isOpenOrder)}}
                >
                {/* <ul role="list" className="order-product-list">
                  {carProducts.map((product)=>{
                    return (
                      <li className="order-product-item">{product.NOMBRE}</li>
                      );
                  })}
                </ul> */}
              <CustomForm onSubmit={handleOrder}>
                <AddButton text="Confirmar"/>
                <CancelButton fun={()=>setIsOpenOrder(false)}/>
              </CustomForm>
            </CustomModal>
            <CustomModal 
              props={{title: 'Mensaje del sistema', isOpen: modalMsg.isMsgOpen}}
              methods={{toggleOpenModal: ()=>setModalMsg(!modalMsg.isMsgOpen)}}
              >
              <p>{modalMsg.msg}</p>
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