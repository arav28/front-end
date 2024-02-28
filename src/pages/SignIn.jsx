import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  beginingSignin,
  FailedSign,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [formValues, setFormValues] = useState({});
  const [forgotFormValues, setForgotFormValues] = useState({});
  const [forgotFlag, setforgotFlag] = useState(false);
  const { loading, error } = useSelector((state) => state.user_mod);
  const navigator = useNavigate();
  const dispatchAction = useDispatch();
  const formChangeInputHandler = (event) => {
    setFormValues({
      ...formValues,
      [event.target.id]: event.target.value,
    });
  };

  const forgotFormChangeInputHandler = (event) => {
    setForgotFormValues({
      ...forgotFormValues,
      [event.target.id]: event.target.value,
    });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      dispatchAction(beginingSignin());
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      console.log("try console",data);
      if (data.status_code === 401) {
        dispatchAction(FailedSign(data.message));
        return;
      }

      else if(data.status_code=== 200) {
        dispatchAction(signInSuccess(data));
      navigator("/");
      }
      
    } catch (err) {
      dispatchAction(FailedSign(err.message));
    }
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
        // toast.success(data.msg, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 3000,
        // });
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
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Welcome</h1>
      <form onSubmit={submitFormHandler} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={formChangeInputHandler}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={formChangeInputHandler}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <button
          className="text-blue-700 underline cursor-pointer"
          onClick={() => setforgotFlag(!forgotFlag)}
        >
          Forgot Password?
        </button>
        <p>New User?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
      {forgotFlag && (
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
            <label
              htmlFor="question1"
              className="text-white text-xl block mb-1"
            >
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
            <label
              htmlFor="question2"
              className="text-white text-xl block mb-1"
            >
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
      )}
    </div>
  );
}
