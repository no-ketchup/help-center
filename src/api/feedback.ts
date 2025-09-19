import { useMutation } from "@apollo/client/react";
import { SUBMIT_FEEDBACK } from "@/lib/queries";

export function useSubmitFeedback() {
    return useMutation(SUBMIT_FEEDBACK);
}