import React, { useState, useMemo } from 'react';
import { readinessQuestions, styleQuestions, LIKERT_SCALE } from '../constants';
import type { SurveyAnswers, ReadinessAnswers, StyleAnswers } from '../types';

interface SurveyScreenProps {
  onSubmit: (answers: SurveyAnswers) => void;
}

const SurveyScreen: React.FC<SurveyScreenProps> = ({ onSubmit }) => {
  const [part, setPart] = useState<'readiness' | 'style'>('readiness');
  const [readinessAnswers, setReadinessAnswers] = useState<ReadinessAnswers>({});
  const [styleAnswers, setStyleAnswers] = useState<StyleAnswers>({});

  const handleReadinessAnswerChange = (questionIndex: number, value: number) => {
    setReadinessAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleStyleAnswerChange = (questionIndex: number, optionIndex: number) => {
    setStyleAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const totalReadinessQuestions = readinessQuestions.length;
  const totalStyleQuestions = styleQuestions.length;
  const totalQuestions = totalReadinessQuestions + totalStyleQuestions;

  const answeredReadinessCount = useMemo(() => Object.keys(readinessAnswers).length, [readinessAnswers]);
  const answeredStyleCount = useMemo(() => Object.keys(styleAnswers).length, [styleAnswers]);

  const answeredCount = answeredReadinessCount + answeredStyleCount;
  const progress = (answeredCount / totalQuestions) * 100;

  const isReadinessComplete = answeredReadinessCount === totalReadinessQuestions;
  const isStyleComplete = answeredStyleCount === totalStyleQuestions;
  
  const handleNextPart = () => {
    if (isReadinessComplete) {
      window.scrollTo(0, 0);
      setPart('style');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadinessComplete && isStyleComplete) {
      onSubmit({ readiness: readinessAnswers, style: styleAnswers });
    }
  };

  const renderReadinessPart = () => (
    <div className="space-y-8">
      {readinessQuestions.map((q, index) => (
        <div key={q.id} className="border-b border-gray-200 pb-6">
          <p className="text-lg font-semibold text-gray-800 mb-1">
            {index + 1}. {q.text}
          </p>
          <p className="text-sm text-gray-500 mb-4">[{q.category}]</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {LIKERT_SCALE.map(option => (
              <label
                key={option.value}
                className={`flex flex-col items-center justify-center p-1 rounded-lg cursor-pointer transition-all duration-200 text-center border-2 aspect-square ${
                  readinessAnswers[index] === option.value
                    ? 'bg-brand-accent bg-opacity-20 border-brand-primary text-brand-primary font-semibold'
                    : 'bg-gray-50 border-gray-200 hover:border-brand-accent text-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name={`readiness-q-${q.id}`}
                  value={option.value}
                  checked={readinessAnswers[index] === option.value}
                  onChange={() => handleReadinessAnswerChange(index, option.value)}
                  className="sr-only"
                />
                <span className="text-xs sm:text-sm font-medium">{option.label}</span>
                <span className="text-xs text-gray-500 mt-1">({option.value}점)</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={handleNextPart}
          disabled={!isReadinessComplete}
          className="px-12 py-4 bg-brand-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-brand-dark transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-brand-accent"
        >
          다음 단계로
        </button>
        {!isReadinessComplete && (
            <p className="mt-4 text-sm text-red-600">모든 문항에 답변해주세요. ({answeredReadinessCount}/{totalReadinessQuestions})</p>
        )}
      </div>
    </div>
  );

  const renderStylePart = () => (
    <form onSubmit={handleSubmit}>
        <div className="space-y-8">
        {styleQuestions.map((q, index) => (
            <div key={q.id} className="border-b border-gray-200 pb-6">
            <p className="text-lg font-semibold text-gray-800 mb-4">
                {index + 1}. {q.text}
            </p>
            <div className="space-y-3">
                {q.options.map((option, optionIndex) => (
                <label
                    key={optionIndex}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                    styleAnswers[index] === optionIndex
                        ? 'bg-brand-accent bg-opacity-20 border-brand-primary text-brand-primary'
                        : 'bg-gray-50 border-gray-200 hover:border-brand-accent'
                    }`}
                >
                    <input
                    type="radio"
                    name={`style-q-${q.id}`}
                    value={optionIndex}
                    checked={styleAnswers[index] === optionIndex}
                    onChange={() => handleStyleAnswerChange(index, optionIndex)}
                    className="h-5 w-5 text-brand-primary focus:ring-brand-accent border-gray-300"
                    />
                    <span className="ml-4 text-base text-gray-700">{option.text}</span>
                </label>
                ))}
            </div>
            </div>
        ))}
        </div>
        <div className="mt-10 text-center">
            <button
                type="submit"
                disabled={!isStyleComplete}
                className="px-12 py-4 bg-brand-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-brand-dark transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-brand-accent"
            >
                결과 분석하기
            </button>
            {!isStyleComplete && (
                <p className="mt-4 text-sm text-red-600">모든 문항에 답변해주세요. ({answeredStyleCount}/{totalStyleQuestions})</p>
            )}
        </div>
    </form>
  );


  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-brand-dark mb-2">
            {part === 'readiness' ? '1단계: 리더십 준비도 진단' : '2단계: 리더십 유형 진단'}
        </h1>
        <p className="text-gray-600 mb-6">
            {part === 'readiness' 
             ? '각 문항을 읽고 자신에게 가장 가깝다고 생각하는 정도를 선택해주세요.' 
             : '각 상황에서 당신이 가장 선호하는 행동을 하나만 선택해주세요.'}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div
            className="bg-brand-primary h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
           <span className="text-xs text-gray-600 float-right mt-1">{answeredCount} / {totalQuestions}</span>
        </div>
        
        {part === 'readiness' ? renderReadinessPart() : renderStylePart()}
      </div>
    </div>
  );
};

export default SurveyScreen;