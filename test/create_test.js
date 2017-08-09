const assert = require('assert'),
        User = require('../src/user');

describe('Creating records', () => {

  // Save
  it('Saves a user', (done) => {
    const joe = new User({ name: "Joe" });

    joe.save()
      .then(() => {
        // Has Joe been saved?
        assert( !joe.isNew );
        done();
      });
  }); //it

});// describe
