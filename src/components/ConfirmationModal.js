import React from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'
import { IoMdClose } from 'react-icons/io'

function ConfirmationModal({
  message,
  isOpen,
  onClose,
  onClickConfirm
}) {
  return (
    <>
      <Modal isOpen={ isOpen }
        style={{ position: 'relative' }}
      >
        <Button 
          onClick={() => onClose()}
          color='danger'
          style={{ 
            position: 'absolute', top: -15, right: -5, zIndex: 2,
            padding: 0,
            width: 30, height: 30
          }}
        >
          <IoMdClose style={{ width: 20, height: 20 }}/>
        </Button>
        <ModalBody>
          <span>
            { message || `Are you sure to delete this record ?` }
          </span>
          <div className="d-flex">
            <Button
              style={{ marginLeft: 'auto' }}
              size={ 'small' }
              color={ 'primary' }
              onClick={ () => onClickConfirm()}
            >
              Confirm
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default ConfirmationModal