const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        PostSchema = require('./post_schema');

const userSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer then 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  likes: 0,
  posts: [PostSchema],
  blogPost: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

userSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

userSchema.pre('remove', function(next) {
  // this === joe
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({ _id: { $in: this.blogPost } })
    .then(() => next());
});

const User = mongoose.model('user', userSchema);

module.exports = User;
