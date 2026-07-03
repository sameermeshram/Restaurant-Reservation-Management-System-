import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((current) => !current);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to login. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-hidden min-h-screen flex">
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-inverse-surface">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-10000 hover:scale-110"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjDXtxhVbsLM3nERdH1MLpl_5g3Qyhc32H-39VNz2LtJtw-QwuO5eupVxVinIYFBCfOCGVxqOWmCjfgapAyeBMfLhquPpoRVsjyU4JVTdSH6jHHeUy0Ud6atgeqbcz362aDaB3yqLi0HBQtR-cTQaeAes_FsdhA7OAfc0Bkx4vfRAC3u9FD6_Sb7AKHdIsWJNZie5ek5ryRDzKHTxIau-fkoJOW1uk2RvnH6C8R3NPsSjQ-hF0ICHlBmb1xIpx5kUiYboY2vw3Kw')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-on-background/80 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 p-margin-desktop flex flex-col justify-between h-full w-full">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white">
                restaurant_menu
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm text-white tracking-tight font-bold">
              HauteReserve
            </span>
          </div>
          <div className="max-w-md">
            <h1 className="font-display-lg text-display-lg text-white mb-sm">
              Master the art of service.
            </h1>
            <p className="font-body-lg text-body-lg text-white/80">
              Experience the world's most precise reservation management system
              designed for the culinary elite.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full lg:w-1/2 flex items-center justify-center bg-surface-container-lowest p-margin-mobile relative">
        <div className="absolute top-8 left-margin-mobile lg:hidden flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">
              restaurant_menu
            </span>
          </div>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            HauteReserve
          </span>
        </div>

        <div className="w-full max-w-[440px] px-sm md:px-0">
          <div className="bg-surface lg:bg-transparent p-gutter lg:p-0 rounded-xl login-card-shadow lg:shadow-none border border-outline-variant lg:border-none">
            <header className="mb-xl text-center lg:text-left">
              <h2 className="font-headline-lg text-headline-lg lg:text-[32px] lg:leading-[40px] text-on-surface mb-xs">
                Welcome back
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Please enter your credentials to access the portal.
              </p>
            </header>
            <form className="space-y-lg" id="loginForm" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-lg border border-error bg-error/10 p-md text-error text-body-sm">
                  {error}
                </div>
              )}
              <div className="space-y-xs">
                <label
                  className="font-label-md text-label-md text-on-surface-variant ml-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    className="w-full h-[48px] px-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none placeholder:text-outline"
                    id="email"
                    placeholder="name@restaurant.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary">
                    mail
                  </span>
                </div>
              </div>
              <div className="space-y-xs">
                <div className="flex justify-between items-center px-1">
                  <label
                    className="font-label-md text-label-md text-on-surface-variant"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    className="font-label-md text-label-md text-primary hover:underline transition-all"
                    to="#"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    className="w-full h-[48px] px-md bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none placeholder:text-outline"
                    id="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    onClick={togglePassword}
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-1">
                <input
                  className="w-4 h-4 text-primary bg-surface-container-lowest border-outline-variant rounded focus:ring-primary"
                  id="remember"
                  type="checkbox"
                />
                <label
                  className="font-label-md text-label-md text-on-surface-variant cursor-pointer select-none"
                  htmlFor="remember"
                >
                  Remember this device
                </label>
              </div>
              <button
                className="w-full h-[52px] bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:shadow-md hover:bg-primary-container active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
                type="submit"
                disabled={loading}
              >
                <span>{loading ? "Signing in..." : "Login to Dashboard"}</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
              <div className="relative py-md">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant"></div>
                </div>
                <div className="relative flex justify-center text-label-sm uppercase">
                  <span className="bg-surface-container-lowest px-md text-on-surface-variant font-label-sm">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-gutter">
                <button
                  className="flex items-center justify-center h-[44px] border border-outline-variant rounded-lg bg-white hover:bg-surface-container-low transition-colors"
                  type="button"
                >
                  <img
                    alt="Google"
                    className="w-5 h-5 mr-2"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuACQ2dWljzt0L8_x52Ms_o-YtHCb1lG3ySMaNVzna7JmssiZ3SN2wA47mUXwPtgPhFihuyss4TaYcVUDc7OKKJCSQmoDRCBYO8klFafozTbaKS2de0vU4ofrt6wD0sJIPt1heoQyZ5BFfxV-y9aqIAEc5-wHt3qRTfPa2gKGMYcTd8TS6Kn4gGRXekxbdYjNi6KcKPcFOdhi1-18tmQDOouBI4DwT_3ti3wlQmdakTkVdrFrK-XylncqK3dz2bGzN0TwKZwYaMFUw"
                  />
                  <span className="font-label-md text-label-md text-on-surface">
                    Google
                  </span>
                </button>
                <button
                  className="flex items-center justify-center h-[44px] border border-outline-variant rounded-lg bg-white hover:bg-surface-container-low transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined mr-2 text-on-surface">
                    apps
                  </span>
                  <span className="font-label-md text-label-md text-on-surface">
                    Apple
                  </span>
                </button>
              </div>
            </form>
            <footer className="mt-xl text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Don't have an account?
                <Link
                  className="font-label-md text-label-md text-primary font-bold hover:underline ml-1"
                  to="/register"
                >
                  Register Now
                </Link>
              </p>
            </footer>
          </div>
          <div className="absolute bottom-8 w-full px-margin-mobile flex justify-between items-center max-w-[440px] lg:max-w-none lg:px-margin-desktop">
            <span className="font-label-sm text-label-sm text-outline">
              © 2024 DineMaster Pro
            </span>
            <div className="flex space-x-xl">
              <Link
                className="font-label-sm text-label-sm text-outline hover:text-on-surface-variant transition-colors"
                to="#"
              >
                Privacy
              </Link>
              <Link
                className="font-label-sm text-label-sm text-outline hover:text-on-surface-variant transition-colors"
                to="#"
              >
                Terms
              </Link>
              <Link
                className="font-label-sm text-label-sm text-outline hover:text-on-surface-variant transition-colors"
                to="#"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
