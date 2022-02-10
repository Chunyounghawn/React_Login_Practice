const { User } = require("../models/User");

//인증 처리를 하는곳
let auth = (req, res, next) => {
    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth; //토큰을 쿠키에서 가져옴, req.cookies가 쿠키파서에 있는 메소드임.어디내가 지정해준게아니라.
    

    //토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next(); //next 쓰는이유 : 미들웨어에서 갈수있게, 루프안돌게.
    })

    //유저가 있으면 인증 O

    //유저가 없으면 인증 X

}

module.exports = {auth}