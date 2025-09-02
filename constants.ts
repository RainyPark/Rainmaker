import { ReadinessQuestion, StyleQuestion, CVFQuadrant } from './types';

export const readinessQuestions: ReadinessQuestion[] = [
  { id: 1, category: '리더십 동기', text: '나는 다른 사람들을 이끌어가는 일보다 혼자서 주어진 일을 하는 것을 더 좋아한다.' },
  { id: 2, category: '헌신 및 책임의식', text: '나는 다른 사람들을 이끌기 위해서 나에게 이익이 되는 것들(예, 시간, 노력 등)을 포기할 수 없다.' },
  { id: 3, category: '정서적 인내력', text: '나는 다른 사람이 자신의 의견을 고집할 경우 짜증나고 힘들다.' },
  { id: 4, category: '리더십 기술 자신감', text: '나는 다른 사람들을 이끌어야 할 경우 무엇을, 어떻게 해야 할지를 모르겠다.' },
  { id: 5, category: '관점 유연성', text: '나는 다른 사람들의 생각이나 의견보다 나의 생각을 더 중요시한다.' },
];

export const styleQuestions: StyleQuestion[] = [
    {
        id: 1,
        text: "회의에 참여할 때 나는 보통 어떤 기준으로 의견을 말하는가?",
        options: [
            { text: "논리와 근거 중심으로 정리", quadrant: CVFQuadrant.Control },
            { text: "모두가 납득할 수 있는 공감 표현", quadrant: CVFQuadrant.Collaborate },
            { text: "새로운 시각이나 흐름 제안", quadrant: CVFQuadrant.Create },
            { text: "실행가능성과 우선순위 중심", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 2,
        text: "내가 리더가 된다면 가장 잘할 수 있을 것 같은 것은?",
        options: [
            { text: "문제 분석과 합리적 판단", quadrant: CVFQuadrant.Control },
            { text: "사람 간 갈등을 조율하고 배려하기", quadrant: CVFQuadrant.Collaborate },
            { text: "팀원들의 동기부여와 비전 제시", quadrant: CVFQuadrant.Create },
            { text: "빠른 결정을 내리고 실행을 밀어붙이기", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 3,
        text: "협업할 때 내가 주로 맡게 되는 역할은?",
        options: [
            { text: "정리하고 방향을 잡는 역할", quadrant: CVFQuadrant.Control },
            { text: "사람들 사이를 중재하고 경청", quadrant: CVFQuadrant.Collaborate },
            { text: "흐름을 전환하거나 창의 제안", quadrant: CVFQuadrant.Create },
            { text: "시작을 밀어붙이고 끝까지 마무리", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 4,
        text: "내가 가장 편안함을 느끼는 상황은?",
        options: [
            { text: "체계적이고 계획이 있는 상황", quadrant: CVFQuadrant.Control },
            { text: "서로 배려하고 조화로운 분위기", quadrant: CVFQuadrant.Collaborate },
            { text: "변화와 도전이 있는 환경", quadrant: CVFQuadrant.Create },
            { text: "속도감 있게 일이 굴러가는 현장", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 5,
        text: "새로운 프로젝트를 시작할 때 나는?",
        options: [
            { text: "목적과 구조부터 따져 본다", quadrant: CVFQuadrant.Control },
            { text: "누가 어떤 역할을 하면 좋을지 고민", quadrant: CVFQuadrant.Collaborate },
            { text: "이 프로젝트의 비전과 의미를 생각", quadrant: CVFQuadrant.Create },
            { text: "필요한 일부터 빠르게 시작함", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 6,
        text: "동료들과 함께 문제를 논의할 때 나는?",
        options: [
            { text: "분석 후 대안을 제시", quadrant: CVFQuadrant.Control },
            { text: "감정과 배경을 먼저 이해하려 함", quadrant: CVFQuadrant.Collaborate },
            { text: "시야를 넓혀 새로운 관점을 제안", quadrant: CVFQuadrant.Create },
            { text: "핵심 이슈를 빠르게 정리하고 해결 시도", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 7,
        text: "다음 중 내가 강하다고 느끼는 역량은?",
        options: [
            { text: "자료 정리와 판단력", quadrant: CVFQuadrant.Control },
            { text: "공감력과 관계 조정력", quadrant: CVFQuadrant.Collaborate },
            { text: "상상력과 기획력", quadrant: CVFQuadrant.Create },
            { text: "추진력과 실행력", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 8,
        text: "누군가 실수했을 때 나는 보통?",
        options: [
            { text: "원인을 차분히 분석함", quadrant: CVFQuadrant.Control },
            { text: "감정적으로 위축되지 않게 도와줌", quadrant: CVFQuadrant.Collaborate },
            { text: "실수 속 가능성을 이야기함", quadrant: CVFQuadrant.Create },
            { text: "다시 빠르게 방향을 잡고 실행함", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 9,
        text: "타인이 나에게 자주 해주는 말은?",
        options: [
            { text: '"논리적이야"', quadrant: CVFQuadrant.Control },
            { text: '"배려심이 있어"', quadrant: CVFQuadrant.Collaborate },
            { text: '"아이디어가 참신해"', quadrant: CVFQuadrant.Create },
            { text: '"일 추진을 잘해"', quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 10,
        text: "내가 생각하는 좋은 리더는?",
        options: [
            { text: "문제를 진단하고 전략 세우는 사람", quadrant: CVFQuadrant.Control },
            { text: "팀원 마음을 잘 이해하고 소통하는 사람", quadrant: CVFQuadrant.Collaborate },
            { text: "열정을 끌어내는 사람", quadrant: CVFQuadrant.Create },
            { text: "성과를 이끌어내는 사람", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 11,
        text: "팀에서 내가 맡는 역할을 돌아보면?",
        options: [
            { text: "방향 정리와 분석", quadrant: CVFQuadrant.Control },
            { text: "분위기 메이커, 감정 조율", quadrant: CVFQuadrant.Collaborate },
            { text: "아이디어 제시와 설득", quadrant: CVFQuadrant.Create },
            { text: "중심을 잡고 앞장서는 역할", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 12,
        text: "내가 리더가 된다면 어떤 리더가 되고 싶은가?",
        options: [
            { text: "정확하고 이성적인 판단을 내리는 리더", quadrant: CVFQuadrant.Control },
            { text: "팀원 마음을 잘 읽고 도와주는 리더", quadrant: CVFQuadrant.Collaborate },
            { text: "영감을 주는 리더", quadrant: CVFQuadrant.Create },
            { text: "확실히 결과를 내는 리더", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 13,
        text: "팀원이 힘들어할 때 나는?",
        options: [
            { text: "무슨 문제가 있었는지 원인부터 정리", quadrant: CVFQuadrant.Control },
            { text: "말 없이 옆에 있어주거나 들어줌", quadrant: CVFQuadrant.Collaborate },
            { text: "더 나은 방향을 함께 상상해봄", quadrant: CVFQuadrant.Create },
            { text: "현실적인 해결책을 제시함", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 14,
        text: "어떤 역할을 맡을 때 자신감이 생기는가?",
        options: [
            { text: "계획·전략·논리 중심의 역할", quadrant: CVFQuadrant.Control },
            { text: "사람 사이 조율과 관계 형성", quadrant: CVFQuadrant.Collaborate },
            { text: "새로운 기획과 기회 발굴", quadrant: CVFQuadrant.Create },
            { text: "기한 내 과제를 끝내는 책임 역할", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 15,
        text: "내가 중요하게 여기는 말은?",
        options: [
            { text: '"논리적으로 말해줘"', quadrant: CVFQuadrant.Control },
            { text: '"그 마음 이해돼"', quadrant: CVFQuadrant.Collaborate },
            { text: '"이건 기회야"', quadrant: CVFQuadrant.Create },
            { text: '"바로 실행하자"', quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 16,
        text: "변화 상황에서 나는?",
        options: [
            { text: "변화 이유를 분석하려고 함", quadrant: CVFQuadrant.Control },
            { text: "주변 사람들 감정을 살핌", quadrant: CVFQuadrant.Collaborate },
            { text: "변화 자체를 긍정적으로 봄", quadrant: CVFQuadrant.Create },
            { text: "빨리 적응하고 실행 중심으로 전환함", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 17,
        text: "다음 중 나에게 가장 스트레스를 주는 상황은?",
        options: [
            { text: "무계획적인 일 처리", quadrant: CVFQuadrant.Control },
            { text: "사람 간 갈등이나 불화", quadrant: CVFQuadrant.Collaborate },
            { text: "현실 안주, 변화 없는 상황", quadrant: CVFQuadrant.Create },
            { text: "실행을 미루고 답답한 상태", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 18,
        text: "내가 가장 잘하는 문제 해결 방식은?",
        options: [
            { text: "문제의 원인을 논리적으로 분석", quadrant: CVFQuadrant.Control },
            { text: "사람 이야기를 듣고 상황을 조율", quadrant: CVFQuadrant.Collaborate },
            { text: "문제 뒤의 가능성을 상상", quadrant: CVFQuadrant.Create },
            { text: "빠르게 결론 내고 행동에 옮김", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 19,
        text: "어떤 말이 나를 가장 잘 설명하는가?",
        options: [
            { text: "분석가", quadrant: CVFQuadrant.Control },
            { text: "공감하는 사람", quadrant: CVFQuadrant.Collaborate },
            { text: "영감을 주는 사람", quadrant: CVFQuadrant.Create },
            { text: "실행가", quadrant: CVFQuadrant.Compete },
        ],
    },
    {
        id: 20,
        text: "나에게 있어 '일 잘하는 사람'이란?",
        options: [
            { text: "논리와 데이터로 일하는 사람", quadrant: CVFQuadrant.Control },
            { text: "팀워크를 중시하는 사람", quadrant: CVFQuadrant.Collaborate },
            { text: "기회를 만들고 변화를 시도하는 사람", quadrant: CVFQuadrant.Create },
            { text: "실행력이 강한 사람", quadrant: CVFQuadrant.Compete },
        ],
    },
];

export const LIKERT_SCALE = [
  { value: 1, label: '전혀 그렇지 않다' },
  { value: 2, label: '그렇지 않다' },
  { value: 3, label: '보통이다' },
  { value: 4, label: '그렇다' },
  { value: 5, label: '매우 그렇다' },
];

export const MIN_READINESS_SCORE = readinessQuestions.length * 1;
export const MAX_READINESS_SCORE = readinessQuestions.length * 5;
export const MAX_SCORE_PER_QUADRANT = styleQuestions.length;
