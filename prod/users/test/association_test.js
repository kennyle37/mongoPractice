const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ 
      title: 'How to 14 pool', 
      content: 'You build a pool and you a-move'
    })
    comment = new Comment({
      content: 'This is a great article!'
    })
    
    joe.blogPosts.push(blogPost) //access the blogPosts key in joe's model and push in the blogPost model (mongoose magic)
    blogPost.comments.push(comment) //access the blogPOst comments and push in a comment to it
    comment.author = joe //access the author key inside comment and assign it to joe 

    //promise all of them so we only save when all are complete
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  })

  it('saves a relation between user and blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'How to 14 pool');
        done();
      })
  })

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'author',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'How to 14 pool');
        assert(user.blogPosts[0].comments[0].content === 'This is a great article!');
        assert(user.blogPosts[0].comments[0].author.name === 'Joe');
        done();
      })
  })
})