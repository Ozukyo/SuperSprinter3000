const express = require("express");
const fs = require("fs");
const csv = require('csv-parser')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jquery = require("jquery");
// const $ = require( "jquery");


const port = 8000;

const app = express();
app.set("view engine", "hbs");

//Parse a data from csv
const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);

  });

// Creating table and writing it into index.hbs
JSDOM.fromFile("views/index.hbs").then(dom => {
    console.log(dom.window.document.querySelector("title").textContent);
    const table = dom.window.document.querySelector("table");
    results.forEach(data => {
        const row = dom.window.document.createElement("tr");

        const id = dom.window.document.createElement("td");
        id.textContent = data.id;
        row.appendChild(id);
        // console.log(id.textContent);

        const s_title = dom.window.document.createElement("td");
        s_title.textContent = data.story_title;
        row.appendChild(s_title);

        const u_story = dom.window.document.createElement("td");
        u_story.textContent = data.user_story;
        row.appendChild(u_story);
        // console.log(u_story.textContent);

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

        let content = dom.window.document.documentElement.outerHTML;
        
        //clearing pravious content
        // fs.writeFile("views/index.hbs", "", function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        // });

        fs.writeFile("views/index.hbs", content, function(err) {
            if(err) {
                return console.log(err);
            }
        });
    });
    

})

// results.forEach(data => {
//     $("#my-table").append(`
//     <tr>
//     <td>${data.id}</td>
//     <td>${data.story_title}</td>
//     <td>${data.user_story}</td>
//     <td>${data.acceptance_criteria}</td>
//     <td>${data.business_value}</td>
//     <td>${data.estimation}</td>
//     <td>${data.status}</td>
//     </tr>`);
// }

//Create table 
function createTable(data) {
  


}


/////////// GETS
app.get("/", function(request, response){
    response.render("index");
})

app.get("/list", function(request, response){
    response.render("index");
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