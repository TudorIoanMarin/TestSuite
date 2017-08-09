const assert = require('assert'),
        User = require('../src/user');

describe('Reading records', () => {
  let joe, maria, alex, zack;

  beforeEach((done) => {
    joe = new User({name: "Joe"});
    maria = new User({name: "Maria"});
    alex = new User({name: "Alex"});
    zack = new User({name: "Zack"});

    Promise.all([ joe.save(), maria.save(), alex.save(), zack.save() ])
      .then(() => done());
  });

  // Read multiple
  it('Retrives users by name', (done) => {
    User.find({ name: "Joe" })
      .then((users) => {
        assert( users[0]._id.toString() === joe._id.toString() );
        done();
      });
    }); // it

  // Read one, best used when you only know the id.
  it('Find a user with a particular id', (done) => {
    User.findOne( { _id: joe._id } )
      .then((user) => {
        assert( user.name === joe.name );
        done();
      });
    }) // it

  it('Skip and limit resilt set ( pagination )', (done) => {
    User.find({})
    .sort({ name: 1 })
    .skip(1)
    .limit(2)
    .then((users) => {
      assert(users.length === 2 );
      assert(users[0].name === 'Joe');
      assert(users[1].name === 'Maria');
      done();
      })
    }) // it

}); // describe
