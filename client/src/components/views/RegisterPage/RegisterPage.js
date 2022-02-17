import {useDispatch} from 'react-redux'
import React, { useState } from 'react'
import {registerUser} from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import Auth from 'C:/react_practice/client/src/hoc/auth'

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler=(event) => {
    setEmail(event.currentTarget.value)
  } 

  const onNameHandler=(event) => {
    setName(event.currentTarget.value)
  } 

  const onPasswordHandler=(event) => {
    setPassword(event.currentTarget.value)
  } 

  const onConfirmPasswordHandler=(event) => {
    setConfirmPassword(event.currentTarget.value)
  } 

  


  let navigate = useNavigate();
  const onSubmitHandler=(event) => {
    event.preventDefault(); //안해주면 클릭하면 계속 페이지 리프레쉬됨.
    
    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야합니다.')
    }

    let body = {
      email: Email,
      name: Name,
      password: Password
    }

    
    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success){ 
        //success라는것은 서버에서 T,F 주는것을 프론트엔드에서 response.payload.success로 받는것.
        //즉, success 이름은 상관없음.
        alert("회원가입성공")
        navigate("/login")
      } else{
        alert("Failed to sign up")
      }
    })

  } 


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection:'column' }}
        onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button type="submit">
          회원가입
        </button>
      </form>

    </div>
  )
}

export default Auth( RegisterPage, null );