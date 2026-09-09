// 2차 검토: 낮/밤 모드 및 5점 단위 랜덤 컬러 전환 시뮬레이션

console.log('======================================================');
console.log('  🔍 [2차 검토: 낮/밤 모드 및 5점 단위 컬러 변신 시뮬레이션]');
console.log('======================================================\n');

// 1. 낮/밤 모드 토글 시뮬레이션
let isNightMode = false;
let buttonText = '☀️';

function toggleTheme() {
  isNightMode = !isNightMode;
  buttonText = isNightMode ? '🌙' : '☀️';
}

console.log('1. 낮/밤 모드 상태 토글 검증');
console.log(`  - 초기 상태: isNightMode = ${isNightMode}, UI = ${buttonText}`);
toggleTheme();
console.log(`  - 1회 토글: isNightMode = ${isNightMode}, UI = ${buttonText}`);
if (isNightMode !== true || buttonText !== '🌙') {
  console.error('❌ 밤 모드 전환 실패');
  process.exit(1);
}
toggleTheme();
console.log(`  - 2회 토글: isNightMode = ${isNightMode}, UI = ${buttonText}`);
if (isNightMode !== false || buttonText !== '☀️') {
  console.error('❌ 낮 모드 복귀 실패');
  process.exit(1);
}
console.log('  ✅ 낮/밤 모드 양방향 전환 및 UI 아이콘 동기화 정상 작동.');

// 2. 점수 진행(Score Progression) 및 5점 단위 변신 시뮬레이션
console.log('\n2. 5점 단위 점수 달성 시 캐릭터 색상 변경 시뮬레이션');

const BUDDY_PALETTES = [
  '클래식 옐로우', '사쿠라 핑크', '오션 시안', '미스틱 바이올렛',
  '선셋 오렌지', '에메랄드 그린', '네온 코발트', '루비 레드'
];

const buddy = {
  paletteIndex: 0,
  transformHistory: [],

  reset() {
    this.paletteIndex = 0;
    this.transformHistory = [];
  },

  changeRandomColor() {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * BUDDY_PALETTES.length);
    } while (nextIndex === this.paletteIndex && BUDDY_PALETTES.length > 1);
    const prev = this.paletteIndex;
    this.paletteIndex = nextIndex;
    this.transformHistory.push({ from: prev, to: nextIndex, name: BUDDY_PALETTES[nextIndex] });
  }
};

let transformTriggerCount = 0;

// 1점부터 25점까지 시뮬레이션
for (let score = 1; score <= 25; score++) {
  if (score > 0 && score % 5 === 0) {
    buddy.changeRandomColor();
    transformTriggerCount++;
    console.log(`  - [점수 ${score}점 달성!] 캐릭터 색상 변신: ${buddy.transformHistory[buddy.transformHistory.length - 1].name}`);
  }
}

console.log(`  - 총 변신 발동 횟수: ${transformTriggerCount}회 (기대값: 5회)`);
if (transformTriggerCount !== 5) {
  console.error('❌ 변신 발동 횟수 오류');
  process.exit(1);
}

// 중복 연속 색상 방지 검증
const consecutiveSame = buddy.transformHistory.some(t => t.from === t.to);
if (consecutiveSame) {
  console.error('❌ 연속으로 같은 색상이 선택된 케이스 발견');
  process.exit(1);
} else {
  console.log('  ✅ 변신 시 항상 이전 색상과 다른 새로운 색상이 보장됩니다.');
}

// 3. 게임 리셋 시 색상 원복 검증
buddy.reset();
if (buddy.paletteIndex === 0) {
  console.log('  ✅ 게임 재시작 시 기본 컬러(클래식 옐로우)로 정상 리셋.');
} else {
  console.error('❌ 리셋 후 색상 초기화 실패');
  process.exit(1);
}

console.log('\n✨ [2차 검토 결과]: 모든 시뮬레이션 및 로직 이상 없음 (PASS)!');
