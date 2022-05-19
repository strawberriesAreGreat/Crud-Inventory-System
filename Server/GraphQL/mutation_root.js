const graphql = require('graphql');
const objects = require('./objects');
const db = require("../Sequelize");
const { QueryTypes } = require('sequelize');


exports.MutationRoot = new graphql.GraphQLObjectType({

    name: 'Mutation',
    fields: () => ({

      insert_inventory: {
        type: objects.inventory,

        args: {

          location_id: { type: graphql.GraphQLInt },
          sku: { type: graphql.GraphQLInt},
          stock: { type: graphql.GraphQLInt },
        
        },
        resolve (parent, args, context, resolveInfo){
        
          return db.sequelize.query(
            'INSERT INTO inventory (location_id, sku, stock) VALUES (:location_id, :sku, :stock)',
            {
              replacements: {
                 location_id: args.location_id,
                 sku: args.sku,
                 stock: args.stock
               },
              type: QueryTypes.INSERT
            }
          )
          .catch( (err) => {
            if (err.code === 'ER_DUP_ENTRY') {
              console.error("ERROR: Duplicate entries.")
            }else if(err.errno === 1452){
              console.error("ERROR: Foreign Key Constraint.")
            } else {
              console.error("ERROR. SQL is mad at you! Check your query.")
            }
          });
        }
      },


      update_inventory: {
        type: objects.inventory,

        args: {

          location_id: { type: graphql.GraphQLInt },
          sku: { type: graphql.GraphQLInt},
          stock: { type: graphql.GraphQLInt },

        },
        resolve (parent, args, context, resolveInfo){

          db.sequelize.query(

            //ugh this is ugly im sorry. I wish i could spend more time finding a dynamic solution to 
            // updating query parameters but this will do for now. 
            'UPDATE inventory SET location_id = :location_id, sku = :sku, stock = :stock WHERE location_id = :location_id AND sku = :sku',
          
            {
              replacements: {
                 location_id: args.location_id,
                 sku: args.sku,
                 stock: args.stock,

               },
              type: QueryTypes.UPDATE
            }
          )
          .catch( (err) => {
            console.error("ERROR. SQL is mad at you! Check your query.")
        ERROR = true;
        });
        }
      },
      delete_inventory: {
        type: objects.inventory,

        args: {

          location_id: { type: graphql.GraphQLInt },
          sku: { type: graphql.GraphQLInt},
        
        },
        resolve (parent, args, context, resolveInfo){
          db.sequelize.query(
            'DELETE FROM inventory WHERE location_id = :location_id AND sku = :sku',
            {
              replacements: {
                 location_id: args.location_id,
                 sku: args.sku,
               },
              type: QueryTypes.DELETE
            }
          )
          .catch( (err) => {
              console.error("ERROR. SQL is mad at you! Check your query."),
          ERROR = true;
          });
        }
      },
      insert_location: {
        type: objects.inventory,

        args: {
          city_id: { type: graphql.GraphQLInt },
          country: { type: graphql.GraphQLString },
          region: { type: graphql.GraphQLString },
          city: { type: graphql.GraphQLString },
          street: { type: graphql.GraphQLString },
          zipCode: { type: graphql.GraphQLString },
          latitude: { type: graphql.GraphQLFloat},
          longitude: { type: graphql.GraphQLFloat },
        },
        resolve (parent, args, context, resolveInfo){
        
          return db.sequelize.query(
            'INSERT INTO `location`( city_id, country, region, city, street, zipCode, latitude, longitude) VALUES ( :city_id, :country, :region, :city, :street, :zipCode, :latitude, :longitude)',
            {
              replacements: {

                city_id: args.city_id,
                country: args.country,
                region: args.region,
                city: args.city,
                street: args.street,
                zipCode: args.zipCode,
                latitude: args.latitude,
                longitude: args.longitude,

               },
              type: QueryTypes.INSERT
            }
          )
          .catch( (err) => {
            if (err.code === 'ER_DUP_ENTRY') {
              console.error("ERROR: Duplicate entries.")
            }else if(err.errno === 1452){
              console.error("ERROR: Foreign Key Constraint.")
            } else {
              console.error("ERROR. SQL is mad at you! Check your query.")
            }
          });
        }
      },




    })
  })