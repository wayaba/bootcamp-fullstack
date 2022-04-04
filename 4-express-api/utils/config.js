require('dotenv').config()

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV, PORT } = process.env

const MONGODB_URI = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

module.exports = {
  MONGODB_URI,
  PORT,
}
