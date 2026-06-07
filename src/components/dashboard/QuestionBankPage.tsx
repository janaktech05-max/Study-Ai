import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { Card, CardContent, Button, Badge } from '../ui';
import { useStore, QuestionBankItem } from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';

const questionTypes = [
  { id: '2', label: '2 Mark Questions', marks: 2 as const, description: 'Short answer questions' },
  { id: '5', label: '5 Mark Questions', marks: 5 as const, description: 'Descriptive answers' },
  { id: '10', label: '10 Mark Questions', marks: 10 as const, description: 'Essay-type questions' },
  { id: 'viva', label: 'Viva Questions', marks: 'viva' as const, description: 'Oral exam preparation' },
];

const sampleQuestions: Record<string, { question: string; answer: string }[]> = {
  '2': [
    {
      question: 'Define photosynthesis.',
      answer: 'Photosynthesis is the process by which green plants convert light energy into chemical energy stored in glucose, using carbon dioxide and water, while releasing oxygen as a byproduct.',
    },
    {
      question: 'Where does the light-dependent reaction occur?',
      answer: 'The light-dependent reactions occur in the thylakoid membranes of the chloroplast.',
    },
    {
      question: 'What is the role of chlorophyll?',
      answer: 'Chlorophyll is the primary pigment that captures light energy for photosynthesis. It absorbs red and blue light while reflecting green light.',
    },
    {
      question: 'Name the products of the light-dependent reactions.',
      answer: 'The products are ATP (adenosine triphosphate), NADPH, and oxygen (O₂).',
    },
  ],
  '5': [
    {
      question: 'Explain the Calvin Cycle with its three main stages.',
      answer: 'The Calvin Cycle has three stages:\n\n1. Carbon Fixation: CO₂ is attached to RuBP by RuBisCO enzyme, forming two 3-PGA molecules.\n\n2. Reduction: ATP and NADPH are used to convert 3-PGA to G3P (glyceraldehyde-3-phosphate).\n\n3. Regeneration: Some G3P molecules are used to regenerate RuBP, while others form glucose.\n\nThe cycle requires 3 turns to fix 3 CO₂ molecules and produce 1 G3P that exits the cycle.',
    },
    {
      question: 'Describe the factors affecting the rate of photosynthesis.',
      answer: 'The main factors are:\n\n1. Light intensity: Increases photosynthesis rate until saturation point.\n\n2. CO₂ concentration: Acts as a limiting factor; higher levels increase rate.\n\n3. Temperature: Optimal at 25-35°C; enzymes denature at high temperatures.\n\n4. Water availability: Essential for photolysis and maintaining turgor.\n\n5. Chlorophyll concentration: More chlorophyll enables more light absorption.',
    },
  ],
  '10': [
    {
      question: 'Compare and contrast the light-dependent and light-independent reactions of photosynthesis.',
      answer: 'LIGHT-DEPENDENT REACTIONS:\n\nLocation: Thylakoid membranes\nRequirements: Light, water, ADP, NADP+\nProducts: ATP, NADPH, O₂\nProcess:\n- Light energy absorbed by chlorophyll\n- Water molecules split (photolysis)\n- Electrons pass through ETC\n- ATP produced by chemiosmosis\n- NADP+ reduced to NADPH\n\nLIGHT-INDEPENDENT REACTIONS (Calvin Cycle):\n\nLocation: Stroma\nRequirements: CO₂, ATP, NADPH\nProducts: Glucose (G3P)\nProcess:\n- CO₂ fixation by RuBisCO\n- Reduction using ATP and NADPH\n- Regeneration of RuBP\n\nKey Differences:\n1. Location within chloroplast\n2. Light requirement\n3. Products formed\n4. Energy source\n\nConnection: Light reactions provide ATP and NADPH needed for Calvin Cycle.',
    },
  ],
  'viva': [
    {
      question: 'Why do plants appear green?',
      answer: 'Plants appear green because chlorophyll absorbs red and blue light for photosynthesis but reflects green light. The reflected green light reaches our eyes, making plants look green.',
    },
    {
      question: 'What would happen if there was no photosynthesis?',
      answer: 'Without photosynthesis:\n1. No oxygen production - animals would not survive\n2. No food chain - plants are primary producers\n3. No carbon dioxide absorption - increased greenhouse effect\n4. No fossil fuels - these are from ancient photosynthetic organisms',
    },
    {
      question: 'Can photosynthesis occur in red light?',
      answer: 'Yes, photosynthesis can occur in red light. Chlorophyll a absorbs red light around 680nm very effectively. In fact, red light is one of the most efficient wavelengths for photosynthesis.',
    },
  ],
};

export const QuestionBankPage: React.FC = () => {
  const { questionBank, addQuestions } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const handleGenerate = (type: string) => {
    setSelectedType(type);
    setIsGenerating(true);

    setTimeout(() => {
      const marks = type === 'viva' ? 'viva' : (parseInt(type) as 2 | 5 | 10);
      const newQuestions: QuestionBankItem[] = sampleQuestions[type].map((q) => ({
        id: uuidv4(),
        uploadId: 'sample',
        question: q.question,
        marks: marks,
        answer: q.answer,
        createdAt: new Date(),
      }));
      addQuestions(newQuestions);
      setIsGenerating(false);
    }, 2500);
  };

  const groupedQuestions = questionBank.reduce((acc, q) => {
    const key = q.marks.toString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(q);
    return acc;
  }, {} as Record<string, QuestionBankItem[]>);

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Question Bank Generator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Generate comprehensive question banks for exam preparation
        </p>
      </div>

      {/* Question Type Selection */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {questionTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover
              className={`cursor-pointer ${
                selectedType === type.id ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => !isGenerating && handleGenerate(type.id)}
            >
              <CardContent className="p-5 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-bg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {type.marks === 'viva' ? 'V' : type.marks}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {type.label}
                </h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
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
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-bg flex items-center justify-center"
                >
                  <BookOpen className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Generating Questions...
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  AI is creating {questionTypes.find((t) => t.id === selectedType)?.label.toLowerCase()}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Bank Display */}
      {Object.keys(groupedQuestions).length > 0 && (
        <div className="space-y-6">
          {Object.entries(groupedQuestions).map(([marks, questions]) => (
            <div key={marks}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {marks === 'viva' ? 'Viva Questions' : `${marks} Mark Questions`}
                </h3>
                <Badge variant="primary">{questions.length} questions</Badge>
              </div>
              <div className="space-y-3">
                {questions.map((q, index) => (
                  <Card key={q.id}>
                    <CardContent className="p-0">
                      <button
                        onClick={() =>
                          setExpandedQuestion(expandedQuestion === q.id ? null : q.id)
                        }
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors rounded-t-2xl"
                      >
                        <div className="flex items-start gap-3">
                          <Badge variant="default" className="mt-0.5">
                            Q{index + 1}
                          </Badge>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {q.question}
                          </span>
                        </div>
                        {expandedQuestion === q.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedQuestion === q.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4">
                              <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-700">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                    Answer
                                  </span>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      leftIcon={<Copy className="w-3 h-3" />}
                                      onClick={() => navigator.clipboard.writeText(q.answer)}
                                    >
                                      Copy
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                  {q.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {Object.keys(groupedQuestions).length === 0 && !isGenerating && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Questions Generated Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Select a question type above to generate AI-powered exam questions
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
