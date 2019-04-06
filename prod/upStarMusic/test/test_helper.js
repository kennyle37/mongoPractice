const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/upstar_music');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Cannot connect to mongoose', error);
    });
});
