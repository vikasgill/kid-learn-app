import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TracingCanvas from '../components/TracingCanvas';
import MultipleChoice from '../components/MultipleChoice';
import { hindiSets } from '../data/hindiWords';
import { markComplete, getWorksheetProgress } from '../utils/progress';

const SUBJECT = 'hindi';
const WORKSHEET_ID = 'set1';
const items = hindiSets.set1.items;

export default function HindiWorksheet() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState('trace'); // 'trace' | 'choice'
  const [answered, setAnswered] = useState(null);
  const progress = getWorksheetProgress(SUBJECT, WORKSHEET_ID);
  const item = items[index];

  const handleChoice = (opt) => {
    setAnswered(opt);
    markComplete(SUBJECT, WORKSHEET_ID, index, opt === item.answer);
  };

  const handleTraceDone = () => {
    markComplete(SUBJECT, WORKSHEET_ID, index, true);
    goNext();
  };

  const goNext = () => {
    setAnswered(null);
    setIndex((i) => Math.min(i + 1, items.length - 1));
  };
  const goPrev = () => {
    setAnswered(null);
    setIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <div className="worksheet-page">
      <header className="worksheet-header">
        <Link to="/" className="back-link">← Home</Link>
        <h2>2 अक्षर के शब्द (Two-Letter Hindi Words)</h2>
        <div className="stars">⭐ {progress.stars}</div>
      </header>

      <div className="mode-toggle">
        <button className={mode === 'trace' ? 'active' : ''} onClick={() => setMode('trace')}>✍️ Trace</button>
        <button className={mode === 'choice' ? 'active' : ''} onClick={() => setMode('choice')}>🔤 Choose</button>
        <Link to="/print/hindi" className="btn-print">🖨️ Print Worksheet</Link>
      </div>

      <div className="item-card">
        <div className="item-emoji">{item.emoji}</div>
        <div className="item-word-row">
          {mode === 'trace' ? (
            <TracingCanvas guide={item.answer} width={140} height={140} />
          ) : (
            <div className="blank-box">?</div>
          )}
          <span className="given-part">{item.given}</span>
        </div>

        {mode === 'trace' ? (
          <button className="btn-primary" onClick={handleTraceDone}>✅ Done, Next Word</button>
        ) : (
          <MultipleChoice options={item.options} answer={item.answer} answered={answered} onAnswer={handleChoice} />
        )}
        {mode === 'choice' && answered && (
          <div className="word-reveal">Word: <strong>{item.word}</strong></div>
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
