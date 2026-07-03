import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../../components/layout/CustomerSidebar";
import CustomerBottomNav from "../../components/layout/CustomerBottomNav";
import { createReservation } from "../../services/reservationService";

const timeSlots = ["19:00 PM", "19:30 PM", "20:00 PM"];
const restaurantOptions = ["L'Ambroisie", "Oceanic Grill", "Azure Terrace"];
const guestOptions = [2, 4, 6, 8, 10];

function formatDateLabel(date) {
  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function CreateReservationPage() {
  const navigate = useNavigate();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [selectedGuests, setSelectedGuests] = useState(4);
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    restaurantOptions[0],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const firstWeekday = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = useMemo(() => {
    const days = Array.from({ length: firstWeekday }, () => null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      days.push(day);
    }
    while (days.length < 35) {
      days.push(null);
    }
    return days;
  }, [daysInMonth, firstWeekday]);

  const selectedDateObject = new Date(currentYear, currentMonth, selectedDate);

  const handleCreateBooking = async () => {
    setError("");
    setLoading(true);

    try {
      const reservationDate = new Date(
        currentYear,
        currentMonth,
        selectedDate,
      ).toISOString();
      await createReservation({
        reservationDate,
        timeSlot: selectedTime,
        guests: selectedGuests,
      });
      navigate("/my-reservations");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to create reservation. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col md:flex-row">
      <CustomerSidebar />
      <main className="flex-1 md:ml-72">
        <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md flex items-center justify-between w-full px-6 md:px-margin-desktop h-16 border-b border-outline-variant">
          <div>
            <h1 className="text-headline-md font-headline-md text-on-surface">
              Create Reservation
            </h1>
          </div>
        </header>

        <div className="p-6 md:p-margin-desktop max-w-7xl mx-auto space-y-8">
          <section className="bg-surface border border-outline-variant rounded-3xl shadow-sm p-6">
            <nav className="flex items-center justify-between max-w-2xl mx-auto mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                  1
                </div>
                <span className="text-label-sm font-label-sm text-primary">
                  Date
                </span>
              </div>
              <div className="flex-grow h-[2px] bg-primary-fixed mx-2" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold">
                  2
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  Time
                </span>
              </div>
              <div className="flex-grow h-[2px] bg-surface-container-highest mx-2" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold">
                  3
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  Guests
                </span>
              </div>
              <div className="flex-grow h-[2px] bg-surface-container-highest mx-2" />
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold">
                  4
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  Confirm
                </span>
              </div>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-headline-sm font-headline-sm text-on-surface">
                      Choose a date
                    </h2>
                    <p className="text-body-sm text-on-surface-variant mt-2">
                      {formatDateLabel(selectedDateObject)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center text-label-sm font-label-sm text-on-surface-variant mb-4">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-body-sm">
                  {calendarDays.map((day, idx) => {
                    const isSelected = day === selectedDate;
                    return (
                      <button
                        key={`${idx}-${day}`}
                        type="button"
                        onClick={() => day && setSelectedDate(day)}
                        disabled={!day}
                        className={`p-3 rounded-lg transition-colors ${
                          day
                            ? isSelected
                              ? "calendar-day-selected text-on-primary"
                              : "calendar-day-available hover:bg-surface-container-high"
                            : "text-on-surface-variant/20"
                        }`}
                      >
                        {day || ""}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 shadow-sm">
                  <h2 className="text-headline-sm font-headline-sm text-on-surface mb-4">
                    Time & Guests
                  </h2>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label className="text-label-sm font-label-sm text-on-surface-variant">
                        Time slot
                      </label>
                      <select
                        className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary outline-none"
                        value={selectedTime}
                        onChange={(event) =>
                          setSelectedTime(event.target.value)
                        }
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-sm font-label-sm text-on-surface-variant">
                        Guests
                      </label>
                      <select
                        className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary outline-none"
                        value={selectedGuests}
                        onChange={(event) =>
                          setSelectedGuests(Number(event.target.value))
                        }
                      >
                        {guestOptions.map((value) => (
                          <option key={value} value={value}>
                            {value} Guests
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-label-sm font-label-sm text-on-surface-variant">
                        Restaurant
                      </label>
                      <select
                        className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary outline-none"
                        value={selectedRestaurant}
                        onChange={(event) =>
                          setSelectedRestaurant(event.target.value)
                        }
                      >
                        {restaurantOptions.map((restaurant) => (
                          <option key={restaurant} value={restaurant}>
                            {restaurant}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 shadow-sm">
                  <h2 className="text-headline-sm font-headline-sm text-on-surface mb-4">
                    Confirmation
                  </h2>
                  {error && (
                    <div className="rounded-3xl border border-error bg-error/10 p-4 text-error text-body-sm mb-4">
                      {error}
                    </div>
                  )}
                  <p className="text-body-sm text-on-surface-variant mb-4">
                    Review your reservation details before continuing.
                  </p>
                  <div className="space-y-3 text-body-md text-on-surface">
                    <div className="flex justify-between">
                      <span>Date</span>
                      <span>{formatDateLabel(selectedDateObject)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests</span>
                      <span>{selectedGuests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Restaurant</span>
                      <span>{selectedRestaurant}</span>
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full bg-primary text-on-primary rounded-2xl px-6 py-4 font-semibold hover:bg-primary-container transition-all"
                    type="button"
                    onClick={handleCreateBooking}
                    disabled={loading}
                  >
                    {loading
                      ? "Creating reservation..."
                      : "Confirm Reservation"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <CustomerBottomNav />
    </div>
  );
}

export default CreateReservationPage;
