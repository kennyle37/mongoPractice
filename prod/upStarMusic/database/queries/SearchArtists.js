const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const buildQuery = (crteria) => {
    const query = {};

    if (crteria.name) {
      query.$text = {
        $search: crteria.name,
        $caseSensitive: false
      }
    };

    if (crteria.age) {
      //if age exist, query for only stuff that are greater than min
      //query for stuff that are less than than max
      query.age = { 
        $gte: crteria.age.min, 
        $lte: crteria.age.max 
      };
    }

    if (crteria.yearsActive) {
      //if yearsActive exist, query for only stuff that are greater than min
      //query for stuff that are less than than max
      query.yearsActive = {
        $gte: crteria.yearsActive.min,
        $lte: crteria.yearsActive.max
      }
    }
    return query;
  }

  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([query, Artist.find(buildQuery(criteria)).count()])
    .then((results) => {
      return {
        all: results[0],
        count: results[1],
        offset,
        limit,
      };
    });
};
