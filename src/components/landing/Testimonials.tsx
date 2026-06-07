import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Medical Student',
    university: 'Johns Hopkins University',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    content: 'StudyAI has revolutionized how I prepare for exams. I uploaded my anatomy lectures and got comprehensive notes with all the key terms highlighted. Saved me hours of work!',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    role: 'Engineering Student',
    university: 'MIT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'The MCQ generator is incredible. It creates questions that are actually similar to what appears in my exams. The explanations help me understand concepts better.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Law Student',
    university: 'Harvard Law School',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Reading through hundreds of case files used to be overwhelming. Now I upload them to StudyAI and get concise summaries with key arguments highlighted.',
    rating: 5,
  },
  {
    name: 'Michael Park',
    role: 'Computer Science Student',
    university: 'Stanford University',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    content: 'The mind maps feature helped me visualize complex algorithms. Being able to chat with my notes and ask questions is a game-changer for understanding difficult concepts.',
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Business Student',
    university: 'Wharton School',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    content: 'I used to spend entire weekends converting lectures to notes. Now it takes minutes. The flashcard feature with spaced repetition helped me ace my finals.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'PhD Researcher',
    university: 'Cambridge University',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'As a researcher, I deal with hundreds of papers. StudyAI helps me extract key findings quickly. The semantic search across all my materials is invaluable.',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Loved by <span className="gradient-text">100,000+</span> Students
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            See what students from top universities are saying about StudyAI.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary-200 dark:text-primary-800 mb-4" />

              {/* Content */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-current"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role} • {testimonial.university}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
