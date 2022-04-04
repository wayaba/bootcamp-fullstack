module.exports = (request, response, next) => {
  console.log(request.path)
  console.log('-------')
  next()
}
