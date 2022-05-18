const graphql = require('graphql');
const objects = require('./objects');
const db = require("../Sequelize");
const joinMonster = require('join-monster').default;
const axios = require("axios");
const config = require("../config/config.js");
const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?appid=${config.OPENWEATHER.key}`;
//const productModels = require('../Sequelize/product.model')

  exports.Queryroot = new graphql.GraphQLObjectType({
          
      name: 'Query',
      fields: () => ({

        locations: {
          type: new graphql.GraphQLList(objects.location),
          args: { 
            city_id: { 
              type: graphql.GraphQLNonNull(graphql.GraphQLInt) 
            } 
          },  
          extensions: {
            joinMonster: {
              where: (location, args, context) => {
                return `${location}.city_id =${args.city_id}`},
            }
          },
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
                return `${location}.location_id =${args.location_id}`},
            }
          },
          resolve: (parent, args, context, resolveInfo) => {
            return joinMonster(resolveInfo, {}, sql => {
              return db.sequelize.query(sql).then(function(result) {
                const lat =  result[0][0].latitude;
                const long = result[0][0].longitude;
                const url = `${openWeatherURL}&lat=${lat}&lon=${long}`;
                var oldResult = result;
        
                async function axiosTest(url) {
                  const promise = axios.get(url)
                      .then( resp => {
                        var data =  (
                          "Conditions right now: " 
                          + resp.data.weather[0].description
                          + " with a temperature of "
                          + Math.round(resp.data.main.temp -273.15 )
                          + " but feels like "
                          + Math.round(resp.data.main.feels_like -273.15 )
                        );
                        return data;
                    })
                    return promise;
                  }
                  let weather = axiosTest(url);
                  return weather.then( function(result){
                    oldResult[0][0].weather = result;              
                    console.log(oldResult[0]);
                    return oldResult[0];
                  })
                  
                
              
              });
            }, 
            {dialect: 'mysql'});
         }
        },

        productsNotInInventory: {
          type: new graphql.GraphQLList(objects.product),
          args: { 
            location_id: { 
              type: graphql.GraphQLNonNull(graphql.GraphQLInt) 
            } 
          },
          extensions: {
            joinMonster: {
              where: (product, args, context) => {
                return `sku NOT IN (SELECT sku FROM inventory WHERE location_id= ${args.location_id} )`},
            }
          },
          resolve: (parent, args, context, resolveInfo) => {  
            return joinMonster(resolveInfo, {}, sql => {
              return db.sequelize.query(sql).then(function(result) {
                console.log(result[0]);
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
                return result[0]
              });
            }, 
            {dialect: 'mysql'});
         }
        }
      })
      
    })

  
  