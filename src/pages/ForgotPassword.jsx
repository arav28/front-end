import React from "react";
import { useState } from "react";

export default function ForgotPassword() {
  const [forgotFormValues, setForgotFormValues] = useState({});

  const forgotFormChangeInputHandler = (event) => {
    setForgotFormValues({
      ...forgotFormValues,
      [event.target.id]: event.target.value,
    });
  };

  const forgotPasswordHandler = async () => {
    try {
      const res = await fetch("api/v1/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotFormValues.forgotEmail }),
      });

      const data = await res.json();
      console.log(data);

      if (data.status_code === 200) {
        console.log("dataMessage", data.msg);
        navigator("/reset-password");
      }
    } catch (err) {
      console.log(err);
      dispatchAction(
        FailedSign("Error occured while trying to process your request:")
      );
    }
  };
  return (
    <div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="forgotEmail"
          onChange={forgotFormChangeInputHandler}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="question1" className="text-white text-xl block mb-1">
          Security Question 1 - What is your favourite color?
        </label>
        <input
          type="text"
          placeholder="Answer"
          className="border p-3 rounded-lg"
          id="question1"
          onChange={forgotFormChangeInputHandler}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="question2" className="text-white text-xl block mb-1">
          Security Question 2 - What is your favourite season?
        </label>
        <input
          type="text"
          placeholder="Answer"
          className="border p-3 rounded-lg"
          id="question2"
          onChange={forgotFormChangeInputHandler}
        />
      </div>
      <button
        className="text-red-700 underline cursor-pointer"
        onClick={() => setforgotFlag(!forgotFlag)}
      >
        Cancel
      </button>
      <button
        className="text-blue-700 underline cursor-pointer"
        onClick={forgotPasswordHandler}
      >
        Submit
      </button>
    </div>
  );
}
