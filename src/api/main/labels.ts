import Axios from "axios";

const api = async (idToken?: string) => {
  const bearerToken = idToken
    ? `Bearer ${idToken}`
    : Axios.defaults.headers.common["Authorization"];
  const { data } = await Axios.get<Record<string, string>>("/api/main/labels", {
    headers: { Authorization: `${bearerToken}` },
  });
  return data;
};

export default api;
