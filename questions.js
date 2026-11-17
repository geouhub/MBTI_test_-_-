/**
 * MBTI 40 Questions for Korean High School Students
 * 
 * - Total: 40 questions (10 questions per dimension: EI, SN, TF, JP)
 * - Balance: 5 positive-keyed and 5 reverse-keyed questions per dimension
 * - Target audience: Korean high school students (ages 15-18)
 * - Tone: Friendly casual 반말체 (~하는 편이다, ~때가 많다)
 */

const questions = [
  // ==========================================
  // EI (에너지 방향: 외향 E vs 내향 I) - 10문항
  // ==========================================
  {
    id: 1,
    text: "쉬는 시간마다 친구들 자리나 복도로 가서 북적북적 수다 떠는 편이다.",
    dimension: "EI",
    direction: "E"
  },
  {
    id: 2,
    text: "학교 끝나고 친구들과 놀기보다는 혼자 집에 가서 침대에서 뒹굴거리며 폰 보는 시간이 꼭 필요하다.",
    dimension: "EI",
    direction: "I"
  },
  {
    id: 3,
    text: "새 학기 첫날 어색한 교실 분위기 속에서도 먼저 다가가서 말을 거는 편이다.",
    dimension: "EI",
    direction: "E"
  },
  {
    id: 4,
    text: "발표 수업이나 반 전체 앞에서 주목받는 상황이 되면 심장이 두근거리고 긴장되는 편이다.",
    dimension: "EI",
    direction: "I"
  },
  {
    id: 5,
    text: "주말이나 시험 끝난 날에는 무조건 친구들과 만나서 코인노래방이나 맛집에 가야 스트레스가 풀린다.",
    dimension: "EI",
    direction: "E"
  },
  {
    id: 6,
    text: "쉬는 시간에는 에어팟을 끼고 혼자 노래를 듣거나 자리에 엎드려 조용히 충전하는 것이 좋다.",
    dimension: "EI",
    direction: "I"
  },
  {
    id: 7,
    text: "체육대회나 축제 같은 학교 행사 때 반 친구들을 이끌고 응원하거나 적극적으로 참여하는 편이다.",
    dimension: "EI",
    direction: "E"
  },
  {
    id: 8,
    text: "여러 친구들과 넓고 얕게 어울리기보다는 마음 맞는 단짝 한두 명과 깊게 이야기 나누는 것을 더 좋아한다.",
    dimension: "EI",
    direction: "I"
  },
  {
    id: 9,
    text: "동아리나 모둠 활동에서 새로운 친구들을 알게 되는 것 자체가 설레고 에너지가 생긴다.",
    dimension: "EI",
    direction: "E"
  },
  {
    id: 10,
    text: "하루 종일 친구들과 신나게 놀고 나면 재미있었어도 기가 다 빨려 혼자만의 힐링 시간이 필요하다.",
    dimension: "EI",
    direction: "I"
  },

  // ==========================================
  // SN (인식 기능: 감각 S vs 직관 N) - 10문항
  // ==========================================
  {
    id: 11,
    text: "공부할 때 교과서나 개념서에 나오는 예시와 기출문제 유형을 꼼꼼하게 그대로 외우고 푸는 편이다.",
    dimension: "SN",
    direction: "S"
  },
  {
    id: 12,
    text: "수업을 듣다가 문득 엉뚱한 상상이 꼬리를 물어서 멍때리거나 딴생각에 빠질 때가 많다.",
    dimension: "SN",
    direction: "N"
  },
  {
    id: 13,
    text: "수행평가를 할 때 모호한 자유 주제보다는 선생님이 제시한 가이드라인과 채점 기준표가 명확한 것이 편하다.",
    dimension: "SN",
    direction: "S"
  },
  {
    id: 14,
    text: "'만약에 수능 전날 좀비 사태가 터지면 어떡하지?' 같은 쓸데없지만 흥미진진한 상상을 자주 한다.",
    dimension: "SN",
    direction: "N"
  },
  {
    id: 15,
    text: "친구가 있었던 일을 이야기할 때 '그래서 언제 어디서 무슨 일이 있었는데?'처럼 구체적인 팩트 위주로 듣는 편이다.",
    dimension: "SN",
    direction: "S"
  },
  {
    id: 16,
    text: "문학 작품이나 영화를 볼 때 숨겨진 복선이나 상징적인 의미, 결말의 숨은 뜻을 해석하는 것을 좋아한다.",
    dimension: "SN",
    direction: "N"
  },
  {
    id: 17,
    text: "진로나 학과를 고민할 때 내신 성적, 취업률, 실제 커리큘럼 같은 객관적인 데이터를 먼저 찾아본다.",
    dimension: "SN",
    direction: "S"
  },
  {
    id: 18,
    text: "시험공부를 할 때 세부적인 암기보다 전체적인 개념의 흐름과 '이게 왜 이렇게 되지?'라는 원리가 먼저 이해되어야 한다.",
    dimension: "SN",
    direction: "N"
  },
  {
    id: 19,
    text: "오답노트를 정리할 때 공식이나 문제 풀이 과정을 정석대로 깔끔하게 단계별로 기록하는 편이다.",
    dimension: "SN",
    direction: "S"
  },
  {
    id: 20,
    text: "지금 당장의 현실적인 문제보다 '10년 뒤의 나는 어떤 세상에서 살고 있을까?' 같은 먼 미래를 자주 그린다.",
    dimension: "SN",
    direction: "N"
  },

  // ==========================================
  // TF (판단 기능: 사고 T vs 감정 F) - 10문항
  // ==========================================
  {
    id: 21,
    text: "친구가 시험을 망쳐서 속상해하면 '어떤 과목이 어려웠어? 다음엔 이렇게 해봐'라며 실질적인 해결책을 먼저 찾으려 한다.",
    dimension: "TF",
    direction: "T"
  },
  {
    id: 22,
    text: "친구가 힘든 고민을 털어놓을 때 해결책보다는 '진짜 속상했겠다, 고생 많았어'라며 감정적으로 공감해주는 편이다.",
    dimension: "TF",
    direction: "F"
  },
  {
    id: 23,
    text: "조별과제에서 친한 친구라도 맡은 역할을 제대로 안 해오면 공과 사를 구분해서 단호하게 지적할 수 있다.",
    dimension: "TF",
    direction: "T"
  },
  {
    id: 24,
    text: "아무리 맞는 말이라도 상대방의 말투가 차갑거나 기분 상할 것 같으면 말을 돌려서 부드럽게 표현한다.",
    dimension: "TF",
    direction: "F"
  },
  {
    id: 25,
    text: "친구들과 의견이 갈릴 때 감정적인 호소보다 객관적인 근거와 논리를 바탕으로 설득하는 편이다.",
    dimension: "TF",
    direction: "T"
  },
  {
    id: 26,
    text: "반 분위기가 서먹하거나 누군가 소외되어 보이면 마음이 쓰여서 챙겨주려고 신경을 많이 쓰는 편이다.",
    dimension: "TF",
    direction: "F"
  },
  {
    id: 27,
    text: "선생님이나 친구에게 피드백을 받을 때 듣기 좋은 칭찬보다는 부족한 부분을 냉정하게 짚어주는 것이 더 유익하다.",
    dimension: "TF",
    direction: "T"
  },
  {
    id: 28,
    text: "시험이나 대회에서 성적이 아쉽더라도 '열심히 노력했으니 괜찮아'라는 따뜻한 위로를 받을 때 더 힘이 난다.",
    dimension: "TF",
    direction: "F"
  },
  {
    id: 29,
    text: "친구와 다툼이 생겼을 때 서운한 감정보다는 '누가 왜 잘못했는지' 사건의 잘잘못과 원인을 먼저 따져본다.",
    dimension: "TF",
    direction: "T"
  },
  {
    id: 30,
    text: "친구에게 부탁을 받았을 때 내 상황이 조금 곤란하더라도 친구가 실망할까 봐 거절하기 힘들어한다.",
    dimension: "TF",
    direction: "F"
  },

  // ==========================================
  // JP (생활양식: 판단 J vs 인식 P) - 10문항
  // ==========================================
  {
    id: 31,
    text: "시험 3~4주 전부터 주차별·일자별 스터디 플래너를 세워두고 차근차근 계획대로 공부하는 편이다.",
    dimension: "JP",
    direction: "J"
  },
  {
    id: 32,
    text: "시험공부는 벼락치기 특유의 촉박함과 긴장감이 돌아야 집중력이 최대로 발휘되는 편이다.",
    dimension: "JP",
    direction: "P"
  },
  {
    id: 33,
    text: "수행평가나 과제는 마감일보다 며칠 일찍 끝내놓아야 마음이 편하고 안심이 된다.",
    dimension: "JP",
    direction: "J"
  },
  {
    id: 34,
    text: "주말이나 방학에는 정해진 계획 없이 그날 아침 기분과 내키는 대로 하루를 보내는 것을 좋아한다.",
    dimension: "JP",
    direction: "P"
  },
  {
    id: 35,
    text: "독서실이나 자습실에 가면 공부 시작 전에 책상 정리와 오늘 할 일 체크리스트부터 작성한다.",
    dimension: "JP",
    direction: "J"
  },
  {
    id: 36,
    text: "친구가 '오늘 야자 끝나고 떡볶이 먹으러 가자!'라며 갑자기 번개를 제안해도 흔쾌히 따라나선다.",
    dimension: "JP",
    direction: "P"
  },
  {
    id: 37,
    text: "친구들과 놀러 갈 때 몇 시에 어디서 만나서 무엇을 할지 동선과 시간표를 미리 정해두는 편이다.",
    dimension: "JP",
    direction: "J"
  },
  {
    id: 38,
    text: "스터디 플래너를 야심 차게 샀다가도 며칠 쓰다 보면 흐지부지되고 포기한 적이 많다.",
    dimension: "JP",
    direction: "P"
  },
  {
    id: 39,
    text: "갑작스럽게 수업 시간표가 바뀌거나 계획에 없던 돌발 과제가 생기면 스트레스를 받는 편이다.",
    dimension: "JP",
    direction: "J"
  },
  {
    id: 40,
    text: "수학여행이나 축제에 갈 때 세세한 계획을 세우기보다는 상황에 맞춰 즉흥적으로 즐기는 것이 훨씬 재미있다.",
    dimension: "JP",
    direction: "P"
  }
];

// 브라우저 및 Node.js 환경 모두 호환되도록 export 지원
if (typeof module !== 'undefined' && module.exports) {
  module.exports = questions;
}
