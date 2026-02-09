import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { howToGuides } from '@/data/howToGuides';
import HowToCard from './HowToCard';

const HowToSection = () => {
  return (
    <section className="py-12 border-t border-border/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <Wrench className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Setup Guides</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">How To:</span>{' '}
            <span className="text-foreground">Run AI Locally</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guides to set up the most popular AI tools on your local machine. 
            From LLMs to image generation - everything you need to get started.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {howToGuides.map((guide, index) => (
            <HowToCard key={guide.id} guide={guide} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
