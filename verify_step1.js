const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Check all HTML Element IDs
const idMatches = [...html.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
const getElMatches = [...html.matchAll(/getElementById\(["']([^"']+)["']\)/g)].map(m => m[1]);

console.log('=== [1차 검토: DOM ID 일치 여부] ===');
console.log('HTML 정의 ID 목록:', idMatches);
console.log('JS 호출 ID 목록:', getElMatches);

const missing = getElMatches.filter(id => !idMatches.includes(id));
if (missing.length > 0) {
  console.error('❌ 누락된 ID 발견:', missing);
  process.exit(1);
} else {
  console.log('✅ 모든 DOM 요소 ID가 완벽하게 일치합니다.');
}

// 2. Check HTML Structure integrity
console.log('\n=== [1차 검토: HTML 태그 완전성] ===');
const openTags = (html.match(/<([a-z1-6]+)(?:\s+[^>]*?)?(?<!\/)>/gi) || []).map(t => t.match(/<([a-z1-6]+)/i)[1].toLowerCase());
const closeTags = (html.match(/<\/([a-z1-6]+)>/gi) || []).map(t => t.match(/<\/([a-z1-6]+)>/i)[1].toLowerCase());
const voidTags = ['meta', 'link', 'img', 'br', 'hr', 'input'];
const nonVoidOpen = openTags.filter(t => !voidTags.includes(t));

console.log(`열린 태그 수(void 제외): ${nonVoidOpen.length}, 닫힌 태그 수: ${closeTags.length}`);
if (nonVoidOpen.length === closeTags.length) {
  console.log('✅ 모든 여는 태그와 닫는 태그의 쌍이 일치합니다.');
} else {
  console.warn('⚠️ 태그 개수 차이 (확인 필요):', nonVoidOpen.length - closeTags.length);
}
