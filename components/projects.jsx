/* Projects list + project creation */

function ProjectsScreen({ setRoute }) {
  const { PROJECTS, APPS } = window.DATA;

  if (PROJECTS.length === 0) {
    return (
      <div style={{ padding: '36px', maxWidth: 960, margin: '0 auto' }}>
        <div className="card" style={{ padding: 28, textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, margin: '0 auto 12px', background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}>
            <window.I.Folder />
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600 }}>No projects yet</h1>
          <div style={{ marginTop: 10, color: 'var(--text-3)', fontSize: 14, lineHeight: 1.6 }}>
            This list stays empty until you create something. The prototype now uses your own local workspace data only.
          </div>
          <button className="btn primary lg" style={{ marginTop: 16 }} onClick={() => setRoute({ screen: 'new-project' })}><window.I.Plus /> Create first project</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1320, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: 22 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Projects</h1>
          <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>{PROJECTS.length} project{PROJECTS.length === 1 ? '' : 's'} · {APPS.length} app{APPS.length === 1 ? '' : 's'} in local workspace</div>
        </div>
        <button className="btn primary" onClick={() => setRoute({ screen: 'new-project' })}><window.I.Plus /> New project</button>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {PROJECTS.map((project) => {
          const app = APPS.find((item) => item.id === project.appId) || APPS[0];
          const activeVariant = project.variantsData.find((variant) => variant.id === project.activeVariantId) || project.variantsData[0];
          const localeLabel = window.SHIPSHOT.localizationLabel(activeVariant?.country || project.country, 'compact');
          const totalScreens = (project.variantsData || []).reduce((sum, variant) => sum + (variant.screensData?.length || 0), 0);
          return (
            <button
              key={project.id}
              className="editor-list-row"
              onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'overview' })}
              style={{ padding: '14px 0', borderRadius: 0, borderLeft: 'none', borderRight: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 13, background: `linear-gradient(135deg, ${app?.tint || '#777'}, ${app?.tint2 || '#444'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, flexShrink: 0 }}>
                  {app?.icon || 'A'}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>
                    {app?.name || 'App'} · {localeLabel} · {project.variantsData.length} localization{project.variantsData.length === 1 ? '' : 's'} · {totalScreens} screens
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                <div style={{ display: 'grid', justifyItems: 'end', gap: 2 }}>
                  <span className="chip">{project.status}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{project.updated}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>Open</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NewProjectFlow({ setRoute, onCreateProject }) {
  const { APPS, TRACKED_APPS = [], COUNTRIES, TEMPLATES, APP_CATEGORIES } = window.DATA;
  const projectableApps = React.useMemo(() => {
    const seen = new Set();
    return [...APPS, ...TRACKED_APPS]
      .filter((app) => {
        const key = String(app.storeId || app.id || app.name || '').toLowerCase();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, [APPS, TRACKED_APPS]);
  const initialDraft = (() => {
    try {
      return JSON.parse(localStorage.getItem('shipshot-new-project-draft') || 'null');
    } catch {
      return null;
    }
  })();
  const normalizedInitialSourceType = initialDraft?.sourceType === 'app-store'
    ? 'url'
    : initialDraft?.sourceType === 'google-play'
      ? 'google-play'
      : initialDraft?.sourceType || 'prompt';
  const sourceReference = initialDraft?.sourceReference || '';
  const sourceMetadata = initialDraft?.sourceMetadata || null;
  const [projectName, setProjectName] = React.useState(initialDraft?.projectName || '');
  const [appChoice, setAppChoice] = React.useState(initialDraft?.appChoice || projectableApps[0]?.id || 'new');
  const [appName, setAppName] = React.useState(initialDraft?.appName || '');
  const [appDescription, setAppDescription] = React.useState(initialDraft?.appDescription || '');
  const [category, setCategory] = React.useState(initialDraft?.category || APP_CATEGORIES[0]?.id || '');
  const [country, setCountry] = React.useState(initialDraft?.country || 'en-US');
  const [audience, setAudience] = React.useState(initialDraft?.audience || 'General audience');
  const [sourceType, setSourceType] = React.useState(normalizedInitialSourceType);
  const [sourceValue, setSourceValue] = React.useState(initialDraft?.brief || initialDraft?.sourceValue || '');
  const [style, setStyle] = React.useState(initialDraft?.style || TEMPLATES[0].id);
  const [screenCount, setScreenCount] = React.useState(initialDraft?.screenCount || 6);
  const [error, setError] = React.useState('');

  const selectedApp = React.useMemo(() => projectableApps.find((app) => app.id === appChoice) || null, [projectableApps, appChoice]);

  React.useEffect(() => {
    if (!initialDraft) return;
    try {
      localStorage.removeItem('shipshot-new-project-draft');
    } catch {}
  }, []);

  React.useEffect(() => {
    if (appChoice === 'new' || !selectedApp) return;
    setAppName((current) => current || selectedApp.name || '');
    setAppDescription((current) => current || selectedApp.description || selectedApp.sub || '');
    setCategory((current) => current || selectedApp.category || APP_CATEGORIES[0]?.id || '');
    setProjectName((current) => current || `${selectedApp.name} launch`);
    if (!sourceValue.trim()) {
      setSourceValue(selectedApp.storeUrl || selectedApp.description || selectedApp.sub || '');
    }
  }, [appChoice, selectedApp]);

  const submit = () => {
    setError('');
    if (appChoice === 'new' && !String(appName || '').trim()) {
      setError('App name is required for a new project.');
      return;
    }
    const actions = [{ key: screenCount <= 3 ? 'GENERATE_PACK_3_SCREENS' : 'GENERATE_PACK_6_SCREENS' }];
    const spend = window.__shipshotCreditsUI?.trySpend(actions, {
      actionLabel: 'Create project pack',
      successLabel: 'Project created',
    });
    if (spend && !spend.success) return;
    const created = onCreateProject({
      projectName,
      appId: appChoice !== 'new' ? appChoice : null,
      appName: appChoice === 'new' ? appName : (selectedApp?.name || appName),
      appDescription: appChoice === 'new' ? appDescription : (selectedApp?.description || selectedApp?.sub || appDescription),
      category: appChoice === 'new' ? category : (selectedApp?.category || category),
      country,
      audience,
      sourceType,
      sourceValue,
      sourceReference: selectedApp?.storeUrl || sourceReference,
      sourceMetadata: selectedApp ? {
        appName: selectedApp.name,
        description: selectedApp.description || selectedApp.sub || '',
        developer: selectedApp.developer || '',
        icon: selectedApp.icon || '',
        category: selectedApp.category || category,
        storeUrl: selectedApp.storeUrl || '',
        storeId: selectedApp.storeId || '',
      } : sourceMetadata,
      style,
      screenCount,
    });
    if (created?.project) {
      setRoute({ screen: 'project', projectId: created.project.id, tab: 'overview' });
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 80px' }}>
      <button className="btn ghost sm" onClick={() => setRoute({ screen: 'my-projects' })} style={{ marginBottom: 16 }}>
        <window.I.ChevronL /> Cancel
      </button>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>New project</h1>
          <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>Pick an app, capture the source context, then open a real project workspace you can edit and deliver.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 26 }}>
        <div>
          <SectionLabel>Project</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 14 }}>
            <div>
              <Label>Project name</Label>
              <input className="input" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </div>
            <div>
              <Label>Locale</Label>
              <select className="input" value={country} onChange={(e) => setCountry(e.target.value)}>
                {COUNTRIES.map((item) => <option key={item.code} value={item.code}>{item.flag} {item.language} · {item.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>App</SectionLabel>
          <div className="seg" style={{ flexWrap: 'wrap', marginBottom: 12 }}>
            <button className={appChoice === 'new' ? 'on' : ''} onClick={() => setAppChoice('new')}>New app</button>
            {projectableApps.map((app) => (
              <button key={app.id} className={appChoice === app.id ? 'on' : ''} onClick={() => setAppChoice(app.id)}>
                {app.name}
              </button>
            ))}
          </div>

          {appChoice === 'new' ? (
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <Label>App name</Label>
                  <input className="input" value={appName} onChange={(e) => setAppName(e.target.value)} />
                </div>
                <div>
                  <Label>Category</Label>
                  <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {APP_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                {window.SHIPSHOT.categoryById(category)?.description || ''}
              </div>
              {appDescription ? (
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  {appDescription}
                </div>
              ) : null}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)' }}>
                Using existing app <strong>{selectedApp?.name}</strong>.
              </div>
              <div className="card" style={{ padding: 14, display: 'grid', gap: 6 }}>
                <div style={{ fontWeight: 600 }}>{selectedApp?.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{selectedApp?.developer || 'Local workspace app'} · {selectedApp?.category || 'productivity'}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{selectedApp?.description || selectedApp?.sub || 'No description available yet.'}</div>
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionLabel>Source</SectionLabel>
          <div className="seg" style={{ marginBottom: 10, flexWrap: 'wrap' }}>
            {[
              ['prompt', 'Prompt'],
              ['url', 'App Store URL'],
              ['google-play', 'Google Play'],
              ['repo', 'Repository'],
              ['screens', 'Screens'],
            ].map(([id, label]) => (
              <button key={id} className={sourceType === id ? 'on' : ''} onClick={() => setSourceType(id)}>{label}</button>
            ))}
          </div>
          <textarea className="input" style={{ minHeight: 110, padding: 12, resize: 'vertical' }} value={sourceValue} onChange={(e) => setSourceValue(e.target.value)} />
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 8 }}>
            {sourceType === 'prompt'
              ? 'Describe the app, the message, or the screenshot angle you want.'
              : sourceType === 'url'
                ? 'Paste the App Store product URL you want to base the pack on.'
                : sourceType === 'google-play'
                  ? 'Paste the Google Play listing or package id that should inform the pack.'
                : sourceType === 'repo'
                  ? 'Paste the repository URL or path that should inform the screenshots.'
                  : 'Reference an existing pack or imported screens.'}
          </div>
        </div>

        <div>
          <SectionLabel>Output</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <div>
              <Label>Audience</Label>
              <input className="input" value={audience} onChange={(e) => setAudience(e.target.value)} />
            </div>
            <div>
              <Label>Creative system</Label>
              <select className="input" value={style} onChange={(e) => setStyle(e.target.value)}>
                {TEMPLATES.map((template) => <option key={template.id} value={template.id}>{template.name}</option>)}
              </select>
            </div>
            <div>
              <Label>Screens</Label>
              <select className="input" value={screenCount} onChange={(e) => setScreenCount(Number(e.target.value))}>
                {[3, 4, 5, 6, 8, 10].map((count) => <option key={count} value={count}>{count}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {error ? <div style={{ marginTop: 14, color: '#ff8b7d', fontSize: 12.5 }}>{error}</div> : null}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <button className="btn" onClick={() => setRoute({ screen: 'my-projects' })}>Back</button>
        <window.CreditButton
          actions={[{ key: screenCount <= 3 ? 'GENERATE_PACK_3_SCREENS' : 'GENERATE_PACK_6_SCREENS' }]}
          icon={<window.I.Sparkle />}
          label="Create Project"
          onClick={submit}
        />
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, fontWeight: 600 }}>{children}</div>;
}

function Label({ children }) {
  return <div style={{ fontSize: 11.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 500 }}>{children}</div>;
}

Object.assign(window, { ProjectsScreen, NewProjectFlow, Label, SectionLabel });
