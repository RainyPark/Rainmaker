import { GoogleGenAI } from "@google/genai";
import { CVFScores } from '../types';
import { MAX_SCORE_PER_QUADRANT, MAX_READINESS_SCORE, MIN_READINESS_SCORE } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getLeadershipFeedback = async (scores: CVFScores, readinessScore: number): Promise<string> => {
  const prompt = `
당신은 최고의 리더십 코치입니다. 한 리더가 '리더십 준비도'와 '리더십 유형' 두 가지 진단을 완료했습니다. 아래 결과를 바탕으로 종합적인 리더십 프로파일을 분석해주세요. 응답은 한국어로, 격려와 동기부여가 되는 전문가적인 톤으로 작성해주세요. 분석 내용은 마크다운 형식을 사용하여 제목, 목록 등으로 가독성 좋게 구성해주세요.

---

### 1. 리더십 준비도 분석

**진단 점수: ${readinessScore}점 / ${MAX_READINESS_SCORE}점**

*   **해석 가이드:** 이 진단은 리더십에 대한 동기, 책임감, 인내력, 자신감, 유연성을 측정합니다. 점수가 낮을수록(최저 ${MIN_READINESS_SCORE}점) 리더십을 발휘할 준비가 잘 되어 있음을 의미하고, 점수가 높을수록(최고 ${MAX_READINESS_SCORE}점) 리더 역할을 수행하는 데 심리적, 기술적 장벽이 있을 수 있음을 시사합니다.

*   **분석 요청:**
    1.  현재 점수를 바탕으로 이 리더의 '리더십 준비도' 수준을 평가해주세요. (예: 매우 준비됨, 준비 과정에 있음, 성찰이 필요함 등)
    2.  이 점수가 리더십 발휘에 어떤 영향을 미칠 수 있는지 설명해주세요.
    3.  리더십 준비도를 더욱 향상시키기 위한 구체적인 조언 1~2가지를 제시해주세요.

---

### 2. 리더십 스타일 분석

**진단 결과:**
-   **분석형 유형 점수:** ${scores['분석형']} / ${MAX_SCORE_PER_QUADRANT}
-   **휴먼형 유형 점수:** ${scores['휴먼형']} / ${MAX_SCORE_PER_QUADRANT}
-   **비전형 유형 점수:** ${scores['비전형']} / ${MAX_SCORE_PER_QUADRANT}
-   **실행형 유형 점수:** ${scores['실행형']} / ${MAX_SCORE_PER_QUADRANT}

*   **해석 가이드:** 각 유형의 점수는 20개의 문항 중 해당 유형의 행동 특성을 몇 번 선택했는지를 나타냅니다. 점수가 높은 유형이 현재 선호하는 리더십 스타일입니다.

*   **분석 요청:**
    1.  가장 높은 점수를 받은 리더십 유형을 중심으로 이 리더의 핵심 강점을 설명해주세요.
    2.  가장 낮은 점수를 받은 리더십 유형을 중심으로 보완이 필요한 영역(잠재적 약점)을 분석해주세요.
    3.  가장 낮은 점수를 받은 영역을 개발하고, 전반적으로 균형 잡힌 리더십을 발휘하기 위한 구체적이고 실천 가능한 행동 계획 3가지를 제시해주세요.

---

### 3. 종합 코칭

위 두 가지 분석을 종합하여, 이 리더가 더 나은 리더로 성장하기 위한 최종적인 격려 메시지와 핵심 조언을 요약하여 전달해주세요.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate AI feedback.");
  }
};