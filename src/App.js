import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import API from "./service/Api";
import MainForm from "./Components/forms/MainForm";
import Formsection from "./Components/SteperForm/Formsection";
// import "../src/Components/SteperForm/css/SidesectionAccordian.css";

const defaultData = {
  website_id: "44",
  sub: "",
  domain_id: "1",
  domain_name: "whiterockcash.com",
  server_id: "1",
  logo_img: "logo.png",
  login_img: "login_img.png",
  favicon_img: "favicon.png",
  min_amount: "1000",
  max_amount: "15000",
  banner_img: "banner.png",
  section1_img: "img1.png,img2.png",
  section2_img: "",
  section3_img: "",
  section4_img: "",
  primary_color: "#4080C1",
  secondary_color: "#000000",
  form_id: "1",
  form_url: "https://useasycash.com/formcdn/version1.2.1/?c=Home",
  ga_script: "",
  push_script: "",
  ola_script: "",
  customization: {
    headerSection: {
      section: "Header",
      content: {
        ctaText: "Request Now",
      },
      style: {
        backgroundColor: "#1B1B1E",
        headerBg: "#1B1B1E",
        mobileNavBg: "#f9fffb",
        linkColor: "#FCFCFC",
        linkHoverColor: "#191C1A",
        ctaBg: "#34B406",
        ctaTextColor: "#ffffff",
        ctaBgBorder: "#34B406",
        ctaHoverBg: "#9cc983",
        ctaHoverTextColor: "#ffffff",
      },
    },

    bannerSection: {
      section: "Banner",
      content: {
        headingText: "Fast decision payday loans.",
        subheadingText: "2 minute request. Seamless process. request now.",
        ctaText: "Request Now",
        ctaBottomText1: "1000 Users requesting for loan at this moment.",
        formHedding: "Get started",
        label1: "Enter loan amount",
        label2: "Enter email address",
      },
      style: {
        themeColor2: "#34B406",
        backgroundColor: "#F9FFFB",
        headertextColor: "#FCFCFC",
        paratextColor: "#191C1ACC",
        termsTextColor: "#737780",
        fieldHoverBorder: "#34B406",
        fieldErrorBorder: "#ff2b2b",
        discLinkColor: "#1B1B1E",
        ctaBg: "#34B406",
        ctaTextColor: "#ffffff",
        ctaHoverBg: "#9cc983",
        ctaHoverTextColor: "#ffffff",
        fontFamily: "Intel",
      },
    },

    infoSection: {
      section: "Info",
      content: [
        {
          infoTitle: "20000",
          infoText: "Request Processed Daily",
        },
        {
          infoTitle: "1,000,000+",
          infoText: "Happy Customers",
        },
        {
          infoTitle: "100+",
          infoText: "Buyers",
        },
        {
          infoTitle: "80%",
          infoText: "Conversion Rate",
        },
      ],
      style: {
        infoTitleColor: "#34B406",
        infoTextColor: "#1B1B1E",
        infoblockBg: "#FCFCFC",
      },
    },

    whyUsSection: {
      section: "Why Us",

      content: {
        titleText: "Why Us?",
        titleTextTheme: "Us?",
        icon1bold: "Zero Processing Fee",
        icon1text:
          "When you use our platform to request a loan, you won't incur any additional charges for submitting your application.",
        icon2bold: "Instant decision",
        icon2text:
          "we have designed our platform to provide swift responses to your loan requests.",
        icon3bold: "Seamless process",
        icon3text:
          "we have developed a user-friendly platform that makes it easy for you to request a loan.",
        icon4bold: "",
        icon4text: "",
        CTAbuttonText: "Request Now why",
        whyUsImg1: "why_img1.png",
        whyUsImg2: "why_img2.png",
        whyUsImg3: "why_img3.png",
      },
      style: {
        themeColor2: "#34B406",
        outerBgcolor: "#F9FFFB",
        backgroundColor: "#fcfcfc",
        titleColor: "#1B1B1E",
        boldTextColor: "#1B1B1E",
        paraTextColor: "#6D7484",
      },
    },
    howitworks: {
      section: "How it Works",
      content: {
        titleText: "How we works",
        titleTextTheme: "",
        step1: "STEP 1",
        step1headtext: "You submit information",
        step1paratext:
          "You open the website and fill the information required to process the loan request.",
        icon1: "/static/assets/images/333.svg",
        step2: "STEP 2",
        step2headtext: "We contact lenders",
        step2paratext:
          "Our platform share your information with the right lender.",
        icon2: "/static/assets/images/333.svg",
        step3: "STEP 3",
        step3headtext: "You get decision",
        step3paratext:
          "Within a few minutes, you will get a decision on your loan request.",
        icon3: "/static/assets/images/333.svg",
        CTAbuttonText: "Request Now How",
      },
      style: {
        themeColor2: "#4169E1",
        backgroundColor: "#fff",
        titleColor: "#191C1A",
        stepTextColor: "#4169E1",
        boldTextColor: "#4169E1",
        paraTextColor: "#191C1ACC",
        //
        outerBgcolor: "#f9fffb",
        ctaBg: "#34B406",
        ctaTextColor: "blue",
        ctaHoverBg: "#9cc983",
        ctaHoverTextColor: "#ffffff",
      },
    },

    checkSection: {
      section: "Check eligibility criteria",
      content: [
        {
          check1: "Your age should be 18 years or more",
          check2: "You should have valid phone number and email address.",
        },
        {
          check1: "You should be U.S. citizen or permanent resident.",
          check2:
            "You should have valid checking bank account for deposit and repayment.",
        },
        {
          check1: "You should have constant source of income.",
          check2: "You should have valid Social Security Number(SSN)  .",
        },
      ],
      titleText: "Check eligibility criteria",
      CTAbuttonText: "Request Now Check",
      style: {
        infoTitleColor: "#34B406",
        backgroundColor: "#fcfcfc",
        infoTextColor: "#1B1B1E",
        infoblockBg: "#FCFCFC",
      },
    },

    faq: {
      section: "Frequently Asked Questions",
      content: {
        titleText: "Question? We have got answers.",
        titleTextTheme: "Questions",
        faq: [
          {
            id: "0",
            qus: "What are the requirements to submit a loan?",
            ans: "<p>- Should be employed in your current position for at least 90 days</p><p>- Should be older than 18 years of age, should be a US citizen or a permanent resident</p> <p>- Should have a minimum income of $1000 each month after tax deductions</p> <p>- Should have a valid email address, work and home phone number.</p>",
          },
          {
            id: "1",
            qus: "What amount could I get?",
            ans: "You could be eligible to any amount up to 15000. The approved amount will be determined by the lender. Having a working email address,work telephone number and home telephone are some of the usual prerequisites for getting a loans",
          },
          {
            id: "3",
            qus: "How much time does it take?",
            ans: "It could take as few minutes to process the duly filled form. You could get your loans after approval within the next business day.",
          },
          {
            id: "4",
            qus: "What is the cost?",
            ans: "There is no cost to use whiterockcash.com. The fees of the loan will vary depending upon the amount and the lender. The lender will inform you of the fees for the loan which may vary depending on the lender.",
          },
        ],
        CTAbuttonText: "View more",
        arrow_black: "arrow_black.png",
      },
      style: {
        themeColor2: "#34B406",
        backgroundColor: "#fff",
        quesbarbackground: "white",
        answerbarbackground: "white",
        titleColor: "#191C1A",
        quesTextColor: "#1B1B1E",
        paraTextColor: "#191C1A99",
        activeTextQus: "red",
      },
    },

    requestmoney: {
      section: "Ready to Request",
      content: {
        titleText: "So, are you ready to request for loan?",
        titleTextTheme: "request?",
        paraText:
          "Submit your loan application and receive an instant decision.",
        CTAbuttonText: "Request Now Req",
      },
      style: {
        themeColor2: "#008836",
        backgroundColor: "#fff",
        titleColor: "#fff",
        paraTextColor: "#fff",
        buttonBordercolor: "#008836",
        buttonTextcolor: "#FFFFFF",
        buttonBgcolor: "#008836",
        outerBgcolor: "#f9fffb",
        ctaBg: "#34B406",
        ctaTextColor: "blue",
        ctaHoverBg: "#9cc983",
        ctaHoverTextColor: "#ffffff",
      },
    },

    reqbtnSection: {
      section: "Request Button",
      style: {
        ctaBg: "#34B406",
        ctaTextColor: "#fff",
        ctaHoverBg: "#9cc983",
        ctaHoverTextColor: "#ffffff",
      },
    },

    footer: {
      section: "Footer",
      content: {
        footerLogo: "logo.png",
        logoParaText:
          "we are dedicated to providing fast and convenient access to  request emergency funds for those in need.",
        sslLogo: "ssl-logo.png",
        safe: "safe-logo.png",
        ola: "ola.png",

        bottomParaText:
          "THE OPERATOR OF THIS WEBSITE IS NOT A LENDER, is not a loan broker, and does not make lending decisions on behalf of lenders. This Web Site does not constitute an offer or solicitation to lend. This site will submit the information you provide to a lender who makes short-term cash loans to borrowers who meet its lending criteria. Providing your information on this Website does not guarantee that you will be approved for a short term cash loan. The operator of this Web Site is not an agent, representative or broker of any lender and does not endorse any particular lender or charge you for any service or product. Not all lenders can provide the maximum amount advertised. Cash transfer times may vary between lenders and may depend on your individual financial institution. In some circumstances faxing may be required. This service is not available in all states, and the states serviced by this Web Site may change from time to time and without notice. For details, questions or concerns regarding your short-term cash loan, please contact your lender directly. Short term cash loans are meant to address immediate cash needs and are not a long-term solution for financial problems. Residents of some states may not be eligible for a short term cash loan based upon lender requirements.",
      },
      style: {
        logoParaTextColor: "#45454D",
        linkColor: "#6D7484",
        bottomParaTextColor: "#45454D",
        backgroundColor: "#26331f",
      },
    },
  },
};

export const HomeContext = createContext();

function App() {
  // Default fetcher

  const [homeData, setHomeData] = useState(defaultData);

  useEffect(() => {
    fetch("data/default_data.json")
      .then((res) => res.json())
      .then((data) => {
        setHomeData(data);
        console.log("JSONDATAAddff", data);
      });
  }, []);
  // console.log("HomeData",homeData);
  // const [webname, setWebname] = React.useState([]);

  React.useEffect(() => {
    fetch("data/website_config.json")
      .then((res) => res.json())
      .then((data) => {
        // setWebname(data);
        const myData = {
          websiteName: data.WEBSITE_NAME,
          webSiteId: data.WEBSITE_ID,
        };

        dataFetchHandler(myData);
      });
  }, []);

  // Data Fetch Hendler

  const dataFetchHandler = async (myData) => {
    // console.log("121212121212121212121212121", myData);
    // const res = await API.post("API/getLandingPageContent", myData);
    // if (res.status === 201 && res.data.status === "success") {
    //   setHomeData(res.data.data);
    //   console.log("Resp888888********************", res.data.data);
    // } else {
    // }
    // setLoading(false);
  };

  return (
    <HomeContext.Provider value={homeData}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Formsection />} />
      </Routes>
    </HomeContext.Provider>
  );
}

export default App;
