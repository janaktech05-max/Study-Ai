import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Sparkles,
  BookOpen,
  ListChecks,
  Clock,
  GraduationCap,
  
  Copy,
  Download,
  Star,
  Share2,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, Button, Badge } from '../ui';
import { useStore, Note } from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';

const noteTypes = [
  { id: 'exam', label: 'Exam Notes', icon: GraduationCap, description: 'Key points for exam preparation' },
  { id: 'short', label: 'Short Summary', icon: ListChecks, description: 'Quick overview of main concepts' },
  { id: 'detailed', label: 'Detailed Summary', icon: BookOpen, description: 'Comprehensive breakdown' },
  { id: 'bullet', label: 'Bullet Points', icon: FileText, description: 'Concise bullet format' },
  { id: 'chapter', label: 'Chapter Notes', icon: FileText, description: 'Chapter-wise organization' },
  { id: 'revision', label: 'One-Day Revision', icon: Clock, description: 'Last minute revision notes' },
];

const sampleNotes: Record<string, string> = {
  exam: `# Exam Notes: Photosynthesis

## Key Concepts to Remember

### 1. Definition
**Photosynthesis** is the process by which green plants convert light energy into chemical energy stored in glucose.

### 2. Overall Equation
\`\`\`
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂
\`\`\`

### 3. Two Main Stages

**Light-Dependent Reactions (Light Reactions)**
- Location: Thylakoid membranes
- Products: ATP, NADPH, O₂
- Requires: Light, water

**Light-Independent Reactions (Calvin Cycle)**
- Location: Stroma
- Products: Glucose (G3P)
- Requires: CO₂, ATP, NADPH

### 4. Important Factors Affecting Rate
1. **Light intensity** - increases rate up to a point
2. **CO₂ concentration** - limiting factor
3. **Temperature** - optimal at 25-35°C

### 5. Expected Exam Questions
- Explain the role of chlorophyll in photosynthesis
- Compare light-dependent and light-independent reactions
- Draw and label a chloroplast diagram
- Explain limiting factors in photosynthesis

### 6. Key Formulas & Values
- Wavelengths absorbed: Red (680nm) and Blue (450nm)
- Compensation point: Where photosynthesis = respiration`,

  short: `# Short Summary: Photosynthesis

**What is it?** Plants converting light to chemical energy (glucose).

**Equation:** 6CO₂ + 6H₂O + Light → Glucose + 6O₂

**Two Stages:**
1. Light Reactions → ATP + NADPH (thylakoid)
2. Calvin Cycle → Glucose (stroma)

**Key Factors:** Light, CO₂, Temperature

**Remember:** Chlorophyll absorbs red & blue light, reflects green.`,

  detailed: `# Detailed Summary: Photosynthesis

## Introduction
Photosynthesis is the fundamental biological process that sustains nearly all life on Earth. It is the means by which plants, algae, and certain bacteria convert light energy, typically from the sun, into chemical energy stored in glucose molecules.

## The Chloroplast: Site of Photosynthesis
Photosynthesis occurs in specialized organelles called chloroplasts, which contain:
- **Thylakoids**: Flattened membrane sacs where light reactions occur
- **Grana**: Stacks of thylakoids
- **Stroma**: Fluid surrounding thylakoids where the Calvin cycle occurs
- **Chlorophyll**: The primary pigment that captures light energy

## Stage 1: Light-Dependent Reactions
These reactions occur in the thylakoid membranes and require direct light energy.

### Process:
1. Light energy is absorbed by chlorophyll molecules
2. Water molecules are split (photolysis): 2H₂O → 4H⁺ + 4e⁻ + O₂
3. Electrons flow through the electron transport chain
4. ATP is produced via chemiosmosis
5. NADP⁺ is reduced to NADPH

### Products:
- ATP (energy currency)
- NADPH (electron carrier)
- O₂ (released as byproduct)

## Stage 2: Light-Independent Reactions (Calvin Cycle)
These reactions occur in the stroma and don't require light directly.

### The Calvin Cycle (3 Steps):
1. **Carbon Fixation**: CO₂ combines with RuBP (catalyzed by RuBisCO)
2. **Reduction**: Using ATP and NADPH to form G3P
3. **Regeneration**: RuBP is regenerated for the cycle to continue

### Output:
- For every 3 CO₂ molecules fixed: 1 G3P molecule exits
- 6 turns of the cycle produce 1 glucose molecule`,

  bullet: `# Bullet Point Notes: Photosynthesis

## Definition
• Conversion of light energy to chemical energy
• Occurs in chloroplasts of plant cells
• Essential for all life on Earth

## Equation
• 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂

## Light Reactions
• Location: Thylakoid membranes
• Requires: Light, water
• Produces: ATP, NADPH, O₂
• Photolysis splits water molecules

## Calvin Cycle
• Location: Stroma
• Three steps: Fixation, Reduction, Regeneration
• Enzyme RuBisCO catalyzes CO₂ fixation
• Produces: Glucose (via G3P)

## Factors Affecting Rate
• Light intensity (up to saturation point)
• CO₂ concentration
• Temperature (optimal 25-35°C)
• Water availability

## Pigments
• Chlorophyll a (primary pigment)
• Chlorophyll b (accessory pigment)
• Carotenoids (accessory pigments)`,

  chapter: `# Chapter Notes: Photosynthesis

## Chapter 1: Introduction to Photosynthesis
Photosynthesis is the biochemical process that forms the foundation of energy flow in ecosystems...

## Chapter 2: The Chloroplast
Structure and function of the organelle where photosynthesis occurs...

## Chapter 3: Light Reactions
Detailed explanation of the light-dependent phase...

## Chapter 4: The Calvin Cycle
Step-by-step breakdown of carbon fixation...

## Chapter 5: Factors Affecting Photosynthesis
Environmental and internal factors that influence the rate...`,

  revision: `# One-Day Revision: Photosynthesis

⚡ **QUICK FACTS:**

📌 **Definition**: Plants make glucose from CO₂ + H₂O using light

📌 **Equation**: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂

📌 **Two Stages**:
   1. Light reactions (thylakoid) → ATP + NADPH + O₂
   2. Calvin cycle (stroma) → Glucose

📌 **Key Enzyme**: RuBisCO (fixes CO₂)

📌 **Pigments**: Chlorophyll (green), Carotenoids (orange/yellow)

📌 **Factors**: Light, CO₂, Temperature, Water

🎯 **EXAM TIPS:**
- Know the equation by heart
- Understand WHERE each reaction occurs
- Be able to explain limiting factors
- Draw a labeled chloroplast diagram`,
};

export const NotesPage: React.FC = () => {
  const { notes, addNote, uploads } = useStore();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<Note | null>(null);

  const handleGenerate = (typeId: string) => {
    setSelectedType(typeId);
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const newNote: Note = {
        id: uuidv4(),
        uploadId: uploads[0]?.id || 'sample',
        title: `${noteTypes.find((t) => t.id === typeId)?.label}: Study Material`,
        type: typeId as Note['type'],
        content: sampleNotes[typeId] || sampleNotes.exam,
        createdAt: new Date(),
        isFavorite: false,
      };
      setGeneratedNote(newNote);
      addNote(newNote);
      setIsGenerating(false);
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            AI Notes Generator
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Generate smart study notes from your uploaded materials
          </p>
        </div>
        {uploads.length > 0 && (
          <Badge variant="primary">
            {uploads.length} file(s) ready for processing
          </Badge>
        )}
      </div>

      {/* Note Type Selection */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {noteTypes.map((type, index) => (
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
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {type.label}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
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
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Generating {noteTypes.find((t) => t.id === selectedType)?.label}...
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  AI is analyzing your content and creating smart notes
                </p>
                <div className="flex justify-center gap-1 mt-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-primary-500"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Note */}
      <AnimatePresence>
        {generatedNote && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="p-6">
                {/* Note Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Badge variant="success">AI Generated</Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(generatedNote.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Copy className="w-4 h-4" />}
                      onClick={() => copyToClipboard(generatedNote.content)}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Download className="w-4 h-4" />}
                    >
                      Export
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Star className="w-4 h-4" />}
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Share2 className="w-4 h-4" />}
                    >
                      Share
                    </Button>
                  </div>
                </div>

                {/* Note Content */}
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-dark-800 p-6 rounded-xl overflow-auto max-h-[600px]">
                    {generatedNote.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Previous Notes */}
      {notes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Notes
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.slice(0, 6).map((note) => (
              <Card key={note.id} hover className="cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {note.title}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {note.content.substring(0, 50)}...
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {note.isFavorite && (
                      <Star className="w-4 h-4 text-amber-500 fill-current flex-shrink-0" />
                    )}
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
