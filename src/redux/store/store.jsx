import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../reducers/userSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});

export default store;
