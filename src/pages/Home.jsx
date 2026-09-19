import { Link } from 'react-router-dom';
import { getSubjectSummary } from '../utils/progress';

const subjects = [
  { key: 'hindi', to: '/hindi', emoji: '🇮🇳', title: 'हिन्दी', subtitle: '2 अक्षर शब्द' },
  { key: 'english', to: '/english', emoji: '🔤', title: 'English', subtitle: 'Alphabet Tracing' },
  { key: 'math', to: '/math', emoji: '🔢', title: 'Math', subtitle: 'Number Tracing & Counting' },
];

export default function Home() {
  return (
    <div className="home-page">
      <h1>🎒 Kid's Learning App</h1>
      <p className="tagline">Trace, Choose &amp; Learn — English, Math &amp; Hindi</p>
      <div className="subject-grid">
        {subjects.map((s) => {
          const summary = getSubjectSummary(s.key);
          return (
            <Link key={s.key} to={s.to} className="subject-card">
              <div className="subject-emoji">{s.emoji}</div>
              <h3>{s.title}</h3>
              <p>{s.subtitle}</p>
              <div className="subject-stars">⭐ {summary.stars}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
