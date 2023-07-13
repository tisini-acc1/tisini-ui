import { BASE_URL } from "../api-conf";
import axios from "axios";

const pubTisini = axios.create({
    baseURL:BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});