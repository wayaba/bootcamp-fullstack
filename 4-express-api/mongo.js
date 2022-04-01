const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

//para conectarse con docker
// const connectionString = 'mongodb://wayaba:wayaba123@localhost:27017/note-db'

//para conectarse con mongo cloud
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

mongoose
  .connect(connectionString)
  .then(() => console.log('conectado con exito'))
  .catch((e) => console.log('error', e))

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
