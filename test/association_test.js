const assert = require('assert'),
        User = require('../src/user'),
     Comment = require('../src/comment'),
    BlogPost = require('../src/blogPosts');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: 'I hope mongo will do the job', content: 'I really fucking hope that' });
    comment = new Comment({ content: 'It will if used well' });

    joe.blogPost.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  //
  it('Saves a realtion between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe'})
      .populate('blogPost')
      .then((user) => {
        assert( user.blogPost[0].title === 'I hope mongo will do the job' )
        done();
      })
  }); //it

  it('Saves a full relation graph', (done) => {
    User.findOne({name: 'Joe'})
      .populate({
        path: 'blogPost',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert( user.name === 'Joe');
        assert( user.blogPost[0].title === 'I hope mongo will do the job');
        assert( user.blogPost[0].comments[0].content === 'It will if used well');
        assert( user.blogPost[0].comments[0].user.name === 'Joe' );
        done();
      });
  }); //it

});// describe
