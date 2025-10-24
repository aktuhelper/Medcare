"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Simulate loading — replace with your own logic if needed
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setIsLoading(false), 500); // Wait for fade animation
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"
                }`}
        >
            {/* Your SVG (from /public/logo.svg or inline) */}
            <img
                src="/logo.svg"
                alt="Loading..."
                className="w-20 h-20 animate-pulse"
            />
            <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium animate-pulse">
                Loading...
            </p>
        </div>
    );
}
