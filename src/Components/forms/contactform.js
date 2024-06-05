import { useForm } from "react-hook-form";

import React, { useState } from "react";
// import Api from "../../service/Api";

import SuccesModal from "../modal/Success_Modal/SuccesModal";
import API from "../../service/Api";

function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); // initialize the hook

  const [webname, setWebname] = React.useState([{}]);
  React.useEffect(() => {
    fetch("data/website_config.json")
      .then((res) => res.json())
      .then((data) => {
        setWebname(data);
      });
  }, []);

  const websitename = webname.WEBSITE_NAME;

  const onSubmit = async (data) => {
    try {
      let formData = {
        ...data,
        websitename: websitename,
      };
      console.log(formData);

      let res = await API.post("API/contactDataSubmit", formData);
      if (res.data === true) {
        setShowSuccess(!showSuccess);
        reset();
      } else {
        alert("Respons Error");
      }
    } catch (error) {
      console.error("contact_error", error.message);
    }
  };

  return (
    <>
      <form
        className="addFormMargin AddPaddingContactForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col first_namecol">
                <label className="inputLableSty" htmlFor="firstname">
                  First Name
                </label>

                <input
                  className="form-control contact_modal_input"
                  placeholder="First Name"
                  type="text"
                  id="firstname"
                  {...register("firstname", {
                    required: "First Name is required",
                    minLength: {
                      value: 1,
                      message:
                        "First Name should be at least 1 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "First Name should not exceed 20 characters",
                    },
                  })}
                />
                {errors.firstname && (
                  <p className="error_color">{errors.firstname.message}</p>
                )}
              </div>
              <div className="col last_namecol">
                <label className="inputLableSty" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  className="form-control contact_modal_input"
                  placeholder="Last Name"
                  type="text"
                  id="lastname"
                  {...register("lastname", {
                    required: "Last Name is required",
                    minLength: {
                      value: 1,
                      message: "Last Name should be at least 1 characters long",
                    },
                    maxLength: {
                      value: 20,
                      message: "Last Name should not exceed 20 characters",
                    },
                  })}
                />
                {errors.lastname && (
                  <p className="error_color">{errors.lastname.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-sm-12">
          <label className="inputLableSty" htmlFor="email">
            Email
          </label>
          <input
            className="form-control contact_modal_input"
            placeholder="Email Address"
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is invalid",
              },
            })}
          />
          {errors.email && (
            <p className="error_color">{errors.email.message}</p>
          )}
        </div>
        <div className="col-md-12 col-sm-12">
          <label className="inputLableSty" htmlFor="message">
            Message
          </label>
          <textarea
            className="form-control contact_modal_input"
            placeholder="Message"
            id="message"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message should be at least 10 characters long",
              },
              maxLength: {
                value: 200,
                message: "Message should not exceed 200 characters",
              },
            })}
          ></textarea>
          {errors.message && (
            <p className="error_color">{errors.message.message}</p>
          )}
        </div>
        <div className="py-4 AddResponsiveStyInput">
          <input className="w-100 btnSubmitSty" type="submit" />
        </div>
      </form>
      <SuccesModal show={showSuccess} handleClose={handleCloseSuccess} />
    </>
  );
}

export default ContactForm;
