import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What file formats does StudyAI support?',
    answer: 'StudyAI supports PDF, PPTX, DOCX, TXT, JPG, and PNG files. You can also paste text directly or import YouTube transcripts. We are continuously adding support for more formats.',
  },
  {
    question: 'How accurate are the AI-generated notes?',
    answer: 'Our AI achieves 95%+ accuracy in extracting key concepts and generating notes. We use state-of-the-art language models (GPT-4 and Gemini) and implement RAG (Retrieval Augmented Generation) for contextually relevant content.',
  },
  {
    question: 'Can I use StudyAI for any subject?',
    answer: 'Yes! StudyAI works great for any subject - from STEM fields like medicine, engineering, and computer science to humanities like law, business, and literature. Our AI adapts to the content of your materials.',
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Absolutely. We use enterprise-grade encryption (AES-256) for all data at rest and in transit. Your documents are never shared or used to train our models. You can delete your data at any time.',
  },
  {
    question: 'What\'s the difference between Free and Pro?',
    answer: 'The Free plan includes 5 uploads per month with basic note generation. Pro unlocks unlimited uploads, all note formats (including mind maps and question banks), AI chat, semantic search, and priority support.',
  },
  {
    question: 'Can I collaborate with my study group?',
    answer: 'Yes! Our Team plan includes shared workspaces where you can collaborate with classmates, share notes, and track group progress. Perfect for study groups and institutions.',
  },
  {
    question: 'How does the AI Chat feature work?',
    answer: 'AI Chat uses RAG (Retrieval Augmented Generation) to answer questions about your uploaded materials. You can ask things like "Explain Chapter 3" or "What are the key formulas?" and get accurate, contextual answers.',
  },
  {
    question: 'Can I export my notes?',
    answer: 'Pro users can export notes, flashcards, and other content to PDF, DOCX, and Markdown formats. Mind maps can be exported as PNG images.',
  },
  {
    question: 'Do you offer student discounts?',
    answer: 'Yes! We offer 50% off for students with a valid .edu email address. Contact our support team with your student email to claim your discount.',
  },
  {
    question: 'What if I\'m not satisfied?',
    answer: 'We offer a 14-day money-back guarantee, no questions asked. If StudyAI doesn\'t meet your expectations, we\'ll refund your payment in full.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about StudyAI.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === index 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-500'
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
