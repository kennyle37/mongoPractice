// Todo: Create Artist Model
const mongoose = require('mongoose');
const AlbumSchema = require('./albums');

const Schema = mongoose.Schema;

const artist = new Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema]
});

const Artist = mongoose.model('artist', artist);
module.exports = Artist;
