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


export default function Payments() {
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
            ID_PAGO: '',
            NOMBRE_CLIENTE: '',
            APELLIDO_CLIENTE: '',
            FECHA: '',
            TIPO_PAGO: '',
            MONTO: '',
            DETALLE: ''
        }
    ])
    const columns = React.useMemo(
        () => [
            {
                Header: '#', accessor: 'ID_PAGO'
            },
            {
                Header: 'Nombre', accessor: 'NOMBRE_CLIENTE'
            },
            {
                Header: 'Apellido', accessor: 'APELLIDO_CLIENTE'
            },

            {
                Header: 'Fecha', accessor: 'FECHA'
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
        commonDB.getAll({ header: "pago" }).then(response => {
            convert(response)

            setData(response)
        })
    }

    const convert = (e) => {
        e.map((entrada) => {
            entrada.FECHA = moment(entrada.FECHA).format('LL')
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
            ID_PAGO: pago.ID_PAGO,
            NOMBRE_CLIENTE: pago.NOMBRE_CLIENTE,
            APELLIDO_CLIENTE: pago.APELLIDO_CLIENTE,
            FECHA: pago.FECHA,
            TIPO_PAGO: pago.TIPO_PAGO,
            MONTO: pago.MONTO,
            DETALLE: pago.DETALLE

        });
        setIsOpenEdit(!isOpenEdit);
    }

    const toggleModalDelete = (e) => {
        const pago = JSON.parse(e.target.dataset.row);
        setElement({
            ID_PAGO: pago.ID_PAGO,
            NOMBRE_CLIENTE: pago.NOMBRE_CLIENTE,
            APELLIDO_CLIENTE: pago.APELLIDO_CLIENTE,
            FECHA: pago.FECHA,
        });
        setIsOpenDelete(!isOpenDelete);
    }

    const handleSearchClient = (e) => {
        console.log(e.target.value);
        commonDB.getSearch({ header: "cliente", find: e.target.value }).then(response => {
            console.log(response);
            const options = response.map((client) => ({
                name: client.ID_CLIENTE,
                value: client.NOMBRE_CLIENTE + ' ' + client.APELLIDOS
            }));
            setClientList(options);
        })

    };

    const handleInsert = (e) => {
        e.ID_CLIENTE = selectedClients.value;
        console.log(selectedClients.value);
        commonDB.insert({ header: "pago", size: "5", object: e }).then(response => {
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
        commonDB.update({ header: "pago", size: "5", object: e }).then(response => {
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
        commonDB.delete({ header: "pago", object: { id: e.pago_id } }).then(response => {
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
            commonDB.getSearch({ header: "pago", find: e.target.value }).then(response => {
                setData(response);
            })
        }
    }

    return (

        <div>
            <h1 className="text-left">Control Pagos</h1>
            <hr />
            <div className="container text-left">
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
                props={{ title: 'Insertar pago', isOpen: isOpenInsert }}
                methods={{ toggleOpenModal: () => setIsOpenInsert(!isOpenInsert) }}
            >
                <CustomForm onSubmit={handleInsert}>
                    <LiveCustomSelect data={selectedClients} onChange={onChangeSearchClient} placeHolder={"Buscar cliente..."} loadOptions={searchClient} />
                    <CustomInput errorMsg="Ingrese la fecha" type="date" className='form-control mt-2' name='fecha_insert' placeholder='Fecha'></CustomInput>
                    <CustomInput errorMsg="Ingrese el tipo de pago" className='form-control mt-2' name='tipo_pago_insert' placeholder='Tipo de pago'></CustomInput>
                    <CustomInput errorMsg="Ingrese el monto" className='form-control mt-2' name='monto_insert' placeholder='Monto'></CustomInput>
                    <CustomInput errorMsg="Ingrese el detalle" className='form-control mt-2' name='detalle_insert' placeholder='Detalle de pago'></CustomInput>

                    <AddButton text="Insertar" type="submit" />
                    <CancelButton fun={() => setIsOpenInsert(!isOpenInsert)} />
                </CustomForm>

            </CustomModal>

            <CustomModal
                props={{ title: 'Actualizar pago', isOpen: isOpenEdit }}
                methods={{ toggleOpenModal: () => setIsOpenEdit(!isOpenEdit) }}
            >
                <CustomForm onSubmit={HandleEdit}>
                    <CustomInput className='form-control mt-2' type="hidden" name='pago_id' value={element.ID_PAGO} placeholder='Id pago'></CustomInput>
                    <CustomInput errorMsg="Ingrese la fecha" type="date" className='form-control mt-2' value={moment(element.FECHA).format('YYYY-MM-DD')} onChange={(e) => setElement(prevState => ({ ...prevState, FECHA: e.target.value }))} name='fecha_insert' placeholder='Fecha'></CustomInput>
                    <CustomInput errorMsg="Ingrese el tipo de pago" className='form-control mt-2' value={element.TIPO_PAGO} onChange={(e) => setElement(prevState => ({ ...prevState, TIPO_PAGO: e.target.value }))} name='tipo_pago_insert' placeholder='Tipo de pago'></CustomInput>
                    <CustomInput errorMsg="Ingrese el monto" className='form-control mt-2' value={element.MONTO} onChange={(e) => setElement(prevState => ({ ...prevState, MONTO: e.target.value }))} name='monto_insert' placeholder='Monto'></CustomInput>
                    <CustomInput errorMsg="Ingrese el detalle" className='form-control mt-2' value={element.DETALLE} onChange={(e) => setElement(prevState => ({ ...prevState, DETALLE: e.target.value }))} name='detalle_insert' placeholder='Detalle de pago'></CustomInput>

                    <AddButton text="Guardar cambios" type="submit" />
                    <CancelButton fun={() => setIsOpenEdit(!isOpenEdit)} />
                </CustomForm>

            </CustomModal>

            <CustomModal
                props={{ title: "¿Desea eliminar el pago de " + element.NOMBRE_CLIENTE + " " + element.APELLIDO_CLIENTE + "de la fecha " + element.FECHA + "?", isOpen: isOpenDelete }}
                methods={{ toggleOpenModal: () => setIsOpenDelete(!isOpenDelete) }}
            >
                <CustomForm onSubmit={HandleDelete}>
                    <CustomInput className='form-control mt-2' type="hidden" name='pago_id' value={element.ID_PAGO} placeholder='ID pago'></CustomInput>
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