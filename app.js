require("dotenv").config()
const router = require("express").Router()
const express = require("express")
const cors = require("cors")
const app = express()
const {db} = require("./db/db")
const PORT  = process.env.PORT
const {readdirSync} = require("fs")
const passport = require("passport")
require("./auth")
const session = require('express-session')
app.use(express.json())
app.use(cors())
app.use(session({secret: "cats"}))
app.use(passport.initialize())
app.use(passport.session())

function isLoggedIn(req,res,next){
    req.user ? next(): res.sendStatus(401)
}

//routes 
readdirSync("./routes").map((route) => app.use("/api/v1", require("./routes/"+ route)))


app.get("/", (req,res) => {
    res.send('<a href="/auth/google">Log in</a>')
})
app.get("/protected" , isLoggedIn, (req,res) =>{
    res.send("Protected")
})
app.get("/google/callback", 
    passport.authenticate("google", {successRedirect: "/protected", failureRedirect: "/auth/faliure"})
)
app.get("/auth/faliure", (req,res) =>{

    res.send("something went wrong")
})
app.get("/auth/google" , passport.authenticate("google", {scope: ['email', 'profile']}))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log(`running on ${PORT}`)
    })
}
server()