import React, { useState } from 'react';
import { generateExamQuestions } from '../services/geminiService';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';

interface AiQuestionGeneratorProps {
  courseName: string;
}

const AiQuestionGenerator: React.FC<AiQuestionGeneratorProps> = ({ courseName }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(3);
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    const result = await generateExamQuestions(courseName, topic, difficulty, count);
    setGeneratedContent(result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">AI Question Generator</h2>
          <p className="text-xs text-gray-500">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Keywords</label>
          <input
            type="text"
            placeholder="e.g. Eigenvalues, Linear Regression, Thermodynamics"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none bg-white"
          >
            <option value="Easy">Easy (Concept check)</option>
            <option value="Medium">Medium (Standard)</option>
            <option value="Hard">Hard (Complex Application)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Question Count</label>
          <input
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium transition ${
              loading || !topic
                ? 'bg-purple-300 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? 'Generating...' : 'Generate LaTeX'}
          </button>
        </div>
      </div>

      <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50 flex flex-col overflow-hidden relative">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
          <span className="text-xs font-mono text-gray-500">Output Preview</span>
          <button
            onClick={handleCopy}
            disabled={!generatedContent}
            className="flex items-center gap-1 text-xs text-gray-600 hover:text-purple-600 disabled:opacity-50"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea
          readOnly
          value={generatedContent}
          placeholder="Generated LaTeX questions will appear here..."
          className="flex-1 w-full p-4 bg-gray-50 text-gray-800 font-mono text-sm resize-none outline-none"
        />
      </div>
    </div>
  );
};

export default AiQuestionGenerator;
