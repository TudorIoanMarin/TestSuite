const assert = require('assert'),
        User = require('../src/user');

describe('Adding subdocuments', () => {

  it('Can create a subdocument', (done) => {
    const joe = new User({
        name: "Joe",
        posts: [
          { title: 'Js and me'},
          { title: 'Mongo is cool' },
          { title: undefined }
          ]
       });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert( user.posts[0].title === "Js and me" );
        done();
      });
  }); //it

  it('Can add subdocuments to an existing document', (done) => {
    const joe = new User({
      name: "Joe",
      posts: [
        { title: 'Mongo rocks out with his cock out' }
      ]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'Impressing me' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[1].title === 'Impressing me');
        done();
      });
  });// it

  it('Can remove subdocuments of an existing document', (done) => {
    const joe = new User({
      name: "Joe",
      posts: [
        { title: 'Mongo rocks out with his cock out' }
      ]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });// it

});// describe
