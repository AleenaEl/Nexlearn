
import { qnlist, submitExam } from "./apiRoutes";
import axiosInstance from "./axiosInstance"

export const fetchQuestionList = async () => {
    try {
        const response = await axiosInstance.get(qnlist)
        console.log(response);
        
        return response.data
    } catch (error) {
        console.error("Error to get question data   ", error);
        throw error;
    }
}

export const submitexam = async (data) => {
    try {
        const response = await axiosInstance.post(submitExam,data)
        console.log(response);
        
        return response.data
    } catch (error) {
        console.error("Error to submit exam data   ", error);
        throw error;
    }
}