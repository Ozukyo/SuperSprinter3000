const express = require("express");
const fs = require("fs");
const csv = require('csv-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const bodyParser = require("body-parser");

const port = 8000;

const app = express();
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));


//Parse a data from csv
function getCsvArrayData() {
    let results = [];

    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
        console.log(results);
        });
    return results;
}

// Creating table and returning outer html
function getHtmlFilledContent() {
    let results = getCsvArrayData();

    return JSDOM.fromFile("views/index.hbs").then(dom => {
        console.log(dom.window.document.querySelector("title").textContent);
        const table = dom.window.document.querySelector("table");
        results.forEach(data => {
            const row = dom.window.document.createElement("tr");

            const id = dom.window.document.createElement("td");
            id.textContent = data.id;
            row.appendChild(id);

            const s_title = dom.window.document.createElement("td");
            s_title.textContent = data.story_title;
            row.appendChild(s_title);

            const u_story = dom.window.document.createElement("td");
            u_story.textContent = data.user_story;
            row.appendChild(u_story);

            const a_criteria = dom.window.document.createElement("td");
            a_criteria.textContent = data.acceptance_criteria;
            row.appendChild(a_criteria);

            const b_value = dom.window.document.createElement("td");
            b_value.textContent = data.business_value; 
            row.appendChild(b_value);

            const estimation = dom.window.document.createElement("td");
            estimation.textContent = data.estimation;
            row.appendChild(estimation);

            const status = dom.window.document.createElement("td");
            status.textContent = data.status;
            row.appendChild(status);
            
            table.appendChild(row);

        });

        return dom.window.document.documentElement.outerHTML;
    })
}



/////////// GETS
app.get("/", function(request, response){
    getHtmlFilledContent().then(result => {
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(result);  
        response.end();  
    })
})

app.get("/list", function(request, response){

    getHtmlFilledContent().then(result => {
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(result);  
        response.end();  
    })
})

app.get("/story", function(request, response) {
    response.render("story");
})

// Launching server
app.listen(port, (err) => {
    if(err) {
        return console.log("something went wrong");
    }
        console.log("server starting on port 8000...")
})