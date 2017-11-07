const mongoose = require('mongoose')
const User = require('./User')

let Schema = mongoose.Schema

/**
 * Define Shema for userMovie,
 * many to many relation for move and users
 */
let userMovieSchema = new Schema({
  movie_id: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

let UserMovie = mongoose.model('UserMovie', userMovieSchema)

module.exports = UserMovie
