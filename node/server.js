//https://medium.com/@unhinged-magikarp/how-to-build-a-rest-api-with-express-and-sequelize-67d2593de159
const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const memberRoutes = require('./routes/memberRoutes.js')
const authRoutes = require('./routes/authenticateRoutes.js')
const transactionRoutes = require('./routes/transactionRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const productPriceRoutes = require('./routes/productPriceRoutes.js')

const cors = require('cors');

const app = express();

var corsOptions = {

    origin: true,
    credentials: true,
    allowedHeaders: [
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, Accepts, content-type",
    ],
    exposedHeaders: [
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, Accepts, content-type",
    ],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/authenticate', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/products', productRoutes)
app.use('/api/productPrice', productPriceRoutes)

app.listen(port, () => console.log(`Server started on ${port}`));
