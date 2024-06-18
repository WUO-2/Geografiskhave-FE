import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./CreatePoi.scss";
import "../../../../node_modules/leaflet/dist/leaflet.css";
import { observer } from "mobx-react-lite";
import Header from "../../../components/shared/header/header";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import { useStore } from "../../../stores/store";
import { transformIcon } from "../../../utils/IconUtil";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/shared/buttons/button";

const MapEvents = ({ handleClick }: { handleClick: (e: any) => void }) => {
  useMapEvent("click", (e) => {
    handleClick(e);
  });

  return false;
};

const CreatePoi = () => {
  const { authStore, mapStore } = useStore();
  const navigate = useNavigate();
  const [newPoi, setNewPoi] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [mapStore.Pois, mapStore.Icons]);

  const handleClick = (e: any) => {
    setNewPoi({
      id: 0,
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
      iconURL: mapStore.Icons[0],
    });
  };

  const load = async () => {
    if (mapStore.Pois.length > 0 && mapStore.Icons.length > 0) {
      setLoading(false);
      return;
    }
    await mapStore.fetchPois().then(async () => {
      await mapStore.fetchIcons().then(() => {
        setLoading(false);
      });
    });
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="CreatePoi">
          <Header currentPage="Opret Poi" onBack={() => navigate(-1)} />
          <MapContainer
            center={[mapStore.Pois[0].latitude, mapStore.Pois[0].longitude]}
            zoom={17}
            scrollWheelZoom={true}
            id="Leaflet"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {mapStore.Pois.map((poi) => (
              <Marker
                key={poi.id}
                position={[poi.latitude, poi.longitude]}
                icon={transformIcon(poi.iconURL, "test")}
              ></Marker>
            ))}
            {newPoi && (
              <Marker
                position={[newPoi.latitude, newPoi.longitude]}
                icon={transformIcon(newPoi.iconURL, "test")}
              ></Marker>
            )}
            <MapEvents handleClick={handleClick} />
          </MapContainer>
          {newPoi && (
            <div className="CreatePoi_ButtonContainer">
              <Button
                onClick={() => console.log("eeee")}
                text="Videre"
                size="large"
                color="green"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default observer(CreatePoi);
