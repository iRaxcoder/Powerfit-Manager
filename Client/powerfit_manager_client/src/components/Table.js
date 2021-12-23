import React from "react";
import { useTable } from 'react-table'
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

const Table = (props)=>{
    const columns= props.columns;
    const data= props.data;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })

    return (
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
            {rows.map(row => {
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
                    <EditButton fun={props.funEdit}/>
                    <DeleteButton fun={props.funDelete}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
    );
}

export default Table;