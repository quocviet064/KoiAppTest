
import { configureStore } from '@reduxjs/toolkit'; 
import usersSlice, { setCurrentUser } from './reducers/userSlice';

// Configure Redux store
const store = configureStore({
  reducer: {
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


if (typeof window !== "undefined") {
    const currentUser = sessionStorage.getItem("user");
    if (currentUser) {
      store.dispatch(setCurrentUser(JSON.parse(currentUser)));
    }
  }


export default store;