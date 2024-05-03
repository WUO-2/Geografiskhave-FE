import { IUserDTO } from "../interfaces/IUser";
import http from "../http-common";

export const registerUser = async (user: IUserDTO) => {
  return http.post("auth/register", user).then((response) => {
    return response.data;
  });
};

export const getUser = async (id: string) => {
  return http
    .get("auth/user", { headers: { requesterid: id } })
    .then((response) => {
      return response.data;
    });
};

export const getCoins = async (id: string) => {
  return http
    .get("auth/coins", {
      headers: {
        requesterid: id,
      },
    })
    .then((response) => {
      const { points } = response.data;
      return points;
    });
};
