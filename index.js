const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require("./routers/user")
require('dotenv').config({ path: __dirname + '/config/.env' })


require("./config/db")

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers you allow
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Methods you allow
};


app.use(cors(corsOptions));

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());





// app.use(function (req, res, next) {
//   const allowedOrgins = ['http://localhost:3000', 'http://localhost:3000'];
//   const origin = req.headers.origin;
//   if (allowedOrgins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next();
// })

app.use(cookieParser());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
