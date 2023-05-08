import { lazy, Suspense, useState } from 'react'
import _ from 'lodash'
import {
  Card, CardBody, Button,
  Modal
} from 'reactstrap'
import { IoMdClose } from 'react-icons/io'
import { toast, ToastContainer } from 'react-toastify';
import SelectTableModalContent from './components/SelectTableModalContent'

import QueueList from './components/QueueList'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss'

const CustomerView = lazy(() => import( './containers/CustomerView' ))
const OwnerView = lazy(() => import( './containers/OwnerView' ))

const SampleTableData = [
  {
    availableChair: 6,
    isOccupied: true,
  },
  {
    availableChair: 6,
    isOccupied: false,
  },
  {
    availableChair: 6,
    isOccupied: false
  }
]

function App() {

  const [ view, setView ] = useState( 'owner')
  const [ currentQueue, setCurrentQueue ] = useState( [] )
  const [ tableData, setTableData ] = useState( SampleTableData )
  const [ maxTableCount, setMaxTableCount ] = useState( 6 )
  const [ maxChairs, setMaxChairs ] = useState( 6 )

  const [ selectedQueue, setSelectedQueue ] = useState( null )

  return (
    <div className='p-5'>
      <div className="d-flex mb-3">
        <Button 
          color={ `${ view === 'owner' ? 'primary' : 'secondary' }`}
          style={{ marginRight: 12 }}
          onClick={ () => setView( 'owner' )}
        >
          Owner View
        </Button>
        <Button
          color={ `${ view === 'customer' ? 'primary' : 'secondary' }`}
          onClick={ () => setView( 'customer' )}
        >
          Customer View
        </Button>
      </div>
      <QueueList
        currentQueue={ currentQueue }
        setSelectedQueue={ setSelectedQueue }
      />
      <Card>
        <CardBody>
          {
            view === 'owner' && (
              <Suspense fallback={ 'Loading' }>
                <OwnerView
                  tableData={ tableData }
                  maxTableCount={ maxTableCount }
                  maxChairs={ maxChairs }
                  currentQueue={ currentQueue }
                  
                  setTableData={ setTableData }
                  setMaxTableCount={ setMaxTableCount }
                  setMaxChairs={ setMaxChairs }
                />
              </Suspense>
            )
          }
          {
            view === 'customer' && (
              <Suspense fallback={ 'Loading' }>
                <CustomerView
                  tableData={ tableData }
                  currentQueue={ currentQueue }
                  setCurrentQueue={ setCurrentQueue }
                  setTableData={ setTableData }
                />
              </Suspense>
            )
          }
        </CardBody>
      </Card>
      <ToastContainer/>
      <Modal size={ 'xl' } isOpen={ selectedQueue !== null }>
        <Button 
          onClick={() => setSelectedQueue( null )}
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
          numberOfPerson={ selectedQueue?.count??1 }
          onSubmit={( selectedTable, remainingClient ) => {
            let tempQueue = _.cloneDeep( currentQueue )
            let tempQueueIndex = _.findIndex( currentQueue, queueChild => queueChild.id === selectedQueue.id )
            let tempTable = _.map( tableData, ( tableChild, tableIndex ) => {
              if ( selectedTable.indexOf( tableIndex ) > -1 ){
                return {
                  ... tableChild,
                  isOccupied: true
                }
              }

              return tableChild
            }) 

            if ( remainingClient < 1 ){
              tempQueue.splice( tempQueueIndex, 1 )
            } else {
              tempQueue[ tempQueueIndex ][ 'count' ] = remainingClient 
            }

            toast( 
              remainingClient > 0
                ? `${ selectedTable.length > 0 ? `A Total of ${ selectedQueue?.count??1 - remainingClient } of customers has been assigned to ${ selectedTable.length } tables.` : `` } The remaining ${ remainingClient } is added to the waiting queue.`
                : `All ${ selectedQueue?.count??1 } customers has been assigned to ${ selectedTable.length } tables.`
            )

            setCurrentQueue( tempQueue )
            setSelectedQueue( null )
            setTableData( tempTable )
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
