const express = require('express');
const route = require('./app/routes/routes.js');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.header('Access-control-Allow-Origin', 'http://localhost:3000');
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
  });

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use('/api', route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
