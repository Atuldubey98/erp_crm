import axios, { isAxiosError } from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:9000",
});
apiInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);
export default apiInstance;

export const sanitizedObject = (data?: object) => {
  const clean: { [type: string | number]: string | number } = {};
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        clean[key] = value;
      }
    }
  }
  return clean;
};
