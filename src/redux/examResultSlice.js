"use client";
import { createSlice } from "@reduxjs/toolkit";

const examResultSlice = createSlice({
    name: "examResult",
    initialState: {
        score: null,
        correct: null,
        wrong: null,
        notAttended: null,
        total: null,
        details: [],
    },
    reducers: {
        setExamResult(state, action) {
            return { ...state, ...action.payload };
        },
        clearExamResult(state) {
            return {
                score: null,
                correct: null,
                wrong: null,
                notAttended: null,
                total: null,
                details: [],
            };
        },
    },
});

export const { setExamResult, clearExamResult } = examResultSlice.actions;
export default examResultSlice.reducer;
