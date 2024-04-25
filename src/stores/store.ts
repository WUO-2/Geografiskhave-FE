import { createContext, useContext } from "react";
import { AuthStore } from "./userStore";
import { TreasureStore } from "./treasureStore";

type Store = {
  authStore: AuthStore;
  treasureStore: TreasureStore;
};

export const store: Store = {
  authStore: new AuthStore(),
  treasureStore: new TreasureStore(),
};

export const StoreContext = createContext<Store>({} as Store);

export function useStore() {
  return useContext(StoreContext);
}
