'use client'

import Script from 'next/script';
import { useEffect } from 'react';

export const ContactForm = () => {
  // ensure embeds re-initialize on client navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Tally?.loadEmbeds) {
      (window as any).Tally.loadEmbeds();
    }
  }, []);

  return (
    <div className="w-full max-w-2xl space-y-6 rounded-3xl border border-gray-800/60 bg-black/40 p-6 shadow-lg shadow-black/40 backdrop-blur md:-mt-4">
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => (window as any).Tally?.loadEmbeds()}
      />

      <div className="space-y-2">
        <p className="text-white text-3xl md:text-4xl font-semibold leading-tight">Connect with us</p>
        <p className="text-gray-400 text-sm tracking-wide">We'd love to hear from you</p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-black/50 p-4">
        <iframe
          data-tally-src="https://tally.so/embed/PdpYDV?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="360"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Contact form"
          className="rounded-xl"
        />
      </div>
    </div>
  );
};