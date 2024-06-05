import React, { useRef } from "react";
import "./Home.css";
import Header from "../../Sections/Header/Header";
import Banner from "../../Sections/Banner/Banner";
import Info from "../../Sections/Info/Info";
import WhyUs from "../../Sections/WhyUs/WhyUs";
import HowWorks from "../../Sections/HowWorks/HowWorks";
import CheckCriteria from "../../Sections/CheckCriteria/CheckCriteria";
import Faq from "../../Sections/Faqs/Faqs";
import Request from "../../Sections/Request/Request";
import Footer from "../../Sections/Footer/Footer";

const Home = () => {
  const bannerRef = useRef(null);

  const handleButtonClick = () => {
    bannerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pageWidth">
      <Header />
      <Banner ref={bannerRef} />
      <Info />
      <WhyUs onButtonClick={handleButtonClick} />
      <HowWorks onButtonClick={handleButtonClick} />
      <CheckCriteria onButtonClick={handleButtonClick} />
      <Faq />
      <Request onButtonClick={handleButtonClick} />
      <Footer />
    </div>
  );
};

export default Home;
