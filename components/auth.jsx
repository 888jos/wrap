const { useState, useEffect, createContext, useContext } = React;
const workspaceApi = window.SHIPSHOT_WORKSPACE || {};
const getCurrentUser = workspaceApi.getCurrentUser || (async () => null);
const signIn = workspaceApi.signIn || (async () => { throw new Error('Supabase is not configured.'); });
const signUp = workspaceApi.signUp || (async () => { throw new Error('Supabase is not configured.'); });
const signOut = workspaceApi.signOut || (async () => {});
const onAuthStateChange = workspaceApi.onAuthStateChange || (() => ({
  data: { subscription: { unsubscribe() {} } },
}));
const loadWorkspace = workspaceApi.loadWorkspace || (async () => ({}));

// Auth Context
const AuthContext = createContext({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children, onWorkspaceSync }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: subscription } = onAuthStateChange(async (event, session, workspace) => {
      setUser(session?.user ?? null);

      // Sync workspace when auth changes
      if (workspace && onWorkspaceSync) {
        onWorkspaceSync(workspace);
      } else if (event === 'SIGNED_OUT' && onWorkspaceSync) {
        // Load from localStorage after sign out
        const localWorkspace = await loadWorkspace();
        onWorkspaceSync(localWorkspace);
      }
    });

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, [onWorkspaceSync]);

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Login/Signup Modal Component
function AuthModal({ isOpen, onClose, onSuccess }) {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (password.trim().length < 6) {
        throw new Error('Password must contain at least 6 characters.');
      }
      if (mode === 'signin') {
        await signIn(email, password);
        onSuccess?.();
        onClose();
      } else {
        const result = await signUp(email, password);
        const session = result?.data?.session || result?.session || null;
        const user = result?.data?.user || result?.user || null;
        if (session?.user) {
          onSuccess?.();
          onClose();
          return;
        }
        setSuccess(
          user?.email
            ? `Account created for ${user.email}. Check your inbox and confirm your email before signing in.`
            : 'Account created. Check your inbox and confirm your email before signing in.'
        );
        setMode('signin');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-1)',
          border: '1px solid var(--border-1)',
          borderRadius: 12,
          padding: 24,
          width: 400,
          maxWidth: '90vw',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: '0 0 16px 0', fontSize: 20, fontWeight: 700 }}>
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: 14,
                borderRadius: 6,
                border: '1px solid var(--border-1)',
                background: 'var(--bg-2)',
                color: 'var(--text-1)',
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, fontWeight: 600 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: 14,
                borderRadius: 6,
                border: '1px solid var(--border-1)',
                background: 'var(--bg-2)',
                color: 'var(--text-1)',
              }}
            />
          </div>

          {success && (
            <div
              style={{
                padding: 8,
                marginBottom: 12,
                background: 'rgba(74, 222, 128, 0.12)',
                border: '1px solid rgba(74, 222, 128, 0.45)',
                borderRadius: 6,
                fontSize: 13,
                color: '#86efac',
              }}
            >
              {success}
            </div>
          )}

          {error && (
            <div
              style={{
                padding: 8,
                marginBottom: 12,
                background: '#f8717120',
                border: '1px solid #f87171',
                borderRadius: 6,
                fontSize: 13,
                color: '#f87171',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px 16px',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 6,
              border: 'none',
              background: 'linear-gradient(135deg, #667085, #344054)',
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13 }}>
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
              setSuccess('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-2)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {mode === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}

window.useAuth = useAuth;
window.AuthProvider = AuthProvider;
window.AuthModal = AuthModal;
