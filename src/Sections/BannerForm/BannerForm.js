import React, { useContext, useState } from "react";
import "./BannerForm.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { HomeContext } from "../../App";
import useQuery from "../../utils/useQuery";
import { createSearchParams, useNavigate } from "react-router-dom";

const BannerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("Search params", createSearchParams);

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const data = useContext(HomeContext);

  const headerSectionContent = data.customization.bannerSection.content;
  const headerSectionSty = data.customization.bannerSection.style;

  console.log("BannerForm Content", headerSectionContent);
  console.log("BannerForm Style", headerSectionSty);

  const ctaparaColor = {
    color: headerSectionSty.termsTextColor,
  };
  const ctalinkColor = {
    color: headerSectionSty.discLinkColor,
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

  // pass query params
  const [formData, setformData] = useState();
  const query = useQuery();
  const navigate = useNavigate();

  console.log("Banner Form Data", formData);

  const uid = query.get("utm_source") || "";
  const utm_campaign = query.get("utm_campaign") || "";
  const utm_medium = query.get("utm_medium") || "";
  const s2 = query.get("s2") || "";
  const s3 = query.get("s3") || "";

  const onSubmit = (data) => {
    const myData = {
      ...data,
      // uid,
      // utm_campaign,
      // utm_medium,
      // s2,
      // s3,
    };
    setformData(myData);
    console.log("Banner Form Data", myData);

    const params = {
      email: myData.email,
      firstName: myData.firstName,
      lastName: myData.lastName,
      s1: myData.utm_campaign,
      s2: myData.s2,
      s3: myData.s3,
      uid: myData.uid,
      utm_medium: myData.utm_medium,
      amount: myData.amount,
    };

    console.log("Banner Form Data", params);

    navigate({
      pathname: "/form",
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div className="innercontainer">
      <form onSubmit={handleSubmit(onSubmit)} className="bannerForm">
        <p className="from_headding">{headerSectionContent.formHedding}</p>
        <div>
          <div className="form_field">
            <label>{headerSectionContent.label1}</label>
            <input
              type="tel"
              className="amount_but inline-edit"
              placeholder="e.g. 800"
              name="amount"
              id="amount"
              {...register("amount", {
                required: "This input is required.",
                pattern: {
                  value: /^[1-9][0-9]*0$/,
                  message: "This value should be a multiple of 50.",
                },
                // min: {
                //   value: 100,
                //   message: `This value should be between 100 and 5000.`,
                // },
                // max: {
                //   value: 5000,
                //   message: `This value should be between 100 and 5000.`,
                // },
              })}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="amount"
            render={({ message }) => <p className="error_color">{message}</p>}
          />
        </div>

        <div>
          <div className="form_field">
            <label>{headerSectionContent.label2}</label>
            <input
              type="email"
              className="amount_but inline-edit"
              id="email"
              name="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email Address is required",

                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="error_color">{message}</p>}
          />
        </div>
        <p className="banner_para" style={ctaparaColor}>
          By clicking 'Find Lender' ,you agree to our{" "}
          <span style={ctalinkColor}>Privacy Policy</span>,{" "}
          <span style={ctalinkColor}>Terms</span>,{" "}
          <span style={ctalinkColor}>E-Consent</span>,{" "}
          <span style={ctalinkColor}>Rate & Fees</span> and receive special
          offers from us and our{" "}
          <span style={ctalinkColor}>marketing partners</span> via email
          communication.
        </p>
        <button
          type="submit"
          className="requst_btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={ctaStyle}
        >
          {headerSectionContent.ctaText}
        </button>
        <div className="bottm_par_main">
          <p className="span_dot"></p>
          <p className="banner_bottompara">
            {headerSectionContent.ctaBottomText1}
          </p>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;
