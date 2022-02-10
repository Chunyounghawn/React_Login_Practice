const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //내가 아는 그 trim 공백없애는거
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0 //0이 일반사용자
    },
    image: String,
    token: { //유효성 관리용
        type: String
    },
    tokenExp: { //유효성 유효기간
        type: Number
    }
})

//몽구스 메소드, save 하기전에 하는것
userSchema.pre('save', function (next) {

    var user = this;

    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다. salt를 만들어 암호화함. salt=암호화된 코드
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

userSchema.methods.comparePassword = function (plainPassword, cb) {

    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
            cb(null, isMatch)
    })

}

userSchema.methods.generateToken = function(cb){

    var user = this;

    //jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretTokenhaha')

/*  user._id + 'secretTokenhaha' = token
    ->
    'secretTokenhaha' -> user._id 
*/
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })

}

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


const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸기.

module.exports = { User } //다른곳에서도 쓸수있게