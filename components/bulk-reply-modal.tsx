"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { mockReplies, Review } from "@/lib/mockdata"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download, Edit2, PencilLine, Star } from "lucide-react"
import { Slide, toast, ToastContainer } from "react-toastify"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { generateReply } from "@/app/api/client"

interface BulkReplyModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    reviews: Review[]
}

export function BulkReplyModal({ open, onOpenChange, reviews }: BulkReplyModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editedReplies, setEditedReplies] = useState<Record<string, string>>({})

    const copiedToast = () => toast.success("Copied to clipboard!");

    const copyAll = () => {
        const allReplies = reviews.map((review) => getReply(review.id)).join("\n\n")
        copiedToast();
        return allReplies;
    }

    const downloadAsCSV = () => {
        const headers = ["Review ID", "Suggested Reply"];
        const rows = reviews.map((review) => {
            const reply = getReply(review.id);
            const escapedReply = `"${reply.replace(/"/g, '""')}"`;
            return `"${review.id}", ${escapedReply}`;
        })

        const csvContent = [headers.join(","), ...rows].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `reviews_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = "hidden";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        toast.success("Your download will begin soon!");
    }

    const getReply = (reviewId: string) => {
        if (editedReplies[reviewId]) return editedReplies[reviewId]
        return (
            mockReplies[reviewId] ||
            "Thank you for your feedback. We appreciate you taking the time to share your experience with us."
        )
    }

    const handleEdit = (reviewId: string) => {
        setEditingId(reviewId)
        if (!editedReplies[reviewId]) {
            setEditedReplies((prev) => ({ ...prev, [reviewId]: getReply(reviewId) }))
        }
    }

    const handleSaveEdit = () => {
        setEditingId(null)
    }

    const handleReplyChange = (reviewId: string, value: string) => {
        setEditedReplies((prev) => ({ ...prev, [reviewId]: value }))
    }

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case "positive":
                return "bg-chart-3/30 text-chart-3 border-chart-3/30 text-white"
            case "negative":
                return "bg-red-400/30 text-white border-chart-4/30"
            case "neutral":
                return "bg-yellow-400/30 text-chart-4 border-none"
            default:
                return "bg-muted text-muted-foreground border-border"
        }
    }

    const suggestReply = async (review_id: string) => {
        setIsLoading(true);
        try {
            const response = await generateReply(review_id);
            const suggested_reply = response.suggested_reply || response;
            setEditedReplies((prev) => ({ ...prev, [review_id]: suggested_reply }))
        } catch (error) {
            console.log("Error generating reply:", error);
        }
        setIsLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col bg-[#181818] border-none text-white overflow-hidden">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Bulk Reply Suggestions</DialogTitle>
                    <DialogDescription className="text-white">Review and customize AI-generated replies for {reviews.length} reviews</DialogDescription>
                </DialogHeader>

                <div className="flex-1 min-h-0 overflow-hidden">
                    <ScrollArea className="flex-1 pr-4 h-full">
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="rounded-lg p-4 space-y-4 bg-[#3A3A3A]">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{review.id}</span>
                                                <Badge variant="outline" className={cn("capitalize", getSentimentColor(review.sentiment))}>
                                                    {review.sentiment}
                                                </Badge>
                                            </div>
                                            <p className="text-sm line-clamp-2">{review.text}</p>
                                            <div className="flex items-center gap-3 text-xs">
                                                <span>{review.location}</span>
                                                <span>•</span>
                                                <div className="flex items-center gap-1">
                                                    {Array.from({ length: review.rating }).map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 fill-chart-3 text-chart-3" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium">Suggested Reply</label>
                                            {editingId !== review.id && (
                                                <Button variant="ghost" size="sm" onClick={() => handleEdit(review.id)} className="gap-2 h-8">
                                                    <Edit2 className="h-3 w-3" />
                                                    Edit
                                                </Button>
                                            )}
                                        </div>

                                        {editingId === review.id ? (
                                            <div className="space-y-2">
                                                <Textarea
                                                    value={getReply(review.id)}
                                                    onChange={(e) => handleReplyChange(review.id, e.target.value)}
                                                    className="min-h-[100px] resize-none bg-[#181818] border-none"
                                                />
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="ghost" onClick={handleSaveEdit} className="bg-[#181818]">
                                                        Save
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="bg-[#181818]" onClick={() => setEditingId(null)}>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : isLoading && editingId === null ? (
                                            <div className="rounded-md p-3 bg-[#181818] space-y-2">
                                                <div className="h-4 bg-[#2A2A2A] rounded animate-pulse"></div>
                                                <div className="h-4 bg-[#2A2A2A] rounded animate-pulse w-5/6"></div>
                                                <div className="h-4 bg-[#2A2A2A] rounded animate-pulse w-4/6"></div>
                                            </div>
                                        ) : (
                                            <div className="rounded-md p-3 bg-[#181818] text-sm">
                                                {editedReplies[review.id] || getReply(review.id)}
                                            </div>
                                        )}

                                        <div className="flex gap-2 justify-between">
                                            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard.writeText(getReply(review.id)).then(() => copiedToast()) }} className="gap-2 bg-[#181818] border-none hover:bg-[#101010] hover:text-white">
                                                <Copy className="h-3 w-3" />
                                                Copy
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={() => { suggestReply(review.id) }} className="gap-2 bg-[#181818] border-none hover:bg-[#101010] hover:text-white">
                                                <PencilLine className="h-3 w-3" />
                                                Suggest Response
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">{reviews.length} replies ready</p>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => { copyAll() }} className="gap-2 bg-[#181818]">
                            <Copy className="h-4 w-4" />
                            Copy All
                        </Button>
                        <Button variant="outline" onClick={() => { downloadAsCSV() }} className="gap-2 bg-[#181818]">
                            <Download className="h-4 w-4" />
                            Download CSV
                        </Button>
                        <Button onClick={() => onOpenChange(false)} className="bg-white text-[#181818] hover:text-white hover:bg-[#181818] border">Done</Button>
                    </div>
                </div>
            </DialogContent>
            <ToastContainer position="bottom-center" hideProgressBar={false} theme="dark" transition={Slide} pauseOnFocusLoss draggable closeOnClick />
        </Dialog>
    )
}
