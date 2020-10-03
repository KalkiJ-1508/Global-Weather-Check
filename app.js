const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "0237de83fc9ebf77d93811ff5cd1df99";
    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid="+apiKey+"&q="+query;
    https.get(url, function(response){
    console.log("responseStatus:" + response.statusCode);

    response.on("data", function(data){

        const weatherData = JSON.parse(data);
        const weatherTemp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;
        const imgURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

        res.write("<h1>The temperature in "+ query +" is " + weatherTemp + " degree Celsius</h1>");
        res.write("<h2> The weather is currently " + weatherDescription + "</h2>");     
        res.write("<img src=" + imgURL + ">");

        res.send();

    })
})
});


app.listen(3000, function(){
    console.log("Server is running");
})