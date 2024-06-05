import React, { useContext, useState } from "react";
import "./Faqs.css";
import { HomeContext } from "../../App";
import { Accordion } from "react-bootstrap";
import Test1 from "./Test1";
// import { HomeContext } from "../../../../../App";

// import { faq } from '../../data'

const Faq = () => {
  const data = useContext(HomeContext);
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const faqSectionContent = data.customization.faq.content;
  const faqSectionSty = data.customization.faq.style;
  const [defaultActiveKey, setDefaultActiveKey] = useState(
    faqSectionContent.faq[0].id
  );

  const view_txt = data.customization.faq.content.CTAbuttonText;
  const arrow_black = data.customization.faq.content.arrow_black;

  const activeQus = {
    color: faqSectionSty.themeColor2,
  };

  const borderSty = {
    border: "1px solid",
    borderColor: isHover
      ? faqSectionSty.themeColor2
      : faqSectionSty.paraTextColor,
  };

  const handleMouseEnter = (index) => {
    setIsHover(index + 1);
  };

  const handleMouseLeave = (index) => {
    if (index != "notActive") {
      setIsHover(0);
    }
  };

  const themeColor = {
    color: faqSectionSty.themeColor2 ? faqSectionSty.themeColor2 : "",
  };

  const faqBackground = {
    backgroundColor: faqSectionSty.backgroundColor
      ? faqSectionSty.backgroundColor
      : "",
  };

  const sectionTitle = {
    color: faqSectionSty.titleColor ? faqSectionSty.titleColor : "",
  };

  const quesText = {
    backgroundColor: faqSectionSty.quesbarbackground
      ? faqSectionSty.quesbarbackground
      : "",
    color: faqSectionSty.quesTextColor ? faqSectionSty.quesTextColor : "",
  };
  const activeTextQus = {
    color: faqSectionSty.quesTextColor ? faqSectionSty.quesTextColor : "",
  };
  const answerbarStyle = {
    backgroundColor: faqSectionSty.answerbarbackground
      ? faqSectionSty.answerbarbackground
      : "",
    color: faqSectionSty.paraTextColor ? faqSectionSty.paraTextColor : "",
  };

  const handelActive = (index) => {
    setIsActive(index + 1);
  };
  return (
    <div>
      {/* <!-- 7thBlock --> */}

      <div className="container-fluid faq_block" style={faqBackground}>
        <div className="container">
          <div className="innercontainer">
            <h1 className="faq_headding" style={sectionTitle}>
              {faqSectionContent.titleText}{" "}
            </h1>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="faq_inner">
                {/* <Accordion defaultActiveKey={defaultActiveKey}> */}
                <Accordion>
                  {faqSectionContent.faq.map((item, index) => (
                    <Accordion.Item
                      key={item.id}
                      eventKey={item.id}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={
                        isActive === index + 1
                          ? () => handleMouseLeave("notActive")
                          : () => handleMouseLeave(index)
                      }
                      style={
                        isHover === index + 1 || isActive === index + 1
                          ? borderSty
                          : {}
                      }
                      onClick={() => handelActive(index)}
                    >
                      <Accordion.Header
                        className="qus_txt"
                        style={activeTextQus}
                      >
                        <p
                          className="faq_qus"
                          style={
                            isActive === index + 1
                              ? activeQus
                              : {} && activeTextQus
                          }
                        >
                          {" "}
                          {item.qus}
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p
                          className="ans_txt"
                          dangerouslySetInnerHTML={{ __html: item.ans }}
                        ></p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
              <div>
                <button className="view_btn">
                  {view_txt}{" "}
                  <img
                    src={`static/assets/images/${arrow_black}`}
                    alt="arrow_black"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
