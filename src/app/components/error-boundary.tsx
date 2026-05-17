import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage: string;
  let errorTitle: string;

  if (isRouteErrorResponse(error)) {
    errorTitle = `${error.status} ${error.statusText}`;
    errorMessage = error.data?.message || "Sorry, something went wrong.";
  } else if (error instanceof Error) {
    errorTitle = "Oops! Something went wrong";
    errorMessage = error.message;
  } else {
    errorTitle = "Unknown Error";
    errorMessage = "An unexpected error occurred.";
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white border-4 border-[var(--ink)] rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="mb-6">
            <h1 
              className="text-6xl md:text-8xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              😵
            </h1>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {errorTitle}
            </h2>
            <p className="text-lg text-[var(--ink)] mb-8">
              {errorMessage}
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-[var(--coral)] text-white rounded-xl border-2 border-[var(--ink)] font-bold hover:bg-[var(--coral)]/90 transition-colors shadow-md"
            >
              ← Back to Home
            </Link>
            
            <div className="pt-4">
              <button
                onClick={() => window.location.reload()}
                className="text-[var(--ink)] underline hover:text-[var(--coral)] transition-colors"
              >
                Or try refreshing the page
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-[var(--stone)]">
            <p 
              className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Need help?
            </p>
            <p className="text-sm text-[var(--ink)]">
              If this error persists, please contact support or try navigating back to a previous page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
