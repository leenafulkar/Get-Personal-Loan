import React, { useContext, useEffect, useState } from "react";
import "./Footer.css";
import { Container } from "react-bootstrap";
import { HomeContext } from "../../App";
import Allpagemodal from "../../Components/modal/allpagemodal";
import API from "../../service/Api";
const Footer = ({ webData }) => {
  const data = useContext(HomeContext);

  const footerSectionContent = data.customization.footer.content;

  const footerSectionSty = data.customization.footer.style;

  const log_para_txt = {
    color: footerSectionSty.logoParaTextColor,
  };
  const footer_link = {
    color: footerSectionSty.linkColor,
  };
  const bottom_para = {
    color: footerSectionSty.bottomParaTextColor,
  };

  const logo = footerSectionContent.footerLogo;

  const initModelData = { name: "", title: "", children: "" };

  const [flag, setFlag] = useState(false);
  const [model, setModel] = useState(initModelData);
  const [apiModel, setApiModel] = useState([]);

  useEffect(() => {
    fetch("data/website_config.json")
      .then((res) => res.json())
      .then((data) => {
        // setWebname(data);
        handleApiCall(data.WEBSITE_NAME, data.WEBSITE_ID);
      });
  }, []);

  const handleApiCall = async (web, websiteId) => {
    try {
      const article = { websiteName: web, webSiteId: websiteId };

      let res = await API.post("Content/getWebsiteContent", article);
      // let res = await API.post("Content/getWebsiteContent", article);

      console.log("RES PONS+_+_+_+_+_+_+_+_+_+_+", res.data);

      setApiModel(res.data[0]);
    } catch (error) {
      console.error("whySectionerror", error.message);
    }
  };

  const setShow = (arg) => {
    console.log("ARG MODAL", arg);
    const x = JSON.parse(apiModel[arg] ? apiModel[arg] : {});
    setModel({ name: "", title: x.heading, children: x.content.text });
    setFlag(true);
  };

  return (
    <>
      <div style={{ background: "#f3f3f3" }}>
        <Container fluid className="footer_block">
          <div className="container">
            <div className="footer_top">
              <div className="row">
                <div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 col-12">
                  <div>
                    <img
                      src={`static/assets/images/${logo}`}
                      alt="footerlogo"
                      className="footerlogo"
                    />
                  </div>
                  <p className="footer_logopara" style={log_para_txt}>
                    {footerSectionContent.logoParaText}
                  </p>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 col-xs-6 col-6">
                  <div className="footer_link_main">
                    <p style={footer_link} onClick={() => setShow("contact")}>
                      <>Contact us</>
                    </p>
                    <p style={footer_link} onClick={() => setShow("terms")}>
                      <>Terms of service</>
                    </p>
                    <p style={footer_link} onClick={() => setShow("policy")}>
                      <>Privacy Policy</>
                    </p>
                    <p style={footer_link} onClick={() => setShow("e_consent")}>
                      <>E-consent</>
                    </p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-6 col-xs-6 col-6">
                  <div className="footer_link_main">
                    <p
                      style={footer_link}
                      onClick={() => setShow("disclaimer")}
                    >
                      <>Disclaimer</>
                    </p>

                    <p style={footer_link} onClick={() => setShow("ccpa")}>
                      <>Do not sell my information</>
                    </p>
                    <p
                      style={footer_link}
                      onClick={() => setShow("unsubscribe")}
                    >
                      <>Unsubscribe</>
                    </p>
                  </div>
                </div>
              </div>
              <div className="footer_img_main">
                <img
                  src={`static/assets/images/${footerSectionContent.sslLogo}`}
                  alt="ssllogo"
                />
                <img
                  src={`static/assets/images/${footerSectionContent.safe}`}
                  alt="safelogo"
                />
                <img
                  src={`static/assets/images/${footerSectionContent.ola}`}
                  alt="olalogo"
                />
              </div>

              <p className="copy_right_txt">@ All right reserved.</p>

              <p className="footer_para" style={bottom_para}>
                {footerSectionContent.bottomParaText}
              </p>
            </div>
          </div>
        </Container>
        <Allpagemodal
          flag={flag}
          setFlagClose={() => setFlag(false)}
          name={model["name"]}
          bodyTitle={model["title"]}
        >
          <>{model["children"]}</>
        </Allpagemodal>
      </div>
    </>
  );
};

export default Footer;
