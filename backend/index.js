const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

/* For production */
const path = require('path');

//Config
require('dotenv').config({ path: './config/config.env' });


// Handling Uncaught Exception
process.on("uncaughtException" , (err)=> {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to the Uncaught Exception`);

  process.exit(1);
})

// Config
// if(process.env.NODE_ENV !== "PRODUCTION"){
//   require("dotenv").config({path: "backend/config/config.env"});
// }

const errorMiddleware = require('./middleware/error');

connectToMongo();
const app = express();
// const PORT = 4000;


const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Available Routes
app.use('/api/v1' , require('./routes/userRoute'))

/* For production */
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

// Middleware for errors
app.use(errorMiddleware)

const server = app.listen(process.env.PORT, () => {
    console.log(`Mern Project backend listening at http://localhost:${process.env.PORT}`)
  })

// Unhandled Promise Rejection
process.on("unhandledRejection" , (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to the unhandled Promise Rejection`);

  server.close(()=>{
    process.exit(1);
  })
})