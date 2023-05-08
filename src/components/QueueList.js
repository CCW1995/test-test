import _ from 'lodash'
import { Fragment } from 'react'
import {
  Card, CardBody, Button, UncontrolledTooltip
} from 'reactstrap'

function QueueList({
  currentQueue,
  setSelectedQueue
}) {
  return (
    <>
      <Card className='mb-3'>
        <CardBody>
          <h5>Waiting List</h5>
          <div className="d-flex flex-wrap">
          {
            currentQueue.length > 0 &&
            currentQueue.map(( queueChild, queueIndex ) => (
              <Fragment key={ `queue_${ queueIndex }`}>
                <Button 
                  id={ `queue_${ queueIndex }_id`}
                  key={ `queue_${ queueIndex }`}
                  className="mr-2"
                  color='primary'
                  size='sm'
                  onClick={ () => {
                    setSelectedQueue( queueChild )
                  }}
                >
                  { `Click to allcate - Queue No. ${ queueChild.id }` }
                </Button>
                <UncontrolledTooltip target={ `queue_${ queueIndex }_id` }>
                { `${ queueChild.count } customers` }
                </UncontrolledTooltip>
              </Fragment>
            ))
          }
          {
            currentQueue.length < 1 && (
              <small>Waiting Queue is empty.</small>
            )
          }
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default QueueList