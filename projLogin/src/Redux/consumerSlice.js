import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice( {
    name: 'consumer',
    initialState: {
        consumer: '',
    },
    reducers: {
        updConsumer(state) {
            return { ...state}
        },
    }
})

export const {changeConsumer} = slice.actions

export default slice.reducer