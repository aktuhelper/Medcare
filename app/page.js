"use client";
import { Button } from "@/components/ui/button";
import GlobalAPI from "./_utils/GlobalAPI";
import { useEffect, useState } from "react";
import Hero from "./_componenets/Hero.jsx";
import CategorySearch from "./_componenets/CategorySearch.jsx";
import DoctorList from "./_componenets/DoctorList"; // ✅ Import component properly

export default function Home() {
  const [doctors, setDoctors] = useState([]); // ✅ renamed state variable

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalAPI.getDoctorList()
      .then((response) => {
        console.log(response.data);
        setDoctors(response.data.data || []); // ✅ updated setter
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Hero/>
      {/* Category Search */}
      <CategorySearch />
      {/* Popular Doctor List */}
      <DoctorList doctors={doctors} /> {/* ✅ pass correct prop */}
    </div>
  );
}
