import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerSidebar from "../../components/layout/CustomerSidebar";
import CustomerBottomNav from "../../components/layout/CustomerBottomNav";
import {
  fetchReservation,
  updateReservation,
  cancelReservation,
} from "../../services/reservationService";
import { getErrorMessage } from "../../utils/errorMessage";
import { timeSlots, guestOptions } from "../../utils/constants";

function formatDateLabel(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatIsoDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function ReservationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [formState, setFormState] = useState({
    reservationDate: "",
    timeSlot: timeSlots[0],
    guests: 2,
  });

  const loadReservation = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchReservation(id);
      const data = response.data.data;
      setReservation(data);
      setFormState({
        reservationDate: formatIsoDate(data.reservationDate),
        timeSlot: data.timeSlot,
        guests: data.guests,
      });
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load reservation details."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservation();
  }, [id]);

  const handleUpdate = async () => {
    setSaving(true);
    setError("");

    try {
      const response = await updateReservation(id, {
        reservationDate: formState.reservationDate,
        timeSlot: formState.timeSlot,
        guests: formState.guests,
      });
      setReservation(response.data.data);
      setIsEditing(false);
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to update reservation. Please try again."),
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    setCancelling(true);
    setError("");

    try {
      await cancelReservation(id);
      navigate("/my-reservations");
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to cancel reservation. Please try again."),
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex flex-col md:flex-row">
        <CustomerSidebar />
        <main className="flex-1 md:ml-72 flex items-center justify-center p-6 md:p-margin-desktop">
          <div className="rounded-3xl border border-outline-variant bg-surface p-10 text-body-md text-on-surface-variant">
            Loading reservation details...
          </div>
        </main>
        <CustomerBottomNav />
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col md:flex-row">
      <CustomerSidebar />
      <main className="flex-1 md:ml-72">
        <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md flex items-center justify-between w-full px-6 md:px-margin-desktop h-16 border-b border-outline-variant">
          <div className="flex items-center gap-4">
            <Link
              to="/my-reservations"
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </Link>
            <div>
              <h1 className="text-headline-md font-headline-md text-on-surface">
                Reservation Details
              </h1>
              <p className="text-body-sm text-on-surface-variant">
                Reference ID: #{reservation?._id?.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </header>

        <div className="p-6 md:p-margin-desktop max-w-7xl mx-auto space-y-8">
          {error && (
            <div className="rounded-3xl border border-error bg-error/10 p-4 text-error text-body-sm">
              {error}
            </div>
          )}

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card rounded-3xl p-8 shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <p className="text-label-sm font-label-sm uppercase tracking-wide text-on-surface-variant">
                    Booking summary
                  </p>
                  <h2 className="text-headline-lg font-headline-lg text-on-surface mt-2">
                    {`Reservation #${reservation?._id?.slice(-6).toUpperCase()}`}
                  </h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary-container text-on-secondary-container px-4 py-2 text-label-sm font-label-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {reservation?.status || "Confirmed"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Restaurant
                    </p>
                    <p className="text-body-lg font-semibold text-on-surface">
                      {reservation?.table?.tableNumber
                        ? `Table ${reservation.table.tableNumber}`
                        : "Assigned on booking"}
                    </p>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Date
                    </p>
                    {isEditing ? (
                      <input
                        className="w-full rounded-2xl border border-outline-variant bg-surface-container-highest px-4 py-3 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                        type="date"
                        value={formState.reservationDate}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            reservationDate: event.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="text-body-lg font-semibold text-on-surface">
                        {formatDateLabel(reservation?.reservationDate)}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Time
                    </p>
                    {isEditing ? (
                      <select
                        className="w-full rounded-2xl border border-outline-variant bg-surface-container-highest px-4 py-3 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                        value={formState.timeSlot}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            timeSlot: event.target.value,
                          }))
                        }
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-body-lg font-semibold text-on-surface">
                        {reservation?.timeSlot}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Guests
                    </p>
                    {isEditing ? (
                      <select
                        className="w-full rounded-2xl border border-outline-variant bg-surface-container-highest px-4 py-3 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                        value={formState.guests}
                        onChange={(event) =>
                          setFormState((current) => ({
                            ...current,
                            guests: Number(event.target.value),
                          }))
                        }
                      >
                        {guestOptions.map((count) => (
                          <option key={count} value={count}>
                            {count} People
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-body-lg font-semibold text-on-surface">
                        {reservation?.guests} People
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Table
                    </p>
                    <p className="text-body-lg font-semibold text-on-surface">
                      {reservation?.table?.tableNumber
                        ? `T-${reservation.table.tableNumber}`
                        : "Pending assignment"}
                    </p>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Location
                    </p>
                    <p className="text-body-lg font-semibold text-on-surface">
                      {reservation?.table?.capacity
                        ? `Capacity ${reservation.table.capacity}`
                        : "Standard venue"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant">
                  <h3 className="text-headline-sm font-headline-sm text-on-surface mb-3">
                    Guest preferences
                  </h3>
                  <ul className="space-y-3 text-body-md text-on-surface-variant">
                    <li>Allergic to shellfish</li>
                    <li>Window seating requested</li>
                    <li>Anniversary celebration</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 bg-primary text-on-primary rounded-2xl px-6 py-4 font-semibold hover:bg-primary-container transition-all"
                    type="button"
                    onClick={() => setIsEditing((current) => !current)}
                  >
                    {isEditing ? "Cancel edit" : "Modify Reservation"}
                  </button>
                  <button
                    className="flex-1 bg-error-container text-on-error-container rounded-2xl px-6 py-4 font-semibold hover:bg-error/10 transition-all"
                    type="button"
                    onClick={handleCancel}
                    disabled={cancelling}
                  >
                    {cancelling ? "Cancelling..." : "Cancel Reservation"}
                  </button>
                </div>
                {isEditing && (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      className="flex-1 bg-primary text-on-primary rounded-2xl px-6 py-4 font-semibold hover:bg-primary-container transition-all"
                      type="button"
                      onClick={handleUpdate}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <aside className="space-y-6">
              <div className="bg-surface rounded-3xl p-6 border border-outline-variant shadow-sm">
                <p className="text-label-sm font-label-sm uppercase tracking-wide text-on-surface-variant">
                  Guest
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <img
                    className="w-16 h-16 rounded-3xl object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsdW_rY8V6P5bSqiAMDz17RJVQXyqNBe7HIF-FArKDJByG4CiAO0AMi6klBaPnIPOlQfRTkUNxLsfjTFYhgSjpDxZoxMfRy5qTtwhdd2cj3Gsq7XNOIJXNczZkw1mwoWTvPcifkJQtoKf8TOlJXt-UhXdRFokrT_vcH9kjOSKTKbUI2WgAY8lIny28NNRe5LS_hWAjNscONzpKwrsyI8aof-2r3of0HUF4O1ONvWi2pY-AO7Ovty-Gel_t4fCTI7sS_6NHYCZ2AQ"
                    alt="Guest avatar"
                  />
                  <div>
                    <p className="text-body-lg font-semibold text-on-surface">
                      {reservation?.customer?.name || "Guest"}
                    </p>
                    <p className="text-body-sm text-on-surface-variant">
                      {reservation?.customer?.email || "No email provided"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-primary text-on-primary rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined">qr_code</span>
                  <div>
                    <p className="text-label-sm font-label-sm uppercase tracking-wide">
                      Mobile check-in
                    </p>
                    <p className="text-body-sm text-on-primary/80">
                      Scan on arrival.
                    </p>
                  </div>
                </div>
                <div className="h-40 rounded-3xl bg-surface-container-highest" />
              </div>
            </aside>
          </section>
        </div>
      </main>
      <CustomerBottomNav />
    </div>
  );
}

export default ReservationDetails;
