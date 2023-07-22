import axios from "axios";

export const baseURL = 'https://dipantan.live:4431/';

export const dbObject = axios.create({
    withCredentials: true,
    baseURL: "https://dipantan.live:4431/"
});

// const respnse = await dbObject.get("/auth");

// console.log(respnse);