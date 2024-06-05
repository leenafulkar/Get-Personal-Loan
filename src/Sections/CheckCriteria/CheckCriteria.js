import React, { useContext } from "react";
import "./CheckCriteria.css";
import { Container } from "react-bootstrap";
import { HomeContext } from "../../App";
import RequestBtn from "../../Components/RequestBtn/RequestBtn";
const CheckCriteria = ({onButtonClick}) => {
  const data = useContext(HomeContext);
  const checkSectionContentBtn = data.customization.checkSection;
  const checkSectionContent = data.customization.checkSection.content;
  const checkSectionSty = data.customization.checkSection.style;

  const page_title = data.customization.checkSection.titleText

  console.log("CHECK------------------>>>?///>>>",checkSectionContent);
  
  const bgColor ={
    backgroundColor:checkSectionSty.backgroundColor
  }

  const handleClick = () => {
    onButtonClick();
  };

  return (
    <Container fluid className="check_block" style={bgColor}>
      <div className="container">
     <div className="innercontainer">
     <h1 className="check_headding">{page_title}</h1>
      
      <div className="row check_row">
      {checkSectionContent.map((checkli,index) =>
        <div key={index} className="col-lg-4 col-md-12 col-sm-12" >
          <ul className="ul_style">
            <li className="li_style">{checkli.check1? checkli.check1 : ""}</li>
            <li className="li_style">
             {checkli.check2 ? checkli.check2 : ""}
            </li>
          </ul>
        </div>
        ) }
      </div>
 
      <div>
      <div className="req_main">
  
      {/* <button className="req_btn" onClick={handleClick}>{req_btn}</button> */}
     
   
     <RequestBtn handleClick={handleClick} index={checkSectionContentBtn.CTAbuttonText}/>
     </div>
      </div>
     </div>
      </div>
    </Container>
  );
};

export default CheckCriteria;
