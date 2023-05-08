import React from 'react'
import _ from 'lodash'
import { 
  Card, CardBody
} from 'reactstrap'

const CustomerTableCard = ({
  hasFoundTable,
  selectedTable,
  tableChild,
  tableIndex,
  onClick
}) => {
  return (
    <Card 
      className={ `${ selectedTable.indexOf( tableIndex )  > - 1 ? 'border-primary' : 'border-none' }`}
      style={{ 
        cursor: tableChild.isOccupied ? 'initial' : 'pointer', 
        borderWidth: 2, 
        background: tableChild.isOccupied ? 'rgba(0,0,0,0.05)': 'unset' 
      }}
      onClick={ () => {
        if ( !tableChild.isOccupied ){
          if ( !hasFoundTable || (
            hasFoundTable && selectedTable.indexOf( tableIndex )  > - 1
          )){
            onClick()
          } 
        }
      }}
    >
      <CardBody style={{ textAlign: 'center', position: 'relative' }}>
        <strong className='d-block mb-2'>
          { `Table ${ tableIndex + 1 } ${ tableChild.isOccupied ? `( occupied )` : '' }`}
        </strong>
        <h5>{ `${ tableChild.availableChair } Chairs` }</h5>
      </CardBody>
    </Card>
  )
}

export default CustomerTableCard;