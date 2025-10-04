"use client"

import { AnalyticsData } from "@/lib/mockdata"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface SentimentChartProps {
    data: AnalyticsData[]
}

export function SentimentChart({ data }: SentimentChartProps) {
    const chartData = data.map((item) => ({
        sentiment: item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1),
        count: item.count,
        fill:
            item.sentiment === "positive"
                ? "#66BB6A"
                : item.sentiment === "neutral"
                    ? "#FFEE58"
                    : "#EF5350",
    }))

    return (
        <Card className="bg-[#212121] border-none text-white">
            <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
                <CardDescription className="text-white">Review sentiment breakdown</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="sentiment" stroke="white" fontSize={12} />
                        <YAxis stroke="white" fontSize={12} />
                        <Tooltip
                            cursor={{ fill: '#181818', radius: 8 }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div style={{ background: "#181818", padding: "4px", borderRadius: "8px" }} className="flex flex-row gap-2">
                                            <p style={{ color: "white", margin: "0" }}>{label}:</p>
                                            <p style={{ color: "white", margin: "0" }}> {payload[0].value}</p>
                                        </div>
                                    )
                                }
                            }}
                            contentStyle={{
                                backgroundColor: "#3A3A3A",
                                border: "1px solid hsl(var(--border border-none))",
                                borderRadius: "8px",
                            }}
                            labelStyle={{ color: "white" }}
                            itemStyle={{ color: "white" }}

                        />
                        <Bar dataKey="count" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
