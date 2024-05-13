import { assignAchievement } from "../services/authService";

export const enum AchievementType {
  PROFILE = 1,
  TREASUREHUNT = 2,
  PURCHASE = 3,
}

export const checkAchievement = async (
  userId: string,
  achievement: AchievementType,
) => {
  return await assignAchievement(userId, achievement).then((response) => {
    console.log(response.message);
    return response;
  });
};
