import React from 'react';

function BookCard({ book }) {
  return (
    <div className="w-64 bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h3>
        <p className="text-xs text-gray-500 mb-1 truncate">by {book.author}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{book.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-pink-600 font-semibold text-sm">₹{book.price}</span>
          <button className="text-sm bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
