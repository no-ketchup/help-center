import { Feedback } from "@/types/Feedback";

export const submitFeedback = async (feedbackData: Feedback): Promise<void> => {
    const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
        throw new Error(`Failed to submit feedback: ${response.statusText}`);
    }
};