const assert = require('assert');
const User = require('../src/user.js')

describe('updating a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
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
})