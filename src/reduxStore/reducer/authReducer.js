import { createSlice  } from "@reduxjs/toolkit";

export const authAction = createSlice({
  name: 'user',
  initialState:{
    islog:false,
    user:{}
  },
  reducers:{
    login: (state, action)=>{
      state.islog = action.payload.islog;
      state.user = action.payload.user;
    },
    logout:(state)=>{
      state.islog = false;
      state.user = {}
    },
    setUser:(state, action)=>{
      state.user= {...state.user, ...action.payload.user}
    }
  }
})

export const {login, logout, setUser} = authAction.actions;
export default authAction.reducer