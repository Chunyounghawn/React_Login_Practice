## 로그인 예제 연습  
### 사용기술  
- mongodb  
- node  
- react  

### 핵심 라이브러리  
- jsonwebtoken  
- mongoose  
- bcrypt  

서버와 클라이언트 형식의 프로젝트 제작.

### bcrypt
bcrypt를 통한 패스워드 암호화 소스코드
```js
//몽구스 메소드, save 하기전에 하는것
userSchema.pre('save', function (next) {
//next는 미들웨어 단계에서 이거 다하면 next?라고 생각하면될듯.
    var user = this;

    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다. salt를 만들어 암호화함. salt=암호화된 코드
        //isModified는 몽구스 함수
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})
```

### 토큰을 이용한 인증방식
```js
//jsonwebtoken을 이용해서 token 생성하기
var token = jwt.sign(user._id.toHexString(), 'secretTokenhaha')

-------------------------------------------------------------------------------------
//토큰 복호화 하는 과정
userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretTokenhaha', function(err, decoded) {
        //유저아이디(decoded)를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 db에 보관된 토큰이 일지하는지 확인

        user.findOne({"_id" : decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
    
}
```


이후 쿠키를 통한 인증 및 권한 부여  
![image](https://user-images.githubusercontent.com/83907810/180106160-73df2daf-0b4d-467b-abcc-911ba027e692.png)


## 시연영상
https://user-images.githubusercontent.com/83907810/180108739-cf52657e-fb0c-488f-95f6-283b9e2a28d2.mp4




























------------------------------------------------------------------------------------

이 어플리케이션을 사용하기 위해선 

1. dev.js file을 config 폴더 안에 생성해주세요.  
2. mongoDB 정보를 dev.js file안에다가 넣어주세요. 
3. " npm install "을 root directory에서 입력해주세요.  (백엔드 종속성 다운받기) 
4. " npm install "을 client directory에서 입력해주세요.  (프론트엔드 종속성 다운받기) 
