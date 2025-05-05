import axios from "axios";

export const axiosTMDBInstance = axios.create({
    baseURL: "https://api.themoviedb.org",
    headers: {}
});