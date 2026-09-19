import { useState } from 'react';
import { Link } from 'react-router-dom';
import TracingCanvas from '../components/TracingCanvas';
import MultipleChoice from '../components/MultipleChoice';
import { mathNumberSet } from '../data/mathNumbers';
import { markComplete, getWorksheetProgress } from '../utils/progress';

const SUBJECT = 'math';
const WORKSHEET_ID = 'numbers';
const items = mathNumberSet.items;

export default function MathWorksheet() {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState('trace');
  const [answered, setAnswered] = useState(null);
  const progress = getWorksheetProgress(SUBJECT, WORKSHEET_ID);
  const item = items[index];

  const handleChoice = (opt) => {
    setAnswered(opt);
    markComplete(SUBJECT, WORKSHEET_ID, index, opt === item.number);
  };

  const handleTraceDone = () => {
    markComplete(SUBJECT, WORKSHEET_ID, index, true);
    goNext();
  };

  const goNext = () => { setAnswered(null); setIndex((i) => Math.min(i + 1, items.length - 1)); };
  const goPrev = () => { setAnswered(null); setIndex((i) => Math.max(i - 1, 0)); };

  return (
    <div className="worksheet-page">
      <header className="worksheet-header">
        <Link to="/" className="back-link">← Home</Link>
        <h2>Number Tracing & Counting (1–20)</h2>
        <div className="stars">⭐ {progress.stars}</div>
      </header>

      <div className="mode-toggle">
        <button className={mode === 'trace' ? 'active' : ''} onClick={() => setMode('trace')}>✍️ Trace</button>
        <button className={mode === 'choice' ? 'active' : ''} onClick={() => setMode('choice')}>🔢 Count &amp; Choose</button>
        <Link to="/print/math" className="btn-print">🖨️ Print Worksheet</Link>
      </div>

      <div className="item-card">
        <div className="item-counters">{item.counters}</div>
        {mode === 'trace' ? (
          <>
            <TracingCanvas guide={String(item.number)} width={160} height={160} />
            <button className="btn-primary" onClick={handleTraceDone}>✅ Done, Next Number</button>
          </>
        ) : (
          <MultipleChoice options={item.options} answer={item.number} answered={answered} onAnswer={handleChoice} />
        )}
      </div>

      <div className="nav-row">
        <button onClick={goPrev} disabled={index === 0}>◀ Prev</button>
        <span>{index + 1} / {items.length}</span>
        <button onClick={goNext} disabled={index === items.length - 1}>Next ▶</button>
      </div>
    </div>
  );
}
