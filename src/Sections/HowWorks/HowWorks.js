import React, { useContext } from "react";
import "./HowWorks.css";
import { HomeContext } from "../../App";
import { Container } from "react-bootstrap";
import RequestBtn from "../../Components/RequestBtn/RequestBtn";
const HowWorks = ({onButtonClick}) => {
  const data = useContext(HomeContext);

  const howItSectionContent = data.customization.howitworks.content;
  const howitworksSty = data.customization.howitworks.style;
  const bgColor = {
    backgroundColor: howitworksSty.backgroundColor,
  };

  const handleClick = () => {
    onButtonClick();
  };

  return (
    <Container fluid className="why_blockbg" style={bgColor}>
      <div className="container">
       <div className="innercontainer">
       <h1 className="whyus_hadding">
          {howItSectionContent.titleText ? howItSectionContent.titleText : ""}{" "}
        </h1>
        <div className="row row_sty">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12">
            <div className="box_main">
              <div className="box_img">
                <img src="static/assets/images/how_it1.png" alt="whysimg" />
              </div>
              <h1 className="box_headding">
                {" "}
                {howItSectionContent.step1headtext
                  ? howItSectionContent.step1headtext
                  : ""}
              </h1>
              <p className="box_par">
                {howItSectionContent.step1paratext
                  ? howItSectionContent.step1paratext
                  : ""}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12">
            <div className="box_main">
              <div className="box_img">
                <img src="static/assets/images/how_it2.png" alt="whysimg" />
              </div>
              <h1 className="box_headding">
                {howItSectionContent.step2headtext
                  ? howItSectionContent.step2headtext
                  : ""}
              </h1>
              <p className="box_par">
                {howItSectionContent.step2paratext
                  ? howItSectionContent.step2paratext
                  : ""}
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12">
            <div className="box_main">
              <div className="box_img">
                <img src="static/assets/images/how_it3.png" alt="whysimg" />
              </div>
              <h1 className="box_headding">
                {howItSectionContent.step3headtext
                  ? howItSectionContent.step3headtext
                  : ""}
              </h1>
              <p className="box_par">
                {howItSectionContent.step3paratext
                  ? howItSectionContent.step3paratext
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="req_main">
          {/* <button className="req_btn" onClick={handleClick}>{howItSectionContent.CTAbuttonText}</button> */}
          <RequestBtn handleClick={handleClick} index={howItSectionContent.CTAbuttonText}/>
        </div>
       </div>
      </div>
    </Container>
  );
};

export default HowWorks;
