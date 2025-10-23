"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { toast } from "sonner";

// Generate time slots between hours with zero-padded minutes
const generateTimeSlots = (startTime = 9, endTime = 17, interval = 30) => {
  const slots = [];
  for (let hour = startTime; hour < endTime; hour++) {
    for (let minutes = 0; minutes < 60; minutes += interval) {
      const h = hour % 12 || 12;
      const m = minutes.toString().padStart(2, "0"); // pad minutes with 0
      const period = hour < 12 ? "AM" : "PM";
      slots.push(`${h}:${m} ${period}`);
    }
  }
  return slots;
};

const BookAppointment = ({ doctor }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const { user } = useKindeBrowserClient();
  const timeSlots = generateTimeSlots();

  // Reset today's date to midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Format date to local yyyy-mm-dd (avoid timezone shift)
  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Helper to parse time string like "9:30 AM" to a Date object on selected day
  const parseTimeToDate = (timeStr, baseDate) => {
    if (!timeStr || !baseDate) return null;

    // Extract hour, minutes, and period
    const [time, period] = timeStr.split(" ");
    let [hour, minutes] = time.split(":").map(Number);
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const d = new Date(baseDate);
    d.setHours(hour, minutes, 0, 0);
    return d;
  };

  // Clear selected time if invalid for new date
  useEffect(() => {
    if (!selectedTime) return;

    const selectedDateTime = parseTimeToDate(selectedTime, date);
    const now = new Date();

    // If selected date is today, but selected time is in the past, clear selection
    if (date.toDateString() === now.toDateString() && selectedDateTime < now) {
      setSelectedTime(null);
    }
  }, [date, selectedTime]);

  const formatDate = (date) =>
    date?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const saveBooking = async () => {
    if (!selectedTime || !date) {
      toast.error("Please select both date and time before booking.");
      return;
    }

    const selectedDateTime = parseTimeToDate(selectedTime, date);
    const now = new Date();

    // Prevent booking past times for today
    if (date.toDateString() === now.toDateString() && selectedDateTime < now) {
      toast.error("Selected time is in the past. Please select a valid time.");
      return;
    }

    setIsLoading(true);

    // Use local date formatter here (fix timezone shift)
    const formattedDate = formatDateLocal(date);

    const data = {
      data: {
        username: user?.given_name || "invalid name",
        Email: user?.email || "No Email",
        Time: selectedTime,
        Date: formattedDate,
        doctorname: doctor?.Name,
        doctor: doctor?.documentId,
      },
    };

    try {
      const resp = await GlobalAPI.bookappointment(data);
      if (resp) {
        await GlobalAPI.sendEmail(data);
        toast.success("Booking confirmation sent to your email.");
        setConfirmed(true);
      }
    } catch (err) {
      console.error(
        "Booking Error Response:",
        err.response?.data?.error || err.message
      );
      toast.error("Something went wrong while booking.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (newDate) => {
    if (!newDate) return;
    newDate.setHours(0, 0, 0, 0);
    if (newDate < today) return; // prevent past dates
    setDate(newDate);
  };

  // Check if confirm button should be disabled
  const isConfirmDisabled = () => {
    if (!date || !selectedTime) return true;

    const selectedDateTime = parseTimeToDate(selectedTime, date);
    const now = new Date();

    if (date < today) return true;
    if (date.toDateString() === now.toDateString() && selectedDateTime < now)
      return true;

    return isLoading;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 text-white text-sm py-2.5 cursor-pointer rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition">
          Book Appointment
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold  text-gray-800">
            Book Appointment
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Date Picker */}
            <div className="flex flex-col space-y-4">
              <h2 className="flex items-center text-gray-700 font-medium text-sm">
                <CalendarDays className="h-5 w-5 mr-2 text-blue-600" />
                Select Date
              </h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-lg border shadow-sm w-full max-w-lg"
                fromDate={today}
              />
            </div>

            {/* Time Picker */}
            <div className="flex flex-col space-y-4">
              <h2 className="flex items-center text-gray-700 font-medium text-sm">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Select Time
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {timeSlots.map((slot) => {
                  const slotDateTime = parseTimeToDate(slot, date);
                  const now = new Date();

                  // Disable slot if it is in the past for today
                  const isDisabled =
                    date.toDateString() === now.toDateString() &&
                    slotDateTime < now;

                  return (
                    <button
                      key={slot}
                      onClick={() => !isDisabled && setSelectedTime(slot)}
                      disabled={isDisabled}
                      className={`text-sm px-3 py-1.5 rounded border transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        selectedTime === slot
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                      } ${
                        isDisabled
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Summary */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Your Selection:
            </h3>
            <p className="text-sm text-gray-600">
              📅{" "}
              <span className="font-medium">
                {date ? formatDate(date) : "No date selected"}
              </span>
              <br />
              ⏰{" "}
              <span className="font-medium">
                {selectedTime ? selectedTime : "No time selected"}
              </span>
            </p>

            {/* Confirm Button */}
            <Button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded transition disabled:opacity-50 flex items-center justify-center gap-2"
              onClick={saveBooking}
              disabled={isConfirmDisabled()}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                "Confirm Appointment"
              )}
            </Button>

            {/* Confirmation Message */}
            {confirmed && (
              <div className="mt-3 text-sm text-green-700 font-medium">
                ✅ Appointment confirmed for {formatDate(date)} at {selectedTime}
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
