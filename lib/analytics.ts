import { AnalyticsData, Review, TopicData } from "./mockdata";

interface AnalyticsProps {
  setAnalytics: (value: AnalyticsData[]) => void;
  setTopicData: (value: TopicData[]) => void;
  uploadedReviews: Review[];
}

export function fetchAnalytics({ setAnalytics, setTopicData, uploadedReviews }: AnalyticsProps) {
  const sentimentCounts: Record<string, number> = {
    positive: 0,
    negative: 0,
    neutral: 0,
  };

  const topicCounts: Record<string, number> = {};

  uploadedReviews.forEach((review, index) => {
    // Sentiment tracking
    sentimentCounts[review.sentiment]++;

    // Topics tracking
    review.topics.forEach((topic) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });

  const analyticsData: AnalyticsData[] = Object.entries(sentimentCounts).map(
    ([sentiment, count]) => {
      return { sentiment, count };
    }
  );

  const topicData: TopicData[] = Object.entries(topicCounts)
    .map(([topic, count]) => {
      return { topic, count };
    })
    .sort((a, b) => {
      return b.count - a.count;
    });

  setAnalytics(analyticsData);
  setTopicData(topicData);
}
