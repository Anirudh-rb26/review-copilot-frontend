export interface Review {
  id: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  sentiment: "positive" | "negative" | "neutral";
  topics: string[];
  suggested_reply?: string;
}

export const mockReviews: Review[] = [
  {
    id: "REV-001",
    location: "New York, NY",
    rating: 5,
    date: "2025-09-28",
    text: "Absolutely fantastic experience! The service was impeccable and the staff went above and beyond. Would highly recommend to anyone looking for quality.",
    sentiment: "positive",
    topics: ["service", "staff", "quality"],
  },
  {
    id: "REV-002",
    location: "Los Angeles, CA",
    rating: 2,
    date: "2025-09-27",
    text: "Very disappointed with the quality. The product did not meet expectations and customer service was unresponsive.",
    sentiment: "negative",
    topics: ["quality", "customer service"],
  },
  {
    id: "REV-003",
    location: "Chicago, IL",
    rating: 4,
    date: "2025-09-26",
    text: "Good overall experience. A few minor issues but nothing major. The team was responsive and helpful.",
    sentiment: "positive",
    topics: ["service", "team"],
  },
  {
    id: "REV-004",
    location: "Houston, TX",
    rating: 3,
    date: "2025-09-25",
    text: "Average experience. Nothing particularly stood out, but nothing was terrible either. Just okay.",
    sentiment: "neutral",
    topics: ["general"],
  },
  {
    id: "REV-005",
    location: "Phoenix, AZ",
    rating: 5,
    date: "2025-09-24",
    text: "Exceeded all expectations! The attention to detail was remarkable and the final result was perfect.",
    sentiment: "positive",
    topics: ["quality", "attention to detail"],
  },
  {
    id: "REV-006",
    location: "Philadelphia, PA",
    rating: 1,
    date: "2025-09-23",
    text: "Terrible experience from start to finish. Poor communication, missed deadlines, and subpar quality. Would not recommend.",
    sentiment: "negative",
    topics: ["communication", "quality", "deadlines"],
  },
  {
    id: "REV-007",
    location: "San Antonio, TX",
    rating: 4,
    date: "2025-09-22",
    text: "Very pleased with the service. Quick turnaround and professional team. Minor room for improvement but overall great.",
    sentiment: "positive",
    topics: ["service", "team", "turnaround"],
  },
  {
    id: "REV-008",
    location: "San Diego, CA",
    rating: 5,
    date: "2025-09-21",
    text: "Outstanding! This is exactly what I was looking for. The team understood my needs perfectly and delivered beyond expectations.",
    sentiment: "positive",
    topics: ["team", "quality", "expectations"],
  },
  {
    id: "REV-009",
    location: "Dallas, TX",
    rating: 2,
    date: "2025-09-20",
    text: "Not satisfied with the outcome. Several issues that needed to be addressed and the response time was slow.",
    sentiment: "negative",
    topics: ["quality", "response time"],
  },
  {
    id: "REV-010",
    location: "San Jose, CA",
    rating: 4,
    date: "2025-09-19",
    text: "Solid experience overall. The team was knowledgeable and the process was smooth. Would use again.",
    sentiment: "positive",
    topics: ["team", "process"],
  },
  {
    id: "REV-011",
    location: "Austin, TX",
    rating: 5,
    date: "2025-09-18",
    text: "Incredible service! Fast, efficient, and high quality. The team was friendly and professional throughout.",
    sentiment: "positive",
    topics: ["service", "quality", "team"],
  },
  {
    id: "REV-012",
    location: "Jacksonville, FL",
    rating: 3,
    date: "2025-09-17",
    text: "Decent service but nothing special. Met basic expectations but didn't go above and beyond.",
    sentiment: "neutral",
    topics: ["service", "expectations"],
  },
  {
    id: "REV-013",
    location: "Fort Worth, TX",
    rating: 1,
    date: "2025-09-16",
    text: "Extremely poor experience. Multiple errors, lack of professionalism, and no accountability. Very frustrating.",
    sentiment: "negative",
    topics: ["professionalism", "quality", "accountability"],
  },
  {
    id: "REV-014",
    location: "Columbus, OH",
    rating: 4,
    date: "2025-09-15",
    text: "Great experience! The team was responsive and the quality was high. A few small hiccups but handled well.",
    sentiment: "positive",
    topics: ["team", "quality", "responsiveness"],
  },
  {
    id: "REV-015",
    location: "Charlotte, NC",
    rating: 5,
    date: "2025-09-14",
    text: "Perfect in every way! From start to finish, everything was handled professionally and efficiently. Highly recommend!",
    sentiment: "positive",
    topics: ["professionalism", "efficiency", "quality"],
  },
];

export const mockLocations = [
  "All Locations",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
  "Austin, TX",
  "Jacksonville, FL",
  "Fort Worth, TX",
  "Columbus, OH",
  "Charlotte, NC",
];

export const mockSentiments = ["All Sentiments", "positive", "negative", "neutral"];

export const mockReplies: Record<string, string> = {
  "REV-001":
    "Thank you so much for your wonderful feedback! We're thrilled to hear that our team exceeded your expectations. Your recommendation means the world to us!",
  "REV-002":
    "We sincerely apologize for your disappointing experience. This is not the level of service we strive for. We'd like to make this right - please contact our customer service team so we can address your concerns.",
  "REV-003":
    "Thank you for your positive feedback! We're glad our team was able to help. We're always working to improve and appreciate you noting the minor issues.",
  "REV-004":
    "Thank you for taking the time to share your feedback. We appreciate your honest review and would love to know how we can improve your experience next time.",
  "REV-005":
    "We're so happy to hear we exceeded your expectations! Attention to detail is something we pride ourselves on. Thank you for recognizing our efforts!",
};

export interface AnalyticsData {
  sentiment: string;
  count: number;
}

export interface TopicData {
  topic: string;
  count: number;
}

export const mockAnalytics: AnalyticsData[] = [
  { sentiment: "positive", count: 9 },
  { sentiment: "negative", count: 4 },
  { sentiment: "neutral", count: 2 },
];

export const mockTopics: TopicData[] = [
  { topic: "service", count: 7 },
  { topic: "quality", count: 8 },
  { topic: "team", count: 7 },
  { topic: "professionalism", count: 3 },
  { topic: "customer service", count: 2 },
  { topic: "communication", count: 1 },
  { topic: "response time", count: 2 },
];
