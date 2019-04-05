const assert = require('assert');
const User = require('../src/user');

describe('validating records', () => {
  it('requires a user name', () => {
    //create an undefined name to test to see if our validation works
    const user = new User({ name: undefined });
    const validationResult = user.validateSync(); //synchronous process
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.')
  });

  it('name must be longer than 2 username', () => {
    const user = new User({ name: 'Bo'});
    const userValidation = user.validateSync();
    const { message } = userValidation.errors.name;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Bo'});
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters');
        done();
      }) //catch error if we save invalid
  })
})