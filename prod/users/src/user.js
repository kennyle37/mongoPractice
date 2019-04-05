const mongoose = require('mongoose');
const PostSchema = require('./postSchema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters'
    }
  },
  likes: Number,
  posts: [PostSchema], //see that it's an array should know that it's a list of posts
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

//we don't use arrow because model is available as this
//this === 'joe'
UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() =>  next());
})

UserSchema.virtual('postCount').get(function() { 
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
