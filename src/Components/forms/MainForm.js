// import React, { useContext, useEffect, useRef, useState } from "react";

// import useQuery from "../../utils/useQuery";
// // import Header from "../header";
// import { HomeContext } from "../../App";
// import Header from "../../Sections/Header/Header";
// // import { HomeContext } from "../../../../App";
// const MainForm = () => {
//   const data = useContext(HomeContext);
//   const SUB_ID = data.customization.sub_id;

//   // Start Resizer
//   const [width, setWidth] = useState();
//   const [height, setHeight] = useState();

//   const observedDiv = useRef(null);

//   const handleElementResized = () => {
//     if (observedDiv.current.offsetWidth !== width) {
//       setWidth(observedDiv.current.offsetWidth);
//     }
//     if (observedDiv.current.offsetHeight !== height) {
//       setHeight(observedDiv.current.offsetHeight);
//     }
//   };

//   const resizeObserver = new ResizeObserver(handleElementResized);

//   useEffect(() => {
//     resizeObserver.observe(observedDiv.current);
//     return function cleanup() {
//       resizeObserver.disconnect();
//     };
//   });

//   const query = useQuery();

//   const s1 = query.get("s1");
//   const uid = query.get("uid");
//   // const utm_medium = query.get("utm_medium");
//   const s2 = query.get("s2");
//   const s3 = query.get("s3");
//   const email = query.get("email");
//   const amount = query.get("amount");
//   const firstname = query.get("firstName");
//   const lastname = query.get("lastName");

//   // const url = ` https://useasycash.com/formcdn/v-1.2.1/?c=UserInteractive&m=UI_1_eloan&s1=${s1}&s2=${s2}&s3=${s3}&uid=${uid}&domain=lendfy.net&sub_id=LENFY&applied_amount=${amount}&email=${email}&max_amount=10000&border_color=eb275f&checked_color=eb275f`;

//   const max_amount = data.max_amount;
//   const domain_name = data.domain_name;
//   let primary_color = data.customization.bannerSection.style.ctaBg;
//   primary_color = primary_color.replace("#", "");

//   const formUrl = data.form_url;

//   const originalString = formUrl;

//   // Replace the first instance of "How" with "Where"
//   const mainUrl = originalString
//     .replace("${amount}", amount)
//     .replace("${email}", email)
//     .replace("${sub_id}", SUB_ID)
//     .replace("${uid}", uid)
//     .replace("${s1}", s1)
//     .replace("${s2}", s2)
//     .replace("${s3}", s3)
//     .replace("${maxamount}", max_amount)
//     .replace("${domain}", domain_name)
//     .replace("${primaryColor}", primary_color)
//     .replace("${firstname}", firstname)
//     .replace("${lastname}", lastname);

//   console.log(mainUrl);

//   const [loadding, setLoading] = useState(true);
//   const spinner = document.getElementById("spinner");
//   if (spinner) {
//     setTimeout(() => {
//       spinner.style.display = "none";
//       // debugger;
//       setLoading(false);
//     }, 3000);
//   }

//   let $;

//   return (
//     <>
//       <Header />
//       <div style={{ paddingTop: "170px" }}>
//         <div
//           className="container m-auto"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {
//             <div id="spinner">
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   paddingTop: "150px",
//                 }}
//               >
//                 {/* <img src={favimg} className="" alt="favicon"/> */}
//               </div>

//               <div className="dots">
//                 <div className="dot dot-1"></div>
//                 <div className="dot dot-2"></div>
//                 <div className="dot dot-3"></div>
//               </div>
//             </div>
//           }
//         </div>
//         <iframe
//           title="Form"
//           src={"/form"}
//           className="main-div"
//           ref={observedDiv}
//         />
//       </div>
//     </>
//     // )
//   );
// };

// export default MainForm;
