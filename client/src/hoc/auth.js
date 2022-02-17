
import React, { useEffect } from 'react';
import {auth} from '../_actions/user_action'; 
import { useDispatch } from 'react-redux';

export default function (SpecificComponent, option, adminRoute = null){

    /*
    option 옵션
    null = 아무나 출입이 가능한 페이지
    true = 로그인한 유저만 출입이 가능한 페이지
    false = 로그인한 유저는 출입 불가능한 페이지
    */

    function AuthenticationCheck(props){
        const dispatch = useDispatch()

        useEffect(() => {

            //user_action이름 auth 지정(자유)
            dispatch(auth()).then(response => {
                console.log(response)
            })

        })

        return(
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}