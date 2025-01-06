import {Guide} from "./Guide";

export interface Feedback {
    id: string;
    guide: Guide;
    rating: number;
    comment?: string;
    submittedAt: string;
}