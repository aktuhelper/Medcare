"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import GlobalAPI from "@/app/_utils/GlobalAPI";

const CancelAppointment = ({ bookingId, onCancelSuccess }) => {
  const handleCancel = async () => {
    try {
      const res = await GlobalAPI.deleteBooking(bookingId);
      console.log("Booking canceled:", res.status);
      if (res.status === 200 || res.status === 204) {
        onCancelSuccess(bookingId);  // Notify parent to update state
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full cursor-pointer sm:w-auto">
          Cancel Appointment
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Appointment?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently cancel your
            appointment and remove it from your bookings list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel}>
            Yes, Cancel
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelAppointment;
