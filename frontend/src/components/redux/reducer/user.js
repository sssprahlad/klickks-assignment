import { createSlice } from "@reduxjs/toolkit";  

const userSlice = createSlice({
    name: "user",
    initialState: {
        // homeButton: true,
        count: 0,
      
       
    },
    reducers: {
     setCount: (state, action) => {
        state.count = action.payload;
     },
     
    },
}); 

export default userSlice.reducer;
export const { setCount } = userSlice.actions;