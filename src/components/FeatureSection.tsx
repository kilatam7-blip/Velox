import { useState } from 'react';
import { Check, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import VideoModal from './VideoModal';
import ScrollReveal from './ScrollReveal';

interface FeatureSectionProps {
  imageSrc: string;
  imageAlt: string;
  bulletPoints: string[];
  reversed?: boolean;
  id?: string;
}

export default function FeatureSection({
  imageSrc,
  imageAlt,
  bulletPoints,
  reversed = false,
  id,
}: FeatureSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section id={id} className="bg-brand-gray py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={`flex flex-col items-center gap-12 lg:flex-row lg:gap-16 ${
              reversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Side */}
            <ScrollReveal
              direction={reversed ? 'right' : 'left'}
              className="w-full lg:w-1/2"
            >
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/60">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </ScrollReveal>

            {/* Text Side */}
            <div className="w-full lg:w-1/2">
              <ScrollReveal direction={reversed ? 'left' : 'right'} delay={0.1}>
                <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
                  Designed for Startups & brands.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-brand-text">
                  From early-stage startups to established brands, our platform gives you the tools to move fast, look professional, and convert visitors into loyal customers.
                </p>
              </ScrollReveal>

              <ul className="mt-8 space-y-4">
                {bulletPoints.map((point, index) => (
                  <ScrollReveal
                    key={index}
                    direction={reversed ? 'left' : 'right'}
                    delay={0.2 + index * 0.1}
                  >
                    <li className="flex items-start gap-3">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple/10"
                      >
                        <Check className="h-3 w-3 text-brand-purple" strokeWidth={3} />
                      </motion.span>
                      <span className="text-sm leading-relaxed text-brand-text">{point}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>

              <ScrollReveal
                direction={reversed ? 'left' : 'right'}
                delay={0.5}
                className="mt-10"
              >
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="group inline-flex items-center gap-2 rounded-md bg-brand-purple px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand-purple/25 transition-all hover:bg-brand-purple-dark hover:shadow-brand-purple/40 hover:scale-105 active:scale-95"
                >
                  <Play size={16} className="fill-current" />
                  Watch Intro
                </button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  );
}
