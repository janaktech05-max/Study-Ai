import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Upload,
  FileText,
  Layers,
  HelpCircle,
  BookOpen,
  GitBranch,
  History,
  CreditCard,
  Settings,
  Sparkles,
  ChevronLeft,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Avatar } from '../ui';
import { cn } from '../../utils/cn';

type PageType = 'dashboard' | 'upload' | 'notes' | 'flashcards' | 'mcq' | 'questions' | 'mindmaps' | 'history' | 'billing' | 'settings';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'upload' as const, icon: Upload, label: 'Upload Files' },
  { id: 'notes' as const, icon: FileText, label: 'AI Notes' },
  { id: 'flashcards' as const, icon: Layers, label: 'Flashcards' },
  { id: 'mcq' as const, icon: HelpCircle, label: 'MCQ Generator' },
  { id: 'questions' as const, icon: BookOpen, label: 'Question Bank' },
  { id: 'mindmaps' as const, icon: GitBranch, label: 'Mind Maps' },
  { id: 'history' as const, icon: History, label: 'History' },
];

const bottomMenuItems = [
  { id: 'billing' as const, icon: CreditCard, label: 'Billing' },
  { id: 'settings' as const, icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, onLogout }) => {
  const { user, sidebarOpen, toggleSidebar, theme, toggleTheme } = useStore();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className={cn(
          'fixed left-0 top-0 bottom-0 z-50 bg-white dark:bg-dark-900 border-r border-gray-200 dark:border-dark-700',
          'flex flex-col transition-all duration-300',
          'lg:relative',
          !sidebarOpen && 'hidden lg:flex'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-700">
          <motion.div 
            className="flex items-center gap-3"
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
          >
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold gradient-text">StudyAI</span>
            )}
          </motion.div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors hidden lg:block"
          >
            <ChevronLeft className={cn(
              'w-5 h-5 text-gray-500 transition-transform',
              !sidebarOpen && 'rotate-180'
            )} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all',
                  currentPage === item.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-100 dark:border-dark-700" />

          {/* Bottom Menu */}
          <div className="space-y-1">
            {bottomMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all',
                  currentPage === item.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-dark-700">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 transition-all mb-2"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 flex-shrink-0" />
            ) : (
              <Sun className="w-5 h-5 flex-shrink-0" />
            )}
            {sidebarOpen && (
              <span className="font-medium">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            )}
          </button>

          {/* User Profile */}
          {sidebarOpen ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-800">
              <Avatar src={user?.avatar} name={user?.name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center p-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.aside>
    </>
  );
};
