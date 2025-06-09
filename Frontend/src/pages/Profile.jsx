import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';

function Profile() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState('Preshita');
  const [email, setEmail] = useState('preshita@example.com');
  const [bio, setBio] = useState('Web Developer | Adventurer');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated (not connected to backend)');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#FFF1F3] p-4'>
      <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-xl'>
        <h2 className='text-3xl font-bold text-center font-lora mb-6'>My Profile</h2>

        <div className='flex flex-col items-center'>
          <div className='relative w-32 h-32 mb-4'>
            <img
              src={preview || 'https://via.placeholder.com/150'}
              alt='Profile'
              className='w-full h-full rounded-full object-cover border-4 border-pink-300 shadow-md'
            />
            <label htmlFor='imageUpload' className='absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full cursor-pointer hover:bg-pink-600'>
              <FaCamera className='text-white' />
              <input
                id='imageUpload'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className='w-full space-y-4'>
            <input
              type='text'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300'
            />
            <input
              type='email'
              placeholder='Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300'
            />
            <textarea
              rows={4}
              placeholder='Write your bio...'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300'
            />
            <button
              type='submit'
              className='w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition'
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
 