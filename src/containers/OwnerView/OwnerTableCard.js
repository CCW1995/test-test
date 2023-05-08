import React from 'react'
import _ from 'lodash'
import { 
  FormGroup, Label, Input,
  Card, CardBody, Button
} from 'reactstrap'
import { AiFillDelete } from 'react-icons/ai'


const TableCard = ({
  tableChild,
  tableIndex,
  maxChairs,
  
  onChangeTableData,
  onDeleteTableData
}) => {
  return (
    <Card>
      <CardBody style={{ textAlign: 'center', position: 'relative' }}>
         <div className="d-flex mb-2">
          <Button
            size={ 'sm' }
            color={ tableChild.isOccupied ? 'secondary': 'primary' }
            disabled={ !tableChild.isOccupied }
            onClick={ () => {
              onChangeTableData(
                tableIndex, 
                'isOccupied', 
                false
              )
            }}
          >
            { 
              tableChild.isOccupied ? 'Occupied' : 'Unoccupied' 
            }
          </Button>
          <Button
            color='danger'
            size='sm'
            disabled={ tableChild.isOccupied }
            style={{ marginLeft: 'auto' }}
            onClick={ () => onDeleteTableData( tableIndex )}
          >  
            <AiFillDelete
              className='text-white'
              size={ 18 }
            />
          </Button>
        </div>
        <strong className='mb-3'>
          { `Table ${ tableIndex + 1 }`}
        </strong>
        <FormGroup>
          <Label>No. Of Chairs</Label>
          <Input
            type={ 'select' }
            disabled={ tableChild.isOccupied }
            value={ tableChild.availableChair }
            onChange={ e => onChangeTableData( 
              tableIndex, 
              'availableChair', 
              +e.target.value.replace( /\D/g, "" 
            ) )}
          >
            {[...Array( maxChairs )].map((_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </Input>
        </FormGroup>
      </CardBody>
    </Card>
  )
}

export default TableCard;