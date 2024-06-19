import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import "./MapPage.scss";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Location from "../../components/location/Location";
import { IPoi } from "../../interfaces/IPois";
import PoiPage from "./PoiPage/PoiPage";
import { transformIcon } from "../../utils/IconUtil";
import t from "../../assets/icons/map.svg";
import Header from "../../components/shared/header/header";
import Loader from "../../components/shared/loader/loader";
import { ERole } from "../../interfaces/IUser";
import Button from "../../components/shared/buttons/button";
import { useNavigate } from "react-router-dom";

const MapEvents = () => {
  useMapEvent("click", (e) => {
    console.log(e.latlng);
  });
  return false;
};

const MapPage = () => {
  const { mapStore, authStore } = useStore();
  const [selectedPoi, setSelectedPoi] = useState<IPoi | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (mapStore.Pois.length === 0) {
      mapStore.fetchPois().then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [mapStore.Pois]);

  useEffect(() => {
    return () => {
      setShowPopup(false);
      setSelectedPoi(null);
      setLoading(true);
    };
  }, []);

  const handleMarkerClick = (poi: IPoi) => {
    setSelectedPoi(poi);
    mapStore.setSelectedPoi(poi);
    setShowPopup(true);
  };

  return (
    <>
      <div className="Map" style={{ height: showPopup ? "0" : "auto" }}>
        {loading && <Loader />}
        {!loading && (
          <>
            <Header currentPage="Find vej" />
            {authStore.user?.role === ERole.ADMIN && (
              <div className="Map_AddPoi">
                <Button
                  text="Tilføj POI"
                  color="orange"
                  size="small"
                  onClick={() => navigate("/kort/add")}
                />
              </div>
            )}
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
                  eventHandlers={{
                    click: () => {
                      handleMarkerClick(poi);
                    },
                  }}
                ></Marker>
              ))}
              <Location />
              <MapEvents />
            </MapContainer>
          </>
        )}
      </div>
      <PoiPage
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        selectedPoi={selectedPoi}
      />
    </>
  );
};

export default observer(MapPage);
