const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('test middleware', () => {
  //create user, blogposts, and associate them together
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ 
      title: 'How to 14 pool',
      content: 'You make a pool and you a-move'
    })
    joe.blogPosts.push(blogPost);
    
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  })

  it('associate the blogpost with the user', (done) => {
    //find the user
    //populate the blogpost
    //make sure the title of the blogpost/contents match
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'How to 14 pool')
        assert(user.blogPosts[0].content === 'You make a pool and you a-move')
        done();
      })
  })

  it('users clean up dangling blogpost on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      })
  })
});