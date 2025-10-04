"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { mockLocations, mockSentiments } from "@/lib/mockdata"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "./ui/button"

interface ReviewFiltersProps {
    searchQuery: string
    onSearchChange: (value: string) => void
    selectedLocation: string
    onLocationChange: (value: string) => void
    selectedSentiment: string
    onSentimentChange: (value: string) => void
    dateFrom: string
    onDateFromChange: (value: string) => void
    dateTo: string
    onDateToChange: (value: string) => void
    activeLocation: string[]
}

export function ReviewFilters({
    searchQuery,
    onSearchChange,
    selectedLocation,
    onLocationChange,
    selectedSentiment,
    onSentimentChange,
    dateFrom,
    onDateFromChange,
    dateTo,
    onDateToChange,
    activeLocation,
}: ReviewFiltersProps) {

    function ClearAll() {
        console.log("SearchQuery:", searchQuery);
        console.log("SelectedLocation:", selectedLocation);
        console.log("SelectedSentiment:", selectedSentiment);
        console.log("DateFrom:", dateFrom);
        console.log("DateTo:", dateTo);
        onSearchChange("");
        onLocationChange("All Locations");
        onSentimentChange("All Sentiments");
        onDateFromChange("");
        onDateToChange("");
    };

    const showClearButton = selectedLocation !== "All Locations" || selectedSentiment !== "All Sentiments" || dateFrom || dateTo || searchQuery !== "";

    return (
        <div className="flex flex-col gap-4 p-4 mt-2 bg-[#212121] rounded-lg ">
            <div className="flex flex-row gap-4">
                <div className="relative lg:col-span-2 w-screen">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                    <Input
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9 border-none bg-[#3A3A3A] placeholder:text-white"
                    />
                </div>

                <Select value={selectedLocation} onValueChange={onLocationChange} >
                    <SelectTrigger className="border border-[#3A3A3A]">
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#212121] text-white border-none">
                        {activeLocation.map((location) => (
                            <SelectItem key={location} value={location} className=" data-[highlighted]:bg-[#3A3A3A] data-[highlighted]:text-white">
                                {location}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={selectedSentiment} onValueChange={onSentimentChange}>
                    <SelectTrigger className="border border-[#3A3A3A]">
                        <SelectValue placeholder="Sentiment" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#212121] text-white border-none">
                        {mockSentiments.map((sentiment) => (
                            <SelectItem key={sentiment} value={sentiment} className="data-[highlighted]:bg-[#3A3A3A] data-[highlighted]:text-white">
                                {sentiment}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex gap-2">
                    <Input type="date" value={dateFrom} onChange={(e) => onDateFromChange(e.target.value)} placeholder="From" className="border-[#3A3A3A] [color-scheme:dark]" />
                    <Input type="date" value={dateTo} onChange={(e) => onDateToChange(e.target.value)} placeholder="To" className="border-[#3A3A3A] [color-scheme:dark]" />
                    {showClearButton && <Button className="bg-red-400 hover:bg-red-600" onClick={ClearAll}>Clear Selection <X /> </Button>}
                </div>
            </div>
        </div >
    )
}
