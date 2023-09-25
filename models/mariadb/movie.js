import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}
/**
 * tarea
 * crear el crud con mariadb
 *
 */
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const conn = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll ({ genre }) {

  }

  static async getById ({ id }) {

  }

  static async create ({ input }) {

  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
