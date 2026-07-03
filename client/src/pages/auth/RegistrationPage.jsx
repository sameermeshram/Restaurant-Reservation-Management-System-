import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const strengthLabels = [
  "Password strength",
  "Very Weak",
  "Weak",
  "Good",
  "Excellent",
];
const strengthColors = [
  "bg-error",
  "bg-error",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-secondary",
];

function getPasswordStrength(password) {
  let strength = 0;
  if (password.length > 0) strength++;
  if (password.length > 6) strength++;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return Math.min(strength, 4);
}

function RegistrationPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = getPasswordStrength(password);
  const passwordStrengthLabel = strengthLabels[passwordStrength];
  const passwordStrengthClasses = useMemo(() => {
    return Array.from({ length: 4 }, (_, index) => {
      const active = index < passwordStrength;
      return [
        "strength-meter-segment",
        "flex-1",
        active ? strengthColors[passwordStrength] : "bg-surface-bright",
      ].join(" ");
    });
  }, [passwordStrength]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register({ name: fullName, email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to register. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-center p-md">
      <main className="relative z-10 w-full max-w-[480px] animate-fade-in">
        <div className="text-center mb-xl">
          <h1 className="text-primary font-headline-lg text-headline-lg flex items-center justify-center gap-sm">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              restaurant
            </span>
            HauteReserve
          </h1>
          <p className="text-on-surface-variant text-body-md font-body-md mt-sm">
            The gold standard in table management.
          </p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg p-xl">
          <h2 className="text-on-surface font-headline-md text-headline-md mb-md">
            Create your account
          </h2>
          <form
            className="space-y-lg"
            id="registrationForm"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="rounded-lg border border-error bg-error/10 p-md text-error text-body-sm">
                {error}
              </div>
            )}
            <div className="space-y-xs">
              <label
                className="block text-on-surface-variant font-label-md text-label-md"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  person
                </span>
                <input
                  className="w-full h-12 pl-11 pr-md bg-surface-bright border border-outline-variant rounded-lg text-body-md font-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-xs">
              <label
                className="block text-on-surface-variant font-label-md text-label-md"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  mail
                </span>
                <input
                  className="w-full h-12 pl-11 pr-md bg-surface-bright border border-outline-variant rounded-lg text-body-md font-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  id="email"
                  name="email"
                  placeholder="name@restaurant.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-xs">
              <label
                className="block text-on-surface-variant font-label-md text-label-md"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  lock
                </span>
                <input
                  className="w-full h-12 pl-11 pr-md bg-surface-bright border border-outline-variant rounded-lg text-body-md font-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="pt-2 space-y-2">
                <div className="flex gap-1 w-full">
                  {passwordStrengthClasses.map((className, index) => (
                    <div key={index} className={className} />
                  ))}
                </div>
                <p
                  className={`text-label-sm font-label-sm ${
                    passwordStrength === 1
                      ? "text-error"
                      : passwordStrength === 2
                        ? "text-orange-500"
                        : passwordStrength === 3
                          ? "text-yellow-500"
                          : passwordStrength === 4
                            ? "text-secondary"
                            : "text-outline"
                  }`}
                >
                  {passwordStrengthLabel}
                </p>
              </div>
            </div>
            <div className="space-y-xs">
              <label
                className="block text-on-surface-variant font-label-md text-label-md"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  verified_user
                </span>
                <input
                  className="w-full h-12 pl-11 pr-md bg-surface-bright border border-outline-variant rounded-lg text-body-md font-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              className="w-full h-12 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary-container transition-all active:scale-[0.98] mt-sm flex items-center justify-center gap-sm"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? "Creating account..." : "Create Account"}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
          <div className="mt-xl text-center">
            <p className="text-on-surface-variant text-body-sm font-body-sm">
              Already have an account?
              <Link
                className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 ml-1"
                to="/login"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-md mt-lg">
          <div className="bg-surface-container border border-outline-variant p-md rounded-lg flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-1 rounded">
              verified
            </span>
            <span className="text-label-sm font-label-sm text-on-surface">
              SOC2 Compliant
            </span>
          </div>
          <div className="bg-surface-container border border-outline-variant p-md rounded-lg flex items-center gap-sm">
            <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-1 rounded">
              support_agent
            </span>
            <span className="text-label-sm font-label-sm text-on-surface">
              24/7 Concierge
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistrationPage;
