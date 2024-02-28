import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ car }) => {
    // Define a placeholder image path
    const placeholderImage = '../../assets/car2.jpg';
  
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
  <li className="mb-1 font-serif">Available From: {car.availableFrom}</li>
  <li className="mb-1 font-serif">Available To: {car.availableTo}</li>
  <li className="mb-1 font-serif">Location: {car.location}</li>
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

  useEffect(() => {
    async function fetchListings() {
      setIsLoading(true); // Begin loading
      setError(null); // Reset error state
      try {
        const response = await fetch('/api/v1/cars/getAllCarsListings', {
          method: 'GET', // Method is optional if you are making a GET request, included here for clarity
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NWRhNzkzMDczNDM3MzRmNDE1Y2ViOTEiLCJ1c2VybmFtZSI6InByYWdhdGgiLCJpYXQiOjE3MDg4MTY2ODgsImV4cCI6MTcxNDAwMDY4OH0.g2z8B-W7fn0-X3gfLxmmYYrniy5IivJfI103jVV_NLw', // Uncomment and replace if you need to send an authorization token
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCars(data.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError('Failed to fetch listings. Please try again later.'); // Set error message
      } finally {
        setIsLoading(false); // End loading
      }
    }
  
    fetchListings();
  }, []);
  

  return (
    <main className="container mx-auto p-4 justify-center">
      <h1 className="text-3xl font-bold text-center mb-6">AVAILABLE CARS FOR RENT</h1>
      <div className="text-center mb-4">
        <Link to="/Createlisting" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300">
          POST YOUR CAR
        </Link>
      </div>
      <section className="flex flex-wrap -mx-4">
        {isLoading ? (
          <p className="mx-auto">Loading...</p>
        ) : cars.length > 0 ? (
          cars.map(car => <ListingCard key={car.id} car={car} />)
        ) : (
          <p className="mx-auto">No listings available.</p>
        )}
      </section>
    </main>
  );
}
