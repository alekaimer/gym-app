import axios, { AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";
import { storageAuthTokenGet } from "@storage/storageAuthToken";

type SignOutProps = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOutProps) => () => void;
};

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
    async (requestError) => {
      // Verifica se o erro é de token inválido ou expirado
      if (requestError?.response?.status === 401) {
        // 401 = Unauthorized
        if (
          requestError.response.data.message === "token.expired" ||
          requestError.response.data.message === "token.invalid"
        ) {
          const oldToken = await storageAuthTokenGet();

          if (!oldToken) {
            signOut();
            return Promise.reject(new AppError(requestError));
          }
        }

        signOut();
      }

      // Verifica e trata a exceção
      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  // Retorna uma função para desfazer o intercept
  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
