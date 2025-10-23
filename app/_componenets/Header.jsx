"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

const navItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Explore", path: "/explore" },
  { id: 3, name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log("Authenticated User:", user);
  }, [user]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Logo & Navigation */}
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={50} height={40} />
        </Link>

        <nav className="hidden md:flex gap-8">
          {navItems.map(({ id, name, path }) => (
            <Link
              key={id}
              href={path}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium hover:scale-105 duration-200"
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Image
                src={
                  user?.picture?.replace("d=blank", "d=mp") || "/profile.png"
                }
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover cursor-pointer transition-transform hover:scale-105"
              />
            </PopoverTrigger>
            <PopoverContent className="w-48 p-4 text-sm">
              <ul className="flex flex-col gap-2 mb-3 font-bold">
                <li>
                  <Link
                    href="/profile"
                    className="block hover:text-blue-500 transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-booking"
                    className="block hover:text-blue-500 transition-colors"
                  >
                    My Bookings
                  </Link>
                </li>
              </ul>
              <LogoutLink>
                <Button
                  variant="outline"
                  className="w-full text-sm font-medium"
                >
                  Logout
                </Button>
              </LogoutLink>
            </PopoverContent>
          </Popover>
        ) : (
          <LoginLink>
            <Button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-sm">
              Get Started
            </Button>
          </LoginLink>
        )}
      </div>
    </header>
  );
};

export default Header;
