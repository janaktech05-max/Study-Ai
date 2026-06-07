import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, FileText, Presentation, Video, Image, Sparkles, Zap } from 'lucide-react';
import { Button } from '../ui';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const fileTypes = [
    { icon: FileText, label: 'PDF', color: 'from-red-500 to-orange-500' },
    { icon: Presentation, label: 'PPT', color: 'from-orange-500 to-amber-500' },
    { icon: Video, label: 'YouTube', color: 'from-red-500 to-red-600' },
    { icon: Image, label: 'Images', color: 'from-blue-500 to-cyan-500' },
  ];

  const stats = [
    { value: '100K+', label: 'Students' },
    { value: '2M+', label: 'Notes Generated' },
    { value: '4.9', label: 'Rating' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Powered by GPT-4 & Gemini
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="text-gray-900 dark:text-white">Turn Any Study Material Into </span>
              <span className="gradient-text">Smart Notes</span>
              <span className="text-gray-900 dark:text-white"> in Seconds</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Upload PDFs, PPTs, lectures, or videos and generate AI-powered notes, flashcards, MCQs, and mind maps instantly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                variant="gradient"
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={onGetStarted}
              >
                Start Free
              </Button>
              <Button
                variant="outline"
                size="xl"
                leftIcon={<Play className="w-5 h-5" />}
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-white dark:bg-dark-800 rounded-3xl shadow-2xl p-6 border border-gray-100 dark:border-dark-700">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-200 dark:border-dark-600 rounded-2xl p-8 text-center mb-6 hover:border-primary-500 transition-colors cursor-pointer">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center"
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drop your files here or click to upload
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {fileTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${type.color} text-white text-sm`}
                    >
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Generated Notes Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Generated Notes
                  </span>
                  <span className="text-xs text-primary-500">Just now</span>
                </div>
                {['📝 Exam Notes', '💡 Flashcards (24)', '❓ MCQs (10)'].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.15 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-xl"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium"
            >
              ✨ AI Processing
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-800 px-4 py-3 rounded-xl shadow-lg border border-gray-100 dark:border-dark-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                  98
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Accuracy Score</p>
                  <p className="text-xs text-gray-500">Based on AI analysis</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
