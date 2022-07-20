import { configureStore } from '@reduxjs/toolkit';
import { githubReducer } from './github/github.slice';

export const store = configureStore({
  reducer: {
    github: githubReducer,
  },
});
