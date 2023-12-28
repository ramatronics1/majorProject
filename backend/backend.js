const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors');
require('dotenv').config();



const routes = require('./auth/routes')
const clientRoutes = require('./auth/clientRoutes')

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));
  app.use(routes)
  app.use(clientRoutes)
  
mongoose.connect('mongodb://localhost:27017/majorproject')
    .then(()=>{
        console.log('database connected');
    })
    .catch(err=>{
        console.log(err);
    })

   


app.listen(5000,'192.168.1.42' ,()=>{
    console.log('server running')
})