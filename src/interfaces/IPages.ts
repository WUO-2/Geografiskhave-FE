import { Dispatch, SetStateAction } from "react";
import { IPoi } from "./IPois";

export interface IPoiPage {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  selectedPoi: IPoi | null;
}

export interface ITreasurehuntMap {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export interface ITreasurehuntTask {
  showTask: boolean;
  setShowTask: Dispatch<SetStateAction<boolean>>;
}
