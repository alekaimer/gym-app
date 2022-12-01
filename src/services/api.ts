import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("> interceptor.error", error);
    if(error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
  }
);

export { api   };
