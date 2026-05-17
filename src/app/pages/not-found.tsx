import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-[var(--coral)]" style={{ fontFamily: "var(--font-display)" }}>
          404
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Page Not Found
        </h1>
        <p className="text-lg text-[var(--ink)]">
          Looks like this restaurant isn't on our menu yet.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-[var(--coral)] text-white rounded-lg font-medium hover:bg-[var(--coral)]/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
