import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Shuffle,
  BookOpen,
  
} from 'lucide-react';
import { Card, CardContent, Button, Badge, Progress } from '../ui';
import { useStore, Flashcard } from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';

const sampleFlashcards: Omit<Flashcard, 'id' | 'uploadId' | 'createdAt'>[] = [
  {
    question: 'What is the overall equation for photosynthesis?',
    answer: '6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂\n\nSix molecules of carbon dioxide combine with six molecules of water, using light energy, to produce one molecule of glucose and six molecules of oxygen.',
    difficulty: 'easy',
    studied: false,
  },
  {
    question: 'Where do the light-dependent reactions of photosynthesis occur?',
    answer: 'The light-dependent reactions occur in the thylakoid membranes of the chloroplast. These flattened membrane sacs contain chlorophyll and other pigments that capture light energy.',
    difficulty: 'medium',
    studied: false,
  },
  {
    question: 'What are the products of the light-dependent reactions?',
    answer: 'The three main products are:\n\n1. ATP (adenosine triphosphate) - energy carrier\n2. NADPH - electron carrier\n3. O₂ (oxygen) - released as a byproduct from water splitting',
    difficulty: 'medium',
    studied: false,
  },
  {
    question: 'What is the role of RuBisCO enzyme in the Calvin Cycle?',
    answer: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase/oxygenase) is the key enzyme that catalyzes the first step of carbon fixation. It combines CO₂ with RuBP (ribulose-1,5-bisphosphate) to form two molecules of 3-PGA.',
    difficulty: 'hard',
    studied: false,
  },
  {
    question: 'What is the compensation point in photosynthesis?',
    answer: 'The compensation point is the light intensity at which the rate of photosynthesis equals the rate of respiration. At this point, there is no net gain or loss of organic matter, and O₂ production equals O₂ consumption.',
    difficulty: 'hard',
    studied: false,
  },
  {
    question: 'Name three factors that affect the rate of photosynthesis.',
    answer: '1. Light intensity - increases rate up to saturation point\n2. CO₂ concentration - acts as a limiting factor\n3. Temperature - optimal at 25-35°C, enzymes denature at high temps\n\nOther factors: water availability, chlorophyll concentration',
    difficulty: 'easy',
    studied: false,
  },
];

export const FlashcardsPage: React.FC = () => {
  const { flashcards, addFlashcards, updateFlashcard } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newCards = sampleFlashcards.map((card) => ({
        ...card,
        id: uuidv4(),
        uploadId: 'sample',
        createdAt: new Date(),
      }));
      addFlashcards(newCards);
      setIsGenerating(false);
    }, 2500);
  };

  const startStudyMode = () => {
    setStudyCards(flashcards.length > 0 ? flashcards : []);
    setStudyMode(true);
    setCurrentIndex(0);
    setIsFlipped(false);
    setCorrect(0);
    setIncorrect(0);
  };

  const shuffleCards = () => {
    setStudyCards([...studyCards].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    if (currentIndex < studyCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const markCorrect = () => {
    setCorrect(correct + 1);
    updateFlashcard(studyCards[currentIndex].id, { studied: true });
    nextCard();
  };

  const markIncorrect = () => {
    setIncorrect(incorrect + 1);
    nextCard();
  };

  const currentCard = studyCards[currentIndex];
  const progress = studyCards.length > 0 ? ((currentIndex + 1) / studyCards.length) * 100 : 0;
  

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Flashcard Generator
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create and study AI-generated flashcards
          </p>
        </div>
        <div className="flex gap-3">
          {flashcards.length > 0 && !studyMode && (
            <Button
              variant="outline"
              leftIcon={<BookOpen className="w-4 h-4" />}
              onClick={startStudyMode}
            >
              Study Mode
            </Button>
          )}
          <Button
            variant="gradient"
            leftIcon={<Sparkles className="w-4 h-4" />}
            onClick={handleGenerate}
            isLoading={isGenerating}
          >
            Generate Flashcards
          </Button>
        </div>
      </div>

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
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-bg flex items-center justify-center"
                >
                  <Layers className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Creating Flashcards...
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  AI is generating question-answer pairs from your content
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Study Mode */}
      <AnimatePresence>
        {studyMode && studyCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Progress Bar */}
            <div className="flex items-center gap-4">
              <Progress value={progress} gradient className="flex-1" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {currentIndex + 1} / {studyCards.length}
              </span>
            </div>

            {/* Flashcard */}
            <div className="flex justify-center">
              <div
                className="w-full max-w-2xl h-80 perspective-1000 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-full h-full relative"
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-2xl gradient-bg p-8 flex flex-col items-center justify-center text-center backface-hidden shadow-xl"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Badge variant="default" className="mb-4 bg-white/20 text-white">
                      Question
                    </Badge>
                    <p className="text-xl lg:text-2xl font-medium text-white">
                      {currentCard?.question}
                    </p>
                    <p className="text-white/60 text-sm mt-4">Click to flip</p>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-white dark:bg-dark-800 border-2 border-primary-500 p-8 flex flex-col items-center justify-center text-center shadow-xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <Badge variant="primary" className="mb-4">Answer</Badge>
                    <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {currentCard?.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="lg"
                leftIcon={<ChevronLeft className="w-5 h-5" />}
                onClick={prevCard}
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
              
              {isFlipped && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<X className="w-5 h-5" />}
                    onClick={markIncorrect}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Didn't Know
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<Check className="w-5 h-5" />}
                    onClick={markCorrect}
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  >
                    Got It!
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="lg"
                rightIcon={<ChevronRight className="w-5 h-5" />}
                onClick={nextCard}
                disabled={currentIndex === studyCards.length - 1}
              >
                Next
              </Button>
            </div>

            {/* Stats & Actions */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-green-500">
                <Check className="w-5 h-5" />
                <span className="font-medium">{correct} correct</span>
              </div>
              <div className="flex items-center gap-2 text-red-500">
                <X className="w-5 h-5" />
                <span className="font-medium">{incorrect} to review</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Shuffle className="w-4 h-4" />}
                onClick={shuffleCards}
              >
                Shuffle
              </Button>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<RotateCcw className="w-4 h-4" />}
                onClick={() => setStudyMode(false)}
              >
                Exit Study Mode
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flashcard Grid */}
      {!studyMode && flashcards.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="h-full">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Badge
                      variant={
                        card.difficulty === 'easy'
                          ? 'success'
                          : card.difficulty === 'medium'
                          ? 'warning'
                          : 'error'
                      }
                      size="sm"
                    >
                      {card.difficulty}
                    </Badge>
                    {card.studied && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {card.question}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                    {card.answer}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!studyMode && flashcards.length === 0 && !isGenerating && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
              <Layers className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Flashcards Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Upload a document and generate AI-powered flashcards to start studying
            </p>
            <Button
              variant="gradient"
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={handleGenerate}
            >
              Generate Flashcards
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
