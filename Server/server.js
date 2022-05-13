//Express.js server file root
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const graphql = require('graphql')
const cors = require("cors");
const db = require("./app/models");

//variables 
const PORT = process.env.PORT || 8080;



//GraphQL Variables 
const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      hello: {
        type: graphql.GraphQLString,
        resolve: () => "Hello world!"
      }
    })
  })



//Schema Instantiation 
const schema = new graphql.GraphQLSchema({ query: QueryRoot });



//Express Server Initialization 
const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

var corsOptions = {
    origin: `http://localhost:${PORT}`
};


db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.listen(PORT);