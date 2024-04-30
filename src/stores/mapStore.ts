import { action, makeAutoObservable, observable } from "mobx";
import { IPoi } from "../interfaces/IPois";
import { getPois } from "../services/mapService";

export class MapStore {
  @observable Pois: IPoi[] = [];

  @action setPois(pois: IPoi[]) {
    this.Pois = pois;
  }

  @action fetchPois = async () => {
    await getPois().then((data: IPoi[]) => {
      this.setPois(data);
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
}
