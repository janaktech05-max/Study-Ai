import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  Clock,
  Layers,
  HelpCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from 'lucide-react';
import { Card, CardContent, Button, Badge, Progress } from '../ui';
import { useStore } from '../../store/useStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface DashboardHomeProps {
  onNavigate: (page: 'upload' | 'notes' | 'flashcards' | 'mcq') => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const { analytics } = useStore();

  const stats = [
    {
      label: 'Notes Generated',
      value: analytics.notesGenerated,
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Files Uploaded',
      value: analytics.filesUploaded,
      change: '+8%',
      trend: 'up',
      icon: Upload,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Study Time',
      value: `${Math.floor(analytics.studyTimeMinutes / 60)}h`,
      change: '+23%',
      trend: 'up',
      icon: Clock,
      color: 'from-orange-500 to-red-500',
    },
    {
      label: 'Flashcards',
      value: analytics.flashcardsStudied,
      change: '-5%',
      trend: 'down',
      icon: Layers,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const recentFiles = [
    { name: 'Biology_Chapter_5.pdf', type: 'PDF', size: '2.4 MB', date: '2 hours ago' },
    { name: 'Chemistry_Notes.docx', type: 'DOCX', size: '1.2 MB', date: '5 hours ago' },
    { name: 'Physics_Lecture.pptx', type: 'PPTX', size: '8.5 MB', date: '1 day ago' },
    { name: 'Math_Formulas.txt', type: 'TXT', size: '45 KB', date: '2 days ago' },
  ];

  const quickActions = [
    { label: 'Upload File', icon: Upload, action: () => onNavigate('upload') },
    { label: 'View Notes', icon: FileText, action: () => onNavigate('notes') },
    { label: 'Study Flashcards', icon: Layers, action: () => onNavigate('flashcards') },
    { label: 'Practice MCQs', icon: HelpCircle, action: () => onNavigate('mcq') },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Welcome back! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your study materials.
          </p>
        </div>
        <Button
          variant="gradient"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => onNavigate('upload')}
        >
          New Upload
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Weekly Activity
                </h3>
                <Badge variant="primary">This Week</Badge>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.weeklyActivity}>
                    <defs>
                      <linearGradient id="colorNotes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#1e293b', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff' 
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="notes"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorNotes)"
                    />
                    <Area
                      type="monotone"
                      dataKey="uploads"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorUploads)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Monthly Progress
                </h3>
                <Badge variant="success">On Track</Badge>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#1e293b', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff' 
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="url(#barGradient)" 
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions & Recent Files */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={action.action}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Files */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Files
                </h3>
                <Button variant="ghost" size="sm" onClick={() => onNavigate('upload')}>
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                      </div>
                    </div>
                    <Badge variant="default" size="sm">{file.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Study Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Study Progress
                </h3>
                <p className="text-sm text-gray-500">Track your learning milestones</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Notes Reviewed</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">75%</span>
                </div>
                <Progress value={75} gradient />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Flashcards Mastered</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">62%</span>
                </div>
                <Progress value={62} gradient />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">MCQs Accuracy</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">88%</span>
                </div>
                <Progress value={88} gradient />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
