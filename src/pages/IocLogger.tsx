import { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {
  Container,
  ButtonGroup,
  Button,
  Row,
  Col,
  Alert,
} from 'react-bootstrap'
import service_getLogs from '../services/logger/getLogs'

function IocLogger() {
  const [error, setError] = useState<string>('')
  const [rowData, setRowData] = useState<Array<any>>()
  useEffect(
    () =>
      service_getLogs((result: Error | Array<any>) => {
        if (result instanceof Error) setError(result.message)
        else setRowData(result)
      }),
    []
  )

  const [columnDefs] = useState([
    { headerName: 'Id', field: 'attribute_id' },
    { headerName: 'Succeed', field: 'succeed' },
    { headerName: 'IOC', field: 'value' },
    { headerName: 'Error', field: 'error' },
  ])
  const gridOptions: any = {
    defaultColDef: {
      resizable: true,
      flex: 1,
      filter: true,
      sortable: true,
      filterParams: {
        buttons: ['apply', 'reset'],
      },
    },
    pagination: true,
    paginationAutoPageSize: true,
    animateRows: true,
    rowData: null,
  }

  return (
    <Container className="ag-theme-alpine" style={{ height: '80vh' }}>
      {error && <Alert variant="danger"> {error} </Alert>}
      <Row>
        <Col>
          <h1>MISP Logger</h1>
        </Col>
        <Col>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary">Size to Fit</Button>
          </ButtonGroup>
        </Col>
      </Row>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
      ></AgGridReact>
    </Container>
  )
}

export default IocLogger
