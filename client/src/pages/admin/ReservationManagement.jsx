import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import {
  fetchAdminReservations,
  updateAdminReservation,
  cancelAdminReservation,
} from "../../services/reservationService";
import { getErrorMessage } from "../../utils/errorMessage";
import { reservationStatusOptions, timeSlots } from "../../utils/constants";

const statusOptions = reservationStatusOptions;

function ReservationManagement() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [statusFilter, setStatusFilter] = useState(statusOptions[0]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [editValues, setEditValues] = useState({
    reservationDate: "",
    timeSlot: "",
    guests: 1,
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const loadReservations = async () => {
    setLoading(true);
    setError("");

    try {
      const params = {};
      if (filterDate) params.date = filterDate;
      const response = await fetchAdminReservations(params);
      setReservations(response.data.data || []);
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to load reservations. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesSearch = searchQuery
        ? [
            reservation.customer?.name,
            reservation.customer?.email,
            reservation.table?.tableNumber,
          ]
            .filter(Boolean)
            .some((field) =>
              field.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        : true;
      const matchesStatus =
        statusFilter === statusOptions[0] ||
        reservation.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchQuery, statusFilter]);

  const startEditing = (reservation) => {
    setEditingReservation(reservation);
    setEditValues({
      reservationDate: reservation.reservationDate?.slice(0, 10) || "",
      timeSlot: reservation.timeSlot || "",
      guests: reservation.guests || 1,
    });
    setError("");
  };

  const cancelEditing = () => {
    setEditingReservation(null);
    setEditValues({ reservationDate: "", timeSlot: "", guests: 1 });
  };

  const handleSave = async () => {
    if (!editingReservation) return;
    setSaving(true);
    setError("");

    try {
      await updateAdminReservation(editingReservation._id, {
        reservationDate: editValues.reservationDate,
        timeSlot: editValues.timeSlot,
        guests: editValues.guests,
      });
      await loadReservations();
      cancelEditing();
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to update reservation. Please try again."),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancelReservation = async (reservationId) => {
    setDeletingId(reservationId);
    setError("");

    try {
      await cancelAdminReservation(reservationId);
      await loadReservations();
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to cancel reservation. Please try again."),
      );
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 ml-72">
        <header className="sticky top-0 z-30 bg-surface-container-highest/80 backdrop-blur-xl border-b border-outline-variant px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">
              Reservations
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              Manage today's guest list and upcoming bookings.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={loadReservations}
              className="flex items-center gap-2 bg-surface-container-high text-on-surface px-4 py-2 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined">refresh</span>
              Refresh
            </button>
          </div>
        </header>

        <div className="p-6 md:p-margin-desktop space-y-8 max-w-7xl mx-auto">
          {error && (
            <div className="rounded-3xl border border-error bg-error/10 p-4 text-error text-body-sm">
              {error}
            </div>
          )}

          <section className="bg-surface border border-outline-variant rounded-3xl shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
              <div className="flex-1">
                <p className="text-label-sm font-label-sm uppercase tracking-wide text-on-surface-variant">
                  Search
                </p>
                <div className="relative mt-3">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    search
                  </span>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Search by customer, email, or table..."
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 flex-1">
                <div className="relative">
                  <label className="sr-only" htmlFor="date-filter">
                    Filter by date
                  </label>
                  <input
                    id="date-filter"
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full border border-outline-variant rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none bg-white"
                  />
                </div>
                <div className="relative">
                  <label className="sr-only" htmlFor="status-filter">
                    Filter by status
                  </label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full appearance-none border border-outline-variant rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none bg-white"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    expand_more
                  </span>
                </div>
                <button
                  type="button"
                  onClick={loadReservations}
                  className="w-full bg-primary text-white rounded-2xl py-3 hover:bg-primary-container transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </section>

          {editingReservation && (
            <section className="bg-surface border border-outline-variant rounded-3xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-headline-sm font-headline-sm text-on-surface">
                    Edit Reservation
                  </h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Make changes and save or cancel to leave the reservation
                    unchanged.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  Cancel Edit
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editValues.reservationDate}
                    onChange={(e) =>
                      setEditValues((current) => ({
                        ...current,
                        reservationDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-outline-variant px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant">
                    Time slot
                  </label>
                  <select
                    value={editValues.timeSlot}
                    onChange={(e) =>
                      setEditValues((current) => ({
                        ...current,
                        timeSlot: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-outline-variant px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose time</option>
                    <option value="19:00 PM">19:00 PM</option>
                    <option value="19:30 PM">19:30 PM</option>
                    <option value="20:00 PM">20:00 PM</option>
                    <option value="20:30 PM">20:30 PM</option>
                  </select>
                </div>
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant">
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editValues.guests}
                    onChange={(e) =>
                      setEditValues((current) => ({
                        ...current,
                        guests: Number(e.target.value),
                      }))
                    }
                    className="w-full rounded-2xl border border-outline-variant px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-primary text-white rounded-2xl px-6 py-3 hover:bg-primary-container transition-all disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="bg-surface-container-high text-on-surface rounded-2xl px-6 py-3 hover:bg-surface-container-low transition-all"
                >
                  Cancel
                </button>
              </div>
            </section>
          )}

          <section className="bg-surface-container-lowest border border-outline-variant rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant">
                      Customer
                    </th>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant">
                      Date
                    </th>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant">
                      Time Slot
                    </th>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant">
                      Guests
                    </th>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant">
                      Table
                    </th>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant">
                      Status
                    </th>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-10 text-center text-on-surface-variant"
                      >
                        Loading reservations...
                      </td>
                    </tr>
                  ) : filteredReservations.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-10 text-center text-on-surface-variant"
                      >
                        No reservations match your filter.
                      </td>
                    </tr>
                  ) : (
                    filteredReservations.map((reservation) => {
                      const reservationDate = new Date(
                        reservation.reservationDate,
                      );
                      const isDeleting = deletingId === reservation._id;

                      return (
                        <tr
                          key={reservation._id}
                          className="hover:bg-surface-container-high/50 transition-colors"
                        >
                          <td className="p-5 font-medium text-on-surface">
                            {reservation.customer?.name || "Guest"}
                          </td>
                          <td className="p-5 text-on-surface-variant">
                            {reservationDate.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-5 text-on-surface-variant">
                            {reservation.timeSlot}
                          </td>
                          <td className="p-5 text-on-surface-variant">
                            {reservation.guests}
                          </td>
                          <td className="p-5 text-on-surface">
                            {reservation.table?.tableNumber || "TBD"}
                          </td>
                          <td className="p-5">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm border border-on-secondary-container/20">
                              {reservation.status || "Confirmed"}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            <div className="inline-flex items-center gap-2 justify-end">
                              <button
                                type="button"
                                onClick={() => startEditing(reservation)}
                                className="p-2 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant"
                              >
                                <span className="material-symbols-outlined">
                                  edit
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCancelReservation(reservation._id)
                                }
                                disabled={isDeleting}
                                className="p-2 rounded-lg hover:bg-error/10 transition-colors text-error disabled:opacity-60"
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
    </div>
  );
}

export default ReservationManagement;
