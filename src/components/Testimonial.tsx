import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const testimonials = [
  {
    id: 1,
    quote:
      'Velox completely transformed how we present our product online. The design is stunning, the performance is unmatched, and our conversion rates have never been higher.',
    name: 'Sarah Mitchell',
    role: 'Head of Marketing, Brightwave',
    avatar: '/images/testimonial-avatar.jpg',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'We launched our startup landing page in just two days. The components are polished, responsive, and incredibly easy to customize for our brand.',
    name: 'James Chen',
    role: 'Founder, TechNest',
    avatar: '/images/testimonial-avatar.jpg',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'The attention to detail is remarkable. Every section feels intentional, and our visitors consistently compliment how professional the site looks.',
    name: 'Elena Rodriguez',
    role: 'Creative Director, Pulse Studio',
    avatar: '/images/testimonial-avatar.jpg',
    rating: 5,
  },
];

export default function Testimonial() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const active = testimonials[current];

  return (
    <section id="reviews" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <ScrollReveal className="text-center">
          <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-brand-purple/10">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.avatar}
                alt={active.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center">
            <Quote className="h-8 w-8 text-brand-purple/20" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="mt-4">
                <p className="mx-auto max-w-2xl text-lg italic leading-relaxed text-gray-500 sm:text-xl">
                  "{active.quote}"
                </p>
              </blockquote>

              <div className="mt-6">
                <p className="text-base font-semibold text-brand-dark">{active.name}</p>
                <p className="text-sm text-brand-text">{active.role}</p>
              </div>

              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: active.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-brand-purple hover:text-brand-purple"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? 'w-6 bg-brand-purple'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-brand-purple hover:text-brand-purple"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
