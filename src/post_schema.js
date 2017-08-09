const mongoose = require('mongoose')
        Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String
});


module.exports = postSchema;
