import React, { useState, useEffect } from "react";
import '../styles/common.css'
import Table from "../components/Table";
import moment from 'moment'
import commonDB from "../service/CommonDB";
import SalesDB from "../service/Sales";

export default function Home() {
    const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
    const [dataTopAssistance, setDataTopAssistance] = useState(null);
    const [dataDiscontinued, setDataDiscontinued] = useState(null);
    const [salesStats, setsalesStats] = useState({ productStats: [], topClients: [] });


    const columnsTopAssistance = React.useMemo(
        () => [
            { Header: 'Nombre', accessor: 'NOMBRE' },
            { Header: 'Telefono', accessor: 'TELEFONO' },
            { Header: 'Cantidad de Asistencias', accessor: 'ASISTENCIAS' }
        ]
    )

    const columnsProductSales = React.useMemo(
        () => [
            { Header: "Producto", accessor: 'NOMBRE', },
            { Header: "Veces vendido", accessor: 'CANTIDAD' },
        ],
        []
    )

    const columnsTopClients = React.useMemo(
        () => [
            { Header: "Cliente", accessor: 'NOMBRE', },
            { Header: "Compras realizadas", accessor: 'VENTAS' },
            { Header: "Total(₡)", accessor: 'TOTAL' },
        ],
        []
    )
    const columnsDiscontinued = React.useMemo(
        () => [
            { Header: "Cliente", accessor: 'NOMBRE', },
            { Header: "Vencimiento", accessor: 'FECHA' },
            { Header: "Estado", accessor: 'ESTADO' }
        ],
        []
    )

    const fetchSalesStats = () => {
        SalesDB.getSalesStats({ year: yearFilter }).then(response => {
            setsalesStats({ productStats: response.productStats[0], topClients: response.topClients[0] });
        });
    }


    const fetchTopAssistance = () => {
        commonDB.getSearch({ header: "top_asistencia", find: yearFilter }).then(response => {
            setDataTopAssistance(response);
        });
    }

    const fetchDiscontinued = () => {
        commonDB.getSearch({ header: "membresia_suspendidos", find: yearFilter }).then(response => {
            convertDate(response);
            setDataDiscontinued(response);
        });
    }
    const convertDate = (e) => {
        e.map((entrada) => {
            entrada.FECHA = moment(new Date(entrada.FECHA)).format('LL')
        })
    }
    useEffect(() => {
        fetchSalesStats();
        fetchTopAssistance();
        fetchDiscontinued();
    }, []);
    if (!dataTopAssistance) return "No se encuentran datos";

    return (
        <div className="home-body">
            <h1>Bienvenido a powerfit manager</h1>
            <div className="container mt-4">

                <div className="col mt-5">
                    <div className="card">
                        <div className="card-body background__">
                            <h4 className="car-title">Top de pendientes de pago</h4>
                            <Table
                                columns={columnsDiscontinued}
                                data={dataDiscontinued ?? []}

                            />
                        </div>
                    </div>
                </div>


                <div className="col mt-5">
                    <div className="card">
                        <div className="card-body background__">
                            <h4 className="car-title">Top de asistencia</h4>
                            <Table
                                columns={columnsTopAssistance}
                                data={dataTopAssistance ?? []}

                            />

                        </div>
                    </div>
                </div>

                <div className="col mt-5">
                    <div className="card">
                        <div className="card-body background__">
                            <h4 className="car-title">Top de compradores</h4>
                            <Table
                                columns={columnsTopClients}
                                data={salesStats.topClients ?? []}
                            />

                        </div>
                    </div>
                </div>


                <div className="col mt-5">
                    <div className="card">
                        <div className="card-body background__">
                            <h4 className="car-title">Top de productos vendidos</h4>
                            <Table
                                columns={columnsProductSales}
                                data={salesStats.productStats ?? []}
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>



    );
}