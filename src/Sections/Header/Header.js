import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { Squeeze } from "hamburger-react";
import { useContext, useState } from "react";
import { HomeContext } from "../../App";
import Allpagemodal from "../../Components/modal/allpagemodal";
import { useEffect } from "react";
import API from "../../service/Api";
import { useNavigate } from "react-router-dom";
import loannavigatorlogo from '../../loannavigator.png'
const Header = () => {
  // console.log("IP adderess",ip);
  const navigate = useNavigate();
  const initModelData = { name: "", title: "", children: "" };

  const [flag, setFlag] = useState(false);
  const [model, setModel] = useState(initModelData);
  const [apiModel, setApiModel] = useState([]);
  console.log("Modal Api", apiModel);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const data = useContext(HomeContext);

  const headerSectionContent = data.customization.headerSection.content;
  const headerSectionSty = data.customization.headerSection.style;

  const logo = data.logo_img;
  const logim_img = data.login_img;

  // console.log("HOME DATA", logo);
  // console.log("HOME Content", headerSectionContent);
  // console.log("HOME Style", headerSectionSty);

  const headerBackground = {
    border: "1px solid",
    backgroundColor: headerSectionSty.backgroundColor,
    borderColor: headerSectionSty.borderBottom,
  };

  const navlinkColor = {
    color: headerSectionSty.linkColor,
    backgroundColor: headerSectionSty.linkBg,
  };

  const ctaStyle = {
    backgroundColor: isHover
      ? headerSectionSty.ctaHoverBg
      : headerSectionSty.ctaBg,
    color: isHover
      ? headerSectionSty.ctaHoverTextColor
      : headerSectionSty.ctaTextColor,
    border: "1px solid",
    borderTopColor: isHover
      ? headerSectionSty.ctaHoverBg
      : headerSectionSty.ctaBg,
    borderLeftColor: isHover
      ? headerSectionSty.ctaHoverBg
      : headerSectionSty.ctaBg,
    borderRightColor: isHover
      ? headerSectionSty.ctaHoverBg
      : headerSectionSty.ctaBg,
    borderBottomColor: isHover
      ? headerSectionSty.ctaHoverBg
      : headerSectionSty.ctaBg,
  };

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
      {["lg"].map((expand, index) => (
        <div key={index} style={{ background: "transparent" }}>
          <Navbar expand={expand} className="nav_bg">
            <Container>
              <div className="container p-0">
                <div className="nav_parent">
                  <Navbar.Brand href="/" className="logoCenterText2">
                    {/* <img
                      src={logoimg}
                      alt="headerlogo"
                      className={`${styles.header_logo}`}
                    /> */}
                    {/* Lend */}
                    <h1 className="header_logo">
                      {/* <img
                        src={`static/assets/images/${loannavigator}`}
                        alt="headerlogo"
                      />  */}
                      <img src={loannavigatorlogo} alt="log" width={180} height={48} 
                      style={{borderRadius:'20px'}}
                      />
                    </h1>
                  </Navbar.Brand>
                  <Navbar
                    aria-controls={`offcanvasNavbar-expand-${expand}`}
                    className="Hamburger_boder "
                  >
                    <div className="Login_bar_main">
                      {/* <div className="but_nav_start but_display">
                        {
                        
                          <img
                            src={`static/assets/images/${logim_img}`}
                            alt="login-img"
                          />
                        }
                      </div> */}

                      {/* <div className="hamburger_sty" style={headerBackground}>
                        <Squeeze direction="right" size={20} color="#fff"/>
                      </div> */}
                    </div>
                  </Navbar>

                  <Navbar.Toggle>
                    <div className="hamburger_sty" style={headerBackground}>
                      <Squeeze direction="right" size={20} color="#fff" />
                    </div>
                  </Navbar.Toggle>

                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                    className="button button-effect offcanvas-top"
                  >
                    <Offcanvas.Body className="contact_bg">
                      <Nav className="justify-content-center flex-grow-1 ulstylink">
                        <div style={headerBackground} className="link-box">
                          <NavLink
                            className="header_link"
                            style={navlinkColor}
                            onClick={() => setShow("how_it_works")}
                          >
                            About Us
                          </NavLink>
                          <NavLink
                            className="header_link"
                            style={navlinkColor}
                            // style={{ color: link.color }}
                            // style={({ isActive }) => isActive ? link.activeStyle : { color: "#262250" }
                            // }
                            onClick={() => setShow("rates")}
                          >
                            Rate & Fees
                          </NavLink>
                          <NavLink
                            className="header_link"
                            style={navlinkColor}
                            // style={{ color: link.color }}
                            // style={({ isActive }) => isActive ? link.activeStyle : { color: "#262250" }
                            // }
                            onClick={() => setShow("contact")}
                          >
                            Contact Us
                          </NavLink>
                        </div>
                      </Nav>
                      <div className="but_nav_start but_display">
                        <Button
                          className="get_start_btn"
                          type="submit"
                          style={ctaStyle}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          href="/form"
                        >
                          {/* Request Now */}
                          {headerSectionContent.ctaText}
                        </Button>
                      </div>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </div>
              </div>
            </Container>
          </Navbar>
        </div>
      ))}

      <Allpagemodal
        flag={flag}
        setFlagClose={() => setFlag(false)}
        name={model["name"]}
        bodyTitle={model["title"]}
      >
        <>{model["children"]}</>
      </Allpagemodal>
    </>
  );
};

export default Header;
