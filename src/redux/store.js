"use client";
import { configureStore } from "@reduxjs/toolkit";
import examReducer from "./examSlice";
import examResultReducer from "./examResultSlice"

export const store = configureStore({
    reducer: {
        exam: examReducer,
        examResult: examResultReducer,
    },
});
