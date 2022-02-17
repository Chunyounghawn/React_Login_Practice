import Axios from "axios";
import{
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataTosubmit){
    const request = Axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data) //서버에서 받은 data를 request에 저장

    //redux특성상 action 다음에 reducer에 보내야함
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit){
    const request = Axios.post('/api/users/register', dataTosubmit)
    .then(response => response.data) 

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){ //get메소드라 body부분은 필요없음
    const request = Axios.get('/api/users/auth')
    .then(response => response.data) 

    return {
        type: AUTH_USER,
        payload: request
    }
}


