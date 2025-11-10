import React from 'react';

export const Footer = () => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-12 md:p-16">
      <div className="max-w-4xl w-full bg-black/20 backdrop-blur-md rounded-lg p-8">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12">
          Let's Create Something
          <br />
          <span className="text-gray-500">Together</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-gray-500 text-sm tracking-widest mb-4">CONTACT</h3>
            <a 
              href="mailto:hello@eigenbird.com" 
              className="text-xl md:text-2xl text-white hover:text-gray-300 transition-colors"
            >
              hello@eigenbird.com
            </a>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm tracking-widest mb-4">SOCIAL</h3>
            <div className="space-y-2">
              <a 
                href="https://github.com/eigenbird" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-white hover:text-gray-300 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://twitter.com/eigenbird" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-white hover:text-gray-300 transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://linkedin.com/company/eigenbird" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-white hover:text-gray-300 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Eigenbird. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};