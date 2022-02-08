const express = require('express')
const app = express()
const port = 3000
const {User} = require("./models/User")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const config = require("./config/key")

//application/x-www.form-urlencoded 된데이터(타입)를 분석해서 가져올수있게 해줌
app.use(bodyParser.urlencoded({extended: true}))
//application/json 타입된걸 분석해서 가져올수있게해줌 
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false <<업데이트이후 필요없음,자동지원
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! gdgd')
})


app.post('/register', (req, res) => {

  //회원 가입할때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  })
})

app.post('/login', (req, res) => {

  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인한다. 위에 !user랑 이어짐  
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다."
      })

      //비밀번호까지 맞다면 토큰 생성하기. user안에 저장(User.js에서 받아옴).
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err)

        //토큰을 저장한다. 어디에? 쿠키나 로컬스토리지 가능하지만 여기선 쿠키
        res.cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id 
        })
      })

    })

  })

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})