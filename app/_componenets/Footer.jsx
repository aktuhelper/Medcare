import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Logo */}
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={50}
          className="mx-auto mb-6"
        />

        {/* Description */}
        <p className="mx-auto max-w-md text-center leading-relaxed text-gray-400">
         Medcare is your trusted partner in health, providing top-notch medical services and compassionate care for a healthier tomorrow.
        </p>

        {/* Navigation Links */}
        <ul className="mt-10 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {['About', 'Careers', 'History', 'Services', 'Projects', 'Blog'].map((link, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="transition hover:text-white font-medium"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

       

        {/* Footer Bottom */}
        <p className="mt-12 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Medcare. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
