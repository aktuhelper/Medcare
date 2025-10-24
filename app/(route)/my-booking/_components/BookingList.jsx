import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import CancelAppointment from './CancelAppointment';

const BookingList = ({ bookingList = [], isExpiredTab = false }) => {
  const [bookings, setBookings] = useState([]);

  // Update local state when prop bookingList changes
  useEffect(() => {
    console.log("Booking list prop:", bookingList);
    setBookings(bookingList);
  }, [bookingList]);

  // Handler to remove booking by documentId after cancellation
  const onDeleteBooking = (documentId) => {
    console.log("Deleting booking with documentId:", documentId);
    setBookings((prev) => prev.filter((b) => b.documentId !== documentId));
  };

  // Helper for safe image URLs
  const getSafeImageUrl = (image) => {
    if (!image?.url) return '/placeholder-doctor.png'; // fallback image
    return image.url.startsWith('http')
      ? image.url
      : `https://medcare-appointment-admin.onrender.com${image.url}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isExpiredTab ? 'Expired Bookings' : 'Your Bookings'}
      </h2>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((item) => {
            const isExpired = Boolean(item?.expired) || isExpiredTab;

            // Log each doctor's image URL
            console.log("Doctor image URL:", item.Image?.[0]?.url);

            return (
              <div
                key={item.documentId}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4"
              >
                {/* Doctor Image */}
                {item?.Image?.[0]?.url && (
                  <div className="flex-shrink-0">
                    <Image
                      src={getSafeImageUrl(item.Image[0])}
                      alt={item.doctor?.Name || 'Doctor'}
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}

                {/* Doctor Info */}
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.doctor?.Name}
                    </h3>

                    {/* Cancel Button (only for active bookings) */}
                    {!isExpired && (
                      <CancelAppointment
                        bookingId={item.documentId}
                        onCancelSuccess={onDeleteBooking}
                      />
                    )}
                  </div>

                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span> {item.Date}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Time:</span> {item.Time}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Address:</span> {item.doctor?.Address}
                  </p>

                  {isExpired && (
                    <p className="text-red-500 font-medium mt-2">Expired</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {isExpiredTab ? 'No expired bookings found.' : 'No bookings found.'}
        </p>
      )}
    </div>
  );
};

export default BookingList;
