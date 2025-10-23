import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          
          {/* Left Side - Text */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl leading-snug">
              Find & Book <span className="text-purple-600">Appointments</span> With Top <span className="text-purple-600">Doctors</span>
            </h2>

            <p className="text-gray-700 text-base leading-relaxed">
              Book appointments with top doctors and healthcare professionals at your convenience. 
              Our platform connects you with trusted medical experts for personalized care and support, 
              and provides access to a wide range of healthcare services, including virtual consultations, 
              prescription refills, and health monitoring.
            </p>

            <div>
              <Button className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-6 py-2 rounded-lg cursor-pointer transition duration-300">
                Explore Now
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/med.jpg"
              alt="Hero image"
              width={500}
              height={400}
              className="rounded-2xl shadow-md object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
