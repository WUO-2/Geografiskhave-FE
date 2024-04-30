import { Routes as routes } from "../routes/routes";
import { IRoute, RouteType } from "../interfaces/IRoute";

export const routeHasNavbar = (route: string) => {
  const lookedUpRoute = findRoute(route);

  if (!lookedUpRoute) {
    return false;
  }
  return lookedUpRoute.routeType !== RouteType.AUTH;
};

export const findRoute = (route: string) => {
  let foundRoute: IRoute | undefined;

  routes.map((r: IRoute) => {
    if (r.path === route) {
      foundRoute = r;
    }
    if (r.children) {
      r.children.map((child) => {
        if (child.path === route) {
          foundRoute = child;
        }
        if (child.children) {
          child.children.map((grandChild) => {
            if (child.path + grandChild.path === route) {
              foundRoute = grandChild;
            }
          });
        }
      });
    }
  });
  return foundRoute;
};

export const transformRoutes = (routes: IRoute[]) => {
  console.log(routes);
  return routes.map((route: IRoute) => {
    if (route.children) {
      return {
        path: route.path,
        element: route.component,
        children: route.children.map((child) => {
          if (child.children) {
            return {
              path: child.path,
              element: child.component,
              children: child.children.map((grandChild) => {
                return {
                  path: child.path + grandChild.path,
                  element: grandChild.component,
                };
              }),
            };
          } else {
            return {
              path: child.path,
              element: child.component,
            };
          }
        }),
      };
    }
    return {
      path: route.path,
      element: route.component,
    };
  });
};
