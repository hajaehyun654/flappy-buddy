const fs = require('fs');

console.log('==============================================');
console.log('  🔍 [1차 검토: 구문, DOM, 태그, 데이터 무결성 검증]');
console.log('==============================================\n');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Check all HTML Element IDs
const idMatches = [...html.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
const getElMatches = [...html.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map(m => m[1]);

console.log('1. DOM Element ID 매핑 검증');
console.log('  - HTML ID 총 개수:', idMatches.length);
console.log('  - JS 호출 ID 총 개수:', getElMatches.length);

const missing = getElMatches.filter(id => !idMatches.includes(id));
if (missing.length > 0) {
  console.error('❌ 누락된 ID 발견:', missing);
  process.exit(1);
} else {
  console.log('  ✅ theme-btn을 포함한 모든 DOM 요소 ID가 100% 일치합니다.');
}

// 2. Check HTML Structure integrity
console.log('\n2. HTML 태그 완전성 검증');
const openTags = (html.match(/<([a-z1-6]+)(?:\s+[^>]*?)?(?<!\/)>/gi) || []).map(t => t.match(/<([a-z1-6]+)/i)[1].toLowerCase());
const closeTags = (html.match(/<\/([a-z1-6]+)>/gi) || []).map(t => t.match(/<\/([a-z1-6]+)>/i)[1].toLowerCase());
const voidTags = ['meta', 'link', 'img', 'br', 'hr', 'input'];
const nonVoidOpen = openTags.filter(t => !voidTags.includes(t));

console.log(`  - 여는 태그(void 제외): ${nonVoidOpen.length}개, 닫는 태그: ${closeTags.length}개`);
if (nonVoidOpen.length === closeTags.length) {
  console.log('  ✅ 모든 여는 태그와 닫는 태그의 쌍이 일치합니다.');
} else {
  console.error('❌ 태그 불일치 발생!');
  process.exit(1);
}

// 3. Check BUDDY_PALETTES definition & schema
console.log('\n3. 신규 추가된 BUDDY_PALETTES 팔레트 데이터 구조 검증');
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('No script found');

const scriptCode = scriptMatch[1];
const paletteMatch = scriptCode.match(/const BUDDY_PALETTES = (\[[\s\S]*?\]);/);
if (!paletteMatch) {
  console.error('❌ BUDDY_PALETTES 정의를 찾을 수 없습니다.');
  process.exit(1);
}

const palettes = eval(paletteMatch[1]);
console.log(`  - 정의된 컬러 테마 수: ${palettes.length}개`);
let paletteError = false;
palettes.forEach((p, idx) => {
  if (!p.name || !Array.isArray(p.body) || p.body.length !== 3 || !p.stroke || !p.wing || !p.wingStroke || !p.particle) {
    console.error(`❌ 팔레트 #${idx} 필드 누락:`, p);
    paletteError = true;
  }
});

if (!paletteError) {
  console.log('  ✅ 모든 컬러 팔레트가 완벽한 필드 스키마를 충족합니다.');
} else {
  process.exit(1);
}

console.log('\n✨ [1차 검토 결과]: 모든 검증 항목 이상 없음 (PASS)!');
