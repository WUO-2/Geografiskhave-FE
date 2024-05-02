import { IRoute, RouteType } from "../interfaces/IRoute.ts";
import HomePage from "../pages/HomePage/HomePage.tsx";
import home from "../assets/icons/home.svg";
import map from "../assets/icons/map.svg";
import profile from "../assets/icons/user.svg";
import TestPage from "../pages/TestPage/TestPage.tsx";
import placeholder from "../assets/icons/placeholder.svg";
import ProfilePage from "../pages/ProfilePage/ProfilePage.tsx";
import skattejagt from "../assets/icons/skattejagt.svg";
import AuthPage from "../pages/AuthPage/AuthPage.tsx";
import App from "../App.tsx";
import SignInPage from "../pages/AuthPage/SignInPage/SignInPage.tsx";
import SignUpPage from "../pages/AuthPage/SignUpPage/SignUpPage.tsx";
import TreasureHuntPage from "../pages/TreasureHuntPage/TreasureHuntPage.tsx";
import MapPage from "../pages/MapPage/MapPage.tsx";
import Success from "../components/quiz/success/success.tsx";
import PuzzlePage from "../pages/PuzzlePage/PuzzlePage.tsx"
import PuzzleCompletePage from "../pages/PuzzlePage/PuzzleCompletePage.tsx";
import PrizePage from "../pages/PrizePage/PrizePage.tsx";

export const Routes: IRoute[] = [
  {
    path: "/",
    title: "app",
    component: <App />,
    routeType: RouteType.INTERNAL,
    children: [
      {
        path: "",
        title: "Hjem",
        icon: home,
        component: <HomePage />,
        routeType: RouteType.NAVBAR,
      },
      {
        path: "/map",
        title: "Find vej",
        icon: map,
        component: <MapPage />,
        routeType: RouteType.NAVBAR,
      },
      {
        path: "/skattejagt",
        title: "Skattejagt",
        icon: skattejagt,
        component: <TreasureHuntPage />,
        routeType: RouteType.NAVBAR,
      },
      {
        path: "/profile",
        title: "Profil",
        icon: profile,
        component: <ProfilePage />,
        routeType: RouteType.NAVBAR,
      },
      //TODO: REMOVE THIS IN PRODUCTION
      {
        path: "/test",
        title: "Test",
        routeType: RouteType.INTERNAL,
        component: <TestPage />,
      },
      {
        path: "/quiz/:id",
        title: "Opgave",
        routeType: RouteType.INTERNAL,
        component: <TestPage />,
      },
      {
        path: "/quiz/success/:id",
        title: "Opgave Klaret",
        routeType: RouteType.INTERNAL,
        component: <Success />,
      },
      {
        path: "/auth",
        title: "Auth",
        routeType: RouteType.AUTH,
        component: <AuthPage />,
      },
      {
        path: "/login",
        title: "Login",
        component: <SignInPage />,
        routeType: RouteType.AUTH,
      },
      {
        path: "/register",
        title: "Register",
        component: <SignUpPage />,
        routeType: RouteType.AUTH,
      },
      {
        path: "/puzzle",
        title: "Puzzle",
        component: <PuzzlePage />,
        routeType: RouteType.INTERNAL,
      },
      {
        path: "/puzzle/complete",
        title: "Puzzle Complete",
        component: <PuzzleCompletePage />,
        routeType: RouteType.INTERNAL,
      },
      {
        path: "/prize",
        title: "Prize",
        component: <PrizePage />,
        routeType: RouteType.INTERNAL,
      },
    ],
  },
];

export const navRoutes = Routes[0].children!.filter(
  (route) => route.routeType === RouteType.NAVBAR,
);
