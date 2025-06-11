import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { getBooks } from '../api/book.api';

function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedBooks();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF1F3] px-4 py-8 pt-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 font-lora text-gray-800">
        Featured Books
      </h2>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : books.length === 0 ? (
        <p className="text-center mt-10 text-lg text-gray-600">No featured books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pl-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedBooks;
