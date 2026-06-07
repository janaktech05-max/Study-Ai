import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Sparkles,
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  
} from 'lucide-react';
import { Card, CardContent, Button, Badge, Progress } from '../ui';
import { useStore, MCQ } from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';

const sampleMCQs: Omit<MCQ, 'id' | 'uploadId' | 'createdAt' | 'userAnswer'>[] = [
  {
    question: 'Which organelle is the site of photosynthesis in plant cells?',
    options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Golgi apparatus'],
    correctAnswer: 1,
    explanation: 'Chloroplasts are the organelles that contain chlorophyll and are responsible for photosynthesis. They are found in the cells of plants and algae.',
  },
  {
    question: 'What is the primary pigment involved in capturing light energy during photosynthesis?',
    options: ['Carotene', 'Xanthophyll', 'Chlorophyll a', 'Chlorophyll b'],
    correctAnswer: 2,
    explanation: 'Chlorophyll a is the primary pigment that directly participates in the light reactions. It absorbs red and blue light most effectively.',
  },
  {
    question: 'The Calvin cycle takes place in which part of the chloroplast?',
    options: ['Thylakoid membrane', 'Grana', 'Stroma', 'Inner membrane'],
    correctAnswer: 2,
    explanation: 'The Calvin cycle (light-independent reactions) occurs in the stroma, the fluid-filled region surrounding the thylakoids.',
  },
  {
    question: 'What is the byproduct of photosynthesis that is released into the atmosphere?',
    options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'],
    correctAnswer: 2,
    explanation: 'Oxygen is released as a byproduct when water molecules are split during the light-dependent reactions (photolysis).',
  },
  {
    question: 'Which enzyme catalyzes the first step of carbon fixation in the Calvin cycle?',
    options: ['ATP synthase', 'RuBisCO', 'Helicase', 'DNA polymerase'],
    correctAnswer: 1,
    explanation: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase) is the enzyme that catalyzes the fixation of CO₂ to RuBP.',
  },
  {
    question: 'What are the products of the light-dependent reactions?',
    options: [
      'Glucose and CO₂',
      'ATP, NADPH, and O₂',
      'ADP and NADP+',
      'Water and glucose',
    ],
    correctAnswer: 1,
    explanation: 'The light-dependent reactions produce ATP (energy), NADPH (electron carrier), and O₂ (from water splitting).',
  },
  {
    question: 'At which light intensity does the rate of photosynthesis equal the rate of respiration?',
    options: ['Saturation point', 'Compensation point', 'Limiting point', 'Maximum point'],
    correctAnswer: 1,
    explanation: 'At the compensation point, the amount of CO₂ released by respiration equals the amount consumed by photosynthesis.',
  },
  {
    question: 'Which wavelengths of light are most effectively absorbed by chlorophyll?',
    options: ['Green and yellow', 'Red and blue', 'Orange and violet', 'All wavelengths equally'],
    correctAnswer: 1,
    explanation: 'Chlorophyll absorbs red (around 680nm) and blue (around 450nm) light most effectively. Green light is mostly reflected, which is why plants appear green.',
  },
  {
    question: 'What is the role of water in photosynthesis?',
    options: [
      'It is a product of the reaction',
      'It provides electrons and hydrogen ions',
      'It is used to store glucose',
      'It catalyzes enzyme reactions',
    ],
    correctAnswer: 1,
    explanation: 'Water is split during the light reactions to provide electrons for the electron transport chain and hydrogen ions for ATP synthesis. Oxygen is released as a byproduct.',
  },
  {
    question: 'Which factor is NOT a limiting factor for photosynthesis?',
    options: ['Light intensity', 'CO₂ concentration', 'Nitrogen concentration', 'Temperature'],
    correctAnswer: 2,
    explanation: 'While nitrogen is important for plant growth (for making proteins), it is not a direct limiting factor for the photosynthesis reaction itself.',
  },
];

const mcqCounts = [
  { value: 10, label: '10 MCQs', description: 'Quick practice' },
  { value: 25, label: '25 MCQs', description: 'Standard test' },
  { value: 50, label: '50 MCQs', description: 'Full exam prep' },
];

export const MCQPage: React.FC = () => {
  const { mcqs, addMCQs, updateMCQ } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCount, setSelectedCount] = useState(10);
  const [quizMode, setQuizMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizMCQs, setQuizMCQs] = useState<MCQ[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newMCQs = sampleMCQs.slice(0, selectedCount).map((mcq) => ({
        ...mcq,
        id: uuidv4(),
        uploadId: 'sample',
        createdAt: new Date(),
      }));
      addMCQs(newMCQs);
      setIsGenerating(false);
    }, 3000);
  };

  const startQuiz = () => {
    setQuizMCQs(mcqs.length > 0 ? mcqs : []);
    setQuizMode(true);
    setCurrentIndex(0);
    setShowExplanation(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  const handleAnswer = (optionIndex: number) => {
    const current = quizMCQs[currentIndex];
    updateMCQ(current.id, { userAnswer: optionIndex });
    setQuizMCQs((prev) =>
      prev.map((mcq, i) =>
        i === currentIndex ? { ...mcq, userAnswer: optionIndex } : mcq
      )
    );
    setShowExplanation(true);

    if (optionIndex === current.correctAnswer) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const nextQuestion = () => {
    if (currentIndex < quizMCQs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    }
  };

  const currentMCQ = quizMCQs[currentIndex];
  const progress = quizMCQs.length > 0 ? ((currentIndex + 1) / quizMCQs.length) * 100 : 0;
  const isComplete = currentIndex === quizMCQs.length - 1 && showExplanation;

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            MCQ Generator
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Generate and practice multiple choice questions
          </p>
        </div>
        {mcqs.length > 0 && !quizMode && (
          <Button
            variant="gradient"
            leftIcon={<HelpCircle className="w-4 h-4" />}
            onClick={startQuiz}
          >
            Start Quiz
          </Button>
        )}
      </div>

      {/* MCQ Count Selection */}
      {!quizMode && !isGenerating && mcqs.length === 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Number of Questions
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {mcqCounts.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedCount(option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedCount === option.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-dark-600 hover:border-primary-300'
                  }`}
                >
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {option.label}
                  </p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </button>
              ))}
            </div>
            <Button
              variant="gradient"
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={handleGenerate}
              className="w-full"
            >
              Generate {selectedCount} MCQs
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Generation Progress */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardContent className="p-8 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-bg flex items-center justify-center"
                >
                  <HelpCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Generating {selectedCount} MCQs...
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  AI is creating multiple choice questions with explanations
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Mode */}
      <AnimatePresence>
        {quizMode && quizMCQs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Progress */}
            <div className="flex items-center gap-4">
              <Progress value={progress} gradient className="flex-1" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {currentIndex + 1} / {quizMCQs.length}
              </span>
            </div>

            {/* Question Card */}
            {!isComplete ? (
              <Card>
                <CardContent className="p-6">
                  {/* Question */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{currentIndex + 1}</span>
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {currentMCQ?.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentMCQ?.options.map((option, index) => {
                      const isSelected = currentMCQ.userAnswer === index;
                      const isCorrect = index === currentMCQ.correctAnswer;
                      const showResult = showExplanation;

                      return (
                        <button
                          key={index}
                          onClick={() => !showExplanation && handleAnswer(index)}
                          disabled={showExplanation}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            showResult
                              ? isCorrect
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : isSelected
                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                : 'border-gray-200 dark:border-dark-600 opacity-50'
                              : 'border-gray-200 dark:border-dark-600 hover:border-primary-500'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                showResult && isCorrect
                                  ? 'bg-green-500 text-white'
                                  : showResult && isSelected
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              {showResult && isCorrect ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : showResult && isSelected ? (
                                <XCircle className="w-5 h-5" />
                              ) : (
                                String.fromCharCode(65 + index)
                              )}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      >
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
                          Explanation
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          {currentMCQ?.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Next Button */}
                  {showExplanation && !isComplete && (
                    <Button
                      variant="gradient"
                      className="w-full mt-6"
                      onClick={nextQuestion}
                    >
                      Next Question
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Results Card */
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-bg flex items-center justify-center">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Quiz Complete!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    You scored {score.correct} out of {quizMCQs.length}
                  </p>
                  <div className="flex justify-center gap-8 mb-8">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-500">{score.correct}</p>
                      <p className="text-sm text-gray-500">Correct</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-red-500">{score.incorrect}</p>
                      <p className="text-sm text-gray-500">Incorrect</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary-500">
                        {Math.round((score.correct / quizMCQs.length) * 100)}%
                      </p>
                      <p className="text-sm text-gray-500">Score</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      variant="outline"
                      leftIcon={<RotateCcw className="w-4 h-4" />}
                      onClick={() => setQuizMode(false)}
                    >
                      Exit Quiz
                    </Button>
                    <Button
                      variant="gradient"
                      onClick={startQuiz}
                    >
                      Retry Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Score Bar */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{score.correct} correct</span>
              </div>
              <div className="flex items-center gap-2 text-red-500">
                <XCircle className="w-5 h-5" />
                <span className="font-medium">{score.incorrect} incorrect</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MCQ List */}
      {!quizMode && mcqs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Generated Questions ({mcqs.length})
            </h3>
            <Button variant="outline" size="sm" onClick={startQuiz}>
              Start Quiz
            </Button>
          </div>
          <div className="grid gap-4">
            {mcqs.map((mcq, index) => (
              <Card key={mcq.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="primary" className="mt-1">{index + 1}</Badge>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">
                        {mcq.question}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mcq.options.map((opt, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-1 rounded ${
                              i === mcq.correctAnswer
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
