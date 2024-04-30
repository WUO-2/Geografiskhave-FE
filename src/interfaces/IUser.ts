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
}
