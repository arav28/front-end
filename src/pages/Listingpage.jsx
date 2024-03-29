import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const ListingCard = ({ car }) => {

  const placeholderImage = "../../assets/car2.jpg";
  const formattedAvailableFrom = formatDate(car.availableFrom);
  const formattedAvailableTo = formatDate(car.availableTo);
  
  return (
<div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
  <div className="h-48 bg-gray-200 flex items-center justify-center">
    {/* Use car.imageUrl if available, otherwise use placeholder */}
    <img
      className="object-cover h-full w-full"
      src={car.imageUrl || placeholderImage}
      alt={`${car.carMake} ${car.carModel}`}
    />
  </div>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-1">{`${car.carMake} ${car.carModel}`}</div>
    <ul className="list-none">
      <li className="mb-1 font-serif">Year: {car.year}</li>
      <li className="mb-1 font-serif">Mileage: {car.mileage}</li>
      <li className="mb-1 font-serif">Transmission: {car.transmission}</li>
      <li className="mb-1 font-serif">Fuel Type: {car.fuelType}</li>
      <li className="mb-1 font-serif">Seats: {car.seats}</li>
      <li className="mb-1 font-serif">Price Per Day: ${car.pricePerDay}</li>
      <li className="mb-1 font-serif">Available From: {formattedAvailableFrom}</li>
      <li className="mb-1 font-serif">Available To: {formattedAvailableTo}</li>
      <li className="mb-1 font-serif">
        <Link to={`/itemLocation?lat=${car.location.lat}&lng=${car.location.lng}`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          View item location
        </Link>
      </li>
    </ul>
  </div>
</div>

  );
};

export default function Listingpage() {
  // Initialize state with empty array or example data if you want to show something initially
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null);
  const { currUser } = useSelector((state) => state.user_mod);
  
  useEffect(() => {
    async function fetchListings() {
      setIsLoading(true); // Begin loading
      setError(null); // Reset error state
      try {
        const response = await fetch("/api/v1/cars/getAllCarsListings", {
          method: "GET", // Method is optional if you are making a GET request, included here for clarity
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currUser?.data?.token}`
            , // Uncomment and replace if you need to send an authorization token
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCars(data.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Failed to fetch listings. Please try again later."); // Set error message
      } finally {
        setIsLoading(false); // End loading
      }
    }

    fetchListings();
  }, []);

  return (
    <main className="container mx-auto p-4 justify-center">
      <h1 className="text-3xl font-bold text-center mb-6">
        AVAILABLE CARS FOR RENT
      </h1>
      <div className="text-center mb-4">
        {currUser ? (
          <Link
            to="/Createlisting"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            POST YOUR CAR
          </Link>
        ) : (
          <Link
            to="/sign-in"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            SIGN IN TO POST YOUR CAR
          </Link>
        )}
      </div>
      <section className="flex flex-wrap -mx-4">
        {isLoading ? (
          <p className="mx-auto">Loading...</p>
        ) : cars.length > 0 ? (
          cars.map((car) => (
            <ListingCard key={`${car.id}-${Math.random()}`} car={car} />
          ))
        ) : (
          <p className="mx-auto">No listings available.</p>
        )}
      </section>
    </main>
  );
}
