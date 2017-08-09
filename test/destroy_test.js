const assert = require('assert'),
        User = require('../src/user');

describe('Remove records', () => {
let joe;

beforeEach((done) =>  {
  joe = new User({name: "Joe"});

  joe.save()
    .then(() => done());
});

  it('Model instance remove', (done) => {
    // Remove an instance
    joe.remove()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert( user === null );
        done();
      });
  }); //it

  it('Class method remove', (done) => {
    // Multiple records with the given criteria.
    User.remove()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert( user === null );
        done();
      });
  }); //it

  it('Class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: joe.name })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert( user === null );
        done();
      });
  }); //it

  it('Class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove( joe._id )
      .then(() => User.findOne({ _id: joe._id}))
      .then((user) => {
        assert( user === null );
        done();
      });
  }); //it

});// describe
