const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://younghawn:5252@reactfirstcluster.ydvor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false <<업데이트이후 필요없음,자동지원
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! gdgㅁㄴㅇㄹㄴd')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})