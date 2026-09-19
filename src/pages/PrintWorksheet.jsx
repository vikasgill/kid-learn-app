import { useParams, Link } from 'react-router-dom';
import { hindiSets } from '../data/hindiWords';
import { englishAlphabetSet } from '../data/englishAlphabet';
import { mathNumberSet } from '../data/mathNumbers';

const CONFIG = {
  hindi: {
    heading: '2 अक्षर के शब्द वर्कशीट',
    instruction: 'चित्र देखें और रिक्त स्थानों पर सही अक्षर लिखें।',
    items: hindiSets.set1.items.map((it) => ({ emoji: it.emoji, blankFirst: true, text: it.given })),
  },
  english: {
    heading: 'Alphabet Tracing Worksheet',
    instruction: 'Look at the picture and trace/write the missing letter.',
    items: englishAlphabetSet.items.map((it) => ({ emoji: it.emoji, blankFirst: true, text: `${it.word}` })),
  },
  math: {
    heading: 'Number Tracing & Counting Worksheet',
    instruction: 'Count the stars and write the correct number.',
    items: mathNumberSet.items.map((it) => ({ emoji: it.counters, blankFirst: false, text: '' })),
  },
};

export default function PrintWorksheet() {
  const { subject } = useParams();
  const cfg = CONFIG[subject];

  if (!cfg) return <p>Unknown worksheet.</p>;

  return (
    <div className="print-page">
      <div className="no-print top-actions">
        <Link to={`/${subject}`} className="back-link">← Back to App</Link>
        <button className="btn-primary" onClick={() => window.print()}>🖨️ Print / Save as PDF</button>
      </div>

      <div className="print-sheet">
        <div className="print-header">
          <div className="brand">🎒 Kid's Learning App</div>
          <h2>{cfg.heading}</h2>
        </div>
        <div className="print-namefields">
          <span>Name: ______________________</span>
          <span>Class: ______________________</span>
          <span>Date: ______________________</span>
        </div>
        <p className="print-instruction">📝 {cfg.instruction}</p>

        <div className="print-grid">
          {cfg.items.map((it, i) => (
            <div className="print-item" key={i}>
              <span className="print-emoji">{it.emoji}</span>
              {it.blankFirst ? (
                <span className="print-blank">
                  <span className="blank-line" />{it.text}
                </span>
              ) : (
                <span className="print-blank">
                  <span className="blank-line" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
