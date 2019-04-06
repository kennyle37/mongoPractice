const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const ageRange = {};

  return Artist.find({})
    .sort({ age: 1 })
    .then((artists) => {
      ageRange.min = artists[0].age;
      ageRange.max = artists[artists.length - 1].age;
      return ageRange;
    });
};
