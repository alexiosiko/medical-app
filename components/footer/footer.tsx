import React from 'react';
import ColorBanner from '../ui/colorbanner';

export default function Footer() {
  return (
    <footer className="py-8 mt-24 text-primary-foreground relative">
		<ColorBanner />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Contact Information */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="font-bold mb-2">Contact Us</h5>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 1234 Example St, City, Country</p>
          </div>
          {/* Helpful Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="font-bold mb-2">Helpful Links</h5>
            <ul>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          {/* Social Media Links */}
          <div className="w-full md:w-1/3">
            <h5 className="font-bold mb-2">Follow Us</h5>
            <ul className="flex space-x-4">
              <li><a href="https://www.facebook.com" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="https://www.twitter.com" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="https://www.instagram.com" className="text-gray-400 hover:text-white">Instagram</a></li>
              <li><a href="https://www.linkedin.com" className="text-gray-400 hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-24 text-center">
          <p>&copy; {new Date().getFullYear()} Teladoc Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
