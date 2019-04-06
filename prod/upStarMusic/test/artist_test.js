const assert = require('assert');
const Artist = require('../database/models/artist');

describe('artist model tests', () => {
  let netWorth;
  const ageRange = {};
  const yearsActive = {};

  it('Should be able to fetch from the database', (done) => {
    Artist.find({})
      .sort({ age: 1 })
      .then((artist) => {
        assert(artist.length === 14);
        done();
      });
  });

  it('Should be able to find an artist', (done) => {
    Artist.findOne({ name: 'Ruby Huel Sr.' })
      .then((artist) => {
        assert(artist.name === 'Ruby Huel Sr.');
        done();
      });
  });

  it('Should find a artist\'s worth', (done) => {
    Artist.findOne({ name: 'Jerod Nolan' })
      .then((user) => {
        netWorth = user.netWorth;
        assert(netWorth === 3766821);
        done();
      });
  });

  it('should find the min age', (done) => {
    Artist.find({})
      .sort({ age: 1 })
      .then((artists) => {
        assert(artists[0].age === 18);
        done();
      });
  });

  it('should find the max age', (done) => {
    Artist.find({})
      .sort({ age: -1 })
      .then((artists) => {
        assert(artists[0].age === 44);
        done();
      });
  });

  it('should find min and max age', (done) => {
    Artist.find({})
      .sort({ age: 1 })
      .then((artists) => {
        ageRange.min = artists[0].age;
        ageRange.max = artists[artists.length - 1].age;
        assert(ageRange.min === 18);
        assert(ageRange.max === 44);
        done();
      });
  });

  it('should find years active range', (done) => {
    Artist.find({})
      .sort({ yearsActive: 1 })
      .then((artists) => {
        yearsActive.min = artists[0].yearsActive;
        yearsActive.max = artists[artists.length - 1].yearsActive;
        assert(yearsActive.min === 0);
        assert(yearsActive.max === 25);
        done();
      });
  });

  // it('Should display an artist\'s album')
});
