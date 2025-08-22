"use client";

import Link from "next/link";
// import { usePathname } from "next/navigation";
import { Brain } from "lucide-react";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs'

const Navigation = () => {
  // const pathname = usePathname();
  const {user} = useUser();

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

          <div className="flex items-center space-x-4">

            {/* <Link href="/" passHref>
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                size="sm"
              >
                Home
              </Button>
            </Link> */}
            <SignedOut>
              <SignInButton /><p className="text-gray-500">or</p>
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <div className="flex flex-row items-start space-x-2 text-md text-[18px] font-semibold text-blue-700 gap-y-3">
                <div>Hello {user?.firstName} </div>
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
