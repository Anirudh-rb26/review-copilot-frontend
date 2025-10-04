"use client"

import { mockReviews, Review } from "@/lib/mockdata"
import { Star, MessageSquare, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export function StatsCards({ uploadedReviews }: { uploadedReviews: Review[] }) {
    const reviews = uploadedReviews.length > 0 ? uploadedReviews : mockReviews;
    const totalReviews = reviews.length
    const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    const positiveCount = reviews.filter((r) => r.sentiment === "positive").length
    const negativeCount = reviews.filter((r) => r.sentiment === "negative").length
    const positivePercentage = ((positiveCount / totalReviews) * 100).toFixed(0)

    console.log("uploadedReviews: ", uploadedReviews.length)
    console.log("const reveiws: ", reviews);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#212121] border-none text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2 ">
                    <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                    <MessageSquare className="h-4 w-4 text-chart-3 fill-chart-3" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalReviews}</div>
                    <p className="text-xs mt-1">All time</p>
                </CardContent>
            </Card>

            <Card className="bg-[#212121] border-none text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium  ">Average Rating</CardTitle>
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 " />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageRating}/5</div>
                    <p className="text-xs   mt-1">Across all reviews</p>
                </CardContent>
            </Card>

            <Card className="bg-[#212121] border-none text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium  ">Positive Reviews</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-400">{positivePercentage}%</div>
                    <p className="text-xs   mt-1">{positiveCount} reviews</p>
                </CardContent>
            </Card>

            <Card className="bg-[#212121] border-none text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium  ">Negative Reviews</CardTitle>
                    <TrendingDown className="h-4 w-4 text-red-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-400">{negativeCount}</div>
                    <p className="text-xs   mt-1">Need attention</p>
                </CardContent>
            </Card>
        </div>
    )
}
