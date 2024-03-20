import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { useSelector } from "react-redux";
import SearchLocationInput from "../components/MapComponents/GooglePlacesApi";


export default function CreateListing() {
  const [listings, setListings] = useState([]);
  const { currUser } = useSelector((state) => state.user_mod);
  const [formData, setFormData] = useState({
    carMake: "",
    carModel: "",
    year: "",
    mileage: "",
    transmission: "",
    fuelType: "",
    seats: "",
    pricePerDay: "",
    availableFrom: "",
    availableTo: "",
    location: "",
  });
  

  const { currItemLocation } = useSelector((state) => state.item_mod);
  const navigator = useNavigate();
  

  const fetchListings = async () => {
    try {
        const response = await fetch('/api/v1/cars/getAllOwnerCarsListings', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currUser?.data?.token}` 
            }
        });
        const data = await response.json();
        console.log(data);
        if (data && Array.isArray(data.data)) {
            setListings(data.data); 
        } else {
            console.log('Unexpected response structure:', data);
        }
    } catch (error) {
        console.error('Failed to fetch listings:', error);
    }
};
useEffect(() => {
  setFormData((prevData) => ({
    ...prevData,
    location: currItemLocation,
  }));
}, [currItemLocation]);
useEffect(() => {
    fetchListings();
}, [currUser?.token, currUser?.id]); 

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
};

const handleUpdate = (car) => {
    setFormData({ ...car,
        availableFrom: car.availableFrom.slice(0, 10),
        availableTo: car.availableTo.slice(0, 10) 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const endpoint = formData._id ? `/api/v1/cars/updateCarListings/${formData._id}` : '/api/v1/cars/createCarListings';
        const method = formData._id ? 'PATCH' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currUser?.data?.token}`
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to save the car listing');
            }


      const createdListing = await response.json();
      console.log("Listing created:", createdListing);

      // Reset the form data
      setFormData({
        carMake: "",
        carModel: "",
        year: "",
        mileage: "",
        transmission: "",
        fuelType: "",
        seats: "",
        pricePerDay: "",
        availableFrom: "",
        availableTo: "",
        location: "",
      });
      await fetchListings();
      navigator('/Listingpage', { replace: true, state: { refresh: true } });

    } catch (error) {
      console.error("Error creating listing:", error);

    }
  };

  // Function to handle the delete action
  const handleDelete = async (carId) => {
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
      setListings((currentListings) =>
        currentListings.filter((car) => car._id !== carId)
      );
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 flex">
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold text-center mb-7">
          POST YOUR CAR FOR RENT
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col font-semibold">
            <label htmlFor="carMake">Car Make</label>
            <input
              type="text"
              name="carMake"
              id="carMake"
              value={formData.carMake}
              onChange={handleChange}
              className="input-field w-full "
              required
            />
          </div>
          <div className="flex flex-col font-semibold">
            <label htmlFor="carModel">Car Model</label>
            <input
              type="text"
              name="carModel"
              id="carModel"
              value={formData.carModel}
              onChange={handleChange}
              className="input-field w-full "
              required
            />
          </div>
          <div className="flex flex-col font-semibold">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              name="year"
              id="year"
              value={formData.year}
              onChange={handleChange}
              className="input-field w-full"
              maxLength="4"
              required
            />
          </div>
          <div className="flex flex-col font-semibold">
            <label htmlFor="mileage">Mileage</label>
            <input
              type="number"
              name="mileage"
              id="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>
          <div className="flex flex-col font-semibold ">
            <label htmlFor="transmission">Transmission</label>
            <select
              name="transmission"
              id="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="input-field w-full"
              required
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div className="flex flex-col font-semibold">
            <label htmlFor="fuelType">Fuel Type</label>
            <select
              name="fuelType"
              id="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="input-field "
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col font-semibold">
            <label htmlFor="seats">Seats</label>
            <input
              type="number"
              name="seats"
              id="seats"
              value={formData.seats}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>
          <div className="flex flex-col font-semibold">
            <label htmlFor="pricePerDay">Price Per Day</label>
            <input
              type="number"
              name="pricePerDay"
              id="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>
          <div className="flex flex-col font-semibold">
            <label htmlFor="availableFrom">Available From</label>
            <input
              type="date"
              name="availableFrom"
              id="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>
          <div className="flex flex-col font-semibold">
            <label htmlFor="availableTo">Available To</label>
            <input
              type="date"
              name="availableTo"
              id="availableTo"
              value={formData.availableTo}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>
          <div className="flex flex-col font-semibold">
            <label htmlFor="location">Location</label>
            <SearchLocationInput
              onChangeLocation={(location) =>
                setFormData((prevData) => ({ ...prevData, location }))
              }
            />
          </div>
          <div className="flex justify-center font-semibold">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Submit
            </button>
          </div>
          <Outlet />
        </form>
      </div>
      <div className="w-1/2 p-12">
        <div className="flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Your Listed Rides</h2>
          <div className="space-y-4">
          {
  listings.length > 0 &&
    listings.map((car) => (
      <ListingCard 
        key={car._id} 
        car={car} 
        onUpdate={() => handleUpdate(car)}
        onDelete={() => handleDelete(car._id)} 
      />
    ))
}

          </div>
        </div>
      </div>
    </div>
  );
}
