const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const path = require('path');
const app = express()
app.use(express.json())
dotenv.config()
var allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:4300",
  "http://localhost:3000",

];
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/auth',require('./routes/auth'))
app.use('/api/shop',require('./routes/shop'))
app.use('/api/upload',require('./routes/upload'))





app.listen(2121,()=>{console.log("port 2121 is WORKING")})

process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
  
  process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
  });