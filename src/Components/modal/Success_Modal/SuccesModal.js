import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
function SuccesModal(props) {
  const { show, handleClose } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose} size="sm" className="madal_index">
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <p className="modal_headding">Success</p>
            {/* <button
              type="button"
              className="close close_icon"
              onClick={handleClose}
            >
              &times;
            </button> */}
          </div>
          <h3 className="text-center main_para_bold py-3">Your request is submitted successfully.</h3>
         
        </Modal.Body>
        <Modal.Footer className="p-0">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SuccesModal;
