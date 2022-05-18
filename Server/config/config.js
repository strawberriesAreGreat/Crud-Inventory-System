const env = process.env.NODE_ENV;

const dev = {
  EXPRESS:{
    //port 
    PORT: parseInt(process.env.PORT) || 8080
  },
  /*MYSQL:{
    host: "remotemysql.com",
    user: "y9CuS83kTD",
    db: "y9CuS83kTD",
    password:"QJlBXWQmCp",
    dialect: "mysql",
    port:3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }*/
    MYSQL:{
    host: "localhost",
    user: "root",
    db: "woowoodev",
    password:"",
    dialect: "mysql",
    port:8080,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  OPENWEATHER:{
    key: "19bd731bd25d5b60aafeabd7880f06d5"
  }
}

//const dev = {}
//const prod = {}

const config = {
    dev,
    //test
    //prod
};
    

module.exports = config[env];