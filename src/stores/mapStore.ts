import { action, makeAutoObservable, observable } from "mobx";
import { IPoi } from "../interfaces/IPois";
import { createPoi, getIcons, getPois } from "../services/mapService";

export class MapStore {
  @observable Pois: IPoi[] = [];
  @observable Icons: any[] = [];

  @action setPois(pois: IPoi[]) {
    this.Pois = pois;
  }

  @action setIcons(icons: any[]) {
    this.Icons = icons;
  }

  @action fetchPois = async () => {
    await getPois().then((data: IPoi[]) => {
      this.setPois(data);
    });
  };

  @action
  fetchIcons = async () => {
    await getIcons().then((data: any[]) => {
      this.setIcons(data);
    });
  };

  @action
  createPoi = async (poi: any) => {
    await createPoi(poi).then((data) => {
      this.setPois([...this.Pois, data]);
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
}
