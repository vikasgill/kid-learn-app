// English alphabet tracing worksheet data
const words = {
  A: { emoji: '🍎', word: 'Apple' },
  B: { emoji: '🎈', word: 'Balloon' },
  C: { emoji: '🐱', word: 'Cat' },
  D: { emoji: '🐶', word: 'Dog' },
  E: { emoji: '🥚', word: 'Egg' },
  F: { emoji: '🐟', word: 'Fish' },
  G: { emoji: '🍇', word: 'Grapes' },
  H: { emoji: '🎩', word: 'Hat' },
  I: { emoji: '🍦', word: 'Ice cream' },
  J: { emoji: '🧃', word: 'Juice' },
  K: { emoji: '🔑', word: 'Key' },
  L: { emoji: '🍋', word: 'Lemon' },
  M: { emoji: '🌙', word: 'Moon' },
  N: { emoji: '🥜', word: 'Nut' },
  O: { emoji: '🦉', word: 'Owl' },
  P: { emoji: '🐧', word: 'Penguin' },
  Q: { emoji: '👸', word: 'Queen' },
  R: { emoji: '🌈', word: 'Rainbow' },
  S: { emoji: '☀️', word: 'Sun' },
  T: { emoji: '🌳', word: 'Tree' },
  U: { emoji: '☂️', word: 'Umbrella' },
  V: { emoji: '🎻', word: 'Violin' },
  W: { emoji: '⌚', word: 'Watch' },
  X: { emoji: '🎄', word: 'Xmas tree' },
  Y: { emoji: '🪀', word: 'Yo-yo' },
  Z: { emoji: '🦓', word: 'Zebra' },
};

const letters = Object.keys(words);

function sample(exclude, n) {
  const pool = letters.filter((l) => l !== exclude);
  const picked = [];
  while (picked.length < n && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

export const englishAlphabetSet = {
  title: 'Alphabet Tracing (A–Z)',
  items: letters.map((letter) => ({
    letter,
    lower: letter.toLowerCase(),
    emoji: words[letter].emoji,
    word: words[letter].word,
    options: [letter, ...sample(letter, 3)].sort(() => Math.random() - 0.5),
  })),
};
