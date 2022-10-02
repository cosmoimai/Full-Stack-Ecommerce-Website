const express = require("express");
const app = express()
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")

//Config
dotenv.config({
    path: "backend/config/config.env"
})

app.use(express.json()) //express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(cookieParser()); //Create a new cookie parser middleware function using the given secret and options.
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileUpload()); //middleware for Express framework that provides you with an easy way to handle file upload using the Express framework.


//Routes Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")

// console.log("i am in app.js")
app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for error 
app.use(errorMiddleware);

module.exports = app