//import { Axios } from 'axios'
//import { response } from 'express'
import {useDispatch} from 'react-redux'
import React, { useState } from 'react'
import {loginUser} from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
//import { response } from 'express';
import Auth from '../../../hoc/auth'

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("young1@naver.com")
  const [Password, setPassword] = useState("1123456")
  
  const onEmailHandler=(event) => {
    setEmail(event.currentTarget.value)
  } 

  const onPasswordHandler=(event) => {
    setPassword(event.currentTarget.value)
  } 


  let navigate = useNavigate();
  const onSubmitHandler=(event) => {
    event.preventDefault(); //안해주면 클릭하면 계속 페이지 리프레쉬됨.
    

    let body = {
      email: Email,
      password: Password
    }

    
    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess){
        navigate('/')
      }else{
        alert('Error')
      }
    })

    
  } 

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection:'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
          Login
        </button>
      </form>

    </div>
  )
}

export default Auth( LoginPage, false );