//https://medium.com/@unhinged-magikarp/how-to-build-a-rest-api-with-express-and-sequelize-67d2593de159
const express = require("express");
const port = process.env.PORT || 3000;

const memberRoutes = require('./routes/memberRoutes.js')

const app = express();

app.use('/api/members', memberRoutes)

app.listen(port, () => console.log(`Server started on ${port}`));
