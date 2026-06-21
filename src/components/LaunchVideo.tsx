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
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="mb-10 text-center md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <span className="mb-3 block text-sm font-semibold text-[#4F7CFF]">
            See it in action
          </span>
          <h2 className="text-3xl tracking-tight text-black md:text-[2.5rem]">
            Watch how it works
          </h2>
        </motion.div>

        {/* Video, no frame/border */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <div className="overflow-hidden rounded-2xl shadow-[0_18px_44px_-24px_rgba(20,20,40,0.25)]">
            <div
              className="wistia_responsive_padding"
              style={{ padding: "56.25% 0 0 0", position: "relative", background: "transparent" }}
            >
              <div
                className="wistia_responsive_wrapper"
                style={{ height: "100%", left: 0, position: "absolute", top: 0, width: "100%", background: "transparent" }}
              >
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
                  style={{ border: "none", display: "block" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchVideo;
