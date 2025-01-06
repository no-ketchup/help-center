export interface Step {
    id: string;
    title: string;
    description?: string;
    media?: { url: string; type: 'image' | 'video'; caption?: string };
    nextStep?: string;
    isOptional?: boolean;
}