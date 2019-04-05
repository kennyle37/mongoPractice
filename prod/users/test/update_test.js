const assert = require('assert');
const User = require('../src/user.js')

describe('updating a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 1 });
    joe.save()
      .then(() => done());
  })

  function assertName(promise, done) {
    promise
      .then(() => User.find({}))
      .then((users) => {
        assert(users[0].name === 'Rice');
        assert(users.length === 1);
        done();
      })
  }

  function assertCount(promise, done) {
    promise
      .then(() => User.find({}))
      .then((users) => {
        assert(users[0].likes === 2);
        done();
      })
  }

  it('should update the model', (done) => {
    assertName(User.update({ name: 'Joe' }, { name: 'Rice' }), done)
  })

  it('should findOneAndUpdate the model', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe'}, { name: 'Rice' }), done)
  })

  it('should findByIdAndUpdate the model', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Rice' }), done);
  })

  it('should update the instance', (done) => {
    assertName(joe.update({ name: 'Rice'}), done);
  })

  it('should set n save the instance', (done) => {
    joe.set('name', 'Rice')
    assertName(joe.save(), done);
  })

  it('use update and increment a model', (done) => {
    assertCount(User.update({ name: 'Joe' }, {$inc : {likes: 1}}), done);
  })

  it('use findOneAndUpdate and increment a model', (done) => {
    assertCount(User.findOneAndUpdate({ name: 'Joe'}, {$inc: {likes: 1}}), done);
  })

  it('use findByIdAndUpdate and increment a model', (done) => {
    assertCount(User.findByIdAndUpdate(joe._id, {$inc: {likes: 1}}), done);
  })

  it('should increment an instance', (done) => {
    //increment a postCount by 1
    joe.update({
      $inc: { likes: 1} 
    })
      .then(() => User.find({}))
      .then((users) => {
        assert(users[0].likes === 2);
        done();
      })
  })
})