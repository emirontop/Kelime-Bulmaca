import letters from '../letters';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      color: '#222',
      lineHeight: '1.6'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        English → Turkish Dictionary
      </h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.entries(letters).map(([eng, tr], index) => (
          <li key={index} style={{
            padding: '0.4rem 0',
            borderBottom: '1px solid #ddd'
          }}>
            <strong>{eng}</strong> → {tr}
          </li>
        ))}
      </ul>
    </div>
  );
          }
