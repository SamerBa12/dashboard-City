import { createSlice } from "@reduxjs/toolkit";

export const sliceCities = createSlice({
    name: 'sliceCities',
    initialState: {
        cities: [],
    },
    reducers: {
        fetchCities: (state, action) => {
            state.cities = action.payload
        },
        deleteFromStatus: (state, action) => {
            state.cities = state.cities.filter((el, index) => el.id !== action.payload)
        },
    }
})
export const { fetchCities, deleteFromStatus } = sliceCities.actions
export default sliceCities.reducer