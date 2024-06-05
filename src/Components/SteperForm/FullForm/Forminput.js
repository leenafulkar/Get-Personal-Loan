import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Accordion from "react-bootstrap/Accordion";

import "../css/SidesectionAccordian.css";
import "../css/Forminput.css";
import "../css/InputFloat.css";
import "../css/Formquestion.css";
import "../../../App.css";
import back from "../../SteperForm/assets/back.svg";
import next from "../../SteperForm/assets/next.svg";
import useQuery from "../../../utils/useQuery";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const Forminput = (props) => {
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setIsOpen(false);
  // };

  // const toggleCalendar = () => {
  //   setIsOpen(!isOpen);
  // };
  const query = useQuery();
  const navigate = useNavigate();
  const email = query.get("email");
  const amount = query.get("amount");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formBtnSty = {
    backgroundCOlor: "red !important",
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [formData, setFormData] = useState(setCurrentStep + 1);
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  // let abaval = formData.aba || "";

  const ip = props.IP;

  const NEXTPAYCHECK = formData.nextPaycheck;
  const nextDataValue = new Date(NEXTPAYCHECK);
  const nextPayYear = nextDataValue.getFullYear();
  const nextPayMonth = nextDataValue.getMonth() + 1;
  const nextPayDate = nextDataValue.getDate();

  const DOB = formData.dob;
  const dateValue = new Date(DOB);
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth() + 1;
  const date = dateValue.getDate();

  const SSN = formData.ssn;
  const ssn1 = SSN && SSN.substring(0, 3);
  const ssn2 = SSN && SSN.substring(3, 5);
  const ssn3 = SSN && SSN.substring(5, 9);

  // Date Logic
  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (selectedDate > minAgeDate) {
      return "You must be at least 18 years old.";
    }

    return true;
  };

  const steps = [
    {
      // 1
      question: "How much would you like to borrow?",
      name: "borrowAmount",
      label: "Enter amount",
      type: "text",
      id: "amount",

      defaultValue: `${amount || ""}`,
      placeholder: "e.g. $1,250",
      validation: {
        required: "Amount is required",
        pattern: {
          // value: /\b(0|[1-9]\d*)?([05]0)\b/,
          // message: "This value should be a multiple of 50.",
          value: /^\d+$/,
          message: "Please enter a valid amount with digits only.",
        },
        // min: {
        //   value: 100,
        //   message: "This value should be between 100 and 10000.",
        // },
        // max: {
        //   value: 10000000,
        //   message: "This value should be between 100 and 10000.",
        // },
      },
      faq: {
        question: "My loan reason is not in the list.",
        answer: "If your loan reason is not in the list then select “Other”.",
      },
      note: {
        notename: "Note :",
        note: "All the details we'll ask you across the form is actually a demand of lenders. If you fill all the details genuine, chances of your loan approval may increase.",
      },
    },

    {
      // 2
      question: "For what purpose do you need the loan?",
      subtitle: "Select the loan reason from below.",
      name: "loan_purpose",
      id: "myselect",
      type: "select",
      skip: true,
      placeholder: "I Need loan for...",
      options: [
        "Auto Purchase",
        "Auto Repair",
        "Credit Card Consolidation",
        "Debt Consolidation",
        "Debt Settlement",
        "Home Improvement",
        "Small Business",
        "Emergency Situation",
        "Major Purchase",
        "Medical",
        "Moving",
        "Rent Or Mortgage",
        "Renewable Energy",
        "Student Loan Refinance",
        "Vacation",
        "Wedding",
        "Education",
        "Taxes",
        "Other",
      ],

      validation: {
        required: "Loan reason is required",
      },
      faq: {
        question: "My loan reason loan reason is not in the list?",
        answer:
          "If your loan reason is not in the list then select other.then select other.",
      },

      note: {
        notename: "Note :",
        note: "All the details we'll ask you across the form is actually a demand of lenders. If you fill all the details genuine, chances of your loan approval may increase.",
      },
    },

    {
      // 3
      question: "How much outstanding debt do you have?",
      id: "max_debt_amount",
      name: "max_debt_amount",
      type: "radio",

      options: [
        { name: "Zero", value: 0 },
        { name: "$1,000 - $9,999", value: 1000 },
        { name: "$10,000 - $14,999", value: 10000 },
        { name: "$15,000 - $19,999", value: 15000 },
        { name: "More than $20,000", value: 20000 },
      ],

      validation: {
        required: "outstandingDebt is required",
      },
      faq: {
        question: "What kind of debt you are asking for?",
        answer:
          "Debt can be of any kind like credit card debt, home debt, car debt, last payday debt. We are asking combined debt here.",
      },
      note: {
        notename: "Note :",
        note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
      },
    },

    {
      // 4
      question: "What is your employment status?",
      id: "income_type",
      name: "income_type",
      type: "radio",
      skip: true,
      options: [
        { name: "Job Employed", value: "EMPLOYMENT" },
        { name: "Self Employed", value: "SELF_EMPLOYMENT" },
        { name: "Benefits", value: "BENEFITS" },
      ],
      validation: {
        required: "employment status is required",
      },
      faq: {
        question: "I’m Employed and on Benefits, what should I select?",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
      },
    },

    {
      // 5
      question: "What is the name of your company/employer?",

      name: "company_name",
      id: "company_name",
      label: "Company Name",
      type: "text",
      minLength: 2,
      maxLength: 10,
      placeholder: "Enter company name",
      skip: true,
      validation: {
        required: "Company name is required",
      },
      faq: {
        question: "I’m Employed and on Benefits, what should I select?",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
      },
    },

    {
      // 6
      question: "how long have you been working at employer name?",
      name: "months_employed",
      id: "months_employed",
      type: "radio",

      options: [
        { name: "Less than $1,000", value: 1 },
        { name: "3 - 5 years", value: 3 },
        { name: "5+ years", value: 5 },
      ],
      validation: {
        required: "workingAtCompany status is required",
      },
      faq: {
        question: "NA",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "NA",
      },
    },

    {
      // 7
      question: "What is your current job role?",
      name: "job_title",
      id: "job_title",
      label: "Job Role",
      type: "text",
      minLength: 2,
      maxLength: 10,
      placeholder: "Enter Job Role",
      validation: {
        required: "Job Role is required",
      },
      faq: {
        question: "I’m Employed and on Benefits, what should I select?",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
      },
    },

    {
      // 8
      question: "What is your work phone number?",
      label: "Phone Number",
      subtitle:
        "We need your work phone number to verify your employment for the loan application.",
      name: "phone_work",
      type: "text",
      placeholder: "e.g. 9164083151",
      id: "phone_work",
      validation: {
        required: "Phone Number is required",
        pattern: {
          value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          message: "Invalid phone number format",
        },
      },
      faq: {
        question: "What does work phone means?",
        answer: "Work phone is a contact number of where you work.",
      },
      note: {
        notename: "Note :",
        note: "Your work phone should be different from personal phone.",
      },
    },

    {
      // 9
      question: "What is your total monthly income from all sources?",
      subtitle: "Select a range you earn in a month",
      id: "monthly_income",
      name: "monthly_income",
      type: "radio",

      options: [
        { name: "Less than $1,000", value: 1000 },
        { name: "$1,000 - $2,000", value: 1500 },
        { name: "$2,000 - $3,000", value: 2500 },
        { name: "$3,000 - $4,000", value: 3500 },
        { name: "$4,000 - $5,000", value: 4500 },
        { name: "More than $5,000", value: 5000 },
      ],

      validation: {
        required: "Income is required",
      },
      faq: {
        question: "NA",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "If your monthly income is more than your loan amount then chances of getting loan will increase.",
      },
    },

    {
      // 10
      question: "What is the frequency of your paychecks?",
      // subtitle: "Select a range you earn in a month",
      id: "payment_frequency",
      name: "payment_frequency",
      type: "radio",
      options: [
        { name: "Weekly", value: "WEEKLY" },
        { name: "Bi-weekly", vlaue: "BIWEEKLY" },
        { name: "Monthly", value: "MONTHLY" },
        { name: "Twice a month", value: "TWICEMONTHLY" },
      ],
      validation: {
        required: "paychecks is required",
      },
      faq: {
        question: "What does pay frequency means?",
        answer:
          "Pay frequency means how oftenly you get paid by your employer.",
      },
      note: {
        notename: "Note :",
        note: "NA",
      },
    },

    {
      // 11
      question: "What is your next paycheck?",

      name: "nextPaycheck",
      id: "nextPaycheck",
      label: "Next paycheck",
      type: "date",
      placeholder: "DD/MM/YY",
      validation: {
        required: "Next paycheck is required",
      },
      faq: {
        question: "I’m Employed and on Benefits, what should I select?",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
      },
    },

    {
      // 12
      question: "About your self?",
      element: [
        {
          name: "first_name",
          id: "first_name",
          label: "First name",
          type: "text",
          minLength: 2,
          maxLength: 15,
          placeholder: "Enter First name",

          validation: {
            required: "First name is required",
          },
        },
        {
          name: "last_name",
          id: "last_name",
          label: "Last name",
          type: "text",
          minLength: 2,
          maxLength: 15,
          placeholder: "Enter Last name",
          validation: {
            required: "Last name is required",
          },
        },
      ],
      faq: {
        question: "Why you are asking for state?",
        answer: "NA",
      },

      note: {
        notename: "Note :",
        note: "NA",
      },
    },

    {
      // 13
      question: "What is your email address",
      name: "email_address",
      label: "Email address",
      type: "text",
      placeholder: "Joycane@gmail.com",
      id: "email_address",
      defaultValue: `${email || ""}`,
      validation: {
        required: "Email address is required",
        pattern: {
          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
          message: "Enter valid Email address",
        },
      },
    },

    {
      // 12
      question: "How old are you?",
      subtitle: "To qualified for loan your age must be more than 18 years",

      name: "dob",
      id: "dob",
      // label: "Date of birth(MM/DD/YYYY)",
      type: "date",
      // placeholder: "Date of birth(MM/DD/YYYY)",
      // MinDate: getMinDate(),
      validation: {
        required: "Date of birth is required",

        validate: (value) => validateDate(value) || "Select 18 Year old value",
      },
      faq: {
        question: "I’m Employed and on Benefits, what should I select?",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
      },
    },

    {
      // 13
      question: "How we can contact you?",
      label: "Phone Number",
      subtitle:
        "Enter a phone number where your lender can contact you to discuss your loan agreement.",
      name: "phone_home",
      type: "text",
      placeholder: "e.g. 9164083151",
      id: "phone_home",
      skip: true,
      validation: {
        required: "Phone Number is required",
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Invalid phone number format",
        },
      },
      faq: {
        question: "NA",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "NA",
      },
    },

    {
      // 14
      question: "What is your current home address?",
      element: [
        {
          name: "address",
          label: "Full address",
          type: "text",
          placeholder: "e.g. 100 Lemon ave",
          id: "address",

          validation: {
            required: "address is required",
            // pattern: {
            //   value: /^(?=.{4,40}$).+$/,
            //   message: "Enter valid address",
            // },
          },
          note: {
            notename: "Note :",
            note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
          },
        },
        {
          label: "Zip code",
          placeholder: "Zip Code",
          name: "zip_code",
          id: "zip_code",
          type: "text",
          validation: {
            required: "zip code is required",
            pattern: {
              value: /^[0-9]{5}$/,
              message: "Enter valid zipcode",
            },
          },
          note: {
            notename: "Note :",
            note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
          },
        },
      ],
      faq: {
        question: "Why you are asking for state?",
        answer: "NA",
      },

      note: {
        notename: "Note :",
        note: "NA",
      },
    },

    {
      // 18
      question: "Driver’s License",
      subtitle:
        "Your driving license number is used to verify your identity to prevent frauds.",
      element: [
        {
          name: "driving_license",
          label: "Driving license number",
          type: "text",
          placeholder: "e.g. 12345678",
          id: "driving_license",
          skip: true,

          validation: {
            required: "Driving license number is required",
            pattern: {
              value: /^(?=.*[a-zA-Z0-9]).{7,19}$/,
              message: "Enter valid Driving license number",
            },
          },
          note: {
            notename: "Note :",
            note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
          },
        },

        {
          question: "Issuing state",
          name: "driving_license_state",
          type: "select",
          placeholder: "Select state",
          options: [
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming",
          ],
          validation: {
            required: "Issuing state is required",
          },
        },
      ],
      faq: {
        question: "From where I get driving license number?",
        answer: "NA",
      },

      note: {
        notename: "Note :",
        note: "First name and last name should not be same. If so your form might be rejected by lender. All the details we’ll ask you across the form is actually a demand of lenders. So chances of your form may increase if you fill all the details genuine.",
      },
    },

    {
      // 19
      question: "Do you have a vehicle registered at your name?",
      // subtitle: "Select a range you earn in a month",
      name: "autoStatus",
      type: "radio",
      options: [
        { name: "Yes - It’s paid off", value: "Full Title" },
        { name: "Yes - Making payments", value: "Payments" },
        { name: "No - I don’t have vehicle", value: "No" },
      ],
      validation: {
        required: "vehicle Status required",
      },
      faq: {
        question: "What If the vehicle is not registered at my name?",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "NA",
      },
    },

    {
      // 20
      question: "What is your credit score?",
      subtitle: "Your credit score won’t impact your loan request.",
      name: "credit_score",
      type: "radio",
      options: [
        { name: "Excellent (720+)", value: "EXCELLENT" },
        { name: "Good (660-719)", value: "GOOD" },
        { name: "Fair (600-659)", value: "FAIR" },
        { name: "Poor (less than 600)", value: "POOR" },
        { name: "Not Sure", value: "NOT_SURE" },
      ],
      validation: {
        required: "credit Score required",
      },
      faq: {
        question: "Does credit score impact my loan request?",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "NA",
      },
    },

    {
      // 21
      question: "Deposit information",
      subtitle:
        "Fund will be deposited in this bank account, so fill all the details precisely.",
      // successName: "Congratulations Chetan!  ",
      // successMasage:
      //   "Some lenders are interested in your profile. Please fill further details.",
      element: [
        {
          name: "bank_aba",
          label: "ABA/Routing number",
          type: "text",
          placeholder: "e.g. 121212121",
          id: "bank_aba",
          skip: true,

          validation: {
            required: "ABA is required",
            // validate: (value) =>
            //   validateABARoutingNumber(value) || "Invalid Routing Number",
          },

          note: {
            notename: "Note :",
            note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
          },
        },
        {
          label: "Account number",
          placeholder: "e.g. 9132334444",
          name: "bank_account_number",
          id: "bank_account_number",
          type: "text",
          skip: true,

          validation: {
            required: "Account Number is required",
            pattern: {
              value: /^\d{5,17}$/,
              message: "Enter valid Account Number",
            },
          },
        },
        {
          label: "Bank name",
          placeholder: "e.g. Bank Of America",
          name: "bank_name",
          id: "bank_name",
          type: "text",
          skip: true,

          validation: {
            required: "Bank name is required",
            pattern: {
              // value: /^[0-9]{5}$/,
              message: "Enter valid Bank name",
            },
          },
          note: {
            notename: "Note :",
            note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
          },
        },
      ],
      faq: {
        question: "Why you are asking bank details?",
        answer: "NA",
      },

      note: {
        notename: "Note :",
        note: "All your data are highly secured by SSL256 bit encryption. Not even we as a company can see your data.",
      },
    },

    {
      // 22
      question: "Do you get direct deposit into your bank account?",
      // subtitle: "Are you currently in the military or you are the spouse, child or dependent of someone in the military?",
      name: "direct_deposit",
      type: "radio",
      options: [
        { name: "No", value: 0 },
        { name: "Yes", value: 1 },
      ],
      validation: {
        required: "This field is required",
      },
      faq: {
        question: "NA",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "NA",
      },
    },

    {
      // 23
      question: "What type of bank account do you have?",
      // subtitle: "Are you currently in the military or you are the spouse, child or dependent of someone in the military?",
      name: "account_type",
      type: "radio",
      options: [
        { name: "Checking", value: "CHECKING" },
        { name: "Saving", value: "SAVING" },
        { name: "I don’t have bank account", value: "NO" },
      ],
      validation: {
        required: "This field is required",
      },
      faq: {
        question: "NA",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "To access all the lenders, you must have “Checking Account”.",
      },
    },

    {
      // 24
      question: "Time at Bank",
      subtitle: "How long have you had your bank account?",
      name: "bank_account_length",
      type: "radio",
      options: [
        { name: "1-3 months", value: 3 },
        { name: "3-6 months", value: 6 },
        { name: "6-12 months", value: 12 },
        { name: "1-2 years", value: 24 },
        { name: "2+ years", value: 30 },
      ],
      validation: {
        required: "This field is required",
      },
      faq: {
        question: "Will my loan request approv if I don’t have bank account?",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "NA",
      },
    },

    {
      // 25
      question: "Social Security Number",
      subtitle:
        "Many lenders need your Social Security Number to consider you for a loan. This site is secured by SSL256 bit encryption.",
      name: "ssn",
      id: "ssn",
      label: "SSN",
      type: "text",

      placeholder: "Enter SSN",
      validation: {
        required: "SSN is required",
        minLength: {
          value: 9,
          message: "SSN must have a minimum of 9 digits.",
        },
        maxLength: {
          value: 9,
          message: "SSN must have a maximum of 9 digits.",
        },
      },
      faq: {
        question: "I’m Employed and on Benefits, what should I select?",
        answer: "NA",
      },
      note: {
        notename: "Note :",
        note: "Your credit card debt will not affect your loan request. We are asking this question because lenders wants to know your Debt status.",
      },
    },
  ];

  const totalSteps = steps.length;

  console.log("Total Steps", totalSteps);
  const isLastStep = currentStep === totalSteps - 1;

  console.log(maxProgress, "1");

  const handleProgress = () => {
    const progress = isLastStep
      ? maxProgress
      : Math.round((currentStep / totalSteps) * 100);

    if (progress > maxProgress) {
      setMaxProgress(progress);
    }
  };

  const onSubmit = async (data) => {
    setFormData(data);

    let sortFormData = {
      ...data,
      ssn_1: ssn1,
      ssn_2: ssn2,
      ssn_3: ssn3,
      ip_address: ip,
      dob_year: year,
      dob_month: month,
      dob_date: date,
      payday1_year: nextPayYear,
      payday1_month: nextPayMonth,
      payday1_date: nextPayDate,
    };

    if (isLastStep) {
      setIsLoadingSub(true);
      // debugger;
      // setIsLoadingSub(true);
      // const res1 = await Api.post(
      //   "?c=TreeDataPosting&m=phonexa_insert",
      //   sortFormData
      // );
      // setFormData(res1);
      // console.log("FULL FORM SUBMIT RESP DATA2222 ++++++++++>>>>", res1);
      // const url = res1.data.redirect_url;
      // console.log("URL", url);
      // if (res1.data.status === 1) {
      //   setTimeout(() => {
      //     setIsLoadingSub(false);
      //     window.location.hrf = url;
      //   }, 3000000);
      // } else {
      // setTimeout(() => {
      //   setIsLoadingSub(false);
      //   window.location.href =
      //     "https://us.everybuckcounts.com/loan-for-bad-credit/?camp=Reject";
      // }, 300000);
      //   alert("Submited");
      // }

      setTimeout(() => {
        // setIsLoadingSub(false);

        // window.location.href = "submited";

        alert(JSON.stringify(data));
        navigate("/");
      }, 9000);
    }

    // else if()

    // setTimeout(() => {
    //   setIsLoadingSub(false);
    //   window.location.href =
    //     "https://us.everybuckcounts.com/loan-for-bad-credit/?camp=Reject";
    // }, 300000);
    else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleNext = (optionValue) => {
    console.log("NEXT", steps);

    if (currentStep < totalSteps) {
      // Call handleProgress function passing the selected option value
      handleProgress(optionValue);
    }
  };
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const TextHandler = ({ steps }) => {
    return (
      <>
        <div className="inputMain">
          <div className="field">
            {/* <input
              className={`custom-input answer_selection input_sty ${
                errors[steps[currentStep].name] ? "invalid" : ""
              }form_options`}
              type="text"
             
              defaultValue={steps[currentStep].defaultValue || ""}
              {...register(steps[currentStep].name, {
                required: steps[currentStep].validation.required,
                pattern: steps[currentStep].validation.pattern,
                min: steps[currentStep].validation.min,
                max: steps[currentStep].validation.max,
                minLength: steps[currentStep].validation.minLength,
                maxLength: steps[currentStep].validation.maxLength,
                validation: steps[currentStep].validation.minLength,
              })}
              placeholder={steps[currentStep].placeholder}
              id={steps[currentStep].id}
              onChange={handleChange}
            /> */}
            <input
              className={`custom-input answer_selection input_sty ${
                errors[steps[currentStep].name] ? "invalid" : ""
              } form_options`}
              type="text"
              defaultValue={steps[currentStep].defaultValue || ""}
              {...register(steps[currentStep].name, {
                ...(!steps[currentStep].skip && {
                  required: steps[currentStep].validation.required,
                  pattern: steps[currentStep].validation.pattern,
                  min: steps[currentStep].validation.min,
                  max: steps[currentStep].validation.max,
                  minLength: steps[currentStep].validation.minLength,
                  maxLength: steps[currentStep].validation.maxLength,
                  // validation: steps[currentStep].validation.minLength, // Remove this line, it's not necessary
                }),
              })}
              placeholder={steps[currentStep].placeholder}
              id={steps[currentStep].id}
              onChange={handleChange}
            />

            <label htmlFor={steps[currentStep].id} className="lable_sty">
              {steps[currentStep].label}
            </label>
          </div>
        </div>

        {errors[steps[currentStep].name] && (
          <p className="error-message">
            {errors[steps[currentStep].name].message}
          </p>
        )}
      </>
    );
  };

  const SelectHandler = ({ steps }) => {
    return (
      <>
        <select
          className={`custom-select-trigger classic answer_selection ${
            errors[steps[currentStep].name] ? "invalid" : ""
          }form_options`}
          {...register(steps[currentStep].name, {
            ...(!steps[currentStep].skip && {
              required: steps[currentStep].validation.required,
            }),
          })}
          id={steps[currentStep].id}
        >
          <span class="custom-select-trigger">Select Loan Purpose</span>
          <option class="optionDef" value="">
            {steps[currentStep].placeholder}
          </option>
          {steps[currentStep].options.map((option, optionIndex) => (
            <option
              className="optiondropdownOpen"
              key={optionIndex}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
        {errors[steps[currentStep].name] && (
          <p className="error-message">
            {errors[steps[currentStep].name].message}
          </p>
        )}
      </>
    );
  };

  const RadioHandler = ({ steps }) => {
    return (
      <>
        <div className="radio-main">
          <div className="radio-options radioBtn_design form_options ">
            {steps[currentStep].options.map((option, optionIndex) => (
              <div key={optionIndex} className="radio-option ">
                <input
                  type="radio"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  id={`${steps[currentStep].name}-${optionIndex}`}
                  value={option.value}
                  {...register(steps[currentStep].name, {
                    ...(!steps[currentStep].skip && {
                      required: steps[currentStep].validation.required,
                    }),
                  })}
                />
                <label
                  htmlFor={`${steps[currentStep].name}-${optionIndex}`}
                  className="radio-label"
                >
                  {option.name}
                </label>
              </div>
            ))}
          </div>
          {errors[steps[currentStep].name] && (
            <p className="error-message">
              {errors[steps[currentStep].name].message}
            </p>
          )}
        </div>
      </>
    );
  };

  const CheckboxHandler = ({ steps }) => {
    return (
      <>
        <div className="checkbox-options checkBtn_design form_options">
          {steps[currentStep].options.map((option, optionIndex) => (
            <div key={optionIndex} className="checkbox-option">
              <input
                type="checkbox"
                id={`${steps[currentStep].name}-${optionIndex}`}
                value={option}
                {...register(steps[currentStep].name, {
                  ...(!steps[currentStep].skip && {
                    required: steps[currentStep].validation.required,
                  }),
                })}
              />
              <label
                htmlFor={`${steps[currentStep].name}-${optionIndex}`}
                className="checkbox-label"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        {errors[steps[currentStep].name] && (
          <p className="error-message">
            {errors[steps[currentStep].name].message}
          </p>
        )}
      </>
    );
  };

  const DateHandler = ({ steps }) => {
    return (
      <>
        <div className="field">
          <input
            placeholder="dd/MM/yyyy"
            className={`custom-input answer_selection ${
              errors[steps[currentStep].name] ? "invalid" : ""
            }form_options`}
            type="date"
            id={steps[currentStep].id}
            {...register(steps[currentStep].name, {
              ...(!steps[currentStep].skip && {
                required: steps[currentStep].validation.required,
                validate: steps[currentStep].validation.validate,
              }),
            })}
            // min={steps[currentStep].MinDate.getMinDate}
          />
          {/* <div className="field">
            <div className={`date-picker ${isOpen ? "open" : ""}`}>
              <div className="input" onClick={toggleCalendar}>
                <div
                  className={`custom-input answer_selection ${
                    errors[steps[currentStep].name] ? "invalid" : ""
                  }form_options`}
                >
                  Select Date:{" "}
                  <span>
                    {selectedDate ? selectedDate.toLocaleDateString() : ""}
                  </span>
                </div>
                <div className="clenderSvg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z"
                      fill="#171A16"
                      fill-opacity="0.38"
                    />
                  </svg>
                </div>
              </div>
              {isOpen && (
                <div className="calendar">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    inline
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    firstDayOfWeek={1}
                  />
                </div>
              )}
            </div>
          </div> */}

          <label htmlFor={steps[currentStep].id} className="lable_sty">
            {steps[currentStep].label}
          </label>
        </div>
        {errors[steps[currentStep].name] && (
          <p className="error-message">
            {errors[steps[currentStep].name].message}
          </p>
        )}
      </>
    );
  };

  const TextHandlerElement = ({ steps }) => {
    return (
      <>
        <div className="inputMain">
          <div className="field">
            <input
              className={`custom-input answer_selection input_sty  ${
                errors[steps.name] ? "invalid" : ""
              }form_options`}
              type="text"
              {...register(steps.name, {
                // ...(!steps[currentStep].skip && {
                required: steps.validation.required,
                pattern: steps.validation.pattern,
                validate: steps.validation.validate,
                // }),
              })}
              placeholder={steps.placeholder}
              id={steps.id}
              onChange={handleChange}
              // autoFocus
            />

            <label htmlFor={steps.id} className="lable_sty">
              {steps.label}
            </label>
          </div>
        </div>
        {errors[steps.name] && (
          <p className="error-message">{errors[steps.name].message}</p>
        )}
      </>
    );
  };

  const SelectHandlerElement = ({ steps }) => {
    return (
      <>
        <div className="wrapper">
          <select
            className={`custom-select-trigger classic answer_selection ${
              errors[steps.name] ? "invalid" : ""
            }form_options`}
            {...register(steps.name, {
              ...(!steps[currentStep].skip && {
                required: steps.validation.required,
              }),
            })}
          >
            <option value="">{steps.placeholder}</option>
            {steps.options.map((option, optionIndex) => (
              <option
                className="optiondropdownOpen"
                key={optionIndex}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
        {errors[steps.name] && (
          <p className="error-message">{errors[steps.name].message}</p>
        )}
      </>
    );
  };

  const RadioHandlerElement = ({ steps }) => {
    return (
      <div className="radio-main">
        <div className="radio-options radioBtn_design form_options">
          {steps.options.map((option, optionIndex) => (
            <div key={optionIndex} className="radio-option">
              <input
                type="radio"
                id={`${steps.name}-${optionIndex}`}
                value={option}
                {...register(steps.name, {
                  ...(!steps[currentStep].skip && {
                    required: steps.validation.required,
                  }),
                })}
              />
              <label
                htmlFor={`${steps.name}-${optionIndex}`}
                className="radio-label"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CheckboxHandlerElement = ({ steps }) => {
    return (
      <>
        <div className="checkbox-options checkBtn_design form_options">
          {steps.subtitle && (
            <p className="checkbox-subtitle">{steps.subtitle}</p>
          )}
          {steps.options.map((option, optionIndex) => (
            <div key={optionIndex} className="checkbox-option">
              <input
                type="checkbox"
                id={`${steps.name}-${optionIndex}`}
                value={option}
                {...register(steps.name, {
                  ...(!steps[currentStep].skip && {
                    required: steps.validation.required,
                  }),
                })}
              />
              <label
                htmlFor={`${steps.name}-${optionIndex}`}
                className="checkbox-label"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        {errors[steps.name] && (
          <p className="error-message">{errors[steps.name].message}</p>
        )}
      </>
    );
  };

  const DateHandlerElement = ({ steps }) => {
    return (
      <>
        <input
          className={`custom-input answer_selection ${
            errors[steps.name] ? "invalid" : ""
          }form_options`}
          type="date"
          placeholder="fdf"
          {...register(steps.name, {
            ...(!steps[currentStep].skip && {
              required: steps.validation.required,
            }),
          })}
        />
        {errors[steps.name] && (
          <p className="error-message">{errors[steps.name].message}</p>
        )}
      </>
    );
  };

  return (
    <div className="container">
      {isLoadingSub ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* <div className="col-lg-4 col-md-4 col-sm-12 xs-12 paddingmob"> */}
            {/* {currentStep !== 0 && currentStep !== 1 && ( */}
            <>
              {/* <div className="progress_bar_section">
               
                  <Progressbar
                    bgcolor="#85BB65"
                    progress={props.progress}
                    height={10}
                  />
                </div>
                <div className="separator"></div> */}
            </>
            {/* ) } */}

            {/* <div className="sideFaq_mobilescreen desktop-faq">
                {steps[currentStep].faq && (
                  <Accordion className="faq-accordion">
                    <Accordion.Item eventKey={currentStep}>
                      <p className="head-txt-faq">People asked : </p>
                      <Accordion.Header>
                        {" "}
                        {steps[currentStep].faq.question && (
                          <p className="faq-que">
                            {steps[currentStep].faq.question}
                          </p>
                        )}
                      </Accordion.Header>
                      <Accordion.Body>
                        {steps[currentStep].faq.answer && (
                          <p className="faq-answer">
                            {steps[currentStep].faq.answer}
                          </p>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                )}

                {steps[currentStep].note && (
                  <>
                    <p className="notename">
                      {steps[currentStep].note.notename}
                    </p>
                    <p className="note">{steps[currentStep].note.note}</p>
                  </>
                )}
              </div> */}
            {/* </div> */}
            <div className="col-lg-12 col-md-12 col-sm-12 xs-12 paddingmob">
              <div key={currentStep} className="form-group form-block-width">
                <div className="form-ques-padding">
                  {steps[currentStep].successName && (
                    <div className="ques_success_massage">
                      <h1>{steps[currentStep].successName}</h1>
                      <p>{steps[currentStep].successMasage}</p>
                    </div>
                  )}
                  <label className="ques_head_title">
                    {steps[currentStep].question}
                  </label>

                  {steps[currentStep].subtitle && (
                    <p className="select-subtitle ques_sub_title">
                      {steps[currentStep].subtitle}{" "}
                    </p>
                  )}
                </div>

                {steps[currentStep].element && (
                  <>
                    {steps[currentStep].element?.map((ele, eleIndex) => (
                      <>
                        {ele.type === "text" && (
                          <TextHandlerElement steps={ele} />
                        )}
                        {ele.type === "number" && (
                          <TextHandlerElement steps={ele} />
                        )}
                        {/* {ele.type === "select" && (
                          <SelectHandlerElement steps={ele} />
                        )} */}

                        {ele.type === "radio" && (
                          <RadioHandlerElement steps={ele} />
                        )}
                        {ele.type === "checkbox" && (
                          <CheckboxHandlerElement steps={ele} />
                        )}
                        {ele.type === "date" && (
                          <DateHandlerElement steps={ele} />
                        )}
                      </>
                    ))}
                  </>
                )}

                {steps[currentStep].type === "text" && (
                  <TextHandler steps={steps} />
                )}
                {steps[currentStep].type === "select" && (
                  <SelectHandler steps={steps} />
                )}

                {steps[currentStep].type === "radio" && (
                  <RadioHandler steps={steps} />
                )}
                {steps[currentStep].type === "checkbox" && (
                  <CheckboxHandler steps={steps} />
                )}
                {steps[currentStep].type === "date" && (
                  <DateHandler steps={steps} />
                )}
              </div>
              {/* <div className="sideFaq_mobilescreen mobile-faq">
                {steps[currentStep].faq && (
                  <Accordion className="faq-accordion">
                    <Accordion.Item eventKey={currentStep}>
                      <p className="head-txt-faq">People asked : </p>
                      <Accordion.Header>
                        {" "}
                        {steps[currentStep].faq.question && (
                          <p className="faq-que">
                            {steps[currentStep].faq.question}
                          </p>
                        )}
                      </Accordion.Header>
                      <Accordion.Body>
                        {steps[currentStep].faq.answer && (
                          <p className="faq-answer">
                            {steps[currentStep].faq.answer}
                          </p>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                )}
                {steps[currentStep].note && (
                  <>
                    <p className="notename">
                      {steps[currentStep].note.notename}
                    </p>
                    <p className="note">{steps[currentStep].note.note}</p>
                  </>
                )}
              </div> */}
              <div className="form-action">
                <button
                  className="btn-back"
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  <span className="leftArrow">
                    <div>
                      <img src={back} alt="back" />
                    </div>
                    <div>
                      <p>Back</p>
                    </div>
                  </span>
                </button>
                {steps[currentStep].skip && (
                  <button
                    type="submit"
                    onClick={handleNext()}
                    className="btn-back"
                  >
                    <div>
                      {steps[currentStep].skip && (
                        <span className="leftArrow">
                          <p>Skip</p>
                        </span>
                      )}
                    </div>
                  </button>
                )}

                <button
                  className="btn-next"
                  // style={{ background: "red" }}
                  type="submit"
                  onClick={handleNext()}
                >
                  <span>{isLastStep ? "Submit" : "Next"} </span>

                  <span className="rightArrow">
                    <div>
                      <img src={next} alt="back" />
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Forminput;
