
import React, { useState } from 'react';
import { GeneratedFiles } from '../types';
import { Copy, Download, FileCode, FileText, Check } from 'lucide-react';

interface CodePreviewProps {
  files: GeneratedFiles;
}

const CodePreview: React.FC<CodePreviewProps> = ({ files }) => {
  const [activeTab, setActiveTab] = useState<'cls' | 'tex'>('tex');
  const [copied, setCopied] = useState(false);

  const activeContent = activeTab === 'cls' ? files.cls : files.tex;
  const fileName = activeTab === 'cls' ? 'examtemplate.cls' : 'main.tex';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([activeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-300">
      {/* Tab Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333] shrink-0">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('tex')}
            className={`flex items-center px-3 py-1.5 text-xs rounded transition-colors ${
              activeTab === 'tex'
                ? 'bg-[#37373d] text-white shadow-sm'
                : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-white'
            }`}
          >
            <FileText className="w-3 h-3 mr-2 text-blue-400" />
            main.tex
          </button>
          <button
            onClick={() => setActiveTab('cls')}
            className={`flex items-center px-3 py-1.5 text-xs rounded transition-colors ${
              activeTab === 'cls'
                ? 'bg-[#37373d] text-white shadow-sm'
                : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-white'
            }`}
          >
            <FileCode className="w-3 h-3 mr-2 text-yellow-400" />
            examtemplate.cls
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#37373d] rounded transition"
            title="Copy to Clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#37373d] rounded transition"
            title="Download File"
          >
            <Download className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 relative overflow-hidden">
        <textarea
          readOnly
          value={activeContent}
          className="w-full h-full p-4 bg-[#1e1e1e] text-gray-300 font-mono text-xs md:text-sm resize-none outline-none code-scroll leading-relaxed"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default CodePreview;
