"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileJson, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ingestReview } from "../api/client"
import { toast, ToastContainer } from "react-toastify"
import { useReviews } from "@/contexts/ReviewContext"
import { Review } from "@/lib/mockdata"

export default function UploadPage() {
    const { setUploadedReviews } = useReviews();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)
    const [uploadedReviews, setUploadedReviewsState] = useState<Review[]>([])

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = e.dataTransfer.files;

        if (files && files[0]) {
            const file = files[0];

            if (file.type !== "application/json") {
                alert("Please upload a valid JSON file.");
                return;
            }

            try {
                const fileContent = await file.text();
                const reviewData = JSON.parse(fileContent);

                await handleUpload(reviewData);
            } catch (error) {
                console.log("Error Parsing JSON:", error);
                alert("Error parsing JSON file. Please ensure it is correctly formatted.");
            }
        }
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.type !== "application/json") {
                alert("Please upload a valid JSON file.");
                return;
            }

            try {
                const fileContent = await file.text();
                const reviewData = JSON.parse(fileContent);

                await handleUpload(reviewData);
            } catch (error) {
                console.log("Error Parsing JSON:", error);
                alert("Error parsing JSON file. Please ensure it is correctly formatted.");
            }
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click();
    }

    const handleUpload = async (reviewData: Review) => {
        try {
            console.log("Uploading review data:", reviewData);
            const result = await ingestReview(reviewData);
            setUploadedReviews(result);
            setIsUploaded(true)
            setUploadedReviews(result);

            toast.success("File uploaded successfully!");
        } catch (error) {
            console.log("Upload Error:", error);
            toast.error("Error uploading file. Please try again.");
        }
    }

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case "positive":
                return "bg-chart-3/20 text-chart-3 border-chart-3/30"
            case "negative":
                return "bg-chart-4/20 text-chart-4 border-chart-4/30"
            case "neutral":
                return "bg-muted text-muted-foreground border-border"
            default:
                return "bg-muted text-muted-foreground border-border"
        }
    }

    return (
        <div className="px-6">
            <ToastContainer />
            <div className="flex flex-col mb-2">
                <h1 className="text-4xl">Upload Reviews</h1>
                <h4 className="text-shadow-md mt-1">Import reviews from a JSON file</h4>
            </div>

            <div className="my-3"></div>

            <Card className="bg-[#212121] border-none text-white">
                <CardHeader>
                    <CardTitle>Upload File</CardTitle>
                    <CardDescription className="text-white">Drag and drop your reviews.json file or click to browse</CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                            "border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer",
                            isDragging ? "border-white bg-white/5" : "border-border hover:border-white/50",
                        )}
                    >
                        <input type="file" accept=".json" onChange={handleFileSelect} className="hidden" id="file-upload" ref={fileInputRef} />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-4">
                                <div className="rounded-full bg-primary/10 p-4">
                                    <FileJson className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium">Drop your file here or click to browse</p>
                                    <p className="text-sm mt-1">Supports JSON files up to 10MB</p>
                                </div>
                                <Button type="button" variant="outline" className="gap-2 text-black hover:text-white hover:bg-[#181818] border-none transition-colors duration-300" onClick={handleClick}>
                                    <Upload className="h-4 w-4" />
                                    Select File
                                </Button>
                            </div>
                        </label>
                    </div>
                </CardContent>
            </Card>

            {
                isUploaded && (
                    <Card className="bg-[#212121] border-none text-white mt-6">
                        <CardHeader>
                            <div className="flex items-center flex-col gap-2">
                                <div className="flex flex-row gap-4">
                                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                                    <CardTitle>Upload Successful</CardTitle>
                                </div>
                                <CardDescription className="text-white">Check out Inbox and Analytics!</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                )
            }
        </div >
    )
}
