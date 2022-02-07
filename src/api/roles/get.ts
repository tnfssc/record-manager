import Axios from "axios";

export interface Data {
  role: string;
  email: string;
}

const api = async (idToken?: string) => {
  const { data } = await Axios.get<Data>("/api/auth/roles", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return data;
};

export default api;
