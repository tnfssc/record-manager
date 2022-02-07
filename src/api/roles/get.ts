import Axios from "axios";

export interface Data {
  role: string;
  email: string;
}

const api = async () => {
  const { data } = await Axios.get<Data>("/api/auth/roles");
  return data;
};

export default api;
