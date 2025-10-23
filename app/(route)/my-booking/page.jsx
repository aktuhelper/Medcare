'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from './_components/BookingList';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const MyBooking = () => {
  const { user, isLoading: userLoading } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    if (user?.email) {
      getUserBookings();
    }
  }, [user]);

  const getUserBookings = async () => {
    setLoadingBookings(true);
    try {
      const response = await GlobalAPI.getUserBookings(user.email);
      console.log("User Bookings:", response.data);
      setBookingList(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Handler to remove a booking by id after deletion
  const handleBookingDeleted = (deletedBookingId) => {
    setBookingList((prevList) =>
      prevList.filter((booking) => booking.id !== deletedBookingId)
    );
  };

  const parseBookingDateTime = (booking) => {
    if (!booking.Date || !booking.Time) return null;

    const [time, period] = booking.Time.split(' ');
    let [hour, minute] = time.split(':').map(Number);

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    const date = new Date(booking.Date);
    date.setHours(hour, minute, 0, 0);

    return date;
  };

  const filterUserBooking = (type) => {
    const now = new Date();

    return bookingList.filter((booking) => {
      const bookingDateTime = parseBookingDateTime(booking);
      if (!bookingDateTime) return false;

      return type === 'upcoming'
        ? bookingDateTime >= now
        : bookingDateTime < now;
    });
  };

  if (userLoading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading user info...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        My Bookings
      </h2>

      {loadingBookings ? (
        <p className="text-center text-gray-600">Loading your bookings...</p>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="flex gap-4 border-b border-gray-200 mb-6">
            <TabsTrigger
              value="upcoming"
              className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 transition"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 transition"
            >
              Expired
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <BookingList 
              bookingList={filterUserBooking('upcoming')} 
              onDeleteBooking={handleBookingDeleted} // Pass the delete handler here
            />
          </TabsContent>

          <TabsContent value="expired">
            <BookingList
              bookingList={filterUserBooking('expired')}
              isExpiredTab={true}
              onDeleteBooking={handleBookingDeleted} // Pass here as well if deletion allowed
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default MyBooking;
