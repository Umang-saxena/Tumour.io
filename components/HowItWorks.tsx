import { Card, CardContent } from "@/components/ui/card";
import { Upload, Brain, FileText, Shield } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload MRI Scan",
    description: "Securely upload your brain MRI image in JPEG, PNG, or DICOM format",
    step: "01"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced CNN model processes the image and analyzes tumor characteristics",
    step: "02"
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Receive detailed classification of tumor type with confidence scores",
    step: "03"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "All data is encrypted and processed following strict medical privacy standards",
    step: "04"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How Tumour.io Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system makes brain tumor detection simple, fast, and accurate
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative border-border hover:shadow-medium transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="mt-1 mb-4 flex items-center justify-center">
                    <div className="w-24 h-30 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-12 w-12 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;