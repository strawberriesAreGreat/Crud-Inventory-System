const env = process.env.NODE_ENV;

const dev = {
  EXPRESS:{
    //port 
    PORT: parseInt(process.env.PORT) || 8080
  },
  MYSQL:{
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
    }
  },
  OPENWEATHER:{
    key: "cd260c64fee9ad813a41db25ec9fac05"
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