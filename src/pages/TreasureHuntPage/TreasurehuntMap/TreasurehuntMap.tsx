import React, { useEffect, useState } from "react";
import "./TreasurehuntMap.scss";
import { observer } from "mobx-react-lite";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Location from "../../../components/location/Location";
import { useStore } from "../../../stores/store";
import { transformIcon } from "../../../utils/IconUtil";
import t from "../../../assets/icons/map.svg";
import { IPoi } from "../../../interfaces/IPois";
import Header from "../../../components/shared/header/header";
import { ITask } from "../../../interfaces/ITreasureHunt";
import { useNavigate } from "react-router-dom";
import { Toaster, toast, useToasterStore } from "react-hot-toast";
import { Distance } from "../../../utils/distanceUtil";
import Loader from "../../../components/shared/loader/loader";
import QuitMenu from "../../../components/quiz/quit/quitMenu";

const TreasurehuntMap = () => {
  const [loading, setLoading] = useState(true);
  const { treasureStore, authStore } = useStore();
  const navigate = useNavigate();
  const { toasts } = useToasterStore();

  const [isQuit, setIsquit] = useState<boolean>(false);

  useEffect(() => {
    if (authStore.user !== null && treasureStore.currentTask === null) {
      treasureStore.startTreasureHunt(authStore.user!.id);
    }
  }, [authStore.user, treasureStore.currentTask]);

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  const distanceThreshold = 150000;

  useEffect(() => {
    if (treasureStore.tasks.length === 0) {
      load();
    } else {
      setLoading(false);
    }
  }, [treasureStore.tasks]);

  const load = async () => {
    await treasureStore.getTasks().then(() => {
      setLoading(false);
    });
  };

  const handleMarkerClick = (task: ITask) => {
    if (treasureStore.currentTask?.id !== task.id) {
      return;
    }
    if (
      Distance(
        task.latitude,
        task.longitude,
        authStore.position.lat,
        authStore.position.lng,
      ) > distanceThreshold
    ) {
      console.log("distance too far");
      toast.error("Du er for langt væk fra opgaven", { duration: 2000 });
      return;
    }

    navigate(`/quiz/${task.id}`);
  };

  const handleClose = () => {
    console.log("close");
    setIsquit(true);
  };

  const handleReset = async () => {
    await treasureStore
      .endTreasureHunt(authStore.user!.id)
      .then(() => {
        treasureStore.setProgress(null);
      })
      .then(() => navigate("/"));
  };

  const handleExit = async () => {
    if (authStore.user?.id === undefined) return;
    await treasureStore
      .getCurrentTask(authStore.user!.id)
      .then(() => navigate("/"));
  };

  return (
    <>
      <div className={`TreasurehuntMap TreasurehuntMap_Show`}>
        {isQuit && (
          <QuitMenu
            forsæt={() => setIsquit(false)}
            start_forfra={() => handleReset()}
            afslut={() => handleExit()}
          />
        )}
        <Header
          currentPage="Din placering"
          onBack={() => navigate(-1)}
          onClose={() => handleClose()}
        />
        {loading && <Loader />}
        {!loading && (
          <MapContainer
            center={[
              treasureStore.tasks[0].latitude,
              treasureStore.tasks[0].longitude,
            ]}
            zoom={17}
            scrollWheelZoom={true}
            id="Leaflet"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {treasureStore.tasks.map((task) => (
              <Marker
                key={task.id}
                position={[task.latitude, task.longitude]}
                icon={
                  treasureStore.currentTask?.id === task.id
                    ? transformIcon(task.iconURL, "TreasurehuntMap_Icon-Active")
                    : transformIcon(task.iconURL, "TreasurehuntMap_Icon")
                }
                eventHandlers={{
                  click: () => {
                    console.log("click");
                    handleMarkerClick(task);
                  },
                }}
              ></Marker>
            ))}
            <Location />
          </MapContainer>
        )}
        <Toaster
          position="bottom-center"
          containerStyle={{ bottom: "150px" }}
          toastOptions={{
            style: { backgroundColor: "#fff9e8" },
          }}
        />
      </div>
    </>
  );
};

export default observer(TreasurehuntMap);
