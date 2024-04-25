import { makeAutoObservable, observable, action } from "mobx";
import { ITask, ITreasureHunt } from "../interfaces/ITreasureHunt";
import { getTask } from "../services/treasureService";

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

  constructor() {
    makeAutoObservable(this);
  }
}
