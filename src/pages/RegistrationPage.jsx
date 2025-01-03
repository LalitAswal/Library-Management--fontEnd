import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAction } from '../Redux/features/action/authAction.js';

export const RegistrationPage = () => {


  const dispatch = useDispatch(); 

    const [ registrationForm, setRegistrationForm ] = useState({
        userName:"",
        password:"",
    })

    const { loading, message, status } = useSelector((state) => state.register);


    const handleRegistration = async(e)=>{
        e.preventDefault();
        try {
          const result = await dispatch(userRegisterAction(registrationForm))

        } catch (error) {
          console.log(error)
        }
    }

    const handleChange=(e)=>{
      const {name, value} = e.target;
      setRegistrationForm((preState)=>({
        ...preState,
        [name]:value
      }))
    }

  return (
    <>
    <form  onSubmit={handleRegistration}>
    <label >
      username:
      <input 
      type="text"
      id="userName"
      name="userName"
      value={registrationForm?.userName}
      onChange={handleChange}
       />
      
    </label>
    password:
    <label >
      <input type="password"
      name="password"
      
      id="password"
      value={registrationForm?.password}
      onChange={handleChange}
       />
    </label>
    <button type='submit'>Submit</button>
    </form>
    {message && <p>{message}</p>}
    </>
  )
}
