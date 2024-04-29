import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "./MapPage.scss";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Location from "../../components/location/Location";
import placeholder from "../../assets/icons/placeholder.svg";
import { IPoi } from "../../interfaces/IPois";
import Header from "../../components/shared/header/header";
import PoiPage from "./PoiPage/PoiPage";
import { transformIcon } from "../../utils/IconUtil";
import t from "../../assets/icons/map.svg";

const MapPage = () => {
  const { mapStore } = useStore();
  const [selectedPoi, setSelectedPoi] = useState<IPoi | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const testIcon = transformIcon(t, "test");

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
    console.log("Selected POI: ", poi);
  };

  return (
    <>
      <div className="Map">
        {loading && <h1>Loading...</h1>}
        {!loading && (
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
                icon={testIcon}
                eventHandlers={{
                  click: () => {
                    handleMarkerClick(poi);
                  },
                }}
              ></Marker>
            ))}
            <Location />
          </MapContainer>
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
