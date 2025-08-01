import { useState } from 'react';
import letters from '../letters';

// Türkçe karakterleri düzleştirir
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

// Rastgele bir index döndürür
function getRandomIndex(length, exclude) {
  let idx;
  do {
    idx = Math.floor(Math.random() * length);
  } while (idx === exclude && length > 1);
  return idx;
}

export default function Home() {
  const entries = Object.entries(letters);
  const [index, setIndex] = useState(getRandomIndex(entries.length, -1));
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState(null);

  // İstatistikler
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [combo, setCombo] = useState(0);

  const handleCheck = () => {
    const correct = normalize(entries[index][1].trim());
    const userAnswer = normalize(answer.trim());

    if (userAnswer === correct) {
      setStatus('correct');
      setCorrectCount(prev => prev + 1);
      setCombo(prev => prev + 1);

      setTimeout(() => {
        setIndex(getRandomIndex(entries.length, index));
        setAnswer('');
        setStatus(null);
      }, 1000);
    } else {
      setStatus('wrong');
      setWrongCount(prev => prev + 1);
      setCombo(0);
    }
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f1f3f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* 🔥 Combo Görseli */}
        {combo >= 3 && (
          <div style={{
            position: 'absolute',
            top: '-1.5rem',
            right: '-1.5rem',
            fontSize: '3rem'
          }}>
            🔥
          </div>
        )}

        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>
          Translate the word below:
        </h2>

        <div style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#0070f3',
          marginBottom: '1rem'
        }}>
          {entries[index][0]}
        </div>

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
          placeholder="Türkçesini yaz..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: status === 'correct' ? '2px solid #38c172' :
                    status === 'wrong' ? '2px solid #e3342f' :
                    '1px solid #ccc',
            borderRadius: '6px',
            outline: 'none',
            transition: 'border 0.2s ease'
          }}
        />

        {/* ✅ / ❌ Geri Bildirim */}
        {status === 'correct' && (
          <p style={{ color: '#38c172', marginTop: '0.75rem' }}>✅ Correct!</p>
        )}
        {status === 'wrong' && (
          <p style={{ color: '#e3342f', marginTop: '0.75rem' }}>❌ Wrong! Try again.</p>
        )}

        {/* 📊 İstatistikler */}
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'left',
          fontSize: '0.95rem',
          color: '#555'
        }}>
          <p><strong>✅ Correct:</strong> {correctCount}</p>
          <p><strong>❌ Wrong:</strong> {wrongCount}</p>
          <p><strong>🔥 Combo:</strong> {combo}</p>
        </div>
      </div>
    </div>
  );
            }
