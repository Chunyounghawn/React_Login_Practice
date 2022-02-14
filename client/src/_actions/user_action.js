import Axios from "axios";
import{
    LOGIN_USER
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