'use client';

import GoogleIcon from '@/components/ui/icons/GoogleIcon';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogin = async (e) => {
    e.preventDefault();
          setError('');
          setLoading(true);
    
          try {
            // 1. Autenticar com o Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // 2. Obter o token de ID do usuário
            const token = await user.getIdToken();
    
            // 3. Enviar o token para a API para criar a sessão
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            });
    
            if (!response.ok) {
              const data = await response.json();
              throw new Error(data.error || 'Falha ao criar a sessão.');
            }
    
            // 4. Redirecionar para o dashboard do admin
            router.push('/admin/dashboard');
    
          } catch (err) {
            console.error('Erro no login:', err);
            setError(err.message || 'Ocorreu um erro durante o login.');
          } finally {
            setLoading(false);
          }
        };
    
        const handleGoogleLogin = async () => {
          setError('');
          setGoogleLoading(true);
    
          try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            // Obter o token de ID do usuário
            const token = await user.getIdToken();
    
            // Enviar o token para a API para criar a sessão
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            });
    
            if (!response.ok) {
              const data = await response.json();
              throw new Error(data.error || 'Falha ao criar a sessão com Google.');
            }
    
            router.push('/admin/dashboard');
    
          } catch (err) {
            console.error('Erro no login com Google:', err);
            setError(err.message || 'Ocorreu um erro durante o login com Google.');
          } finally {
            setGoogleLoading(false);
          }
        };
    
        return (
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleLogin}>
              <h2>Login do Administrador</h2>
              {error && <p className={styles.error}>{error}</p>}
              <Input
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || googleLoading}
              />
              <Input
                label="Senha"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || googleLoading}
              />
              <Button type="submit" disabled={loading || googleLoading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
              <div className={styles.divider}>OU</div>
              <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                className={styles.googleButton}
              >
                <GoogleIcon size={20} />
                {googleLoading ? 'Entrando com Google...' : 'Entrar com Google'}
              </Button>
            </form>
          </div>
        );
      }
