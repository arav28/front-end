import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

export default function SignUp() {
  const [formDataValues,setFormDataValues] = useState({});
  const [loadFlag, setloadFlag] = useState(false);
  const navigator = useNavigate();

  const changeHandler = (event) => {
      setFormDataValues({
        ...formDataValues,
        [event.target.id]:event.target.value,
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
      setloadFlag(true)
      // result obj calls fetch
      setTimeout(() => {
        setloadFlag(false);
        navigator('/sign-in');
        console.log('form submitted');
      }, 3000);
      
    } 
    catch(e) {
      setLoading(false);
      console.log(e);
    }
  }
  return (
    <div className='bg-gray-800 min-h-screen flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-xl'>
        <h1 className='text-3xl text-gray-800 font-semibold mb-7 text-center'>Create a New Account</h1>
        <form className='flex flex-col gap-4' onSubmit={submitHandler}>
          <input type="text" placeholder='Username' className='border p-3 rounded-lg' id="username" onChange={changeHandler}/>
          <input type="email" placeholder='Email' className='border p-3 rounded-lg' id="email" onChange={changeHandler}/>
          <input type="password" placeholder='Password' className='border p-3 rounded-lg' id="password" onChange={changeHandler}/>
          <button disabled={loadFlag} className='bg-blue-600 text-white p-3 rounded-lg uppercase font-semibold hover:bg-blue-700 disabled:opacity-80'>{loadFlag?'Signing in..':'Sign in'}</button>
        </form>
        <div className='flex gap-1 mt-6 text-center'>
          <p>Have an account already?</p>
          <Link to={"/sign-in"}>
            <span className='text-blue-600'>Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
