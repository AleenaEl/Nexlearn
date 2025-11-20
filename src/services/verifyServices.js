import {  logout, otpsend, otpverify, profile } from "./apiRoutes"
import axiosInstance from "./axiosInstance"

export const sendOtP = async (data) => {
    try {
        const response = await axiosInstance.post(otpsend, data)
        // console.log(response);
        
        return response.data
    } catch (error) {
        console.error("Error to send otp   ", error);
        throw error;
    }
}
export const verifyOtP = async (data) => {
    try {
        const response = await axiosInstance.post(otpverify, data)
        // console.log(response);
        
        return response.data
    } catch (error) {
        console.error("Error to verify otp   ", error);
        throw error;
    }
}
export const createProfile = async (data) => {
    try {
        const response = await axiosInstance.post(profile, data)
        // console.log(response);
        
        return response.data
    } catch (error) {
        console.error("Error to create profile   ", error);
        throw error;
    }
}
export const testLogout = async () => {
    try {
        const response = await axiosInstance.post(logout)
        
        
        return response.data
    } catch (error) {
        console.error("Error to create profile   ", error);
        throw error;
    }
}