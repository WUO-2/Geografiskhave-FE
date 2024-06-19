import { action, makeAutoObservable, observable } from "mobx";
import { IPoi } from "../interfaces/IPois";
import {
  createPoi,
  deletePoi,
  getIcons,
  getPois,
  updatePoi,
} from "../services/mapService";

export class MapStore {
  @observable Pois: IPoi[] = [];
  @observable Icons: any[] = [];
  @observable selectedPoi: IPoi | null = null;

  @action setSelectedPoi(poi: IPoi) {
    this.selectedPoi = poi;
  }

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

  @action
  deletePoi = async (id: number, userId: string) => {
    await deletePoi(id, userId).then(() => {
      this.setPois(this.Pois.filter((poi) => poi.id !== id));
    });
  };

  @action
  updatePoi = async (id: number, poi: any) => {
    await updatePoi(id, poi).then((p) => {
      this.setPois(
        this.Pois.map((poi) => (poi.id === id ? { ...poi, ...p } : poi)),
      );
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
}
