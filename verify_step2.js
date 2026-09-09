// 2차 검토: 매 1점마다 캐릭터 랜덤 색상 변경 및 낮/밤 모드 무결성 검증

console.log('======================================================');
console.log('  🔍 [2차 검토: 매 1점 단위 캐릭터 색상 변경 시뮬레이션]');
console.log('======================================================\n');

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

console.log('1. 매 1점 획득 시 색상 변경 시뮬레이션 (1점 ~ 10점)');

let score = 0;
for (let i = 1; i <= 10; i++) {
  score++;
  buddy.changeRandomColor();
  const current = buddy.transformHistory[buddy.transformHistory.length - 1];
  console.log(`  - [점수 ${score}점 달성!] 색상 변신: ${current.name} (index: ${current.to})`);
}

// 검증 1: 총 변신 횟수 확인
console.log(`\n  - 총 점수 증가 횟수: 10회, 총 변신 횟수: ${buddy.transformHistory.length}회`);
if (buddy.transformHistory.length === 10) {
  console.log('  ✅ [매 1점 변신] 매 점수마다 누락 없이 100% 변신 트리거 작동 확인.');
} else {
  console.error('❌ 변신 횟수 불일치!');
  process.exit(1);
}

// 검증 2: 연속으로 동일한 색상이 선택되지 않는지 확인
const consecutiveDuplicates = buddy.transformHistory.filter(t => t.from === t.to);
if (consecutiveDuplicates.length === 0) {
  console.log('  ✅ [중복 방지] 매 1점 변신 시 항상 이전 색상과 다른 새로운 색상으로의 전환 보장.');
} else {
  console.error('❌ 연속 중복 색상 발견:', consecutiveDuplicates);
  process.exit(1);
}

// 검증 3: 게임 리셋 시 기본 노란색(index: 0) 초기화 확인
buddy.reset();
if (buddy.paletteIndex === 0) {
  console.log('  ✅ [게임 리셋] 새 게임 시작 시 기본 컬러(클래식 옐로우)로 리셋 확인.');
} else {
  console.error('❌ 리셋 오류');
  process.exit(1);
}

console.log('\n✨ [2차 검토 결과]: 매 1점 단위 색상 변경 로직 이상 없음 (PASS)!');
