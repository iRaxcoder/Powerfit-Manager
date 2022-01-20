import React, { useState, useEffect, useRef } from "react";
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import { CustomInput, SingleCustomInput, LiveCustomSelect } from "../components/CustomInput";
import CancelButton from "../components/CancelButton"
import commonDB from "../service/CommonDB";
import moment from 'moment'


export default function Membership() {
    const [isOpenInsert, setIsOpenInsert] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [modalMsg, setModalMsg] = useState({ isMsgOpen: false, msg: "" });
    const [data, setData] = useState(null);
    const [clientList, setClientList] = useState(null);
    const [selectedClients, setSelectedClients] = useState(null);
    const dataRef = useRef();
    dataRef.current = data;
    const [element, setElement] = useState([
        {
            ID_MEMBRESIA: '',
            NOMBRE_CLIENTE: '',
            APELLIDO_CLIENTE: '',
            FECHA_INICIO: '',
            FECHA_FIN: '',
            TIPO_PAGO: '',
            MONTO: '',
            DETALLE: '',
            ESTADO: ''
        }
    ])
    const columns = React.useMemo(
        () => [
            {
                Header: '#', accessor: 'ID_MEMBRESIA'
            },
            {
                Header: 'Nombre', accessor: 'NOMBRE_CLIENTE'
            },
            {
                Header: 'Apellido', accessor: 'APELLIDO_CLIENTE'
            },

            {
                Header: 'Fecha inico', accessor: 'FECHA_INICIO'
            },
            {
                Header: 'Fecha fin', accessor: 'FECHA_FIN'
            },
            {
                Header: 'Tipo de Pago', accessor: 'TIPO_PAGO'
            },
            {
                Header: 'Monto', accessor: 'MONTO'
            },
            {
                Header: 'Detalles', accessor: 'DETALLE'
            }
            ,
            {
                Header: 'Estado', accessor: 'ESTADO'
            }


        ],
        []
    )

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
    const fetchData = () => {
        commonDB.getAll({ header: "membresia" }).then(response => {
            convertDate(response)

            setData(response)
        })
    }

    const convertDate = (e) => {
        e.map((entrada) => {
            entrada.FECHA_INICIO = moment(entrada.FECHA_INICIO).format('LL')
            entrada.FECHA_FIN = moment(entrada.FECHA_FIN).format('LL')
        })
    }

    useEffect(() => {
        fetchData();
    }, [setData]);
    if (!data) return "No se encuentran datos";

    const toggleModalInsert = () => {
        setIsOpenInsert(!isOpenInsert);

    }

    const toggleModalEdit = (e) => {
        const pago = JSON.parse(e.target.dataset.row);
        setElement({
            ID_MEMBRESIA: pago.ID_MEMBRESIA,
            NOMBRE_CLIENTE: pago.NOMBRE_CLIENTE,
            APELLIDO_CLIENTE: pago.APELLIDO_CLIENTE,
            FECHA_INICIO: pago.FECHA_INICIO,
            FECHA_FIN: pago.FECHA_FIN,
            TIPO_PAGO: pago.TIPO_PAGO,
            MONTO: pago.MONTO,
            DETALLE: pago.DETALLE

        });
        setIsOpenEdit(!isOpenEdit);
    }

    const toggleModalDelete = (e) => {
        const pago = JSON.parse(e.target.dataset.row);
        setElement({
            ID_MEMBRESIA: pago.ID_MEMBRESIA,
            NOMBRE_CLIENTE: pago.NOMBRE_CLIENTE,
            APELLIDO_CLIENTE: pago.APELLIDO_CLIENTE,
            FECHA_INICIO: pago.FECHA_INICIO,
            FECHA_FIN:pago.FECHA_FIN
        });
        setIsOpenDelete(!isOpenDelete);
    }

   
    const handleInsert = (e) => {
        e.ID_CLIENTE = selectedClients.value;
        console.log(selectedClients.value);
        commonDB.insert({ header: "membresia", size: "6", object: e }).then(response => {
            setModalMsg(prevState => ({
                ...prevState,
                msg: response,
                isMsgOpen: true
            }));
            fetchData();
        });
        toggleModalInsert();
    }

    const HandleEdit = (e) => {
        commonDB.update({ header: "membresia", size: "6", object: e }).then(response => {
            setModalMsg(prevState => ({
                ...prevState,
                msg: response,
                isMsgOpen: true
            }));
            fetchData();
        });
        setIsOpenEdit(!isOpenEdit);

    }

    const HandleDelete = (e) => {
        commonDB.delete({ header: "membresia", object: { id: e.membresia_id } }).then(response => {
            setModalMsg(prevState => ({
                ...prevState,
                msg: response,
                isMsgOpen: true
            }));
            fetchData();
        });
        setIsOpenDelete(!isOpenDelete);

    }
    const handleSearch = (e) => {
        if (e.target.value === undefined || e.target.value === "") {
            fetchData();
        } else {
            commonDB.getSearch({ header: "membresia", find: e.target.value }).then(response => {
                setData(response);
            })
        }
    }

    return (

        <div>
            <h1 className="text-left">Control Membresía</h1>
            <hr />
            <div className="container">
                <div className="container-insert-search__">
                    <AddButton text="Insertar" onClick={() => setIsOpenInsert(true)} />
                    <SingleCustomInput onChange={handleSearch} errorMsg="Ingrese la palabra a buscar" placeholder="Buscar" name="input" className="form-control" />
                </div>
                <Table
                    columns={columns}
                    data={data}
                    aux={dataRef.current}
                    funEdit={(e) => toggleModalEdit(e)}
                    funDelete={(e) => toggleModalDelete(e)}
                />
            </div>
            <CustomModal
                props={{ title: 'Insertar membresía', isOpen: isOpenInsert }}
                methods={{ toggleOpenModal: () => setIsOpenInsert(!isOpenInsert) }}
            >
                <CustomForm onSubmit={handleInsert}>
                    <LiveCustomSelect data={selectedClients} onChange={onChangeSearchClient} className='mt-2' placeHolder={"Buscar cliente..."} loadOptions={searchClient} />
                    <CustomInput errorMsg="Ingrese la fecha de inicio" type="date" className='mt-2' name='fecha_inicio_insert' placeholder='Fecha Inicio'></CustomInput>
                    <CustomInput errorMsg="Ingrese la fecha de fin" type="date" className='mt-2' name='fecha_fin_insert' placeholder='Fecha Fin'></CustomInput>
                    <CustomInput errorMsg="Ingrese el tipo de pago" className='mt-2' name='tipo_pago_insert' placeholder='Tipo de pago'></CustomInput>
                    <CustomInput errorMsg="Ingrese el monto" className='mt-2' name='monto_insert' placeholder='Monto'></CustomInput>
                    <CustomInput errorMsg="Ingrese el detalle" className='mt-2' name='detalle_insert' placeholder='Detalle de pago'></CustomInput>

                    <AddButton text="Insertar" type="submit" />
                    <CancelButton fun={() => setIsOpenInsert(!isOpenInsert)} />
                </CustomForm>

            </CustomModal>

            <CustomModal
                props={{ title: 'Actualizar membresía', isOpen: isOpenEdit }}
                methods={{ toggleOpenModal: () => setIsOpenEdit(!isOpenEdit) }}
            >
                <CustomForm onSubmit={HandleEdit}>
                    <CustomInput className='mt-2' type="hidden" name='membresia_id' value={element.ID_MEMBRESIA} placeholder='Id membresia'></CustomInput>
                    <CustomInput errorMsg="Ingrese la fecha inicio" type="date" className='mt-2' value={moment(element.FECHA_INICIO).format('YYYY-MM-DD')} onChange={(e) => setElement(prevState => ({ ...prevState, FECHA_INICIO: e.target.value }))} name='fecha_inicio_insert' placeholder='Fecha  Inicio'></CustomInput>
                    <CustomInput errorMsg="Ingrese la fecha de fin" type="date" className='mt-2' value={moment(element.FECHA_FIN).format('YYYY-MM-DD')} onChange={(e) => setElement(prevState => ({ ...prevState, FECHA_FIN: e.target.value }))} name='fecha_fin_insert' placeholder='Fecha Fin'></CustomInput>
                    <CustomInput errorMsg="Ingrese el tipo de pago" className='mt-2' value={element.TIPO_PAGO} onChange={(e) => setElement(prevState => ({ ...prevState, TIPO_PAGO: e.target.value }))} name='tipo_pago_insert' placeholder='Tipo de pago'></CustomInput>
                    <CustomInput errorMsg="Ingrese el monto" className='mt-2' value={element.MONTO} onChange={(e) => setElement(prevState => ({ ...prevState, MONTO: e.target.value }))} name='monto_insert' placeholder='Monto'></CustomInput>
                    <CustomInput errorMsg="Ingrese el detalle" className='mt-2' value={element.DETALLE} onChange={(e) => setElement(prevState => ({ ...prevState, DETALLE: e.target.value }))} name='detalle_insert' placeholder='Detalle de pago'></CustomInput>

                    <AddButton text="Guardar cambios" type="submit" />
                    <CancelButton fun={() => setIsOpenEdit(!isOpenEdit)} />
                </CustomForm>

            </CustomModal>

            <CustomModal
                props={{ title: "¿Desea eliminar membresía de " + element.NOMBRE_CLIENTE + " " + element.APELLIDO_CLIENTE + " de la fecha " + element.FECHA_INICIO +" al "+element.FECHA_FIN+ "?", isOpen: isOpenDelete }}
                methods={{ toggleOpenModal: () => setIsOpenDelete(!isOpenDelete) }}
            >
                <CustomForm onSubmit={HandleDelete}>
                    <CustomInput className='mt-2' type="hidden" name='membresia_id' value={element.ID_MEMBRESIA} placeholder='ID pago'></CustomInput>
                    <AddButton text="Si" type="submit" />
                    <CancelButton fun={() => setIsOpenDelete(!isOpenDelete)} />
                </CustomForm>

            </CustomModal>

            <CustomModal
                props={{ title: 'Mensaje del sistema', isOpen: modalMsg.isMsgOpen }}
                methods={{ toggleOpenModal: () => setModalMsg(!modalMsg.isMsgOpen) }}
            >
                <p>{modalMsg.msg}</p>
            </CustomModal>
        </div>
    );
}