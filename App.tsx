
import React, { useState, useMemo } from 'react';
import { ExamConfig, PreviewMode } from './types';
import { generateLatexFiles } from './services/latexGenerator';
import ExamForm from './components/ExamForm';
import CodePreview from './components/CodePreview';
import VisualPreview from './components/VisualPreview';
import { FileCode, Eye, Settings, FileText } from 'lucide-react';

const App: React.FC = () => {
  // Mobile view state
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  // Desktop right-panel state
  const [previewMode, setPreviewMode] = useState<PreviewMode>('VISUAL');
  
  const [config, setConfig] = useState<ExamConfig>({
    university: '某某大学',
    yearRange: '20XX-20XX',
    semester: '一',
    courseName: '课程名称',
    courseCode: 'CODE123',
    examDuration: '100',
    paperType: 'A',
    examMode: '闭卷',
    college: '某某学院',
    major: '年级专业',
    questionCount: 9, // Default to 9 questions
    sections: [
      { id: '1', title: '一、选择题 (每题 3 分，共 30 分)', content: '请在选项中选择唯一正确的答案。' },
      { id: '2', title: '二、填空题 (每题 4 分，共 20 分)', content: '请将答案填写在横线上。' },
      { id: '3', title: '三、计算题 (共 50 分)', content: '要求写出必要的解题步骤。' },
    ]
  });

  const generatedFiles = useMemo(() => generateLatexFiles(config), [config]);

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">ExamSmith</h1>
            <p className="text-xs text-gray-500">LaTeX Template Generator</p>
          </div>
        </div>
        
        {/* Mobile View Toggle */}
        <div className="lg:hidden flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setShowMobilePreview(false)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
              !showMobilePreview
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Config
          </button>
          <button
             onClick={() => setShowMobilePreview(true)}
             className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
               showMobilePreview
                 ? 'bg-white text-blue-600 shadow-sm' 
                 : 'text-gray-600 hover:text-gray-900'
             }`}
           >
             <Eye className="w-4 h-4 mr-2" />
             Preview
           </button>
        </div>
      </header>

      {/* Main Content Area - Uses Flexbox to ensure scrolling works properly */}
      <main className="flex-1 flex overflow-hidden">
        <div className="container mx-auto h-full p-4 lg:p-6 max-w-[1600px] flex gap-6">
          
          {/* Left Column: Configuration Form */}
          <div className={`flex-1 flex flex-col min-w-0 h-full transition-opacity duration-300 ${showMobilePreview ? 'hidden lg:flex' : 'flex'}`}>
             <ExamForm config={config} setConfig={setConfig} />
          </div>

          {/* Right Column: Preview (Visual or Code) */}
          <div className={`flex-1 flex flex-col min-w-0 h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${!showMobilePreview ? 'hidden lg:flex' : 'flex'}`}>
            
            {/* Preview Tabs */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 shrink-0">
              <div className="flex space-x-1 bg-gray-200 p-1 rounded-md">
                <button
                  onClick={() => setPreviewMode('VISUAL')}
                  className={`flex items-center px-3 py-1.5 text-sm font-medium rounded transition-all ${
                    previewMode === 'VISUAL'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Visual Preview
                </button>
                <button
                  onClick={() => setPreviewMode('CODE')}
                  className={`flex items-center px-3 py-1.5 text-sm font-medium rounded transition-all ${
                    previewMode === 'CODE'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileCode className="w-4 h-4 mr-2" />
                  Code & LaTeX
                </button>
              </div>
            </div>

            {/* Preview Content Area - Independent Scroll */}
            <div className="flex-1 overflow-hidden relative bg-gray-100/50">
              {previewMode === 'VISUAL' ? (
                <VisualPreview config={config} />
              ) : (
                <CodePreview files={generatedFiles} />
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
