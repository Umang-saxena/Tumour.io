"use client";

import Link from "next/link";
import { Brain } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navigation = () => {
  const { user } = useUser();

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Tumour.io
            </span>
          </Link>

          <div className="flex items-center space-x-4 text-white text-[16px] bg-blue-600 p-2 rounded-md hover:bg-blue-500 transition">
            <SignedOut>
              <SignInButton
                appearance={{
                  elements: {
                    rootBox:
                      "inline-block rounded bg-blue-600 hover:bg-blue-700",
                    button:
                      "text-white font-semibold px-4 py-4 rounded shadow-md ",
                  },
                }}
              >
                Sign In / Sign Up
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-row items-center space-x-2 text-md text-[18px] font-semibold text-blue-700">
                <span>Hello {user?.firstName}</span>
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
