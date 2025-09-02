import React, { useState, useCallback, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SurveyScreen from './components/SurveyScreen';
import ResultsScreen from './components/ResultsScreen';
import LoadingSpinner from './components/LoadingSpinner';
import { getLeadershipFeedback } from './services/geminiService';
import { styleQuestions } from './constants';
import { CVFQuadrant, CVFScores } from './types';
import type { SurveyAnswers, ReadinessAnswers } from './types';

type AppState = 'welcome' | 'survey' | 'loading' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [scores, setScores] = useState<CVFScores | null>(null);
  const [readinessAnswers, setReadinessAnswers] = useState<ReadinessAnswers | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resultsData = params.get('results');

    if (resultsData) {
      try {
        const decodedData = decodeURIComponent(escape(atob(resultsData)));
        const parsedData = JSON.parse(decodedData);

        if (parsedData.scores && parsedData.readinessAnswers && parsedData.aiFeedback) {
          setScores(parsedData.scores);
          setReadinessAnswers(parsedData.readinessAnswers);
          setAiFeedback(parsedData.aiFeedback);
          setAppState('results');
        }
      } catch (e) {
        console.error("Failed to parse results from URL", e);
        window.history.replaceState({}, document.title, window.location.pathname);
        setAppState('welcome');
      }
    }
  }, []);

  const calculateScores = (answers: SurveyAnswers): { readinessScore: number, cvfScores: CVFScores } => {
    // Calculate readiness score
    const readinessScore = Object.values(answers.readiness).reduce((sum, val) => sum + val, 0);

    // Calculate CVF scores from style answers
    const initialCvfScores: CVFScores = {
      [CVFQuadrant.Collaborate]: 0,
      [CVFQuadrant.Create]: 0,
      [CVFQuadrant.Compete]: 0,
      [CVFQuadrant.Control]: 0,
    };
    
    styleQuestions.forEach((q, index) => {
      const selectedOptionIndex = answers.style[index];
      if (selectedOptionIndex !== undefined) {
        const selectedQuadrant = q.options[selectedOptionIndex].quadrant;
        initialCvfScores[selectedQuadrant]++;
      }
    });

    return { readinessScore, cvfScores: initialCvfScores };
  };

  const handleStartSurvey = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
    setAppState('survey');
  };

  const handleSubmitSurvey = useCallback(async (answers: SurveyAnswers) => {
    setAppState('loading');
    try {
      const { readinessScore, cvfScores } = calculateScores(answers);
      setScores(cvfScores);
      setReadinessAnswers(answers.readiness);

      const feedback = await getLeadershipFeedback(cvfScores, readinessScore);
      setAiFeedback(feedback);
      
      setAppState('results');
    } catch (error) {
      console.error("Error getting leadership feedback:", error);
      alert("AI 피드백을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setAppState('survey'); // Go back to survey on error
    }
  }, []);

  const handleRestart = () => {
    setScores(null);
    setReadinessAnswers(null);
    setAiFeedback('');
    window.history.replaceState({}, document.title, window.location.pathname);
    setAppState('welcome');
  };

  const renderContent = () => {
    switch (appState) {
      case 'survey':
        return <SurveyScreen onSubmit={handleSubmitSurvey} />;
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <LoadingSpinner />
            <h2 className="mt-6 text-2xl font-semibold text-brand-dark">AI가 리더십 프로파일을 분석중입니다...</h2>
            <p className="mt-2 text-gray-600">잠시만 기다려주세요.</p>
          </div>
        );
      case 'results':
        if (scores && aiFeedback && readinessAnswers) {
          return <ResultsScreen scores={scores} readinessAnswers={readinessAnswers} aiFeedback={aiFeedback} onRestart={handleRestart} />;
        }
        // Fallback if results are not ready
        return <WelcomeScreen onStart={handleStartSurvey} />;
      case 'welcome':
      default:
        return <WelcomeScreen onStart={handleStartSurvey} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans antialiased">
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;