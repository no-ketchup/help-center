export interface PaginatedResponse<T> {
    docs: T[]; // Array of items (e.g., categories or user guides)
    totalDocs: number; // Total number of documents
    limit: number; // Number of documents per page
    totalPages: number; // Total number of pages
    page: number; // Current page number
    pagingCounter: number; // Index of the first document on the page
    hasPrevPage: boolean; // Indicates if there is a previous page
    hasNextPage: boolean; // Indicates if there is a next page
    prevPage: number | null; // Previous page number (null if no previous page)
    nextPage: number | null; // Next page number (null if no next page)
}