'use client';

import React, { useEffect, useState } from 'react';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import DoctorDetails from '../_components/DoctorDetails';

const Details = ({ params }) => {
  const [doctor, setDoctor] = useState(null);

  // ✅ Use React.use() to unwrap params
  const resolvedParams = React.use(params);
  const recordId = resolvedParams?.recordId;

  useEffect(() => {
    if (!recordId) return;

    GlobalAPI.getDoctorById(recordId).then((res) => {
      setDoctor(res.data.data);
    });
  }, [recordId]);

  return (
    <div className="p-6 md:px-20">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">Doctor Profile</h2>

      {doctor ? (
        <DoctorDetails doctor={doctor} />
      ) : (
        <p className="text-gray-500">Loading doctor details...</p>
      )}
    </div>
  );
};

export default Details;
