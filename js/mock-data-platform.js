/* ================================================================
   mock-data-platform.js — 플랫폼 관리자 AI 분석 파이프라인 목 데이터
   TODO: 실제 크롤링·분석 API 연동 시 MOCK_ANALYSIS_SECTIONS 배열을
         API 응답으로 교체. PIPELINE_STATUS 상수와 함수 시그니처는 유지.
   - PIPELINE_STATUS       : 섹션 분석 상태 상수
   - MOCK_ANALYSIS_SECTIONS: 10개 섹션 분석 결과 (상태·미리보기·이미지)
================================================================ */

/* ── 섹션 분석 상태 상수 ─────────────────────────────────────────── */
var PIPELINE_STATUS = {
  COLLECTED: 'collected', // 크롤링으로 수집됨
  AI_GEN:    'ai_gen',    // LLM이 자동 생성
  NO_IMAGE:  'no_image',  // 이미지 없음 → 관리자 직접 등록 필요
  NA:        'na',        // 이미지 해당 없음 (이미지 없는 섹션)
};

/* ── 10개 섹션 분석 결과 ──────────────────────────────────────────
   contentStatus : 텍스트 콘텐츠의 출처 상태
   imageStatus   : 이미지의 상태 (NA = 이미지 불필요 섹션)
   koPreview     : 한국어 생성 결과 미리보기 (80자 이내 표시)
   imageNote     : 이미지 상태 부연 설명
   note          : 관리자 확인 사항
──────────────────────────────────────────────────────────────── */
var MOCK_ANALYSIS_SECTIONS = [
  {
    num:           '01',
    name:          'Hero (최상단)',
    icon:          '🏠',
    contentStatus: 'ai_gen',
    imageStatus:   'collected',
    koPreview:     '「변했네」가 아니라 「예뻐졌네」 소리를 듣는 수술을. 올래성형외과 대표원장 김현준이 당신의 케이스에 맞는 방법을 함께 생각합니다.',
    imageNote:     '원장 인물 이미지 수집됨',
    note:          'LINE 버튼 · 불안 선택 버튼',
  },
  {
    num:           '02',
    name:          'DECISION GUIDE',
    icon:          '🧭',
    contentStatus: 'ai_gen',
    imageStatus:   'na',
    koPreview:     '홈터가 걱정 / 부자연스럽고 싶지 않아 / 실패·수정하고 싶다 / 예산이 정해져 있다 / 일본에서 수술 불안 / 시간이 없다 / 가족에게 들키고 싶지 않아 / 비용 대비 효과',
    imageNote:     '',
    note:          '8개 불안 요소 AI 생성',
  },
  {
    num:           '03',
    name:          '의사 소개',
    icon:          '👨‍⚕️',
    contentStatus: 'collected',
    imageStatus:   'collected',
    koPreview:     '김현준 원장 (눈·매몰법 전문) / 이지영 원장 (코·윤곽 전문) / 박정호 원장 (수정 수술 전문) — 3명 수집됨',
    imageNote:     '프로필 사진 3장 수집됨',
    note:          '의사 1명이면 섹션 자동 비노출',
  },
  {
    num:           '04',
    name:          '시술 메뉴',
    icon:          '💉',
    contentStatus: 'collected',
    imageStatus:   'ai_gen',
    koPreview:     '매몰법·눈머리 절개 / 코끝 성형·코 날개 축소 / V-LINE 수술 / 실 리프트 외 9개 시술 수집됨',
    imageNote:     'AI 이미지 생성 (수집 없음)',
    note:          '자세히 클릭 → 딤 처리 팝업',
  },
  {
    num:           '05',
    name:          'REAL CASES',
    icon:          '📸',
    contentStatus: 'ai_gen',
    imageStatus:   'no_image',
    koPreview:     'Before/After 이미지 없음 — AI 생성 금지. 관리자가 직접 등록할 때까지 플레이스홀더로 노출됩니다.',
    imageNote:     '관리자 직접 등록 필요',
    note:          'AI 이미지 생성 금지 규칙 적용',
  },
  {
    num:           '06',
    name:          'REAL REVIEWS',
    icon:          '⭐',
    contentStatus: 'ai_gen',
    imageStatus:   'no_image',
    koPreview:     '후기 이미지 없음 — AI 생성 금지. 텍스트 후기만 플레이스홀더로 노출됩니다.',
    imageNote:     '관리자 직접 등록 필요',
    note:          'AI 이미지 생성 금지 규칙 적용',
  },
  {
    num:           '07',
    name:          'FAQ',
    icon:          '❓',
    contentStatus: 'ai_gen',
    imageStatus:   'na',
    koPreview:     '한국 이중 성형 비용은? / 수술은 안전한가? / 한국어 못해도 되나? / 붓기는 언제? / 체류 기간은? 외 5개 항목 생성됨',
    imageNote:     '',
    note:          'AEO 최적화 Q/A 구조',
  },
  {
    num:           '08',
    name:          '서비스 보장',
    icon:          '🛡️',
    contentStatus: 'collected',
    imageStatus:   'na',
    koPreview:     '15분 무료 상담 (LINE/Zoom) / 공항 픽업 (인천·김포) / 체류·통역 지원 (일본어 스탭 상주) / 귀국 후 케어 (화상 3개월)',
    imageNote:     '',
    note:          '4개 항목 수집됨',
  },
  {
    num:           '09',
    name:          '무료 상담 시작',
    icon:          '💬',
    contentStatus: 'collected',
    imageStatus:   'na',
    koPreview:     'LINE (24시간, 제일 추천) / Instagram / 이뻐 앱 (클릭 시 설치 안내 팝업 표시)',
    imageNote:     '',
    note:          '이뻐 안내 팝업 문구 설정 필요',
  },
  {
    num:           '10',
    name:          '푸터',
    icon:          '📋',
    contentStatus: 'collected',
    imageStatus:   'na',
    koPreview:     '올래성형외과 · 서울 강남구 ○○○ / 사이트맵 5개 / 법적 정보: 개인정보 보호 정책 · 의료광고에 관한 표기',
    imageNote:     '',
    note:          'SNS 채널 · 법적 정보 관리',
  },
];

/* ── 카피 검수 — 섹션별 의역 행 데이터 ──────────────────────────────
   ts 상태: 'none' = 미의역 | 'ai' = AI 의역 완료 | 'done' = 검수 완료
   TODO: 실제 연동 시 ko는 병원 관리자 에디터의 확정 원문으로 교체
────────────────────────────────────────────────────────────────── */
var MOCK_TRANSLATION_ROWS = [
  { num:'01', name:'Hero (최상단)',   icon:'🏠', ko:'「변했네」가 아니라 「예뻐졌네」 소리를 듣는 수술을. 올래성형외과 대표원장 김현준이 당신의 케이스에 맞는 방법을 함께 생각합니다.', ja:'', ts:'none' },
  { num:'02', name:'DECISION GUIDE', icon:'🧭', ko:'당신의 「불안」에서 선택 — 무엇부터 생각하면 좋은지 모르는 분께. 케이스에 맞는 정보만 보여드리겠습니다.', ja:'', ts:'none' },
  { num:'03', name:'의사 소개',       icon:'👨‍⚕️', ko:'당신에게 맞는 의사는 누구입니까? 스타일·성격·특기로 선택한다. 「전부 할 수 있는 의사」보다 「당신의 케이스 전문가」를.', ja:'', ts:'none' },
  { num:'04', name:'시술 메뉴',       icon:'💉', ko:'자연스러운 결과에 집착합니다. 이미지 없이 부자연스럽게 끝나는 수술은 하지 않습니다. 한국 20년 노하우의 시술 라인업.', ja:'', ts:'none' },
  { num:'05', name:'REAL CASES',     icon:'📸', ko:'일본인 환자의 경우. 전 증례, 환자의 동의하에 게재하고 있습니다.', ja:'', ts:'none' },
  { num:'06', name:'REAL REVIEWS',   icon:'⭐', ko:'일본인 환자의 목소리. LINE 상담만으로 2주간 고민을 들어주고, 무리한 수술을 권하지 않았던 것이 결정적이었습니다.', ja:'', ts:'none' },
  { num:'07', name:'FAQ',            icon:'❓', ko:'일본인 환자로부터 많은 질문. LLM(ChatGPT·Perplexity 등)의 답변에 직접 인용되는 구조로 기재하고 있습니다.', ja:'', ts:'none' },
  { num:'08', name:'서비스 보장',     icon:'🛡️', ko:'수술 후에도 일본으로 돌아온 후에도 케어가 계속됩니다. 예약부터 수술 후 케어까지, IPPEO 일본어 전문 스탭이 모두 대응합니다.', ja:'', ts:'none' },
  { num:'09', name:'무료 상담 시작', icon:'💬', ko:'무료 상담 시작. 원하는 채널로 부담없이. 일본어로 대응합니다.', ja:'', ts:'none' },
  { num:'10', name:'푸터',           icon:'📋', ko:'올래성형외과 · 서울 강남구 소재 · 일본어 스탭 상주 · 영업시간: 평일 10:00–19:00 / 토 10:00–17:00', ja:'', ts:'none' },
];

/* ── Gemini 실패 시 의역 폴백 (일본어) ──────────────────────────── */
var MOCK_TRANSLATION_FALLBACK_JA = [
  '「変わったね」ではなく「綺麗になったね」と言われる手術を。オーレ整形外科の院長キム・ヒョンジュンが、あなたのケースに合う方法を一緒に考えます。',
  'あなたの「不安」から選ぶ — 何から考えればいいか分からない方へ。あなたのケースに合う情報だけをお届けします。',
  'あなたに合う医師は誰ですか？スタイル・性格・得意分野で選ぶ。「なんでもできる医師」ではなく「あなたのケース専門家」を。',
  '自然な仕上がりにこだわります。不自然に終わる手術はしません。韓国20年のノウハウが詰まった施術ラインアップ。',
  '日本人患者様の症例。全症例、患者様のご同意のもと掲載しています。',
  '日本人患者様の声。LINEでの相談だけで2週間、無理な手術を勧めなかったことが決め手でした。',
  '日本人患者様からよくいただくご質問。AI（ChatGPT・Perplexityなど）の回答に直接引用される形式で掲載しています。',
  '手術後、日本に帰国してからもケアは続きます。ご予約から術後ケアまで、IPPEO日本語専門スタッフが全て対応します。',
  '無料相談はこちらから。お好みのチャンネルで、お気軽にどうぞ。日本語で対応します。',
  'オーレ整形外科 · ソウル江南区 · 日本語スタッフ常駐 · 営業時間：平日10:00–19:00 / 土10:00–17:00',
];
