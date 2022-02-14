//로그인이랑 레지스터 기능만들때 하나하나씩 적음
import{
    LOGIN_USER
} from '../_actions/types';

export default function (state={}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload} 
            //... 란 프레드 오퍼레이터로 똑같이 가져오는거(현재는 빈상태로 그대로) 
            //여기서 action.payload란 서버의 값을 가져온것.
            break;
    
        default:
            return state;
    }
}