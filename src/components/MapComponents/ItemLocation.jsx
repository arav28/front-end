// ItemLocation.jsx

import React from "react";
import { useLocation } from "react-router-dom";
import MapComponent from "./Maps";

export default function ItemLocation() {
  // Access location object from react-router-dom
  const location = useLocation();
  // Parse query parameters from the location search string
  const params = new URLSearchParams(location.search);
  // Get the values of lat and lng from the query parameters
  const lat = parseFloat(params.get("lat"));
  const lng = parseFloat(params.get("lng"));

  return (
    <div>
      <h1>Item Location</h1>
      <p>Information about the item or location goes here.</p>
      {/* Pass the lat and lng to the MapComponent */}
      <MapComponent selectedLocation={{ lat, lng }} />
    </div>
  );
}
