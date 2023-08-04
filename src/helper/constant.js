import axios from "axios";

export const baseURL = 'https://smartwin.dipantan.live';

export const dbObject = axios.create({
    withCredentials: true,
    baseURL: "https://smartwin.dipantan.live"
});
