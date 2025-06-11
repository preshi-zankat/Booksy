import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../api/book.api';

function BookDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.data.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading book...</div>;
  }

  if (!book) {
    return <div className="text-center mt-10">Book not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF1F3] px-6 py-10 pt-24">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-pink-600 mb-6 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 md:flex md:gap-8">
        <img
          src={book.image}
          alt={book.title}
          className="w-full md:w-64 h-80 object-cover rounded-md mb-4 md:mb-0"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
          <p className="text-sm text-gray-500 mb-1">by {book.author}</p>
          <p className="text-pink-600 text-xl font-semibold mb-4">₹{book.price}</p>
            <div className="flex items-center mb-4">
                <span className="text-sm text-gray-600 mr-2">Genre:</span>
                <span className="text-sm text-gray-800">{book.genre}</span>
            </div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">{book.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
