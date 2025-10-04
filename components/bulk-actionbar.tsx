"use client"

import { Button } from "@/components/ui/button"
import { MessageSquarePlus, Copy, X } from "lucide-react"

interface BulkActionsBarProps {
    selectedCount: number
    onSuggestReplies: () => void
    onCopySelected: () => void
    onClearSelection: () => void
    showReplyAll?: boolean
    onReplyAll?: () => void
}

export function BulkActionsBar({
    selectedCount,
    onSuggestReplies,
    onCopySelected,
    onClearSelection,
    showReplyAll,
    onReplyAll,
}: BulkActionsBarProps) {
    if (selectedCount === 0) return null

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 text-white">
            <div className="bg-[#3A3A3A] rounded-lg shadow-lg px-4 py-3 flex items-center gap-3">
                <span className="text-sm font-medium">{selectedCount} selected</span>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="default" onClick={onSuggestReplies} className="gap-2 bg-[#181818] hover:bg-[#101010]">
                        <MessageSquarePlus className="h-4 w-4" />
                        Suggest Replies
                    </Button>
                    {showReplyAll && onReplyAll && (
                        <Button size="sm" variant="default" onClick={onReplyAll} className="gap-2">
                            <MessageSquarePlus className="h-4 w-4" />
                            Reply All
                        </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={onCopySelected} className="gap-2 bg-transparent">
                        <Copy className="h-4 w-4" />
                        Copy Texts
                    </Button>
                    <Button size="sm" variant="ghost" onClick={onClearSelection} className="gap-2">
                        <X className="h-4 w-4" />
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    )
}
