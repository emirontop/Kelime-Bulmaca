import { useEffect, useState } from 'react';
import letters from '../letters';

const normalize = (text) => {
  return text
    .toLowerCase()
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i');
};

export default function Home() {
  const [word, setWord] = useState('');
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [combo, setCombo] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem('stats'));
    if (stats) {
      setCorrect(stats.correct || 0);
      setWrong(stats.wrong || 0);
      setCombo(stats.combo || 0);
    }
    getRandomWord();
  }, []);

  useEffect(() => {
    localStorage.setItem('stats', JSON.stringify({ correct, wrong, combo }));
  }, [correct, wrong, combo]);

  const getRandomWord = () => {
    const keys = Object.keys(letters);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setWord(randomKey);
    setInput('');
    setMessage('');
  };

  const handleCheck = () => {
    if (!input.trim()) {
      setMessage("❗ Lütfen boş bırakmayın.");
      return;
    }
    const answer = normalize(input);
    const correctAnswer = normalize(letters[word]);

    if (answer === correctAnswer) {
      setMessage("✅ Doğru!");
      setCorrect(c => c + 1);
      setCombo(c => c + 1);
    } else {
      setMessage(`❌ Yanlış! Doğru cevap: ${letters[word]}`);
      setWrong(w => w + 1);
      setCombo(0);
    }

    setTimeout(getRandomWord, 1500);
  };

  return (
    <div style={{
      fontFamily: 'Arial',
      padding: '2rem',
      backgroundColor: '#f3f3f3',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem' }}>Translate this word:</h1>
      <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>{word}</h2>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Türkçesini yazın..."
        style={{
          padding: '1rem',
          fontSize: '1.2rem',
          width: '80%',
          maxWidth: '400px',
          borderRadius: '0.5rem',
          border: '1px solid #ccc'
        }}
      />

      <div>
        <button
          onClick={handleCheck}
          style={{
            marginTop: '1rem',
            padding: '0.7rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '0.3rem',
            cursor: 'pointer'
          }}
        >
          Kontrol Et
        </button>
      </div>

      {message && (
        <p style={{
          marginTop: '1rem',
          fontSize: '1.1rem',
          color: message.startsWith("✅") ? 'green' : 'red'
        }}>
          {message}
        </p>
      )}

      <div style={{
        marginTop: '2rem',
        fontSize: '1rem',
        color: '#333'
      }}>
        <p>✅ Doğru: {correct} | ❌ Yanlış: {wrong}</p>
        <p style={{ fontSize: '1.2rem' }}>
          🔥 Combo: <strong>{combo}</strong> {combo >= 3 ? '🔥' : ''}
        </p>
      </div>
    </div>
  );
              }
