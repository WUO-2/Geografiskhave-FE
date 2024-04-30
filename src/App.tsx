import "./App.scss";
import { observer } from "mobx-react-lite";
import { navRoutes } from "./routes/routes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "./components/shared/navbar/navbar";
import { routeHasNavbar } from "./utils/RouteUtil";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStore } from "./stores/store";

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
        navigate("/");
      }
      if (authStore.userFirebase === null) {
        authStore.setUserFirebase(user);
      }
      if (authStore.user === null) {
        await authStore.getUser(user.uid);
      }
    }
  });

  useEffect(() => {
    handleRouteChange();
    console.log("location changed");
  }, [location]);

  const handleRouteChange = () => {
    const currentPath = location.pathname;
    setRenderNavbar(routeHasNavbar(currentPath));
  };
  return (
    <>
      <div className="Container">
        <div className="Wrapper">
          <Outlet />
        </div>
        {renderNavbar && <Navbar routes={navRoutes} />}
      </div>
    </>
  );
};

export default observer(App);
