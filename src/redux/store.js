import { configureStore } from '@reduxjs/toolkit'
import userprofileReducer  from './user/userSlice'

export const store = configureStore({
  reducer: {globalContxt: userprofileReducer },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck:false,
  }),
});