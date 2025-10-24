import React, { useEffect, useState } from 'react';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import Link from 'next/link';
import Image from 'next/image';


const DoctorSuggestion = () => {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = async () => {
    try {
      const res = await GlobalAPI.getDoctorList();
      setDoctorList(res.data.data);
    } catch (err) {
      console.error('Error fetching doctor list:', err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Suggested Doctors</h3>

      {doctorList.length === 0 ? (
        <p className="text-gray-500 text-sm">No suggestions available.</p>
      ) : (
        <ul className="space-y-4">
          {doctorList.slice(0, 4).map((doctor) => {
            const imageUrl = doctor?.Image?.[0]?.url
              ? `${doctor.Image[0].url}`
              : '/default-doctor.jpg';

            return (
              <li key={doctor.id} className="flex items-center gap-4 border-b last:border-none pb-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border">
                  <Image
                    src={imageUrl}
                    alt={doctor.Name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/details/${doctor.documentId}`}
                    className="hover:text-blue-600 transition block"
                  >
                    <p className="font-medium text-gray-800 line-clamp-1">{doctor.Name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{doctor.Address}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1">{doctor.Patients} Patients</p>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DoctorSuggestion;
