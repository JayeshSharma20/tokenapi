import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: ["Tv","Audio","Laptop","Mobile","Gaming","Appliances"],
    selectedCategory: null
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{
        setCategory:(state, action)=>{
            state.selectedCategory = action.payload;    
        }
    }
})

export const {setCategory} = categorySlice.actions;
export default categorySlice.reducer
