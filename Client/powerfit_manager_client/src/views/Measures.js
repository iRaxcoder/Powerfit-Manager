import React, { useState, useEffect, useRef } from "react";
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import { CustomInput, SingleCustomInput, LiveCustomSelect } from "../components/CustomInput";
import CancelButton from "../components/CancelButton"
import commonDB from "../service/CommonDB";
import measuresDB from "../service/Measures";
import { exportToPdf } from "../utils/exportData";
import DownloadButton from "../components/DownloadButton";
import { useForm } from "react-hook-form"
import moment from 'moment'

export default function Membership() {
    const [isOpenInsert, setIsOpenInsert] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenSee, setIsOpenSee] = useState(false);
    const [modalMsg, setModalMsg] = useState({ isMsgOpen: false, msg: "" });
    const [data, setData] = useState(null);
    const [selectedClients, setSelectedClients] = useState(null);
    const dataRef = useRef();
    dataRef.current = data;

    const { register, handleSubmit, reset } = useForm();
    const [elementSee, setElementSee] = useState([]);
    const [element, setElement] = useState([
        {
            ID_MEDICION: '', ID_DATOS: '', ID_CIRCUNFERENCIA: '', NOMBRE_CLIENTE: '', APELLIDO_CLIENTE: '',
            FECHA: '', EDAD: '', PESO: '', ALTURA: '', GRASA_CORPORAL: '',
            AGUA_CORPORAL: '', MASA_MUSCULAR: '', VALORACION_FISICA: '',
            METABOLISMO_BASAL: '', EDAD_METABOLICA: '', MASA_OSEA: '',
            GRASA_VISCERAL: '', BRAZO_DERECHO: '', BRAZO_IZQUIERDO: '',
            PECHO: '', ABDOMEN: '', CADERA: '', MUSLO_DERECHO: '',
            MUSLO_IZQUIERDO: '', PIERNA_DERECHA: '', PIERNA_IZQUIERDA: ''
        }
    ])
    const columns = React.useMemo(
        () => [
            { Header: '#', accessor: 'ID_MEDICION' },
            { Header: 'ID Datos', accessor: 'ID_DATOS' },
            { Header: 'ID Circunferencia', accessor: 'ID_CIRCUNFERENCIA' },
            { Header: 'Nombre', accessor: 'NOMBRE_CLIENTE' },
            { Header: 'Apellido', accessor: 'APELLIDO_CLIENTE' },
            { Header: 'Fecha', accessor: 'FECHA' }
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
    };
    const onChangeSearchClient = (selected) => {
        setSelectedClients(selected);
    };
    const fetchData = () => {
        commonDB.getAll({ header: "medicion_cliente" }).then(response => {
            convertDate(response)
            setData(response)
        })
    };

    const convertDate = (e) => {
        e.map((entrada) => (
            entrada.FECHA = moment(new Date(entrada.FECHA)).format('LL')
        ))
    };

    useEffect(() => {
        fetchData();
    }, [setData]);
    if (!data) return "No se encuentran datos";

    const toggleModalInsert = () => {
        setIsOpenInsert(!isOpenInsert);

    };

    const toggleModalSee = async (e) => {
        const row = JSON.parse(e.target.dataset.row);
        setIsOpenSee(true);
        await (new Promise((resolve, reject) => {
            measuresDB.getInfo({ find: row.ID_MEDICION }).then(response => {
                response.FECHA = moment(new Date(response.FECHA)).format('l')
                setElementSee(response);
                resolve();
            });
        }));
    };

    const toggleModalEdit = async (e) => {
        const row = JSON.parse(e.target.dataset.row);
        setIsOpenEdit(!isOpenEdit);
        await (new Promise((resolve, reject) => {
            measuresDB.getInfo({ find: row.ID_MEDICION }).then(response => {
                response.FECHA = moment(new Date(response.FECHA)).format('l')
                setElement({
                    NOMBRE_CLIENTE: response.NOMBRE_CLIENTE,
                    APELLIDO_CLIENTE: response.APELLIDO_CLIENTE,
                    ID_DATOS: response.ID_DATOS, ID_CIRCUNFERENCIA: response.ID_CIRCUNFERENCIA,
                    FECHA: response.FECHA, EDAD: response.EDAD, PESO: response.PESO, ALTURA: response.ALTURA,
                    GRASA_CORPORAL: response.GRASA_CORPORAL, AGUA_CORPORAL: response.AGUA_CORPORAL,
                    MASA_MUSCULAR: response.MASA_MUSCULAR, VALORACION_FISICA: response.VALORACION_FISICA,
                    METABOLISMO_BASAL: response.METABOLISMO_BASAL, EDAD_METABOLICA: response.EDAD_METABOLICA, MASA_OSEA: response.MASA_OSEA,
                    GRASA_VISCERAL: response.GRASA_VISCERAL, BRAZO_DERECHO: response.BRAZO_DERECHO, BRAZO_IZQUIERDO: response.BRAZO_IZQUIERDO,
                    PECHO: response.PECHO, ABDOMEN: response.ABDOMEN, CADERA: response.CADERA, MUSLO_DERECHO: response.MUSLO_DERECHO,
                    MUSLO_IZQUIERDO: response.MUSLO_IZQUIERDO, PIERNA_DERECHA: response.PIERNA_DERECHA, PIERNA_IZQUIERDA: response.PIERNA_IZQUIERDA

                });
                resolve();
            });

        }));

    };

    const toggleModalDelete = (e) => {
        const medida = JSON.parse(e.target.dataset.row);
        setElement({
            ID_MEDICION: medida.ID_MEDICION,
            ID_DATOS: medida.ID_DATOS,
            ID_CIRCUNFERENCIA: medida.ID_CIRCUNFERENCIA,
            NOMBRE_CLIENTE: medida.NOMBRE_CLIENTE,
            APELLIDO_CLIENTE: medida.APELLIDO_CLIENTE,
            FECHA: medida.FECHA
        });
        setIsOpenDelete(!isOpenDelete);
    };


    const handleInsert = (e) => {

        if (selectedClients !== null) {
            e.ID_CLIENTE = selectedClients.value;

            const datos = [e.peso_insert, e.altura_insert, e.grasa_corporal_insert, e.agua_corporal_insert,
            e.masa_muscular_insert, e.valora_fisica_insert, e.metab_basal_insert,
            e.edad_metab_insert, e.masa_osea_insert, e.grasa_visceral_insert];
            const circunferencia = [e.bd_insert, e.bi_insert, e.pecho_insert, e.abd_insert, e.cadera_insert,
            e.md_insert, e.mi_insert, e.pd_insert, e.pi_insert];

            measuresDB.insert({ header: e.ID_CLIENTE, datos: datos, circunferencia: circunferencia, sizeDatos: '10', sizeCircun: '9' }).then(response => {
                setModalMsg(prevState => ({
                    ...prevState,
                    msg: response,
                    isMsgOpen: true
                }));
                reset();
                fetchData();
            });
            toggleModalInsert();
            setSelectedClients(null);
        }
        else {
            setModalMsg(prevState => ({
                ...prevState,
                msg: "Debe seleccionar un cliente para proceeder con las mediciones.",
                isMsgOpen: true
            }));
        }
    };

    const HandleEdit = (e) => {
        const datos = [element.ID_DATOS, element.PESO, element.ALTURA, element.GRASA_CORPORAL, element.AGUA_CORPORAL,
        element.MASA_MUSCULAR, element.VALORACION_FISICA, element.METABOLISMO_BASAL,
        element.EDAD_METABOLICA, element.MASA_MUSCULAR, element.GRASA_VISCERAL];
        const circunferencia = [element.ID_CIRCUNFERENCIA, element.BRAZO_DERECHO, element.BRAZO_IZQUIERDO, element.PECHO, element.ABDOMEN, element.CADERA,
        element.MUSLO_DERECHO, element.MUSLO_IZQUIERDO, element.PIERNA_DERECHA, element.PIERNA_IZQUIERDA];

        measuresDB.update({ datos: datos, circunferencia: circunferencia, sizeDatos: '11', sizeCircun: '10' }).then(response => {
            setModalMsg(prevState => ({
                ...prevState,
                msg: response,
                isMsgOpen: true
            }));
            fetchData();
        });
        setIsOpenEdit(!isOpenEdit);

    };

    const HandleDelete = (e) => {
        measuresDB.delete({
            object: { ID_MEDICION: e.medidas_id, ID_DATOS: e.datos_id, ID_CIRCUNFERENCIA: e.circunferencia_id },
            size: '3'
        }).then(response => {
            setModalMsg(prevState => ({
                ...prevState,
                msg: response,
                isMsgOpen: true
            }));
            fetchData();
        });
        setIsOpenDelete(!isOpenDelete);

    };
    const handleSearch = (e) => {
        if (e.target.value === undefined || e.target.value === "") {
            fetchData();
        } else {
            commonDB.getSearch({ header: "medidas", find: e.target.value }).then(response => {
                convertDate(response)
                setData(response);
            })
        }
    };
    const exportPDF = () => {
        const Info = ["Evaluaci??n f??sica de " + elementSee.NOMBRE_CLIENTE + ' ' + elementSee.APELLIDO_CLIENTE + " ----- Fecha: " + elementSee.FECHA,
            "-------DATOS-------", "Edad: " + elementSee.EDAD, "Altura: " + elementSee.ALTURA, "Peso: " + elementSee.PESO,
        "Grasa Corporal: " + elementSee.GRASA_CORPORAL, "Agua Corporal:" + elementSee.AGUA_CORPORAL, "Masa Muscular: " + elementSee.MASA_MUSCULAR,
        "Valoraci??n F??sica: " + elementSee.VALORACION_FISICA, "Metabolismo Basal: " + elementSee.METABOLISMO_BASAL, "Edad Metabolica: " + elementSee.EDAD_METABOLICA,
        "Masa Os??a: " + elementSee.MASA_OSEA, "Grasa Visceral: " + elementSee.GRASA_VISCERAL, "--------CIRCUNFERENCIA---------",
        "BD: " + elementSee.BRAZO_DERECHO, "BI: " + elementSee.BRAZO_IZQUIERDO, "Pecho: " + elementSee.PECHO, "ABD: " + elementSee.ABDOMEN,
        "Cadera: " + elementSee.CADERA, "MD: " + elementSee.MUSLO_DERECHO, "MI: " + elementSee.MUSLO_IZQUIERDO, "PD: " + elementSee.PIERNA_DERECHA,
        "PI: " + elementSee.PIERNA_IZQUIERDA];
        exportToPdf("", "", "Reporte de Medida " + moment().format("DD/MM/YYYY"), Info);
    };
    return (

        <div>
            <h1 className="text-left">Control de medidas</h1>
            <hr />
            <div className="container">
                <div className="container-insert-search__">
                    <AddButton text="Insertar" onClick={() => setIsOpenInsert(true)} />
                    <SingleCustomInput onChange={handleSearch} errorMsg="Ingrese la palabra a buscar" placeholder="Buscar" name="input" className="search__" />
                </div>
                <Table
                    columns={columns}
                    data={data}
                    aux={dataRef.current}
                    allAction={true}
                    funEdit={(e) => toggleModalEdit(e)}
                    funDelete={(e) => toggleModalDelete(e)}
                    funSee={(e) => toggleModalSee(e)}
                />
            </div>
            <CustomModal
                props={{ title: 'Insertar medidas', isOpen: isOpenInsert }}
                methods={{ toggleOpenModal: () => setIsOpenInsert(!isOpenInsert) }}
            >
                <form noValidate onSubmit={handleSubmit(handleInsert)}>

                    <h5 className="text-left">Datos</h5>
                    <hr />

                    <div className="row">
                        <div className="col">
                            <LiveCustomSelect data={selectedClients} onChange={onChangeSearchClient} className='mt-2' placeHolder={"Buscar cliente..."} loadOptions={searchClient} />
                        </div>
                        <div className="col">
                            <input {...register('peso_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Peso'></input>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input {...register('altura_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Altura'></input>
                        </div>
                        <div className="col">
                            <input {...register('grasa_corporal_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Grasa Corporal'></input>
                        </div>
                        <div className="col">
                            <input {...register('agua_corporal_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Agua Corporal'></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input {...register('masa_muscular_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Masa M??scular'></input>
                        </div>
                        <div className="col">
                            <input {...register('valora_fisica_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Valoraci??n F??sica'></input>
                        </div>
                        <div className="col">
                            <input {...register('metab_basal_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Metab. Basal'></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input {...register('edad_metab_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Edad Metab.'></input>
                        </div>
                        <div className="col">
                            <input {...register('masa_osea_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Masa ??sea'></input>
                        </div>
                        <div className="col">
                            <input {...register('grasa_visceral_insert')} type="number" min="0" step="0.01" className='mt-2' placeholder='Grasa Visceral'></input>
                        </div>
                    </div>

                    <h5 className="text-left mt-2">Circunferencias (Antropometr??a)</h5>
                    <hr />
                    <div className="row">

                        <div className="col">
                            <input {...register('bd_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='B.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('bi_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='B.I'></input>
                        </div>
                        <div className="col">
                            <input {...register('pecho_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Pecho'></input>
                        </div>
                        <div className="col">
                            <input {...register('abd_insert')} errorMsg="Ingrese el ABD." type="number" step="0.01" min="0" className='mt-2' placeholder='ABD'></input>
                        </div>
                        <div className="col">
                            <input {...register('cadera_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='Cadera'></input>
                        </div>
                        <div className="col">
                            <input {...register('md_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='M.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('mi_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='M.I'></input>
                        </div>
                        <div className="col">
                            <input {...register('pd_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='P.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('pi_insert')} type="number" step="0.01" min="0" className='mt-2' placeholder='P.I'></input>
                        </div>
                    </div>

                    <AddButton text="Insertar" type="submit" />
                    <CancelButton fun={() => setIsOpenInsert(!isOpenInsert)} />
                </form>

            </CustomModal>

            <CustomModal
                props={{ title: "Actualizar medidas de " + element.NOMBRE_CLIENTE + " " + element.APELLIDO_CLIENTE + " de la fecha: " + element.FECHA + "?", isOpen: isOpenEdit }}
                methods={{ toggleOpenModal: () => setIsOpenEdit(!isOpenEdit) }}
            >
                <form noValidate onSubmit={handleSubmit(HandleEdit)}>

                    <h5 className="text-left">Datos</h5>
                    <hr />
                    <input {...register('id_datos_insert')} value={element.ID_DATOS} type="hidden" className='mt-2'></input>
                    <input {...register('id_circun_insert')} value={element.ID_CIRCUNFERENCIA} type="hidden" className='mt-2'></input>

                    <div className="row">
                        <div className="col">
                            <input {...register('peso_insert')} value={element.PESO} onChange={(e) => setElement(prevState => ({ ...prevState, PESO: e.target.value }))}
                             type="number" step="0.01" min="0" className='mt-2' placeholder='Peso'></input>
                        </div>

                        <div className="col">
                            <input {...register('altura_insert')} value={element.ALTURA} onChange={(e) => setElement(prevState => ({ ...prevState, ALTURA: e.target.value }))}
                               type="number" step="0.01" min="0" className='mt-2' placeholder='Altura'></input>
                        </div>
                        <div className="col">
                            <input {...register('grasa_corporal_insert')} value={element.GRASA_CORPORAL} onChange={(e) => setElement(prevState => ({ ...prevState, GRASA_CORPORAL: e.target.value }))}
                                type="number" step="0.01" min="0" className='mt-2' placeholder='Grasa Corporal'></input>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input {...register('agua_corporal_insert')} value={element.AGUA_CORPORAL} onChange={(e) => setElement(prevState => ({ ...prevState, AGUA_CORPORAL: e.target.value }))}
                                type="number" step="0.01" min="0" className='mt-2' placeholder='Agua Corporal'></input>
                        </div>
                        <div className="col">
                            <input {...register('masa_muscular_insert')} value={element.MASA_MUSCULAR} onChange={(e) => setElement(prevState => ({ ...prevState, MASA_MUSCULAR: e.target.value }))}
                             type="number" step="0.01" min="0" className='mt-2' placeholder='Masa M??scular'></input>
                        </div>
                        <div className="col">
                            <input {...register('valora_fisica_insert')} value={element.VALORACION_FISICA} onChange={(e) => setElement(prevState => ({ ...prevState, VALORACION_FISICA: e.target.value }))}
                               type="number" step="0.01" min="0" className='mt-2' placeholder='Valoraci??n F??sica'></input>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input {...register('metab_basal_insert')} value={element.METABOLISMO_BASAL} onChange={(e) => setElement(prevState => ({ ...prevState, METABOLISMO_BASAL: e.target.value }))}
                              type="number" step="0.01" min="0" className='mt-2' placeholder='Metab. Basal'></input>
                        </div>
                        <div className="col">
                            <input {...register('edad_metab_insert')} value={element.EDAD_METABOLICA} onChange={(e) => setElement(prevState => ({ ...prevState, EDAD_METABOLICA: e.target.value }))}
                             type="number" step="0.01" min="0" className='mt-2' placeholder='Edad Metab.'></input>
                        </div>
                        <div className="col">
                            <input {...register('masa_osea_insert')} value={element.MASA_OSEA} onChange={(e) => setElement(prevState => ({ ...prevState, MASA_OSEA: e.target.value }))}
                             type="number" step="0.01" min="0" className='mt-2' placeholder='Masa ??sea'></input>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input {...register('grasa_visceral_insert')} value={element.GRASA_VISCERAL} onChange={(e) => setElement(prevState => ({ ...prevState, GRASA_VISCERAL: e.target.value }))}
                                 type="number" step="0.01" min="0" className='mt-2' placeholder='Grasa Visceral'></input>
                        </div>

                        <div className="col"></div>

                        <div className="col"></div>
                    </div>

                    <h5 className="text-left mt-2">Circunferencias (Antropometr??a)</h5>
                    <hr />
                    <div className="row">

                        <div className="col">
                            <input {...register('bd_insert')} value={element.BRAZO_DERECHO} onChange={(e) => setElement(prevState => ({ ...prevState, BRAZO_DERECHO: e.target.value }))}
                                errorMsg="Ingrese B.D" type="number" step="0.01" min="0" className='mt-2' placeholder='B.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('bi_insert')} value={element.BRAZO_IZQUIERDO} onChange={(e) => setElement(prevState => ({ ...prevState, BRAZO_IZQUIERDO: e.target.value }))}
                                errorMsg="Ingrese B.I" type="number" step="0.01" min="0" className='mt-2' placeholder='B.I'></input>
                        </div>
                        <div className="col">
                            <input {...register('pecho_insert')} value={element.PECHO} onChange={(e) => setElement(prevState => ({ ...prevState, PECHO: e.target.value }))}
                                errorMsg="Ingrese el pecho" type="number" step="0.01" min="0" className='mt-2' placeholder='Pecho'></input>
                        </div>
                        <div className="col">
                            <input {...register('abd_insert')} value={element.ABDOMEN} onChange={(e) => setElement(prevState => ({ ...prevState, ABDOMEN: e.target.value }))}
                                errorMsg="Ingrese el ABD." type="number" step="0.01" min="0" className='mt-2' placeholder='ABD'></input>
                        </div>
                        <div className="col">
                            <input {...register('cadera_insert')} value={element.CADERA} onChange={(e) => setElement(prevState => ({ ...prevState, CADERA: e.target.value }))}
                                errorMsg="Ingrese la cadera" type="number" step="0.01" min="0" className='mt-2' placeholder='Cadera'></input>
                        </div>
                        <div className="col">
                            <input {...register('md_insert')} value={element.MUSLO_DERECHO} onChange={(e) => setElement(prevState => ({ ...prevState, MUSLO_DERECHO: e.target.value }))}
                                errorMsg="Ingrese M.D" type="number" step="0.01" min="0" className='mt-2' placeholder='M.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('mi_insert')} value={element.MUSLO_IZQUIERDO} onChange={(e) => setElement(prevState => ({ ...prevState, MUSLO_IZQUIERDO: e.target.value }))}
                                errorMsg="Ingrese M.I" type="number" step="0.01" min="0" className='mt-2' placeholder='M.I'></input>
                        </div>
                        <div className="col">
                            <input {...register('pd_insert')} value={element.PIERNA_DERECHA} onChange={(e) => setElement(prevState => ({ ...prevState, PIERNA_DERECHA: e.target.value }))}
                                errorMsg="Ingrese P.D" type="number" step="0.01" min="0" className='mt-2' placeholder='P.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('pi_insert')} value={element.PIERNA_IZQUIERDA} onChange={(e) => setElement(prevState => ({ ...prevState, PIERNA_IZQUIERDA: e.target.value }))}
                                errorMsg="Ingrese P.I" type="number" step="0.01" min="0" className='mt-2' placeholder='P.I'></input>
                        </div>
                    </div>

                    <AddButton text="Guardar cambios" type="submit" />
                    <CancelButton fun={() => setIsOpenEdit(!isOpenEdit)} />
                </form>

            </CustomModal>

            <CustomModal
                props={{ title: "??Desea eliminar medidas  de " + element.NOMBRE_CLIENTE + " " + element.APELLIDO_CLIENTE + " de la fecha " + element.FECHA + "?", isOpen: isOpenDelete }}
                methods={{ toggleOpenModal: () => setIsOpenDelete(!isOpenDelete) }}
            >
                <CustomForm onSubmit={HandleDelete}>
                    <CustomInput className='mt-2' type="hidden" name='medidas_id' value={element.ID_MEDICION}></CustomInput>
                    <CustomInput className='mt-2' type="hidden" name='datos_id' value={element.ID_DATOS} ></CustomInput>
                    <CustomInput className='mt-2' type="hidden" name='circunferencia_id' value={element.ID_CIRCUNFERENCIA} ></CustomInput>

                    <AddButton text="Si" type="submit" />
                    <CancelButton fun={() => setIsOpenDelete(!isOpenDelete)} />
                </CustomForm>

            </CustomModal>
            <CustomModal
                props={{ title: 'Informaci??n Completa', isOpen: isOpenSee }}
                methods={{ toggleOpenModal: () => setIsOpenSee(!isOpenSee) }}
            >
                <div className="row">
                    <div className="col col-md-2">
                        <DownloadButton onClick={exportPDF} text="PDF" />
                    </div>
                    <div className="col">
                        <h5>{elementSee.NOMBRE_CLIENTE + ' ' + elementSee.APELLIDO_CLIENTE}</h5>
                        <h6>Edad: {elementSee.EDAD}</h6>
                    </div>
                    <div className="col">
                        <h5>Fecha de registro: {elementSee.FECHA}</h5>
                        <p>(mes/d??a/a??o)</p>
                    </div>
                </div>
                <hr></hr>
                <div className="d-block text-left">
                    <h5>Datos</h5>
                    <div className="row">
                        <div className="col">
                            <p>Peso:{elementSee.PESO}</p>
                            <p>Altura:{elementSee.ALTURA}</p>
                            <p>Grasa Corporal: {elementSee.GRASA_CORPORAL}</p>
                            <p>Agua Corporal: {elementSee.AGUA_CORPORAL}</p>

                        </div>
                        <div className="col">
                            <p>Masa Muscular: {elementSee.MASA_MUSCULAR}</p>
                            <p>Valoraci??n F??sica: {elementSee.VALORACION_FISICA}</p>
                            <p>Metab. Basal: {elementSee.METABOLISMO_BASAL}</p>
                        </div>
                        <div className="col">
                            <p>Edad Metab.: {elementSee.EDAD_METABOLICA}</p>
                            <p>Masa Osea:{elementSee.MASA_OSEA}</p>
                            <p>Grasa Visceral: {elementSee.GRASA_VISCERAL}</p>
                        </div>
                    </div>
                    <h5>Circunferencia</h5>
                    <div className="row">
                        <div className="col">
                            <p>BD: {elementSee.BRAZO_DERECHO}</p>
                            <p>BI: {elementSee.BRAZO_IZQUIERDO}</p>
                            <p>Pecho: {elementSee.PECHO}</p>
                        </div>
                        <div className="col">
                            <p>ABD: {elementSee.ABDOMEN}</p>
                            <p>Cadera: {elementSee.CADERA}</p>
                            <p>MD: {elementSee.MUSLO_DERECHO}</p>
                        </div>
                        <div className="col">
                            <p>MI:{elementSee.MUSLO_IZQUIERDO}</p>
                            <p>PD:{elementSee.PIERNA_DERECHA}</p>
                            <p>PI: {elementSee.PIERNA_IZQUIERDA}</p>
                        </div>
                    </div>
                </div>
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