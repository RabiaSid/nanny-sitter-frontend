import { configureStore } from "@reduxjs/toolkit"
import userSlice from "../reducers/userSlice";



const Store = configureStore({
    reducer:{
        user: userSlice,
    }
})

export default Store;