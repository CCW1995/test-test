import React, { useState } from 'react'
import _ from 'lodash'
import uniqid from 'uniqid'
import { 
  Form, FormGroup, Label, Input,
  Button, Modal
} from 'reactstrap'
import { IoMdClose } from 'react-icons/io'
import { toast } from 'react-toastify'
import SelectTableModalContent from '../../components/SelectTableModalContent'

function OwnerView({
  tableData,
  currentQueue,
  setCurrentQueue,
  setTableData
}) {
  const [ numberOfPerson, setNumberOfPerson ] = useState( 1 )
  const [ showAvailableTable, setAvailableTable ] = useState( false )

  return (
    <>
      <Form>
        <FormGroup>
          <Label>Number of Person</Label>
          <Input
            type={ 'text' }
            value={ numberOfPerson }
            onChange={ e => setNumberOfPerson( +e.target.value.replace( /\D/g, "" ) )}
          />
        </FormGroup>
      </Form>
      <div className="d-flex">
        <Button 
          style={{ marginLeft: 'auto' }}
          onClick={ () => {
            if ( numberOfPerson < 1  ){
              return toast.error( 'Please fill more than 1 person' )
            }

            setAvailableTable( true )
          }}
        >
          Submit
        </Button>
      </div>
      <Modal size={ 'xl' } isOpen={ showAvailableTable }>
        <Button 
          onClick={() => setAvailableTable( false )}
          color={ 'danger' }
          style={{ 
            position: 'absolute', top: -15, right: -5, zIndex: 2,
            padding: 0,
            width: 30, height: 30
          }}
        >
          <IoMdClose style={{ width: 20, height: 20 }}/>
        </Button>
        <SelectTableModalContent
          tableData={ tableData }
          numberOfPerson={ numberOfPerson }
          onSubmit={( selectedTable, remainingClient ) => {
            let tempTable = _.map( tableData, ( tableChild, tableIndex ) => {
              if ( selectedTable.indexOf( tableIndex ) > -1 ){
                return {
                  ... tableChild,
                  isOccupied: true
                }
              }

              return tableChild
            }) 

            if ( remainingClient > 0 ){
              setCurrentQueue([
                ... currentQueue,
                {
                  id: uniqid(),
                  count: remainingClient
                }
              ])
            }

            toast( 
              remainingClient > 0
                ? `${ selectedTable.length > 0 ? `A Total of ${ numberOfPerson - remainingClient } of customers has been assigned to ${ selectedTable.length } tables.` : `` } The remaining ${ remainingClient } is added to the waiting queue.`
                : `All ${ numberOfPerson } customers has been assigned to ${ selectedTable.length } tables.`
            )

            setNumberOfPerson( 1 )
            setAvailableTable( false )
            setTableData( tempTable )
          }}
        />
      </Modal>
    </>
  )
}

export default OwnerView