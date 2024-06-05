import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import API from '../../service/Api';
import SuccesModal from '../modal/Success_Modal/SuccesModal';
import "../modal/modal.css"

function UnsubscribeForm(props) {
    
    const { register, handleSubmit, reset, formState: { errors }, } = useForm(); // initialize the hook
    const [showSuccess, setShowSuccess] = useState(false);
    const handleCloseSuccess = () => setShowSuccess(false);

    const [webname, setWebname] = React.useState([{}])

    React.useEffect(() => {
        fetch('data/website_config.json').then((res) => res.json()).then((data) => {
            setWebname(data)
        })

    }, [])

    const websitename = webname.WEBSITE_NAME;

    const onSubmit = async (data) => {
        try {
          let formData = {
            ...data, 
            websitename:websitename,
    
          };
          
          let res = await API.post("API/unsub", formData);
            if (res.data === 1) {
            setShowSuccess(!showSuccess)
            reset()
          }
          else{
            alert("Something went wrong...Please try again later")
          }
    
        }
        catch (error) {
          console.error("unsub_error", error.message);
        }
      };
    

    return (
        <>
            <form className="addFormMargin AddPaddingContactForm" onSubmit={handleSubmit(onSubmit)}>

                <input className="form-control contact_modal_input"
                    placeholder="Enter Email Address"
                    type="email"
                    id="unsubmail"
                    {...register("unsubmail", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Email is invalid",
                        },
                    })}
                />
                {errors.unsubmail && <p className='error_color'>{errors.unsubmail.message}</p>}
                <div className='pt-3'>
                    <button className="w-100 btnSubmitSty" type="submit">Unsubscribe</button>
                </div>
            </form>
            <SuccesModal show={showSuccess} handleClose={handleCloseSuccess} />
        </>
    );
}

export default UnsubscribeForm
