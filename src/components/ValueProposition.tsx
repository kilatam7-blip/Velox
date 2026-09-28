import { motion } from 'framer-motion';
import { Smartphone, Lock, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description:
      'Every interaction is crafted to feel natural and responsive across all screen sizes.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description:
      'Your data stays protected with advanced encryption and secure infrastructure by default.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Reliability',
    description:
      'Built on robust architecture that keeps your platform fast, stable, and always available.',
  },
];

export default function ValueProposition() {
  return (
    <section id="services" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              The fastest way to launch and scale your digital product.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-brand-text sm:text-lg">
              We combine beautiful design with powerful performance so you can focus on what matters most — growing your business.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={0.2 + index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="rounded-2xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple/10"
                >
                  <feature.icon className="h-7 w-7 text-brand-purple" strokeWidth={1.8} />
                </motion.div>
                <h3 className="mt-6 text-lg font-semibold text-brand-dark">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-text">
                  {feature.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
