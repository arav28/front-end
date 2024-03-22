import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ListingCard = ({ car }) => {
  // Define a placeholder image path
  const placeholderImage = "../../assets/car2.jpg";
  
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
          <li className="mb-1 font-serif">
            Available From: {car.availableFrom}
          </li>
          <li className="mb-1 font-serif">Available To: {car.availableTo}</li>
          <li className="mb-1 font-serif">Location: {car.location}</li>
        </ul>
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, options, selectedOption, onChange }) => {
  return (
    <div className="mb-4">
      <div className="relative">
        <select
          className="appearance-none w-full border border-gray-300 rounded px-3 py-2 pr-10"
          value={selectedOption}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{label}</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function Listingpage() {
  // Initialize state with empty array or example data if you want to show something initially
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({}); // State to hold filter values

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

  useEffect(() => {
    async function fetchFilters() {
      setIsLoading(true);
      setError(null);
      try {
        const url = `/api/v1/cars/filterCars?${new URLSearchParams(filters).toString()}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currUser?.data?.token}`,
            // You can add authorization token if needed

          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCars(data.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError('Failed to fetch listings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchFilters();
  }, [filters]); // Run whenever filters change

  // Function to handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

//   return (
//     <main className="container mx-auto p-4 justify-center">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         AVAILABLE CARS FOR RENT
//       </h1>
//       <div className="text-center mb-4">
//         {currUser ? (
//           <Link
//             to="/Createlisting"
//             className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
//           >
//             POST YOUR CAR
//           </Link>
//         ) : (
//           <Link
//             to="/sign-in"
//             className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
//           >
//             SIGN IN TO POST YOUR CAR
//           </Link>
//         )}
//       </div>
//       <section className="flex flex-wrap -mx-4">
//         {isLoading ? (
//           <p className="mx-auto">Loading...</p>
//         ) : cars.length > 0 ? (
//           cars.map((car) => <ListingCard key={car.id} car={car} />)
//         ) : (
//           <p className="mx-auto">No listings available.</p>
//         )}
//       </section>
//     </main>
//   );
// }

return (
  <main className="container mx-auto p-4 justify-center">
    <h1 className="text-3xl font-bold text-center mb-6">
      AVAILABLE CARS FOR RENT
    </h1>
    <div className="text-center mb-4">
      {/* Filter components */}
      <FilterDropdown
        label="Car Make"
        options={["Toyota", "Honda", "Ford"]} // Example options, replace with actual data
        onChange={(value) => handleFilterChange("carMake", value)}
      />
      {/* Add more filter components here */}

      {/* Post car button */}
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
        cars.map((car) => <ListingCard key={car.id} car={car} />)
      ) : (
        <p className="mx-auto">No listings available.</p>
      )}
    </section>
  </main>
);
}