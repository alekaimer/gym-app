import axios, { AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";

type SignOutProps = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOutProps) => () => void;
}

const api = axios.create({
  // baseURL: "http://172.21.112.1:3333",
  baseURL: "http://172.18.128.1:3333",
}) as APIInstanceProps;

// Intercepta todas as requisições e adiciona o token de autenticação
api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if(error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
      }
    }
  );

  // Retorna uma função para desfazer o intercept
  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export { api };
