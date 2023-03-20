import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl } from "react-map-gl";

const Index = () => {
  const [lng, setLng] = useState(54.37585762735543);
  const [lat, setLat] = useState(24.45677614934833);
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiaWZyYXRrYXppIiwiYSI6ImNsZmdkMTFocjE1Y20zdG56cXRncnR5cG0ifQ.avhOkXsuHDWB3vonRBGlng"
      style={{
        width: "98vw",
        height: "97vh",
        borderRadius: "15px",
        border: "2px solid #000",
      }}
      initialViewState={{ longitude: lng, latitude: lat }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={lng} latitude={lat} />
      <NavigationControl position="top-left" />
      <GeolocateControl />
      <FullscreenControl position="top-left" />
    </Map>
  );
};

export default Index;
