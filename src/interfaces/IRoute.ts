import { ReactNode } from "react";

export interface IRoute {
  path: string;
  title: string;
  component: ReactNode;
  icon?: any;
  children?: IRoute[];
  isAuth?: boolean;
  routeType: RouteType;
  hasNavbar?: boolean;
}

export enum RouteType {
  NAVBAR = "navbar",
  DROPDOWN = "dropdown",
  INTERNAL = "internal",
  AUTH = "auth",
}
