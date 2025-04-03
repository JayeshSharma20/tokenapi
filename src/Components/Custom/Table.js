import React, { Fragment } from 'react'
import DataTable from 'react-data-table-component';
// import { useNavigate } from 'react-router-dom';


const Table = (props) => {
  const { data, columns } = props
  console.log(data)
  return (
    <Fragment>
      <DataTable
      columns ={columns}
      data={data}
      pagination
      />
    </Fragment>
  )
}

export default Table
