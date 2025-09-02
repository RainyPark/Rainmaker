import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { ReadinessScores } from '../types';

interface ReadinessRadarChartComponentProps {
  scores: ReadinessScores;
}

const ReadinessRadarChartComponent: React.FC<ReadinessRadarChartComponentProps> = ({ scores }) => {
  const data = Object.keys(scores).map(category => ({
    subject: category,
    score: scores[category],
    fullMark: 5,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <defs>
          <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#20c997" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#52c41a" stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#172b4d', fontSize: 14 }} />
        <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
        <Radar name="리더십 준비도" dataKey="score" stroke="#20c997" fill="url(#colorReadiness)" fillOpacity={0.8} />
        <Legend />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
          labelStyle={{ color: '#172b4d', fontWeight: 'bold' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default ReadinessRadarChartComponent;