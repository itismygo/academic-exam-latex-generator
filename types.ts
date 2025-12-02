export interface ExamSection {
  id: string;
  title: string; // e.g. "一、选择题 (每题 3 分，共 30 分)"
  content: string; // Placeholder or instructions
}

export interface ExamConfig {
  university: string;
  yearRange: string;
  semester: string;
  courseName: string;
  courseCode: string;
  examDuration: string;
  paperType: 'A' | 'B';
  examMode: string; // Open/Closed
  college: string;
  major: string;
  questionCount: number; // Number of questions in the score table
  sections: ExamSection[];
}

export interface GeneratedFiles {
  cls: string;
  tex: string;
}

export enum TabView {
  CONFIG = 'CONFIG',
  PREVIEW = 'PREVIEW'
}

export type PreviewMode = 'VISUAL' | 'CODE';