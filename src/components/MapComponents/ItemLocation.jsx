// ItemLocation.jsx

import React from "react";
import MapComponent from "./Maps";
import { useDispatch, useSelector } from "react-redux";

export default function ItemLocation() {
  const { currItemLocation } = useSelector((state) => state.item_mod);
  return (
    <div>
      <h1>Item Location</h1>
      <p>Information about the item or location goes here.</p>
      <MapComponent selectedLocation={currItemLocation} />
    </div>
  );
}
