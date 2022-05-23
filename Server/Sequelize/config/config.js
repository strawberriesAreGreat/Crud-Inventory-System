module.exports = {
    development: {
        username: process.env.db_user,
        password: process.env.db_pswd,
        database: process.env.db_name,
        host: process.env.db_host,
        port: process.env.db_port,
        dialect: process.env.db_dialect,
      }
  }