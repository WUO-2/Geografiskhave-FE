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

const TreasurehuntMap = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: any;
}) => {
  const [loading, setLoading] = useState(true);
  const { treasureStore } = useStore();
  const navigate = useNavigate();

  const testIcon = transformIcon(t, "TreasurehuntMap_Icon");
  const activeIcon = transformIcon(t, "TreasurehuntMap_Icon-Active");

  useEffect(() => {
    if (treasureStore.tasks.length === 0) {
      treasureStore.getTasks().then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [treasureStore.tasks]);

  const handleMarkerClick = (task: ITask) => {
    if (treasureStore.currentTask?.id !== task.id) {
      return;
    }
    navigate(`/quiz/${task.id}`);
  };

  return (
    <>
      <div className={`TreasurehuntMap ${show ? "TreasurehuntMap_Show" : ""}`}>
        <Header
          currentPage="Din placering"
          onBack={() => setShow(false)}
          onClose={() => console.log("bbbb")}
        />
        {loading && <h1>Loading...</h1>}
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
                    ? activeIcon
                    : testIcon
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
      </div>
    </>
  );
};

export default observer(TreasurehuntMap);
