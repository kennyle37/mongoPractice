const mongoose = require('mongoose');
//reference to es6 promises to let mongoose know we're using this library
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    //connect to mongoose, once that is done, execute done
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Error', error);
    });
});

//run before each test
beforeEach((done) => { //pass done to let the beforeEach know that when done, execute next test
  //make a direct reference to the collection of our users inside our data base
  mongoose.connection.collections.users.drop(() => {
    //ready to run the next test
    done();
  });
})