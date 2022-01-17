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


export default function Assistance() {
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
            ID_ASISTENCIA: '',
            NOMBRE_CLIENTE: '',
            APELLIDO_CLIENTE: '',
            FECHA: ''
        }
    ])
    const columns = React.useMemo(
        () => [
            {
                Header: '#', accessor: 'ID_ASISTENCIA'
            },
            {
                Header: 'Nombre', accessor: 'NOMBRE_CLIENTE'
            },
            {
                Header: 'Apellido', accessor: 'APELLIDO_CLIENTE'
            },

            {
                Header: 'Fecha', accessor: 'FECHA'
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
        commonDB.getAll({ header: "asistencia" }).then(response => {
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
    }, []);
    if (!data) return "No se encuentran datos";

    const toggleModalInsert = () => {
        setIsOpenInsert(!isOpenInsert);

    }

    const toggleModalEdit = (e) => {
        const asistencia = JSON.parse(e.target.dataset.row);
        setElement({
            ID_ASISTENCIA: asistencia.ID_ASISTENCIA,
            NOMBRE_CLIENTE: asistencia.NOMBRE_CLIENTE,
            APELLIDO_CLIENTE: asistencia.APELLIDO_CLIENTE,
            FECHA: asistencia.FECHA
        });
        setIsOpenEdit(!isOpenEdit);
    }

    const toggleModalDelete = (e) => {
        const asistencia = JSON.parse(e.target.dataset.row);
        setElement({
            ID_ASISTENCIA: asistencia.ID_ASISTENCIA,
            NOMBRE_CLIENTE: asistencia.NOMBRE_CLIENTE,
            APELLIDO_CLIENTE: asistencia.APELLIDO_CLIENTE,
            FECHA: asistencia.FECHA
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

        commonDB.insert({ header: "asistencia", size: "2", object: e }).then(response => {
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
        commonDB.update({ header: "asistencia", size: "2", object: e }).then(response => {
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
        commonDB.delete({ header: "asistencia", object: { id: e.asistencia_id } }).then(response => {
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
            commonDB.getSearch({ header: "asistencia", find: e.target.value }).then(response => {
                setData(response);
            })
        }
    }

    return (

        <div>
            <h1 className="text-left">Control Asistencia</h1>
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
                    mostrar={data[0].CANT}
                    funEdit={(e) => toggleModalEdit(e)}
                    funDelete={(e) => toggleModalDelete(e)}
                />
            </div>
            <CustomModal
                props={{ title: 'Insertar asistencia', isOpen: isOpenInsert }}
                methods={{ toggleOpenModal: () => setIsOpenInsert(!isOpenInsert) }}
            >
                <CustomForm onSubmit={handleInsert}>
                    <LiveCustomSelect data={selectedClients} onChange={onChangeSearchClient} className='mt-2' placeHolder={"Buscar cliente..."} loadOptions={searchClient} />
                    <CustomInput errorMsg="Ingrese la fecha" type="date" className='mt-2' name='fecha_insert' placeholder='Fecha'></CustomInput>
                    <AddButton text="Insertar" type="submit" />
                    <CancelButton fun={() => setIsOpenInsert(!isOpenInsert)} />
                </CustomForm>

            </CustomModal>

            <CustomModal
                props={{ title: "Actualizar Asistencia de " + element.NOMBRE_CLIENTE + " " + element.APELLIDO_CLIENTE + "?", isOpen: isOpenEdit }}
                methods={{ toggleOpenModal: () => setIsOpenEdit(!isOpenEdit) }}
            >
                <CustomForm onSubmit={HandleEdit}>
                    <CustomInput className='mt-2' type="hidden" name='asistencia_id' value={element.ID_ASISTENCIA} placeholder='Id asistencia'></CustomInput>
                    <CustomInput errorMsg="Ingrese la fecha" type="date" className='mt-2' value={moment(element.FECHA).format('YYYY-MM-DD')} onChange={(e) => setElement(prevState => ({ ...prevState, FECHA: e.target.value }))} name='fecha_insert' placeholder='Fecha'></CustomInput>
                    <AddButton text="Guardar cambios" type="submit" />
                    <CancelButton fun={() => setIsOpenEdit(!isOpenEdit)} />
                </CustomForm>

            </CustomModal>

            <CustomModal
                props={{ title: "¿Desea eliminar la asistencia de " + element.NOMBRE_CLIENTE + " " + element.APELLIDO_CLIENTE + "de la fecha " + element.FECHA + "?", isOpen: isOpenDelete }}
                methods={{ toggleOpenModal: () => setIsOpenDelete(!isOpenDelete) }}
            >
                <CustomForm onSubmit={HandleDelete}>
                    <CustomInput className='mt-2' type="hidden" name='asistencia_id' value={element.ID_ASISTENCIA} placeholder='ID asistencia'></CustomInput>
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