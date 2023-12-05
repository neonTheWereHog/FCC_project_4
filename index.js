const express = require('express')
const mongoose = require("mongoose")
const app = express()
const cors = require('cors')
require('dotenv').config()
const { 
  createNewUser,
  getUsers, 
  listExercise, 
  deleteUser,
  getLogs } = require("./funcsAndControllers/controllers.js")

mongoose.connect(
  "mongodb+srv://free_code_camp_camper:3CODE_CAMP_PR0JECT@freecodecampproj.ns253mh.mongodb.net/?retryWrites=true&w=majority",
   { useNewUrlParser: true, useUnifiedTopology: true }
)

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get("/api/users", getUsers)

app.post("/api/users", createNewUser)

app.post("/api/users/:_id/exercises", listExercise)
app.post("/api/users//exercises", listExercise)


app.get("/api/users/delete/:id", deleteUser)

app.get("/api/users/:_id/logs", getLogs)





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
