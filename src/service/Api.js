import axios from "axios";

// const base_url = "http://offerlabs.zappian.com/";    //local Url
const base_url = "https://offerlabs.zappian.com/";   //Live Url

const API = axios.create({
  baseURL: base_url, 
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
},
});



export default API;
