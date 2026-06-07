import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Brain,
  Layers,
  HelpCircle,
  GitBranch,
  MessageSquare,
  Zap,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Smart Notes',
    description: 'Generate exam notes, summaries, and bullet points automatically from any document.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Layers,
    title: 'Flashcard Generator',
    description: 'Create interactive flashcards with flip animations for effective spaced repetition.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: HelpCircle,
    title: 'MCQ Generator',
    description: 'Generate multiple choice questions with explanations for self-assessment.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: GitBranch,
    title: 'Mind Maps',
    description: 'Visualize complex topics with interactive, AI-generated mind maps.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Brain,
    title: 'Question Bank',
    description: 'Generate 2-mark, 5-mark, 10-mark, and viva questions for thorough preparation.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat',
    description: 'Ask questions about your notes and get instant, contextual answers.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'Convert any PDF, PPT, or video transcript to notes in under 30 seconds.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your documents are encrypted and never shared. Enterprise-grade security.',
    color: 'from-teal-500 to-cyan-500',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything You Need to{' '}
            <span className="gradient-text">Ace Your Exams</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            StudyAI provides a complete suite of AI-powered study tools to help you learn smarter, not harder.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dark-700"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
