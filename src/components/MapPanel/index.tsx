import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useState , useRef} from "react";
// import Geocoder from "react-map-gl-geocoder";
import Map, { FullscreenControl, GeolocateControl, LngLat, Marker, MarkerDragEvent, NavigationControl } from "react-map-gl";

const TOKEN = "pk.eyJ1IjoiaWZyYXRrYXppIiwiYSI6ImNsZmdkMTFocjE1Y20zdG56cXRncnR5cG0ifQ.avhOkXsuHDWB3vonRBGlng"

const Index = () => {
  const [lng, setLng] = useState(54.37585762735543);
  const [lat, setLat] = useState(24.45677614934833);
  const mapRef = useRef();

  // onDrag
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  const handleViewportChange = useCallback(
    (newViewport:any) => setViewport(newViewport),
    []
  ); 
  
  const handleGeocoderViewportChange = useCallback(
    (newViewport:any) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );
        

  return (
      <Map
        mapboxAccessToken={TOKEN}
        // ref={mapRef}
        style={{
          width: "98vw",
          height: "97vh",
          borderRadius: "15px",
          border: "2px solid #000",
        }}
        initialViewState={{ longitude: lng, latitude: lat }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // onViewportChange={handleViewportChange}
      >
        <Marker longitude={lng} latitude={lat} draggable onDragStart={onMarkerDragStart} onDrag={onMarkerDrag} onDragEnd={onMarkerDragEnd} />
        <NavigationControl position="top-right" />
        <GeolocateControl trackUserLocation />
        <FullscreenControl position="top-right" />  
        {/* <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={TOKEN}
          position="top-left"
        /> */}
      </Map>
  );
};

export default Index;
