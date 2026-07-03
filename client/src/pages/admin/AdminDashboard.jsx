import AdminSidebar from "../../components/layout/AdminSidebar";

function AdminDashboard() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 ml-72">
        <header className="sticky top-0 z-30 bg-surface-container-highest/80 backdrop-blur-xl border-b border-outline-variant px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">
              Executive Dashboard
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              Real-time performance analytics for HauteReserve Main Branch.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 bg-surface-container-high text-on-surface px-4 py-2 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">download</span>
              Export Report
            </button>
            <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-container transition-all shadow-sm">
              <span className="material-symbols-outlined">add</span>
              New Reservation
            </button>
          </div>
        </header>

        <div className="p-6 md:p-margin-desktop max-w-7xl mx-auto space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="glass-card rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary-fixed rounded-2xl text-primary">
                  <span className="material-symbols-outlined">
                    calendar_month
                  </span>
                </div>
                <span className="text-secondary text-label-sm font-label-sm">
                  +12% vs last week
                </span>
              </div>
              <p className="text-label-md font-label-md text-on-surface-variant">
                Total Reservations
              </p>
              <h2 className="text-headline-md font-headline-md font-bold mt-3">
                1,284
              </h2>
            </div>
            <div className="glass-card rounded-3xl p-6 shadow-sm border-l-4 border-l-secondary">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-secondary-fixed-dim rounded-2xl text-secondary">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <span className="text-secondary text-label-sm font-label-sm">
                  +8% vs last month
                </span>
              </div>
              <p className="text-label-md font-label-md text-on-surface-variant">
                Guest Satisfaction
              </p>
              <h2 className="text-headline-md font-headline-md font-bold mt-3">
                98.4%
              </h2>
            </div>
            <div className="glass-card rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-tertiary-fixed-dim rounded-2xl text-tertiary">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <span className="text-secondary text-label-sm font-label-sm">
                  2 new today
                </span>
              </div>
              <p className="text-label-md font-label-md text-on-surface-variant">
                New Guests
              </p>
              <h2 className="text-headline-md font-headline-md font-bold mt-3">
                312
              </h2>
            </div>
            <div className="glass-card rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary-container rounded-2xl text-on-primary-container">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="text-primary text-label-sm font-label-sm">
                  Stable
                </span>
              </div>
              <p className="text-label-md font-label-md text-on-surface-variant">
                Revenue
              </p>
              <h2 className="text-headline-md font-headline-md font-bold mt-3">
                $45.2K
              </h2>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-3xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-headline-sm font-headline-sm text-on-surface">
                    Reservation Trends
                  </h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Bookings by time window and status.
                  </p>
                </div>
                <button className="text-primary text-label-sm font-label-sm hover:underline">
                  View details
                </button>
              </div>
              <div className="h-72 rounded-3xl bg-surface border border-outline-variant flex items-center justify-center text-on-surface-variant">
                Chart placeholder
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-headline-sm font-headline-sm text-on-surface">
                  Notifications
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-1">
                  3 NEW
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Loyalty Reward Earned!",
                    description: "You've unlocked Gold status at L'Ambroisie.",
                    time: "2 hours ago",
                  },
                  {
                    title: "Booking Confirmed",
                    description: "Your table at Azure Terrace is confirmed.",
                    time: "Yesterday",
                  },
                  {
                    title: "Restaurant Update",
                    description: "Oceanic Grill updated their seasonal menu.",
                    time: "2 days ago",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl bg-white p-4 shadow-sm border border-outline-variant"
                  >
                    <p className="font-semibold text-on-surface">
                      {item.title}
                    </p>
                    <p className="text-body-sm text-on-surface-variant mt-1">
                      {item.description}
                    </p>
                    <p className="text-[11px] text-on-surface-variant font-medium mt-2">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full rounded-2xl bg-surface text-on-surface py-3 border border-outline-variant hover:bg-surface-container-high transition-colors">
                Mark all as read
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
