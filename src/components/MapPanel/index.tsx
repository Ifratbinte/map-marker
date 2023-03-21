import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, LngLat, Marker, NavigationControl, MarkerDragEvent } from "react-map-gl";

const Index = () => {
  const [lng, setLng] = useState(54.37585762735543);
  const [lat, setLat] = useState(24.45677614934833);

   // onDrag
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
  }, []);
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
      <Marker 
        longitude={lng} 
        latitude={lat} 
        draggable 
        onDragStart={onMarkerDragStart} 
        onDrag={onMarkerDrag} 
        onDragEnd={onMarkerDragEnd} 
      />
      <NavigationControl position="top-right" />
      <GeolocateControl />
      <FullscreenControl position="top-right" />
    </Map>
  );
};

export default Index;
