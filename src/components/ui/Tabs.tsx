import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={className}>
      {/* Tab List */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-dark-800 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'text-primary-600 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white dark:bg-dark-700 rounded-lg shadow-sm"
                transition={{ type: 'spring', duration: 0.3 }}
              />
            )}
            <span className="relative z-10">{tab.icon}</span>
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              'transition-opacity duration-200',
              activeTab === tab.id ? 'block' : 'hidden'
            )}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
