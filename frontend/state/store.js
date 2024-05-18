import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

export const resetStore = () => configureStore({
  reducer: rootReducer,
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
