import React, { useState, useEffect } from "react";
import  {Header}  from "../components/header";
import { Features } from "../components/features";
import { About } from "../components/about";
import { Services } from "../components/services";
import { Contact } from "../components/contact";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import SearchLocationInput from "../components/MapComponents/GooglePlacesApi"
import MapComponent from "../components/MapComponents/Maps";

import "./Home.css";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  // Set initial location to somewhere in the USA
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 37.7749, // Defaulting to San Francisco's latitude
    lng: -122.4194, // Defaulting to San Francisco's longitude
  });

  return (
    <div>
    
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About id="about-section" data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Contact data={landingPageData.Contact} /> 
      <SearchLocationInput setSelectedLocation={setSelectedLocation} />
      <MapComponent selectedLocation={selectedLocation} />
    </div>
  );
};

export default Home;
