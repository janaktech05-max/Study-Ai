import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  FileText,
  Image,
  Video,
  File,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, Button, Progress, Badge } from '../ui';
import { Input, Textarea } from '../ui/Input';
import { useStore, Upload as UploadType } from '../../store/useStore';
import { v4 as uuidv4 } from 'uuid';

const fileTypeIcons: Record<string, React.FC<{ className?: string }>> = {
  pdf: FileText,
  pptx: FileText,
  docx: FileText,
  txt: File,
  jpg: Image,
  jpeg: Image,
  png: Image,
};

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  return fileTypeIcons[ext] || File;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface UploadPageProps {
  onNavigate: (page: 'notes') => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onNavigate }) => {
  const { addUpload, uploads } = useStore();
  const [uploadingFiles, setUploadingFiles] = useState<UploadType[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [activeTab, setActiveTab] = useState<'files' | 'youtube' | 'text'>('files');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const newUpload: UploadType = {
        id: uuidv4(),
        name: file.name,
        type: file.name.endsWith('.pdf') ? 'pdf' : 
              file.name.endsWith('.pptx') ? 'pptx' :
              file.name.endsWith('.docx') ? 'docx' :
              file.name.endsWith('.txt') ? 'txt' : 'image',
        size: file.size,
        status: 'uploading',
        progress: 0,
        createdAt: new Date(),
      };

      setUploadingFiles((prev) => [...prev, newUpload]);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          setUploadingFiles((prev) =>
            prev.map((u) =>
              u.id === newUpload.id
                ? { ...u, status: 'processing', progress: 100 }
                : u
            )
          );

          // Simulate processing
          setTimeout(() => {
            setUploadingFiles((prev) =>
              prev.map((u) =>
                u.id === newUpload.id
                  ? { ...u, status: 'completed' }
                  : u
              )
            );
            addUpload({ ...newUpload, status: 'completed', progress: 100 });
          }, 2000);
        } else {
          setUploadingFiles((prev) =>
            prev.map((u) =>
              u.id === newUpload.id ? { ...u, progress } : u
            )
          );
        }
      }, 200);
    });
  }, [addUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const handleYoutubeSubmit = () => {
    if (!youtubeUrl) return;
    
    const newUpload: UploadType = {
      id: uuidv4(),
      name: 'YouTube Transcript',
      type: 'youtube',
      size: 0,
      status: 'processing',
      progress: 100,
      createdAt: new Date(),
    };

    setUploadingFiles((prev) => [...prev, newUpload]);
    
    setTimeout(() => {
      setUploadingFiles((prev) =>
        prev.map((u) =>
          u.id === newUpload.id ? { ...u, status: 'completed' } : u
        )
      );
      addUpload({ ...newUpload, status: 'completed' });
      setYoutubeUrl('');
    }, 3000);
  };

  const handleTextSubmit = () => {
    if (!pastedText) return;
    
    const newUpload: UploadType = {
      id: uuidv4(),
      name: 'Pasted Text',
      type: 'txt',
      size: pastedText.length,
      status: 'processing',
      progress: 100,
      createdAt: new Date(),
      content: pastedText,
    };

    setUploadingFiles((prev) => [...prev, newUpload]);
    
    setTimeout(() => {
      setUploadingFiles((prev) =>
        prev.map((u) =>
          u.id === newUpload.id ? { ...u, status: 'completed' } : u
        )
      );
      addUpload({ ...newUpload, status: 'completed' });
      setPastedText('');
    }, 2000);
  };

  const removeFile = (id: string) => {
    setUploadingFiles((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Upload Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-dark-800 rounded-xl w-fit">
        {[
          { id: 'files' as const, label: 'Upload Files', icon: Upload },
          { id: 'youtube' as const, label: 'YouTube', icon: Video },
          { id: 'text' as const, label: 'Paste Text', icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-dark-700 text-primary-600 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* File Upload Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'files' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card>
              <CardContent className="p-8">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                    isDragActive
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-200 dark:border-dark-600 hover:border-primary-500'
                  }`}
                >
                  <input {...getInputProps()} />
                  <motion.div
                    animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center"
                  >
                    <Upload className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {isDragActive ? 'Drop your files here' : 'Drag & drop files here'}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    or click to browse from your computer
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['PDF', 'PPTX', 'DOCX', 'TXT', 'JPG', 'PNG'].map((type) => (
                      <Badge key={type} variant="default" size="sm">
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4">Max file size: 50MB</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'youtube' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="max-w-xl mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500 flex items-center justify-center">
                    <Video className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                    Import YouTube Transcript
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                    Paste a YouTube video URL to extract and process its transcript
                  </p>
                  <div className="flex gap-3">
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      leftIcon={<LinkIcon className="w-4 h-4" />}
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="gradient"
                      onClick={handleYoutubeSubmit}
                      disabled={!youtubeUrl}
                    >
                      Import
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'text' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="max-w-2xl mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                    Paste Your Text
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                    Paste lecture notes, article content, or any text you want to process
                  </p>
                  <Textarea
                    placeholder="Paste your text here..."
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    rows={8}
                    className="mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {pastedText.length} characters
                    </span>
                    <Button
                      variant="gradient"
                      onClick={handleTextSubmit}
                      disabled={!pastedText}
                    >
                      Process Text
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Queue */}
      {uploadingFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Processing Queue
            </h3>
            <div className="space-y-4">
              {uploadingFiles.map((file) => {
                const FileIcon = getFileIcon(file.name);
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-700"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <FileIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2">
                          {file.status === 'uploading' && (
                            <span className="text-sm text-gray-500">
                              {Math.round(file.progress)}%
                            </span>
                          )}
                          {file.status === 'processing' && (
                            <Badge variant="warning" size="sm">
                              <Loader2 className="w-3 h-3 animate-spin mr-1" />
                              Processing
                            </Badge>
                          )}
                          {file.status === 'completed' && (
                            <Badge variant="success" size="sm">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Ready
                            </Badge>
                          )}
                          {file.status === 'error' && (
                            <Badge variant="error" size="sm">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Error
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={file.progress} size="sm" className="flex-1" />
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-dark-600"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {uploadingFiles.some((f) => f.status === 'completed') && (
              <div className="mt-6 flex justify-end">
                <Button
                  variant="gradient"
                  leftIcon={<Sparkles className="w-4 h-4" />}
                  onClick={() => onNavigate('notes')}
                >
                  Generate AI Notes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Uploads */}
      {uploads.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Uploads
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploads.slice(0, 6).map((upload) => {
                const FileIcon = getFileIcon(upload.name);
                return (
                  <div
                    key={upload.id}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <FileIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {upload.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(upload.size)}
                      </p>
                    </div>
                    <Badge variant="success" size="sm">Ready</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
