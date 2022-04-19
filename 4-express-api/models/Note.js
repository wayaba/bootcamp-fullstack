const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
