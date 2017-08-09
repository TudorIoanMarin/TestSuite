const assert = require('assert'),
        User = require('../src/user');

describe('Validating records', () => {

  it('Requires a user name', () => {
    const user = new User({ name: undefined });

    const validationRestult = user.validateSync();
    const { message } = validationRestult.errors.name;
        assert( message === 'Name is required.' );
  }); //it

  it('Username is at least 2 characters long', () => {
           const user = new User({ name: 'Al' }),
    validationRestult = user.validateSync(),
          { message } = validationRestult.errors.name;

       assert( message === 'Name must be longer then 2 characters.' );
  }); //it

  it('Invalid records are not saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationRestult) => {
        const { message } = validationRestult.errors.name;

        assert( message === 'Name must be longer then 2 characters.' );
        done();
      });
  });

});// describe
