import React, { useEffect } from "react";
import { useTable, usePagination } from 'react-table'
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import InfoButton from "./InfoButton";

const Table = (props) => {
  const columns = props.columns;
  const data = props.data;
  const aux = props.aux;
  const mostrar = props.mostrar;
  const editRestricted = props.editRestricted;
  const allOptionsRestricted = props.allAction;

  const manageTableButtons = (index) => {
    if (editRestricted) {
      return (
        <>
          <InfoButton fun={props.funSee} rowObject={JSON.stringify(aux[index])}/>
          <DeleteButton fun={props.funDelete} rowObject={JSON.stringify(aux[index])} />
        </>
      );
    }
    if (allOptionsRestricted) {
      return (
        <>
          <InfoButton fun={props.funSee} rowObject={JSON.stringify(aux[index])}/>
          <EditButton fun={props.funEdit} rowObject={JSON.stringify(aux[index])} />
          <DeleteButton fun={props.funDelete} rowObject={JSON.stringify(aux[index])} />
        </>
      );
    }
    if(props.funEdit ===undefined && props.funDelete===undefined)return "Sin acciones" ;
    return (
      <>
        <EditButton fun={props.funEdit} rowObject={JSON.stringify(aux[index])} />
        <DeleteButton fun={props.funDelete} rowObject={JSON.stringify(aux[index])} />
      </>
    );
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = useTable(
    { columns, data },
    usePagination
  )

  const { pageIndex, pageSize } = state

  useEffect(() => {
    if (isNaN(mostrar)) {
      setPageSize(5);
    } else {
      setPageSize(mostrar);
    }

  }, []);
  return (
    <div className="table-responsive">
      <table {...getTableProps()} className="table table-striped table-dark text-center">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="table__header" scope="col"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
              <th scope="col" className="table__header">Acción</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
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
                  {manageTableButtons(index)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="text-center">
        <span className="color-text__" >
          Página{' '}
          <span>
            {pageIndex + 1} de {pageOptions.length}
          </span>{' '}
        </span>
        <span className="ml-2 color-text__"> 
          Pag :{' '}
          <input type='number' min="1" className="btn-table" defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }} style={{ width: '40px', height: '40px' }} />
        </span>
        <select value={pageSize} className="btn-table ml-2" onChange={e => setPageSize(Number(e.target.value))} style={{ width: '100px', height: '40px' }}>
          <option key={1} value={1}>
            Cantidad a ver
          </option>
          {
            [3, 10, 25, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Ver {pageSize}
              </option>
            ))
          }
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-table ml-2">{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-table">Anterior</button>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-table ml-2">Siguiente</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-table">{'>>'}</button>
      </div>
    </div>
  );
}

export default Table;