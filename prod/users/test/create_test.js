const assert = require('assert');
const User = require('../src/user.js');

describe('Creating records', () => {

  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' });

    joe.save()
      .then(() => {
        //has joe been saved successfuly?
        //joe.isNew will return false if joe has been added, true if he hasn't been added
        assert(!joe.isNew);
        done();
      })
  });
});