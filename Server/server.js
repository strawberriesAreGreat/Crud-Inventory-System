//Express.js server file root
const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const graphql = require('graphql')
const db = require("./models");
const joinMonster = require('join-monster').default;


//Creating a fresh DB 
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});



//variables 
const PORT = process.env.PORT || 8080;

const location = new graphql.GraphQLObjectType({
  name: 'location',
  extensions: {
    joinMonster: {
      sqlTable: "location", // the SQL table is on the schema "public" called "Accounts"
      uniqueKey: 'location_id'
    }
  },
  fields: () => ({
    location_id: { type: graphql.GraphQLInt },
    location: { type: graphql.GraphQLString },
    //latitude: { type: graphql.GraphQLString },
    //longitude: { type: graphql.GraphQLString },
   // Coordinates: {
   //   type: Team,
   //   sqlJoin: (playerTable, teamTable, args) => `${playerTable}.team_id = ${teamTable}.id`
   // }
  })
});   



//GraphQL Variables 
const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      hello: {
        type: graphql.GraphQLString,
        resolve: () => "Hello world!"
      },
      location: {
        type: new graphql.GraphQLList(location),


        resolve: (table, args, context, resolveInfo) => {
          return joinMonster(resolveInfo, {}, sql => {
            return db.sequelize.query(sql).then(function(result) {
              return result[0];
            });
          }, {dialect: 'mysql'});
        }


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

app.listen(PORT);