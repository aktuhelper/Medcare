import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DoctorList = ({ doctors, heading = "Popular Doctors" }) => {


  return (
    <div className="mb-20 px-6 sm:px-10 lg:px-20">
      <h2 className="font-bold text-3xl mb-10 text-gray-800 text-center">
        👨‍⚕️ {heading}
      </h2>

      {doctors && doctors.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {doctors.map((doctor, index) => {
            const iconUrl =
              doctor?.Icon?.[0]?.url ||
              "https://cdn-icons-png.flaticon.com/512/3774/3774299.png";
            console.log("Doctor image URL:", doctor?.Icon?.[0]?.url);


            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col items-center p-4 text-center h-[350px] justify-between"
              >
                {/* Circular Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 shadow-sm relative">
                  <Image
                    src={iconUrl}
                    alt={doctor?.Name || "Doctor"}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="mt-3">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                    {doctor?.Name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mb-2 line-clamp-1">
                    {doctor?.categories?.Name || "General Physician"}
                  </p>

                  <div className="text-xs text-gray-700 text-left px-2 space-y-1">
                    <p>🩺 <strong>Experience:</strong> {doctor?.Experience || "N/A"}</p>
                    <p className="line-clamp-2">
                      📍 <strong>Location:</strong> {doctor?.Address || "Not available"}
                    </p>
                    <p>
                      👥 <strong>Patients:</strong> {doctor?.Patients || "0"}
                    </p>
                  </div>
                </div>
                <Link href={'/details/' +  doctor?.documentId} className="w-full mt-auto">
                  <button
                    className="w-full bg-blue-600 text-white text-sm py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Book Appointment
                  </button>
                </Link>

                {/* CTA Button */}

              </div>
            );
          })}
        </div>
      ) : (
        // Skeleton State
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center h-[350px] justify-between"
            >
              <Skeleton className="h-24 w-24 rounded-full mb-2" />
              <Skeleton className="h-5 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2 mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-9 w-full rounded-lg mt-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
