import { configureStore } from '@reduxjs/toolkit'
import userprofileReducer  from './user/userSlice'

export const store = configureStore({
  reducer: {user_mod: userprofileReducer },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck:false,
  }),
});