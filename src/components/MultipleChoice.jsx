export default function MultipleChoice({ options, answer, onAnswer, answered }) {
  return (
    <div className="mc-options">
      {options.map((opt) => {
        const isAnswer = opt === answer || opt === Number(answer);
        const showState = answered !== null;
        let cls = 'mc-btn';
        if (showState && answered === opt) {
          cls += isAnswer ? ' mc-correct' : ' mc-wrong';
        } else if (showState && isAnswer) {
          cls += ' mc-correct-reveal';
        }
        return (
          <button
            key={opt}
            type="button"
            className={cls}
            disabled={showState}
            onClick={() => onAnswer(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
