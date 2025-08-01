import { useState } from 'react';
import letters from '../letters';

// Türkçe karakterleri düzleştiren fonksiyon
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u');
}

export default function Home() {
  const entries = Object.entries(letters);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null); // null, 'correct', 'wrong'

  const handleCheck = () => {
    const correct = normalize(entries[index][1].trim());
    const userAnswer = normalize(answer.trim());

    if (userAnswer === correct) {
      setStatus('correct');
      setTimeout(() => {
        setIndex(prev => (prev + 1) % entries.length);
        setAnswer('');
        setStatus(null);
      }, 1000);
    } else {
      setStatus('wrong');
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      maxWidth: '500px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1>Translate This:</h1>
      <h2 style={{ fontSize: '2rem', margin: '1rem 0' }}>
        {entries[index][0]}
      </h2>

      <input
        type="text"
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
          setStatus(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCheck();
        }}
        style={{
          padding: '0.5rem',
          width: '100%',
          fontSize: '1rem',
          border: status === 'correct' ? '2px solid green' :
                  status === 'wrong' ? '2px solid red' :
                  '1px solid #ccc',
          borderRadius: '4px',
          outline: 'none'
        }}
        placeholder="Türkçesini yaz..."
      />

      {status === 'correct' && <p style={{ color: 'green', marginTop: '0.5rem' }}>✅ Doğru!</p>}
      {status === 'wrong' && <p style={{ color: 'red', marginTop: '0.5rem' }}>❌ Yanlış! Tekrar dene.</p>}
    </div>
  );
}
