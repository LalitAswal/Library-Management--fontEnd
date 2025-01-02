import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export const RegistrationPage = () => {


  const dispatch = useDispatch(); 

    const [ registrationForm, setRegistrationForm ] = useState({
        userName:"",
        password:"",
    })

    const handleRegistration = async(e)=>{
        e.preventDefault();
        try {
          // const result = await dispatch(registerUser(registrationForm))

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
    <form action="" method="post">
    <label htmlFor="">
      username:
      <input type="text"
      name="username"
      value={registrationForm?.userName} />
      onChange={handleChange}
      required
    </label>
    password:
    <label htmlFor="">
      <input type="text"
      name="password"
      value={registrationForm?.password} />
      onChange={handleChange}
      required
    </label>
    </form>
    </>
  )
}
