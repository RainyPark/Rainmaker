import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CVFQuadrant } from '../types';
import type { CVFScores } from '../types';
import { MAX_SCORE_PER_QUADRANT } from '../constants';

interface RadarChartComponentProps {
  scores: CVFScores;
}

const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ scores }) => {
  const data = Object.values(CVFQuadrant).map(quadrant => ({
    subject: quadrant,
    score: scores[quadrant],
    fullMark: MAX_SCORE_PER_QUADRANT,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0052cc" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#4c9aff" stopOpacity={0.6}/>
          </linearGradient>
        </defs>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#172b4d', fontSize: 16 }} />
        <PolarRadiusAxis angle={30} domain={[0, MAX_SCORE_PER_QUADRANT]} tick={false} axisLine={false} />
        <Radar name="나의 리더십" dataKey="score" stroke="#0052cc" fill="url(#colorScore)" fillOpacity={0.8} />
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

export default RadarChartComponent;
