const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

//para conectarse con docker
// const connectionString = 'mongodb://wayaba:wayaba123@localhost:27017/note-db'

//para conectarse con mongo cloud
const connectionString = config.MONGODB_URI

mongoose
  .connect(connectionString)
  .then(() => logger.info(`conectado con exito`))
  .catch((e) => logger.info('error', e))

process.on('uncaughtException', () => {
  mongoose.connection.close()
})
