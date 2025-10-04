import { Review } from "@/lib/mockdata";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_BASE_URL = "http://localhost:8000";

// GET / - Health check
export async function healthCheck() {
  const response = await fetch(`${API_BASE_URL}/`);

  if (!response.ok) {
    throw new Error("API health check failed");
  }

  return response.json();
}

// POST /ingest - Ingest a new review
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function ingestReview(reviewData: any) {
  const response = await fetch(`${API_BASE_URL}/ingest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to ingest review");
  }

  return response.json();
}

// GET /all-reviews - Get all reviews
export async function getAllReviews(): Promise<Review[]> {
  const response = await fetch(`${API_BASE_URL}/all-reviews`);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
}

// GET /similar-reviews/{review_id} - Get similar reviews
export async function getSimilarReviews(reviewId: string): Promise<Review[]> {
  const response = await fetch(`${API_BASE_URL}/similar-reviews/${reviewId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Review ${reviewId} not found`);
    }
    throw new Error(`Failed to fetch similar reviews: ${response.statusText}`);
  }

  const data = await response.json();
  return data.similar_reviews || [];
}

// POST /generate-reply - Generate a reply for a review
export async function generateReply(reviewId: string) {
  const response = await fetch(`${API_BASE_URL}/generate-reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review_id: reviewId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to generate reply");
  }

  return response.json();
}

export async function fetchReviewDetails(reviewId: string): Promise<Review> {
  const response = await fetch(`${API_BASE_URL}/review/${reviewId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Review ${reviewId} not found`);
    }
    throw new Error(`Failed to fetch review details: ${response.statusText}`);
  }

  const data: Review = await response.json();
  return data;
}

// ============================================
// EXAMPLE USAGE IN A REACT COMPONENT
// ============================================

/*
'use client';

import { useEffect, useState } from 'react';
import { getAllReviews, ingestReview, generateReply, type Review } from '@/lib/api/client';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all reviews on mount
  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchReviews();
  }, []);

  // Handle adding a new review
  const handleIngestReview = async () => {
    try {
      await ingestReview({
        id: `review-${Date.now()}`,
        location: 'Downtown Store',
        rating: 5,
        date: new Date().toISOString().split('T')[0],
        text: 'Amazing service and quality!',
      });
      
      // Refresh reviews
      const data = await getAllReviews();
      setReviews(data);
    } catch (err) {
      console.error('Error ingesting review:', err);
      alert('Failed to add review');
    }
  };

  // Handle generating a reply
  const handleGenerateReply = async (reviewId: string) => {
    try {
      const result = await generateReply(reviewId);
      console.log('Generated reply:', result);
      
      // Refresh reviews to show the new reply
      const data = await getAllReviews();
      setReviews(data);
    } catch (err) {
      console.error('Error generating reply:', err);
      alert('Failed to generate reply');
    }
  };

  if (loading) return <div className="p-4">Loading reviews...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reviews Dashboard</h1>
        <button 
          onClick={handleIngestReview}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Test Review
        </button>
      </div>

      <div className="grid gap-4">
        {reviews.map(review => (
          <div key={review.id} className="border p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl font-semibold">{review.location}</h2>
                <p className="text-sm text-gray-600">{review.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  review.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                  review.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {review.sentiment}
                </span>
              </div>
            </div>
            
            <p className="mb-3">{review.text}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {review.topics.map(topic => (
                <span key={topic} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {topic}
                </span>
              ))}
            </div>
            
            {review.suggested_reply && (
              <div className="bg-gray-50 p-3 rounded mt-3">
                <p className="text-sm font-semibold mb-1">Suggested Reply:</p>
                <p className="text-sm">{review.suggested_reply}</p>
              </div>
            )}
            
            {!review.suggested_reply && (
              <button
                onClick={() => handleGenerateReply(review.id)}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
              >
                Generate Reply
              </button>
            )}
          </div>
        ))}
      </div>
      
      {reviews.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No reviews yet</p>
      )}
    </div>
  );
}
*/
