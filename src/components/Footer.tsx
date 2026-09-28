import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { sanitizeInput, isValidEmail } from '../utils/security';
import { nhost } from '../utils/nhost';

interface FormState {
  email: string;
  name: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });
  const [lastNewsletterSubmit, setLastNewsletterSubmit] = useState(0);

  const [contactForm, setContactForm] = useState<FormState>({
    email: '',
    name: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });
  const [lastContactSubmit, setLastContactSubmit] = useState(0);

  const RATE_LIMIT_MS = 10000; // 10 seconds

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastNewsletterSubmit < RATE_LIMIT_MS) {
      setNewsletterStatus({
        type: 'error',
        message: 'Please wait a moment before subscribing again.',
      });
      return;
    }

    const sanitizedEmail = sanitizeInput(newsletterEmail);

    if (!sanitizedEmail) {
      setNewsletterStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }
    if (!isValidEmail(sanitizedEmail)) {
      setNewsletterStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!nhost) {
      setNewsletterStatus({ type: 'error', message: 'Nhost is not configured yet.' });
      return;
    }

    setLastNewsletterSubmit(now);
    setNewsletterStatus({ type: 'loading', message: 'Subscribing...' });

    try {
      await nhost.graphql.request({
        query: `
          mutation SubscribeNewsletter($email: String!) {
            insert_newsletter_subscriptions(objects: [{ email: $email }]) {
              affected_rows
            }
          }
        `,
        variables: { email: sanitizedEmail },
      });

      setNewsletterStatus({
        type: 'success',
        message: 'Thank you for subscribing! We will keep you updated.',
      });
      setNewsletterEmail('');

      setTimeout(() => {
        setNewsletterStatus({ type: 'idle', message: '' });
      }, 5000);
    } catch {
      setNewsletterStatus({
        type: 'error',
        message: 'Unable to subscribe right now. Please try again later.',
      });
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastContactSubmit < RATE_LIMIT_MS) {
      setContactStatus({
        type: 'error',
        message: 'Please wait a moment before sending another message.',
      });
      return;
    }

    const sanitizedData = {
      name: sanitizeInput(contactForm.name),
      email: sanitizeInput(contactForm.email),
      message: sanitizeInput(contactForm.message),
    };

    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      setContactStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }
    if (!isValidEmail(sanitizedData.email)) {
      setContactStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!nhost) {
      setContactStatus({ type: 'error', message: 'Nhost is not configured yet.' });
      return;
    }

    setLastContactSubmit(now);
    setContactStatus({ type: 'loading', message: 'Sending message...' });

    try {
      await nhost.graphql.request({
        query: `
          mutation CreateContactMessage($name: String!, $email: String!, $message: String!) {
            insert_contact_messages(
              objects: [{ name: $name, email: $email, message: $message }]
            ) {
              affected_rows
            }
          }
        `,
        variables: sanitizedData,
      });

      setContactStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.',
      });
      setContactForm({ email: '', name: '', message: '' });

      setTimeout(() => {
        setContactStatus({ type: 'idle', message: '' });
      }, 5000);
    } catch {
      setContactStatus({
        type: 'error',
        message: 'Unable to send your message right now. Please try again later.',
      });
    }
  };

  return (
    <footer id="contact" className="bg-brand-dark py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Info */}
          <ScrollReveal direction="left">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple">
                    <span className="text-xl font-bold text-white">V</span>
                  </div>
                  <span className="text-lg font-bold">Velox</span>
                </div>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
                  A visionary landing page crafted for startups and brands ready to move fast and make an impact.
                </p>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider">Get in Touch</h4>
                <ul className="mt-5 space-y-4 text-sm text-gray-400">
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-brand-purple" />
                    hello@velox.design
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-brand-purple" />
                    +1 (555) 123-4567
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-brand-purple" />
                    123 Innovation Street, San Francisco, CA
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="sm:col-span-2 lg:col-span-1">
                <h4 className="text-sm font-semibold uppercase tracking-wider">Stay Updated</h4>
                <p className="mt-3 text-sm text-gray-400">
                  Get the latest news and updates directly to your inbox.
                </p>
                <form className="mt-4" onSubmit={handleNewsletterSubmit}>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus.type === 'error') {
                          setNewsletterStatus({ type: 'idle', message: '' });
                        }
                      }}
                      placeholder="Enter your email"
                      maxLength={254}
                      autoComplete="email"
                      className="w-full rounded-md bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:bg-white/15"
                    />
                    <button
                      type="submit"
                      disabled={newsletterStatus.type === 'loading'}
                      aria-busy={newsletterStatus.type === 'loading'}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-purple px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-brand-purple-dark active:scale-95"
                    >
                      <Send size={14} />
                      Subscribe
                    </button>
                  </div>
                  <AnimatePresence mode="wait">
                    {newsletterStatus.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mt-3 flex items-center gap-2 text-sm ${
                          newsletterStatus.type === 'success'
                            ? 'text-green-400'
                            : newsletterStatus.type === 'loading'
                              ? 'text-gray-400'
                              : 'text-red-400'
                        }`}
                      >
                        {newsletterStatus.type === 'success' ? (
                          <CheckCircle size={16} />
                        ) : newsletterStatus.type === 'loading' ? null : (
                          <AlertCircle size={16} />
                        )}
                        {newsletterStatus.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Contact Form */}
          <ScrollReveal direction="right">
            <div className="rounded-2xl bg-white/5 p-6 sm:p-8">
              <h4 className="text-lg font-semibold">Send us a message</h4>
              <p className="mt-2 text-sm text-gray-400">
                Have a project in mind? Let us know and we will respond within 24 hours.
              </p>

              <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => {
                        setContactForm({ ...contactForm, name: e.target.value });
                        if (contactStatus.type === 'error') {
                          setContactStatus({ type: 'idle', message: '' });
                        }
                      }}
                      placeholder="Your name"
                      maxLength={100}
                      autoComplete="name"
                      className="mt-1.5 w-full rounded-md bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:bg-white/15"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => {
                        setContactForm({ ...contactForm, email: e.target.value });
                        if (contactStatus.type === 'error') {
                          setContactStatus({ type: 'idle', message: '' });
                        }
                      }}
                      placeholder="your@email.com"
                      maxLength={254}
                      autoComplete="email"
                      className="mt-1.5 w-full rounded-md bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:bg-white/15"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => {
                      setContactForm({ ...contactForm, message: e.target.value });
                      if (contactStatus.type === 'error') {
                        setContactStatus({ type: 'idle', message: '' });
                      }
                    }}
                    placeholder="Tell us about your project..."
                    maxLength={1000}
                    className="mt-1.5 w-full resize-none rounded-md bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:bg-white/15"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactStatus.type === 'loading'}
                  aria-busy={contactStatus.type === 'loading'}
                  className="w-full rounded-md bg-brand-purple py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-brand-purple-dark active:scale-95"
                >
                  Send Message
                </button>

                <AnimatePresence mode="wait">
                  {contactStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-center gap-2 text-sm ${
                        contactStatus.type === 'success'
                          ? 'text-green-400'
                          : contactStatus.type === 'loading'
                            ? 'text-gray-400'
                            : 'text-red-400'
                      }`}
                    >
                      {contactStatus.type === 'success' ? (
                        <CheckCircle size={16} />
                      ) : contactStatus.type === 'loading' ? null : (
                        <AlertCircle size={16} />
                      )}
                      {contactStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Velox. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
