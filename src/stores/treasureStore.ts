import { makeAutoObservable, observable, action } from "mobx";
import { ITask, ITreasureHunt } from "../interfaces/ITreasureHunt";
import {
  answer,
  getTask,
  startTreasureHunt,
} from "../services/treasureService";

export class TreasureStore {
  @observable treasureHunt: ITreasureHunt | null = null;
  @observable currentTask: ITask | null = null;

  @action setTreasureHunt(treasureHunt: ITreasureHunt) {
    this.treasureHunt = treasureHunt;
  }

  @action setCurrentTask(task: ITask | null) {
    this.currentTask = task;
  }

  @action fetchTask = async (id: number) => {
    await getTask(id).then((task) => {
      this.setCurrentTask(task);
      console.log(this.currentTask);
    });
  };

  @action startTreasureHunt = async (userId: string) => {
    await startTreasureHunt(userId).then((currentTask) => {
      this.setCurrentTask(currentTask);
      console.log(this.currentTask);
    });
  };

  @action answer = async (id: string, answerId: number) => {
    return await answer(id, answerId).then((currentTask) => {
      if (currentTask.message === "Wrong answer") {
        return { correct: false };
      } else if (currentTask.message === "treasurehunt completed") {
        this.setCurrentTask(null);
        return { correct: true, completed: true };
      } else {
        console.log(currentTask);
        this.setCurrentTask(currentTask);
        console.log(this.currentTask);
        return { correct: true };
      }
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
}
