import React from "react";
import { useSelector } from "react-redux";

export default function CRUDListings() {
  const { currUser } = useSelector((state) => state.user_mod);
  return <>{currUser?.data?.username === "admin" && 
  
  <div>CRUDListings</div>}</>;
}
