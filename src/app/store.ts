import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { todoReducer } from './todos.slice';
import { folderReducer } from './folders.slice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    folders: folderReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
