const graphql = require('graphql');
var GraphQLDate = require('graphql-date');

  const city = new graphql.GraphQLObjectType({
    name: 'city',
    extensions: {
      joinMonster: {
        sqlTable: "city", 
        uniqueKey: 'city_id',
      }
    },
    fields: () => ({
      city_id: { type: graphql.GraphQLInt },
      name: { type: graphql.GraphQLString },
      phone: { type: graphql.GraphQLString },
      email: { type: graphql.GraphQLString },
      locations: {
        type:  new graphql.GraphQLList(location), 
        extensions: {
          joinMonster: {
            sqlJoin: (city, location, args) => `${city}.city_id = ${location}.city_id`
            
            }
          }
      },
      inventory: {
        type:  new graphql.GraphQLList(inventory), 
        extensions: {
          joinMonster: {
            sqlJoin: (location, inventory, args) => `${location}.location_id  = ${inventory}.location_id `
            }
          }
      },
      transactions: {
        type:  new graphql.GraphQLList(transaction), 
        extensions: {
          joinMonster: {
            sqlJoin: (location, transaction, args) => `${location}.location_id  = ${transaction}.location_id `
            }
          }
      },
    })
  });   
  
  const location = new graphql.GraphQLObjectType({
    name: 'location',
    extensions: {
      joinMonster: {
        sqlTable: "location",
        uniqueKey: 'location_id',      
      }
    },
    fields: () => ({
      location_id: { type: graphql.GraphQLInt },
      country: { type: graphql.GraphQLString },
      region: { type: graphql.GraphQLString },
      city: { type: graphql.GraphQLString },
      street: { type: graphql.GraphQLInt },
      zipCode: { type: graphql.GraphQLString },
      latitude: { type: graphql.GraphQLString },
      longitude: { type: graphql.GraphQLString },
      weather: { type: graphql.GraphQLString },
      city: {
        type: city,
        sqlJoin: (location, city, args) => `${location}.city_id = ${city}.city_id`
      }
    })
  });   

   
const inventory = new graphql.GraphQLObjectType({
  name: 'inventory',
    extensions: {
      joinMonster: {
        sqlTable: "inventory",
        uniqueKey: ['location_id','sku'],      
      }
    },
    fields: () => ({
      location_id: { type: graphql.GraphQLInt },
      sku: { type: graphql.GraphQLInt},
      stock: { type: graphql.GraphQLInt },
      
      product: {
        type:  new graphql.GraphQLList(product), 
        extensions: {
          joinMonster: {
            sqlJoin: (inventory, product, args) => `${inventory}.sku = ${product}.sku`      
            }
          }
      }
    })
  });   

  const product = new graphql.GraphQLObjectType({
    name: 'product',
      extensions: {
        joinMonster: {
          sqlTable: "product",
          uniqueKey: 'sku',      
        }
      },
      fields: () => ({
        name: { type: graphql.GraphQLString },
        sku: { type: graphql.GraphQLInt},
        description: { type: graphql.GraphQLString },
        price: { type: graphql.GraphQLInt },
        rating_rate: { type: graphql.GraphQLInt },
        rating_count: { type: graphql.GraphQLInt },
        category: { type: graphql.GraphQLString },
      })
});   
   
const transaction = new graphql.GraphQLObjectType({
  name: 'transaction',
    extensions: {
      joinMonster: {
        sqlTable: "transaction",
        uniqueKey: ['transaction_id'],      
      }
    },
    fields: () => ({
      transaction_id: { type: graphql.GraphQLInt },
      dateTime: { type: GraphQLDate},
      paymentMethod: { type: graphql.GraphQLString },
      location: {
        type:  new graphql.GraphQLList(location), 
        extensions: {
          joinMonster: {
            sqlJoin: (inventory, location, args) => `${inventory}.location_id = ${location}.location_id`      
            }
          }
      },
      item:{
        type:  new graphql.GraphQLList(item), 
        extensions: {
          joinMonster: {
            sqlJoin: (inventory, item, args) => `${inventory}.transaction_id = ${item}.transaction_id`      
            }
          }
      }
    })
  });   

  const item = new graphql.GraphQLObjectType({
    name: 'item',
      extensions: {
        joinMonster: {
          sqlTable: "item",
          uniqueKey: ['sku','transaction_id'],      
        }
      },
      fields: () => ({
        sku: { type: graphql.GraphQLInt},
        transaction_id: { type: graphql.GraphQLInt },
        volume: { type: graphql.GraphQLInt },
        product:{
              type:  new graphql.GraphQLList(product), 
              extensions: {
                joinMonster: {
                  sqlJoin: (item, product, args) => `${item}.sku = ${product}.sku`      
                  }
                }
        }
      })
});  
const weather = new graphql.GraphQLObjectType({
  name: 'weather',
  fields: () => ({

    description: { type: graphql.GraphQLString },


    /*
      main: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    icon: { type: graphql.GraphQLString },
    humidity: { type: graphql.GraphQLInt },
    temp: { type: graphql.GraphQLFloat },
    feelsLike: { type: graphql.GraphQLFloat },
    min: { type: graphql.GraphQLFloat },
    max: { type: graphql.GraphQLFloat },
    speed: { type: graphql.GraphQLFloat },
    deg: { type: graphql.GraphQLFloat },
    visibility: { type: graphql.GraphQLInt },
    */
  })
});  


  
  
exports.city = city;
exports.location = location;
exports.inventory = inventory;
exports.transaction = transaction;
exports.weather = weather;
exports.product = product;