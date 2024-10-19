import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the state
interface User {
  Id: string;
  Name: string;
  Email: string;
  Role: string;
}


interface UsersState {
  usersList: User[];
  updateUser: Partial<User>;
  detailUser: User | null;
  userHistory: User[];
  currentUser: User | null;
}

// Initial state with type annotations
const initialState: UsersState = {
  usersList: [],
  updateUser: {},
  detailUser: null,
  userHistory: [],
  currentUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersList: (state, action: PayloadAction<User[]>) => {
      state.usersList = action.payload;
    },
    setUpdateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.updateUser = action.payload;
    },
    setDetailUser: (state, action: PayloadAction<User | null>) => {
      state.detailUser = action.payload;
    },
    setUserHistory: (state, action: PayloadAction<User[]>) => {
      state.userHistory = action.payload;
    },
    setCurrentUser: {
      reducer: (state, action: PayloadAction<{ user: User }>) => {
        state.currentUser = action.payload.user;
      },
      prepare: (user: User) => ({ payload: { user } }),
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      sessionStorage.removeItem("token"); // Remove token from sessionStorage
      sessionStorage.removeItem("user");  // Remove user from sessionStorage
    },
  },
});

export const {
  setUsersList,
  setUpdateUser,
  setDetailUser,
  setUserHistory,
  setCurrentUser,
  clearCurrentUser,
} = usersSlice.actions;

export default usersSlice.reducer;
