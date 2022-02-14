import Axios from "axios";

import { Main } from "../../../constants/main";

const api = async (limit = 10, offset = 0, idToken?: string) => {
  const bearerToken = idToken
    ? `Bearer ${idToken}`
    : Axios.defaults.headers.common["Authorization"];
  const { data } = await Axios.get<Main[]>("/api/main", {
    headers: { Authorization: `${bearerToken}` },
    params: { limit, offset },
  });
  return data;
};

export default api;
