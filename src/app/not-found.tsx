import ErrorPage from "@/./components/error/error-page";

export default function NotFound() {
    return (
        <ErrorPage
            code={404}
            title="Page Not Found"
            subtitle="We couldn't find the page you're looking for."
        />
    );
}