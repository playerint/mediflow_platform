/* config.js — Gemini API 설정 */
var GEMINI_API_KEY = atob('QVEuQWI4Uk42S3lMU09BQXItQ3hnRXpaanU0clllSWo5ODVSSHo2ZkFYTHJCbnAxd0hMdFE=');

/* ── 진료과 유형 & 전문 분야 (여기에만 추가하면 전체 반영) ── */
var CLINIC_TYPES = [
  {
    id: '성형외과',
    icon: '✂️',
    sub: '눈·코·윤곽·가슴·지방흡입',
    specialties: ['쌍꺼풀·눈성형','코성형','안면윤곽','가슴성형','지방흡입','눈·코 복합','피부·리프팅','기타'],
  },
  {
    id: '피부과',
    icon: '💆',
    sub: '레이저·보톡스·필러·리프팅',
    specialties: ['레이저·색소','보톡스·필러','안티에이징·리프팅','여드름·피부재생','제모','기타'],
  },
  {
    id: '치과',
    icon: '🦷',
    sub: '임플란트·교정·미백',
    specialties: ['임플란트','치아교정','미백·라미네이트','충치·크라운','잇몸·치주','기타'],
  },
];
