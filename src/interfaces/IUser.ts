export interface IUserFirebase {
  email: string;
  password: string;
  name?: string;
}

export interface IUserDTO {
  id: string;
}

export interface IUser {
  id: string;
  points: number;
  currentTask: any;
  imageURL: string;
  treasureHuntStatus: EUserTreasureHuntStatus;
  badges: IBadges[];
  role: ERole;
}

export enum ERole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IBadges {
  id: number;
  badgeId: number;
  userId: string;
  completed: boolean;
  badge: IBadge;
}

export interface IBadge {
  id: number;
  imageURL: string;
}

export enum EUserTreasureHuntStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}
