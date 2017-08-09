const assert = require('assert'),
        User = require('../src/user'),
    BlogPost = require('../src/blogPosts');


describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: 'I hope mongo will do the job', content: 'I really fucking hope that' });

    joe.blogPost.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('Users clean up dangling blogposts on delete', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
