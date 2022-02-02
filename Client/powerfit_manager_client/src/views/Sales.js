import React, { useEffect, useState, useRef } from "react";
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import DownloadButton from "../components/DownloadButton";
import {CustomInput, SingleCustomInput, LiveCustomSelect, CustomSelect} from "../components/CustomInput";
import ProductItem from "../components/ProductItem";
import commonDB from "../service/CommonDB";
import SalesDB from "../service/Sales";
import CancelButton from "../components/CancelButton";
import { exportToPdf, ExportToCsv } from "../utils/exportData";
import moment from "moment/min/moment-with-locales";
import "../styles/Sales/shopingCar.css"
import "../styles/Sales/orderInfo.css"

export default function Sales(){
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenGeneralView, setIsOpenGeneralView] = useState(false);
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
  const [isOpenSaleInfo, setisOpenSaleInfo]=useState(false);
  const [saleHeader,setSaleHeader]=useState({saleId:0,client:"def",date:"def",total:0});
  const [saleInfo,setSaleInfo]=useState([]);
  const [saleInfoRef, setSaleInfoRef]=useState([]);
  const [yearFilter, setYearFilter]=useState(new Date().getFullYear());
  const [salesStats,setsalesStats]=useState({highlights:{},productStats:[],monthStats:[],topClients:[]});

  const [filterType, setFilterType]=useState("hoy");

  const dataHeaderPDF = [["ID Venta","ID Cliente","Cliente","Fecha","Total"]];
  const dataHeaderSalePDF = [["Producto","Cantidad","Subtotal(CRC)"]];
  const dataHeaderCSV = [ 
    { label: "ID Venta", key: 'ID_VENTA',},
    { label: "ID Cliente", key: 'ID_CLIENTE'},
    { label: "Cliente", key: 'NOMBRE_CLIENTE'},
    { label: "Fecha", key: 'FECHA'},
    { label: "Total", key: 'TOTAL'},
                      ]

  const columns = React.useMemo(
      () => [
          { Header: "ID Venta", accessor: 'ID_VENTA',},
          { Header: "ID Cliente", accessor: 'ID_CLIENTE'},
          {Header:"Cliente",accessor:"NOMBRE_CLIENTE"},
          { Header: "Fecha",accessor: 'FECHA'},
          { Header: "Total(₡)",accessor: 'TOTAL'},
        ],
      []
  )

  const columnsSaleInfo = React.useMemo(
    () => [
        { Header: "Producto", accessor: 'NOMBRE',},
        { Header: "Cantidad", accessor: 'CANTIDAD'},
        {Header:"Subtotal",accessor:"SUBTOTAL"},
      ],
    []
  )

  const columnsSalesMonth = React.useMemo(
    () => [
        { Header: "Mes", accessor: 'MES',},
        { Header: "Total(₡)", accessor: 'TOTAL_VENDIDO'},
      ],
    []
  )

  const columnsProductSales = React.useMemo(
    () => [
        { Header: "Producto", accessor: 'NOMBRE',},
        { Header: "Veces vendido", accessor: 'CANTIDAD'},
      ],
    []
  )

  const columnsTopClients = React.useMemo(
    () => [
        { Header: "Cliente", accessor: 'NOMBRE',},
        { Header: "Compras realizadas", accessor: 'VENTAS'},
        { Header: "Total(₡)", accessor: 'TOTAL'},
      ],
    []
  )

  const selectFilter = [{ value: 'Hoy' }, { value: 'Ayer' }, { value: 'Esta semana'}, { value: 'Todas'}];

  const formatDate = (e) => {
    e.map(entrada => (
        entrada.FECHA = moment(entrada.FECHA).locale("es").format('LL')
    ))
  }

  const fetchSales = () => {
    commonDB.getSearch({ header: "ventas_filtro", find: "Hoy" }).then(response => {
      formatDate(response);
      setSaleList(response);
    })
  }

  const fetchProducts = () => {
    commonDB.getAll({header:"producto"}).then(response=>{
    formatDate(response)
    setProductList(response)
    })
  }

  const fetchSalesStats = () => {
    SalesDB.getSalesStats({year:yearFilter}).then(response=>{
      setsalesStats({highlights:response.highlights[0][0],productStats:response.productStats[0],monthStats:response.monthStats[0],topClients:response.topClients[0]});
      });
  }
  
  useEffect(()=>{
    fetchSales();
    fetchProducts();
    fetchSalesStats();
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
    };  
    const onChangeSearchClient = (selected) => {
      setSelectedClients(selected);
    }; 
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
    };
    const HandleOpenDelete = (e) => {
      const sale = JSON.parse(e.target.dataset.row);
      setSaleEdited({id:sale.ID_VENTA})
      setIsOpenDelete(true);
    };
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
    };
    const handleSearch = (e) => {
      if(e.target.value===undefined || e.target.value ===""){
        fetchSales();
      }else{
        commonDB.getSearch({header: "venta",find:e.target.value}).then(response=>{
          setFilterType("búsqueda");
          formatDate(response)
          setSaleList(response);
        })
      }
    };
    const handleFiltro = (e) => {
      if (e.target.value === undefined || e.target.value === "") {
          fetchSales();
      } else {
          commonDB.getSearch({ header: "ventas_filtro", find: e.target.value }).then(response => {
              setFilterType((e.target.value).toLowerCase());
              formatDate(response);
              setSaleList(response);
          })
      }
    }
    const exportPDF=()=>{
      const data = saleListRef.current.map((sale)=>
      ([sale.ID_VENTA,sale.ID_CLIENTE,sale.NOMBRE_CLIENTE,sale.FECHA,sale.TOTAL]));
      exportToPdf(dataHeaderPDF,data, "Reporte de ventas "+ moment());
    };
    const exportPDFSaleInfo=()=>{
      const saleInfo = ["Compra de "+saleHeader.client,"Realizada el "+saleHeader.date
      ,"Monto: "+saleHeader.total+" colones (sin impuestos aplicables)","Lista de productos: "];
      const data = saleInfoRef.map((sale)=>
      ([sale.NOMBRE,sale.CANTIDAD,sale.SUBTOTAL]));
      exportToPdf(dataHeaderSalePDF,data, "Información de la venta "+ moment().format("DD/MM/YYYY"),saleInfo);
    };
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
    };
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
    });
    const onDeleteProductCar= (index) => {
      const selectedProduct= productList[carProducts[index].listPosition];
      selectedProduct.STOCK=Number(selectedProduct.STOCK)+Number(selectedProduct.ordered);
      selectedProduct.ordered=undefined;
      setTotalCarAmount(totalCarAmount-Number(carProducts[index].subtotal));
      setCarProducts(carProducts.filter((_,i)=>i!==index));
    };
    const handleSearchProduct = (e) => {
      if(e.target.value===undefined || e.target.value ===""){
        fetchProducts();
      }else{
        commonDB.getSearch({header: "producto",find:e.target.value}).then(response=>{
          formatDate(response)
          setProductList(response);
        })
      }
    };
    const refreshCar = () => {
      setTotalCarAmount(0);
      carProducts.forEach(
        product =>{
          productList[product.listPosition].STOCK = Number(productList[product.listPosition].STOCK) + Number(product.ordered)
          productList[product.listPosition].ordered = undefined
        });
      setCarProducts([]);
    };
    const getTotalCar = () => {
      let total=0;
      if(carProducts.length!==0){
        carProducts.forEach(product => total+=(Number(product.subtotal)));
      }
      setTotalCarAmount(total);
    };
    const onCarItemAmount = (e,index) => {
      const carProductsCopy=[...carProducts];
      const carItem=carProductsCopy[index];
      carItem.subtotal=Number(carItem.PRECIO_UNITARIO) * Number(e.target.value);
      setCarProducts(carProductsCopy);
      getTotalCar();
    };

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
    };

    const handleOrder = () => {
      SalesDB.insert({orderHeader: {clientId:orderClient,total:totalCarAmount},
      orderProducts:carProducts}).then(response=>{   
        setModalMsg(prevState =>({
          ...prevState,
          msg: response,
          isMsgOpen: true
        }));
        reloadSaleOrder();
      });
    };

    const reloadSaleOrder = () => {
      fetchSales();
      fetchProducts();
      setCarProducts([]);
      setTotalCarAmount(0);
      setIsOpenInsert(false);
      setIsOpenOrder(false);
      setSelectedClients([]);
    }

    const handleOpenSaleInfo = async (e) => {
      const row= JSON.parse(e.target.dataset.row);
      setSaleHeader({saleId:row.ID_VENTA,client:row.NOMBRE_CLIENTE,date:row.FECHA,total:row.TOTAL});
      setisOpenSaleInfo(true);
      await(new Promise((resolve,reject)=>{
        SalesDB.getSaleInfo({find: row.ID_VENTA}).then(response=>{
          setSaleInfo(response);
          setSaleInfoRef(response);
          resolve();
          });
      }));
    };

    const onChangeYearFilter = (e) => {
      setYearFilter(e.target.value);
    }

    const onFilterYearStats = () => {
      fetchSales();
      fetchProducts();
      fetchSalesStats();
    }

    return (
        <div>
            <h1 className="text-left module__title">Control de ventas</h1>
            <div className="container">
                <div className="container-insert-search__">
                  <div className="d-flex flex-row">
                    <AddButton text="Insertar" onClick={()=>setIsOpenInsert(true)} />
                    <AddButton text="Vista general" onClick={()=>setIsOpenGeneralView(true)} />
                    <CustomForm>
                        <CustomSelect focus="value" onChange={handleFiltro} errorMsg="Seleccione una opción" className='mt-2 ml-2' name='filtro' placeholder='seleccione una opcion' options={selectFilter}></CustomSelect>
                    </CustomForm>
                    <DownloadButton onClick={exportPDF} text="PDF"/>
                    <ExportToCsv headers={dataHeaderCSV} data={saleList} fileName={"ventas_powerfit_"+moment()+".csv"}/>
                  </div>
                  <SingleCustomInput onChange={handleSearch} placeholder="Buscar" name="input-search" className="search__"/>
                </div>
                <h4 className="data-filter">Mostrando ventas ({filterType}) {saleList.length} resultados</h4>    
                <Table
                  columns={columns}
                  editRestricted={true}
                  data={saleList}
                  aux={saleListRef.current}
                  funDelete={HandleOpenDelete}
                  funSee={handleOpenSaleInfo}
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
                  <CustomInput onChange={handleSearchProduct} placeHolder="Buscar un producto..." type="text" className='search__ mt-2 mb-2' name='searchProducto'/>
                </CustomForm>
                <div className="product-list">
                 {showProducts}
                </div>
            </CustomModal>
            <CustomModal
              props={{title: "¿Está seguro que desea eliminar la venta #"+ saleEdited.id+"?", isOpen: isOpenDelete}}
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
              props={{title: 'Detalles de venta', isOpen: isOpenSaleInfo}}
              methods={{toggleOpenModal: ()=>setisOpenSaleInfo(!isOpenSaleInfo)}}
              >
              <DownloadButton onClick={exportPDFSaleInfo} text="Generar PDF"/>
              <div className="order-info text-center">
                <h4>Compra de {saleHeader.client}</h4>
                <h4>Realizada el {saleHeader.date}</h4>
                <h4>Por un total de: ₡{saleHeader.total} colones (sin impuestos aplicables)</h4>
                <h3>Lista de productos</h3>
                <hr></hr>
                <Table
                  columns={columnsSaleInfo}
                  data={saleInfo}
                />
              </div>
            </CustomModal>
            <CustomModal 
              props={{title: 'Vista general de ventas', isOpen: isOpenGeneralView}}
              methods={{toggleOpenModal: ()=> setIsOpenGeneralView(!isOpenGeneralView)}}
              >
              <div>
                <div className="form-group row d-flex justify-content-center">
                  <label htmlFor="lbl_annio_sale" class="col-sm-4 col-form-label">Vista general de ventas según año: </label>
                    <div className="col-sm-4">
                      <input id="lbl_annio_sale" onChange={onChangeYearFilter} value={yearFilter} placeholder="filtro de año" type="number" min={2022} className="input-search"></input>
                    </div>
                    <button onClick={onFilterYearStats} className="btn btn-dark">Filtrar</button>
                </div>
                <hr/>
                <h4>Datos generales</h4>
                <ul className="list-group">
                  <li className="list-group-item list-group-item-success">Ventas totales: ₡{salesStats.highlights["@total_vendido"]??"(No se ha podido calcular.)"} </li>
                  <li className="list-group-item list-group-item-primary">Ventas totales en mes actual: ₡{salesStats.highlights["@total_vendido_mes"]??"(No se ha podido calcular.)"} </li>
                  <li className="list-group-item list-group-item-warning">El producto más vendido: {salesStats.highlights["@prod_mas_vendido"]??" No se ha podido calcular."} </li>
                  <li className="list-group-item list-group-item-danger">El producto menos vendido: {salesStats.highlights["@prod_menos_vendido"]??"No se ha podido calcular."}</li>
                </ul>
                <h4>Ventas totales de cada mes</h4>
                <Table
                  columns={columnsSalesMonth}
                  data={salesStats.monthStats??[]}
                />
                <h4 className="mt-2">Ventas de productos</h4>
                <Table
                  columns={columnsProductSales}
                  data={salesStats.productStats??[]}
                />
                <h4 className="mt-2">Top 10 compradores</h4>
                <Table
                  columns={columnsTopClients}
                  data={salesStats.topClients??[]}
                />
              </div>
            </CustomModal>
        </div>
    );
}