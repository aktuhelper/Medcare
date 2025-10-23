"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import GlobalAPI from "../_utils/GlobalAPI";
import Image from "next/image";
import Link from "next/link"; // <-- Import Link

const CategorySearch = () => {
  const STRAPI_BASE_URL = "https://medcare-appointment-admin.onrender.com";
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategoryList = async () => {
   
      try {
        const response = await GlobalAPI.getCategory();
        setCategoryList(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategoryList();
  }, []);

  return (
    <div className="mb-10 flex flex-col items-center justify-center text-center my-12 px-4">
      {/* ---------- Heading ---------- */}
      <h2 className="font-bold text-4xl md:text-5xl tracking-wide mb-2">
        Search <span className="text-violet-600">Doctors</span>
      </h2>
      <p className="text-gray-500 text-lg md:text-xl mb-6">
        Find experienced doctors and book your appointment easily
      </p>

      {/* ---------- Search Bar ---------- */}
      <div className="flex w-full max-w-md items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 border border-gray-200">
        <Search className="text-gray-500 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search by doctor, specialty or location"
          className="border-none focus-visible:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
        />
        <Button
          type="submit"
          className="rounded-full cursor-pointer bg-violet-600 hover:bg-violet-700 text-white px-6"
        >
          Search
        </Button>
      </div>

      {/* ---------- Category List ---------- */}
      <div className="mt-12 flex justify-center w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-center">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col text-center items-center p-5 bg-blue-50 rounded-lg shadow-sm border border-gray-100"
                >
                  <Skeleton className="h-[60px] w-[60px] rounded-full mb-3 animate-pulse" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))
            : categoryList.slice(0, 6).map((item, index) => {
                const iconUrl = item?.Icon?.[0]?.url
                  ? `${STRAPI_BASE_URL }${item.Icon[0].url}`
                  : "/default-icon.png";

                const name = item?.Name || "Unknown";

                return (
                  <Link
                    key={index}
                    href={`/search/${item.Name}`} // <-- Navigate to category page
                    className="flex flex-col text-center items-center p-5 bg-blue-50 cursor-pointer rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    <Image
                      src={iconUrl}
                      alt={name}
                      width={60}
                      height={60}
                      className="object-contain mb-2"
                    />
                    <p className="text-gray-700 font-medium">{name}</p>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default CategorySearch;
