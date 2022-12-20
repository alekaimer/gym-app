import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  // baseURL: "http://172.21.112.1:3333",
  baseURL: "http://172.18.128.1:3333",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
  }
);

export { api   };
