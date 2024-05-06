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
}

export enum EUserTreasureHuntStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}
