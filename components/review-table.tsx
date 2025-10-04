"use client"

import { useState } from "react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Review } from "@/lib/mockdata"

interface ReviewTableProps {
    reviews: Review[]
    selectedIds: string[]
    onSelectionChange: (ids: string[]) => void
}

const ITEMS_PER_PAGE = 10

export function ReviewTable({ reviews, selectedIds, onSelectionChange }: ReviewTableProps) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentReviews = reviews.slice(startIndex, endIndex)

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = currentReviews.map((r) => r.id)
            onSelectionChange([...new Set([...selectedIds, ...allIds])])
        } else {
            const currentIds = currentReviews.map((r) => r.id)
            onSelectionChange(selectedIds.filter((id) => !currentIds.includes(id)))
        }
    }

    const handleSelectOne = (id: string, checked: boolean) => {
        if (checked) {
            onSelectionChange([...selectedIds, id])
        } else {
            onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id))
        }
    }

    const allCurrentSelected = currentReviews.length > 0 && currentReviews.every((r) => selectedIds.includes(r.id))

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case "positive":
                return "bg-chart-3/20 text-chart-3 border-chart-3/30"
            case "negative":
                return "bg-chart-4/20 text-chart-4 border-chart-4/30"
            case "neutral":
                return "bg-muted  -foreground border-border"
            default:
                return "bg-muted  -foreground border-border"
        }
    }

    return (
        <div className="space-y-4 text-white">
            <div className="border border-border rounded-lg overflow-hidden bg-[#212121] border-none">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#3a3a3a]">
                                <th className="w-12 p-4">
                                    <Checkbox checked={allCurrentSelected} onCheckedChange={handleSelectAll} />
                                </th>
                                <th className="text-left p-4 text-sm font-medium">ID</th>
                                <th className="text-left p-4 text-sm font-medium">Location</th>
                                <th className="text-left p-4 text-sm font-medium">Rating</th>
                                <th className="text-left p-4 text-sm font-medium">Date</th>
                                <th className="text-left p-4 text-sm font-medium">Preview</th>
                                <th className="text-left p-4 text-sm font-medium">Sentiment</th>
                                <th className="text-left p-4 text-sm font-medium">Topics</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReviews.map((review) => (
                                <tr
                                    key={review.id}
                                    className="hover:bg-[#3a3a3a] transition-colors"
                                >
                                    <td className="p-4">
                                        <Checkbox
                                            checked={selectedIds.includes(review.id)}
                                            onCheckedChange={(checked) => handleSelectOne(review.id, checked as boolean)}
                                        />
                                    </td>
                                    <td className="p-4">
                                        <Link href={`/reviews/${review.id}`} className="text-sm font-mono text-white hover:underline">
                                            {review.id}
                                        </Link>
                                    </td>
                                    <td className="p-4 text-sm">{review.location}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-chart-3 text-chart-3" />
                                            ))}
                                            {Array.from({ length: 5 - review.rating }).map((_, i) => (
                                                <Star key={i} className="h-4 w-4  " />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm  -foreground">{new Date(review.date).toLocaleDateString()}</td>
                                    <td className="p-4 max-w-md">
                                        <Link href={`/reviews/${review.id}`}>
                                            <p className="text-sm text-white truncate transition-colors">
                                                {review.text}
                                            </p>
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="outline" className={cn("capitalize", getSentimentColor(review.sentiment))}>
                                            {review.sentiment}
                                        </Badge>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                            {review.topics.slice(0, 2).map((topic) => (
                                                <Badge key={topic} variant="secondary" className="text-xs">
                                                    {topic}
                                                </Badge>
                                            ))}
                                            {review.topics.length > 2 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{review.topics.length - 2}
                                                </Badge>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm  -foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, reviews.length)} of {reviews.length} reviews
                </p>
                <div className="flex items-center gap-2 text-white">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="bg-[#181818] text-white border-[#3A3A3A]"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Button>
                    <span className="text-sm  -foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="bg-[#181818] text-white border-[#3A3A3A]"
                    >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
