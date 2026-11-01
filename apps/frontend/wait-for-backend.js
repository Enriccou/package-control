import http from 'http';

const BACKEND_URL = 'http://localhost:3000';
const MAX_RETRIES = 30;
const RETRY_INTERVAL = 1000; // 1 segundo

let retries = 0;

const checkBackend = () => {
  const req = http.get(BACKEND_URL, { timeout: 5000 }, (res) => {
    if (res.statusCode === 200 || res.statusCode === 404) {
      console.log('✅ Backend está online! Iniciando frontend...\n');
      process.exit(0);
    } else {
      retry();
    }
  });

  req.on('error', () => retry());
  req.on('timeout', () => {
    req.destroy();
    retry();
  });
};

const retry = () => {
  retries++;
  if (retries > MAX_RETRIES) {
    console.error('\n❌ Timeout: Backend não respondeu após 30 segundos');
    console.error('Certifique-se de que o backend está rodando com: pnpm start:backend\n');
    process.exit(1);
  }
  console.log(`⏳ Aguardando backend... (${retries}/${MAX_RETRIES})`);
  setTimeout(checkBackend, RETRY_INTERVAL);
};

console.log('🔍 Verificando se backend está online...\n');
checkBackend();
