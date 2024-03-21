import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminListingCard from "../../components/AdminListingCard";

export default function CRUDListings() {
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
        const response = await fetch("/api/v1/cars/getAllCarsListingsAdmin", {
          method: "GET", // Method is optional if you are making a GET request, included here for clarity
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currUser?.data?.token}`, // Uncomment and replace if you need to send an authorization token
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

  const handleApprove = async (carId) => {
    try {
      const response = await fetch(`/api/v1/cars/adminApprove/${carId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currUser?.data?.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to approve the car listing"
        );
      }

      // Functional update to remove the deleted item from the state
      setCars((currentCars) =>
        currentCars.filter((car) => car._id !== carId)
      );
    } catch (error) {
      console.error("Error approving listing:", error);
    }
  };

  const handleDeny = async (carId) => {
    try {
      const response = await fetch(`/api/v1/cars/deleteCarListings/${carId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currUser?.data?.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to delete the car listing"
        );
      }

      // Functional update to remove the deleted item from the state
      setCars((currentCars) =>
        currentCars.filter((car) => car._id !== carId)
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };


  return (
    <main className="container mx-auto p-4 justify-center">
      {currUser?.data?.username === "admin" && (
        <h1 className="text-3xl font-bold text-center mb-6">
          AVAILABLE CARS FOR APPROVAL
        </h1>
      )}
      <section className="flex flex-wrap -mx-4">
        {isLoading ? (
          <p className="mx-auto">Loading...</p>
        ) : cars.length > 0 ? (
          cars.map((car, index) => (
            <React.Fragment key={`${car.id}-${Math.random()}`}>
              <AdminListingCard
                car={car}
                onApproval={() => handleApprove(car._id)}
                onDenial={() => handleDeny(car._id)}
              />
              {index < cars.length - 1 && <div style={{ width: '16px' }} />} {/* Adjust the width as needed */}
            </React.Fragment>
          ))
        ) : (
          <p className="mx-auto">No listings available.</p>
        )}
      </section>
    </main>
  );
  
}
