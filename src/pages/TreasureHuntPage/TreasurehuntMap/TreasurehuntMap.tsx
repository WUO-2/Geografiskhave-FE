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

const TreasurehuntMap = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: any;
}) => {
  const [loading, setLoading] = useState(true);
  const { mapStore } = useStore();

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

  const handleMarkerClick = (poi: IPoi) => {
    console.log("handleMarkerClick");
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
    </>
  );
};

export default observer(TreasurehuntMap);
