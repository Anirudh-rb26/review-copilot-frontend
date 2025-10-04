"use client"

import { getAllReviews } from '@/app/api/client';
import { Review } from '@/lib/mockdata';
import { createContext, useContext, useState, useEffect } from 'react';

type ReviewContextType = {
    uploadedReviews: Review[];
    setUploadedReviews: (reviews: Review[]) => void;
    loading: boolean;
    error: string | null;
};

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
    const [uploadedReviews, setUploadedReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchReviews() {
            try {
                // Only fetch from database if no reviews have been uploaded
                if (uploadedReviews.length === 0) {
                    const dbReviews = await getAllReviews();
                    if (dbReviews.length > 0) {
                        setUploadedReviews(dbReviews);
                    }
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
                console.error('Error fetching reviews:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, []); // Only run on mount

    return (
        <ReviewContext.Provider value={{ uploadedReviews, setUploadedReviews, loading, error }}>
            {children}
        </ReviewContext.Provider>
    );
}

export function useReviews() {
    const context = useContext(ReviewContext);
    if (!context) throw new Error('useReviews must be used within ReviewProvider');
    return context;
}