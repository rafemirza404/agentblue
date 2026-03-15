"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LaunchVideo = () => {
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
          className="rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <video
            className="w-full aspect-video"
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            src="/videos/0223.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchVideo;
