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
import ForgotPassword from "./ForgotPassword";

export default function SignUp() {
  const [formValues, setFormValues] = useState({});
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
      console.log("try console", data);
      if (data.status_code === 401) {
        dispatchAction(FailedSign(data.message));
        return;
      } else if (data.status_code === 200) {
        dispatchAction(signInSuccess(data));
        navigator("/");
      }
    } catch (err) {
      dispatchAction(FailedSign(err.message));
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
      {forgotFlag && <ForgotPassword />}
    </div>
  );
}
