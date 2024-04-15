const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const {configureDB} = require('./config/mongoose.config');
configureDB();

const {productRouter} = require('./routes/productRouter');
app.use("/product/", productRouter);

app.listen(8000, () => {console.log("Listening at Port 8000")})