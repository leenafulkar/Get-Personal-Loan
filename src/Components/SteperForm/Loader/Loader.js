import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  console.log("STEP_++++++++++++++++++++++++++++>>>>", currentStep);
  console.log("STEP1221211_++++++++++++++++++++++++++++>>>>", completedSteps);
  useEffect(() => {
    let timer;
    switch (currentStep) {
      case 1:
        timer = setInterval(() => {
          setCurrentStep(2);
        }, 4000);
        break;
      case 2:
        timer = setInterval(() => {
          setCurrentStep(3);
        }, 4000);
        break;
      // case 3:
      //   timer = setInterval(() => {
      //     setCurrentStep(1);
      //   }, 15000);
      //   break;
      default:
        break;
    }

    return () => {
      clearInterval(timer);
    };
  }, [currentStep]);

  useEffect(() => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prevCompletedSteps) => [
        ...prevCompletedSteps,
        currentStep,
      ]);
    }
  }, [currentStep]);

  const isUpcomingStep = (step) => {
    const lastCompletedStep = completedSteps[completedSteps.length - 1];
    return (
      step === lastCompletedStep + 1 ||
      (step === 1 && completedSteps.length === 0)
    );
  };

  const getTextForStep = (step) => {
    console.log("STEPS", step);
    if (isUpcomingStep(step)) {
      switch (step) {
        case 1:
          return "Submitting...";
        case 2:
          return "Verifying information...";
        case 3:
          return "Searching lender...";
        default:
          return "";
      }
    }

    switch (step) {
      case 1:
        return completedSteps.includes(1) ? "Submitted!" : "Submitting Info";
      case 2:
        return completedSteps.includes(2) ? "Verified!!" : "Verify Info";
      case 3:
        return completedSteps.includes(3) ? "Connecting...!" : "Checking";
      default:
        return "Done";
    }
  };

  return (
    <div className="submit_loader">
      <div className="loader_head">
        <p className="loader_heading">Thank you for your submission.</p>
        <p className="loader_text">
          Please wait while we process your request with our panel of authorized
          lenders. You are very close to getting a lender.
        </p>
      </div>
      <div
        className="loader_main"
        // style={{
        //   transform: "translateX(-50%) translateY(-50%) rotate(-90deg)",
        // }}
      >
        <div className="loader-container">
          <div className="step-container">
            <div
              className={`circle ${
                completedSteps.includes(1) ? "filled" : ""
              } ${isUpcomingStep(1) ? "active" : ""}`}
            >
              {completedSteps.includes(1) && (
                <span className="checkmark">&#10003;</span>
              )}
              {!completedSteps.includes(1) && (
                <span className="step-number">1</span>
              )}
            </div>

            <div className="text-main">
              <div className="step-text">{getTextForStep(1)}</div>
            </div>
          </div>

          <div
            className={`line ${completedSteps.includes(1) ? "filled" : ""}`}
          />

          <div className="step-container">
            <div
              className={`circle ${
                completedSteps.includes(2) ? "filled" : ""
              } ${isUpcomingStep(2) ? "active" : ""}`}
            >
              {completedSteps.includes(2) && (
                <span className="checkmark">&#10003;</span>
              )}
              {!completedSteps.includes(2) && (
                <span className="step-number">2</span>
              )}
            </div>
            <div className="text-main">
              <div className="step-text">{getTextForStep(2)}</div>
            </div>
          </div>

          <div
            className={`line ${completedSteps.includes(2) ? "filled" : ""}`}
          />

          <div className="step-container">
            <div
              className={`circle ${
                completedSteps.includes(3) ? "filled" : ""
              } ${isUpcomingStep(3) ? "active" : ""}`}
            >
              {completedSteps.includes(3) && (
                <span className="checkmark">&#10003;</span>
              )}
              {!completedSteps.includes(3) && (
                <span className="step-number">3</span>
              )}
            </div>
            <div className="text-main">
              <div className="step-text">{getTextForStep(3)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
