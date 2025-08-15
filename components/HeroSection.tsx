"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Upload, Check } from "lucide-react";
import Link from "next/link";
import heroImage from "@/assets/hero-brain-scan.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-subtle overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-20">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Advanced Brain Tumor{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Detection
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Upload your MRI scans and let our AI-powered CNN model identify brain tumor types with high accuracy. Fast, reliable, and professional medical imaging analysis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/upload">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto cursor-pointer transition-all duration-200 hover:scale-101"
                >
                  <Upload className="h-5 w-5" />
                  Upload MRI Scan
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>99.2% Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-600" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-[400px] z-10 rounded-2xl overflow-hidden shadow-large">
              <Image
                src={heroImage}
                alt="Brain MRI scan with AI analysis overlay"
                className="w-full h-auto object-cover"
                priority
                fill
              />
            </div>
            {/* Decorative glow - won't block clicks */}
            <div className="absolute -inset-4 bg-gradient-primary rounded-2xl blur-xl opacity-20 animate-pulse pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
