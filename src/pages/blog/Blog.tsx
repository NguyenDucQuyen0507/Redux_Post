import CreateBlog from './components/CreateBlog'
import PostList from './components/PostList'

const Blog = () => {
  return (
    <div className='p-5'>
      <CreateBlog />
      <PostList />
    </div>
  )
}

export default Blog
