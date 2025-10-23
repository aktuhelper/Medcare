"use client";

import DoctorList from "@/app/_componenets/DoctorList";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import React, { useEffect, useState } from "react";

const Search = ({ params }) => {
  const { cname } = React.use(params); // Unwrap the params Promise

  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctors();
  }, [cname]);

  const getDoctors = () => {
    GlobalAPI.getDoctorByCategory(cname).then((resp) => {
      console.log("doctorByCategory:", resp);
      setDoctorList(resp.data.data);
    });
  };

  return (
    <div>
      <DoctorList heading={cname} doctors={doctorList} />
    </div>
  );
};

export default Search;
