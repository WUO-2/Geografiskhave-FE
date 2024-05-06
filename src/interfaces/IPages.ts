import { Dispatch, SetStateAction } from "react";
import { IPoi } from "./IPois";

export interface IPoiPage {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  selectedPoi: IPoi | null;
}
