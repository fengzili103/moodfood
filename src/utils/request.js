import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth";

const instance = axios.create({
  baseURL: "/", // url = base baseURL + request url
  timeout: 500000,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Do something before sending the request
    if (store.getters["user/token"]) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response.data;
  },
  (error) => {
    // Do something with response error
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default instance;
