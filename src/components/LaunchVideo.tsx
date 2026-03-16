"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LaunchVideo = () => {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://fast.wistia.net/player.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://fast.wistia.net/player.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-black mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          Watch How It Works
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <div className="wistia_responsive_padding" style={{ padding: '56.25% 0 0 0', position: 'relative', background: 'transparent' }}>
            <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%', background: 'transparent' }}>
              <iframe
                src="https://fast.wistia.net/embed/iframe/bv6pk5lq2w?web_component=true&seo=true"
                title="0223 Video"
                allow="autoplay; fullscreen"
                allowTransparency={true}
                frameBorder={0}
                scrolling="no"
                className="wistia_embed"
                name="wistia_embed"
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchVideo;
