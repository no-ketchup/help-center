export function handleError(err: unknown): Error {
    if (err instanceof Error) {
        return err;
    }
    return new Error("An unknown error occurred.");
}