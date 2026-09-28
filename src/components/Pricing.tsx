import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for trying out the essentials.',
    features: ['1 landing page', 'Basic analytics', 'Email support', 'Community access'],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$29',
    description: 'Best for growing startups and teams.',
    features: ['Unlimited pages', 'Advanced analytics', 'Priority support', 'Custom domains', 'A/B testing'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large brands with custom needs.',
    features: ['Dedicated manager', 'SSO authentication', 'SLA guarantee', 'Custom integrations', 'White-label options'],
    highlighted: false,
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelect = (planName: string) => {
    setSelectedPlan(planName);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="bg-brand-gray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              Simple, transparent pricing.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-5 text-base text-brand-text">
              Choose a plan that fits your stage. Scale up whenever you are ready.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={0.2 + index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`relative rounded-2xl p-8 transition-all ${
                  plan.highlighted
                    ? 'bg-brand-purple text-white shadow-xl shadow-brand-purple/25'
                    : 'bg-white text-brand-dark shadow-md'
                } ${selectedPlan === plan.name ? 'ring-4 ring-brand-purple/30' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
                    <span className="flex items-center gap-1">
                      <Sparkles size={12} />
                      Popular
                    </span>
                  </div>
                )}

                <h3 className={`text-lg font-semibold ${plan.highlighted ? 'text-white' : 'text-brand-dark'}`}>
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-brand-dark'}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-2 text-sm ${plan.highlighted ? 'text-white/80' : 'text-brand-text'}`}>
                    /month
                  </span>
                </div>
                <p className={`mt-3 text-sm ${plan.highlighted ? 'text-white/80' : 'text-brand-text'}`}>
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className={`h-5 w-5 ${plan.highlighted ? 'text-white' : 'text-brand-purple'}`} />
                      <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-brand-text'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(plan.name)}
                  className={`mt-8 w-full rounded-md py-3 text-xs font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 ${
                    plan.highlighted
                      ? 'bg-white text-brand-purple hover:bg-gray-100'
                      : 'bg-brand-purple text-white hover:bg-brand-purple-dark'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
