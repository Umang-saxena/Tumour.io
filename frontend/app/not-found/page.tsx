"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const NotFound = () => {
    const [pathname, setPathname] = useState<string | null>(null);
    const currentPathname = usePathname();

    useEffect(() => {
        // Set pathname only on client side to avoid SSR issues
        setPathname(currentPathname);
    }, [currentPathname]);

    useEffect(() => {
        if (pathname) {
            console.error("404 Error: User attempted to access non-existent route:", pathname);
        }
    }, [pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
                <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
