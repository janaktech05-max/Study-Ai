import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Bell, MessageSquare, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Avatar, Badge } from '../ui';
import { Input } from '../ui/Input';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { user, toggleSidebar, searchQuery, setSearchQuery } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const notifications = [
    { id: 1, title: 'Notes generated', message: 'Your exam notes for Biology are ready', time: '2 min ago', read: false },
    { id: 2, title: 'New flashcards', message: '24 flashcards created from Chemistry PDF', time: '1 hour ago', read: false },
    { id: 3, title: 'Weekly summary', message: 'You studied 12 hours this week!', time: '1 day ago', read: true },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left: Menu & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 lg:hidden"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search - Desktop */}
          <div className="hidden md:block w-64 lg:w-80">
            <Input
              placeholder="Search notes, files..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Search - Mobile */}
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 md:hidden"
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* AI Chat */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800">
            <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-100 dark:border-dark-700 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-dark-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    <Badge variant="primary" size="sm">3 new</Badge>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-700 cursor-pointer ${
                          !notification.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 mt-2 rounded-full ${!notification.read ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {notification.title}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm truncate">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 dark:border-dark-700">
                    <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-dark-700">
            <Avatar src={user?.avatar} name={user?.name} size="md" />
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.plan.toUpperCase()} Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white dark:bg-dark-900 p-4"
          >
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setShowSearch(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
              <Input
                placeholder="Search notes, files..."
                leftIcon={<Search className="w-4 h-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
            </div>
            {searchQuery && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing results for "{searchQuery}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
