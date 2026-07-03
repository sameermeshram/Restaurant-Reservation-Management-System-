import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomerSidebar from "../../components/layout/CustomerSidebar";
import CustomerBottomNav from "../../components/layout/CustomerBottomNav";
import {
  fetchMyReservations,
  cancelReservation,
} from "../../services/reservationService";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingIds, setDeletingIds] = useState([]);
  const navigate = useNavigate();

  const loadReservations = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchMyReservations();
      setReservations(response.data.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load reservations. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleCancel = async (reservationId) => {
    setDeletingIds((current) => [...current, reservationId]);
    setError("");

    try {
      await cancelReservation(reservationId);
      await loadReservations();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to cancel reservation. Please try again.",
      );
    } finally {
      setDeletingIds((current) => current.filter((id) => id !== reservationId));
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col md:flex-row">
      <CustomerSidebar />
      <main className="flex-1 md:ml-72">
        <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md flex items-center justify-between w-full px-6 md:px-margin-desktop h-16 border-b border-outline-variant">
          <h1 className="text-headline-md font-headline-md text-on-surface">
            My Reservations
          </h1>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo8XpNMGybB2VWHT9E6pI9JIyna8lfKUvnXCL_Gwzxowaq3oAUDSPhou_KwEpCb6ICBFmGaUkKUysNdvZ2NDqnHV8qpvkW3Mj4fwT7rJhwiYgYY7uAiuKW7uzYdb0PUD_DrwAAplvHz9nY7YJvXwjA9RnY8uXk_e3xA17widd1pt7Nsq2OKGQ-s6zPMbtw7iDBI6FXS-AgxMvkopHd2Rvwoll6Tk6ujgfKVHolRAOLFdo_ijAABZmp4nvggvcKcLQ61JpqRjTmCQ"
                alt="Guest avatar"
              />
            </div>
          </div>
        </header>

        <div className="p-6 md:p-margin-desktop max-w-7xl mx-auto space-y-8">
          <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wide">
                Reservations
              </p>
              <h2 className="text-headline-sm font-headline-sm text-on-surface">
                Keep track of upcoming bookings
              </h2>
            </div>
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full font-medium hover:bg-primary-container transition-all active:scale-[0.98]"
              type="button"
              onClick={() => navigate("/new-reservation")}
            >
              <span className="material-symbols-outlined">add</span>
              New Booking
            </button>
          </section>

          {error && (
            <div className="rounded-3xl border border-error bg-error/10 p-4 text-error text-body-sm">
              {error}
            </div>
          )}

          <section className="bg-surface-container-lowest border border-outline-variant rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant">
                      Reference
                    </th>
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant">
                      Guests
                    </th>
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant">
                      Table
                    </th>
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant">
                      Status
                    </th>
                    <th className="px-6 py-4 text-label-md font-label-md text-on-surface-variant text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-body-md text-on-surface-variant"
                      >
                        Loading reservations...
                      </td>
                    </tr>
                  ) : reservations.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-body-md text-on-surface-variant"
                      >
                        No reservations found. Create your first booking.
                      </td>
                    </tr>
                  ) : (
                    reservations.map((reservation) => {
                      const isDeleting = deletingIds.includes(reservation._id);
                      const reservationDate = new Date(
                        reservation.reservationDate,
                      );
                      return (
                        <tr
                          key={reservation._id}
                          className="hover:bg-surface-container-high/50 transition-colors"
                        >
                          <td className="px-6 py-4 text-label-md font-bold text-primary">
                            {`#RES-${reservation._id.slice(-6).toUpperCase()}`}
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-body-md font-semibold text-on-surface">
                              {reservationDate.toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                            <p className="text-body-sm text-on-surface-variant">
                              {reservation.timeSlot}
                            </p>
                          </td>
                          <td className="px-6 py-4 flex items-center gap-2 text-on-surface-variant">
                            <span className="material-symbols-outlined">
                              groups
                            </span>
                            {reservation.guests} Persons
                          </td>
                          <td className="px-6 py-4 text-body-md font-medium">
                            {reservation.table?.tableNumber || "TBD"}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container border border-on-secondary-container/20">
                              {reservation.status || "Confirmed"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-lg transition-all"
                                to={`/reservation/${reservation._id}`}
                              >
                                <span className="material-symbols-outlined">
                                  visibility
                                </span>
                              </Link>
                              <button
                                className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container rounded-lg transition-all"
                                type="button"
                                onClick={() => handleCancel(reservation._id)}
                                disabled={isDeleting}
                              >
                                <span className="material-symbols-outlined">
                                  {isDeleting ? "hourglass_top" : "close"}
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <CustomerBottomNav />
    </div>
  );
}

export default MyReservations;
