import React, { useState, useMemo } from 'react'
import { Button, ModalBody, ModalFooter } from 'reactstrap'
import { toast } from 'react-toastify'
import _ from 'lodash'
import CustomerTableCard from '../containers/CustomerView/CustomerTableCard'

function SelectTableModalContent({
  mode,
  tableData,
  numberOfPerson,
  onSubmit
}) {
  
  const [ selectedTable, setSelectedTable] = useState( [] )

  const onClickTable = index => {
    let tempSelectedTable = _.cloneDeep( selectedTable )

    if ( tempSelectedTable.indexOf( index ) > -1 ){
      _.remove( tempSelectedTable, temp => temp === index ) 
    } else {
      tempSelectedTable.push( index )
    }

    setSelectedTable( tempSelectedTable )
  }

  let tempSumSeats = useMemo(() => {
    let tempSum = 0
    tableData.map(( tableChild, tableIndex ) => {
      if ( selectedTable.indexOf( tableIndex ) > -1 ) {
        tempSum += tableChild.availableChair
      }
    })
    return tempSum
    
  }, [ selectedTable, tableData ])

  let tempRemainingTable = useMemo(() => {
    let tempRemaining = []
    tableData.map(( tableChild, tableIndex ) => {
      if ( !tableChild.isOccupied && selectedTable.indexOf( tableIndex ) < 0) {
        tempRemaining.push( tableChild )
      }
    })

    return tempRemaining
  }, [ selectedTable, tableData ])

  return (
    <>
      <ModalBody>
        <strong className='d-block mb-2'>
          { `Select the table to fit ${ numberOfPerson } person.` }
          { `Selected table is able to fit ${ tempSumSeats } people.`}
          { numberOfPerson > tempSumSeats && tempRemainingTable.length < 1 && (
            `Remaining ${ numberOfPerson - tempSumSeats } will be added to waiting queue.`
          )}
        </strong>
        <div className="inimagine-table-cont mt-2">
          {
            tableData.map(( tableChild, tableIndex ) => (
              <CustomerTableCard
                key={ `table_card_${ tableIndex }`}
                selectedTable={ selectedTable}
                tableChild={ tableChild }
                tableIndex={ tableIndex }
                hasFoundTable={ tempSumSeats >= numberOfPerson }
                onClick={ () => onClickTable( tableIndex )}
              />
            ))
          }
        </div>
      </ModalBody>
      <ModalFooter>
        <Button 
          color={ 'primary' }
          disabled={ selectedTable.length < 1 }
          onClick={ () => {
            if ( tempRemainingTable.length > 0 && numberOfPerson > tempSumSeats ){
              return toast.error( `There's more table unoccupied. Please choose more table to allocate more customer.` )
            }
            onSubmit( selectedTable, numberOfPerson - tempSumSeats )
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </>
  )
}

export default SelectTableModalContent