import { useEffect } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    const handler = () => {
      const nav = document.getElementById("top-nav");
      const logo = document.getElementById("nav-logo");
      const links = document.querySelectorAll(".landing-link");
      if (window.scrollY > 100) {
        nav?.classList.add("scrolled");
        logo?.classList.replace("text-white", "text-primary");
        links?.forEach((link) => {
          link.classList.replace("text-white/90", "text-on-surface-variant");
          if (link.textContent === "Login") link.classList.add("text-white");
        });
      } else {
        nav?.classList.remove("scrolled");
        logo?.classList.replace("text-primary", "text-white");
        links?.forEach((link) => {
          link.classList.replace("text-on-surface-variant", "text-white/90");
          if (link.textContent === "Login") link.classList.add("text-white");
        });
      }
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden">
      <nav
        id="top-nav"
        className="fixed top-0 left-0 w-full z-[100] h-20 glass-nav"
      >
        <div className="flex justify-between items-center w-full px-margin-desktop max-w-7xl mx-auto h-full">
          <div
            id="nav-logo"
            className="text-headline-md font-headline-md font-bold text-white transition-colors duration-300"
          >
            DineMaster Pro
          </div>
          <div className="hidden md:flex items-center space-x-xl">
            <Link
              className="landing-link text-label-md font-label-md text-white/90 hover:text-white transition-colors"
              to="#"
            >
              Explore
            </Link>
            <Link
              className="landing-link text-label-md font-label-md text-white/90 hover:text-white transition-colors"
              to="#"
            >
              Restaurants
            </Link>
            <Link
              className="landing-link text-label-md font-label-md text-white/90 hover:text-white transition-colors"
              to="#"
            >
              Corporate
            </Link>
            <div className="h-6 w-[1px] bg-white/20" />
            <Link
              className="landing-link text-label-md font-label-md text-white transition-all"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="landing-link bg-primary hover:bg-primary/90 text-on-primary px-lg py-sm rounded-lg font-label-md transition-all active:scale-95 shadow-lg"
              to="/register"
            >
              Register
            </Link>
          </div>
          <Link className="md:hidden text-white" to="#">
            <span className="material-symbols-outlined">menu</span>
          </Link>
        </div>
      </nav>

      <header className="relative w-full h-[921px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsoA2RFu6JguLC4pHBDjBzAQz8f6pmrjaE6tU2A5CwGpIlmXHm5khKLwz-_eKtjLWwdeAs8HBouAg3hFVnHupimeq1EM8hfEKwixKRlYQzAtc77i9zC_h5EuH7L8QE00EPBnfbk9ErmQa5fzOJRgYuREuoEN_orp8SMAysjaFf9qWWYB4-zMjTva2QhdZfGzU8b5MEVzLBBOtdogldEOxnkVjsZe2WkGqeuES_N7Hk0BKKaoWKMZdDdasczQkLM3SSeb2NB2O6QA')",
            }}
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 w-full px-margin-desktop max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="inline-block px-md py-xs rounded-full bg-primary/20 border border-primary/30 text-primary-fixed text-label-sm font-label-sm mb-lg animate-fade-in">
            EXCEPTIONAL DINING AWAITS
          </span>
          <h1 className="text-white font-display-lg text-display-lg max-w-4xl leading-tight mb-xl tracking-tight">
            The Art of Dining,{" "}
            <span className="text-primary-fixed">Simplified.</span>
          </h1>
          <p className="text-white/80 font-body-lg text-body-lg max-w-2xl mb-xxl">
            Elevate your culinary journey with instant access to the world's
            most prestigious tables. Experience seamless reservations and
            personalized service at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-md w-full sm:w-auto">
            <Link
              className="bg-primary hover:bg-primary-container text-on-primary px-xxl py-md rounded-xl font-headline-sm transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-sm"
              to="/new-reservation"
            >
              Book a Table
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-xxl py-md rounded-xl font-headline-sm transition-all flex items-center justify-center">
              Explore Menu
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
      </header>

      <section className="py-xxl w-full bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xxl items-center">
            <div className="lg:col-span-7 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700">
                <img
                  className="w-full h-[500px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQdCy44VTUY0qfGZMm6uhx-dg2lXekbxgNZOjF2gvJAhi66kgoUewP-iM-sq_ylOIsd0_bzbD_i-LZKVEiy9DTJVN5Kj-4qU7CfwadW93FHs42zWHBP4t-X9fPOMXVxYI3hMJTU1a6CPgccrTisSP9XX__kFQnhHIXaD6b8WP-4Elq5EqPAVSxJsq9YSubfSsfNl0CBGuf90t8MDV29FcBEfVJl2qKjDyShuhsHludzODTMiZ_96_e_Qrfam1bpmVnhyFUBTR4qQ"
                  alt="Chef plating dish"
                />
              </div>
              <div className="absolute -bottom-xl -right-xl z-20 hidden md:block w-72 aspect-square rounded-2xl overflow-hidden border-8 border-background shadow-xl transform rotate-3">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmrjWjagheEqXs_E6SGlBL8UlY_UV_LC_1biJAegDhISAtReagO7KyT3nPu0HsTgXHcBVuGwae1SGX3RFfU4I7YSsp3OsGP3YTGZmI2EX76IL6OVyEp4HGIlDXGRJ-eDr79UMIhfHptUqzuaoZz9a0yvCQ09SOEoYU0xuIJvekDoUG4oCCHmZBUga3Xa3B7dJkI1RhP3WcqoJXqUIYvYqo1bcr5G6dhDOi8Db5X2h4Doc-zEdm1QtwIUz_kDik2ldthDANlI7kSg"
                  alt="Seafood appetizer"
                />
              </div>
              <div className="absolute -top-xl -left-xl w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0" />
            </div>
            <div className="lg:col-span-5 flex flex-col space-y-lg">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Curated by Gastronomy Experts
              </h2>
              <div className="w-16 h-1 bg-primary" />
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                HauteReserve isn't just a platform; it's your personal concierge
                to the culinary elite. We partner exclusively with
                establishments that define excellence in flavor, service, and
                ambiance.
              </p>
              <div className="flex items-center gap-md p-md bg-surface-container rounded-xl border border-outline-variant">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm">
                    Elite Partners
                  </p>
                  <p className="text-body-sm text-on-surface-variant">
                    Over 500 Michelin-starred partners globally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-xxl bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-margin-desktop">
          <div className="text-center mb-xxl">
            <h2 className="font-headline-lg text-headline-lg mb-md">
              SaaS Performance, Hospitality Soul
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Our technology works behind the scenes to ensure your arrival is
              as seamless as your meal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div className="group bg-surface hover:bg-white p-xl rounded-2xl border border-outline-variant hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary-fixed-dim/20 flex items-center justify-center text-primary mb-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">
                    update
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm mb-md">
                  Real-time availability
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Never see a stale listing. Our deep integration with
                  restaurant POS systems ensures what you see is what you get.
                </p>
              </div>
            </div>
            <div className="group bg-primary text-on-primary p-xl rounded-2xl shadow-xl flex flex-col justify-between transform md:-translate-y-4">
              <div>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-white mb-lg group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">
                    flash_on
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm mb-md">
                  Instant confirmation
                </h3>
                <p className="text-on-primary/80">
                  No more waiting for callbacks. Your table is secured the
                  millisecond you click 'Book', with automated calendar sync.
                </p>
              </div>
            </div>
            <div className="group bg-surface hover:bg-white p-xl rounded-2xl border border-outline-variant hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-tertiary-fixed-dim/20 flex items-center justify-center text-tertiary mb-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">
                    line_style
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm mb-md">
                  Personalized dining
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  Save preferences, dietary needs, and favorite tables. We
                  communicate your unique needs to the maître d' for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-64 relative bg-background flex items-center justify-center">
        <div className="relative z-10 text-center px-margin-mobile">
          <blockquote className="font-display-lg text-headline-lg italic text-on-surface-variant opacity-60">
            "The table is where life happens."
          </blockquote>
        </div>
      </section>

      <section className="py-xxl bg-inverse-surface text-white">
        <div className="max-w-7xl mx-auto px-margin-desktop">
          <div className="rounded-3xl overflow-hidden relative h-[400px] flex items-center p-xl lg:p-xxl">
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnj9BB5ctjG9ciqZ362BQzXfwSf3dAmMJ9KqQA-rBM4H162WPEHJWqmBrlEJMYQX3I5CASfEsz9CRPVqy1ScNaOTSnQ49_m_Q-6BqNj-lVsDkxlhynAefDw6PvSGYIltOQUUPTLsWutcZvwxDPeiE2W0D_jl_Rz2Hcgt46uKK49-FeIHlBAKjRVO6XwWPHEYTuZbrTnJL27T4HENyL0Lq7P2ek-nN7hEBstsHc_j7y0xcxqKlj6JsXLghDq5P06_CLUvq3C9QwIA"
                alt="Cozy bar interior"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <div className="relative z-10 max-w-xl flex flex-col space-y-lg">
              <h2 className="font-display-lg text-headline-lg lg:text-display-lg">
                Ready for an unforgettable evening?
              </h2>
              <p className="text-body-lg text-white/70">
                Join thousands of discerning diners and secure your spot at the
                city's most coveted destinations.
              </p>
              <div className="flex gap-md">
                <button className="bg-primary hover:bg-primary-container text-on-primary px-xl py-md rounded-xl font-headline-sm transition-all active:scale-95 shadow-lg">
                  Get Started
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-xl py-md rounded-xl font-headline-sm transition-all border border-white/20">
                  View All Cities
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-surface-container-highest py-xxl">
        <div className="max-w-7xl mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-xl">
          <div className="md:col-span-1">
            <div className="text-headline-sm font-headline-sm font-bold text-primary mb-lg">
              DineMaster Pro
            </div>
            <p className="text-body-sm text-on-surface-variant mb-lg">
              Redefining the reservation experience for the modern epicurean.
            </p>
            <div className="flex gap-md">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
                public
              </span>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
                alternate_email
              </span>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">
                share
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface mb-md">
              RESOURCES
            </h4>
            <ul className="space-y-sm">
              <li>
                <Link
                  className="text-body-sm text-on-surface-variant hover:text-primary"
                  to="#"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  className="text-body-sm text-on-surface-variant hover:text-primary"
                  to="#"
                >
                  Restaurant Portal
                </Link>
              </li>
              <li>
                <Link
                  className="text-body-sm text-on-surface-variant hover:text-primary"
                  to="#"
                >
                  Cities
                </Link>
              </li>
              <li>
                <Link
                  className="text-body-sm text-on-surface-variant hover:text-primary"
                  to="#"
                >
                  Concierge
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface mb-md">
              SUPPORT
            </h4>
            <ul className="space-y-sm">
              <li>
                <Link
                  className="text-body-sm text-on-surface-variant hover:text-primary"
                  to="#"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  className="text-body-sm text-on-surface-variant hover:text-primary"
                  to="#"
                >
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link
                  className="text-body-sm text-on-surface-variant hover:text-primary"
                  to="#"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-body-sm text-on-surface-variant hover:text-primary"
                  to="#"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface mb-md">
              NEWSLETTER
            </h4>
            <p className="text-body-sm text-on-surface-variant mb-md">
              Be the first to know about new restaurant openings.
            </p>
            <div className="flex gap-xs">
              <input
                className="bg-surface rounded-lg border-outline-variant text-body-sm focus:ring-primary focus:border-primary flex-1 px-md py-sm"
                placeholder="Email address"
                type="email"
              />
              <button className="bg-primary text-on-primary px-md rounded-lg text-body-sm">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-margin-desktop mt-xxl pt-lg border-t border-outline-variant flex flex-col md:flex-row justify-between items-center text-body-sm text-on-surface-variant opacity-60">
          <p>© 2024 DineMaster Pro. All rights reserved.</p>
          <div className="flex gap-lg mt-md md:mt-0">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
