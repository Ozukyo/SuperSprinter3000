const express = require("express");
const routes = require("./routes/userStories");
const path = require('path');

const PORT = process.env.PORT || 8000;
const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route handlers
app.use("/", routes);





app.listen(PORT, function () {
    console.log(`server started on port ${PORT}...`);
})