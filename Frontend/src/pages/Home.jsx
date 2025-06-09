import React from 'react';

function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 bg-[#FFF1F3] text-center'>
      <h1 className='text-3xl md:text-5xl font-bold leading-snugfont-lora'>
        Discover, Review & <br /> Share Your Favorite Books
      </h1> 
      <p className='mt-4 text-base md:text-lg text-gray-700'>
        Join our community of book lovers and explore a world of literature.
      </p>
      <div className='mt-8'>
        <a href='/featured-books'  className='px-6 py-3 bg-[#FF8A80] text-white rounded-lg hover:bg-[#ff6f61] transition duration-300'>
          Get Started
        </a>
      </div>
    </div>
  );
}

export default Home;
