const graphql = require('graphql');
const objects = require('./objects');
const db = require("../Sequelize");
const joinMonster = require('join-monster').default;
const axios = require("axios");
const config = require("../config/config.js");
const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=${config.OPENWEATHER.key}`;

  exports.Queryroot = new graphql.GraphQLObjectType({
          
      name: 'Query',
      fields: () => ({

        locations: {
          type: new graphql.GraphQLList(objects.location),
          resolve: (table, args, context, resolveInfo) => {
            return joinMonster(resolveInfo, {}, sql => {
              return db.sequelize.query(sql).then(function(result) {
                return result[0];
              });
            }, {dialect: 'mysql'});
          }
        },
        location: {  
          type: new graphql.GraphQLList(objects.location),
          args: { 
            location_id: { 
              type: graphql.GraphQLNonNull(graphql.GraphQLInt) 
            } 
          },
          extensions: {
            joinMonster: {
              where: (location, args, context) => {
                return `${location}.location_id = ${args.location_id}`},
            }
          },
          resolve: (parent, args, context, resolveInfo) => {
            return joinMonster(resolveInfo, {}, sql => {
              return db.sequelize.query(sql).then(function(result) {
                console.log(result[0]) ;
                return result[0];
              });
            }, 
            {dialect: 'mysql'});
         }



        },

        inventory: {
          type: new graphql.GraphQLList(objects.inventory),
          args: { 
            location_id: { 
              type: graphql.GraphQLNonNull(graphql.GraphQLInt) 
            } 
          },
          extensions: {
            joinMonster: {
              where: (inventory, args, context) => {
                return `${inventory}.location_id = ${args.location_id}`},
            }
          },
          resolve: (parent, args, context, resolveInfo) => {
            return joinMonster(resolveInfo, {}, sql => {
              return db.sequelize.query(sql).then(function(result) {
                return result[0];
              });
            }, 
            {dialect: 'mysql'});
         }
        },

        transaction: {
          type: new graphql.GraphQLList(objects.inventory),
          args: { 
            location_id: { 
              type: graphql.GraphQLNonNull(graphql.GraphQLInt) 
            } 
          },
          extensions: {
            joinMonster: {
              where: (inventory, args, context) => {
                return `${inventory}.location_id = ${args.location_id}`},
            }
          },
          resolve: (parent, args, context, resolveInfo) => {
            return joinMonster(resolveInfo, {}, sql => {
              return db.sequelize.query(sql).then(function(result) {
                return result[0];
              });
            }, 
            {dialect: 'mysql'});
         }
        },

        getWeather: {
          type: new graphql.GraphQLList(objects.weather),
          args: { 
            lat: { type: graphql.GraphQLNonNull(graphql.GraphQLFloat) },
            lon: { type: graphql.GraphQLNonNull(graphql.GraphQLFloat) }
          },
          resolve: (parent, args, context,) => {
          const { lat, lon } = args;
          let url = `${openWeatherURL}&lat=${lat}&lon=${lon}`;

              axios.get(url)
              .then( resp => {

                console.log(resp.data);
                return resp.data;
                
            }).catch (err => {
              console.log(err);
              console.error("OOPS. Something went wrong with your query to Open Weather!")
            })
      }
    }



      })
      
    })

  
  