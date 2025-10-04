"use client"

import { useEffect, useState } from "react"
import { fetchAnalytics } from "@/lib/analytics"
import { StatsCards } from "@/components/stats-card"
import { useReviews } from "@/contexts/ReviewContext"
import { TopicChart } from "@/components/topic-chart"
import { mockAnalytics, mockTopics } from "@/lib/mockdata"
import { SentimentChart } from "@/components/sentiment-chart"
import { AnalyticsData, TopicData } from "../../lib/mockdata";
import { Button } from "@/components/ui/button"

export default function AnalyticsPage() {
    const { uploadedReviews } = useReviews();
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
    const [topicData, setTopicData] = useState<TopicData[]>([]);
    const [useMockData, setUseMockData] = useState(false);

    useEffect(() => {
        fetchAnalytics({ setAnalytics, setTopicData, uploadedReviews });
    }, [uploadedReviews])

    return (
        <div className="px-6">
            <div className="flex flex-col mb-2">
                <h1 className="text-4xl">Analytics</h1>
                <h4 className="text-md mt-1">Review insights and trends.</h4>
            </div>

            <div className="my-3"></div>

            {analytics.length > 0 && topicData.length > 0 ? (
                <div>
                    <StatsCards uploadedReviews={uploadedReviews} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                        <SentimentChart data={analytics} />
                        <TopicChart data={topicData} />
                    </div>
                </div>
            ) : (
                useMockData ? (
                    <div>
                        <StatsCards uploadedReviews={uploadedReviews} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <SentimentChart data={mockAnalytics} />
                            <TopicChart data={mockTopics} />
                        </div>
                    </div>

                ) : (
                    <div className="flex flex-col gap-5 mt-10 items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-3xl">No Analytics Available!</h1>
                            <p className="text-md mt-1">Do you want to use Mockdata?</p>
                        </div>
                        <Button
                            variant="outline"
                            className="text-black border-none hover:bg-[#181818] hover:text-white transition-colors duration-300"
                            onClick={() => { setUseMockData(true) }}>
                            Use Mockdata?
                        </Button>
                    </div>
                )
            )}
        </div>
    )
}
