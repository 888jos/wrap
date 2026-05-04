(function initWorkspaceApi(global) {
  const WORKSPACE_KEY = 'shipshot-workspace';
  const DEFAULT_WORKSPACE = {
    trackedApps: [],
    projects: [],
    favoriteAppIds: [],
    settings: {},
  };

  function getSupabaseClient() {
    return global.SHIPSHOT_SUPABASE || null;
  }

  function cloneDefaultWorkspace() {
    return JSON.parse(JSON.stringify(DEFAULT_WORKSPACE));
  }

  function loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(WORKSPACE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error parsing localStorage:', error);
    }
    return cloneDefaultWorkspace();
  }

  async function getCurrentUser() {
    const supabase = getSupabaseClient();
    if (!supabase) return null;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return null;
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.warn('Supabase getUser returned an auth error:', error.message);
        return null;
      }
      return user || null;
    } catch (error) {
      console.warn('Unable to resolve current Supabase user:', error?.message || error);
      return null;
    }
  }

  async function loadWorkspace() {
    try {
      const supabase = getSupabaseClient();
      const user = await getCurrentUser();

      if (supabase && user) {
        const { data, error } = await supabase
          .from('workspaces')
          .select('data')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading workspace from Supabase:', error);
          return loadFromLocalStorage();
        }

        if (data?.data) {
          localStorage.setItem(WORKSPACE_KEY, JSON.stringify(data.data));
          return data.data;
        }

        const localData = loadFromLocalStorage();
        if (localData && (localData.trackedApps?.length > 0 || localData.projects?.length > 0)) {
          await saveWorkspace(localData);
          return localData;
        }

        return cloneDefaultWorkspace();
      }

      return loadFromLocalStorage();
    } catch (error) {
      console.error('Error loading workspace:', error);
      return loadFromLocalStorage();
    }
  }

  async function saveWorkspace(data) {
    const nextData = data || cloneDefaultWorkspace();

    try {
      localStorage.setItem(WORKSPACE_KEY, JSON.stringify(nextData));

      const supabase = getSupabaseClient();
      const user = await getCurrentUser();

      if (supabase && user) {
        const { error } = await supabase
          .from('workspaces')
          .upsert({
            user_id: user.id,
            data: nextData,
          }, {
            onConflict: 'user_id',
          });

        if (error) {
          console.error('Error saving workspace to Supabase:', error);
        }
      }

      return nextData;
    } catch (error) {
      console.error('Error saving workspace:', error);
      return nextData;
    }
  }

  async function updateWorkspace(updates) {
    const current = await loadWorkspace();
    const updated = { ...current, ...updates };
    return saveWorkspace(updated);
  }

  async function signIn(email, password) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase is not configured.');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    await loadWorkspace();
    return data;
  }

  async function signUp(email, password) {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error('Supabase is not configured.');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async function signOut() {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  function onAuthStateChange(callback) {
    const supabase = getSupabaseClient();

    if (!supabase) {
      return {
        data: {
          subscription: {
            unsubscribe() {},
          },
        },
      };
    }

    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const workspace = await loadWorkspace();
        callback(event, session, workspace);
      } else if (event === 'SIGNED_OUT') {
        callback(event, session, cloneDefaultWorkspace());
      } else {
        callback(event, session);
      }
    });
  }

  global.SHIPSHOT_WORKSPACE = {
    WORKSPACE_KEY,
    DEFAULT_WORKSPACE,
    getCurrentUser,
    loadWorkspace,
    saveWorkspace,
    updateWorkspace,
    signIn,
    signUp,
    signOut,
    onAuthStateChange,
  };
})(window);
