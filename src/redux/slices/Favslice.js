import { createSlice } from "@reduxjs/toolkit";


let initialState = {fav:[]}

let favSlice = createSlice({
    name: 'favorite',
    initialState:initialState,
    reducers:{
        getFav:(state,action)=>{
            const newFav =[...state.fav,action.payload];
            state.fav = newFav
        },
        removeFav:(state,action)=>{
            state.fav.splice(action.payload,1)
        },
    }

})

export let favReducer =favSlice.reducer;
export let {getFav,removeFav} = favSlice.actions;