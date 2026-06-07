import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Landing Components
import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  Examples,
  Testimonials,
  Pricing,
  FAQ,
  Footer,
} from './components/landing';

// Dashboard Components
import {
  Sidebar,
  Header,
  DashboardHome,
  UploadPage,
  NotesPage,
  FlashcardsPage,
  MCQPage,
  QuestionBankPage,
  MindMapPage,
} from './components/dashboard';

// Store
import { useStore, demoLogin } from './store/useStore';

type PageType = 'dashboard' | 'upload' | 'notes' | 'flashcards' | 'mcq' | 'questions' | 'mindmaps' | 'history' | 'billing' | 'settings';

const pageTitles: Record<PageType, { title: string; subtitle?: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your study overview.' },
  upload: { title: 'Upload Files', subtitle: 'Upload documents to generate AI notes' },
  notes: { title: 'AI Notes', subtitle: 'Generate smart notes from your materials' },
  flashcards: { title: 'Flashcards', subtitle: 'Study with AI-generated flashcards' },
  mcq: { title: 'MCQ Generator', subtitle: 'Practice with multiple choice questions' },
  questions: { title: 'Question Bank', subtitle: 'Exam preparation questions' },
  mindmaps: { title: 'Mind Maps', subtitle: 'Visualize concepts and connections' },
  history: { title: 'History', subtitle: 'View your past activities' },
  billing: { title: 'Billing', subtitle: 'Manage your subscription' },
  settings: { title: 'Settings', subtitle: 'Configure your preferences' },
};

function App() {
  const { isAuthenticated, theme } = useStore();
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleGetStarted = () => {
    demoLogin();
  };

  const handleLogout = () => {
    useStore.getState().logout();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome onNavigate={(page) => setCurrentPage(page)} />;
      case 'upload':
        return <UploadPage onNavigate={(page) => setCurrentPage(page)} />;
      case 'notes':
        return <NotesPage />;
      case 'flashcards':
        return <FlashcardsPage />;
      case 'mcq':
        return <MCQPage />;
      case 'questions':
        return <QuestionBankPage />;
      case 'mindmaps':
        return <MindMapPage />;
      case 'history':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">History</h2>
            <p className="text-gray-500">Your activity history will appear here.</p>
          </div>
        );
      case 'billing':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Billing</h2>
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Current Plan</p>
                  <p className="text-2xl font-bold gradient-text">Pro Plan</p>
                </div>
                <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                  Active
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-700">
                  <p className="text-sm text-gray-500">Monthly Cost</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">$12/mo</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-700">
                  <p className="text-sm text-gray-500">Next Billing</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">Jan 15, 2025</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-700">
                  <p className="text-sm text-gray-500">Uploads Used</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">Unlimited</p>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl border-2 border-gray-200 dark:border-dark-600 text-gray-700 dark:text-gray-300 font-medium hover:border-primary-500 transition-colors">
                Manage Subscription
              </button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Name</label>
                    <input 
                      type="text" 
                      defaultValue="Alex Johnson"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      defaultValue="alex@studyai.com"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-200 dark:border-dark-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                      <p className="text-sm text-gray-500">Use dark theme</p>
                    </div>
                    <button 
                      onClick={() => useStore.getState().toggleTheme()}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        theme === 'dark' ? 'bg-primary-500' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive email updates</p>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-primary-500">
                      <div className="w-5 h-5 rounded-full bg-white shadow transform translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <DashboardHome onNavigate={(page) => setCurrentPage(page)} />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-dark-950 transition-colors`}>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'bg-white dark:bg-dark-800 text-gray-900 dark:text-white',
        }}
      />
      
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          // Landing Page
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Navbar onGetStarted={handleGetStarted} />
            <Hero onGetStarted={handleGetStarted} />
            <Features />
            <HowItWorks />
            <Examples />
            <Testimonials />
            <Pricing onGetStarted={handleGetStarted} />
            <FAQ />
            <Footer />
          </motion.div>
        ) : (
          // Dashboard
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-screen overflow-hidden"
          >
            {/* Sidebar */}
            <Sidebar
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onLogout={handleLogout}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <Header
                title={pageTitles[currentPage].title}
                subtitle={pageTitles[currentPage].subtitle}
              />

              {/* Page Content */}
              <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-dark-950">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderPage()}
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
