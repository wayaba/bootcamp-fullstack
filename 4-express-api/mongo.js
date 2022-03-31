const mongoose = require('mongoose')
//para conectarse con docker
// const connectionString = 'mongodb://wayaba:wayaba123@localhost:27017/note-db'

//para conectarse con mongo cloud
const connectionString = process.env.MONGO_DB_URI

mongoose
  .connect(connectionString)
  .then(() => console.log('conectado con exito'))
  .catch((e) => console.log('error', e))

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
