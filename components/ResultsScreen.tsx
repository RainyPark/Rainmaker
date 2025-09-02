import React, { useRef, useState, useMemo } from 'react';
import RadarChartComponent from './RadarChartComponent';
import ReadinessRadarChartComponent from './ReadinessRadarChartComponent';
import ShareModal from './ShareModal';
import { ShareIcon, RefreshIcon, DownloadIcon } from './icons';
import type { CVFScores, ReadinessAnswers, ReadinessScores } from '../types';
import { readinessQuestions } from '../constants';

interface ResultsScreenProps {
  scores: CVFScores;
  readinessAnswers: ReadinessAnswers;
  aiFeedback: string;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ scores, readinessAnswers, aiFeedback, onRestart }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const processedReadinessScores: ReadinessScores = useMemo(() => {
    const readinessScores: ReadinessScores = {};
    readinessQuestions.forEach((q, index) => {
      const answer = readinessAnswers[index] || 3; // Default to 3 if not answered
      // Invert score because questions are negative. 1(best) -> 5, 5(worst) -> 1.
      const invertedScore = 6 - answer;
      readinessScores[q.category] = invertedScore;
    });
    return readinessScores;
  }, [readinessAnswers]);

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleDownloadPdf = () => {
    const input = resultRef.current;
    if (!input || !(window as any).html2canvas || !(window as any).jspdf) {
      alert("PDF를 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error("PDF generation libraries not found.");
      return;
    }

    const actionButtons = input.querySelector('#action-buttons');
    if (actionButtons) {
        (actionButtons as HTMLElement).style.visibility = 'hidden';
    }

    (window as any).html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#f4f5f7',
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
    }).then((canvas: HTMLCanvasElement) => {
        if (actionButtons) {
            (actionButtons as HTMLElement).style.visibility = 'visible';
        }
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = (window as any).jspdf;
        
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('leadership_profile_report.pdf');
    }).catch((err: any) => {
         if (actionButtons) {
            (actionButtons as HTMLElement).style.visibility = 'visible';
        }
        alert("PDF 생성에 실패했습니다.");
        console.error("Error generating PDF:", err);
    });
  };

  const formatFeedback = (text: string) => {
    return text
      .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-brand-dark mt-6 mb-3">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-brand-secondary mt-8 mb-4 border-b-2 border-brand-primary pb-2">$1</h2>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-brand-dark">$1</strong>')
      .replace(/\* (.*)/g, '<li class="mb-2 ml-5 list-disc">$1</li>')
      .replace(/(\r\n|\n|\r)/gm, '<br>')
      .replace(/<br><li/g, '<li') // Fix extra breaks before lists
      .replace(/<\/li><br>/g, '</li>'); 
  };
  
  return (
    <>
      {isShareModalOpen && (
        <ShareModal 
          onClose={() => setIsShareModalOpen(false)} 
          scores={scores}
          readinessAnswers={readinessAnswers}
          aiFeedback={aiFeedback}
        />
      )}
      <div className="max-w-6xl mx-auto" ref={resultRef}>
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-brand-dark">리더십 진단 결과</h1>
            <p className="mt-2 text-lg text-gray-600">당신의 리더십 프로파일과 AI 코칭 피드백입니다.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-brand-secondary text-center mb-4">리더십 준비도</h2>
                    <div className="w-full h-80 md:h-96">
                        <ReadinessRadarChartComponent scores={processedReadinessScores} />
                    </div>
                </div>
                 <div>
                    <h2 className="text-2xl font-bold text-brand-secondary text-center mb-4">리더십 유형</h2>
                    <div className="w-full h-80 md:h-96">
                        <RadarChartComponent scores={scores} />
                    </div>
                </div>
            </div>
            
            <div className="prose prose-lg max-w-none bg-brand-light p-6 rounded-lg lg:mt-[52px]">
              <div dangerouslySetInnerHTML={{ __html: formatFeedback(aiFeedback) }} />
            </div>
          </div>

          <div id="action-buttons" className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleShare}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              <ShareIcon className="h-5 w-5" />
              결과 공유하기
            </button>
            <button
                onClick={handleDownloadPdf}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
                <DownloadIcon className="h-5 w-5" />
                PDF로 다운로드
            </button>
            <button
              onClick={onRestart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-brand-dark transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-brand-accent"
            >
              <RefreshIcon className="h-5 w-5" />
              다시 진단하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsScreen;