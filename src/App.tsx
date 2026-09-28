import Header from './components/Header';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import FeatureSection from './components/FeatureSection';
import Testimonial from './components/Testimonial';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import SecurityInit from './components/SecurityInit';

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <SecurityInit />
      <Header />
      <main>
        <Hero />
        <ValueProposition />
        <FeatureSection
          id="features"
          imageSrc="/images/dashboard-mockup-1.jpg"
          imageAlt="Analytics dashboard on laptop"
          bulletPoints={[
            'Lightning-fast page loads that keep visitors engaged from the first click.',
            'Clean, conversion-focused layouts built with real user behavior in mind.',
            'Seamless integrations with the tools your team already uses every day.',
          ]}
        />
        <FeatureSection
          imageSrc="/images/dashboard-mockup-2.jpg"
          imageAlt="Project management dashboard on laptop"
          bulletPoints={[
            'Intuitive dashboards that turn complex data into clear next steps.',
            'Scalable architecture that grows alongside your business ambitions.',
            'Dedicated support to help you launch, optimize, and win.',
          ]}
          reversed
        />
        <Testimonial />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
