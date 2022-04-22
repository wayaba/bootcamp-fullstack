const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).send({ error: 'id usded is malformed' }),
  ValidationError: (res, error) =>
    res.status(409).send({ error: error.message }),
  JsonWebTokenError: (res) => res.status(401).send({ error: 'invalid token' }),
  TokenExpiredError: (res) => res.status(401).send({ error: 'token expired' }),
  defaultError: (res) => res.status(500).end(),
}
module.exports = (error, request, response, next) => {
  console.error(error)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
}
