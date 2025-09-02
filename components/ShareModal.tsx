import React, { useState, useEffect } from 'react';
import { EmailIcon, ClipboardIcon, CloseIcon } from './icons';
import type { CVFScores, ReadinessAnswers } from '../types';

interface ShareModalProps {
  onClose: () => void;
  scores: CVFScores;
  readinessAnswers: ReadinessAnswers;
  aiFeedback: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose, scores, readinessAnswers, aiFeedback }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    try {
      const resultsData = {
        scores,
        readinessAnswers,
        aiFeedback,
      };
      const jsonString = JSON.stringify(resultsData);
      const encodedData = btoa(unescape(encodeURIComponent(jsonString)));
      
      const newUrl = `${window.location.origin}${window.location.pathname}?results=${encodedData}`;
      setShareUrl(newUrl);
    } catch (error) {
      console.error("Failed to create shareable link:", error);
      setShareUrl(`${window.location.origin}${window.location.pathname}`);
    }
  }, [scores, readinessAnswers, aiFeedback]);


  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("리더십 프로파일러 진단 결과");
    const body = encodeURIComponent(`저의 리더십 진단 결과입니다. 링크를 클릭해 확인해보세요!\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="share-modal-title">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full m-4 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Close modal">
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 id="share-modal-title" className="text-2xl font-bold text-brand-dark mb-4">결과 공유하기</h2>
        <p className="text-gray-600 mb-6">아래 링크를 통해 다른 사람에게 나의 진단 결과를 공유할 수 있습니다.</p>
        
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={shareUrl} 
            readOnly 
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-accent"
            aria-label="Shareable URL for results"
          />
          <button 
            onClick={handleCopy}
            className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-dark transition-colors flex items-center"
          >
            <ClipboardIcon className="h-5 w-5 mr-2" />
            {copied ? '복사됨!' : '복사'}
          </button>
        </div>

        <button 
          onClick={handleEmailShare}
          className="mt-4 w-full px-4 py-3 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
        >
          <EmailIcon className="h-5 w-5 mr-3" />
          이메일로 공유하기
        </button>
      </div>
    </div>
  );
};

export default ShareModal;