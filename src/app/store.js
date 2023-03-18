import { configureStore } from '@reduxjs/toolkit';
import plannerReducer from '../slices/plannerSlice';

export const store = configureStore({
    reducer: {
        todo: plannerReducer,
        // Planner reducer
    }
});