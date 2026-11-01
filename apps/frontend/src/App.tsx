import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>📦 Package Control</h1>
      <p>Bem-vindo ao sistema de gerenciamento de pacotes</p>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Status do Backend</h2>
        <p>API disponível em: <code>http://localhost:3000</code></p>
        <p>Contador: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Incrementar
        </button>
      </div>
    </div>
  );
}
