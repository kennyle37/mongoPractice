const assert = require('assert');
const User = require('../src/user');

describe('it should have a subdocument of posts', () => {
  it('can create subdocuments', (done) => {
    const joe = new User({ 
      name: 'Joe', 
      posts: [
        { title:'How to 14pool' }, 
        { title:'How to not die to cannon rush' }
      ]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 2);
        assert(user.posts[0].title === 'How to 14pool');
        done();
      });
  })

  it('can add subdocuments to an existing record', (done) => {
    const joe = new User({ 
      name: 'Joe',
      posts: [],
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'Hello There' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts.length === 1);
        assert(user.posts[0].title === 'Hello There');
        done();
      })
  })

  it('can remove subdocuments in an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'How to 14 pool' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        assert(user.posts[0] !== 'How to 14 pool');
        done();
      })
  })
});
