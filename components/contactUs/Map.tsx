import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const Map = () => {
//it can't get icon by itself i have to
//copy these icon in public folder and use it here
  const myIcon = L.icon({
    iconUrl: "images/map/marker-icon.png",
    shadowUrl: "images/map/marker-shadow.png",
    iconSize: [30, 50],
    popupAnchor: [0, -41],
    iconAnchor: [12.5, 41],
  });

  return (
    <MapContainer
      center={[35.7393378, 51.4898858]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker  icon={myIcon} position={[35.7393378, 51.4898858]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
