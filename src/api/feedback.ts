import apiClient from "@/lib/apiClient";
import { Feedback } from "@/types/Feedback";

export const submitFeedback = async (feedbackData: Feedback) => {
    const res = await apiClient.post('/api/feedback', feedbackData);
    return res.data;
};