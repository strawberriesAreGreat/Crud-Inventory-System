const graphql = require('graphql');

const q = require( "./query_root");
const m = require( "./mutation_root" );

 
exports.schema = new graphql.GraphQLSchema({

    query: q.Queryroot,
    mutation: m.MutationRoot

})
