import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [formValues, setFormValues] = useState({});
  const [errMsg, setErrMsg] = useState(null);
  const [flagLoad, setLoadFlag] = useState(false);
  const navigator = useNavigate();
  const formChangeInputHandler = (event) => {
    setFormValues({
      ...formValues,
      [event.target.id]: event.target.value,
    });
  };
  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      setLoadFlag(true);
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoadFlag(false);
        setErrMsg(data.message);
        return;
      }
      setLoadFlag(false);
      setErrMsg(null);
      navigator('/sign-in');
    } catch (errMsg) {
      setLoadFlag(false);
      setErrMsg(errMsg.message);
    }
  };
  return (
    <div className=' p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create New Account</h1>
      <form onSubmit={submitFormHandler} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={formChangeInputHandler}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={formChangeInputHandler}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={formChangeInputHandler}
        />

        <button
          disabled={flagLoad}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {flagLoad ? 'Loading...' : 'Sign up'}
        </button>
      
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Log in</span>
        </Link>
      </div>
      {errMsg && <p className='text-red-500 mt-5'>{errMsg}</p>}
    </div>
  );
}