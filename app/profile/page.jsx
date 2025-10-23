'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

async function uploadImageToStrapi(file) {
  const formData = new FormData();
  formData.append('files', file);

  // Do NOT set Content-Type header manually, axios will do it
  const response = await axiosClient.post('/upload', formData);
  // Returns an array of uploaded files, take the first
  return response.data[0];
}

async function updateUserProfilePic(userId, imageId) {
  // Adjust endpoint & data structure according to your Strapi user model
  const data = {
    data: {
      profile_pic: imageId, // Assuming profile_pic is a media relation field
    },
  };
  return axiosClient.put(`/users/${userId}`, data);
}

export default function ProfilePage() {
  const { user, isLoading: userLoading } = useKindeBrowserClient();
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputFileRef = useRef();

  useEffect(() => {
    if (user?.picture) {
      setProfilePic(user.picture);
    }
  }, [user]);

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-xl">Loading user info...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-xl">No user data found. Please log in.</p>
      </div>
    );
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Show preview locally
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);

    setUploading(true);

    try {
      // Upload file to Strapi media library
      const uploadedFile = await uploadImageToStrapi(file);

      // Update user's profile_pic with uploaded image ID
      await updateUserProfilePic(user.id, uploadedFile.id);

      alert('Profile picture updated successfully!');
      // Optionally refresh user info here
    } catch (error) {
      console.error('Upload failed:', error.response || error.message);
      alert('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Your Profile</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center max-w-3xl w-full space-y-6 md:space-y-0 md:space-x-10">
        {/* Profile Picture Section */}
        <div className="relative">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
            {profilePic ? (
              <Image
                src={profilePic}
                alt={`${user.given_name} ${user.family_name}`}
                width={160}
                height={160}
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-600">
                No Image
              </div>
            )}
          </div>

          <button
            onClick={() => inputFileRef.current.click()}
            disabled={uploading}
            className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-md transition disabled:opacity-50"
            title="Change profile picture"
            aria-label="Change profile picture"
          >
            ✏️
          </button>

          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* User Info Section */}
        <div className="flex flex-col space-y-4 flex-1">
          <h2 className="text-3xl font-semibold text-gray-900">
            {user.given_name} {user.family_name}
          </h2>
          <p className="text-gray-700 text-lg">{user.email}</p>
          <p className="text-gray-500 text-sm select-text">ID: {user.id}</p>

          {uploading && (
            <p className="text-indigo-600 font-medium animate-pulse">Uploading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
