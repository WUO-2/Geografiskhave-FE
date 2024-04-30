import { makeAutoObservable, observable, action } from "mobx";
import { IProgress, ITask, ITreasureHunt } from "../interfaces/ITreasureHunt";
import {
  answer,
  getCurrentTask,
  getTask,
  getTasks,
  startTreasureHunt,
} from "../services/treasureService";

export class TreasureStore {
  @observable treasureHunt: ITreasureHunt | null = null;
  @observable currentTask: ITask | null = null;
  @observable tasks: ITask[] = [];
  @observable progress: IProgress | null = null;

  @action setTreasureHunt(treasureHunt: ITreasureHunt) {
    this.treasureHunt = treasureHunt;
  }

  @action setCurrentTask(task: ITask | null) {
    this.currentTask = task;
  }

  @action setProgress(progress: IProgress) {
    console.log(progress);
    this.progress = progress;
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

  @action setTasks(tasks: ITask[]) {
    this.tasks = tasks;
  }

  @action getTasks = async () => {
    await getTasks().then((tasks) => {
      this.setTasks(tasks);
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

  @action getCurrentTask = async (id: string) => {
    await getCurrentTask(id).then((task) => {
      console.log(task);
      this.setProgress(task);
      console.log(this.currentTask);
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
}
