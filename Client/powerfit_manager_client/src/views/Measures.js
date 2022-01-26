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
import { useForm } from "react-hook-form"

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

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [element, setElement] = useState([
        {
            ID_MEDICION: '', NOMBRE_CLIENTE: '', APELLIDO_CLIENTE: '',
            FECHA: '', EDAD: '', PESO: '', ALTURA: '', GRASA_CORPORAL: '',
            AGUA_CORPORAL: '', MASA_MUSCULAR: '', VALORACION_FISICA: '',
            METABOLISMO_BASAL: '', EDAD_METABOLICA: '', MASA_OSEA: '',
            GRASA_VISERAL: '', BRAZO_DERECHO: '', BRAZO_IZQUIERDO: '',
            PECHO: '', ABDOME: '', CADERA: '', MUSLO_DERECHO: '',
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

    const toggleModalSee = (e) => {
        setIsOpenSee(!isOpenSee);

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
            FECHA_FIN: pago.FECHA_FIN
        });
        setIsOpenDelete(!isOpenDelete);
    }


    const handleInsert = (e) => {
        e.ID_CLIENTE = selectedClients.value;
        console.log(e);
        const datos= [e.peso_insert,e.altura_insert] ;
        // const circunferencia;
        // const medida_cliente;
        console.log(datos);
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
            <h1 className="text-left">Control de Medidas</h1>
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
                    allAction={true}
                    funEdit={(e) => toggleModalEdit(e)}
                    funDelete={(e) => toggleModalDelete(e)}
                    funSee={(e) => toggleModalSee(e)}
                />
            </div>
            <CustomModal
                props={{ title: 'Insertar Medidas', isOpen: isOpenInsert }}
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
                            <input {...register('peso_insert')} errorMsg="Ingrese el peso" type="number" step="0.01" className='mt-2' placeholder='Peso'></input>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input {...register('altura_insert')} errorMsg="Ingrese la altura" type="number" step="0.01" className='mt-2' placeholder='Altura'></input>
                        </div>
                        <div className="col">
                            <input {...register('grasa_corporal_insert')} errorMsg="Ingrese la grasa corporal" type="number" step="0.01" className='mt-2' placeholder='Grasa Corporal'></input>
                        </div>
                        <div className="col">
                            <input {...register('agua_corporal_insert')} errorMsg="Ingrese la agua corporal" type="number" step="0.01" className='mt-2' placeholder='Agua Corporal'></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input {...register('masa_muscular_insert')} errorMsg="Ingrese la masa muscular" type="number" step="0.01" className='mt-2' placeholder='Masa Múscular'></input>
                        </div>
                        <div className="col">
                            <input {...register('valora_fisica_insert')} errorMsg="Ingrese la valorción física" type="number" step="0.01" className='mt-2' placeholder='Valoración Física'></input>
                        </div>
                        <div className="col">
                            <input {...register('metab_basal_insert')} errorMsg="Ingrese el Metab. basal" type="number" step="0.01" className='mt-2' placeholder='Metab. Basal'></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input {...register('edad_metab_insert')} errorMsg="Ingrese la edad metabolica" type="number" step="0.01" className='mt-2' placeholder='Edad Metab.'></input>
                        </div>
                        <div className="col">
                            <input {...register('masa_osea_insert')} errorMsg="Ingrese la masa ósea" type="number" step="0.01" className='mt-2' placeholder='Masa Ósea'></input>
                        </div>
                        <div className="col">
                            <input {...register('grasa_visceral_insert')} errorMsg="Ingrese la grasa visceral" type="number" step="0.01" className='mt-2' placeholder='Grasa Visceral'></input>
                        </div>
                    </div>

                    <h5 className="text-left mt-2">Circunferencias (Antropometría)</h5>
                    <hr />
                    <div className="row">

                        <div className="col">
                            <input {...register('bd_insert')} errorMsg="Ingrese B.D" type="number" step="0.01" className='mt-2' placeholder='B.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('bi_insert')} errorMsg="Ingrese B.I" type="number" step="0.01" className='mt-2' placeholder='B.I'></input>
                        </div>
                        <div className="col">
                            <input {...register('pecho_insert')} errorMsg="Ingrese el pecho" type="number" step="0.01" className='mt-2' placeholder='Pecho'></input>
                        </div>
                        <div className="col">
                            <input {...register('abd_insert')} errorMsg="Ingrese el ABD." type="number" step="0.01" className='mt-2' placeholder='ABD'></input>
                        </div>
                        <div className="col">
                            <input {...register('cadera_insert')} errorMsg="Ingrese la cadera" type="number" step="0.01" className='mt-2' placeholder='Cadera'></input>
                        </div>
                        <div className="col">
                            <input {...register('md_insert')} errorMsg="Ingrese M.D" type="number" step="0.01" className='mt-2' placeholder='M.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('mi_insert')} errorMsg="Ingrese M.I" type="number" step="0.01" className='mt-2' placeholder='M.I'></input>
                        </div>
                        <div className="col">
                            <input {...register('pd_insert')} errorMsg="Ingrese P.D" type="number" step="0.01" className='mt-2' placeholder='P.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('pi_insert')} errorMsg="Ingrese P.I" type="number" step="0.01" className='mt-2' placeholder='P.I'></input>
                        </div>
                    </div>

                    <AddButton text="Insertar" type="submit" />
                    <CancelButton fun={() => setIsOpenInsert(!isOpenInsert)} />
                </form>

            </CustomModal>

            <CustomModal
                props={{ title: "Actualizar medidas de " + element.NOMBRE_CLIENTE + " " + element.APELLIDO_CLIENTE + "?", isOpen: isOpenEdit }}
                methods={{ toggleOpenModal: () => setIsOpenEdit(!isOpenEdit) }}
            >
                <form noValidate onSubmit={handleSubmit(HandleEdit)}>

                    <h5 className="text-left">Datos</h5>
                    <hr />

                    <div className="row">
                        <div className="col">
                            <input {...register('peso_insert')} errorMsg="Ingrese el peso" type="number" step="0.01" className='mt-2' placeholder='Peso'></input>
                        </div>

                        <div className="col">
                            <input {...register('altura_insert')} errorMsg="Ingrese la altura" type="number" step="0.01" className='mt-2' placeholder='Altura'></input>
                        </div>
                        <div className="col">
                            <input {...register('grasa_corporal_insert')} errorMsg="Ingrese la grasa corporal" type="number" step="0.01" className='mt-2' placeholder='Grasa Corporal'></input>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input {...register('agua_corporal_insert')} errorMsg="Ingrese la agua corporal" type="number" step="0.01" className='mt-2' placeholder='Agua Corporal'></input>
                        </div>
                        <div className="col">
                            <input {...register('masa_muscular_insert')} errorMsg="Ingrese la masa muscular" type="number" step="0.01" className='mt-2' placeholder='Masa Múscular'></input>
                        </div>
                        <div className="col">
                            <input {...register('valora_fisica_insert')} errorMsg="Ingrese la valorción física" type="number" step="0.01" className='mt-2' placeholder='Valoración Física'></input>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input {...register('metab_basal_insert')} errorMsg="Ingrese el Metab. basal" type="number" step="0.01" className='mt-2' placeholder='Metab. Basal'></input>
                        </div>
                        <div className="col">
                            <input {...register('edad_metab_insert')} errorMsg="Ingrese la edad metabolica" type="number" step="0.01" className='mt-2' placeholder='Edad Metab.'></input>
                        </div>
                        <div className="col">
                            <input {...register('masa_osea_insert')} errorMsg="Ingrese la masa ósea" type="number" step="0.01" className='mt-2' placeholder='Masa Ósea'></input>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col">
                            <input {...register('grasa_visceral_insert')} errorMsg="Ingrese la grasa visceral" type="number" step="0.01" className='mt-2' placeholder='Grasa Visceral'></input>
                        </div>

                        <div className="col"></div>

                        <div className="col"></div>
                    </div>

                    <h5 className="text-left mt-2">Circunferencias (Antropometría)</h5>
                    <hr />
                    <div className="row">

                        <div className="col">
                            <input {...register('bd_insert')} errorMsg="Ingrese B.D" type="number" step="0.01" className='mt-2' placeholder='B.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('bi_insert')} errorMsg="Ingrese B.I" type="number" step="0.01" className='mt-2' placeholder='B.I'></input>
                        </div>
                        <div className="col">
                            <input {...register('pecho_insert')} errorMsg="Ingrese el pecho" type="number" step="0.01" className='mt-2' placeholder='Pecho'></input>
                        </div>
                        <div className="col">
                            <input {...register('abd_insert')} errorMsg="Ingrese el ABD." type="number" step="0.01" className='mt-2' placeholder='ABD'></input>
                        </div>
                        <div className="col">
                            <input {...register('cadera_insert')} errorMsg="Ingrese la cadera" type="number" step="0.01" className='mt-2' placeholder='Cadera'></input>
                        </div>
                        <div className="col">
                            <input {...register('md_insert')} errorMsg="Ingrese M.D" type="number" step="0.01" className='mt-2' placeholder='M.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('mi_insert')} errorMsg="Ingrese M.I" type="number" step="0.01" className='mt-2' placeholder='M.I'></input>
                        </div>
                        <div className="col">
                            <input {...register('pd_insert')} errorMsg="Ingrese P.D" type="number" step="0.01" className='mt-2' placeholder='P.D'></input>
                        </div>
                        <div className="col">
                            <input {...register('pi_insert')} errorMsg="Ingrese P.I" type="number" step="0.01" className='mt-2' placeholder='P.I'></input>
                        </div>
                    </div>

                    <AddButton text="Guardar cambios" type="submit" />
                    <CancelButton fun={() => setIsOpenEdit(!isOpenEdit)} />
                </form>
                {/* <CustomForm onSubmit={HandleEdit}>
                    <CustomInput className='mt-2' type="hidden" name='membresia_id' value={element.ID_MEMBRESIA} placeholder='Id membresia'></CustomInput>
                    <CustomInput errorMsg="Ingrese la fecha inicio" type="date" className='mt-2' value={moment(element.FECHA_INICIO).format('YYYY-MM-DD')} onChange={(e) => setElement(prevState => ({ ...prevState, FECHA_INICIO: e.target.value }))} name='fecha_inicio_insert' placeholder='Fecha  Inicio'></CustomInput>
                    <CustomInput errorMsg="Ingrese la fecha de fin" type="date" className='mt-2' value={moment(element.FECHA_FIN).format('YYYY-MM-DD')} onChange={(e) => setElement(prevState => ({ ...prevState, FECHA_FIN: e.target.value }))} name='fecha_fin_insert' placeholder='Fecha Fin'></CustomInput>
                    <CustomInput errorMsg="Ingrese el tipo de pago" className='mt-2' value={element.TIPO_PAGO} onChange={(e) => setElement(prevState => ({ ...prevState, TIPO_PAGO: e.target.value }))} name='tipo_pago_insert' placeholder='Tipo de pago'></CustomInput>
                    <CustomInput errorMsg="Ingrese el monto" className='mt-2' value={element.MONTO} onChange={(e) => setElement(prevState => ({ ...prevState, MONTO: e.target.value }))} name='monto_insert' placeholder='Monto'></CustomInput>
                    <CustomInput errorMsg="Ingrese el detalle" className='mt-2' value={element.DETALLE} onChange={(e) => setElement(prevState => ({ ...prevState, DETALLE: e.target.value }))} name='detalle_insert' placeholder='Detalle de pago'></CustomInput>

                    <AddButton text="Guardar cambios" type="submit" />
                    <CancelButton fun={() => setIsOpenEdit(!isOpenEdit)} />
                </CustomForm> */}

            </CustomModal>

            <CustomModal
                props={{ title: "¿Desea eliminar medidas  de " + element.NOMBRE_CLIENTE + " " + element.APELLIDO_CLIENTE + " de la fecha " + element.FECHA + "?", isOpen: isOpenDelete }}
                methods={{ toggleOpenModal: () => setIsOpenDelete(!isOpenDelete) }}
            >
                <CustomForm onSubmit={HandleDelete}>
                    <CustomInput className='mt-2' type="hidden" name='membresia_id' value={element.ID_MEMBRESIA} placeholder='ID pago'></CustomInput>
                    <AddButton text="Si" type="submit" />
                    <CancelButton fun={() => setIsOpenDelete(!isOpenDelete)} />
                </CustomForm>

            </CustomModal>
            <CustomModal
                props={{ title: 'Información Completa', isOpen: isOpenSee }}
                methods={{ toggleOpenModal: () => setIsOpenSee(!isOpenSee) }}
            >
                <p>{modalMsg.msg}</p>
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