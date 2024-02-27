import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import {useNavigate} from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';
import {useDispatch} from 'react-redux'

export default function OAuth() {
    const dispatcher = useDispatch();
    const navigator = useNavigate();

    const GbuttonClick = async () => {

        try {
            const GoogleProv = new GoogleAuthProvider();
            const auth = getAuth(app)
    
            const response = await signInWithPopup(auth,GoogleProv);
    
            const dataResp = await fetch('/api/v1/auth/google', {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    name:response.user.displayName,
                    email:response.user.email,
                    photo: response.user.photoURL,
                })
            });
    
            const dataJson = await dataResp.json();
            dispatcher(signInSuccess(dataJson));
            navigator("/");
    
        }
    
        catch(err) {
            console.log('Failed to sign in');
        }
    };
  return (
    <button onClick={GbuttonClick}
    type='button'
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
        Google sign-in
    </button>
  )
}
