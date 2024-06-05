import React, { useContext } from "react";
import "./WhyUs.css";
import { Container } from "react-bootstrap";
import { HomeContext } from "../../App";
import RequestBtn from "../../Components/RequestBtn/RequestBtn";
const WhyUs = ({ onButtonClick }) => {
  const data = useContext(HomeContext);

  const whyUsSectionContent = data.customization.whyUsSection.content;
  const whyUsSectionSty = data.customization.whyUsSection.style;

  const titleTxt = {
    color: whyUsSectionSty.titleColor,
  };

  const bgColor = {
    backgroundColor: whyUsSectionSty.backgroundColor,
  };
  const boldtxtColor = {
    color: whyUsSectionSty.boldTextColor,
  };
  const paratxtColor = {
    color: whyUsSectionSty.paraTextColor,
  };

  const handleClick = () => {
    onButtonClick();
  };

  return (
    <Container fluid className="why_blockbg" style={bgColor}>
      <div className="container">
        <div className="innercontainer">
          <h1 className="whyus_hadding" style={titleTxt}>
            {whyUsSectionContent.titleText ? whyUsSectionContent.titleText : ""}{" "}
          </h1>
          <div className="row row_sty">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12">
              <div className="box_main">
                <div className="box_img">
                  <img
                    src={`static/assets/images/${whyUsSectionContent.whyUsImg1}`}
                    alt="whysimg"
                  />
                </div>
                <h1 className="box_headding" style={boldtxtColor}>
                  {" "}
                  {whyUsSectionContent.icon1bold
                    ? whyUsSectionContent.icon1bold
                    : ""}
                </h1>
                <p className="box_par" style={paratxtColor}>
                  {whyUsSectionContent.icon1text
                    ? whyUsSectionContent.icon1text
                    : ""}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12">
              <div className="box_main">
                <div className="box_img">
                  <img
                    src={`static/assets/images/${whyUsSectionContent.whyUsImg2}`}
                    alt="whysimg"
                  />
                </div>
                <h1 className="box_headding" style={boldtxtColor}>
                  {whyUsSectionContent.icon2bold
                    ? whyUsSectionContent.icon2bold
                    : ""}
                </h1>
                <p className="box_par" style={paratxtColor}>
                  {whyUsSectionContent.icon2text
                    ? whyUsSectionContent.icon2text
                    : ""}
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-12">
              <div className="box_main">
                <div className="box_img">
                  <img
                    src={`static/assets/images/${whyUsSectionContent.whyUsImg3}`}
                    alt="whysimg"
                  />
                </div>
                <h1 className="box_headding" style={boldtxtColor}>
                  {whyUsSectionContent.icon3bold
                    ? whyUsSectionContent.icon3bold
                    : ""}
                </h1>
                <p className="box_par" style={paratxtColor}>
                  {whyUsSectionContent.icon3text
                    ? whyUsSectionContent.icon3text
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="req_main">
            {/* <button className="req_btn" onClick={handleClick}>{whyUsSectionContent.CTAbuttonText}</button> */}
            <RequestBtn
              handleClick={handleClick}
              index={whyUsSectionContent.CTAbuttonText}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WhyUs;
