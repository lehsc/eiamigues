import type { Knex } from "knex";
import  dotenv  from "dotenv";
dotenv.config()
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: process.env.UID,
      password: process.env.PASS,
      host: process.env.HOST,
      database: process.env.DB,
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },

  production: {
    client: "postgresql",
    connection: {
      user: process.env.UID,
      password: process.env.PASS,
      host: process.env.HOST,
      database: process.env.DB,
    },
    pool: {
      min: 5,
      max: 15
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
