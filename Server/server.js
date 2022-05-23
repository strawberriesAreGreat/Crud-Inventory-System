
require('dotenv').config({
  path: '../.env'
});

//Express.js server file root
const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const graphql = require('graphql');
const db = require("./Sequelize");
const joinMonster = require('join-monster').default;
const s = require('./GraphQL/schema');

// Only run the following if you're planning on erasing the database
/* 
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/

//Express Server Initialization 
const app = express();
var cors = require('cors');
app.use(cors());

app.use('/api', graphqlHTTP({
  schema: s.schema,
  graphiql: true,
}));

app.listen(2000);
console.log("listening");