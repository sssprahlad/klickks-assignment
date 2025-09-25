import { createSlice } from "@reduxjs/toolkit";

// Helper to safely get initial state
const getInitialState = () => ({
  count: 0
});

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    setCount: {
      reducer: (state, action) => {
        state.count = action.payload;
      },
      prepare: (count) => {
        return { payload: count };
      }
    }
  },
 
  extraReducers: (builder) => {
    builder.addCase('LOGOUT', (state) => {
      return getInitialState();
    });
  }
});

export const { setCount } = userSlice.actions;
export default userSlice.reducer;