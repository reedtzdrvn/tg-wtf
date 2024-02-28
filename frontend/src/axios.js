import axios from "axios";

const instance = axios.create({
    baseURL: "https://tg-wtf.onrender.com"
});

export default instance;
