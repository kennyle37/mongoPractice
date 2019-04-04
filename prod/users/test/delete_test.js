const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  })

  it('model instance remove', (done) => {
    joe.remove()
      //after remove, find a user name joe
      .then(() => User.findOne({ name: 'Joe'}))
      //then check to see if user still exists, if not, then delete is correct
      .then((user) => {
        assert(user === null);
        done();
      })
  })

  it('class method remove', (done) => {
    //remove a bunch of records with given criteria.
    User.remove({ name: 'Joe'})
      .then(() => User.find({ name: 'Joe'}))
      .then((user) => {
        // console.log('user', user)
        assert(user.length === 0);
        done();
      })
  })

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe'})
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      })
  })

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  })
});
