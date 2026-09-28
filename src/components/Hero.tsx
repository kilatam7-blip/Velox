import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';
import VideoModal from './VideoModal';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-cyclist.jpg"
            alt="Cyclist speeding through city"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20 text-center lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Meet Velox, the visionary landing Page.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl"
          >
            Build momentum for your brand with a sleek, high-converting experience.
            Designed for speed, clarity, and growth in the modern digital landscape.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group inline-flex items-center gap-2 rounded-md bg-brand-purple px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand-purple/30 transition-all hover:bg-brand-purple-dark hover:shadow-brand-purple/40 hover:scale-105 active:scale-95"
            >
              <Play size={16} className="fill-current" />
              Watch Intro
            </button>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Get Started
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce cursor-pointer"
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.a>
      </section>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  );
}
