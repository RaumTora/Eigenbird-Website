'use client'

import Script from 'next/script';
import { useEffect } from 'react';

type ContactFormVariant = 'desktop' | 'mobile';

interface ContactFormProps {
  variant?: ContactFormVariant;
}

export const ContactForm = ({ variant = 'desktop' }: ContactFormProps) => {
  // ensure embeds re-initialize on client navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Tally?.loadEmbeds) {
      (window as any).Tally.loadEmbeds();
    }
  }, []);

  const isMobile = variant === 'mobile';

  return (
    <div
      className={`w-full space-y-5 rounded-3xl border border-gray-800/60 bg-black/40 shadow-lg shadow-black/40 backdrop-blur ${
        isMobile ? 'p-4 max-w-xl mx-auto' : 'p-6 max-w-2xl md:-mt-4'
      }`}
    >
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => (window as any).Tally?.loadEmbeds()}
      />

      <div className="space-y-1">
        <p
          className={`text-white font-semibold leading-tight ${
            isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'
          }`}
        >
          Connect with us
        </p>
        <p className="text-gray-400 text-xs md:text-sm tracking-wide">We'd love to hear from you</p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-black/50 p-3 md:p-4">
        <iframe
          data-tally-src="https://tally.so/embed/PdpYDV?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height={isMobile ? 320 : 360}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Contact form"
          className="rounded-xl w-full"
        />
      </div>
    </div>
  );
};