import React, { useContext } from "react";
import "./Banner.css";
import { HomeContext } from "../../App";
import { Container } from "react-bootstrap";
import BannerForm from "../BannerForm/BannerForm";
const Banner = React.forwardRef((props, ref) => {
  const data = useContext(HomeContext);
  const handleClick = () => {
    props.onButtonClick();
  };
  const headerSectionContent = data.customization.bannerSection.content;
  const headerSectionSty = data.customization.bannerSection.style;

  console.log("Banner Content", headerSectionContent);
  console.log("Banner Style", headerSectionSty);

  const BannerBgUrl = data.banner_img;

  const BannerBg = {
    backgroundImage: `url(static/assets/images/${BannerBgUrl})`,
  };
  const HeadingColor = {
    color: headerSectionSty.headertextColor,
  };

  // console.log("HOME Style", BannerBg);

  return (
    <Container fluid style={BannerBg} className="bannerbg1">
      <div className="container">
        <div className="row banner_row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 banner_col">
            <div className="">
              <p className="banner_heading" style={HeadingColor}>
                {headerSectionContent.headingText}
              </p>
              <p className="banner_subheading" style={HeadingColor}>
                {headerSectionContent.subheadingText}
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="FormBlock" ref={ref}>
              <BannerForm handleClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
});

export default Banner;
