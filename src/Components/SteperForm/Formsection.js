import React, { useState } from "react";

import "./css/Formsection.css";
import Forminput from "./FullForm/Forminput";
import Header from "../../Sections/Header/Header";
import Footer from "../../Sections/Footer/Footer";

function Formsection(props) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const changeProgress = (e) => {
    setCurrentProgress(e);
  };
  return (
    <div className="form-sections">
      <Header />
      <div className="form-wraper">
        <div className="form_margins ">
          {/* <div className="formquestions"> */}
          {/* <Formquestion headtitle="What is the reason for loan?" subtitle="Select the loan reason from below." /> */}
          {/* <Formquestion headtitle="i'm heading question text" subtitle="i'm sub text" /> */}
          {/* <Formquestion headtitle="i'm heading second question text" subtitle="i'm second sub text" /> */}
          {/* </div> */}
          <div className="forminput">
            <Forminput
              changeProgress={props.changeProgress}
              progress={props.progress}
              // IP={props.IP}
            />
          </div>
          {/* <div className="formbutton">
                        Formbutton
                    </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Formsection;
