"use client";

import { useMemo, useState } from "react";
import { mockReviews } from "@/lib/mockdata";
import { useReviews } from "@/contexts/ReviewContext";
import { ReviewTable } from "@/components/review-table";
import { ReviewFilters } from "@/components/review-filters";
import { BulkActionsBar } from "@/components/bulk-actionbar";
import { BulkReplyModal } from "@/components/bulk-reply-modal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { uploadedReviews } = useReviews();
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMockData, setShowMockData] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkReplyModal, setShowReplyModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedSentiment, setSelectedSentiment] = useState("All Sentiments");

  const filteredReviews = useMemo(() => {
    const reviews = uploadedReviews.length > 0 ? uploadedReviews : (showMockData ? mockReviews : []);

    return reviews.filter((review) => {
      const matchesSearch = review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = selectedLocation === "All Locations" ||
        review.location === selectedLocation

      const matchesSentiment = selectedSentiment === "All Sentiments" ||
        review.sentiment === selectedSentiment;

      const matchesDateFrom = !dateFrom || review.date >= dateFrom;
      const matchesDateTo = !dateTo || review.date <= dateTo;

      return matchesSearch && matchesLocation && matchesSentiment && matchesDateFrom && matchesDateTo;
    })
  }, [searchQuery, selectedLocation, selectedSentiment, dateFrom, dateTo, uploadedReviews, showMockData])

  const locations = ["All Locations", ...new Set(uploadedReviews.map(review => review.location))];
  const selectedReviews = (uploadedReviews.length > 0 ? uploadedReviews : mockReviews)
    .filter((review) => selectedIds.includes(review.id));

  return (
    <div className="px-6">
      <div className="flex flex-col">
        <h1 className="text-4xl">Inbox</h1>
        <h4 className="text-md mt-1">All Customer Reviews</h4>
      </div>
      <div className="my-3"></div>
      {filteredReviews.length === 0 ? (
        <div className="flex flex-col gap-5 mt-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl">No Reviews Available!</h1>
            <p className="text-md mt-1">Do you want to use Mockdata?</p>
          </div>
          <Button
            variant="outline"
            className="text-black border-none hover:bg-[#181818] hover:text-white transition-colors duration-300"
            onClick={() => { setShowMockData(true) }}>
            Use Mockdata?
          </Button>
        </div>
      ) : (<div>
        <ReviewFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          selectedSentiment={selectedSentiment}
          onSentimentChange={setSelectedSentiment}
          dateFrom={dateFrom}
          onDateFromChange={setDateFrom}
          dateTo={dateTo}
          onDateToChange={setDateTo}
          activeLocation={locations}
        />

        <div className="my-3"></div>

        <ReviewTable
          reviews={filteredReviews}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        <BulkActionsBar
          selectedCount={selectedIds.length}
          onSuggestReplies={() => setShowReplyModal(true)}
          onCopySelected={() => { }}
          onClearSelection={() => setSelectedIds([])}
        />
        <BulkReplyModal
          open={showBulkReplyModal}
          onOpenChange={setShowReplyModal}
          reviews={selectedReviews}
        />
      </div>)
      }
    </div >
  );
}
