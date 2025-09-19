import { Guide } from "./Guide";
import { Category } from "./Category";
import { Feedback } from "./Feedback";

// Guides
export interface GetGuidesResponse {
    guides: Guide[];
}

export interface GetGuideResponse {
    guide: Guide | null;
}

// Categories
export interface GetCategoriesResponse {
    categories: Category[];
}

export interface GetCategoryResponse {
    category: Category | null;
}

// Feedback
export interface SubmitFeedbackResponse {
    submitFeedback: Feedback;
}