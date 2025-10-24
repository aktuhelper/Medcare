"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import GlobalAPI from "../_utils/GlobalAPI";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, doctorResponse] = await Promise.all([
          GlobalAPI.getCategory(),
          GlobalAPI.getDoctorList(), // should return data like you posted
        ]);

        setCategoryList(categoryResponse.data.data || []);
        setDoctorList(doctorResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔍 Filter doctors and categories
  const filteredDoctors = doctorList.filter(
    (doc) =>
      doc?.Name?.toLowerCase().includes(query.toLowerCase()) ||
      doc?.categories?.Name?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCategories = categoryList.filter((cat) =>
    cat?.Name?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredResults = [
    ...filteredDoctors.map((doc) => ({ type: "doctor", data: doc })),
    ...filteredCategories.map((cat) => ({ type: "category", data: cat })),
  ].slice(0, 6);

  return (
    <div className="flex flex-col items-center justify-center text-center my-12 px-4 relative">
      {/* ---------- Heading ---------- */}
      <h2 className="font-bold text-4xl md:text-5xl tracking-wide mb-2">
        Search <span className="text-violet-600">Doctors</span>
      </h2>
      <p className="text-gray-500 text-lg md:text-xl mb-6">
        Find experienced doctors and book your appointment easily
      </p>

      {/* ---------- Search Bar ---------- */}
      <div className="relative w-full max-w-xl">
        <div className="flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 border border-gray-200 focus-within:border-violet-500 transition-all duration-200">
          <Search className="text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by doctor or category..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(e.target.value.trim().length > 0);
            }}
            onFocus={() => query && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="flex-1 border-none focus-visible:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* ---------- Dropdown Results ---------- */}
        {showDropdown && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden z-50 text-left">
            {loading ? (
              <p className="p-4 text-gray-500 text-sm">Loading...</p>
            ) : filteredResults.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {filteredResults.map((item, idx) => {
                  if (item.type === "doctor") {
                    const doc = item.data;
                    const imageUrl =
                      doc?.Image?.[0]?.url || "/default-doctor.png";
                    return (
                      <Link
                        key={idx}
                        href={`/doctor/${doc.documentId}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Image
                          src={imageUrl}
                          alt={doc.Name}
                          width={45}
                          height={45}
                          className="rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <p className="text-gray-800 font-medium">
                            {doc.Name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {doc.categories?.Name || "General"} •{" "}
                            {doc.Experience || ""}
                          </p>
                          <p className="text-gray-400 text-xs truncate max-w-[250px]">
                            {doc.Address}
                          </p>
                        </div>
                      </Link>
                    );
                  } else {
                    const cat = item.data;
                    const iconUrl =
                      cat?.Icon?.[0]?.url || "/default-icon.png";
                    return (
                      <Link
                        key={idx}
                        href={`/search/${cat.Name}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Image
                          src={iconUrl}
                          alt={cat.Name}
                          width={35}
                          height={35}
                          className="object-contain rounded-full bg-gray-50"
                        />
                        <p className="text-gray-800 font-medium">
                          {cat.Name}
                        </p>
                      </Link>
                    );
                  }
                })}
              </ul>
            ) : (
              <p className="p-4 text-gray-500 text-sm">No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySearch;
