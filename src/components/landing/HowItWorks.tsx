import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Wand2, BookOpen, GraduationCap } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Your Material',
    description: 'Drag and drop PDFs, PPTs, DOCXs, images, or paste text and YouTube links.',
  },
  {
    icon: Wand2,
    number: '02',
    title: 'AI Processes Content',
    description: 'Our AI extracts key concepts, identifies important topics, and structures the information.',
  },
  {
    icon: BookOpen,
    number: '03',
    title: 'Choose Output Format',
    description: 'Select from notes, flashcards, MCQs, mind maps, or question banks.',
  },
  {
    icon: GraduationCap,
    number: '04',
    title: 'Study Smarter',
    description: 'Use your AI-generated materials to study efficiently and ace your exams.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-400 text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            From Upload to{' '}
            <span className="gradient-text">Study-Ready</span> in Minutes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Our streamlined process makes converting any material into study notes effortless.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transform -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="relative bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700 text-center">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mt-4 mb-5">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
