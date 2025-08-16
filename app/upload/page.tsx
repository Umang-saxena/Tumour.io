"use client";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import UploadArea from "@/components/upload/UploadArea";
import HistoryList from "@/components/upload/HistoryList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Loader2, Download, Share } from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [patientName, setPatientName] = useState<string>("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [progress, setProgress] = useState(0);
    // const { toast } = useToast();

    const handleFileUpload = (file: File, name: string) => {
        setUploadedFile(file);
        setPatientName(name);
        setAnalysisResult(null);
    };

    const startAnalysis = async () => {
        if (!uploadedFile || !patientName) return;

        setIsAnalyzing(true);
        setProgress(0);

        // Simulate analysis progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        // Simulate API call - in real app this would be actual backend call
        setTimeout(async () => {
            clearInterval(interval);
            setProgress(100);

            // Mock result
            const mockResult = {
                tumorType: "Glioblastoma",
                confidence: 94.5,
                riskLevel: "High",
                recommendations: [
                    "Immediate consultation with neurosurgeon",
                    "Additional contrast MRI recommended",
                    "Genetic testing may be beneficial"
                ],
                technicalDetails: {
                    modelVersion: "TumourNet v2.1",
                    processingTime: "2.3 seconds",
                    imageQuality: "Excellent"
                }
            };

            setAnalysisResult(mockResult);
            setIsAnalyzing(false);
            setProgress(0);

            // Save result to database
            try {
                // Convert file to base64 for storage (in real app, you might upload to cloud storage)
                const reader = new FileReader();
                reader.onload = async () => {
                    const base64Image = reader.result as string;
                    
                    const response = await fetch('/api/results', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            patientName,
                            mriImage: base64Image,
                            userId: 'user123', // In real app, get from auth context
                            analysisResult: mockResult
                        }),
                    });

                    const data = await response.json();
                    
                    if (data.success) {
                        toast.success("Analysis Complete", {
                            description: "Your MRI scan has been successfully analyzed and saved.",
                        });
                    } else {
                        toast.error("Save Failed", {
                            description: "Analysis completed but failed to save to database.",
                        });
                    }
                };
                reader.readAsDataURL(uploadedFile);
            } catch (error) {
                console.error('Error saving result:', error);
                toast.error("Save Failed", {
                    description: "Analysis completed but failed to save to database.",
                });
            }

        }, 3000);
    };

    const getRiskColor = (risk: string) => {
        switch (risk.toLowerCase()) {
            case 'high': return 'destructive';
            case 'medium': return 'secondary';
            case 'low': return 'success';
            default: return 'secondary';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-subtle">
            <Navigation />

            <div className="container mx-auto px-2 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        MRI Brain Tumor Analysis
                    </h1>
                    <p className="text-muted-foreground">
                        Upload your MRI scan for AI-powered tumor detection and classification
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                    {/* Upload and Analysis Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <UploadArea onFileUpload={handleFileUpload} />

                        {uploadedFile && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Brain className="h-5 w-5 text-primary" />
                                        <span>Analysis Control</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {!isAnalyzing && !analysisResult && (
                                        <Button
                                            variant="hero"
                                            size="lg"
                                            onClick={startAnalysis}
                                            className="w-full"
                                        >
                                            Start AI Analysis
                                        </Button>
                                    )}

                                    {isAnalyzing && (
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                                <span className="text-foreground">Analyzing MRI scan...</span>
                                            </div>
                                            <Progress value={progress} className="w-full" />
                                            <p className="text-sm text-muted-foreground">
                                                Processing with advanced CNN model
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Results Section */}
                        {analysisResult && (
                            <Card className="border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Brain className="h-5 w-5 text-primary" />
                                            <span>Analysis Results - {patientName}</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm">
                                                <Download className="h-4 w-4 mr-2" />
                                                Download Report
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Share className="h-4 w-4 mr-2" />
                                                Share
                                            </Button>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-2">Tumor Classification</h3>
                                                <p className="text-2xl font-bold text-primary mb-1">
                                                    {analysisResult.tumorType}
                                                </p>
                                                <p className="text-muted-foreground">
                                                    Confidence: {analysisResult.confidence}%
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-foreground mb-2">Risk Assessment</h3>
                                                <Badge variant={getRiskColor(analysisResult.riskLevel) as any} className="text-sm">
                                                    {analysisResult.riskLevel} Risk
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-2">Technical Details</h3>
                                                <div className="space-y-1 text-sm text-muted-foreground">
                                                    <p>Model: {analysisResult.technicalDetails.modelVersion}</p>
                                                    <p>Processing Time: {analysisResult.technicalDetails.processingTime}</p>
                                                    <p>Image Quality: {analysisResult.technicalDetails.imageQuality}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-foreground mb-3">Recommendations</h3>
                                        <ul className="space-y-2">
                                            {analysisResult.recommendations.map((rec: string, index: number) => (
                                                <li key={index} className="flex items-start space-x-2">
                                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-muted-foreground">{rec}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* History Section */}
                    <div className="lg:col-span-1 w-[400px]">
                        <HistoryList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;