const fs = require('fs');
const path = require('path');

const envLocalPath = path.join(process.cwd(), '.env.local');

console.log('--- Verificando .env.local ---');
console.log('Caminho:', envLocalPath);

if (fs.existsSync(envLocalPath)) {
    console.log('Arquivo ENCONTRADO.');
    const content = fs.readFileSync(envLocalPath, 'utf8');
    const lines = content.split('\n');

    console.log('\nChaves encontradas:');
    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const parts = trimmed.split('=');
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();

            if (key.startsWith('NEXT_PUBLIC_FIREBASE') || key.startsWith('FIREBASE_')) {
                console.log(`[Linha ${index + 1}] ${key}: ${value ? 'DEFINIDO (Tamanho: ' + value.length + ')' : 'VAZIO'}`);
            } else {
                console.log(`[Linha ${index + 1}] ${key}: (Outra chave)`);
            }
        }
    });
} else {
    console.log('ERRO: Arquivo .env.local NÃO encontrado.');
}
console.log('------------------------------');
