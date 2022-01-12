import React, {useEffect} from "react";
import { useTable, usePagination } from 'react-table'
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

const Table = (props) => {
  const columns = props.columns;
  const data = props.data;
  const aux = props.aux;
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
    setPageSize(4);
}, []);
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
                  <EditButton fun={props.funEdit} rowObject={JSON.stringify(aux[index])} />
                  <DeleteButton fun={props.funDelete} rowObject={JSON.stringify(aux[index])} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          Pag :{' '}
          <input type='number' defaultValue={pageIndex+1}
               onChange={ e => { const pageNumber = e.target.value ? Number(e.target.value) - 1 :0
               gotoPage(pageNumber)}}  style={{width :'40px',height:'35px'}}/>
        </span>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} style={{width :'100px',height:'35px'}}>
                {
                  [3,10,25,50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Ver {pageSize}
                    </option>
                  ))
                }
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Anterior</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Siguiente</button>
        <button onClick={() => gotoPage(pageCount -1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
    </div>
  );
}

export default Table;