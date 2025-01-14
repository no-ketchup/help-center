export function handleError(err: unknown, context?: string): Error {
    let error = new Error("An unknown error occurred.");

    if (err instanceof Error) {
        error = err;
    }

    if (context) {
        // Add context information to the error message for debugging
        error.message = `[${context}] ${error.message}`;
    }

    // Log the error for debugging in development
    if (process.env.NODE_ENV === "development") {
        console.error("Handled Error:", error);
    }

    return error;
}