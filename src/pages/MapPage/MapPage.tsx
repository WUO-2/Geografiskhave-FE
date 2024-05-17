import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
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

const MapPage = () => {
  const { mapStore } = useStore();
  const [selectedPoi, setSelectedPoi] = useState<IPoi | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setShowPopup(true);
  };

  return (
    <>
      <div className="Map" style={{ height: showPopup ? "0" : "auto" }}>
        {loading && <h1>Loading...</h1>}
        {!loading && (
          <>
            <Header currentPage="Find vej" />
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
