import { Link } from "react-router-dom";
import CustomerSidebar from "../../components/layout/CustomerSidebar";
import CustomerBottomNav from "../../components/layout/CustomerBottomNav";

function CustomerDashboard() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col md:flex-row">
      <CustomerSidebar />
      <main className="flex-1 md:ml-72">
        <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md flex items-center justify-between w-full px-6 md:px-margin-desktop h-16 border-b border-outline-variant">
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-headline-sm font-bold text-primary">
              DineMaster Pro
            </span>
            <h1 className="text-headline-md font-headline-md text-on-surface">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined">calendar_today</span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-margin-desktop max-w-7xl mx-auto space-y-8">
          <section>
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              Welcome back, Julian!
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mt-1">
              Ready for your next culinary adventure?
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-surface border border-outline-variant rounded-2xl shadow-sm p-6">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface">
                      Upcoming Reservations
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">
                      Your next table bookings at a glance.
                    </p>
                  </div>
                  <Link
                    className="text-primary text-label-md font-label-md hover:underline"
                    to="/my-reservations"
                  >
                    View All
                  </Link>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-2 hide-scrollbar">
                  <article className="min-w-[320px] bg-surface-container-lowest border border-outline-variant rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBdrkPeNJPV6_lVKCkuTZWcMb3kyxqBP0XAPTHapAZhxriMIG4Rm7cqaLbeN592FfOfcjjHYml7ry540JCBFocg16gEQflkoOAGXmjzdy_jgJ740NTNFh_2m4yR5Oeonm3Atsr5pH21ztglKS64TZa946pO68WNGgO7NKwUmxxiH_rprsYv4bah4Fnxxi9u2CO5oW9FjMCT_aAkIfscdl8yGbeDfkU-qjhp-kyB8qhCXpIQZwe_weND0Z8yv-yaR6yqdMf67lsJHQ')",
                      }}
                    />
                    <div className="p-5 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-container/90 text-secondary text-[11px] uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-secondary" />{" "}
                        Confirmed
                      </div>
                      <h4 className="text-body-lg font-semibold text-on-surface">
                        L'Ambroisie
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-body-sm text-on-surface-variant">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">
                            calendar_today
                          </span>
                          Oct 24, 2023
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">
                            schedule
                          </span>
                          19:30
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined">
                          groups
                        </span>
                        4 Persons
                      </div>
                    </div>
                  </article>
                  <article className="min-w-[320px] bg-surface-container-lowest border border-outline-variant rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFS5s0r7eVf1tPYWQBbRsUGMX2bxLwhpDZocW4EVPqw8jrjIjdPtKLpueXyP-tfchPzoBGt2p8oYWC9PViL0o6qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkKRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFANkJRUlQ787VzHoBnOnbNU_5LM2qU-gc7L8t1mJFoatWLzBbqm1hYH6MXFANkJRUlQ787VzHoBnOnbNU')",
                      }}
                    />
                    <div className="p-5 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed-dim/20 text-tertiary text-[11px] uppercase tracking-wide">
                        Pending
                      </div>
                      <h4 className="text-body-lg font-semibold text-on-surface">
                        Kyoto Bloom
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-body-sm text-on-surface-variant">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">
                            calendar_today
                          </span>
                          Nov 02, 2023
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px]">
                            schedule
                          </span>
                          19:00
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined">group</span>
                        2 Persons
                      </div>
                    </div>
                  </article>
                </div>
              </section>

              <section className="bg-surface-container-low rounded-3xl border border-outline-variant shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-headline-sm font-headline-sm text-on-surface">
                      SaaS performance updates
                    </h3>
                    <p className="text-body-sm text-on-surface-variant">
                      Insights that keep your experience seamless.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-outline-variant">
                    <div className="w-12 h-12 rounded-xl bg-primary-fixed-dim/20 flex items-center justify-center text-primary mb-4">
                      <span className="material-symbols-outlined">update</span>
                    </div>
                    <h4 className="text-body-lg font-semibold text-on-surface">
                      Real-time availability
                    </h4>
                    <p className="text-body-sm text-on-surface-variant mt-2">
                      Availability stays up to date as restaurants refresh their
                      calendars.
                    </p>
                  </div>
                  <div className="bg-primary text-on-primary rounded-3xl p-5 shadow-xl">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4">
                      <span className="material-symbols-outlined">
                        flash_on
                      </span>
                    </div>
                    <h4 className="text-body-lg font-semibold">
                      Instant confirmation
                    </h4>
                    <p className="text-body-sm text-on-primary/80 mt-2">
                      Your bookings are confirmed the moment they're reserved.
                    </p>
                  </div>
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-outline-variant">
                    <div className="w-12 h-12 rounded-xl bg-tertiary-fixed-dim/20 flex items-center justify-center text-tertiary mb-4">
                      <span className="material-symbols-outlined">
                        line_style
                      </span>
                    </div>
                    <h4 className="text-body-lg font-semibold text-on-surface">
                      Personalized dining
                    </h4>
                    <p className="text-body-sm text-on-surface-variant mt-2">
                      Save preferences and let us handle the details for every
                      reservation.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <section className="bg-inverse-surface text-white rounded-3xl p-8 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_40%)]" />
                <h3 className="text-headline-lg font-display-lg mb-4">
                  Ready for an unforgettable evening?
                </h3>
                <p className="text-body-lg text-white/70 mb-6">
                  Secure top dining spots at the city's most coveted
                  destinations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-primary-container transition-all">
                    Get Started
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/20">
                    View All Cities
                  </button>
                </div>
              </section>
              <section className="bg-surface-container-low rounded-3xl p-6 border border-outline-variant shadow-sm">
                <h3 className="text-headline-sm font-headline-sm mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-2xl border border-outline-variant hover:shadow-sm transition-all">
                    <span>New Booking</span>
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-surface rounded-2xl border border-outline-variant hover:shadow-sm transition-all">
                    <span>Account Settings</span>
                    <span className="material-symbols-outlined">settings</span>
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
      <CustomerBottomNav />
    </div>
  );
}

export default CustomerDashboard;
