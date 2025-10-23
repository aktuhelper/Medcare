"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { usePathname } from "next/navigation";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = usePathname();
  const category = params.split("/")[2];

  useEffect(() => {
    console.log("Params in CategoryList:", category);
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
    <div className="h-screen mt-5 flex flex-col scrollbar-hide w-full max-w-xs bg-white shadow-lg rounded-xl">
      <Command className="w-full max-w-full overflow-hidden p-4">
        <CommandInput
          placeholder="Search categories..."
          className="w-full px-4 py-2 mb-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <CommandList className="w-full">
          <CommandEmpty className="text-center text-gray-400">
            No results found.
          </CommandEmpty>
          <CommandGroup heading="Categories" className="space-y-2">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : (
              categoryList.map((item, index) => {
                const iconUrl = item?.Icon?.[0]?.url
                  ? `${process.env.NEXT_PUBLIC_API_URL}${item.Icon[0].url}`
                  : "/default-icon.png";

                return (
                  <CommandItem key={index} className="w-full">
                    <Link
                      href={`/search/${item.Name}`}
                      className={`p-2 flex items-center gap-3 w-full text-sm text-gray-700 rounded-md transition-all duration-200 hover:bg-gray-200 hover:text-blue-600 ${
                        category === item.Name ? "bg-blue-100 text-blue-700" : ""
                      }`}
                    >
                      <Image
                        src={iconUrl}
                        alt={item?.Name || "Category"}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                      />
                      <span className="truncate">{item?.Name || "Unnamed"}</span>
                    </Link>
                  </CommandItem>
                );
              })
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
