import React, { useEffect, useState } from 'react'
import { 
  Form, FormGroup, Label, Input, Button,
  ModalBody, ModalFooter
} from 'reactstrap'
import { toast } from 'react-toastify'

import ConfirmationModal from '../../components/ConfirmationModal'

function EditMax({
  maxChairs,
  maxTableCount,

  onSubmit
}) {

  const [ tempChairs, setTempChairs ] = useState( 1 )
  const [ tempTables, setTempTables ] = useState( 1 )
  const [ showConfirmation, setConfirmation ] = useState( false )

  useEffect(() => {
    setTempChairs( maxChairs )
    setTempTables( maxTableCount )
  }, [ maxChairs, maxTableCount ])

  return (
    <ModalBody>
      <Form>
        <FormGroup>
          <Label>Max Table Counts</Label>
          <Input
            type={ 'text' }
            value={ tempTables }
            onChange={ e => setTempTables( +e.target.value.replace( /\D/g, "" ) )}
          />
        </FormGroup>
        <FormGroup>
          <Label>Max Chairs Counts</Label>
          <Input
            type={ 'text' }
            value={ tempChairs }
            onChange={ e => setTempChairs( +e.target.value.replace( /\D/g, "" ) )}
          />
        </FormGroup>
      </Form>
      <ModalFooter className='d-flex'>
        <Button 
          className={ 'ml-auto' }
          onClick={ () => {
            if ( tempChairs < 1 || tempTables < 1 ){
              return toast.error( 'Please make sure chairs and tables to be greater than 0')
            }

            if ( tempChairs < maxChairs || tempTables < maxTableCount ){
              return setConfirmation( true )
            }
  
            onSubmit( tempChairs, tempTables )
          }}
        >
          Submit
        </Button>
      </ModalFooter>
      <ConfirmationModal
        message={ 'The max tables count or max chairs count for each table is reduced to smaller value, this will leads to an update in the data. Are you sure confirm on the changes.' }
        isOpen={ showConfirmation }
        onClose={ () => setConfirmation( false )}
        onClickConfirm={ () => {
          setConfirmation( false )
          onSubmit( tempChairs, tempTables )
        }}
      />
    </ModalBody>
  )
}

export default EditMax