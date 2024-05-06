import { createContext, useContext } from "react";
import { AuthStore } from "./userStore";
import { TreasureStore } from "./treasureStore";
import { MapStore } from "./mapStore";

type Store = {
  authStore: AuthStore;
  treasureStore: TreasureStore;
  mapStore: MapStore;
};

export const store: Store = {
  authStore: new AuthStore(),
  treasureStore: new TreasureStore(),
  mapStore: new MapStore(),
};

export const StoreContext = createContext<Store>({} as Store);

export function useStore() {
  return useContext(StoreContext);
}
