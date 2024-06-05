import React, { useContext } from "react";
import "./Request.css";
import { Container } from "react-bootstrap";
import { HomeContext } from "../../App";
import RequestBtn from "../../Components/RequestBtn/RequestBtn";
const Request = ({onButtonClick}) => {
  const data = useContext(HomeContext);

  const reqSectionContent = data.customization.requestmoney.content;
  const reqSectionSty = data.customization.requestmoney.style;

  const req_headding = {
    color:reqSectionSty.titleColor
  }
  const req_para ={
    color:reqSectionSty.paraTextColor
  }

  const handleClick = () => {
    onButtonClick();
  };

  return (
    <Container fluid className="req_blockbg">
      <div className="container">
        <div className="innercontainer">
        <h1 className="req_headding" style={req_headding ? req_headding : ""}>{reqSectionContent.titleText ? reqSectionContent.titleText : ""}</h1>
        <p className="req_para" style={req_para ? req_para : ""}>
          {reqSectionContent.paraText ? reqSectionContent.paraText : ""}
        </p>

        <div className="req_main_btn">
          {/* <button className="req_btn" onClick={handleClick}>{reqSectionContent.CTAbuttonText}</button> */}
          <RequestBtn handleClick={handleClick} index={reqSectionContent.CTAbuttonText}/>
        </div>
        </div>
      </div>
    </Container>
  );
};

export default Request;
