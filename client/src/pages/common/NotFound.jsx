import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center px-margin-mobile py-24">
      <div className="max-w-xl w-full bg-surface-container-high rounded-[32px] border border-outline-variant p-10 text-center shadow-lg">
        <span className="text-[96px] leading-none text-primary">404</span>
        <h1 className="text-headline-lg font-headline-lg mt-6">
          Page Not Found
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-4">
          The page you are looking for does not exist.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary-container transition"
          >
            Go Home
          </Link>
          <Link
            to="/login"
            className="border border-outline-variant px-6 py-3 rounded-xl text-on-surface hover:bg-surface-container-high transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
