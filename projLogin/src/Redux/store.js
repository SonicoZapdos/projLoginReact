import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import consumerReducer from './consumerSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        consumer: consumerReducer,
    }
})
