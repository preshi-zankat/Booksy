import React from 'react'

function ReviewCard({review}) {
  return (
    <div>
        <div className='flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4'>
            <h3 className='text-lg font-bold text-gray-800'>{review.title}</h3>
            <p className='text-sm text-gray-600'>{review.content}</p>
            <p className='text-sm text-gray-600'>Rating: {review.rating}</p>
            <p className='text-sm text-gray-600'>Favorite Quote: {review.favoriteQuote}</p>
            <p className='text-sm text-gray-600'>Recommend: {review.recommend ? 'Yes' : 'No'}</p>
            <p className='text-sm text-gray-600'>Reading Difficulty: {review.readingDifficulty}</p>
        </div>
    </div>
  ) 
}

export default ReviewCard