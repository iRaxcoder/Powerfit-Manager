import React, { useState, useEffect, useRef } from "react";
import '../styles/common.css'
import AddButton from "../components/AddButton";
import Table from "../components/Table";
import CustomModal from "../components/CustomModal";
import CustomForm from "../components/CustomForm";
import { CustomInput, SingleCustomInput } from "../components/CustomInput";
import CancelButton from "../components/CancelButton"
import commonDB from "../service/CommonDB";
import Select from 'react-select'
import { validateElement } from "react-modal/lib/helpers/ariaAppHider";

export default function Payments() {
    const [isOpenInsert, setIsOpenInsert] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [modalMsg, setModalMsg] = useState({ isMsgOpen: false, msg: "" });
    const [data, setData] = useState(null);
    const [clientList, setClientList] = useState(null);
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
                Header: '#',
                accessor: 'ID_PAGO', // accessor is the "key" in the data
            },
            {
                Header: 'Nombre',
                accessor: 'NOMBRE_CLIENTE',
            },
            {
                Header: 'Apellido',
                accessor: 'APELLIDO_CLIENTE',
            },

            {
                Header: 'Fecha',
                accessor: 'FECHA',
            },
            {
                Header: 'Tipo de Pago',
                accessor: 'TIPO_PAGO',
            },
            {
                Header: 'Monto',
                accessor: 'MONTO',
            },
            {
                Header: 'Detalles',
                accessor: 'DETALLE',
            }

        ],
        []
    )

    const fetchData = () => {
        commonDB.getAll({ header: "pago" }).then(response => {
            setData(response)
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
        // const groupMuscle = JSON.parse(e.target.dataset.row);
        // setElement({
        //   ID_MUSCULAR: groupMuscle.ID_MUSCULAR,
        //   NOMBRE_GRUPO_MUSCULAR: groupMuscle.NOMBRE_GRUPO_MUSCULAR
        // });
        // setIsOpenEdit(!isOpenEdit);
    }

    const toggleModalDelete = (e) => {
        // const groupMuscle = JSON.parse(e.target.dataset.row);
        // setElement({
        //   ID_MUSCULAR: groupMuscle.ID_MUSCULAR,
        //   NOMBRE_GRUPO_MUSCULAR: groupMuscle.NOMBRE_GRUPO_MUSCULAR
        // });
        //   setIsOpenDelete(!isOpenDelete);
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

    const handleChange = (e) => {
        //setElement({ NOMBRE_GRUPO_MUSCULAR: e.muscule_group_name })
    };

    const handleInsert = (e) => {
        //   commonDB.insert({ header: "grupo_muscular", size: "1", object: e }).then(response => {
        //   setModalMsg(prevState => ({
        //     ...prevState,
        //     msg: response,
        //     isMsgOpen: true
        //   }));
        //   fetchData();
        // });
        //  toggleModalInsert();
    }

    const HandleEdit = (e) => {
        // commonDB.update({ header: "grupo_muscular", size: "2", object: e }).then(response => {
        //   setModalMsg(prevState => ({
        //     ...prevState,
        //     msg: response,
        //     isMsgOpen: true
        //   }));
        //   fetchData();
        // });
        //setIsOpenEdit(!isOpenEdit);

    }

    const HandleDelete = (e) => {
        // commonDB.delete({ header: "grupo_muscular", object: { id: e.muscule_group_id } }).then(response => {
        //   setModalMsg(prevState => ({
        //     ...prevState,
        //     msg: response,
        //     isMsgOpen: true
        //   }));
        //   fetchData();
        // });
        //setIsOpenDelete(!isOpenDelete);

    }
    const handleSearch = (e) => {
        //     if(e.target.value===undefined || e.target.value ===""){
        //   fetchData();
        // }else{
        //   commonDB.getSearch({header: "grupo_muscular",find:e.target.value}).then(response=>{
        //     setData(response);
        //   })
        // }
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
                    <Select onChange={handleSearchClient} options={clientList} isSearchable="true" />
                    <CustomInput errorMsg="Ingrese la fecha" type="date" className='form-control mt-2' name='fecha_insert' placeholder='Fecha'></CustomInput>
                    <CustomInput errorMsg="Ingrese el tipo de pago" className='form-control mt-2' name='tipo_pago_insert' placeholder='Tipo de pago'></CustomInput>
                    <CustomInput errorMsg="Ingrese el monto" className='form-control mt-2' name='monto_insert' placeholder='Monto'></CustomInput>
                    <CustomInput errorMsg="Ingrese el detalle" className='form-control mt-2' name='detalle_insert' placeholder='Detalle de pago'></CustomInput>

                    <AddButton text="Insertar" type="submit" />
                    <CancelButton fun={() => setIsOpenInsert(!isOpenInsert)} />
                </CustomForm>

            </CustomModal>


            <CustomModal
                props={{ title: 'Actualizar grupo muscular', isOpen: isOpenEdit }}
                methods={{ toggleOpenModal: () => setIsOpenEdit(!isOpenEdit) }}
            >
                <CustomForm onSubmit={HandleEdit}>
                    <CustomInput className='form-control mt-2' type="hidden" name='muscule_group_id' value={element.ID_MUSCULAR} placeholder='Id grupo muscular'></CustomInput>
                    <CustomInput className='form-control mt-2' name='muscule_group_name' onChange={handleChange} value={element.NOMBRE_GRUPO_MUSCULAR} placeholder='Nombre grupo muscular'></CustomInput>
                    <AddButton text="Guardar cambios" type="submit" />
                    <CancelButton fun={() => setIsOpenEdit(!isOpenEdit)} />
                </CustomForm>

            </CustomModal>

            <CustomModal
                props={{ title: '¿Desea eliminar?', isOpen: isOpenDelete }}
                methods={{ toggleOpenModal: () => setIsOpenDelete(!isOpenDelete) }}
            >
                <CustomForm onSubmit={HandleDelete}>
                    <CustomInput className='form-control mt-2' type="hidden" name='muscule_group_id' value={element.ID_MUSCULAR} placeholder='ID grupo muscular'></CustomInput>
                    <CustomInput className='form-control mt-2' name='muscule_group' value={element.NOMBRE_GRUPO_MUSCULAR} placeholder='Nombre grupo muscular'></CustomInput>
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