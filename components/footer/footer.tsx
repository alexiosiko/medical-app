import React from 'react';
import ColorBanner from '../ui/colorbanner';

export default function Footer() {
  return (
    <footer className=" overflow-x-hidden py-8 max-md:text-center mt-24 text-primary relative">
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
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          {/* Social Media Links */}
          <div className="w-full md:w-1/3">
            <h5 className="font-bold mb-2">Follow Us</h5>
            <ul className="flex space-x-4">
              <li><a href="https://www.facebook.com" className="hover:text-white">Facebook</a></li>
              <li><a href="https://www.twitter.com" className="hover:text-white">Twitter</a></li>
              <li><a href="https://www.instagram.com" className="hover:text-white">Instagram</a></li>
              <li><a href="https://www.linkedin.com" className="hover:text-white">LinkedIn</a></li>
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
