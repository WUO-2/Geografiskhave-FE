import { IRoute, RouteType } from "../interfaces/IRoute";
import HomePage from "../pages/HomePage/HomePage.tsx";

export const Routes: IRoute[] = [
  {
    path: "/",
    title: "Home",
    component: HomePage,
    routeType: RouteType.NAVBAR,
  },
];