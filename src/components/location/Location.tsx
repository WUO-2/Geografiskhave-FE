import { LatLngLiteral } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "./Location.scss";
import { useStore } from "../../stores/store";
const Location = () => {
  const [position, setPosition] = useState<LatLngLiteral>();
  const { authStore } = useStore();

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      authStore.setPosition(e.latlng);
      setPosition(e.latlng);
    },
  });

  const locationIcon = L.divIcon({
    className: "location-icon",
  });

  setTimeout(() => {
    map.locate();
  }, 60000);

  useEffect(() => {
    map.locate();
  }, []);

  return position === undefined ? null : (
    <Marker position={position} icon={locationIcon}></Marker>
  );
};

export default Location;
