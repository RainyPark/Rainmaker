import React from 'react';
import { ChartBarIcon, LightBulbIcon, UsersIcon } from './icons';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="max-w-3xl pt-8">
        <div className="text-lg md:text-xl text-gray-700 space-y-2 text-center bg-white p-8 rounded-lg shadow-md">
          <p>JB우리캐피탈의 리더후보자를 대상으로 개발한 문항입니다.</p>
          <p>리더십 준비상태를 확인하는 문항과 리더십 유형을 파악하기 위한 문항으로 구조화되어 있습니다.</p>
          <p>본 문항은 조직개발 전문가그룹 플랜비디자인이 개발하였습니다.</p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <ChartBarIcon className="h-12 w-12 text-brand-primary" />
            <h3 className="mt-4 text-lg font-semibold text-brand-dark">객관적 진단</h3>
            <p className="mt-1 text-gray-600">당신의 리더십 준비도와 리더십 유형을 분석해 드립니다.</p>
          </div>
          <div className="flex flex-col items-center">
            <LightBulbIcon className="h-12 w-12 text-brand-primary" />
            <h3 className="mt-4 text-lg font-semibold text-brand-dark">AI 개인 코칭</h3>
            <p className="mt-1 text-gray-600">강점과 약점을 파악하고, 성장을 위한 맞춤형 행동 계획을 받으세요.</p>
          </div>
          <div className="flex flex-col items-center">
            <UsersIcon className="h-12 w-12 text-brand-primary" />
            <h3 className="mt-4 text-lg font-semibold text-brand-dark">성장 동기 부여</h3>
            <p className="mt-1 text-gray-600">자신을 더 깊이 이해하고, 팀을 이끄는 더 나은 리더로 나아가세요.</p>
          </div>
        </div>
        
        <button
          onClick={onStart}
          className="mt-12 px-10 py-4 bg-brand-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-brand-dark transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-brand-accent"
        >
          진단 시작하기
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;