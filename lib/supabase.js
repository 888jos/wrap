(function initShipshotSupabase(global) {
  const env = global.__SHIPSHOT_ENV__ || {};
  const supabaseUrl = String(env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const supabaseKey = String(env.VITE_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '').trim();
  const createClient = global.supabase?.createClient;

  let client = null;

  if (!createClient) {
    console.warn('Supabase SDK is not available in the browser runtime.');
  } else if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables are missing. Auth and sync are disabled.');
  } else {
    client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  global.SHIPSHOT_SUPABASE = client;
  global.SHIPSHOT_SUPABASE_CONFIG = {
    configured: Boolean(client),
    url: supabaseUrl || null,
  };
})(window);
