const logger = (request, response, next) => {
  console.log(request.path)
  console.log('-------')
  next()
}

module.exports = logger
