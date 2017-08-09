const assert = require('assert'),
        User = require('../src/user');

describe('Update records', () => {
  let joe;

  beforeEach((done) =>  {
    joe = new User({name: "Joe", likes: 5});

    joe.save()
      .then(() => done());
  });

  function assertName( operation, done ) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert( users.length === 1 );
        assert( users[0].name === 'Alex' );
        done();
      });
  }

  it('Model instance update /w save() & set()', (done) => {
    joe.set('name', 'Alex');
    assertName( joe.save(), done );
  }); //it

  it('Model instance update /w update()', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  }); //it

  it('Model class update /w update()', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' })
      , done);
  }); //it

  it('Model class update /w findOneAndUpdate()', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' })
      , done)
  }); //it

  it('Model class update /w findByIdAndUpdate()', (done) => {
    assertName(
      User.findByIdAndUpdate( joe._id, { name: 'Alex' } )
    , done)
  }); //it

  it('Increment likes /w $inc', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert( user.likes === 6 );
      done();
    });
  }); //it

});// describe
