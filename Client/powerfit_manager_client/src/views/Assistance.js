import React, { useState, useEffect, useRef } from "react";
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import { CustomInput, SingleCustomInput, LiveCustomSelect, CustomSelect } from "../components/CustomInput";
import CancelButton from "../components/CancelButton"
import commonDB from "../service/CommonDB";
import { exportToPdf, ExportToCsv } from "../utils/exportData";
import DownloadButton from "../components/DownloadButton";
import moment from 'moment'


export default function Assistance() {
    const [isOpenInsert, setIsOpenInsert] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenTop, setIsOpenTop] = useState(false);
    const [modalMsg, setModalMsg] = useState({ isMsgOpen: false, msg: "" });
    const [data, setData] = useState(null);
    const [dataTop, setDataTop] = useState(null);
    const [selectedClients, setSelectedClients] = useState(null);
    const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
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
    const dataHeader = [["Id Asistencia", "Nombre", "Apellidos", "Fecha"]];
    const columnsTop = React.useMemo(
        () => [
            { Header: 'Nombre', accessor: 'NOMBRE' },
            { Header: 'Telefono', accessor: 'TELEFONO' },
            { Header: 'Cantidad de Asistencias', accessor: 'ASISTENCIAS' }
        ]
    )
    const columns = React.useMemo(
        () => [
            { Header: '#', accessor: 'ID_ASISTENCIA' },
            { Header: 'Nombre', accessor: 'NOMBRE_CLIENTE' },
            { Header: 'Apellido', accessor: 'APELLIDO_CLIENTE' },
            { Header: 'Fecha', accessor: 'FECHA' }
        ],
        []
    )

    const dataHeaderCSV = [
        { label: "ID Asistencia", key: 'ID_ASISTENCIA', },
        { label: "Nombre", key: 'NOMBRE_CLIENTE' },
        { label: "Apellidos", key: 'APELLIDO_CLIENTE' },
        { label: "Fecha inico", key: 'FECHA' },
    ]

    const selectFiltro = [{ value: 'Hoy' }, { value: 'Ayer' }, { value: 'Todas las Semanas' }];

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
        commonDB.getSearch({ header: "asistencia_filtro", find: 'Hoy' }).then(response => {
            convertDate(response)
            setData(response);
        })
    }

    const fetchTop = () => {
        commonDB.getSearch({ header: "top_asistencia", find: yearFilter }).then(response => {
            convertDate(response)
            setDataTop(response);
        });
    }
    const convertDate = (e) => {
        e.map((entrada) => {
            entrada.FECHA = moment(new Date(entrada.FECHA)).format('LLL')
        })
    }

    useEffect(() => {
        fetchData();
        fetchTop();
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
                convertDate(response)
                setData(response);
            })
        }
    }
    const handleFiltro = (e) => {
        if (e.target.value === undefined || e.target.value === "") {
            fetchData();
        } else {
            commonDB.getSearch({ header: "asistencia_filtro", find: e.target.value }).then(response => {
                convertDate(response)
                setData(response);
            })
        }
    }

    const exportPDF = () => {
        const data = dataRef.current.map((asistencia) =>
            ([asistencia.ID_ASISTENCIA, asistencia.NOMBRE_CLIENTE, asistencia.APELLIDO_CLIENTE, asistencia.FECHA]));
        exportToPdf(dataHeader, data, "Reporte de Asistencia" + moment().format("DD/MM/YYYY"));
    }

    const onChangeYearFilter = (e) => {
        setYearFilter(e.target.value);
    }

    return (
        <div>
            <h1 className="text-left">Control de asistencia</h1>
            <hr />
            <div className="container">
                <div className="container-insert-search__">
                    <div className="d-flex flex-row">
                        <AddButton text="Insertar" onClick={() => setIsOpenInsert(true)} />
                        <AddButton text="TOP 10" onClick={() => setIsOpenTop(true)} />
                        <CustomForm>
                            <CustomSelect focus="value" onChange={handleFiltro} errorMsg="Seleccione una opción" className='mt-2 ml-2' name='filtro' placeholder='Nombre grupo muscular' options={selectFiltro}></CustomSelect>
                        </CustomForm>
                        <DownloadButton onClick={exportPDF} text="PDF" />
                        <ExportToCsv headers={dataHeaderCSV} data={dataRef.current} fileName={"asistencia_powerfit_" + moment().format("DD/MM/YYYY") + ".csv"} />
                    </div>
                    <SingleCustomInput onChange={handleSearch} errorMsg="Ingrese la palabra a buscar" placeholder="Buscar" name="input" className="search__" />
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
                props={{ title: 'Insertar asistencia', isOpen: isOpenInsert }}
                methods={{ toggleOpenModal: () => setIsOpenInsert(!isOpenInsert) }}
            >
                <CustomForm onSubmit={handleInsert}>
                    <LiveCustomSelect data={selectedClients} onChange={onChangeSearchClient} className='mt-2' placeHolder={"Buscar cliente..."} loadOptions={searchClient} />
                    <CustomInput errorMsg="Ingrese la fecha" type="datetime-local" className='mt-2' name='fecha_insert' placeholder='Fecha'></CustomInput>
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
                    <CustomInput errorMsg="Ingrese la fecha" type="datetime-local" className='mt-2' value={moment(element.FECHA).format('YYYY-MM-DDTHH:MM')} onChange={(e) => setElement(prevState => ({ ...prevState, FECHA: e.target.value }))} name='fecha_insert' placeholder='Fecha'></CustomInput>
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

            <CustomModal
                props={{ title: 'Top 10 de Asistencias', isOpen: isOpenTop }}
                methods={{ toggleOpenModal: () => setIsOpenTop(!isOpenTop) }}
            >
         
                    <div className="form-group row d-flex justify-content-center">
                        <label htmlFor="lbl_annio_sale" class="col-sm-4 col-form-label">Top 10 de asistencia según año: </label>
                        <div className="col-sm-4">
                            <input id="lbl_annio_sale" onChange={onChangeYearFilter} value={yearFilter} placeholder="filtro de año" type="number" min={2022} className="input-search"></input>
                        </div>
                        <button onClick={fetchTop} className="btn btn-dark">Filtrar</button>
                    </div>
                    <Table
                        columns={columnsTop}
                        data={dataTop ?? []}

                    />
              
                <hr />
            </CustomModal>
        </div>
    );
}