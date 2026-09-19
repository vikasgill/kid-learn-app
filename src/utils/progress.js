// Simple localStorage-based progress tracker (offline-first, no backend needed)
const KEY = 'kidLearnProgress_v1';

function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function saveAll(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function markComplete(subject, worksheetId, itemIndex, correct) {
  const all = loadAll();
  if (!all[subject]) all[subject] = {};
  if (!all[subject][worksheetId]) all[subject][worksheetId] = { done: {}, stars: 0 };
  const entry = all[subject][worksheetId];
  const wasCorrectBefore = entry.done[itemIndex]?.correct;
  entry.done[itemIndex] = { correct, ts: Date.now() };
  if (correct && !wasCorrectBefore) entry.stars += 1;
  saveAll(all);
  return entry;
}

export function getWorksheetProgress(subject, worksheetId) {
  const all = loadAll();
  return all[subject]?.[worksheetId] || { done: {}, stars: 0 };
}

export function getSubjectSummary(subject) {
  const all = loadAll();
  const worksheets = all[subject] || {};
  let stars = 0;
  let attempted = 0;
  Object.values(worksheets).forEach((w) => {
    stars += w.stars;
    attempted += Object.keys(w.done).length;
  });
  return { stars, attempted };
}

export function resetProgress() {
  localStorage.removeItem(KEY);
}
