import React from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import './styles.css';

window.React = React;
window.ReactDOM = { createRoot };
window.supabase = { createClient };
window.__SHIPSHOT_ENV__ = {
  ...(window.__SHIPSHOT_ENV__ || {}),
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  NEXT_PUBLIC_SUPABASE_URL: import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '',
  VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '',
};

(function attachReactElementGuard() {
  const originalCreateElement = React.createElement;
  React.createElement = function patchedCreateElement(type, ...rest) {
    if (type === undefined || type === null) {
      const props = rest[0] || {};
      const hint = props && typeof props === 'object' ? Object.keys(props).join(', ') : '';
      throw new Error(`Undefined React element type while rendering. Props keys: ${hint || 'none'}`);
    }
    return originalCreateElement.call(this, type, ...rest);
  };
})();

async function bootstrap() {
  await import('./components/icons.jsx');
  await import('./components/security.jsx');
  await import('./components/error-boundary.jsx');
  await import('./lib/supabase.js');
  await import('./lib/product-context.js');
  await import('./lib/workspace.js');
  await import('./components/auth.jsx');
  await import('./components/data.jsx');
  await import('./components/credits.js');
  await import('./components/screenshot.jsx');
  await import('./components/shell.jsx');
  await import('./components/home.jsx');
  await import('./components/projects.jsx');
  await import('./components/project-screens.jsx');
  await import('./components/other-screens.jsx');
  await import('./components/wrap-screens.jsx');

  const _useState_app = React.useState;
  const _useEffect_app = React.useEffect;

  function editorRouteFromLocation() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('editor') !== '1') return null;
    const projectId = params.get('projectId');
    if (!projectId) return null;
    return {
      editorOnly: true,
      route: {
        screen: 'project',
        projectId,
        tab: 'edit',
      },
    };
  } catch {
    return null;
  }
}

  function marketingRouteFromLocation() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('site') !== '1') return null;
    return {
      marketingOnly: true,
      route: { screen: 'home' },
    };
  } catch {
    return null;
  }
}

  const TWEAKS = {
    theme: 'dark',
    accent: 'lime',
    density: 'comfortable',
    screen: 'home',
  };

  function normalizeAppRoute(route, data, options = {}) {
    const fallbackScreen = options.editorOnly ? 'project' : options.marketingOnly ? 'home' : 'discover';
    const fallbackRoute = options.editorOnly
      ? { screen: 'project', projectId: data.PROJECTS[0]?.id || '', tab: 'edit' }
      : { screen: fallbackScreen };
    const input = route && typeof route === 'object' ? route : fallbackRoute;
    const normalizedScreen = input.screen === 'projects'
      ? 'my-projects'
      : input.screen === 'onboarding'
        ? 'home'
        : input.screen;
    const validScreens = new Set([
      'home',
      'discover',
      'search',
      'trending',
      'market-insights',
      'keyword-explorer',
      'aso-analyzer',
      'screenshots',
      'reviews',
      'app-tracking',
      'rank-history',
      'competitors',
      'pricing',
      'revenue-insights',
      'hot-ideas',
      'idea-report',
      'idea-validator',
      'ai-agents',
      'favorites',
      'my-apps',
      'my-projects',
      'new-project',
      'templates',
      'assets',
      'exports',
      'app-detail',
      'project',
      'settings',
    ]);
    if (!validScreens.has(normalizedScreen)) return fallbackRoute;
    if (normalizedScreen === 'project') {
      const projectId = input.projectId || data.PROJECTS[0]?.id || '';
      if (!projectId) return options.editorOnly ? fallbackRoute : { screen: 'my-projects' };
      return {
        screen: 'project',
        projectId,
        tab: input.tab || (options.editorOnly ? 'edit' : 'overview'),
      };
    }
    return { ...input, screen: normalizedScreen };
  }

  function App() {
  const editorSession = editorRouteFromLocation();
  const marketingSession = marketingRouteFromLocation();
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem('shipshot-route') || 'null');
    } catch {
      return null;
    }
  })();
  const initialRoute = (editorSession && editorSession.route) || (marketingSession && marketingSession.route) || saved || { screen: TWEAKS.screen || 'discover' };
  const [tweaks, setTweaks] = _useState_app(TWEAKS);
  const [editMode, setEditMode] = _useState_app(false);
  const [workspace, setWorkspace] = _useState_app(() => window.SHIPSHOT.defaultWorkspace());
  const [workspaceLoaded, setWorkspaceLoaded] = _useState_app(false);
  const [sidebarCollapsed, setSidebarCollapsed] = _useState_app(() => {
    try {
      return JSON.parse(localStorage.getItem('shipshot-sidebar-collapsed') || 'false');
    } catch {
      return false;
    }
  });
  const [creditsState, setCreditsState] = _useState_app(() => window.SHIPSHOT_CREDITS.getCreditsState());
  const [creditsPanelOpen, setCreditsPanelOpen] = _useState_app(false);
  const [creditsToast, setCreditsToast] = _useState_app(null);
  const [insufficientCredits, setInsufficientCredits] = _useState_app(null);
  const editorOnly = Boolean(editorSession?.editorOnly);
  const marketingOnly = Boolean(marketingSession?.marketingOnly);

  const data = window.SHIPSHOT.buildData(workspace);
  const [route, setRoute] = _useState_app(() => normalizeAppRoute(initialRoute, data, { editorOnly, marketingOnly }));
  const routeStateRef = React.useRef('');
  window.DATA = data;
  window.__shipshotSetRoute = setRoute;

  _useEffect_app(() => {
    window.SHIPSHOT.loadWorkspace().then((loaded) => {
      setWorkspace(loaded);
      setWorkspaceLoaded(true);
    });
  }, []);

  _useEffect_app(() => {
    window.onWorkspaceLoaded = (loaded) => {
      setWorkspace(loaded);
      setWorkspaceLoaded(true);
    };
    return () => {
      window.onWorkspaceLoaded = null;
    };
  }, []);

  _useEffect_app(() => {
    if (editorOnly || marketingOnly) return;
    localStorage.setItem('shipshot-route', JSON.stringify(route));
  }, [route, editorOnly, marketingOnly]);

  _useEffect_app(() => {
    setRoute((current) => {
      const next = normalizeAppRoute(current, data, { editorOnly, marketingOnly });
      return JSON.stringify(next) === JSON.stringify(current) ? current : next;
    });
  }, [data, editorOnly, marketingOnly]);

  _useEffect_app(() => {
    if (editorOnly || marketingOnly) return;
    const nextState = { route };
    const serialized = JSON.stringify(nextState);
    if (routeStateRef.current === serialized) return;
    if (!window.history.state?.route) {
      window.history.replaceState(nextState, '', window.location.href);
    } else {
      window.history.pushState(nextState, '', window.location.href);
    }
    routeStateRef.current = serialized;
  }, [route, editorOnly, marketingOnly]);

  _useEffect_app(() => {
    if (editorOnly || marketingOnly) return undefined;
    const handlePopState = (event) => {
      const fallbackSaved = (() => {
        try {
          return JSON.parse(localStorage.getItem('shipshot-route') || 'null');
        } catch {
          return null;
        }
      })();
      const nextRoute = normalizeAppRoute(event.state?.route || fallbackSaved || { screen: 'discover' }, data, { editorOnly, marketingOnly });
      routeStateRef.current = JSON.stringify({ route: nextRoute });
      setRoute(nextRoute);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [data, editorOnly, marketingOnly]);

  _useEffect_app(() => {
    if (workspaceLoaded) {
      window.SHIPSHOT.saveWorkspace(workspace);
    }
  }, [workspace, workspaceLoaded]);

  _useEffect_app(() => {
    localStorage.setItem('shipshot-sidebar-collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  _useEffect_app(() => {
    const syncCredits = () => setCreditsState(window.SHIPSHOT_CREDITS.getCreditsState());
    window.addEventListener('shipshot:credits-updated', syncCredits);
    return () => window.removeEventListener('shipshot:credits-updated', syncCredits);
  }, []);

  _useEffect_app(() => {
    if (!creditsToast) return undefined;
    const id = setTimeout(() => setCreditsToast(null), 4000);
    return () => clearTimeout(id);
  }, [creditsToast]);

  _useEffect_app(() => {
    const plan = window.SHIPSHOT_CREDITS.PLANS[creditsState.plan] || window.SHIPSHOT_CREDITS.PLANS.maker;
    const allocation = window.SHIPSHOT_CREDITS.monthlyAllocation(creditsState.plan);
    if (!allocation) return;
    const ratio = creditsState.balance / allocation;
    if (ratio < 0.2) {
      setCreditsToast({
        tone: 'warn',
        message: `Low credits - ${creditsState.balance} left on ${plan.label}`,
      });
      return;
    }
    if (creditsState.renewsAt) {
      const days = Math.ceil((new Date(creditsState.renewsAt).getTime() - Date.now()) / 86400000);
      if (days > 0 && days <= 3) {
        setCreditsToast({
          tone: 'neutral',
          message: `Credits renew in ${days} day${days === 1 ? '' : 's'}.`,
        });
        return;
      }
    }
    if (creditsState.balance >= window.SHIPSHOT_CREDITS.rolloverCap(creditsState.plan) && plan.renewable) {
      setCreditsToast({
        tone: 'neutral',
        message: 'You are at the maximum rollover credit cap.',
      });
    }
  }, []);

  _useEffect_app(() => {
    const onMsg = (e) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === '__activate_edit_mode') setEditMode(true);
      if (e.data?.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    if (window.parent !== window && window.location.ancestorOrigins?.[0] === window.location.origin) {
      window.parent.postMessage({ type: '__edit_mode_available' }, window.location.origin);
    }
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const applyTweaks = (edits) => {
    const next = { ...tweaks, ...edits };
    setTweaks(next);
    if (window.parent !== window) {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, window.location.origin);
    }
  };

  const accentMap = { lime: undefined, violet: 'violet', amber: 'amber', cyan: 'cyan' };

  const { PROJECTS } = data;
  const activeRoute = normalizeAppRoute(route, data, { editorOnly, marketingOnly });
  const project = activeRoute.projectId ? PROJECTS.find((p) => p.id === activeRoute.projectId) : null;

  const buildEditorUrl = (projectId) => {
    const url = new URL(window.location.href);
    url.searchParams.set('editor', '1');
    url.searchParams.set('projectId', projectId);
    url.searchParams.set('tab', 'edit');
    return url.toString();
  };

  const openProjectEditor = (projectId) => {
    if (!projectId) return;
    window.open(buildEditorUrl(projectId), '_blank', 'noopener,noreferrer');
  };

  _useEffect_app(() => {
    if (activeRoute.screen !== 'project' || !activeRoute.projectId || project) return;
    if (editorOnly) {
      try {
        localStorage.setItem('shipshot-route', JSON.stringify({ screen: 'my-projects' }));
      } catch {}
      window.location.replace(window.location.pathname);
      return;
    }
    setRoute({ screen: 'my-projects' });
  }, [activeRoute.screen, activeRoute.projectId, project, PROJECTS.length, editorOnly]);

  const createProject = (input) => {
    const created = window.SHIPSHOT.createProjectFromInput(workspace, input);
    setWorkspace(created.workspace);
    return created;
  };

  const openCreditsPanel = () => setCreditsPanelOpen(true);
  const closeCreditsPanel = () => setCreditsPanelOpen(false);

  const showInsufficientCreditsModal = (cost, label = 'This action') => {
    const balance = window.SHIPSHOT_CREDITS.getCredits().balance;
    setInsufficientCredits({
      cost,
      balance,
      missing: Math.max(0, cost - balance),
      label,
    });
  };

  const refreshCredits = () => setCreditsState(window.SHIPSHOT_CREDITS.getCreditsState());

  const consumeCredits = (actions, meta = {}) => {
    const cost = window.SHIPSHOT_CREDITS.calcCost(actions);
    const result = window.SHIPSHOT_CREDITS.spendActions(actions, meta.actionLabel || 'AI action');
    if (!result.success) {
      showInsufficientCreditsModal(cost, meta.actionLabel || 'This action');
      refreshCredits();
      return { success: false, cost };
    }
    refreshCredits();
    const allocation = window.SHIPSHOT_CREDITS.monthlyAllocation(creditsState.plan);
    const remaining = result.newBalance;
    setCreditsToast({
      tone: remaining / Math.max(1, allocation) < 0.2 ? 'warn' : 'success',
      message: `${meta.successLabel || 'Action completed'} - ${cost} credits - ${remaining} left${remaining / Math.max(1, allocation) < 0.2 ? ' - Recharge soon' : ''}`,
    });
    return { success: true, cost, newBalance: result.newBalance };
  };

  _useEffect_app(() => {
    window.__shipshotCreditsUI = {
      openPanel: openCreditsPanel,
      closePanel: closeCreditsPanel,
      showInsufficient: showInsufficientCreditsModal,
      trySpend: consumeCredits,
      refresh: refreshCredits,
      getState: () => window.SHIPSHOT_CREDITS.getCreditsState(),
    };
    return () => {
      delete window.__shipshotCreditsUI;
    };
  }, [creditsState]);

  _useEffect_app(() => {
    window.__shipshotOpenProjectEditor = openProjectEditor;
    return () => {
      delete window.__shipshotOpenProjectEditor;
    };
  }, []);

  _useEffect_app(() => {
    window.__shipshotBuildEditorUrl = buildEditorUrl;
    return () => {
      delete window.__shipshotBuildEditorUrl;
    };
  }, []);

  _useEffect_app(() => {
    window.__shipshotUpdateWorkspace = (updater) => {
      setWorkspace((current) => {
        const next = typeof updater === 'function' ? updater(current) : current;
        return next || current;
      });
    };
    return () => {
      delete window.__shipshotUpdateWorkspace;
    };
  }, []);

  const queueGeneration = (projectId, prompt) => {
    if (!prompt.trim()) return;
    setWorkspace((current) => {
      const now = new Date().toISOString();
      return {
        ...current,
        generations: [
          {
            id: `gen-${Date.now().toString(36)}`,
            projectId,
            project: (current.projects.find((item) => item.id === projectId) || {}).name || 'Project',
            prompt: prompt.trim(),
            createdAt: now,
          },
          ...current.generations,
        ],
        projects: current.projects.map((item) => item.id === projectId ? {
          ...item,
          updatedAt: now,
          history: [
            { id: `history-${Date.now().toString(36)}`, when: now, label: 'Generation request saved locally' },
            ...(item.history || []),
          ],
        } : item),
      };
    });
  };

  const saveProject = (projectId, updater, historyLabel = 'Project updated') => {
    setWorkspace((current) => {
      const now = new Date().toISOString();
      return {
        ...current,
        projects: current.projects.map((item) => {
          if (item.id !== projectId) return item;
          const next = typeof updater === 'function' ? updater(item) : { ...item, ...updater };
          return {
            ...item,
            ...next,
            updatedAt: now,
            history: [
              { id: `history-${Date.now().toString(36)}`, when: now, label: historyLabel },
              ...(next.history || item.history || []),
            ],
          };
        }),
      };
    });
  };

  const crumbs = (() => {
    if (activeRoute.screen === 'home') return [{ label: 'Home', icon: <window.I.Home /> }];
    if (activeRoute.screen === 'discover') return [{ label: 'Discover', icon: <window.I.Globe /> }];
    if (activeRoute.screen === 'search') return [{ label: 'Explore', icon: <window.I.Search /> }];
    if (activeRoute.screen === 'trending') return [{ label: 'Trending', icon: <window.I.TrendingUp /> }];
    if (activeRoute.screen === 'market-insights') return [{ label: 'Market Insights', icon: <window.I.BarChart /> }];
    if (activeRoute.screen === 'keyword-explorer') return [{ label: 'Keywords', icon: <window.I.Key /> }];
    if (activeRoute.screen === 'aso-analyzer') return [{ label: 'ASO Analyzer', icon: <window.I.Target /> }];
    if (activeRoute.screen === 'screenshots') return [{ label: 'Screenshots', icon: <window.I.Image /> }];
    if (activeRoute.screen === 'reviews') return [{ label: 'Reviews', icon: <window.I.MessageSquare /> }];
    if (activeRoute.screen === 'app-tracking') return [{ label: 'App Tracking', icon: <window.I.Activity /> }];
    if (activeRoute.screen === 'rank-history') return [{ label: 'Rank History', icon: <window.I.LineChart /> }];
    if (activeRoute.screen === 'competitors') return [{ label: 'Competitors', icon: <window.I.Users /> }];
    if (activeRoute.screen === 'pricing') return [{ label: 'Pricing', icon: <window.I.DollarSign /> }];
    if (activeRoute.screen === 'revenue-insights') return [{ label: 'Revenue Insights', icon: <window.I.TrendingUp /> }];
    if (activeRoute.screen === 'hot-ideas') return [{ label: 'Hot Ideas', icon: <window.I.Lightbulb /> }];
    if (activeRoute.screen === 'idea-report') return [
      { label: 'Hot Ideas', icon: <window.I.Lightbulb />, route: { screen: 'hot-ideas' } },
      { label: activeRoute.ideaData?.name || 'Idea Report', icon: <window.I.FileText /> },
    ];
    if (activeRoute.screen === 'idea-validator') return [{ label: 'Idea Validator', icon: <window.I.CheckCircle /> }];
    if (activeRoute.screen === 'ai-agents') return [{ label: 'AI Agents', icon: <window.I.Sparkles /> }];
    if (activeRoute.screen === 'favorites') return [{ label: 'Favorites', icon: <window.I.Heart /> }];
    if (activeRoute.screen === 'my-apps') return [{ label: 'My Apps', icon: <window.I.Smartphone /> }];
    if (activeRoute.screen === 'my-projects') return [{ label: 'My Projects', icon: <window.I.Folder /> }];
    if (activeRoute.screen === 'new-project') return [
      { label: 'My Projects', icon: <window.I.Folder />, route: { screen: 'my-projects' } },
      { label: 'New Project' },
    ];
    if (activeRoute.screen === 'templates') return [{ label: 'Creative Systems', icon: <window.I.Layers /> }];
    if (activeRoute.screen === 'assets') return [{ label: 'Assets', icon: <window.I.Image /> }];
    if (activeRoute.screen === 'exports') return [{ label: 'Exports', icon: <window.I.Download /> }];
    if (activeRoute.screen === 'project' && project) return [
      { label: 'My Projects', icon: <window.I.Folder />, route: { screen: 'my-projects' } },
      { label: project.name },
      { label: (window.DATA.PROJECT_TABS.find((t) => t.id === activeRoute.tab) || {}).label || 'Overview' },
    ];
    if (activeRoute.screen === 'app-detail') return [
      { label: 'Apps', icon: <window.I.Folder />, route: { screen: 'search' } },
      { label: activeRoute.appId || 'App' },
    ];
    if (activeRoute.screen === 'settings') return [{ label: 'Settings', icon: <window.I.Settings /> }];
    return [];
  })();

  return (
    <window.ErrorBoundary>
      <div data-theme={tweaks.theme} data-accent={accentMap[tweaks.accent]} data-density={tweaks.density} style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-0)' }}>
        {!editorOnly && !marketingOnly && <window.Sidebar route={activeRoute} setRoute={setRoute} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((value) => !value)} />}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {!editorOnly && !marketingOnly && <window.TopBar route={activeRoute} crumbs={crumbs} setRoute={setRoute} right={<>
            <button className="btn icon sm"><window.I.RotateCw /></button>
            <window.AccountMenu setRoute={setRoute} />
          </>} sidebarCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed((value) => !value)} />}
          <div style={{ flex: 1, overflow: editorOnly ? 'hidden' : 'auto' }}>
            {activeRoute.screen === 'home' && !editorOnly && <window.HomeScreen setRoute={setRoute} />}
            {activeRoute.screen === 'discover' && !editorOnly && <window.WrapDiscoverScreen setRoute={setRoute} />}
            {activeRoute.screen === 'search' && !editorOnly && <window.WrapSearchScreen setRoute={setRoute} />}
            {activeRoute.screen === 'trending' && !editorOnly && <window.WrapTrendingScreen setRoute={setRoute} />}
            {activeRoute.screen === 'market-insights' && !editorOnly && <window.WrapMarketInsightsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'keyword-explorer' && !editorOnly && <window.WrapKeywordExplorerScreen setRoute={setRoute} />}
            {activeRoute.screen === 'aso-analyzer' && !editorOnly && <window.WrapASOAnalyzerScreen setRoute={setRoute} />}
            {activeRoute.screen === 'screenshots' && !editorOnly && <window.WrapScreenshotsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'reviews' && !editorOnly && <window.WrapReviewsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'app-tracking' && !editorOnly && <window.WrapAppTrackingScreen setRoute={setRoute} />}
            {activeRoute.screen === 'rank-history' && !editorOnly && <window.WrapRankHistoryScreen setRoute={setRoute} />}
            {activeRoute.screen === 'competitors' && !editorOnly && <window.WrapCompetitorsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'pricing' && !editorOnly && <window.WrapPricingScreen setRoute={setRoute} />}
            {activeRoute.screen === 'revenue-insights' && !editorOnly && <window.WrapRevenueInsightsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'hot-ideas' && !editorOnly && <window.WrapHotIdeasScreen setRoute={setRoute} />}
            {activeRoute.screen === 'idea-report' && !editorOnly && <window.WrapIdeaReportScreen setRoute={setRoute} route={activeRoute} />}
            {activeRoute.screen === 'idea-validator' && !editorOnly && <window.WrapIdeaValidatorScreen setRoute={setRoute} />}
            {activeRoute.screen === 'ai-agents' && !editorOnly && <window.WrapAIAgentsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'favorites' && !editorOnly && <window.WrapFavoritesScreen setRoute={setRoute} />}
            {activeRoute.screen === 'my-apps' && !editorOnly && <window.WrapMyAppsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'my-projects' && !editorOnly && <window.WrapMyProjectsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'new-project' && !editorOnly && <window.NewProjectFlow setRoute={setRoute} onCreateProject={createProject} />}
            {activeRoute.screen === 'templates' && !editorOnly && <window.TemplatesScreen setRoute={setRoute} />}
            {activeRoute.screen === 'assets' && !editorOnly && <window.AssetsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'exports' && !editorOnly && <window.ExportsScreen setRoute={setRoute} />}
            {activeRoute.screen === 'app-detail' && !editorOnly && <window.WrapAppDetailScreen route={activeRoute} setRoute={setRoute} />}
            {activeRoute.screen === 'project' && <window.ProjectScreen projectId={activeRoute.projectId} tab={activeRoute.tab} setRoute={setRoute} onQueueGeneration={queueGeneration} onSaveProject={saveProject} openEditorTab={openProjectEditor} />}
            {activeRoute.screen === 'settings' && !editorOnly && <window.SettingsScreen setRoute={setRoute} />}
          </div>
        </div>

        {editMode && !editorOnly && <TweaksPanel tweaks={tweaks} apply={applyTweaks} route={activeRoute} setRoute={setRoute} />}
        <window.CreditsPanel open={creditsPanelOpen} credits={creditsState} onClose={closeCreditsPanel} />
        <window.CreditsToast toast={creditsToast} onOpen={openCreditsPanel} />
        <window.InsufficientCreditsModal
          data={insufficientCredits}
          onClose={() => setInsufficientCredits(null)}
          onBuy={() => {
            window.SHIPSHOT_CREDITS.addCredits(15);
            refreshCredits();
            setInsufficientCredits(null);
            setCreditsToast({ tone: 'success', message: 'Boost pack added - +15 credits' });
          }}
          onUpgrade={() => {
            window.SHIPSHOT_CREDITS.setPlan('studio');
            refreshCredits();
            setInsufficientCredits(null);
            setCreditsToast({ tone: 'success', message: 'Plan upgraded to Studio' });
          }}
        />
      </div>
    </window.ErrorBoundary>
  );
}

  function TweaksPanel({ tweaks, apply, route, setRoute }) {
  return (
    <div style={{
      position: 'fixed', right: 16, bottom: 16, width: 280, zIndex: 1000,
      background: 'var(--bg-1)', border: '1px solid var(--border-2)', borderRadius: 12,
      boxShadow: 'var(--shadow-lg)', padding: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 500, display: 'inline-flex', gap: 6, alignItems: 'center' }}><window.I.Bolt /> Tweaks</div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Jump to</div>
      <select className="input" value={route.screen} onChange={(e) => setRoute({ screen: e.target.value, projectId: window.DATA.PROJECTS[0]?.id, tab: 'overview' })} style={{ marginBottom: 12 }}>
        <option value="home">Home dashboard</option>
        <option value="discover">Discover</option>
        <option value="search">Explore</option>
        <option value="trending">Trending</option>
        <option value="favorites">Favorites</option>
        <option value="my-apps">My apps</option>
        <option value="my-projects">My projects</option>
        <option value="new-project">New project flow</option>
        <option value="project">Project workspace</option>
        <option value="templates">Templates</option>
        <option value="assets">Assets</option>
        <option value="exports">Exports</option>
        <option value="settings">Settings</option>
      </select>

      {route.screen === 'project' && (
        <>
          <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Project tab</div>
          <div className="seg" style={{ width: '100%', marginBottom: 12, flexWrap: 'wrap' }}>
            {window.DATA.PROJECT_TABS.map((t) => <button key={t.id} className={route.tab === t.id ? 'on' : ''} onClick={() => setRoute({ ...route, tab: t.id })} style={{ flex: 1 }}>{t.label}</button>)}
          </div>
        </>
      )}

      <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Theme</div>
      <div className="seg" style={{ width: '100%', marginBottom: 12 }}>
        <button className={tweaks.theme === 'dark' ? 'on' : ''} onClick={() => apply({ theme: 'dark' })} style={{ flex: 1 }}>Dark</button>
        <button className={tweaks.theme === 'light' ? 'on' : ''} onClick={() => apply({ theme: 'light' })} style={{ flex: 1 }}>Light</button>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Accent</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {[['lime', 'oklch(84% 0.18 130)'], ['violet', 'oklch(72% 0.17 285)'], ['amber', 'oklch(82% 0.16 75)'], ['cyan', 'oklch(82% 0.13 210)']].map(([k, c]) => (
          <button key={k} onClick={() => apply({ accent: k })} style={{ width: 32, height: 32, borderRadius: 8, background: c, border: tweaks.accent === k ? '2px solid var(--text-1)' : '1px solid var(--border-2)' }} />
        ))}
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Density</div>
      <div className="seg" style={{ width: '100%' }}>
        <button className={tweaks.density === 'comfortable' ? 'on' : ''} onClick={() => apply({ density: 'comfortable' })} style={{ flex: 1 }}>Comfortable</button>
        <button className={tweaks.density === 'compact' ? 'on' : ''} onClick={() => apply({ density: 'compact' })} style={{ flex: 1 }}>Compact</button>
      </div>
    </div>
  );
}

  function AppWithAuth() {
    const [, setWorkspace] = _useState_app(() => window.SHIPSHOT.defaultWorkspace());

  const handleWorkspaceSync = (syncedWorkspace) => {
    setWorkspace(syncedWorkspace);
    window.DATA = window.SHIPSHOT.buildData(syncedWorkspace);
  };

  return (
    <window.AuthProvider onWorkspaceSync={handleWorkspaceSync}>
      <App />
    </window.AuthProvider>
  );
  }

  createRoot(document.getElementById('root')).render(<AppWithAuth />);
}

bootstrap();
