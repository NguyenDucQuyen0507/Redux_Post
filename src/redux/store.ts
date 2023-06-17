import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'pages/blog/blog.slice'
export const store = configureStore({
  reducer: { blog: blogReducer }
})

//Lấy rootState và AppDispatchState từ store của chúng ta để phụ vụ cho typeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
