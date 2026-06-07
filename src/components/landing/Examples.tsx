import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Layers, HelpCircle, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';

const examples = [
  {
    id: 'notes',
    icon: FileText,
    title: 'AI Generated Notes',
    type: 'Exam Notes',
    content: {
      title: 'Chapter 5: Photosynthesis',
      points: [
        '**Definition**: Process by which plants convert light energy into chemical energy',
        '**Key Formula**: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
        '**Light Reactions**: Occur in thylakoid membranes, produce ATP and NADPH',
        '**Calvin Cycle**: Carbon fixation, reduction, regeneration of RuBP',
        '**Important Factors**: Light intensity, CO₂ concentration, temperature',
        '**Applications**: Agriculture, biofuel production, climate science',
      ],
    },
  },
  {
    id: 'flashcards',
    icon: Layers,
    title: 'Flashcards',
    type: 'Study Cards',
    content: {
      question: 'What is the primary pigment involved in photosynthesis?',
      answer: 'Chlorophyll a is the primary pigment. It absorbs red and blue light while reflecting green, giving plants their characteristic color. It is found in the thylakoid membranes of chloroplasts.',
    },
  },
  {
    id: 'mcqs',
    icon: HelpCircle,
    title: 'MCQs',
    type: 'Practice Questions',
    content: {
      question: 'Which of the following is NOT a product of the light-dependent reactions?',
      options: ['ATP', 'NADPH', 'Glucose', 'Oxygen'],
      correct: 2,
      explanation: 'Glucose is produced in the light-independent reactions (Calvin Cycle), not in the light-dependent reactions. The light reactions produce ATP, NADPH, and oxygen.',
    },
  },
  {
    id: 'mindmap',
    icon: GitBranch,
    title: 'Mind Map',
    type: 'Visual Summary',
    content: {
      center: 'Photosynthesis',
      branches: [
        { label: 'Light Reactions', sub: ['Thylakoid', 'ATP', 'NADPH', 'O₂'] },
        { label: 'Calvin Cycle', sub: ['Stroma', 'CO₂ Fixation', 'Glucose'] },
        { label: 'Factors', sub: ['Light', 'Temperature', 'CO₂'] },
      ],
    },
  },
];

export const Examples: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const activeExample = examples[activeIndex];

  const nextExample = () => {
    setActiveIndex((prev) => (prev + 1) % examples.length);
    setIsFlipped(false);
    setSelectedOption(null);
  };

  const prevExample = () => {
    setActiveIndex((prev) => (prev - 1 + examples.length) % examples.length);
    setIsFlipped(false);
    setSelectedOption(null);
  };

  return (
    <section id="examples" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 text-sm font-medium mb-4">
            Examples
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            See AI Notes in{' '}
            <span className="gradient-text">Action</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Interactive examples of what StudyAI can generate from your study materials.
          </p>
        </motion.div>

        {/* Example Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {examples.map((example, index) => (
            <button
              key={example.id}
              onClick={() => {
                setActiveIndex(index);
                setIsFlipped(false);
                setSelectedOption(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeIndex === index
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              <example.icon className="w-4 h-4" />
              {example.title}
            </button>
          ))}
        </div>

        {/* Example Content */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExample.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-700 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-dark-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <activeExample.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {activeExample.title}
                    </h3>
                    <p className="text-sm text-gray-500">{activeExample.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevExample}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                  </button>
                  <button
                    onClick={nextExample}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeExample.id === 'notes' && 'points' in activeExample.content && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {activeExample.content.title}
                    </h4>
                    <ul className="space-y-3">
                      {activeExample.content.points?.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <span className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xs font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary-600 dark:text-primary-400">$1</strong>') }} />
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeExample.id === 'flashcards' && (
                  <div
                    className="flip-card cursor-pointer"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div
                      className={`flip-card-inner relative h-64 ${isFlipped ? 'flipped' : ''}`}
                      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s' }}
                    >
                      {/* Front */}
                      <div
                        className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl text-white"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="text-center">
                          <p className="text-sm opacity-70 mb-2">Click to flip</p>
                          <p className="text-xl font-medium">
                            {activeExample.content.question}
                          </p>
                        </div>
                      </div>
                      {/* Back */}
                      <div
                        className="absolute inset-0 flex items-center justify-center p-6 bg-white dark:bg-dark-700 rounded-xl border-2 border-primary-500"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-2">Answer</p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {activeExample.content.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeExample.id === 'mcqs' && 'options' in activeExample.content && (
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                      {activeExample.content.question}
                    </p>
                    <div className="space-y-3 mb-6">
                      {activeExample.content.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedOption(index)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            selectedOption === null
                              ? 'border-gray-200 dark:border-dark-600 hover:border-primary-500'
                              : selectedOption === index
                              ? index === activeExample.content.correct
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : index === activeExample.content.correct
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-dark-600 opacity-50'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-sm font-medium">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{option}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                    {selectedOption !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      >
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
                          Explanation
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          {activeExample.content.explanation}
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}

                {activeExample.id === 'mindmap' && 'branches' in activeExample.content && (
                  <div className="flex flex-col items-center">
                    {/* Center Node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-32 h-32 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-center shadow-lg mb-8"
                    >
                      {activeExample.content.center}
                    </motion.div>

                    {/* Branches */}
                    <div className="grid grid-cols-3 gap-6 w-full">
                      {activeExample.content.branches?.map((branch, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="text-center"
                        >
                          <div className="w-full py-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold mb-3">
                            {branch.label}
                          </div>
                          <div className="space-y-2">
                            {branch.sub.map((item, subIndex) => (
                              <div
                                key={subIndex}
                                className="py-2 px-3 rounded-lg bg-gray-100 dark:bg-dark-700 text-sm text-gray-700 dark:text-gray-300"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
