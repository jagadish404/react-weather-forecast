import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import weatherReportReducer from '../js/reducers/weatherReportReducer';

export const store = configureStore({
  reducer: {
    weatherReport: weatherReportReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false // Disable serializable check for non-serializable data
    }).concat(logger), // Add logger middleware
  devTools: process.env.NODE_ENV !== 'production' // Enable Redux DevTools in development
});

export default store;

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
