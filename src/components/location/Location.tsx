import { LatLngLiteral } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import "./Location.scss";
const Location = () => {
  const [position, setPosition] = useState<LatLngLiteral>();
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
    },
  });

  const locationIcon = L.divIcon({
    className: "location-icon",
  });

  setTimeout(() => {
    map.locate();
    console.log("Location: ", position);
  }, 60000);

  return position === undefined ? null : (
    <Marker position={position} icon={locationIcon}></Marker>
  );
};

export default Location;
