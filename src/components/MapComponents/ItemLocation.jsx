import React from "react";
import MapComponent from "./Maps";
import { useDispatch, useSelector } from "react-redux";

export default function ItemLocation() {
  const { currItemLocation } = useSelector((state) => state.item_mod);
  return (
    <div>
      <MapComponent selectedLocation={currItemLocation} />
    </div>
  );
}
