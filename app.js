const express = require("express");
const port = 8000;

const app = express();

app.get("/", function(request, response){
    response.send("Super Sprint 300")
})

app.listen(port, (err) => {
    if(err) {
        return console.log("something went wrong");
    }
        console.log("server starting on port 8000...")
})