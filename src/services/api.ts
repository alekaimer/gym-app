import axios, { AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";
import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";

type SignOutProps = () => void;
type PromiseType = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOutProps) => () => void;
};

type ProccessQueueParams = {
  error?: Error | null;
  token?: string | null;
};

const api = axios.create({
  baseURL: "http://localhost:3333",
}) as APIInstanceProps;

let isRefreshing = false;
let failedQueue: PromiseType[] = [];

const processQueue = ({error, token = null}: ProccessQueueParams): void => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }

    failedQueue = [];
  });

  failedQueue = [];
}

// Intercepta todas as requisições e adiciona o token de autenticação
api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => {
      console.log("> API RESPONSE");
      return response;
    },
    async (requestError) => {
      // Verifica se o erro é de token inválido ou expirado
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data.message === "token.expired" ||
          requestError.response.data.message === "token.invalid"
        ) {
          console.log("  token.invalid or token.expired");
          const oldToken = await storageAuthTokenGet();

          if (!oldToken) {
            console.log("  não existe oldToken");
            signOut();
            return Promise.reject(new AppError(requestError));
          }

          const originalRequest = requestError.config;

          // se atualizando token adiciona a fila de requisições quando token atualizado
          if (isRefreshing) {
            console.log("  token atualizando");
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
              })
              .catch((error) => {
                console.log('> AQUI')
                throw error;
              });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try{
              
              console.log("  tenta refresh-token");
              const { data } = await api.post("/sessions/refresh-token", {
                token: oldToken,
              });
              await storageAuthTokenSave(data.token);
  
              api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
              originalRequest.headers.Authorization = `Bearer ${data.token}`;
              //TODO: verificar se também precisa atualizar o estado do contexto com o novo token ou qualquer informação
  
              console.log("TOKEN ATUALIZADO =>", data);
  
              processQueue({ error: null, token: data.token});
  
              resolve(originalRequest);
            } catch(error: any) {
              processQueue({ error, token: null });
              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
            }
          });
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
