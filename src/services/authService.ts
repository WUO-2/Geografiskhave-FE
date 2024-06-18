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
      console.log(response);
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

export const getAvatars = async () => {
  return http.get("auth/avatars").then((response) => {
    return response.data;
  });
};

export const updateAvatar = async (id: string, imageURL: string) => {
  return http
    .patch("auth/avatar", { id: id, imageURL: imageURL })
    .then((response) => {
      return response.data;
    });
};

export const assignAchievement = async (id: string, achievementId: number) => {
  return http
    .post("auth/achievement", { userId: id, badgeId: achievementId })
    .then((response) => {
      return response.data;
    });
};
