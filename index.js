const express = require('express')
const request = require('request')
const app = express()
const dotenv = require('dotenv')
dotenv.config() // env variables depend on Execution Context(npm i dotenv)
//asks express js to look for a folder views
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    //console.log(req)
    res.render("homepage")
})

app.get("/result", (req, res) => {
    console.log(req.query.movieName) //Data in query string is displayed here
    //console.log(process.env.API_KEY)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
           // console.log(data)
            if(data.Response==='False'){
               res.send("Movie not found!")
            }else{
            res.render("result", { movieData: data }) //Storing data in movieData to use in result.ejs 
        }
        }else {
            res.send("Some Error occured")
        }
    })
})
app.get("/result/:id", (req, res) => {
    // console.log(req.query.movieName)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body) //Parsing JSON into JS Objects
            //console.log(data)
            if(data.Response==='False'){
               res.send("Movie not found!")
            }else{
            res.render("Info", {movie:data})
            }
        }
        else {
            res.send("Some Error occured")
        }
    })
})
app.get("*", (req, res) => {
    res.send("You have given a wrong path!")
})
app.listen(process.env.PORT, () => {
    console.log(`Server has started at port ${process.env.PORT}`)
})
/*app.get("/class", (req, res)=>{
    res.send("You are in class now!")
})
app.get("/class/:name", (req, res)=>{
    if(!error){
    res.send(`You are in ${req.params.name} now!`)
    }else{
        res.redirect("/error")
    }
    //console.log(req.params)
})
app.get("/getmovies", (req, res) =>{
    const url = "http://www.omdbapi.com/?i=tt3896198&apikey=270846a7"
    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            const data = JSON.parse(body)
            //console.log(data)
            //res.send(data)
            res.render("Homepage", {movie: data})
        }
        else{
            res.send("Wrong")
        }
    })
})*/