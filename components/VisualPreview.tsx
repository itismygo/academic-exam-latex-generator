
import React from 'react';
import { ExamConfig } from '../types';

interface VisualPreviewProps {
  config: ExamConfig;
}

const VisualPreview: React.FC<VisualPreviewProps> = ({ config }) => {
  // Helper for dynamic Chinese numbers
  const toChineseNum = (num: number): string => {
    const chars = ['','一','二','三','四','五','六','七','八','九','十'];
    if (num <= 10) return chars[num];
    if (num < 20) return '十' + (num % 10 === 0 ? '' : chars[num % 10]);
    if (num === 20) return '二十';
    return num.toString();
  };

  const qCount = Math.max(1, Math.min(20, config.questionCount || 9));

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-8 flex justify-center bg-gray-200/50">
      {/* A4 Paper Simulation */}
      <div 
        className="bg-white shadow-xl p-[2.5cm] min-h-[29.7cm] w-[21cm] text-black shrink-0 relative box-border"
        style={{ fontFamily: '"Times New Roman", "SimSun", serif' }}
      >
        {/* Header Content */}
        
        {/* Warning Line */}
        <div className="text-center text-[10.5pt] mb-2 leading-tight">
          <div>诚信关于个人一生，公平竞争赢得尊重。</div>
          <div className="border-b-2 border-black font-bold mt-1 inline-block w-full whitespace-nowrap overflow-hidden text-ellipsis">
            以下行为是严重作弊行为，学校将给予留校察看或开除学籍处分：1. 替他人考试或由他人替考；2. 通讯工具作弊；3. 团伙作弊。
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-1 mt-[1.2em]">
          <h1 className="text-[16pt] font-bold font-sans">
            {config.university} <span className="border-b border-black px-1">{config.yearRange}</span> 学年第 <span className="border-b border-black px-1"> {config.semester} </span> 学期课程考试试卷 (回忆)
          </h1>
        </div>

        {/* Meta Data Grid */}
        <div className="text-[11pt] space-y-[0.2cm] mt-[1em]">
          {/* Row 1: Underlines 5.5cm */}
          <div className="flex justify-between items-end">
            <div className="flex-1 flex items-end">
              <span className="whitespace-nowrap mr-[0.5em]">考试科目</span>
              <div className="border-b border-black flex-1 text-center font-bold" style={{ width: '5.5cm', flex: 'none' }}>{config.courseName}</div>
              <div className="flex-1"></div> {/* Filler */}
            </div>
            <div className="flex-1 flex items-end justify-end">
               <div className="flex-1"></div>
               <span className="whitespace-nowrap mr-[0.5em]">试卷类型</span>
               <div className="border-b border-black text-center font-bold" style={{ width: '5.5cm' }}>{config.paperType}</div>
            </div>
          </div>

          {/* Row 2: Underlines 2cm */}
          <div className="flex justify-between items-end">
            <div className="flex items-end flex-1">
              <span className="whitespace-nowrap mr-[0.5em]">课程代码</span>
              <div className="border-b border-black text-center font-bold" style={{ width: '2cm' }}>{config.courseCode}</div>
              <div className="flex-1"></div>
            </div>
            <div className="flex items-end flex-1 justify-center">
              <span className="whitespace-nowrap mr-[0.5em]">考试时长</span>
              <div className="border-b border-black text-center font-bold" style={{ width: '2cm' }}>{config.examDuration}</div>
              <span className="ml-1">分钟</span>
            </div>
            <div className="flex items-end flex-1 justify-end">
              <span className="whitespace-nowrap mr-[0.5em]">考试方式</span>
              <div className="border-b border-black text-center font-bold" style={{ width: '2cm' }}>{config.examMode}</div>
            </div>
          </div>

          {/* Row 3: Underlines 5cm */}
          <div className="flex justify-between items-end">
            <div className="flex items-end flex-1">
              <span className="whitespace-nowrap mr-[0.5em]">开课学院</span>
              <div className="border-b border-black text-center font-bold" style={{ width: '5cm' }}>{config.college}</div>
              <div className="flex-1"></div>
            </div>
            <div className="flex items-end flex-1 justify-end">
              <span className="whitespace-nowrap mr-[0.5em]">年级专业</span>
              <div className="border-b border-black text-center font-bold" style={{ width: '5cm' }}>{config.major}</div>
            </div>
          </div>

          {/* Row 4: Underlines 2.2cm */}
          <div className="flex justify-between items-end">
             <div className="flex items-end flex-1">
              <span className="whitespace-nowrap mr-[0.5em]">学院</span>
              <div className="border-b border-black text-center font-bold" style={{ width: '2.2cm' }}></div>
              <div className="flex-1"></div>
            </div>
            <div className="flex items-end flex-1 justify-center">
               <span className="whitespace-nowrap mr-[0.5em]">班级</span>
              <div className="border-b border-black text-center font-bold" style={{ width: '2.2cm' }}></div>
            </div>
             <div className="flex items-end flex-1 justify-center">
               <span className="whitespace-nowrap mr-[0.5em]">姓名</span>
              <div className="border-b border-black text-center font-bold" style={{ width: '2.2cm' }}></div>
            </div>
             <div className="flex items-end flex-1 justify-end">
               <span className="whitespace-nowrap mr-[0.5em]">学号</span>
              <div className="border-b border-black text-center font-bold" style={{ width: '2.2cm' }}></div>
            </div>
          </div>
        </div>

        {/* Score Table */}
        <div className="mt-[0.15cm] w-full">
           <table className="w-full border-collapse border border-black text-center text-[11pt]">
             <tbody>
               <tr className="h-[0.7cm]">
                 <td className="border border-black p-1 w-[8%] align-middle">题号</td>
                 {Array.from({ length: qCount }).map((_, i) => (
                    <td key={i} className="border border-black p-1 align-middle">{toChineseNum(i + 1)}</td>
                 ))}
                 <td className="border border-black p-1 w-[8%] align-middle">总分</td>
               </tr>
               <tr className="h-[0.7cm]">
                 <td className="border border-black p-1 align-middle">得分</td>
                 {Array.from({ length: qCount }).map((_, i) => (
                    <td key={i} className="border border-black p-1 align-middle"></td>
                 ))}
                 <td className="border border-black p-1 align-middle"></td>
               </tr>
                <tr className="h-[0.7cm]">
                 <td className="border border-black p-1 align-middle">阅卷人</td>
                 {Array.from({ length: qCount }).map((_, i) => (
                    <td key={i} className="border border-black p-1 align-middle"></td>
                 ))}
                 <td className="border border-black p-1 align-middle"></td>
               </tr>
             </tbody>
           </table>
        </div>

        {/* Pledge Box */}
        <div className="mt-[0.2cm] border-[2px] border-black p-[6pt] text-[10.5pt] font-bold leading-tight">
           <div className="indent-[1em] mb-1">考生承诺：</div>
           {/* Simulate 'wide=0pt' by putting number and text in the same block but text starts at margin */}
           {/* Simple approach: Number followed by text, block display. */}
           <div className="space-y-0">
             <div>1. 未携带通信工具及其他各类带有拍照、摄像、接收、发送、储存等功能的设备（包括但不限于手机、智能手表、智能眼镜、平板电脑、无线耳机）或关机并将其置于监考老师指定位置；</div>
             <div>2. 已按要求清理干净整个座位（包括考生邻座）桌面和抽屉里的所有物品（无论是否属于考生本人）；</div>
             <div>3. 已知晓并理解《{config.university}学生违纪处分管理规定》等与考试相关规定，承诺在考试中自觉遵守以上规定，服从监考教师的安排，自觉遵守考场纪律，诚信考试，不违规、不作弊。如有违反，自愿按《{config.university}学生违纪处分管理规定》相关条款接受处理。</div>
           </div>
           
           <div className="flex justify-end items-end mt-[5pt] mb-[5pt]">
             <span className="mr-2">考生签名：</span>
             <div className="border-b border-black w-[3cm]"></div>
           </div>
        </div>

        {/* Exam Sections Preview */}
        <div className="mt-8 space-y-6">
          {config.sections.map((section, idx) => (
             <div key={section.id}>
               <h3 className="font-bold text-lg mb-2">{section.title}</h3>
               <p className="mb-4 text-sm">{section.content}</p>
               <div className="pl-4">
                 <p className="mb-8">题目 {idx + 1}.1 (题目内容...)</p>
               </div>
             </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VisualPreview;
