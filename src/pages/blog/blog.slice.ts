import { current, nanoid, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initalPostList } from 'contants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}
const initialState: BlogState = {
  postList: initalPostList,
  editingPost: null
}
// export const addPost = createAction('blog/addPost', function (post: Omit<Post, 'id'>) {
//   //sử dụng thuộc tính omit để loại bỏ id trong Post
//   //và nó sử dụng object để cập nhật id bằng nanoid
//   return {
//     payload: {
//       ...post,
//       //copy giá trị ban đầu
//       id: nanoid()
//       //thêm trường id vào
//     }
//   }
// })
//Vì khi post lên ta sẽ post lên nhiều giá trị nên ta truyền <Post>
// export const deletePost = createAction<string>('blog/deletePost')
//vì xóa nên ta sẽ lấy id mà id có kiểu dữ liệu là string
// export const editPost = createAction<string>('blog/editPost')
//Vì edit cũng cần id nên ta truyền id
// export const cancelEditPost = createAction('blog/cancelEditPost')
//xử lý khi click vào nut cancel thì sẽ reset lại form
// export const updateFinishPost = createAction<Post>('blog/updateFinishPost')
//Xử lý khi click vào nut update post thì sẽ cập nhật lại dữ liệu. Vì update toàn bộ nên ta truyền tham số là Post

//createSlice
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<string>) => {
      console.log('start', current(state))
      //Nếu muốn xóa thì phải tìm Id
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      //findIndex thì nó trả về chỉ mục thỏa mãn, còn find thì trả về giá trị thỏa mãn đàu tiên mà nó tìm thấy
      if (foundPostIndex !== -1) {
        //Nếu khác -1 nghĩa là nó tìm thấy, mà nếu tìm thấy thì xóa chỉ mục id đó là xóa cả bài viêt đó
        //splice là để xóa phần tử được tìm thấy
        state.postList.splice(foundPostIndex, 1)
      }
    },
    editPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      //Vì tìm find là tim thấy tất cả thuộc tính trong id đó luôn
      state.editingPost = foundPost
      //Lưu giữ giá trị vừa tìm vào editingPost
    },
    cancelEditPost: (state) => {
      state.editingPost = null
    },
    updateFinishPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        //some dùng để tìm ra giá trị đúng và trả về true
        if (post.id === postId) {
          state.postList[index] = action.payload
          //Vì postLish là mảng nên ta không thể không truyền giá trị
          //truyền index là vì cập nhật đúng thằng có index
          //action.payload là cập nhật giá trị mà ta sửa đổi
          return true
          //return true để nó dừng lại
        } else {
          return false
        }
      })
      state.editingPost = null
      //Sau khi update xong thì ta sẽ form về null để hiển thị nút publish post
    },
    addPost: {
      reducer: (state, action: PayloadAction<Post>) => {
        //3
        state.postList.push(action.payload)
        //Sau khi cập nhật vào postList thì bên postList.tsx sẽ cập nhật lại về re-render ra màn hình
      },
      prepare: (post: Omit<Post, 'id'>) => ({
        payload: {
          ...post,
          id: nanoid()
        }
      })
      // Mình dùng prepare là vì lúc mình add mình có truỳen vào q prepare callback
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.includes('cancel'),
        (state, action) => {
          console.log(current(state))
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type: ${action.type}`, current(state))
      })
  }
})

export const { addPost, cancelEditPost, deletePost, editPost, updateFinishPost } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
