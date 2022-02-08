import Axios from "axios";

import { User } from "../../../constants/users";

const api = async (idToken?: string) => {
  const bearerToken = idToken
    ? `Bearer ${idToken}`
    : Axios.defaults.headers.common["Authorization"];
  const { data } = await Axios.get<User[]>("/api/users/all", {
    headers: {
      Authorization: `${bearerToken}`,
    },
  });
  return data;
};

export default api;
