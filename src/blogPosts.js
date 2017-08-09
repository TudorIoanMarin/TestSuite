const mongoose = require('mongoose')
        Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
   }]
});

const BlogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = BlogPost;
