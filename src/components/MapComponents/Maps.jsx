// MapComponent.jsx

import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../constants/constants";

const MapComponent = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Loading Maps...";

  return (
    <div style={{ marginTop: "20px" }}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        center={selectedLocation}
        zoom={13}
        onLoad={onMapLoad}
      >
        <Marker
          position={selectedLocation}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
