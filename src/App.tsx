import "./App.scss";
import { observer } from "mobx-react-lite";
import { navRoutes } from "./routes/routes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./components/shared/navbar/navbar";
import { routeHasGuard, routeHasNavbar } from "./utils/RouteUtil";
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useStore } from "./stores/store";
import NewAchievement from "./components/newAchievement/newAchievement";

const App = () => {
  const [renderNavbar, setRenderNavbar] = useState(true);
  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { authStore } = useStore();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (
        location.pathname === "/auth" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        // ------------------------------------------
        if(auth.currentUser?.emailVerified) {
          navigate("/");
        } else {
          navigate("/verification")
        }
        
      }
      if (authStore.userFirebase === null) {
        authStore.setUserFirebase(user);
        // ------------------------------------------
        if(!auth.currentUser?.emailVerified){
          sendEmailVerification(auth.currentUser!, {url: "http://localhost:5173/"})
            .then(() => {
              console.log("email send");
            }).catch((error) => {
              console.log(error);
            });
        };
      }
      if (authStore.user === null) {
        await authStore.getUser(user.uid);
      }
    }
  });

  useEffect(() => {
    console.log(authStore.newAchievement);
  }, [authStore.newAchievement]);

  useEffect(() => {
    handleRouteChange();
    console.log("location changed");
  }, [location, authStore.user]);

  const handleRouteChange = () => {
    const currentPath = location.pathname;
    console.log(authStore.user);
    console.log(routeHasGuard(currentPath));
    if (routeHasGuard(currentPath) && !auth.currentUser) {
      navigate("/login");
      return;
    }

    setRenderNavbar(routeHasNavbar(currentPath));
  };
  return (
    <>
      <div className="Container">
        <div className="Wrapper">
          <Outlet />
        </div>
        {authStore.newAchievement && <NewAchievement />}
        {renderNavbar && <Navbar routes={navRoutes} />}
      </div>
    </>
  );
};

export default observer(App);
