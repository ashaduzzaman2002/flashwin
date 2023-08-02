import axios from "axios";

export const baseURL = 'https://dipantan.live:4430/';

export const dbObject = axios.create({
    withCredentials: true,
    baseURL: "https://dipantan.live:4430/"
});
