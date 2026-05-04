/* Templates, Assets, Exports, Settings */

function ScreenSectionLabel({ children, meta }) {
  return (
    <div style={{ display: 'grid', gap: 3 }}>
      <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{children}</div>
      {meta ? <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{meta}</div> : null}
    </div>
  );
}

function TemplatesScreen() {
  const { TEMPLATES, APPS, APP_CATEGORIES } = window.DATA;
  const app = APPS[0] || { name: 'Preview', icon: 'P', tint: 'oklch(80% 0.12 60)', tint2: 'oklch(65% 0.14 30)' };
  const [cat, setCat] = React.useState('all');
  const visibleTemplates = cat === 'all'
    ? TEMPLATES
    : TEMPLATES.filter((template) => Array.isArray(template.appCategories) && template.appCategories.includes(cat));
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Creative systems</h1>
          <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>A lighter library of reusable directions, grouped by app category.</div>
        </div>
        <div className="seg" style={{ width: 'fit-content', flexWrap: 'wrap' }}>
          {['all', ...APP_CATEGORIES.map((item) => item.id)].map((item) => (
            <button key={item} className={cat === item ? 'on' : ''} onClick={() => setCat(item)} style={{ textTransform: 'capitalize' }}>
              {item === 'all' ? 'All' : (window.SHIPSHOT.categoryById(item)?.short || item)}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="chip">{visibleTemplates.length} systems</span>
          <span className="chip">{APP_CATEGORIES.length} categories</span>
        </div>
      </div>
      {cat !== 'all' ? (
        <div style={{ marginBottom: 18, color: 'var(--text-3)', fontSize: 12.5 }}>
          {window.SHIPSHOT.categoryById(cat)?.label || cat}
          {' · '}
          {window.SHIPSHOT.categoryById(cat)?.description || ''}
        </div>
      ) : null}
      <div style={{ display: 'grid', gap: 10 }}>
        {visibleTemplates.map((template) => (
          <div key={template.id} className="editor-list-row" style={{ alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              {['headline', 'feature', 'stat'].map((kind, index) => (
                <div key={index} style={{ transform: `translateY(${index * 4}px) scale(${1 - index * 0.04})` }}>
                  <ScreenshotCard kind={kind} app={app} template={template.id} width={74} idx={index} />
                </div>
              ))}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{template.name}</div>
                <span className="chip">{template.density}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{template.tag}</div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {(template.appCategories || []).slice(0, 4).map((categoryId) => (
                <span key={categoryId} className="chip">{window.SHIPSHOT.categoryById(categoryId)?.short || categoryId}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {visibleTemplates.length === 0 ? (
        <div style={{ padding: '18px 0', color: 'var(--text-3)' }}>
          Aucun template lié à cette catégorie pour l’instant.
        </div>
      ) : null}
    </div>
  );
}

function collectWorkspaceAssets(projects, apps) {
  const mediaAssets = [];
  const screenAssets = [];
  projects.forEach((project) => {
    const app = apps.find((item) => item.id === project.appId) || apps[0] || { name: 'Preview', icon: 'P', tint: '#999', tint2: '#666' };
    (project.variantsData || []).forEach((variant) => {
      (variant.screensData || []).forEach((screen, index) => {
        screenAssets.push({
          id: `${project.id}-${variant.id}-${screen.id}`,
          project,
          projectId: project.id,
          projectName: project.name,
          variantId: variant.id,
          variantName: variant.name || 'Primary',
          app,
          variant,
          screen,
          index,
        });
        const phoneMedia = screen.layout?.phone?.mediaSrc;
        if (phoneMedia) {
          mediaAssets.push({
            id: `${screen.id}-phone`,
            kind: 'device-media',
            src: phoneMedia,
            mediaType: screen.layout?.phone?.mediaType || 'image/*',
            label: `${project.name} · Screen ${index + 1}`,
            projectId: project.id,
            projectName: project.name,
          });
        }
        (screen.decorations || []).forEach((decoration) => {
          if (decoration.mediaSrc) {
            mediaAssets.push({
              id: `${screen.id}-${decoration.id}`,
              kind: decoration.type || 'image',
              src: decoration.mediaSrc,
              mediaType: decoration.mediaType || 'image/*',
              label: decoration.text || `${project.name} asset`,
              projectId: project.id,
              projectName: project.name,
            });
          }
        });
      });
    });
  });
  return { mediaAssets, screenAssets };
}

function AssetsScreen({ setRoute }) {
  const { APPS, PROJECTS } = window.DATA;
  const [selectedProjectId, setSelectedProjectId] = React.useState(PROJECTS[0]?.id || '');
  const [assetTab, setAssetTab] = React.useState('brand');
  const selectedProject = PROJECTS.find((item) => item.id === selectedProjectId) || PROJECTS[0] || null;
  const selectedApp = APPS.find((item) => item.id === selectedProject?.appId) || APPS[0] || null;
  const siblingProjects = PROJECTS.filter((project) => project.appId === selectedApp?.id);
  const { mediaAssets, screenAssets } = React.useMemo(() => collectWorkspaceAssets(PROJECTS, APPS), [PROJECTS, APPS]);
  const linkedMediaAssets = mediaAssets.filter((asset) => asset.projectId === selectedProject?.id);
  const linkedScreens = screenAssets.filter((asset) => asset.projectId === selectedProject?.id);
  const [draftBrand, setDraftBrand] = React.useState(() => ({
    icon: selectedApp?.icon || 'A',
    tint: selectedApp?.tint || '#7AC943',
    tint2: selectedApp?.tint2 || '#3B82F6',
    assetLocales: Array.isArray(selectedApp?.assetLocales) ? selectedApp.assetLocales.join(', ') : 'en-US',
  }));

  React.useEffect(() => {
    if (!selectedProjectId && PROJECTS[0]?.id) {
      setSelectedProjectId(PROJECTS[0].id);
    }
  }, [selectedProjectId, PROJECTS]);

  React.useEffect(() => {
    setDraftBrand({
      icon: selectedApp?.icon || 'A',
      tint: selectedApp?.tint || '#7AC943',
      tint2: selectedApp?.tint2 || '#3B82F6',
      assetLocales: Array.isArray(selectedApp?.assetLocales) ? selectedApp.assetLocales.join(', ') : 'en-US',
    });
  }, [selectedProjectId, selectedApp?.icon, selectedApp?.tint, selectedApp?.tint2, selectedApp?.assetLocales]);

  if (!APPS.length && !PROJECTS.length) {
    return <LocalEmptyPage title="Assets" body="No apps or projects exist in this workspace yet." actionLabel="Create project" actionRoute="new-project" />;
  }

  const saveBrandKit = () => {
    if (!selectedApp?.id || typeof window.__shipshotUpdateWorkspace !== 'function') return;
    const nextLocales = draftBrand.assetLocales
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    window.__shipshotUpdateWorkspace((current) => ({
      ...current,
      apps: current.apps.map((app) => app.id === selectedApp.id ? {
        ...app,
        icon: (draftBrand.icon || app.icon || 'A').slice(0, 2).toUpperCase(),
        tint: draftBrand.tint || app.tint,
        tint2: draftBrand.tint2 || app.tint2,
        assetLocales: nextLocales.length ? nextLocales : (app.assetLocales || ['en-US']),
      } : app),
    }));
  };

  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Assets hub</h1>
          <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>One project at a time: brand kit, media used in screens, and reusable screen sources.</div>
        </div>
        <div className="seg">
          <button className={assetTab === 'brand' ? 'on' : ''} onClick={() => setAssetTab('brand')}>Brand</button>
          <button className={assetTab === 'media' ? 'on' : ''} onClick={() => setAssetTab('media')}>Media</button>
          <button className={assetTab === 'screens' ? 'on' : ''} onClick={() => setAssetTab('screens')}>Screens</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px minmax(0, 1fr)', gap: 18, alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 24, display: 'grid', gap: 16 }}>
          <ScreenSectionLabel meta="Choose the project you want to inspect.">Project</ScreenSectionLabel>
          <div style={{ display: 'grid', gap: 8 }}>
            {PROJECTS.map((project) => {
              const projectApp = APPS.find((item) => item.id === project.appId) || selectedApp || { name: 'App', icon: 'A', tint: '#999', tint2: '#666' };
              const isActive = project.id === selectedProject?.id;
              return (
                <button
                  key={project.id}
                  className="editor-list-row"
                  onClick={() => setSelectedProjectId(project.id)}
                  style={isActive ? { background: 'var(--bg-2)', borderColor: 'var(--border-2)' } : undefined}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${projectApp.tint}, ${projectApp.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
                      {projectApp.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{project.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{projectApp.name} · {project.variantsData.length} localization{project.variantsData.length === 1 ? '' : 's'}</div>
                    </div>
                  </div>
                  {isActive ? <span className="chip accent">Active</span> : null}
                </button>
              );
            })}
          </div>

          {selectedProject ? (
            <div style={{ paddingTop: 16, borderTop: '1px solid var(--border-1)', display: 'grid', gap: 10 }}>
              <ScreenSectionLabel>Quick actions</ScreenSectionLabel>
              <button className="btn sm" onClick={() => selectedProject ? window.__shipshotOpenProjectEditor?.(selectedProject.id) : setRoute({ screen: 'new-project' })}>
                <window.I.Pencil /> {selectedProject ? 'Open design editor' : 'Create first project'}
              </button>
              <button className="btn ghost sm" onClick={() => selectedProject ? setRoute({ screen: 'project', projectId: selectedProject.id, tab: 'overview' }) : setRoute({ screen: 'my-projects' })}>
                <window.I.Image /> Open project workspace
              </button>
              <button className="btn ghost sm" onClick={() => setRoute({ screen: 'my-projects' })}>
                <window.I.Folder /> View projects
              </button>
            </div>
          ) : null}
        </div>

        <div style={{ display: 'grid', gap: 18 }}>
          {assetTab === 'brand' && selectedProject && selectedApp ? (
            <>
              <div style={{ display: 'grid', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
                  <div>
                    <ScreenSectionLabel meta={selectedApp.name}>Brand kit</ScreenSectionLabel>
                    <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 4 }}>{selectedProject.name}</div>
                  </div>
                  <div style={{ width: 72, height: 72, borderRadius: 20, background: `linear-gradient(135deg, ${draftBrand.tint}, ${draftBrand.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 26, fontWeight: 800 }}>
                    {(draftBrand.icon || selectedApp.icon || 'A').slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 12 }}>
                  <label>
                    <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>App mark</div>
                    <input className="input" value={draftBrand.icon} maxLength={2} onChange={(e) => setDraftBrand((current) => ({ ...current, icon: e.target.value.toUpperCase() }))} />
                  </label>
                  <label>
                    <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>Primary color</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px', gap: 8 }}>
                      <input className="input" value={draftBrand.tint} onChange={(e) => setDraftBrand((current) => ({ ...current, tint: e.target.value }))} />
                      <input className="input" type="color" value={draftBrand.tint} onChange={(e) => setDraftBrand((current) => ({ ...current, tint: e.target.value }))} style={{ padding: 4 }} />
                    </div>
                  </label>
                  <label>
                    <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>Secondary color</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px', gap: 8 }}>
                      <input className="input" value={draftBrand.tint2} onChange={(e) => setDraftBrand((current) => ({ ...current, tint2: e.target.value }))} />
                      <input className="input" type="color" value={draftBrand.tint2} onChange={(e) => setDraftBrand((current) => ({ ...current, tint2: e.target.value }))} style={{ padding: 4 }} />
                    </div>
                  </label>
                </div>
                <label style={{ display: 'block', marginTop: 12 }}>
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>Asset locales</div>
                  <input className="input" value={draftBrand.assetLocales} onChange={(e) => setDraftBrand((current) => ({ ...current, assetLocales: e.target.value }))} />
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 6 }}>Comma-separated locale codes, for example `en-US, fr-FR, de-DE`.</div>
                </label>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button className="btn primary sm" onClick={saveBrandKit}>Save brand kit</button>
                  <button className="btn ghost sm" onClick={() => setDraftBrand({
                    icon: selectedApp.icon || 'A',
                    tint: selectedApp.tint || '#7AC943',
                    tint2: selectedApp.tint2 || '#3B82F6',
                    assetLocales: Array.isArray(selectedApp.assetLocales) ? selectedApp.assetLocales.join(', ') : 'en-US',
                  })}>Reset</button>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 10, paddingTop: 6 }}>
                <ScreenSectionLabel meta="Other projects linked to the same app.">Sibling projects</ScreenSectionLabel>
                <div style={{ display: 'grid', gap: 8 }}>
                  {siblingProjects.length ? siblingProjects.map((project) => (
                    <button key={project.id} className="editor-list-row" onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'overview' })}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{project.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{project.variantsData.length} localization{project.variantsData.length === 1 ? '' : 's'} · {project.screens} screens</div>
                      </div>
                      <span className="chip">{project.status}</span>
                    </button>
                  )) : (
                    <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>No sibling projects are linked to this app yet.</div>
                  )}
                </div>
              </div>
            </>
          ) : null}

          {assetTab === 'media' && (
            <div style={{ display: 'grid', gap: 14 }}>
              <ScreenSectionLabel meta={`${linkedMediaAssets.length} media asset${linkedMediaAssets.length === 1 ? '' : 's'} used in this project.`}>Project media</ScreenSectionLabel>
              {linkedMediaAssets.length ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                  {linkedMediaAssets.map((asset) => (
                    <div key={asset.id} style={{ display: 'grid', gap: 8 }}>
                      <div style={{ aspectRatio: '4 / 5', background: 'var(--bg-3)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border-1)' }}>
                        {String(asset.mediaType || '').startsWith('video/') ? (
                          <video src={asset.src} muted controls style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        ) : (
                          <img src={asset.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        )}
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{asset.projectName}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>No uploaded media has been used in this project yet.</div>
              )}
            </div>
          )}

          {assetTab === 'screens' && (
            <div style={{ display: 'grid', gap: 14 }}>
              <ScreenSectionLabel meta={`${linkedScreens.length} reusable screen source${linkedScreens.length === 1 ? '' : 's'} in this project.`}>Latest screens</ScreenSectionLabel>
              {linkedScreens.length ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
                  {linkedScreens.slice(0, 24).map((item) => (
                    <button key={item.id} style={{ display: 'grid', gap: 10, textAlign: 'left', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => setRoute({ screen: 'project', projectId: item.projectId, tab: 'overview' })}>
                      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 12px', borderRadius: 16, border: '1px solid var(--border-1)' }}>
                        <ScreenshotCard
                          kind={item.screen.kind}
                          app={item.app}
                          template={item.screen.template || item.variant.templateId || item.project.styleId || 't1'}
                          width={116}
                          idx={item.index}
                          headline={item.screen.headline}
                          sub={item.screen.sub}
                          ctaLabel={item.screen.ctaLabel}
                          bg={item.screen.bg}
                          locale={item.variant.assetLocale}
                          layout={item.screen.layout}
                          decorations={item.screen.decorations}
                          frameStyle={item.screen.frameStyle}
                          textStyle={item.screen.textStyle}
                          ambientStyle={item.screen.ambientStyle}
                          ctaStyle={item.screen.ctaStyle}
                          chromeStyle={item.screen.chromeStyle}
                          fontFamily={item.screen.fontFamily}
                        />
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 600 }}>{item.projectName}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{item.variantName} · Screen {item.index + 1}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>No screen previews available for this project yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExportsScreen({ setRoute }) {
  const { PROJECTS, APPS, STORE_EXPORT_PRESETS } = window.DATA;

  if (!PROJECTS.length) {
    return <LocalEmptyPage title="Exports" body="No projects exist yet, so there is nothing to export." actionLabel="Create project" actionRoute="new-project" />;
  }

  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1320, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Exports hub</h1>
          <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>A simpler delivery queue: check which projects are ready, then jump straight into deliver.</div>
        </div>
        <button className="btn sm" onClick={() => setRoute({ screen: 'my-projects' })}>
          <window.I.Folder /> Projects
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 18, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 10 }}>
          <ScreenSectionLabel meta="Every project stays here until it is ready to be delivered.">Projects ready to deliver</ScreenSectionLabel>
          <div style={{ display: 'grid', gap: 10 }}>
            {PROJECTS.map((project) => {
              const app = APPS.find((item) => item.id === project.appId) || APPS[0] || { name: 'App', icon: 'A', tint: '#999', tint2: '#666' };
              const totalScreens = (project.variantsData || []).reduce((sum, variant) => sum + (variant.screensData?.length || 0), 0);
              const activeVariant = project.variantsData.find((variant) => variant.id === project.activeVariantId) || project.variantsData[0];
              const isReady = totalScreens > 0 && project.variantsData.length > 0;
              return (
                <div key={project.id} className="editor-list-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 12, background: `linear-gradient(135deg, ${app.tint}, ${app.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, flexShrink: 0 }}>
                      {app.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 3 }}>
                        {app.name} · {project.variantsData.length} localization{project.variantsData.length === 1 ? '' : 's'} · {totalScreens} screens · active {window.SHIPSHOT.localizationLabel(activeVariant?.country, 'compact')}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span className={`chip${isReady ? ' accent' : ''}`}>{isReady ? 'Ready' : 'Draft'}</span>
                    <button className="btn sm" onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'exports' })}>
                      <window.I.Download /> Deliver
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <ScreenSectionLabel>Supported packs</ScreenSectionLabel>
            <div style={{ display: 'grid', gap: 10 }}>
              {STORE_EXPORT_PRESETS.map((preset) => (
                <div key={preset.id}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{preset.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 3 }}>{preset.note}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {preset.specs.map((spec) => (
                      <span key={spec.id} className="chip">{spec.label}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <ScreenSectionLabel>Flow</ScreenSectionLabel>
            <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.65 }}>
              1. Open a project deliver tab.
              <br />
              2. Choose formats and compliant sizes.
              <br />
              3. Export full packs or single screens.
              <br />
              4. Prepare App Store Connect or Google Play manifests/jobs if needed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsScreen() {
  const { WORKSPACE } = window.DATA;
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 980, margin: '0 auto' }}>
      <h1 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Settings</h1>
      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-1)', alignItems: 'center' }}>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Workspace</div>
          <div>{WORKSPACE.account.workspaceName}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-1)', alignItems: 'center' }}>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Mode</div>
          <div>Local prototype</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12, padding: '10px 0', alignItems: 'center' }}>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Persistence</div>
          <div>Browser localStorage only</div>
        </div>
      </div>
    </div>
  );
}

function LocalEmptyPage({ title, body, actionLabel, actionRoute }) {
  const setRoute = window.__shipshotSetRoute;
  return (
    <div style={{ padding: '36px', maxWidth: 920, margin: '0 auto' }}>
      <div style={{ padding: 28, textAlign: 'center', border: '1px solid var(--border-1)', borderRadius: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 600 }}>{title}</div>
        <div style={{ marginTop: 10, color: 'var(--text-3)', fontSize: 14, lineHeight: 1.6 }}>{body}</div>
        {actionLabel && setRoute ? <button className="btn primary" style={{ marginTop: 16 }} onClick={() => setRoute({ screen: actionRoute })}>{actionLabel}</button> : null}
      </div>
    </div>
  );
}

Object.assign(window, { TemplatesScreen, AssetsScreen, ExportsScreen, SettingsScreen, ScreenSectionLabel });
