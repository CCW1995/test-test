import React, { useState } from 'react'
import _ from 'lodash'
import { 
  Button, Card, CardBody,
  Modal
} from 'reactstrap'
import { AiFillEdit } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'

import TableCard from './OwnerTableCard'
import EditMax from './EditMaxForm'

function OwnerView({
  tableData,
  maxChairs,
  maxTableCount,

  setTableData,
  setMaxTableCount,
  setMaxChairs
}) {

  const [ showMax, setShowMax ] = useState( false )

  const onChangeTableData = ( index, key, val ) => {
    let temp = _.cloneDeep( tableData )
    temp[ index ][ key ]= val

    setTableData( temp )
  }

  const onDeleteTableData = index => {
    let temp = _.cloneDeep( tableData )
    temp.splice( index, 1 )

    setTableData( temp )
  }

  const onAddTableData = () => {
    let temp = _.cloneDeep( tableData )
    temp.push({
      availableChair: maxChairs,
      isOccupied: false,
    })

    setTableData( temp )
  }
  
  return (
    <>
      <div className="d-flex align-items-end">
        <Card style={{ width: 'max-content', minWidth: 220, marginBottom: 20, position: 'relative' }}>
          <CardBody>
            <AiFillEdit
              style={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}
              size={ 18 }
              onClick={ () => setShowMax( true )}
            />
            <strong className='d-block'>
              { `Max Table: ${ maxTableCount }`}
            </strong>
            <strong className='d-block'>
              { `Max Chairs: ${ maxChairs }`}
            </strong>
          </CardBody>
        </Card>
        {
          tableData.length < maxTableCount && (
            <Button
              color='primary'
              style={{ marginBottom: 20, marginLeft: 'auto', height: 'max-content' }}
              onClick={() => onAddTableData() }
            >
              Add New Table
            </Button>
          )
        }
      </div>
      <div className="inimagine-table-cont">
        {
          tableData.map(( tableChild, tableIndex ) => (
            <TableCard
              key={ `table_${ tableIndex }`}
              tableIndex={ tableIndex }
              maxChairs={ maxChairs }
              tableChild={ tableChild }
              
              onDeleteTableData={ onDeleteTableData }
              onChangeTableData={ onChangeTableData }
            />
          ))
        }
      </div>
      <Modal isOpen={ showMax }>
        <Button 
          onClick={() => setShowMax( false )}
          color={ 'danger' }
          style={{ 
            position: 'absolute', top: -15, right: -5, zIndex: 2,
            padding: 0,
            width: 30, height: 30
          }}
        >
          <IoMdClose style={{ width: 20, height: 20 }}/>
        </Button>
        <EditMax
          maxChairs={ maxChairs }
          maxTableCount={ maxTableCount }
          onSubmit={ ( tempChairs, tempTables ) => {
            let temp = _.cloneDeep( tableData )
            if ( maxChairs > tempChairs ){
              temp = _.map( temp, tempChild => ({
                ... tempChild,
                availableChair: tempChild.availableChair > tempChairs ? tempChairs: tempChild.availableChair
              }))
            }

            if ( maxTableCount > tempTables ){
              temp = temp.slice( 0, tempTables ) 
            }

            setTableData( temp )
            setMaxChairs( tempChairs )
            setMaxTableCount( tempTables )
            setShowMax( false )
          }}
        />
      </Modal>
    </>
  )
}

export default OwnerView