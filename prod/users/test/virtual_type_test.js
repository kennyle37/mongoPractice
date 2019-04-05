const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
  it('postCount return a number of posts', (done) => {
    const joe = new User({ 
      name: 'Joe',
      posts: [{ title: 'How to 14 pool' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      })
  });
})