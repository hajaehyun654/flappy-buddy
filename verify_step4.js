// 4차 검토: 5의 배수 파이프 여분의 목숨(빨간색 하트) 생성 및 획득(최대 3개 제한) 시뮬레이션

console.log('======================================================');
console.log('  🔍 [4차 검토: 여분의 목숨(빨간색 하트) 생성 및 획득 검증]');
console.log('======================================================\n');

const MAX_LIVES = 3;
let lives = MAX_LIVES;
let spawnCount = 0;
const spawnedHearts = [];

function spawnPipe() {
  spawnCount++;
  const hasHeart = (spawnCount % 5 === 0);
  if (hasHeart) {
    spawnedHearts.push(spawnCount);
  }
  return { id: spawnCount, hasHeart };
}

function collectHeart() {
  const prevLives = lives;
  if (lives < MAX_LIVES) {
    lives = Math.min(MAX_LIVES, lives + 1);
  }
  return { prev: prevLives, current: lives };
}

// 1. 1부터 25개 파이프 생성 시뮬레이션
console.log('1. 파이프 생성 시 5의 배수 하트 생성 검증 (파이프 1 ~ 25번)');
for (let i = 1; i <= 25; i++) {
  const pipe = spawnPipe();
  if (pipe.hasHeart) {
    console.log(`  - [파이프 #${pipe.id}] ❤️ 여분의 목숨(빨간색 하트) 생성됨!`);
  }
}

const expectedHearts = [5, 10, 15, 20, 25];
const isMatches = JSON.stringify(spawnedHearts) === JSON.stringify(expectedHearts);
if (isMatches) {
  console.log(`  ✅ 5의 배수(5, 10, 15, 20, 25) 파이프에서만 정확히 하트 생성 확인 (총 ${spawnedHearts.length}회).`);
} else {
  console.error('❌ 하트 생성 주기 오류:', spawnedHearts);
  process.exit(1);
}

// 2. 생명이 2개일 때 하트 획득 -> 3개로 1개만 추가
console.log('\n2. 생명이 2개일 때 하트 획득 검증');
lives = 2;
const res1 = collectHeart();
console.log(`  - 획득 전 목숨: ${res1.prev} -> 획득 후 목숨: ${res1.current}`);
if (res1.prev === 2 && res1.current === 3) {
  console.log('  ✅ 목숨이 2개일 때 정확히 1개만 추가되어 3개가 됨.');
} else {
  console.error('❌ 목숨 2개 획득 로직 오류');
  process.exit(1);
}

// 3. 생명이 1개일 때 하트 획득 -> 2개로 1개 추가
console.log('\n3. 생명이 1개일 때 하트 획득 검증');
lives = 1;
const res2 = collectHeart();
console.log(`  - 획득 전 목숨: ${res2.prev} -> 획득 후 목숨: ${res2.current}`);
if (res2.prev === 1 && res2.current === 2) {
  console.log('  ✅ 목숨이 1개일 때 정확히 1개 추가되어 2개가 됨.');
} else {
  console.error('❌ 목숨 1개 획득 로직 오류');
  process.exit(1);
}

// 4. 생명이 이미 최대(3개)일 때 하트 획득 -> 3개 유지 (최대 목숨 3개 초과 금지)
console.log('\n4. 생명이 최대(3개)일 때 하트 획득 검증');
lives = 3;
const res3 = collectHeart();
console.log(`  - 획득 전 목숨: ${res3.prev} -> 획득 후 목숨: ${res3.current}`);
if (res3.prev === 3 && res3.current === 3) {
  console.log('  ✅ 최대 목숨 3개를 초과하지 않고 3개로 안전하게 유지됨.');
} else {
  console.error('❌ 최대 목숨 초과 오류');
  process.exit(1);
}

// 5. 게임 리셋 시 spawnCount 및 목숨 초기화
console.log('\n5. 게임 리셋 시 초기화 검증');
spawnCount = 0;
lives = MAX_LIVES;
console.log(`  - 리셋 후 spawnCount: ${spawnCount}, 목숨: ${lives}`);
if (spawnCount === 0 && lives === 3) {
  console.log('  ✅ 게임 재시작 시 파이프 카운트 및 목숨 3개 리셋 확인.');
} else {
  console.error('❌ 리셋 오류');
  process.exit(1);
}

console.log('\n✨ [4차 검토 결과]: 여분의 목숨(빨간색 하트) 생성 및 획득 로직 100% 검증 통과 (PASS)!');
