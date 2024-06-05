import React from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css"
import ContactForm from "../forms/contactform";
import UnsubscribeForm from "../forms/unsunscribeform";
function Allpagemodal({ flag, setFlagClose, name, bodyTitle, children, modelData }) {

  
  // const faqData = children.props.children || {};

  
  return (
    <>
   
      <Modal show={flag} onHide={setFlagClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{bodyTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {
            bodyTitle !== "Frequently Asked Questions" ?  (<div
              dangerouslySetInnerHTML={{ __html: children.props.children }}
            />) : ""
          }
          
          {bodyTitle === "Contact us" ? (
          <>
          {/* <ContactForm />  */}
            <ContactForm/>
          </>
          ) : bodyTitle === "Unsubscribe" ? (
           <>
           <UnsubscribeForm />
           {/* <h1>Unsub</h1> */}
           </>
          ) : bodyTitle === "Frequently Asked Questions" ? 
          
          {/* (<FooterFaq modelData={modelData}/>) */}
         ( <h1>faq</h1>)
           : ""
          
          }

          <div style={{ paddingTop: "16px", textAlign:"end" }}>
            <button className="btn_close" onClick={setFlagClose}>
              Close
            </button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer >
                    
                 
                </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default Allpagemodal;
