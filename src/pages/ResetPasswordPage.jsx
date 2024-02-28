import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const ResetPasswordPage = () => {
  const [formValues, setFormValues] = useState({
    otp: '',
    newPassword: '',
  });
  const navigator = useNavigate();

  const resetPasswordHandler = async (event) => {
    event.preventDefault();
    try {
        const res = await fetch('/api/v1/auth/resetPassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp: formValues.otp, password: formValues.newPassword }),
          });
          const data = await res.json();
          console.log(data);
          if (data.status_code === 200) {
            console.log(data.msg);
            navigator('/sign-in'); }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle errors, if any
    }
  };

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
<div className="p-6 bg-gray-100 rounded-lg">
  <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
  <form onSubmit={resetPasswordHandler} className="space-y-4">
    <div>
      <label htmlFor="otp" className="block mb-1">OTP:</label>
      <input
        type="text"
        id="otp"
        name="otp"
        value={formValues.otp}
        onChange={handleChange}
        className="w-48 sm:w-64 border border-gray-300 rounded-lg p-2"
      />
    </div>

    <div>
      <label htmlFor="newPassword" className="block mb-1">New Password:</label>
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        value={formValues.newPassword}
        onChange={handleChange}
        className="w-48 sm:w-64 border border-gray-300 rounded-lg p-2"
      />
    </div>

    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Reset Password</button>
  </form>
</div>


  );
};

export default ResetPasswordPage;