import React from "react";
import { useTable } from 'react-table'
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

const Table = (props)=>{
    const columns= props.columns;
    const data= props.data;
    const aux = props.aux;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })

    return (
        <div className="table-responsive">
          <table {...getTableProps()} className="table table-striped table-dark">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th scope="col"
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                  <th scope="col">Acción</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row,index) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                    <td>
                      <EditButton fun={props.funEdit} rowObject={JSON.stringify(aux[index])} />
                      <DeleteButton fun={props.funDelete}/>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
    );
}

export default Table;