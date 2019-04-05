const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, william, jack, averell;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    william = new User({ name: 'William' })
    jack = new User({ name: 'Jack' })
    averell = new User({ name: 'Averell' })

    Promise.all([joe.save(), william.save(), jack.save(), averell.save()])
      .then(() => done());
  })

  it('Finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe'})
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  
  it('Find one user with a particular id', (done) => {
    User.findOne({ _id: joe._id }) //no toString since no comparison
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      })
  })

  it('can skip and limit users', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Jack')
        assert(users[1].name === 'Joe')
        done();
      })
  })
});