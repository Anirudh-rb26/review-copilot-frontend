"use client"

import Link from 'next/link';
import { Review } from '@/lib/mockdata'
import { Button } from '@/components/ui/button';
import { Copy, Eye, PencilLine } from 'lucide-react';
import React, { use, useEffect, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify';
import { fetchReviewDetails, generateReply, getSimilarReviews } from '@/app/api/client'

interface ReviewPageProps {
    params: Promise<{ review_id: string }>;
}

const ReviewPage = ({ params }: ReviewPageProps) => {
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [loadingSimilar, setLoadingSimilar] = useState(true);
    const { review_id } = use<{ review_id: string }>(params);
    const [selectedReview, setSelectedReview] = useState<Review>();
    const [suggestedReply, setSuggestedReply] = useState<string>('');
    const [similarReviews, setSimilarReviews] = useState<Review[]>([]);


    const copiedToast = () => toast.success("Copied to clipboard!");

    const suggestReply = async (review_id: string) => {
        setIsGenerating(true);
        try {
            const response = await generateReply(review_id);
            const suggested_reply = response.suggested_reply || response;
            setSuggestedReply(suggested_reply);

            // Update the review with the new suggested reply
            if (selectedReview) {
                setSelectedReview({
                    ...selectedReview,
                    suggested_reply: suggested_reply
                });
            }
        } catch (error) {
            console.log("Error generating reply:", error);
        } finally {
            setIsGenerating(false);
        }
    }

    useEffect(() => {
        const loadReview = async () => {
            try {
                setLoading(true);
                const review = await fetchReviewDetails(review_id);
                setSelectedReview(review);
                setSuggestedReply(review.suggested_reply || '');
            } catch (error) {
                console.log("Error: ", error);
            } finally {
                setLoading(false);
            }
        }

        const loadSimilarReviews = async () => {
            try {
                setLoadingSimilar(true);
                const similar = await getSimilarReviews(review_id);
                setSimilarReviews(similar);
            } catch (error) {
                console.log("Error loading similar reviews:", error);
            } finally {
                setLoadingSimilar(false);
            }
        }

        loadReview();
        loadSimilarReviews();
    }, [review_id])

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment?.toLowerCase()) {
            case 'positive':
                return 'bg-green-400/30 border border-green-400 text-white';
            case 'negative':
                return 'bg-red-400/30 border border-red-400 text-white';
            case 'neutral':
                return 'bg-yellow-400/30 border border-yellow-400 text-white';
            default:
                return 'bg-blue-400';
        }
    }

    const getRatingStars = (rating: number) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    // Loading Skeleton Component
    const LoadingSkeleton = () => (
        <div className='px-6 py-6 min-h-screen' style={{ backgroundColor: '#181818' }}>
            <div className="flex flex-col mb-6">
                <div className="h-10 w-64 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-96 bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column Skeleton */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Review Card Skeleton */}
                    <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#212121' }}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="h-8 w-32 bg-gray-700 rounded animate-pulse mb-2"></div>
                                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                            <div className="h-8 w-24 bg-gray-700 rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-3 mb-4">
                            <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    {/* Suggested Reply Skeleton */}
                    <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#212121' }}>
                        <div className="flex items-center mb-4">
                            <div className="h-6 w-48 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div className="rounded-lg p-4 space-y-2" style={{ backgroundColor: '#3A3A3A' }}>
                            <div className="h-4 w-full bg-gray-600 rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-gray-600 rounded animate-pulse"></div>
                            <div className="h-4 w-2/3 bg-gray-600 rounded animate-pulse"></div>
                        </div>
                        <div className="mt-4 flex space-x-3 justify-between">
                            <div className="w-[45%] h-10 bg-gray-700 rounded animate-pulse"></div>
                            <div className="w-[45%] h-10 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Right Column Skeleton */}
                <div className="space-y-6">
                    {/* Similar Reviews Skeleton */}
                    <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#212121' }}>
                        <div className="h-6 w-40 bg-gray-700 rounded animate-pulse mb-4"></div>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="rounded-lg p-4" style={{ backgroundColor: '#3A3A3A' }}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="h-5 w-32 bg-gray-600 rounded animate-pulse"></div>
                                        <div className="h-8 w-16 bg-gray-600 rounded animate-pulse"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3 w-full bg-gray-600 rounded animate-pulse"></div>
                                        <div className="h-3 w-full bg-gray-600 rounded animate-pulse"></div>
                                        <div className="h-3 w-2/3 bg-gray-600 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Similar Reviews Loading Skeleton
    const SimilarReviewsSkeleton = () => (
        <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#212121' }}>
            <div className="h-6 w-40 bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="rounded-lg p-4" style={{ backgroundColor: '#3A3A3A' }}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="h-5 w-32 bg-gray-600 rounded animate-pulse"></div>
                            <div className="h-8 w-16 bg-gray-600 rounded animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-gray-600 rounded animate-pulse"></div>
                            <div className="h-3 w-full bg-gray-600 rounded animate-pulse"></div>
                            <div className="h-3 w-2/3 bg-gray-600 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (!selectedReview) {
        return (
            <div className='px-6 min-h-screen' style={{ backgroundColor: '#181818' }}>
                <div className="flex flex-col mb-6">
                    <h1 className="text-4xl text-white">Review: {review_id}</h1>
                    <h4 className="text-md mt-1 text-white">Read all the information available on the review.</h4>
                </div>
                <div className="flex items-center justify-center h-64">
                    <div className="text-white text-lg">Review not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className='px-6 py-6 min-h-screen' style={{ backgroundColor: '#181818' }}>
            <ToastContainer position="bottom-center" hideProgressBar={false} theme="dark" transition={Slide} pauseOnFocusLoss draggable closeOnClick />
            <div className="flex flex-col mb-6">
                <h1 className="text-4xl text-white">Review: {review_id}</h1>
                <h4 className="text-md mt-1 text-white">Read all the information available on the review.</h4>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Review */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Review Card */}
                    <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#212121' }}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="text-yellow-400 text-2xl mb-2">
                                    {getRatingStars(selectedReview.rating)}
                                </div>
                                <p className="text-sm" style={{ color: '#A0A0A0' }}>{selectedReview.date}</p>
                            </div>
                            <div className={`px-4 py-2 rounded-full text-black font-semibold text-sm ${getSentimentColor(selectedReview.sentiment)}`}>
                                {selectedReview.sentiment}
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-white text-lg leading-relaxed">{selectedReview.text}</p>
                        </div>

                        <div className="flex items-center text-sm" style={{ color: '#A0A0A0' }}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {selectedReview.location}
                        </div>
                    </div>

                    {/* Suggested Reply Card */}
                    <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#212121' }}>
                        <div className="flex items-center mb-4">
                            <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-white">Suggested Reply</h3>
                        </div>
                        <div className="rounded-lg p-4" style={{ backgroundColor: '#3A3A3A' }}>
                            {isGenerating ? (
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-gray-600 rounded animate-pulse"></div>
                                    <div className="h-4 w-full bg-gray-600 rounded animate-pulse"></div>
                                    <div className="h-4 w-2/3 bg-gray-600 rounded animate-pulse"></div>
                                </div>
                            ) : (
                                <p className="text-white leading-relaxed">{selectedReview.suggested_reply}</p>
                            )}
                        </div>
                        <div className="mt-4 flex space-x-3 justify-between">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    navigator.clipboard.writeText(selectedReview.suggested_reply!);
                                    copiedToast();
                                }}
                                className="w-[45%] gap-2 bg-[#181818] border-none hover:bg-[#101010] hover:text-white transition-colors duration-300"
                                disabled={isGenerating || !selectedReview.suggested_reply}
                            >
                                <Copy className="h-3 w-3" />
                                Copy
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => { suggestReply(selectedReview.id) }}
                                className="w-[45%] gap-2 bg-[#181818] border-none hover:bg-white hover:text-black transition-colors duration-300"
                                disabled={isGenerating}
                            >
                                <PencilLine className="h-3 w-3" />
                                {isGenerating ? 'Generating...' : 'Suggest Response'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Similar Reviews */}
                <div className="space-y-6">
                    {loadingSimilar ? (
                        <SimilarReviewsSkeleton />
                    ) : (
                        <div className="rounded-lg p-6 shadow-lg" style={{ backgroundColor: '#212121' }}>
                            <h3 className="text-lg font-semibold text-white mb-4">Similar Reviews</h3>
                            {similarReviews.length === 0 ? (
                                <p className="text-gray-400 text-sm">No similar reviews found</p>
                            ) : (
                                <div className="space-y-4">
                                    {similarReviews.map((review) => (
                                        <div key={review.id} className="rounded-lg p-4" style={{ backgroundColor: '#3A3A3A' }}>
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="text-yellow-400 text-sm">
                                                    {getRatingStars(review.rating)}
                                                </div>
                                                <Link href={`/reviews/${review.id}`}>
                                                    <Button
                                                        size="sm"
                                                        className="h-8 gap-1 text-black border-none hover:bg-[#181818] hover:text-white transition-colors duration-300"
                                                        variant="outline"
                                                    >
                                                        <Eye className="h-3 w-3" />
                                                        View
                                                    </Button>
                                                </Link>
                                            </div>
                                            <p className="text-white text-sm leading-relaxed mb-2">
                                                {review.text.split(" ").slice(0, 30).join(" ")}
                                                {review.text.split(" ").length > 30 ? "..." : ""}
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xs" style={{ color: '#A0A0A0' }}>{review.date}</p>
                                                <div className={`px-2 py-1 rounded-full text-xs ${getSentimentColor(review.sentiment)}`}>
                                                    {review.sentiment}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default ReviewPage;