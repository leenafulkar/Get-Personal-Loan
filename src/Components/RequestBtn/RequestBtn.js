import React, { useContext, useState } from "react";
import { HomeContext } from "../../App";

const RequestBtn = ({ handleClick, index }) => {
  const [isHover, setIsHover] = useState(false);
  const data = useContext(HomeContext);

  const reqbtnSty = data.customization.reqbtnSection.style;

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const ctaStyle = {
    backgroundColor: isHover ? reqbtnSty.ctaHoverBg : reqbtnSty.ctaBg,
    color: isHover ? reqbtnSty.ctaHoverTextColor : reqbtnSty.ctaTextColor,
    border: "1px solid",
    borderTopColor: isHover ? reqbtnSty.ctaHoverBg : reqbtnSty.ctaBg,
    borderLeftColor: isHover ? reqbtnSty.ctaHoverBg : reqbtnSty.ctaBg,
    borderRightColor: isHover ? reqbtnSty.ctaHoverBg : reqbtnSty.ctaBg,
    borderBottomColor: isHover ? reqbtnSty.ctaHoverBg : reqbtnSty.ctaBg,
  };

  return (
    <>
      <div className="req_main">
        <button
          style={ctaStyle ? ctaStyle : ""}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="req_btn"
          onClick={handleClick}
        >
          {index}
        </button>
      </div>
    </>
  );
};

export default RequestBtn;
