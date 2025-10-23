import React from 'react';
import Image from 'next/image';
import { GraduationCap, MapPin } from 'lucide-react';
import { FaTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import DoctorSuggestion from './DoctorSuggestion';
import BookAppointment from './BookAppointment';

const STRAPI_BASE_URL = 'http://localhost:1337';

const DoctorDetails = ({ doctor }) => {
  const imageUrl = doctor?.Image?.[0]?.url
    ? `${STRAPI_BASE_URL}${doctor.Image[0].url}`
    : '/default-doctor.jpg';

  const socialLinks = {
    twitter: doctor?.social?.twitter || '#',
    linkedin: doctor?.social?.linkedin || '#',
    facebook: doctor?.social?.facebook || '#',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Doctor Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-1/3 min-h-[200px] md:min-h-[250px]">
            <Image
              src={imageUrl}
              alt={doctor?.Name || 'Doctor Image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-2/3 p-6 space-y-4 flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {doctor?.Name || 'Doctor Name'}
            </h2>
            <p className="text-sm text-blue-600 font-medium">
              {doctor?.categories?.Name || 'General Physician'}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GraduationCap className="w-5 h-5" />
              <span>{doctor?.Experience || 'Experience not available'}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{doctor?.Address || 'Location not available'}</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 mt-2 text-gray-700">
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <FaFacebookF className="w-5 h-5" />
              </a>
            </div>

         
            <BookAppointment doctor={doctor}/>
          </div>
        </div>

        {/* About Section */}
        {Array.isArray(doctor?.About) && doctor.About.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">About Me</h3>
            <div className="text-gray-600 space-y-2">
              {doctor.About.map((block, index) => (
                <p key={index}>
                  {block.children?.map((child, idx) => (
                    <span key={idx}>{child.text}</span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Suggestions */}
      <div>
        <DoctorSuggestion />
      </div>
    </div>
  );
};

export default DoctorDetails;
