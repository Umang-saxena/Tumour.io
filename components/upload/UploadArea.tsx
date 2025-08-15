import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
}

const UploadArea = ({ onFileUpload }: UploadAreaProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileSelection = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/dicom'];
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.dcm')) {
      toast.error("Invalid file type", {
        description: "Please upload a JPEG, PNG, or DICOM file.",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please upload a file smaller than 10MB.",
      });
      return;
    }

    setUploadedFile(file);
    onFileUpload(file);
     toast.success("File uploaded successfully", {
      description: (
        <span className="text-green-600 font-semibold">{file.name} is ready for analysis.</span>
      )
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors duration-300">
      <CardContent className="p-8">
        {uploadedFile ? (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">File Ready</h3>
              <p className="text-muted-foreground">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button variant="outline" onClick={removeFile}>
              <X className="h-4 w-4 mr-2" />
              Remove File
            </Button>
          </div>
        ) : (
          <div
            className={`text-center space-y-4 p-8 rounded-lg transition-colors duration-300 ${
              dragActive ? 'bg-primary/5 border-primary' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Upload MRI Scan
              </h3>
              <p className="text-muted-foreground">
                Drag and drop your MRI image here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports JPEG, PNG, and DICOM formats (max 10MB)
              </p>
            </div>
            
            <div className="space-y-3">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".jpg,.jpeg,.png,.dcm,image/*"
                onChange={handleFileInput}
              />
              <label htmlFor="file-upload">
                <Button variant="hero" size="lg" className="cursor-pointer" asChild>
                  <span>
                    <Image className="h-5 w-5" alt="Choose File"/>
                    Choose File
                  </span>
                </Button>
              </label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadArea;