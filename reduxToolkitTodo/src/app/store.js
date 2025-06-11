//to use store, first you need to import configure store
import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

//store is called as single source of truth
export const store = configureStore({
  reducer: todoReducer
})