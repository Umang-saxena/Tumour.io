"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

const Navigation = () => {
  const pathname = usePathname();

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
            <Link href="/" passHref>
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                size="sm"
              >
                Home
              </Button>
            </Link>
            <Link href="/upload" passHref>
              <Button
                variant={pathname === "/upload" ? "default" : "ghost"}
                size="sm"
              >
                Upload MRI
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
