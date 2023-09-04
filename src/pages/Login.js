import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate()

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsAuth(true)
        navigate("/")
        localStorage.setItem('isAuth', true)
        // console.log(result.user)
      })
      // .catch((error) => {
      //   console.log(error.message)
      // }) 
  };
  return (
    <div className='loginPage'>
      <p>Sign In</p>
      <button 
        className='login-with-google-btn' 
        // style={{height:'40px', width:'40px'}}
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </button>
    </div>
  )
}

export default Login