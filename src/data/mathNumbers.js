// Number tracing + counting worksheet data (1-20)
function counterEmoji(n) {
  return '⭐'.repeat(n);
}

function sampleNums(exclude, n) {
  const pool = Array.from({ length: 20 }, (_, i) => i + 1).filter((x) => x !== exclude);
  const picked = [];
  while (picked.length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

export const mathNumberSet = {
  title: 'Number Tracing & Counting (1–20)',
  items: Array.from({ length: 20 }, (_, i) => i + 1).map((n) => ({
    number: n,
    counters: counterEmoji(n),
    options: [n, ...sampleNums(n, 3)].sort(() => Math.random() - 0.5),
  })),
};
