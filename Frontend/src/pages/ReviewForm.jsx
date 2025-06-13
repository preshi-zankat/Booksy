import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createReview } from '../api/review.api';

function ReviewPage() {
  const { bookId } = useParams(); // from URL like /books/:bookId/review
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const [reviewTitle, setReviewTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [favoriteQuote, setFavoriteQuote] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [readingDifficulty, setReadingDifficulty] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const review = {
      bookId,
      userId,
      reviewTitle,
      content,
      rating,
      favoriteQuote,
      recommend,
      redingDifficulty: readingDifficulty,
    };

    try {
      await createReview(review);
      navigate(`/books/${bookId}`); // redirect to book detail
    } catch (err) {
      setError('Failed to submit review. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF1F3] py-20 px-4">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-pink-600 mb-6 hover:underline"
      >
        ← Back
      </button>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center font-lora text-gray-800">
          Write a Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Review title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <textarea
            placeholder="Your thoughts about the book"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="text"
            placeholder="Favorite quote (optional)"
            value={favoriteQuote}
            onChange={(e) => setFavoriteQuote(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <div>
            <label className="block mb-1 text-sm font-medium">Rating (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Reading Difficulty</label>
            <select
              value={readingDifficulty}
              onChange={(e) => setReadingDifficulty(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={recommend}
              onChange={(e) => setRecommend(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm">I would recommend this book to others</label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewPage;
