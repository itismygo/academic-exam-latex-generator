import React from 'react';
import { ExamConfig, ExamSection } from '../types';
import { Save, Plus, Trash2, List } from 'lucide-react';

interface ExamFormProps {
  config: ExamConfig;
  setConfig: React.Dispatch<React.SetStateAction<ExamConfig>>;
}

const ExamForm: React.FC<ExamFormProps> = ({ config, setConfig }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (id: string, field: keyof ExamSection, value: string) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === id ? { ...sec, [field]: value } : sec
      ),
    }));
  };

  const addSection = () => {
    const newId = (Math.max(...config.sections.map((s) => parseInt(s.id) || 0), 0) + 1).toString();
    setConfig((prev) => ({
      ...prev,
      sections: [...prev.sections, { id: newId, title: '新题型 (共 X 分)', content: '' }],
    }));
  };

  const removeSection = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id),
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Save className="w-5 h-5 text-blue-600" />
            Exam Config
          </h2>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Auto-updates preview
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Section 1: University Info */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 font-semibold border-b pb-1">University Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
              <input
                type="text"
                name="university"
                value={config.university}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">College/Dept</label>
              <input
                type="text"
                name="college"
                value={config.college}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Time & Subject */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 font-semibold border-b pb-1">Course & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year Range</label>
              <input
                type="text"
                name="yearRange"
                placeholder="2024-2025"
                value={config.yearRange}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <select
                name="semester"
                value={config.semester}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="一">First (一)</option>
                <option value="二">Second (二)</option>
                <option value="三">Third (三)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
              <input
                type="text"
                name="courseName"
                value={config.courseName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
              <input
                type="text"
                name="courseCode"
                value={config.courseCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade/Major</label>
              <input
                type="text"
                name="major"
                placeholder="e.g. 2022 CS"
                value={config.major}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Exam Metadata */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wide text-gray-500 font-semibold border-b pb-1">Exam Metadata</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paper Type</label>
              <select
                name="paperType"
                value={config.paperType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
              <input
                type="number"
                name="examDuration"
                value={config.examDuration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
              <input
                type="text"
                name="examMode"
                value={config.examMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Score Questions</label>
              <input
                type="number"
                name="questionCount"
                min={1}
                max={20}
                value={config.questionCount}
                onChange={(e) => setConfig(prev => ({ ...prev, questionCount: parseInt(e.target.value) || 9 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Structure Customization */}
        <div className="space-y-4 pb-4">
          <div className="flex items-center justify-between border-b pb-1">
            <h3 className="text-sm uppercase tracking-wide text-gray-500 font-semibold">Exam Structure</h3>
            <button
              onClick={addSection}
              className="text-xs flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition"
            >
              <Plus className="w-3 h-3" /> Add Section
            </button>
          </div>
          
          <div className="space-y-3">
            {config.sections.map((section, index) => (
              <div key={section.id} className="flex gap-2 items-start bg-gray-50 p-3 rounded-md border border-gray-100">
                <div className="pt-2 text-gray-400">
                  <List className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                    className="w-full px-2 py-1 text-sm border-b border-transparent bg-transparent focus:border-blue-400 focus:bg-white focus:ring-0 outline-none font-medium text-gray-800 placeholder-gray-400"
                    placeholder="Section Title (e.g., 一、选择题)"
                  />
                  <input
                    type="text"
                    value={section.content}
                    onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                    className="w-full px-2 py-1 text-xs border-b border-transparent bg-transparent focus:border-blue-400 focus:bg-white focus:ring-0 outline-none text-gray-500 placeholder-gray-300"
                    placeholder="Instructions or notes"
                  />
                </div>
                <button
                  onClick={() => removeSection(section.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition"
                  title="Remove Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {config.sections.length === 0 && (
              <div className="text-center text-sm text-gray-400 py-4 italic">
                No sections added. Click "Add Section" to start.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamForm;