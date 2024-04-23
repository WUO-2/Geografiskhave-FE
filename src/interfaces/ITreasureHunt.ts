export interface ITreasureHunt {
  id: number;
  name: string;
  tasks?: ITask[];
}

export interface ITask {
  id: number;
  name: string;
  longtiude: number;
  latitude: number;
  description: string;
  question: string;
  treasureHuntId: number;
  treasureHunt: ITreasureHunt;
  answers: IAnswer[];
}

export interface IAnswer {
  id: number;
  answer: string;
  isCorrect: boolean;
  taskId: number;
}
