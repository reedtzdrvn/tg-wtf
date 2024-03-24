import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4444"
    //baseURL: "https://tg-wtf.onrender.com"

});

export default instance;
