//Express.js server file root
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const graphql = require('graphql');
const db = require("./Sequelize");
const joinMonster = require('join-monster').default;
const s = require('./GraphQL/schema');
const config = require('./config/config')


db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

//port 
const PORT = process.env.PORT || config.EXPRESS.PORT;

//Express Server Initialization 
const app = express();
var cors = require('cors');
app.use(cors());

app.use('/api', graphqlHTTP({
  schema: s.schema,
  graphiql: true,
}));

app.listen(PORT);