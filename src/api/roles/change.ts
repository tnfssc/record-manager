import Axios from "axios";

import { User } from "../../../constants/users";

const api = async (change: Omit<User, "displayName">[], idToken?: string) => {
  const bearerToken = idToken
    ? `Bearer ${idToken}`
    : Axios.defaults.headers.common["Authorization"];
  const { data } = await Axios.post<User[]>("/api/users/change", change, {
    headers: {
      Authorization: `${bearerToken}`,
    },
  });
  return data;
};

export default api;
