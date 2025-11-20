"use client";
import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
    name: "exam",
    initialState: {
        questions: [],
        currentIndex: 0,
        answers: {},
        review: {},
        visited: {}, 
        totalTime: 0,     
        timeLeft: 0,     
        timerStarted: false,
    },

    reducers: {
    
        setQuestions(state, action) {
            state.questions = action.payload;
            state.currentIndex = 0;
        },

        // When selecting an answer
        selectAnswer(state, action) {
            const { index, answer } = action.payload;
            state.answers[index] = answer;

            // Remove visited because user has answered
            if (state.visited[index]) {
                delete state.visited[index];
            }
        },

        // Mark a question for review
        markForReview(state) {
            const i = state.currentIndex;
            state.review[i] = true;
        },

        // Mark current question visited BEFORE moving to another
        leaveCurrent(state) {
            const i = state.currentIndex;

            const isAnswered = state.answers[i];
            const isReviewed = state.review[i];

            // Mark visited ONLY if not answered or reviewed
            if (!isAnswered && !isReviewed) {
                state.visited[i] = true;
            }
        },

        // Move to next question
        nextQuestion(state) {
            const i = state.currentIndex;

            // Mark the old question visited first
            const isAnswered = state.answers[i];
            const isReviewed = state.review[i];
            if (!isAnswered && !isReviewed) {
                state.visited[i] = true;
            }

            if (state.currentIndex < state.questions.length - 1) {
                state.currentIndex++;
            }
        },

        // Move to previous question
        prevQuestion(state) {
            const i = state.currentIndex;

            const isAnswered = state.answers[i];
            const isReviewed = state.review[i];
            if (!isAnswered && !isReviewed) {
                state.visited[i] = true;
            }

            if (state.currentIndex > 0) {
                state.currentIndex--;
            }
        },

        // Jump to a randm question in palette
        goTo(state, action) {
            const i = state.currentIndex;

            const isAnswered = state.answers[i];
            const isReviewed = state.review[i];
            if (!isAnswered && !isReviewed) {
                state.visited[i] = true;
            }

            state.currentIndex = action.payload;
        },
        startTimer(state, action) {
            const seconds = action.payload;
            state.totalTime = seconds;
            state.timeLeft = seconds;
            state.timerStarted = true;

         
            if (typeof window !== "undefined") {
                const start = Date.now();
                localStorage.setItem("startTime", start);
                localStorage.setItem("duration", seconds);
            }
        },

        tick(state) {
            if (state.timeLeft > 0) {
                state.timeLeft -= 1;
            }
        },

        loadTimer(state) {
            if (typeof window !== "undefined") {
                const start = Number(localStorage.getItem("startTime"));
                const duration = Number(localStorage.getItem("duration"));
                if (!start || !duration) return;

                const elapsed = Math.floor((Date.now() - start) / 1000);
                const remaining = duration - elapsed;

                state.totalTime = duration;
                state.timeLeft = remaining > 0 ? remaining : 0;
                state.timerStarted = true;
            }
        },

    },
});

export const {
    setQuestions,
    selectAnswer,
    markForReview,
    leaveCurrent,
    nextQuestion,
    prevQuestion,
    goTo,
    startTimer, tick, loadTimer
} = examSlice.actions;

export default examSlice.reducer;
