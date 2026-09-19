import { useState } from 'react';
import { Link } from 'react-router-dom';
import TracingCanvas from '../components/TracingCanvas';
import MultipleChoice from '../components/MultipleChoice';
import { englishAlphabetSet } from '../data/englishAlphabet';
import { markComplete, getWorksheetProgress } from '../utils/progress';

const SUBJECT = 'english';
const WORKSHEET_ID = 'alphabet';
const items = englishAlphabetSet.items;

export default function EnglishWorksheet() {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState('trace');
  const [answered, setAnswered] = useState(null);
  const progress = getWorksheetProgress(SUBJECT, WORKSHEET_ID);
  const item = items[index];

  const handleChoice = (opt) => {
    setAnswered(opt);
    markComplete(SUBJECT, WORKSHEET_ID, index, opt === item.letter);
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
        <h2>Alphabet Tracing (A–Z)</h2>
        <div className="stars">⭐ {progress.stars}</div>
      </header>

      <div className="mode-toggle">
        <button className={mode === 'trace' ? 'active' : ''} onClick={() => setMode('trace')}>✍️ Trace</button>
        <button className={mode === 'choice' ? 'active' : ''} onClick={() => setMode('choice')}>🔤 Choose</button>
        <Link to="/print/english" className="btn-print">🖨️ Print Worksheet</Link>
      </div>

      <div className="item-card">
        <div className="item-emoji">{item.emoji}</div>
        <p className="item-caption">{item.word}</p>
        {mode === 'trace' ? (
          <div className="trace-pair">
            <TracingCanvas guide={item.letter} width={130} height={130} />
            <TracingCanvas guide={item.lower} width={130} height={130} />
          </div>
        ) : (
          <MultipleChoice options={item.options} answer={item.letter} answered={answered} onAnswer={handleChoice} />
        )}
        {mode === 'trace' && (
          <button className="btn-primary" onClick={handleTraceDone}>✅ Done, Next Letter</button>
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
