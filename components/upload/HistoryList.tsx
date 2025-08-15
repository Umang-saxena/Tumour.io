import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileImage, Brain } from "lucide-react";

// Mock data for demonstration - in real app this would come from API/database
const mockHistory = [
    {
        id: 1,
        filename: "patient_001_mri.jpg",
        uploadDate: "2024-08-15T10:30:00",
        result: "Glioblastoma",
        confidence: 94.5,
        status: "completed"
    },
    {
        id: 2,
        filename: "brain_scan_042.png",
        uploadDate: "2024-08-15T09:15:00",
        result: "Meningioma",
        confidence: 87.2,
        status: "completed"
    },
    {
        id: 3,
        filename: "mri_sample_103.jpg",
        uploadDate: "2024-08-15T08:45:00",
        result: "No Tumor",
        confidence: 96.8,
        status: "completed"
    },
    {
        id: 4,
        filename: "patient_scan_new.dcm",
        uploadDate: "2024-08-14T16:20:00",
        result: "Pituitary Adenoma",
        confidence: 89.1,
        status: "completed"
    },
    {
        id: 5,
        filename: "brain_mri_latest.jpg",
        uploadDate: "2024-08-14T14:10:00",
        result: "Glioma",
        confidence: 91.7,
        status: "completed"
    }
];

const getResultColor = (result: string) => {
    if (result === "No Tumor") return "success";
    return "destructive";
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const HistoryList = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Recent Analysis History</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {mockHistory.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FileImage className="h-5 w-5 text-primary" />
                            </div>

                            <div className="space-y-1">
                                <p className="font-medium text-foreground text-sm">
                                    {item.filename}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDate(item.uploadDate)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <Badge variant={getResultColor(item.result) as any} className="mb-1">
                                    {item.result}
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                    {item.confidence}% confidence
                                </p>
                            </div>

                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                                <Brain className="h-4 w-4 text-accent" />
                            </div>
                        </div>
                    </div>
                ))}

                {mockHistory.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No analysis history yet</p>
                        <p className="text-sm">Upload your first MRI scan to get started</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default HistoryList;