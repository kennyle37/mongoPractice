const Artist = require('../models/artist');

/**
 * Finds a single artist in the artist collection.
 * @param {object} artistProps - Object containing a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves with the Artist that was created
 */
module.exports = (artistProps) => {
  const { name, age, yearsActive, genre } = artistProps;

  const artist = new Artist({
    name,
    age,
    yearsActive,
    genre,
  });

  return artist.save();
};
