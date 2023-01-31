require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./routers');
const errorHandler = require('./middlewares/errorHandler');

const PORT = 3000;

app.use(cors());

app.use(express.json()); // On active le décodeur de JSON pour le req.body

app.use(router);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
})