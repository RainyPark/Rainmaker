export enum CVFQuadrant {
  Collaborate = '휴먼형', // Collaborate
  Create = '비전형',     // Create
  Compete = '실행형',      // Compete
  Control = '분석형',      // Control
}

export interface ReadinessQuestion {
  id: number;
  text: string;
  category: string;
}

export interface StyleQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    quadrant: CVFQuadrant;
  }[];
}

export type CVFScores = {
  [key in CVFQuadrant]: number;
};

export type ReadinessAnswers = {
  [key: number]: number; // question index -> likert score
};

export type ReadinessScores = {
  [key: string]: number; // category -> score
};

export type StyleAnswers = {
  [key: number]: number; // question index -> option index (0-3)
};

export interface SurveyAnswers {
  readiness: ReadinessAnswers;
  style: StyleAnswers;
}