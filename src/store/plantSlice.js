import { createSlice } from '@reduxjs/toolkit';

const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plants: [],
  },
  reducers: {
    setPlants: (state, action) => {
      state.plants = action.payload;
    },
    addPlant: (state, action) => {
      state.plants.push(action.payload);
    },
  },
});

export const { setPlants, addPlant } = plantsSlice.actions;
export default plantsSlice.reducer;