import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Sparkles, ZoomIn, ZoomOut, Download, Maximize2 } from 'lucide-react';
import { Card, CardContent, Button, Badge } from '../ui';
import { useStore, MindMap, MindMapNode } from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';

const sampleMindMap: MindMapNode = {
  id: 'root',
  label: 'Photosynthesis',
  children: [
    {
      id: 'light',
      label: 'Light Reactions',
      children: [
        { id: 'l1', label: 'Thylakoid Membrane' },
        { id: 'l2', label: 'Photolysis' },
        { id: 'l3', label: 'ATP Production' },
        { id: 'l4', label: 'NADPH Formation' },
      ],
    },
    {
      id: 'calvin',
      label: 'Calvin Cycle',
      children: [
        { id: 'c1', label: 'Carbon Fixation' },
        { id: 'c2', label: 'Reduction' },
        { id: 'c3', label: 'Regeneration' },
      ],
    },
    {
      id: 'factors',
      label: 'Factors',
      children: [
        { id: 'f1', label: 'Light Intensity' },
        { id: 'f2', label: 'CO₂ Concentration' },
        { id: 'f3', label: 'Temperature' },
      ],
    },
    {
      id: 'pigments',
      label: 'Pigments',
      children: [
        { id: 'p1', label: 'Chlorophyll a' },
        { id: 'p2', label: 'Chlorophyll b' },
        { id: 'p3', label: 'Carotenoids' },
      ],
    },
  ],
};

const colors = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
  'from-green-500 to-emerald-500',
  'from-indigo-500 to-purple-500',
];

export const MindMapPage: React.FC = () => {
  const { mindMaps, addMindMap } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [selectedMap, setSelectedMap] = useState<MindMap | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newMindMap: MindMap = {
        id: uuidv4(),
        uploadId: 'sample',
        title: 'Photosynthesis Mind Map',
        nodes: sampleMindMap,
        createdAt: new Date(),
      };
      addMindMap(newMindMap);
      setSelectedMap(newMindMap);
      setIsGenerating(false);
    }, 3000);
  };

  const renderNode = (node: MindMapNode, level: number = 0, index: number = 0) => {
    const colorIndex = level === 0 ? 0 : (index % (colors.length - 1)) + 1;
    const isRoot = level === 0;

    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: level * 0.1 + index * 0.05 }}
        className={`flex flex-col items-center ${level > 0 ? 'mt-4' : ''}`}
      >
        <div
          className={`
            px-4 py-2 rounded-xl font-medium text-white shadow-lg
            bg-gradient-to-r ${colors[colorIndex]}
            ${isRoot ? 'text-lg px-6 py-3' : 'text-sm'}
            hover:scale-105 transition-transform cursor-pointer
          `}
        >
          {node.label}
        </div>
        {node.children && node.children.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-4 relative">
            {/* Connecting lines */}
            <div className="absolute top-0 left-1/2 w-px h-4 bg-gray-300 dark:bg-gray-600 -translate-x-1/2 -translate-y-full" />
            {node.children.map((child, childIndex) => (
              <div key={child.id} className="relative">
                <div className="absolute top-0 left-1/2 w-px h-4 bg-gray-300 dark:bg-gray-600 -translate-x-1/2 -translate-y-full" />
                {renderNode(child, level + 1, childIndex)}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  const displayMap = selectedMap || (mindMaps.length > 0 ? mindMaps[0] : null);

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Mind Map Generator
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize complex topics with AI-generated mind maps
          </p>
        </div>
        <Button
          variant="gradient"
          leftIcon={<Sparkles className="w-4 h-4" />}
          onClick={handleGenerate}
          isLoading={isGenerating}
        >
          Generate Mind Map
        </Button>
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
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-bg flex items-center justify-center"
                >
                  <GitBranch className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Creating Mind Map...
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  AI is analyzing content and building visual connections
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mind Map Display */}
      {displayMap && !isGenerating && (
        <Card>
          <CardContent className="p-6">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Badge variant="primary">{displayMap.title}</Badge>
                <span className="text-sm text-gray-500">
                  {new Date(displayMap.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<ZoomOut className="w-4 h-4" />}
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<ZoomIn className="w-4 h-4" />}
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Maximize2 className="w-4 h-4" />}
                  onClick={() => setZoom(1)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Export PNG
                </Button>
              </div>
            </div>

            {/* Mind Map Canvas */}
            <div className="overflow-auto bg-gray-50 dark:bg-dark-700 rounded-xl p-8 min-h-[400px]">
              <div
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
                className="flex justify-center transition-transform"
              >
                {renderNode(displayMap.nodes)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mind Map History */}
      {mindMaps.length > 1 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Previous Mind Maps
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mindMaps.slice(1).map((map) => (
              <Card
                key={map.id}
                hover
                className="cursor-pointer"
                onClick={() => setSelectedMap(map)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <GitBranch className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {map.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(map.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {mindMaps.length === 0 && !isGenerating && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
              <GitBranch className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Mind Maps Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Upload a document and generate AI-powered mind maps to visualize concepts
            </p>
            <Button
              variant="gradient"
              leftIcon={<Sparkles className="w-4 h-4" />}
              onClick={handleGenerate}
            >
              Generate Mind Map
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
