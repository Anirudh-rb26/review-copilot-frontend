"use client"

import { TopicData } from "@/lib/mockdata"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface TopicChartProps {
    data: TopicData[]
}

export function TopicChart({ data }: TopicChartProps) {
    const chartData = data
        .sort((a, b) => b.count - a.count)
        .map((item) => ({
            topic: item.topic.charAt(0).toUpperCase() + item.topic.slice(1),
            count: item.count,
        }))

    return (
        <Card className="bg-[#212121] border-none text-white">
            <CardHeader>
                <CardTitle>Top Topics</CardTitle>
                <CardDescription className="text-white">Most mentioned topics in reviews</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} layout="vertical">
                        <XAxis type="number" stroke="white" fontSize={12} />
                        <YAxis dataKey="topic" type="category" stroke="white" fontSize={12} width={120} />
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
                        <Bar dataKey="count" fill="#FFB74D" radius={[0, 8, 8, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
