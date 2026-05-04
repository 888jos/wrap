/* Project workspace */

const PROJECT_FLOW_GROUPS = [
  { label: 'Brief', tabs: ['overview'] },
  { label: 'Create', tabs: ['generate', 'edit'] },
  { label: 'Localize', tabs: ['variants'] },
  { label: 'Deliver', tabs: ['exports', 'history'] },
];

const ELEMENT_LIBRARY = {
  devices: [
    'iPhone 17',
    '3D iPhone 17',
    'Handheld iPhone 17',
    'Floating iPhone 17',
    'Tilted iPhone 17',
    'Android Phone',
    'Tablet Frame',
    'Watch Companion',
  ],
  images: [
    'App Icons',
    'Productivity Women',
    'Productivity Guys',
    'Wellness People',
    'Lifestyle Scenes',
    'Illustrations',
    'UI Screenshots',
    'Gradients & Textures',
  ],
  elements: [
    'Shapes',
    'Arrows',
    'Icons',
    'Decor',
    'Ratings',
    'Badges',
    'Stickers',
    'Patterns',
  ],
};

const QUICK_VARIANT_AUDIENCES = [
  'Localized audience',
  'Primary audience',
  'Premium audience',
  'Gen Z audience',
  'ASO push',
];

const PROJECT_SCREEN_FALLBACK_ICON = () => null;
const PROJECT_SCREEN_REQUIRED_ICONS = [
  'Apple',
  'ChevronD',
  'ChevronL',
  'ChevronR',
  'Copy',
  'Device',
  'Download',
  'Flag',
  'Folder',
  'Globe',
  'Grid',
  'Layers',
  'Palette',
  'Pencil',
  'Plus',
  'Redo',
  'Settings',
  'Sparkle',
  'Trash',
  'Type',
  'Undo',
  'Upload',
  'Users',
  'Wand',
  'X',
];

if (typeof window !== 'undefined') {
  window.I = window.I || {};
  PROJECT_SCREEN_REQUIRED_ICONS.forEach((name) => {
    if (typeof window.I[name] !== 'function') {
      window.I[name] = PROJECT_SCREEN_FALLBACK_ICON;
    }
  });
  if (typeof window.CreditButton !== 'function') {
    window.CreditButton = function CreditButtonFallback({ icon = null, label = '', className = 'btn', onClick = null, disabled = false, style = {} }) {
      return (
        <button className={className} onClick={onClick} disabled={disabled} style={style}>
          {icon}
          {label}
        </button>
      );
    };
  }
}

const ProjectConfirmModal = typeof window !== 'undefined' && typeof window.WrapConfirmModal === 'function'
  ? window.WrapConfirmModal
  : function ProjectConfirmModalFallback({ open, title, body, confirmLabel = 'Delete', onConfirm, onCancel }) {
    if (!open) return null;
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 1700, background: 'rgba(0,0,0,0.58)', display: 'grid', placeItems: 'center', padding: 24 }} onClick={onCancel}>
        <div className="card" style={{ width: 420, padding: 20, background: 'var(--bg-1)', display: 'grid', gap: 14 }} onClick={(event) => event.stopPropagation()}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 999, background: 'rgba(239, 68, 68, 0.14)', display: 'grid', placeItems: 'center', color: '#ef4444' }}>
              <window.I.Trash style={{ width: 15, height: 15 }} />
            </div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
          </div>
          <div style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{body}</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button className="btn" onClick={onCancel}>Cancel</button>
            <button className="btn danger sm" onClick={onConfirm}>{confirmLabel}</button>
          </div>
        </div>
      </div>
    );
  };

function resolveProjectApp(project, apps) {
  return apps.find((item) => item.id === project.appId) || apps[0] || {
    id: 'fallback-app',
    name: 'App',
    icon: 'A',
    tint: '#6b7280',
    tint2: '#374151',
  };
}

function resolveProjectVariant(project) {
  return project.variantsData.find((variant) => variant.id === project.activeVariantId) || project.variantsData[0] || {
    id: 'fallback-variant',
    name: 'Primary',
    country: project.country || 'en-US',
    audience: project.audience || 'General audience',
    assetLocale: 'en-US',
    templateId: project.styleId || 't1',
    screensData: [],
  };
}


function ProjectHeader({ project, app, activeVariant, activeTab, projectTabs, sourceLabel, activeLocalizationLabel, setRoute, openEditorTab }) {
  return (
    <div style={{ padding: '22px 28px 14px', borderBottom: '1px solid var(--border-1)', background: 'var(--bg-0)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, marginBottom: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${app.tint}, ${app.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 17, flexShrink: 0 }}>{app.icon}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.03em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.name}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 3 }}>
              {app.name} · {activeLocalizationLabel} · {activeVariant.screensData.length} screens · {project.variantsData.length} localization{project.variantsData.length === 1 ? '' : 's'} · {sourceLabel}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button className="btn sm" onClick={() => setRoute({ screen: 'my-projects' })}><window.I.Folder /> My Projects</button>
          <button className="btn primary sm" onClick={() => activeVariant.screensData.length ? openEditorTab?.(project.id) : setRoute({ screen: 'project', projectId: project.id, tab: 'generate' })}>
            {activeVariant.screensData.length ? <window.I.Pencil /> : <window.I.Sparkle />} {activeVariant.screensData.length ? 'Design' : 'Generate'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        {projectTabs.filter((item) => item.id !== 'edit').map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: item.id })}
              className={isActive ? 'btn sm' : 'btn ghost sm'}
              style={isActive ? { background: 'var(--bg-3)' } : undefined}
            >
              {item.label}
            </button>
          );
        })}
        <button className="btn ghost sm" onClick={() => openEditorTab?.(project.id)}>
          <window.I.Pencil /> Design
        </button>
      </div>
    </div>
  );
}

function OverviewScreensStrip({ screens, app, variant, project }) {
  return (
    <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 2 }}>
      {screens.map((screen, index) => (
        <div key={screen.id} style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
          <ScreenshotCard kind={screen.kind} app={app} template={screen.template || variant.templateId || project.styleId || 't1'} width={112} idx={index} headline={screen.headline} sub={screen.sub} ctaLabel={screen.ctaLabel} bg={screen.bg} locale={variant.assetLocale} layout={screen.layout} decorations={screen.decorations} frameStyle={screen.frameStyle} textStyle={screen.textStyle} ambientStyle={screen.ambientStyle} ctaStyle={screen.ctaStyle} chromeStyle={screen.chromeStyle} fontFamily={screen.fontFamily} watermark={String(screen.frameStyle || '').includes('3d') ? 'Pro preview' : ''} />
          <div style={{ fontSize: 10.5, color: 'var(--text-3)' }} className="mono">0{index + 1}</div>
        </div>
      ))}
    </div>
  );
}

function OverviewSidebar({ project, activeVariant, activeLocalizationLabel, templateName, totalScreens, screenCount, setRoute }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gap: 2 }}>
        <MetaRow k="Locale" v={`${activeLocalizationLabel} · assets ${activeVariant.assetLocale || 'en-US'}`} />
        <MetaRow k="Audience" v={activeVariant.audience} />
        <MetaRow k="Template" v={templateName} />
        <MetaRow k="Localizations" v={String(project.variantsData.length)} />
        <MetaRow k="Total screens" v={String(totalScreens)} />
        <MetaRow k="Updated" v={project.updated} />
      </div>

      <div style={{ display: 'grid', gap: 8, paddingTop: 4 }}>
        <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Next</div>
        <button className="btn sm" style={{ justifyContent: 'space-between' }} onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'generate' })}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><window.I.Sparkle /> Generate</span>
          <window.I.ChevronR />
        </button>
        <button className="btn sm" style={{ justifyContent: 'space-between' }} onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'variants' })}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><window.I.Flag /> Localize</span>
          <window.I.ChevronR />
        </button>
        <button className="btn sm" style={{ justifyContent: 'space-between' }} onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'exports' })}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><window.I.Download /> Deliver</span>
          <window.I.ChevronR />
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span className="chip">{templateName}</span>
        <span className="chip">{activeLocalizationLabel}</span>
        <span className="chip">{screenCount} current</span>
      </div>
    </div>
  );
}

function GeneratePromptSection({ prompt, setPrompt, packActions, onQueueGeneration, project, exportingLabel }) {
  return (
    <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: 'var(--accent)' }}><window.I.Sparkle /></span>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Generation prompt</span>
      </div>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} style={{ width: '100%', minHeight: 132, padding: '6px 0', fontSize: 14, lineHeight: 1.65, resize: 'vertical', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-1)', borderRadius: 0, color: 'var(--text-1)', fontFamily: 'var(--font-sans)' }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
        <window.CreditButton
          actions={packActions}
          icon={<window.I.Sparkle />}
          label="Generate pack"
          onClick={() => {
            const spend = window.__shipshotCreditsUI?.trySpend(packActions, {
              actionLabel: 'Generate screenshot pack',
              successLabel: 'Pack generated',
            });
            if (spend && !spend.success) return;
            onQueueGeneration(project.id, prompt);
          }}
        />
        <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{exportingLabel}</div>
      </div>
    </div>
  );
}

function CaptionSystemsSection({ captionMode, setCaptionMode, applyCaptionSystem }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: 'var(--accent)' }}><window.I.Wand /></span>
        <span style={{ fontSize: 13, fontWeight: 500 }}>Caption systems</span>
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginBottom: 14 }}>
        Regenerate the active localization copy with a more ASO-oriented, premium, or results-led caption style.
      </div>
      <div className="seg" style={{ width: '100%', flexWrap: 'wrap' }}>
        {window.DATA.CAPTION_STYLE_SYSTEMS.map((item) => (
          <button key={item.id} className={captionMode === item.id ? 'on' : ''} onClick={() => setCaptionMode(item.id)} style={{ flex: 1, minWidth: 120 }}>
            {item.name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingTop: 12, borderTop: '1px solid var(--border-1)' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{window.DATA.CAPTION_STYLE_SYSTEMS.find((item) => item.id === captionMode)?.name || 'Clarity'}</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{window.DATA.CAPTION_STYLE_SYSTEMS.find((item) => item.id === captionMode)?.tag || ''}</div>
        </div>
        <window.CreditButton
          actions={[{ key: 'GENERATE_COPY_ONLY' }]}
          icon={<window.I.Wand />}
          label="Apply to active localization"
          onClick={applyCaptionSystem}
        />
      </div>
    </div>
  );
}

function ProjectScreen({ projectId, tab, setRoute, onQueueGeneration, onSaveProject, openEditorTab }) {
  const { PROJECTS, APPS, PROJECT_TABS } = window.DATA;
  const project = PROJECTS.find((item) => item.id === projectId);

  if (!project) {
    return (
      <div style={{ padding: '40px', maxWidth: 820, margin: '0 auto' }}>
        <div className="card" style={{ padding: 28, textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 600 }}>Project not found</h1>
          <div style={{ marginTop: 10, color: 'var(--text-3)', fontSize: 14 }}>The selected project does not exist in this local workspace.</div>
          <button className="btn primary" style={{ marginTop: 16 }} onClick={() => setRoute({ screen: 'my-projects' })}>Back to projects</button>
        </div>
      </div>
    );
  }

  const app = resolveProjectApp(project, APPS);
  const activeTab = tab || 'overview';
  const focusEditor = activeTab === 'edit';
  const activeVariant = resolveProjectVariant(project);
  const sourceLabel = project.sourceType === 'github' || project.sourceType === 'repo'
    ? 'GitHub repo'
    : project.sourceType === 'app-store'
      ? 'App Store URL'
      : project.sourceType === 'google-play'
        ? 'Google Play listing'
        : 'Prompt';
  const activeLocalizationLabel = window.SHIPSHOT.localizationLabel(activeVariant.country, 'full');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {!focusEditor && <ProjectHeader project={project} app={app} activeVariant={activeVariant} activeTab={activeTab} projectTabs={PROJECT_TABS} sourceLabel={sourceLabel} activeLocalizationLabel={activeLocalizationLabel} setRoute={setRoute} openEditorTab={openEditorTab} />}

      <div style={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'overview' && <OverviewTab project={project} app={app} setRoute={setRoute} openEditorTab={openEditorTab} />}
        {activeTab === 'generate' && <GenerateTab project={project} app={app} onQueueGeneration={onQueueGeneration} onSaveProject={onSaveProject} />}
        {activeTab === 'edit' && <EditTab project={project} app={app} onSaveProject={onSaveProject} setRoute={setRoute} />}
        {activeTab === 'variants' && <VariantsTab project={project} app={app} onSaveProject={onSaveProject} />}
        {activeTab === 'exports' && <ExportsTab project={project} app={app} />}
        {activeTab === 'history' && <HistoryTab project={project} />}
      </div>
    </div>
  );
}

function OverviewTab({ project, app, setRoute, openEditorTab }) {
  const activeVariant = resolveProjectVariant(project);
  const screenCount = activeVariant.screensData.length;
  const templateName = window.DATA.TEMPLATES.find((item) => item.id === activeVariant.templateId)?.name || project.tone;
  const activeLocalizationLabel = window.SHIPSHOT.localizationLabel(activeVariant.country, 'full');
  const totalScreens = (project.variantsData || []).reduce((sum, variant) => sum + (variant.screensData?.length || 0), 0);
  return (
    <div style={{ padding: '26px 28px 44px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) 300px', gap: 24, maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current pack</div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 3 }}>{activeVariant.name} · {activeLocalizationLabel}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 4 }}>{screenCount} screens · {templateName}</div>
            </div>
            <button className="btn primary sm" onClick={() => openEditorTab?.(project.id)}><window.I.Pencil /> Open editor</button>
          </div>
          <OverviewScreensStrip screens={activeVariant.screensData} app={app} variant={activeVariant} project={project} />
        </div>

        <div style={{ display: 'grid', gap: 10, paddingTop: 2 }}>
          {project.appDescription ? (
            <>
              <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>App summary</div>
              <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.65 }}>
                {project.appDescription}
              </div>
            </>
          ) : null}
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Project brief</div>
          <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.65 }}>
            {project.sourceValue ? project.sourceValue : 'No source details were stored.'}
          </div>
        </div>
      </div>

      <OverviewSidebar project={project} activeVariant={activeVariant} activeLocalizationLabel={activeLocalizationLabel} templateName={templateName} totalScreens={totalScreens} screenCount={screenCount} setRoute={setRoute} />
    </div>
  );
}

function GenerateTab({ project, app, onQueueGeneration, onSaveProject }) {
  const [prompt, setPrompt] = React.useState(project.sourceValue || '');
  const [captionMode, setCaptionMode] = React.useState('clarity');
  const packActions = [{ key: project.screens <= 3 ? 'GENERATE_PACK_3_SCREENS' : 'GENERATE_PACK_6_SCREENS' }];

  const applyCaptionSystem = () => {
    const spend = window.__shipshotCreditsUI?.trySpend([{ key: 'GENERATE_COPY_ONLY' }], {
      actionLabel: 'Generate copy only',
      successLabel: 'Copy regenerated',
    });
    if (spend && !spend.success) return;
    const activeVariant = project.variantsData.find((item) => item.id === project.activeVariantId) || project.variantsData[0];
    const nextVariant = window.SHIPSHOT.generateVariantCaptions(activeVariant, app, captionMode);
    const nextVariants = project.variantsData.map((item) => item.id === nextVariant.id ? nextVariant : item);
    onSaveProject(project.id, {
      variantsData: nextVariants,
      screensData: nextVariant.screensData,
      screens: nextVariant.screensData.length,
      thumb: nextVariant.screensData.map((screen) => screen.kind),
    }, `Caption system applied: ${captionMode}`);
  };

  return (
    <div style={{ padding: '28px', maxWidth: 980, margin: '0 auto' }}>
      <GeneratePromptSection prompt={prompt} setPrompt={setPrompt} packActions={packActions} onQueueGeneration={onQueueGeneration} project={project} exportingLabel="This local prototype stores the prompt and timestamp. No remote generation backend is configured." />
      <CaptionSystemsSection captionMode={captionMode} setCaptionMode={setCaptionMode} applyCaptionSystem={applyCaptionSystem} />
    </div>
  );
}

function hexFromColor(value) {
  const input = String(value || '').trim();
  if (!input) return '#000000';
  if (input.startsWith('#')) return input;
  const match = input.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!match) return '#000000';
  return `#${[match[1], match[2], match[3]].map((part) => Number(part).toString(16).padStart(2, '0')).join('')}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeHex(value, fallback = '#d27d2d') {
  const raw = String(value || '').trim();
  if (!raw) return fallback;
  if (/^#[0-9a-f]{6}$/i.test(raw)) return raw.toUpperCase();
  if (/^#[0-9a-f]{3}$/i.test(raw)) {
    return `#${raw.slice(1).split('').map((part) => part + part).join('')}`.toUpperCase();
  }
  return fallback;
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  return {
    r: parseInt(normalized.slice(1, 3), 16),
    g: parseInt(normalized.slice(3, 5), 16),
    b: parseInt(normalized.slice(5, 7), 16),
  };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = 60 * (((gn - bn) / d) % 6);
        break;
      case gn:
        h = 60 * (((bn - rn) / d) + 2);
        break;
      default:
        h = 60 * (((rn - gn) / d) + 4);
        break;
    }
  }

  return {
    h: (h + 360) % 360,
    s: s * 100,
    l: l * 100,
  };
}

function hslToRgb(h, s, l) {
  const hn = ((h % 360) + 360) % 360;
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = ln - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;

  if (hn < 60) [rp, gp, bp] = [c, x, 0];
  else if (hn < 120) [rp, gp, bp] = [x, c, 0];
  else if (hn < 180) [rp, gp, bp] = [0, c, x];
  else if (hn < 240) [rp, gp, bp] = [0, x, c];
  else if (hn < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  return {
    r: (rp + m) * 255,
    g: (gp + m) * 255,
    b: (bp + m) * 255,
  };
}

function shiftHsl(hex, patch = {}) {
  const { r, g, b } = hexToRgb(hex);
  const base = rgbToHsl(r, g, b);
  const next = hslToRgb(
    patch.h != null ? patch.h : base.h,
    patch.s != null ? patch.s : base.s,
    patch.l != null ? patch.l : base.l
  );
  return rgbToHex(next.r, next.g, next.b);
}

function deriveSolidPalette(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  return [
    shiftHsl(hex, { s: clamp(s + 8, 18, 96), l: clamp(l - 34, 10, 82) }),
    shiftHsl(hex, { h: h - 8, s: clamp(s + 4, 16, 96), l: clamp(l - 14, 14, 88) }),
    shiftHsl(hex, { h: h + 8, s: clamp(s - 8, 12, 92), l: clamp(l + 18, 18, 92) }),
    shiftHsl(hex, { h: h + 18, s: clamp(s + 14, 16, 98), l: clamp(l + 4, 12, 90) }),
    shiftHsl(hex, { h: h - 14, s: clamp(s + 6, 16, 98), l: clamp(l + 8, 12, 92) }),
    shiftHsl(hex, { h: h + 4, s: clamp(s - 16, 8, 88), l: clamp(l - 6, 12, 90) }),
    shiftHsl(hex, { h: h - 22, s: clamp(s + 2, 8, 92), l: clamp(l + 26, 18, 96) }),
    shiftHsl(hex, { h: h + 24, s: clamp(s - 20, 8, 88), l: clamp(l - 16, 10, 84) }),
    shiftHsl(hex, { h: h - 2, s: clamp(s + 10, 12, 98), l: clamp(l + 12, 14, 94) }),
    shiftHsl(hex, { h: h + 34, s: clamp(s + 8, 14, 98), l: clamp(l + 2, 10, 88) }),
    shiftHsl(hex, { h: h + 52, s: clamp(s + 2, 10, 96), l: clamp(l + 20, 16, 96) }),
    shiftHsl(hex, { h: h - 44, s: clamp(s + 14, 14, 98), l: clamp(l - 24, 8, 74) }),
    shiftHsl(hex, { h: h + 8, s: clamp(s - 24, 8, 84), l: clamp(l + 30, 20, 97) }),
    shiftHsl(hex, { h: h - 10, s: clamp(s + 20, 16, 98), l: clamp(l - 8, 8, 84) }),
    shiftHsl(hex, { h: h + 82, s: clamp(s + 8, 12, 98), l: clamp(l + 10, 14, 92) }),
    shiftHsl(hex, { h: h - 82, s: clamp(s + 8, 12, 98), l: clamp(l + 10, 14, 92) }),
    shiftHsl(hex, { h: h + 64, s: clamp(s + 18, 14, 98), l: clamp(l - 18, 8, 80) }),
    shiftHsl(hex, { h: h - 64, s: clamp(s + 18, 14, 98), l: clamp(l - 18, 8, 80) }),
    shiftHsl(hex, { h: h + 24, s: clamp(s - 28, 8, 82), l: clamp(l + 36, 24, 98) }),
    shiftHsl(hex, { h: h - 24, s: clamp(s - 28, 8, 82), l: clamp(l + 36, 24, 98) }),
    shiftHsl(hex, { h: h + 4, s: clamp(s + 26, 18, 98), l: clamp(l - 30, 6, 72) }),
    shiftHsl(hex, { h: h + 12, s: clamp(s + 22, 16, 98), l: clamp(l + 22, 18, 96) }),
    shiftHsl(hex, { h: h - 12, s: clamp(s + 22, 16, 98), l: clamp(l + 22, 18, 96) }),
    shiftHsl(hex, { h: h + 100, s: clamp(s + 10, 14, 98), l: clamp(l - 10, 8, 82) }),
    shiftHsl(hex, { h: h - 100, s: clamp(s + 10, 14, 98), l: clamp(l - 10, 8, 82) }),
    shiftHsl(hex, { h: h + 150, s: clamp(s + 12, 14, 98), l: clamp(l + 8, 12, 90) }),
  ];
}

function deriveGradientPalette(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  return [
    [shiftHsl(hex, { s: clamp(s + 8, 14, 98), l: clamp(l + 18, 16, 92) }), shiftHsl(hex, { h: h + 14, s: clamp(s - 2, 14, 96), l: clamp(l + 10, 10, 84) })],
    [shiftHsl(hex, { h: h + 16, s: clamp(s + 10, 14, 98), l: clamp(l + 10, 12, 88) }), shiftHsl(hex, { h: h + 44, s: clamp(s + 4, 14, 98), l: clamp(l - 8, 8, 78) })],
    [shiftHsl(hex, { h: h - 14, s: clamp(s + 10, 14, 98), l: clamp(l + 16, 16, 92) }), shiftHsl(hex, { h: h - 42, s: clamp(s + 16, 14, 98), l: clamp(l - 12, 8, 72) })],
    [shiftHsl(hex, { h: h + 30, s: clamp(s - 8, 10, 92), l: clamp(l + 22, 18, 96) }), shiftHsl(hex, { h: h - 20, s: clamp(s + 8, 10, 96), l: clamp(l - 4, 10, 82) })],
    [shiftHsl(hex, { h: h + 70, s: clamp(s + 12, 14, 98), l: clamp(l + 18, 18, 94) }), shiftHsl(hex, { h: h + 120, s: clamp(s + 8, 14, 98), l: clamp(l - 2, 8, 82) })],
    [shiftHsl(hex, { h: h - 70, s: clamp(s + 12, 14, 98), l: clamp(l + 14, 16, 92) }), shiftHsl(hex, { h: h - 110, s: clamp(s + 10, 14, 98), l: clamp(l - 6, 8, 76) })],
    [shiftHsl(hex, { s: clamp(s - 14, 8, 88), l: clamp(l + 26, 18, 96) }), shiftHsl(hex, { s: clamp(s + 10, 12, 98), l: clamp(l - 20, 8, 70) })],
    [shiftHsl(hex, { h: h + 6, s: clamp(s + 4, 12, 98), l: clamp(l + 12, 14, 92) }), shiftHsl(hex, { h: h + 180, s: clamp(s + 8, 12, 98), l: clamp(l + 6, 8, 86) })],
    [shiftHsl(hex, { h: h + 95, s: clamp(s + 10, 14, 98), l: clamp(l + 18, 18, 94) }), shiftHsl(hex, { h: h + 140, s: clamp(s + 6, 12, 98), l: clamp(l - 12, 8, 78) })],
    [shiftHsl(hex, { h: h - 95, s: clamp(s + 10, 14, 98), l: clamp(l + 18, 18, 94) }), shiftHsl(hex, { h: h - 140, s: clamp(s + 6, 12, 98), l: clamp(l - 12, 8, 78) })],
    [shiftHsl(hex, { h: h + 18, s: clamp(s - 18, 8, 84), l: clamp(l + 28, 20, 97) }), shiftHsl(hex, { h: h - 22, s: clamp(s + 18, 14, 98), l: clamp(l - 22, 8, 70) })],
    [shiftHsl(hex, { h: h + 180, s: clamp(s - 8, 8, 88), l: clamp(l + 22, 18, 95) }), shiftHsl(hex, { h: h + 220, s: clamp(s + 16, 14, 98), l: clamp(l - 8, 8, 78) })],
    [shiftHsl(hex, { h: h + 30, s: clamp(s + 24, 16, 98), l: clamp(l + 18, 16, 94) }), shiftHsl(hex, { h: h + 70, s: clamp(s + 20, 14, 98), l: clamp(l - 18, 8, 74) })],
    [shiftHsl(hex, { h: h - 30, s: clamp(s + 24, 16, 98), l: clamp(l + 18, 16, 94) }), shiftHsl(hex, { h: h - 70, s: clamp(s + 20, 14, 98), l: clamp(l - 18, 8, 74) })],
    [shiftHsl(hex, { h: h + 120, s: clamp(s + 14, 14, 98), l: clamp(l + 10, 12, 92) }), shiftHsl(hex, { h: h + 200, s: clamp(s + 12, 14, 98), l: clamp(l - 14, 8, 76) })],
    [shiftHsl(hex, { h: h - 120, s: clamp(s + 14, 14, 98), l: clamp(l + 10, 12, 92) }), shiftHsl(hex, { h: h - 200, s: clamp(s + 12, 14, 98), l: clamp(l - 14, 8, 76) })],
    [shiftHsl(hex, { h: h + 8, s: clamp(s - 30, 8, 80), l: clamp(l + 34, 22, 98) }), shiftHsl(hex, { h: h + 40, s: clamp(s + 14, 14, 98), l: clamp(l - 26, 8, 70) })],
    [shiftHsl(hex, { h: h - 8, s: clamp(s - 30, 8, 80), l: clamp(l + 34, 22, 98) }), shiftHsl(hex, { h: h - 40, s: clamp(s + 14, 14, 98), l: clamp(l - 26, 8, 70) })],
    [shiftHsl(hex, { h: h + 150, s: clamp(s + 8, 12, 96), l: clamp(l + 26, 20, 97) }), shiftHsl(hex, { h: h + 190, s: clamp(s + 18, 14, 98), l: clamp(l - 20, 8, 74) })],
    [shiftHsl(hex, { h: h - 150, s: clamp(s + 8, 12, 96), l: clamp(l + 26, 20, 97) }), shiftHsl(hex, { h: h - 190, s: clamp(s + 18, 14, 98), l: clamp(l - 20, 8, 74) })],
  ];
}

function parseBackgroundState(bg) {
  const value = String(bg || '').trim();
  const gradientMatch = value.match(/linear-gradient\(([-\d.]+)deg,\s*([^,]+),\s*([^)]+)\)/i);
  if (gradientMatch) {
    return {
      mode: 'gradient',
      base: normalizeHex(gradientMatch[2], '#D27D2D'),
      secondary: normalizeHex(gradientMatch[3], '#0A0000'),
      angle: clamp(Math.round(Number(gradientMatch[1]) || 135), 0, 360),
    };
  }
  if (/^#/i.test(value)) {
    return {
      mode: 'solid',
      base: normalizeHex(value, '#D27D2D'),
      secondary: '#0A0000',
      angle: 135,
    };
  }
  return {
    mode: 'solid',
    base: '#D27D2D',
    secondary: '#0A0000',
    angle: 135,
  };
}

const EDITOR_TEXT_PANEL_WIDTH = 324;
const TEXT_COLOR_SWATCHES = ['#FFFFFF', '#F5F6F8', '#111111', '#A9A9A9', '#D27D2D', '#6BD4FF', '#8C7DFF', '#7DFF96', '#FF7A59', '#FF5AAE'];

function isEditableTextSelection(selectedElement, selectedDecoration) {
  if (selectedDecoration) return ['headline', 'sub', 'cta', 'text'].includes(selectedDecoration.type);
  return ['headline', 'sub', 'cta'].includes(selectedElement);
}

function toggleTextDecorationValue(value, token) {
  const next = new Set(String(value || '').split(' ').filter(Boolean));
  if (next.has(token)) next.delete(token);
  else next.add(token);
  return Array.from(next).join(' ');
}

function selectedTextPanelState({ screen, selectedElement, selectedDecoration }) {
  if (!screen) return null;
  const role = selectedDecoration?.type || selectedElement;
  if (!isEditableTextSelection(selectedElement, selectedDecoration)) return null;
  const selectedBox = selectedDecoration || screen.layout?.[selectedElement] || {};
  const base = window.SHIPSHOT.defaultTextPanelMetrics(role, {
    kind: screen.kind,
    templateId: screen.template || 't1',
    textStyle: screen.textStyle || 'crisp',
    ctaStyle: screen.ctaStyle || 'pill',
    width: EDITOR_TEXT_PANEL_WIDTH,
    align: selectedBox.align || 'left',
  });
  return {
    role,
    box: selectedBox,
    base,
    fontFamily: selectedBox.fontFamily || screen.fontFamily || '',
    fontSize: Math.max(10, Math.round((base.fontSize || 16) * (selectedBox.fontSizeScale || 1))),
    fontWeight: typeof selectedBox.fontWeight === 'number' && selectedBox.fontWeight > 0 ? selectedBox.fontWeight : Math.round(base.fontWeight || 600),
    fontStyle: selectedBox.fontStyle || base.fontStyle || 'normal',
    textDecoration: selectedBox.textDecoration || '',
    align: selectedBox.align || base.textAlign || 'left',
    lineHeight: Math.max(70, Math.round((typeof selectedBox.lineHeight === 'number' ? selectedBox.lineHeight : (base.lineHeight || 1.1)) * 100)),
    color: selectedBox.color || base.color || '#FFFFFF',
  };
}

function parseGradientBackground(value) {
  const raw = String(value || '').trim();
  const match = raw.match(/linear-gradient\(\s*([0-9.]+)deg,\s*([^,]+),\s*([^)]+)\)/i);
  if (!match) return null;
  return {
    angle: clamp(Math.round(Number(match[1]) || 180), 0, 360),
    from: normalizeHex(match[2].trim(), '#D27D2D'),
    to: normalizeHex(match[3].trim(), '#0A0000'),
  };
}

const PROJECT_TEXT_ROLES = [
  { id: 'headline', label: 'Title' },
  { id: 'sub', label: 'Subtitle' },
  { id: 'cta', label: 'CTA' },
  { id: 'text', label: 'Description' },
];

function projectTextDecorationBase() {
  return {
    fontFamily: '',
    fontSize: Math.max(12, EDITOR_TEXT_PANEL_WIDTH * 0.08),
    fontWeight: 700,
    lineHeight: 102,
    color: '#F5F6F8',
  };
}

function projectRoleMetricsForScreen(screen, roleId) {
  if (!screen) return projectTextDecorationBase();
  if (roleId === 'text') {
    const decoration = (screen.decorations || []).find((item) => item.type === 'text') || {};
    const base = projectTextDecorationBase();
    return {
      fontFamily: decoration.fontFamily || '',
      fontSize: Math.max(10, Math.round(base.fontSize * (decoration.fontSizeScale || 1))),
      fontWeight: typeof decoration.fontWeight === 'number' && decoration.fontWeight > 0 ? decoration.fontWeight : base.fontWeight,
      lineHeight: Math.max(70, Math.round((typeof decoration.lineHeight === 'number' ? decoration.lineHeight : (base.lineHeight / 100)) * 100)),
      color: decoration.color || base.color,
    };
  }
  const box = screen.layout?.[roleId] || {};
  const base = window.SHIPSHOT.defaultTextPanelMetrics(roleId, {
    kind: screen.kind,
    templateId: screen.template || 't1',
    textStyle: screen.textStyle || 'crisp',
    ctaStyle: screen.ctaStyle || 'pill',
    width: EDITOR_TEXT_PANEL_WIDTH,
    align: box.align || (roleId === 'cta' ? 'center' : 'left'),
  });
  const template = window.DATA.TEMPLATES.find((item) => item.id === (screen.template || 't1')) || window.DATA.TEMPLATES[0] || { accent: '#FFFFFF' };
  return {
    fontFamily: box.fontFamily || screen.fontFamily || '',
    fontSize: Math.max(10, Math.round((base.fontSize || 16) * (box.fontSizeScale || 1))),
    fontWeight: typeof box.fontWeight === 'number' && box.fontWeight > 0 ? box.fontWeight : Math.round(base.fontWeight || 600),
    lineHeight: Math.max(70, Math.round((typeof box.lineHeight === 'number' ? box.lineHeight : (base.lineHeight || 1.1)) * 100)),
    color: box.color || base.color || template.accent || '#FFFFFF',
  };
}

function inferProjectTextStyles(project) {
  const activeVariant = project?.variantsData?.find((variant) => variant.id === project.activeVariantId) || project?.variantsData?.[0] || null;
  const firstScreen = activeVariant?.screensData?.[0] || null;
  return Object.fromEntries(PROJECT_TEXT_ROLES.map((role) => [role.id, projectRoleMetricsForScreen(firstScreen, role.id)]));
}

function inferProjectTheme(project) {
  const activeVariant = project?.variantsData?.find((variant) => variant.id === project.activeVariantId) || project?.variantsData?.[0] || null;
  const firstScreen = activeVariant?.screensData?.[0] || null;
  const stored = project?.projectTheme || {};
  const parsedGradient = parseGradientBackground(stored.background?.value || firstScreen?.bg || '');
  const matchedDirection = window.DATA.STYLE_DIRECTIONS.find((direction) =>
    direction.templateId === (stored.templateId || activeVariant?.templateId || firstScreen?.template || project?.styleId)
    && direction.textStyle === (stored.textStyle || firstScreen?.textStyle || 'crisp')
    && direction.ambientStyle === (stored.ambientStyle || firstScreen?.ambientStyle || 'glow')
    && direction.ctaStyle === (stored.ctaStyle || firstScreen?.ctaStyle || 'pill')
    && direction.chromeStyle === (stored.chromeStyle || firstScreen?.chromeStyle || 'solid')
    && direction.frameStyle === (stored.frameStyle || firstScreen?.frameStyle || 'ios-classic')
  );
  return {
    directionId: stored.directionId || matchedDirection?.id || '',
    templateId: stored.templateId || activeVariant?.templateId || firstScreen?.template || project?.styleId || 't1',
    fontFamily: stored.fontFamily || firstScreen?.fontFamily || '',
    textStyle: stored.textStyle || firstScreen?.textStyle || 'crisp',
    ambientStyle: stored.ambientStyle || firstScreen?.ambientStyle || 'glow',
    ctaStyle: stored.ctaStyle || firstScreen?.ctaStyle || 'pill',
    chromeStyle: stored.chromeStyle || firstScreen?.chromeStyle || 'solid',
    frameStyle: stored.frameStyle || firstScreen?.frameStyle || 'ios-classic',
    background: {
      mode: stored.background?.mode || (parsedGradient ? 'gradient' : 'solid'),
      value: stored.background?.value || firstScreen?.bg || '',
      base: stored.background?.base || parsedGradient?.from || normalizeHex(firstScreen?.bg || '#D27D2D', '#D27D2D'),
      to: stored.background?.to || parsedGradient?.to || '#0A0000',
      angle: typeof stored.background?.angle === 'number' ? stored.background.angle : (parsedGradient?.angle || 180),
    },
    textRoles: {
      ...inferProjectTextStyles(project),
      ...(stored.textRoles || {}),
    },
  };
}

function isProjectTextDecoration(decoration) {
  return decoration && decoration.type !== 'image';
}

function applyFontToScreen(screen, fontFamily) {
  const nextLayout = Object.fromEntries(
    Object.entries(screen.layout || {}).map(([key, value]) => [key, value ? { ...value, fontFamily } : value])
  );
  const nextDecorations = (screen.decorations || []).map((decoration) => (
    isProjectTextDecoration(decoration) ? { ...decoration, fontFamily } : decoration
  ));
  return {
    ...screen,
    fontFamily,
    layout: nextLayout,
    decorations: nextDecorations,
  };
}

function applyProjectTextSpecToScreen(screen, roleId, spec) {
  if (!screen) return screen;
  if (roleId === 'text') {
    const base = projectTextDecorationBase();
    return {
      ...screen,
      decorations: (screen.decorations || []).map((decoration) => (
        decoration.type === 'text'
          ? {
              ...decoration,
              fontFamily: spec.fontFamily || '',
              fontSizeScale: Number((Math.max(10, Number(spec.fontSize) || base.fontSize) / base.fontSize).toFixed(3)),
              fontWeight: Number(spec.fontWeight) || base.fontWeight,
              lineHeight: Number((clamp((Number(spec.lineHeight) || base.lineHeight) / 100, 0.7, 3.2)).toFixed(2)),
              color: normalizeHex(spec.color, base.color),
            }
          : decoration
      )),
    };
  }
  const base = window.SHIPSHOT.defaultTextPanelMetrics(roleId, {
    kind: screen.kind,
    templateId: screen.template || 't1',
    textStyle: screen.textStyle || 'crisp',
    ctaStyle: screen.ctaStyle || 'pill',
    width: EDITOR_TEXT_PANEL_WIDTH,
    align: screen.layout?.[roleId]?.align || (roleId === 'cta' ? 'center' : 'left'),
  });
  const nextScale = Number((Math.max(10, Number(spec.fontSize) || (base.fontSize || 16)) / Math.max(1, Number(base.fontSize) || 16)).toFixed(3));
  const nextLineHeight = Number((clamp((Number(spec.lineHeight) || Math.round((base.lineHeight || 1.1) * 100)) / 100, 0.7, 3.2)).toFixed(2));
  return {
    ...screen,
    layout: {
      ...screen.layout,
      [roleId]: {
        ...(screen.layout?.[roleId] || {}),
        fontFamily: spec.fontFamily || '',
        fontSizeScale: nextScale,
        fontWeight: Number(spec.fontWeight) || Math.round(base.fontWeight || 600),
        lineHeight: nextLineHeight,
        color: normalizeHex(spec.color, '#FFFFFF'),
      },
    },
    decorations: (screen.decorations || []).map((decoration) => (
      decoration.type === roleId
        ? {
            ...decoration,
            fontFamily: spec.fontFamily || '',
            fontSizeScale: nextScale,
            fontWeight: Number(spec.fontWeight) || Math.round(base.fontWeight || 600),
            lineHeight: nextLineHeight,
            color: normalizeHex(spec.color, '#FFFFFF'),
          }
        : decoration
    )),
  };
}

function EditTab({ project, app, onSaveProject, setRoute }) {
  const [variantId, setVariantId] = React.useState(project.activeVariantId);
  const [variantsDraft, setVariantsDraft] = React.useState(project.variantsData);
  const [projectTheme, setProjectTheme] = React.useState(() => inferProjectTheme(project));
  const [selected, setSelected] = React.useState(0);
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [tool, setTool] = React.useState('project');
  const [backgroundMode, setBackgroundMode] = React.useState('solid');
  const [backgroundBaseColor, setBackgroundBaseColor] = React.useState('#D27D2D');
  const [backgroundGradientTo, setBackgroundGradientTo] = React.useState('#0A0000');
  const [backgroundAngle, setBackgroundAngle] = React.useState(180);
  const [uploadAssetMode, setUploadAssetMode] = React.useState('project');
  const [applyTextToAllScreens, setApplyTextToAllScreens] = React.useState(false);
  const [applyBackgroundToAllScreens, setApplyBackgroundToAllScreens] = React.useState(false);
  const [elementsLibraryTab, setElementsLibraryTab] = React.useState('devices');
  const [elementsLibraryCategory, setElementsLibraryCategory] = React.useState({ devices: null, images: null, elements: null });
  const [textTranslateLocale, setTextTranslateLocale] = React.useState('en-US');
  const [customFontFileName, setCustomFontFileName] = React.useState('');
  const [arrangement, setArrangement] = React.useState('horizontal');
  const [history, setHistory] = React.useState([project.variantsData]);
  const [historyIndex, setHistoryIndex] = React.useState(0);
  const [dragIndex, setDragIndex] = React.useState(null);
  const [selectedElement, setSelectedElement] = React.useState('headline');
  const [templateModal, setTemplateModal] = React.useState(null);
  const [quickVariantModal, setQuickVariantModal] = React.useState(null);
  const [variantMenuOpen, setVariantMenuOpen] = React.useState(false);
  const [selectedTextPanelTab, setSelectedTextPanelTab] = React.useState('font');
  const [projectTextPanelTab, setProjectTextPanelTab] = React.useState('font');
  const [selectedProjectTextRole, setSelectedProjectTextRole] = React.useState('headline');
  const [pendingRemoveScreen, setPendingRemoveScreen] = React.useState(null);
  const variantsDraftRef = React.useRef(project.variantsData);
  const mediaInputRef = React.useRef(null);
  const customFontInputRef = React.useRef(null);
  const variantMenuRef = React.useRef(null);

  React.useEffect(() => {
    const nextProjectTheme = inferProjectTheme(project);
    setVariantId(project.activeVariantId);
    setVariantsDraft(project.variantsData);
    variantsDraftRef.current = project.variantsData;
    setProjectTheme(nextProjectTheme);
    setSelected(0);
    setHistory([project.variantsData]);
    setHistoryIndex(0);
    setEditorOpen(false);
    setSelectedElement('headline');
    setTemplateModal(null);
    setQuickVariantModal(null);
    setVariantMenuOpen(false);
    setSelectedTextPanelTab('font');
    setProjectTextPanelTab('font');
    setSelectedProjectTextRole('headline');
    setTool('project');
    setBackgroundMode('solid');
    setBackgroundBaseColor('#D27D2D');
    setBackgroundGradientTo('#0A0000');
    setBackgroundAngle(180);
    setApplyTextToAllScreens(false);
    setApplyBackgroundToAllScreens(false);
    setUploadAssetMode('project');
    setElementsLibraryTab('devices');
    setElementsLibraryCategory({ devices: null, images: null, elements: null });
    setTextTranslateLocale('en-US');
    setCustomFontFileName('');
    setArrangement('horizontal');
  }, [project.id, project.updatedAt, project.activeVariantId, project.variantsData]);

  React.useEffect(() => {
    variantsDraftRef.current = variantsDraft;
  }, [variantsDraft]);

  React.useEffect(() => {
    if (selectedElement === 'phone') {
      setTool('uploads');
      setUploadAssetMode('project');
      setEditorOpen(true);
    }
  }, [selectedElement]);

  React.useEffect(() => {
    if (!variantMenuOpen) return undefined;
    const handlePointerDown = (event) => {
      if (variantMenuRef.current && !variantMenuRef.current.contains(event.target)) {
        setVariantMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [variantMenuOpen]);

  const activeVariant = variantsDraft.find((variant) => variant.id === variantId) || variantsDraft[0];
  const screens = activeVariant?.screensData || [];
  const current = screens[selected] || screens[0];
  const activeVariantLabel = activeVariant?.isPrimary ? 'Primary' : (activeVariant?.name || 'Localization');
  const activeVariantCountryLabel = window.SHIPSHOT.localizationLabel(activeVariant?.country, 'country');
  const variantMenuItems = React.useMemo(() => {
    const primary = variantsDraft.filter((variant) => variant.isPrimary);
    const secondary = variantsDraft.filter((variant) => !variant.isPrimary);
    return [...primary, ...secondary];
  }, [variantsDraft]);
  const selectedDecorationId = typeof selectedElement === 'string' && selectedElement.startsWith('deco:') ? selectedElement.slice(5) : null;
  const selectedDecoration = current?.decorations?.find((item) => item.id === selectedDecorationId) || null;
  const selectedTextState = selectedTextPanelState({ screen: current, selectedElement, selectedDecoration });
  const selectedImageDecoration = selectedDecoration?.type === 'image' ? selectedDecoration : null;

  const commitVariants = (nextVariants) => {
    setVariantsDraft(nextVariants);
    variantsDraftRef.current = nextVariants;
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), nextVariants]);
    setHistoryIndex((prev) => prev + 1);
  };

  const commitProjectTheme = (nextTheme) => {
    setProjectTheme(nextTheme);
  };

  const commitProjectUpdate = (nextVariants, nextTheme) => {
    if (nextTheme) commitProjectTheme(nextTheme);
    commitVariants(nextVariants);
  };

  const patchVariant = (patch) => {
    commitVariants(variantsDraft.map((variant) => variant.id === variantId ? { ...variant, ...patch } : variant));
  };

  const patchVariantTransient = (patch) => {
    setVariantsDraft((prev) => {
      const next = prev.map((variant) => variant.id === variantId ? { ...variant, ...patch } : variant);
      variantsDraftRef.current = next;
      return next;
    });
  };

  const patchCurrent = (patch) => {
    commitVariants(variantsDraft.map((variant) => variant.id === variantId ? {
      ...variant,
      screensData: variant.screensData.map((screen, index) => index === selected ? { ...screen, ...patch } : screen),
    } : variant));
  };

  const patchCurrentTransient = (patch) => {
    setVariantsDraft((prev) => {
      const next = prev.map((variant) => variant.id === variantId ? {
        ...variant,
        screensData: variant.screensData.map((screen, index) => index === selected ? { ...screen, ...patch } : screen),
      } : variant);
      variantsDraftRef.current = next;
      return next;
    });
  };

  const patchAllScreensInVariant = (transformScreen) => {
    commitVariants(variantsDraft.map((variant) => variant.id === variantId ? {
      ...variant,
      screensData: variant.screensData.map((screen, index) => window.SHIPSHOT.normalizeScreen(transformScreen(screen, index))),
    } : variant));
  };

  const commitTransient = () => {
    commitVariants(variantsDraftRef.current);
  };

  const reorderScreens = (fromIndex, toIndex) => {
    if (fromIndex === toIndex || fromIndex == null || toIndex == null) return;
    const next = [...screens];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    patchVariant({ screensData: next });
    setSelected(toIndex);
  };

  const addScreen = () => {
    const next = [...screens, {
      id: `screen-${Date.now().toString(36)}`,
      kind: 'feature',
      template: current?.template || activeVariant.templateId || project.styleId || 't1',
      headline: '',
      sub: '',
      ctaLabel: '',
      bg: '',
      textStyle: current?.textStyle || 'crisp',
      ambientStyle: current?.ambientStyle || 'glow',
      ctaStyle: current?.ctaStyle || 'pill',
      chromeStyle: current?.chromeStyle || 'solid',
      fontFamily: current?.fontFamily || '',
      presetId: null,
      layout: window.SHIPSHOT.defaultLayoutForKind('feature'),
      decorations: [],
    }];
    patchVariant({ screensData: next });
    setSelected(next.length - 1);
    setSelectedElement('headline');
    setEditorOpen(true);
  };

  const addScreenAfter = (index = selected) => {
    const source = screens[index] || current;
    const nextScreen = {
      id: `screen-${Date.now().toString(36)}`,
      kind: source?.kind || 'feature',
      template: source?.template || activeVariant.templateId || project.styleId || 't1',
      headline: '',
      sub: '',
      ctaLabel: '',
      bg: source?.bg || '',
      textStyle: source?.textStyle || 'crisp',
      ambientStyle: source?.ambientStyle || 'glow',
      ctaStyle: source?.ctaStyle || 'pill',
      chromeStyle: source?.chromeStyle || 'solid',
      fontFamily: source?.fontFamily || '',
      presetId: null,
      layout: window.SHIPSHOT.defaultLayoutForKind(source?.kind || 'feature'),
      decorations: [],
    };
    const next = [...screens.slice(0, index + 1), nextScreen, ...screens.slice(index + 1)];
    patchVariant({ screensData: next });
    setSelected(index + 1);
    setSelectedElement('headline');
    setEditorOpen(true);
  };

  const duplicateScreenAt = (index = selected) => {
    const source = screens[index];
    if (!source) return;
    const copy = { ...source, id: `screen-${Date.now().toString(36)}` };
    const next = [...screens.slice(0, index + 1), copy, ...screens.slice(index + 1)];
    patchVariant({ screensData: next });
    setSelected(index + 1);
    setEditorOpen(true);
  };

  const removeScreenAt = (index = selected) => {
    if (screens.length <= 1) return;
    const next = screens.filter((_, screenIndex) => screenIndex !== index);
    patchVariant({ screensData: next });
    setSelected(Math.max(0, Math.min(index, next.length - 1)));
  };

  const regenerateCurrentScreen = () => {
    if (!current) return;
    const spend = window.__shipshotCreditsUI?.trySpend([{ key: 'REGENERATE_SINGLE_SCREEN' }], {
      actionLabel: 'Regenerate single screen',
      successLabel: 'Screen regenerated',
    });
    if (spend && !spend.success) return;
    const adapted = window.SHIPSHOT.localizedCopyForLocale(current.kind, app.name, activeVariant.locale || activeVariant.assetLocale || 'en-US');
    patchCurrent({
      headline: adapted.headline || '',
      sub: adapted.sub || '',
      ctaLabel: current.kind === 'cta' ? (adapted.ctaLabel || current.ctaLabel || '') : current.ctaLabel,
    });
  };

  const applyPreset = (presetId) => {
    if (!current) return;
    const nextScreen = window.SHIPSHOT.applyScreenPreset(current, presetId);
    patchCurrent(nextScreen);
    setSelectedElement('headline');
  };

  const applyStyleDirection = (directionId) => {
    if (!activeVariant?.screensData?.length) return;
    patchVariant({
      screensData: activeVariant.screensData.map((screen) => window.SHIPSHOT.applyStyleDirection(screen, directionId)),
    });
    setSelectedElement('headline');
  };

  const openTemplateConfirm = (entry) => {
    if (!current || !entry) return;
    setTemplateModal(entry);
  };

  const confirmTemplateReplace = () => {
    if (!templateModal) return;
    if (templateModal.kind === 'direction') {
      const nextVariants = variantsDraft.map((variant) => variant.id === variantId ? {
        ...variant,
        screensData: variant.screensData.map((screen) => window.SHIPSHOT.applyStyleDirection(screen, templateModal.id)),
      } : variant);
      commitVariants(nextVariants);
      onSaveProject(project.id, {
        variantsData: nextVariants,
        projectTheme,
        activeVariantId: variantId,
        screensData: nextVariants.find((variant) => variant.id === variantId)?.screensData || activeVariant.screensData,
        screens: nextVariants.find((variant) => variant.id === variantId)?.screensData?.length || activeVariant.screensData.length,
        thumb: (nextVariants.find((variant) => variant.id === variantId)?.screensData || activeVariant.screensData).map((screen) => screen.kind),
        country: activeVariant.country,
        audience: activeVariant.audience,
        styleId: projectTheme.templateId || activeVariant.templateId,
      }, 'Style direction replaced');
      setSelectedElement('headline');
    }
    if (templateModal.kind === 'preset' && current) {
      const nextScreen = window.SHIPSHOT.applyScreenPreset(current, templateModal.id);
      const nextVariants = variantsDraft.map((variant) => variant.id === variantId ? {
        ...variant,
        screensData: variant.screensData.map((screen, index) => index === selected ? { ...screen, ...nextScreen } : screen),
      } : variant);
      commitVariants(nextVariants);
      onSaveProject(project.id, {
        variantsData: nextVariants,
        projectTheme,
        activeVariantId: variantId,
        screensData: nextVariants.find((variant) => variant.id === variantId)?.screensData || activeVariant.screensData,
        screens: nextVariants.find((variant) => variant.id === variantId)?.screensData?.length || activeVariant.screensData.length,
        thumb: (nextVariants.find((variant) => variant.id === variantId)?.screensData || activeVariant.screensData).map((screen) => screen.kind),
        country: activeVariant.country,
        audience: activeVariant.audience,
        styleId: projectTheme.templateId || activeVariant.templateId,
      }, 'Screen template replaced');
      setSelectedElement('headline');
    }
    setTemplateModal(null);
  };

  const openQuickVariantModal = () => {
    if (!activeVariant) return;
    const defaultCountry = window.DATA.COUNTRIES.find((item) => item.code !== activeVariant.country)?.code || 'de-DE';
    setVariantMenuOpen(false);
    setQuickVariantModal({
      mode: 'duplicate',
      country: defaultCountry,
      audience: defaultCountry === 'en-US' ? 'Primary audience' : 'Localized audience',
    });
  };

  const createQuickVariant = () => {
    if (!activeVariant || !quickVariantModal) return;
    const country = quickVariantModal.country || 'en-US';
    const locale = window.SHIPSHOT.localeForCountry(country);
    const audience = quickVariantModal.audience || (country === 'en-US' ? 'Primary audience' : 'Localized audience');
    const templateId = activeVariant.templateId || project.styleId || 't1';
    const screenCount = activeVariant.screensData?.length || project.screens || 6;
    const baseScreens = quickVariantModal.mode === 'scratch'
      ? window.SHIPSHOT.makeScreenRecords(screenCount, templateId).map((screen) => window.SHIPSHOT.normalizeScreen({ ...screen, template: templateId }))
      : activeVariant.screensData;
    const spend = window.__shipshotCreditsUI?.trySpend([{ key: 'ADD_LANGUAGE_VARIANT' }], {
      actionLabel: `Add localization ${window.SHIPSHOT.localizationLabel(country, 'compact')}`,
      successLabel: 'Localization created',
    });
    if (spend && !spend.success) return;
    const nextVariant = {
      ...activeVariant,
      id: `variant-${country}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
      name: `${window.SHIPSHOT.localizationOptionByCode(country).language}`,
      country,
      locale,
      audience,
      assetLocale: window.SHIPSHOT.pickAssetLocale(app, country),
      isPrimary: false,
      templateId,
      screensData: window.SHIPSHOT.localizeScreensForVariant(baseScreens, app, country),
    };
    const nextVariants = [...variantsDraft, nextVariant];
    setVariantId(nextVariant.id);
    commitVariants(nextVariants);
    onSaveProject(project.id, {
      variantsData: nextVariants,
      activeVariantId: nextVariant.id,
      projectTheme,
      screensData: nextVariant.screensData,
      screens: nextVariant.screensData.length,
      thumb: nextVariant.screensData.map((screen) => screen.kind),
      country: nextVariant.country,
      audience: nextVariant.audience,
      styleId: projectTheme.templateId || nextVariant.templateId,
    }, 'Localization created');
    setSelected(0);
    setEditorOpen(true);
    setSelectedElement('headline');
    setQuickVariantModal(null);
  };

  const addDecoration = (type) => {
    if (!current) return;
    const decoration = window.SHIPSHOT.createDecoration(type);
    patchCurrent({
      decorations: [...(current.decorations || []), decoration],
    });
    setSelectedElement(`deco:${decoration.id}`);
  };

  const patchSelectedDecoration = (patch, transient = false) => {
    if (!selectedDecoration || !current) return;
    const nextDecorations = current.decorations.map((item) => item.id === selectedDecoration.id ? { ...item, ...patch } : item);
    if (transient) patchCurrentTransient({ decorations: nextDecorations });
    else patchCurrent({ decorations: nextDecorations });
  };

  const removeSelectedDecoration = () => {
    if (!selectedDecoration || !current) return;
    patchCurrent({ decorations: current.decorations.filter((item) => item.id !== selectedDecoration.id) });
    setSelectedElement('headline');
  };

  const undo = () => {
    if (historyIndex === 0) return;
    const nextIndex = historyIndex - 1;
    setHistoryIndex(nextIndex);
    setVariantsDraft(history[nextIndex]);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setVariantsDraft(history[nextIndex]);
  };

  const save = () => {
    onSaveProject(project.id, {
      variantsData: variantsDraft,
      projectTheme,
      activeVariantId: variantId,
      screensData: activeVariant.screensData,
      screens: activeVariant.screensData.length,
      thumb: activeVariant.screensData.map((screen) => screen.kind),
      country: activeVariant.country,
      audience: activeVariant.audience,
      styleId: projectTheme.templateId || activeVariant.templateId,
    }, 'Editor changes saved');
  };

  const openScreenEditor = (index) => {
    setSelected(index);
    setEditorOpen(true);
    setSelectedElement('headline');
  };

  const moveScreen = (index, direction) => {
    const nextIndex = direction === 'left' ? Math.max(0, index - 1) : Math.min(screens.length - 1, index + 1);
    reorderScreens(index, nextIndex);
  };

  const applyBackgroundPreset = (value) => {
    if (!current) return;
    onPatchCurrentSafe({ bg: value });
  };

  const setSolidBackground = (color) => {
    const next = normalizeHex(color, backgroundBaseColor);
    setBackgroundBaseColor(next);
    if (applyBackgroundToAllScreens) {
      patchAllScreensInVariant((screen) => ({ ...screen, bg: next }));
      return;
    }
    applyBackgroundPreset(next);
  };

  const setGradientBackground = (start, end, angle = backgroundAngle) => {
    const nextStart = normalizeHex(start, backgroundBaseColor);
    const nextEnd = normalizeHex(end, backgroundGradientTo);
    const nextAngle = clamp(Math.round(Number(angle) || 0), 0, 360);
    setBackgroundBaseColor(nextStart);
    setBackgroundGradientTo(nextEnd);
    setBackgroundAngle(nextAngle);
    const nextBackground = `linear-gradient(${nextAngle}deg, ${nextStart}, ${nextEnd})`;
    if (applyBackgroundToAllScreens) {
      patchAllScreensInVariant((screen) => ({ ...screen, bg: nextBackground }));
      return;
    }
    applyBackgroundPreset(nextBackground);
  };

  const onPatchCurrentSafe = (patch) => {
    if (!current) return;
    patchCurrent(patch);
  };

  const applySelectedTextPatchToAllScreens = (patch) => {
    if (!selectedTextState) return;
    const roleId = selectedDecoration?.type || selectedElement;
    if (!roleId) return;
    patchAllScreensInVariant((screen) => {
      if (roleId === 'text') {
        return {
          ...screen,
          decorations: (screen.decorations || []).map((decoration) => (
            decoration.type === 'text' ? { ...decoration, ...patch } : decoration
          )),
        };
      }
      return {
        ...screen,
        layout: {
          ...screen.layout,
          [roleId]: {
            ...(screen.layout?.[roleId] || {}),
            ...patch,
          },
        },
        decorations: (screen.decorations || []).map((decoration) => (
          decoration.type === roleId ? { ...decoration, ...patch } : decoration
        )),
      };
    });
  };

  const patchSelectedText = (patch) => {
    if (applyTextToAllScreens) {
      applySelectedTextPatchToAllScreens(patch);
      return;
    }
    patchSelectedLayer(patch);
  };

  const selectedTextBaseMetricsForScreen = (screen, roleId) => {
    const box = roleId === 'text'
      ? ((screen.decorations || []).find((item) => item.type === 'text') || {})
      : (screen.layout?.[roleId] || {});
    return window.SHIPSHOT.defaultTextPanelMetrics(roleId, {
      kind: screen.kind,
      templateId: screen.template || 't1',
      textStyle: screen.textStyle || 'crisp',
      ctaStyle: screen.ctaStyle || 'pill',
      width: EDITOR_TEXT_PANEL_WIDTH,
      align: box.align || (roleId === 'cta' ? 'center' : 'left'),
    });
  };

  const selectedCoreBox = (selectedElement && !selectedElement.startsWith('deco:')) ? current?.layout?.[selectedElement] : null;
  const selectedLayer = selectedDecoration || selectedCoreBox || null;
  const selectedIsPhone = selectedElement === 'phone' && !selectedDecoration;

  const patchSelectedLayer = (patch, transient = false) => {
    if (!current || !selectedElement) return;
    if (selectedDecoration) {
      patchSelectedDecoration(patch, transient);
      return;
    }
    if (!selectedCoreBox) return;
    const nextLayout = {
      ...current.layout,
      [selectedElement]: {
        ...selectedCoreBox,
        ...patch,
      },
    };
    if (transient) patchCurrentTransient({ layout: nextLayout });
    else patchCurrent({ layout: nextLayout });
  };

  const duplicateSelectedLayer = () => {
    try {
      if (!current || !selectedElement) return;
      if (selectedDecoration) {
        const clone = {
          ...selectedDecoration,
          id: `deco-${Date.now().toString(36)}`,
          x: Number(selectedDecoration.x || 0) + 4,
          y: Number(selectedDecoration.y || 0) + 4,
          z: Number(selectedDecoration.z || 60) + 1,
        };
        patchCurrent({ decorations: [...(current.decorations || []), clone] });
        setSelectedElement(`deco:${clone.id}`);
        return;
      }
      if (!selectedCoreBox) return;
      const normalized = window.SHIPSHOT.normalizeDecorations([{
        id: `deco-${selectedElement}-${Date.now().toString(36)}`,
        type: selectedElement,
        x: Number(selectedCoreBox.x || 0) + 4,
        y: Number(selectedCoreBox.y || 0) + 4,
        w: Number(selectedCoreBox.w || 24),
        rotation: Number(selectedCoreBox.rotation || 0),
        z: Number(selectedCoreBox.z || 40) + 1,
        fontFamily: selectedCoreBox.fontFamily || current.fontFamily || '',
        text: selectedElement === 'headline' ? (current.headline || '') : (selectedElement === 'sub' ? (current.sub || '') : (selectedElement === 'cta' ? (current.ctaLabel || 'Get the app') : (selectedElement === 'chrome' ? (app.name || 'App') : ''))),
        style: selectedElement === 'chrome' ? (current.chromeStyle || 'solid') : 'light',
      }]);
      const clone = normalized[0];
      if (!clone) return;
      patchCurrent({ decorations: [...(current.decorations || []), clone] });
      setSelectedElement(`deco:${clone.id}`);
    } catch (error) {
      console.error('duplicateSelectedLayer failed', error);
    }
  };

  const deleteSelectedLayer = () => {
    if (!current || !selectedElement) return;
    if (selectedDecoration) {
      removeSelectedDecoration();
      return;
    }
    patchSelectedLayer({ hidden: true });
    setSelectedElement(null);
  };

  const rotateSelectedLayer = (amount) => {
    if (!selectedLayer) return;
    patchSelectedLayer({ rotation: (selectedLayer.rotation || 0) + amount });
  };

  const moveSelectedLayer = (direction) => {
    if (!selectedLayer) return;
    patchSelectedLayer({ z: (selectedLayer.z || 40) + (direction === 'up' ? 10 : -10) });
  };

  const applySelectedFont = (value) => {
    if (!current) return;
    if (selectedElement) {
      patchSelectedLayer({ fontFamily: value });
      return;
    }
    onPatchCurrentSafe({ fontFamily: value });
  };

  const handlePhoneMediaUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file || !selectedIsPhone) return;
    const reader = new FileReader();
    reader.onload = () => {
      patchSelectedLayer({
        mediaSrc: typeof reader.result === 'string' ? reader.result : '',
        mediaType: file.type || 'image/*',
      });
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const clearPhoneMedia = () => {
    if (!selectedIsPhone) return;
    patchSelectedLayer({ mediaSrc: '', mediaType: '' });
  };

  const addTextDecoration = () => {
    if (!current) return;
    const decoration = window.SHIPSHOT.normalizeDecorations([{
      id: `deco-text-${Date.now().toString(36)}`,
      type: 'text',
      x: 10,
      y: 12,
      w: 44,
      text: 'New text',
      style: 'plain',
      z: 75,
      fontSizeScale: 1,
      color: '#F5F6F8',
    }])[0];
    patchCurrent({ decorations: [...(current.decorations || []), decoration] });
    setSelectedElement(`deco:${decoration.id}`);
  };

  const setSelectedTextFontSize = (nextSize) => {
    if (!selectedTextState) return;
    const size = clamp(Math.round(Number(nextSize) || selectedTextState.fontSize), 10, 320);
    if (applyTextToAllScreens) {
      const roleId = selectedDecoration?.type || selectedElement;
      if (!roleId) return;
      patchAllScreensInVariant((screen) => {
        const base = roleId === 'text' ? projectTextDecorationBase() : selectedTextBaseMetricsForScreen(screen, roleId);
        const baseSize = Math.max(1, Number(base.fontSize) || 16);
        const patch = { fontSizeScale: Number((size / baseSize).toFixed(3)) };
        if (roleId === 'text') {
          return {
            ...screen,
            decorations: (screen.decorations || []).map((decoration) => (
              decoration.type === 'text' ? { ...decoration, ...patch } : decoration
            )),
          };
        }
        return {
          ...screen,
          layout: {
            ...screen.layout,
            [roleId]: {
              ...(screen.layout?.[roleId] || {}),
              ...patch,
            },
          },
          decorations: (screen.decorations || []).map((decoration) => (
            decoration.type === roleId ? { ...decoration, ...patch } : decoration
          )),
        };
      });
      return;
    }
    const baseSize = Math.max(1, Number(selectedTextState.base.fontSize) || 16);
    patchSelectedLayer({ fontSizeScale: Number((size / baseSize).toFixed(3)) });
  };

  const setSelectedTextLineHeight = (nextValue) => {
    if (!selectedTextState) return;
    const lineHeight = clamp((Number(nextValue) || selectedTextState.lineHeight) / 100, 0.7, 3.2);
    patchSelectedText({ lineHeight: Number(lineHeight.toFixed(2)) });
  };

  const toggleSelectedTextDecoration = (token) => {
    if (!selectedTextState) return;
    patchSelectedText({ textDecoration: toggleTextDecorationValue(selectedTextState.textDecoration, token) });
  };

  const toggleSelectedTextWeight = () => {
    if (!selectedTextState) return;
    patchSelectedText({ fontWeight: selectedTextState.fontWeight >= 650 ? 500 : 700 });
  };

  const toggleSelectedTextItalic = () => {
    if (!selectedTextState) return;
    patchSelectedText({ fontStyle: selectedTextState.fontStyle === 'italic' ? 'normal' : 'italic' });
  };

  const translateCurrentText = () => {
    if (!current) return;
    const localized = window.SHIPSHOT.localizedCopyForLocale(current.kind, app.name, textTranslateLocale);
    patchCurrent({
      headline: localized.headline || current.headline,
      sub: localized.sub || current.sub,
      ctaLabel: current.kind === 'cta' ? (localized.ctaLabel || current.ctaLabel) : current.ctaLabel,
    });
  };

  const handleCustomFontUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setCustomFontFileName(file.name);
    event.target.value = '';
  };

  const sidebarTabs = [
    { id: 'project', label: 'Project', icon: <window.I.Settings /> },
    { id: 'templates', label: 'Templates', icon: <window.I.Grid /> },
    { id: 'elements', label: 'Elements', icon: <window.I.Layers /> },
    { id: 'text', label: 'Text', icon: <window.I.Type /> },
    { id: 'background', label: 'Background', icon: <window.I.Palette /> },
    { id: 'uploads', label: 'Uploads', icon: <window.I.Upload /> },
  ];

  const backgroundCoreSwatches = Array.from(new Set([app?.tint, app?.tint2, '#FFD84D', '#D27D2D', '#E14B4B', '#4F7CFF', '#44B86A', '#FF7AC6', '#8A5A3C', '#8C62FF', '#000000', '#A9A9A9'].filter(Boolean)));
  const backgroundSolidPresets = deriveSolidPalette(backgroundBaseColor);
  const backgroundGradientPresets = deriveGradientPalette(backgroundBaseColor);
  const textColorSolidPresets = deriveSolidPalette(selectedTextState?.color || '#D27D2D');
  const projectBackgroundSolidPresets = deriveSolidPalette(projectTheme.background.base || '#D27D2D');
  const projectBackgroundGradientPresets = deriveGradientPalette(projectTheme.background.base || '#D27D2D');
  const projectTextColorPresets = Object.fromEntries(
    PROJECT_TEXT_ROLES.map((role) => [role.id, deriveSolidPalette(projectTheme.textRoles?.[role.id]?.color || '#D27D2D')])
  );
  const selectedProjectRole = PROJECT_TEXT_ROLES.find((role) => role.id === selectedProjectTextRole) || PROJECT_TEXT_ROLES[0];
  const selectedProjectRoleSpec = projectTheme.textRoles?.[selectedProjectRole.id] || projectRoleMetricsForScreen(current, selectedProjectRole.id);

  const applyProjectSetting = (updater, themePatch = null) => {
    const nextVariants = variantsDraft.map((variant) => ({
      ...variant,
      templateId: themePatch?.templateId || variant.templateId,
      screensData: variant.screensData.map((screen) => window.SHIPSHOT.normalizeScreen(updater(screen, variant))),
    }));
    const nextTheme = themePatch ? { ...projectTheme, ...themePatch } : projectTheme;
    commitProjectUpdate(nextVariants, nextTheme);
  };

  const applyProjectDirection = (directionId) => {
    const direction = window.SHIPSHOT.styleDirectionById(directionId);
    if (!direction) {
      commitProjectTheme({ ...projectTheme, directionId: '' });
      return;
    }
    const nextTheme = {
      ...projectTheme,
      directionId,
      templateId: direction.templateId || projectTheme.templateId,
      textStyle: direction.textStyle || projectTheme.textStyle,
      ambientStyle: direction.ambientStyle || projectTheme.ambientStyle,
      ctaStyle: direction.ctaStyle || projectTheme.ctaStyle,
      chromeStyle: direction.chromeStyle || projectTheme.chromeStyle,
      frameStyle: direction.frameStyle || projectTheme.frameStyle,
    };
    const nextVariants = variantsDraft.map((variant) => ({
      ...variant,
      templateId: direction.templateId || variant.templateId,
      screensData: variant.screensData.map((screen) => window.SHIPSHOT.applyStyleDirection(screen, directionId)),
    }));
    commitProjectUpdate(nextVariants, nextTheme);
  };

  const applyProjectFont = (fontFamily) => {
    const nextTextRoles = Object.fromEntries(PROJECT_TEXT_ROLES.map((role) => [
      role.id,
      {
        ...(projectTheme.textRoles?.[role.id] || projectRoleMetricsForScreen(current, role.id)),
        fontFamily,
      },
    ]));
    applyProjectSetting(
      (screen) => applyFontToScreen(screen, fontFamily),
      { fontFamily, textRoles: nextTextRoles, directionId: '' }
    );
  };

  const applyProjectBackground = (background) => {
    const nextBackground = {
      ...background,
      base: normalizeHex(background.base, '#D27D2D'),
      to: normalizeHex(background.to, '#0A0000'),
      angle: clamp(Math.round(Number(background.angle) || 180), 0, 360),
    };
    const nextValue = nextBackground.mode === 'gradient'
      ? `linear-gradient(${nextBackground.angle}deg, ${nextBackground.base}, ${nextBackground.to})`
      : nextBackground.base;
    applyProjectSetting(
      (screen) => ({ ...screen, bg: nextValue }),
      { background: { ...nextBackground, value: nextValue }, directionId: '' }
    );
  };

  const applyProjectStyleField = (field, value) => {
    applyProjectSetting(
      (screen) => ({ ...screen, [field]: value }),
      { [field]: value, directionId: '' }
    );
  };

  const applyProjectTextRoleSpec = (roleId, patch) => {
    const currentSpec = projectTheme.textRoles?.[roleId] || projectRoleMetricsForScreen(current, roleId);
    const nextSpec = {
      ...currentSpec,
      ...patch,
    };
    const nextTextRoles = {
      ...(projectTheme.textRoles || {}),
      [roleId]: {
        ...nextSpec,
        fontSize: clamp(Math.round(Number(nextSpec.fontSize) || currentSpec.fontSize || 16), 10, 320),
        fontWeight: clamp(Math.round(Number(nextSpec.fontWeight) || currentSpec.fontWeight || 600), 300, 900),
        lineHeight: clamp(Math.round(Number(nextSpec.lineHeight) || currentSpec.lineHeight || 110), 70, 320),
        color: normalizeHex(nextSpec.color, currentSpec.color || '#FFFFFF'),
      },
    };
    applyProjectSetting(
      (screen) => applyProjectTextSpecToScreen(screen, roleId, nextTextRoles[roleId]),
      { textRoles: nextTextRoles, directionId: '' }
    );
  };

  const backgroundImagePresets = [
    window.DATA.TEMPLATES[0]?.bg || '',
    window.DATA.TEMPLATES[3]?.bg || '',
    window.DATA.TEMPLATES[8]?.bg || '',
  ].filter(Boolean);

  return (
    <div className="editor-competitor-shell">
      <ProjectConfirmModal
        open={pendingRemoveScreen != null}
        title="Delete Screen"
        body={pendingRemoveScreen != null ? `Delete screen ${pendingRemoveScreen + 1} from this localization?` : ''}
        confirmLabel="Delete"
        onCancel={() => setPendingRemoveScreen(null)}
        onConfirm={() => {
          if (pendingRemoveScreen != null) removeScreenAt(pendingRemoveScreen);
          setPendingRemoveScreen(null);
        }}
      />
      <div className="editor-left-rail">
        {sidebarTabs.map((tab) => (
          <button
            key={tab.id}
            className={`editor-left-rail__item${tool === tab.id ? ' is-active' : ''}`}
            onClick={() => {
              setTool(tab.id);
              setSelectedElement(null);
              if (current) setEditorOpen(true);
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={`editor-left-panel${editorOpen ? ' is-open' : ''}`}>
        <div className="editor-left-panel__header">
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{sidebarTabs.find((tab) => tab.id === tool)?.label || 'Editor'}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>
              {current ? `Screen 0${selected + 1} · ${current.kind}` : 'Select a screen to edit'}
            </div>
          </div>
          <button className="btn ghost icon sm" onClick={() => setEditorOpen(false)}><window.I.X /></button>
        </div>

        <div className="editor-left-panel__body">
          {current ? (
            <>
              {selectedTextState ? (
                <div className="editor-context-panel editor-text-panel">
                  <div className="seg editor-context-panel__seg editor-text-panel__seg" style={{ width: '100%' }}>
                    <button className={selectedTextPanelTab === 'font' ? 'on' : ''} onClick={() => setSelectedTextPanelTab('font')} style={{ flex: 1 }}>Font</button>
                    <button className={selectedTextPanelTab === 'color' ? 'on' : ''} onClick={() => setSelectedTextPanelTab('color')} style={{ flex: 1 }}>Color</button>
                  </div>
                  <label className="editor-apply-toggle">
                    <input type="checkbox" checked={applyTextToAllScreens} onChange={(e) => setApplyTextToAllScreens(e.target.checked)} />
                    <span>Apply to all screens</span>
                  </label>

                  {selectedTextPanelTab === 'font' ? (
                    <div className="editor-context-panel__stack">
                      <div className="editor-context-panel__section">
                        <div className="editor-context-panel__label">Font Family</div>
                        <select className="input editor-context-panel__input editor-text-panel__input" value={selectedTextState.fontFamily} onChange={(e) => patchSelectedText({ fontFamily: e.target.value })}>
                          <option value="">Project default</option>
                          {window.DATA.WEB_FONT_OPTIONS.map((font) => (
                            <option key={font.id} value={font.family}>{font.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="editor-context-panel__section">
                        <div className="editor-context-panel__label">Font Size</div>
                        <div className="editor-stepper">
                          <button onClick={() => setSelectedTextFontSize(selectedTextState.fontSize - 1)}>-</button>
                          <input
                            type="number"
                            value={selectedTextState.fontSize}
                            onChange={(e) => setSelectedTextFontSize(e.target.value)}
                          />
                          <button onClick={() => setSelectedTextFontSize(selectedTextState.fontSize + 1)}><window.I.Plus /></button>
                        </div>
                      </div>

                      <div className="editor-context-panel__section">
                        <div className="editor-context-panel__label">Font Style</div>
                        <div className="editor-icon-toggle-row editor-icon-toggle-row--4">
                          <button className={selectedTextState.fontWeight >= 650 ? 'is-active' : ''} onClick={toggleSelectedTextWeight}><strong>B</strong></button>
                          <button className={selectedTextState.fontStyle === 'italic' ? 'is-active' : ''} onClick={toggleSelectedTextItalic}><em>I</em></button>
                          <button className={selectedTextState.textDecoration.includes('underline') ? 'is-active' : ''} onClick={() => toggleSelectedTextDecoration('underline')}><span style={{ textDecoration: 'underline' }}>U</span></button>
                          <button className={selectedTextState.textDecoration.includes('line-through') ? 'is-active' : ''} onClick={() => toggleSelectedTextDecoration('line-through')}><span style={{ textDecoration: 'line-through' }}>S</span></button>
                        </div>
                      </div>

                      <div className="editor-context-panel__section">
                        <div className="editor-context-panel__label">Font Alignment</div>
                        <div className="editor-icon-toggle-row">
                          {[
                            ['left', '≡'],
                            ['center', '≣'],
                            ['right', '≡'],
                          ].map(([align, label]) => (
                            <button key={align} className={selectedTextState.align === align ? 'is-active' : ''} onClick={() => patchSelectedText({ align })}>
                              <span className={`editor-align-glyph is-${align}`}>{label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="editor-context-panel__section">
                        <div className="editor-context-panel__label">Line Height</div>
                        <div className="editor-stepper">
                          <button onClick={() => setSelectedTextLineHeight(selectedTextState.lineHeight - 1)}>-</button>
                          <input
                            type="number"
                            value={selectedTextState.lineHeight}
                            onChange={(e) => setSelectedTextLineHeight(e.target.value)}
                          />
                          <button onClick={() => setSelectedTextLineHeight(selectedTextState.lineHeight + 1)}><window.I.Plus /></button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="editor-background-stack">
                      <div className="editor-form-label">Color picker</div>
                      <label className="editor-color-field">
                        <span className="editor-color-field__swatch" style={{ background: selectedTextState.color }} />
                        <input
                          className="editor-color-field__input"
                          value={selectedTextState.color}
                          onChange={(e) => patchSelectedText({ color: normalizeHex(e.target.value, '#FFFFFF') })}
                        />
                        <input
                          type="color"
                          className="editor-color-field__native"
                          value={normalizeHex(selectedTextState.color, '#FFFFFF')}
                          onChange={(e) => patchSelectedText({ color: e.target.value })}
                        />
                      </label>

                      <div className="editor-round-swatches">
                        {backgroundCoreSwatches.map((color) => (
                          <button
                            key={color}
                            className={`editor-round-swatch${normalizeHex(selectedTextState.color, '#FFFFFF') === normalizeHex(color, '#FFFFFF') ? ' is-active' : ''}`}
                            style={{ background: color }}
                            onClick={() => patchSelectedText({ color })}
                          />
                        ))}
                      </div>

                      <div className="editor-color-grid">
                        {textColorSolidPresets.map((color, index) => (
                          <button
                            key={`${color}-${index}`}
                            className={`editor-color-swatch${normalizeHex(selectedTextState.color, '#FFFFFF') === normalizeHex(color, '#FFFFFF') ? ' is-active' : ''}`}
                            style={{ background: color }}
                            onClick={() => patchSelectedText({ color })}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : selectedImageDecoration ? (
                <div className="editor-context-panel">
                  <div className="editor-context-panel__stack">
                    <div className="editor-context-panel__section">
                      <div className="editor-context-panel__label">Shadow</div>
                      <div className="editor-context-panel__label editor-context-panel__label--muted">Color</div>
                      <label className="editor-color-field editor-context-panel__color-field">
                        <span className="editor-color-field__swatch" style={{ background: selectedImageDecoration.shadowColor || '#000000' }} />
                        <input className="editor-color-field__input" value={selectedImageDecoration.shadowColor || '#000000'} onChange={(e) => patchSelectedDecoration({ shadowColor: normalizeHex(e.target.value, '#000000') })} />
                        <input type="color" className="editor-color-field__native" value={normalizeHex(selectedImageDecoration.shadowColor || '#000000', '#000000')} onChange={(e) => patchSelectedDecoration({ shadowColor: e.target.value })} />
                      </label>

                      <div className="editor-image-controls-grid">
                        <div>
                          <div className="editor-context-panel__label editor-context-panel__label--muted">Height</div>
                          <div className="editor-stepper">
                            <button onClick={() => patchSelectedDecoration({ shadowY: (selectedImageDecoration.shadowY || 0) - 1 })}>-</button>
                            <input type="number" value={selectedImageDecoration.shadowY || 0} onChange={(e) => patchSelectedDecoration({ shadowY: Number(e.target.value) || 0 })} />
                            <button onClick={() => patchSelectedDecoration({ shadowY: (selectedImageDecoration.shadowY || 0) + 1 })}><window.I.Plus /></button>
                          </div>
                        </div>
                        <div>
                          <div className="editor-context-panel__label editor-context-panel__label--muted">Width</div>
                          <div className="editor-stepper">
                            <button onClick={() => patchSelectedDecoration({ shadowX: (selectedImageDecoration.shadowX || 0) - 1 })}>-</button>
                            <input type="number" value={selectedImageDecoration.shadowX || 0} onChange={(e) => patchSelectedDecoration({ shadowX: Number(e.target.value) || 0 })} />
                            <button onClick={() => patchSelectedDecoration({ shadowX: (selectedImageDecoration.shadowX || 0) + 1 })}><window.I.Plus /></button>
                          </div>
                        </div>
                        <div>
                          <div className="editor-context-panel__label editor-context-panel__label--muted">Blur</div>
                          <div className="editor-stepper">
                            <button onClick={() => patchSelectedDecoration({ shadowBlur: Math.max(0, (selectedImageDecoration.shadowBlur || 0) - 1) })}>-</button>
                            <input type="number" value={selectedImageDecoration.shadowBlur || 0} onChange={(e) => patchSelectedDecoration({ shadowBlur: Math.max(0, Number(e.target.value) || 0) })} />
                            <button onClick={() => patchSelectedDecoration({ shadowBlur: (selectedImageDecoration.shadowBlur || 0) + 1 })}><window.I.Plus /></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="editor-context-panel__section">
                      <div className="editor-context-panel__label">Border</div>
                      <div className="editor-image-controls-grid editor-image-controls-grid--2">
                        <div>
                          <div className="editor-context-panel__label editor-context-panel__label--muted">Radius</div>
                          <div className="editor-stepper">
                            <button onClick={() => patchSelectedDecoration({ borderRadius: Math.max(0, (selectedImageDecoration.borderRadius || 0) - 1) })}>-</button>
                            <input type="number" value={selectedImageDecoration.borderRadius || 0} onChange={(e) => patchSelectedDecoration({ borderRadius: Math.max(0, Number(e.target.value) || 0) })} />
                            <button onClick={() => patchSelectedDecoration({ borderRadius: (selectedImageDecoration.borderRadius || 0) + 1 })}><window.I.Plus /></button>
                          </div>
                        </div>
                        <div>
                          <div className="editor-context-panel__label editor-context-panel__label--muted">Width</div>
                          <div className="editor-stepper">
                            <button onClick={() => patchSelectedDecoration({ borderWidth: Math.max(0, (selectedImageDecoration.borderWidth || 0) - 1) })}>-</button>
                            <input type="number" value={selectedImageDecoration.borderWidth || 0} onChange={(e) => patchSelectedDecoration({ borderWidth: Math.max(0, Number(e.target.value) || 0) })} />
                            <button onClick={() => patchSelectedDecoration({ borderWidth: (selectedImageDecoration.borderWidth || 0) + 1 })}><window.I.Plus /></button>
                          </div>
                        </div>
                      </div>
                      <label className="editor-color-field editor-context-panel__color-field" style={{ marginTop: 10 }}>
                        <span className="editor-color-field__swatch" style={{ background: selectedImageDecoration.borderColor || '#000000' }} />
                        <input className="editor-color-field__input" value={selectedImageDecoration.borderColor || '#000000'} onChange={(e) => patchSelectedDecoration({ borderColor: normalizeHex(e.target.value, '#000000') })} />
                        <input type="color" className="editor-color-field__native" value={normalizeHex(selectedImageDecoration.borderColor || '#000000', '#000000')} onChange={(e) => patchSelectedDecoration({ borderColor: e.target.value })} />
                      </label>
                    </div>

                    <div className="editor-context-panel__section">
                      <div className="editor-context-panel__label">Flip</div>
                      <div className="editor-icon-toggle-row editor-icon-toggle-row--2">
                        <button className={selectedImageDecoration.flipX ? 'is-active' : ''} onClick={() => patchSelectedDecoration({ flipX: !selectedImageDecoration.flipX })}>↔</button>
                        <button className={selectedImageDecoration.flipY ? 'is-active' : ''} onClick={() => patchSelectedDecoration({ flipY: !selectedImageDecoration.flipY })}>↕</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              <>
              {tool === 'project' && (
                <>
                  <div className="editor-project-panel">
                    <div className="editor-project-panel__hero">
                      <div>
                        <div className="editor-project-panel__eyebrow">Global presets</div>
                        <div className="editor-project-panel__title">Project system</div>
                      </div>
                      <div className="editor-project-panel__meta">
                        {variantsDraft.length} localization{variantsDraft.length > 1 ? 's' : ''} · {variantsDraft.reduce((total, variant) => total + (variant.screensData?.length || 0), 0)} screens
                      </div>
                    </div>

                    <div className="editor-project-panel__section">
                      <PanelHeading>Direction</PanelHeading>
                      <select className="input" value={projectTheme.directionId} onChange={(e) => applyProjectDirection(e.target.value)}>
                        <option value="">Custom system</option>
                        {window.DATA.STYLE_DIRECTIONS.map((direction) => (
                          <option key={direction.id} value={direction.id}>{direction.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="editor-project-panel__section">
                      <PanelHeading>Typography</PanelHeading>
                      <label className="editor-project-panel__field">
                        <span>Base font</span>
                        <select className="input" value={projectTheme.fontFamily} onChange={(e) => applyProjectFont(e.target.value)}>
                          <option value="">Project default</option>
                          {window.DATA.WEB_FONT_OPTIONS.map((font) => (
                            <option key={font.id} value={font.family}>{font.name}</option>
                          ))}
                        </select>
                      </label>
                      <div className="seg editor-project-text__seg" style={{ width: '100%' }}>
                        <button className={projectTextPanelTab === 'font' ? 'on' : ''} onClick={() => setProjectTextPanelTab('font')} style={{ flex: 1 }}>Font</button>
                        <button className={projectTextPanelTab === 'color' ? 'on' : ''} onClick={() => setProjectTextPanelTab('color')} style={{ flex: 1 }}>Color</button>
                      </div>
                      <div className="editor-project-role-row">
                        {PROJECT_TEXT_ROLES.map((role) => (
                          <button
                            key={role.id}
                            className={`editor-project-role-pill${selectedProjectRole.id === role.id ? ' is-active' : ''}`}
                            onClick={() => setSelectedProjectTextRole(role.id)}
                          >
                            {role.label}
                          </button>
                        ))}
                      </div>

                      {projectTextPanelTab === 'font' ? (
                        <div className="editor-project-text-card">
                          <div className="editor-project-text-card__head">
                            <div>{selectedProjectRole.label}</div>
                            <div>{selectedProjectRoleSpec.fontSize}px</div>
                          </div>
                          <div className="editor-project-text-card__grid">
                            <label className="editor-project-panel__field" style={{ gridColumn: '1 / -1' }}>
                              <span>Font family</span>
                              <select className="input" value={selectedProjectRoleSpec.fontFamily} onChange={(e) => applyProjectTextRoleSpec(selectedProjectRole.id, { fontFamily: e.target.value })}>
                                <option value="">Project default</option>
                                {window.DATA.WEB_FONT_OPTIONS.map((font) => (
                                  <option key={font.id} value={font.family}>{font.name}</option>
                                ))}
                              </select>
                            </label>
                            <label className="editor-project-panel__field">
                              <span>Size</span>
                              <div className="editor-stepper">
                                <button onClick={() => applyProjectTextRoleSpec(selectedProjectRole.id, { fontSize: selectedProjectRoleSpec.fontSize - 1 })}>-</button>
                                <input type="number" value={selectedProjectRoleSpec.fontSize} onChange={(e) => applyProjectTextRoleSpec(selectedProjectRole.id, { fontSize: e.target.value })} />
                                <button onClick={() => applyProjectTextRoleSpec(selectedProjectRole.id, { fontSize: selectedProjectRoleSpec.fontSize + 1 })}><window.I.Plus /></button>
                              </div>
                            </label>
                            <label className="editor-project-panel__field">
                              <span>Weight</span>
                              <select className="input" value={selectedProjectRoleSpec.fontWeight} onChange={(e) => applyProjectTextRoleSpec(selectedProjectRole.id, { fontWeight: e.target.value })}>
                                {[400, 500, 600, 700, 800, 900].map((weight) => (
                                  <option key={weight} value={weight}>{weight}</option>
                                ))}
                              </select>
                            </label>
                            <label className="editor-project-panel__field" style={{ gridColumn: '1 / -1' }}>
                              <span>Line height</span>
                              <div className="editor-stepper">
                                <button onClick={() => applyProjectTextRoleSpec(selectedProjectRole.id, { lineHeight: selectedProjectRoleSpec.lineHeight - 1 })}>-</button>
                                <input type="number" value={selectedProjectRoleSpec.lineHeight} onChange={(e) => applyProjectTextRoleSpec(selectedProjectRole.id, { lineHeight: e.target.value })} />
                                <button onClick={() => applyProjectTextRoleSpec(selectedProjectRole.id, { lineHeight: selectedProjectRoleSpec.lineHeight + 1 })}><window.I.Plus /></button>
                              </div>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="editor-project-text-card">
                          <div className="editor-project-text-card__head">
                            <div>{selectedProjectRole.label}</div>
                            <div>{selectedProjectRoleSpec.color}</div>
                          </div>
                          <div className="editor-background-stack">
                            <label className="editor-color-field">
                              <span className="editor-color-field__swatch" style={{ background: selectedProjectRoleSpec.color }} />
                              <input
                                className="editor-color-field__input"
                                value={selectedProjectRoleSpec.color}
                                onChange={(e) => applyProjectTextRoleSpec(selectedProjectRole.id, { color: e.target.value })}
                              />
                              <input
                                type="color"
                                className="editor-color-field__native"
                                value={normalizeHex(selectedProjectRoleSpec.color, '#FFFFFF')}
                                onChange={(e) => applyProjectTextRoleSpec(selectedProjectRole.id, { color: e.target.value })}
                              />
                            </label>

                            <div className="editor-round-swatches">
                              {backgroundCoreSwatches.map((color) => (
                                <button
                                  key={`${selectedProjectRole.id}-${color}`}
                                  className={`editor-round-swatch${normalizeHex(selectedProjectRoleSpec.color, '#FFFFFF') === normalizeHex(color, '#FFFFFF') ? ' is-active' : ''}`}
                                  style={{ background: color }}
                                  onClick={() => applyProjectTextRoleSpec(selectedProjectRole.id, { color })}
                                />
                              ))}
                            </div>

                            <div className="editor-color-grid">
                              {projectTextColorPresets[selectedProjectRole.id].map((color, index) => (
                                <button
                                  key={`${selectedProjectRole.id}-${color}-${index}`}
                                  className={`editor-color-swatch${normalizeHex(selectedProjectRoleSpec.color, '#FFFFFF') === normalizeHex(color, '#FFFFFF') ? ' is-active' : ''}`}
                                  style={{ background: color }}
                                  onClick={() => applyProjectTextRoleSpec(selectedProjectRole.id, { color })}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="editor-project-panel__section">
                      <PanelHeading>Background</PanelHeading>
                      <div className="seg editor-background-seg" style={{ width: '100%', marginBottom: 12 }}>
                        {['solid', 'gradient'].map((mode) => (
                          <button
                            key={mode}
                            className={projectTheme.background.mode === mode ? 'on' : ''}
                            onClick={() => applyProjectBackground({ ...projectTheme.background, mode })}
                            style={{ flex: 1, textTransform: 'capitalize' }}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>

                      {projectTheme.background.mode === 'solid' ? (
                        <div className="editor-background-stack">
                          <label className="editor-color-field">
                            <span className="editor-color-field__swatch" style={{ background: projectTheme.background.base }} />
                            <input
                              className="editor-color-field__input"
                              value={projectTheme.background.base}
                              onChange={(e) => applyProjectBackground({ ...projectTheme.background, mode: 'solid', base: e.target.value })}
                            />
                            <input
                              type="color"
                              className="editor-color-field__native"
                              value={normalizeHex(projectTheme.background.base, '#D27D2D')}
                              onChange={(e) => applyProjectBackground({ ...projectTheme.background, mode: 'solid', base: e.target.value })}
                            />
                          </label>

                          <div className="editor-round-swatches">
                            {backgroundCoreSwatches.map((color) => (
                              <button
                                key={`project-solid-${color}`}
                                className={`editor-round-swatch${normalizeHex(projectTheme.background.base, '#D27D2D') === normalizeHex(color, '#D27D2D') ? ' is-active' : ''}`}
                                style={{ background: color }}
                                onClick={() => applyProjectBackground({ ...projectTheme.background, mode: 'solid', base: color })}
                              />
                            ))}
                          </div>

                          <div className="editor-color-grid">
                            {projectBackgroundSolidPresets.map((color, index) => (
                              <button
                                key={`project-solid-preset-${index}-${color}`}
                                className={`editor-color-swatch${normalizeHex(projectTheme.background.value, '#D27D2D') === normalizeHex(color, '#D27D2D') ? ' is-active' : ''}`}
                                style={{ background: color }}
                                onClick={() => applyProjectBackground({ ...projectTheme.background, mode: 'solid', base: color })}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="editor-background-stack">
                          <label className="editor-color-field">
                            <span className="editor-color-field__swatch" style={{ background: projectTheme.background.base }} />
                            <input
                              className="editor-color-field__input"
                              value={projectTheme.background.base}
                              onChange={(e) => applyProjectBackground({ ...projectTheme.background, mode: 'gradient', base: e.target.value })}
                            />
                            <input
                              type="color"
                              className="editor-color-field__native"
                              value={normalizeHex(projectTheme.background.base, '#D27D2D')}
                              onChange={(e) => applyProjectBackground({ ...projectTheme.background, mode: 'gradient', base: e.target.value })}
                            />
                          </label>

                          <div className="editor-round-swatches">
                            {backgroundCoreSwatches.map((color) => (
                              <button
                                key={`project-gradient-${color}`}
                                className={`editor-round-swatch${normalizeHex(projectTheme.background.base, '#D27D2D') === normalizeHex(color, '#D27D2D') ? ' is-active' : ''}`}
                                style={{ background: color }}
                                onClick={() => {
                                  const derivedGradient = deriveGradientPalette(color)[0] || [color, '#0A0000'];
                                  applyProjectBackground({ ...projectTheme.background, mode: 'gradient', base: derivedGradient[0], to: derivedGradient[1] });
                                }}
                              />
                            ))}
                          </div>

                          <label className="editor-color-field">
                            <span className="editor-color-field__swatch" style={{ background: projectTheme.background.to }} />
                            <input
                              className="editor-color-field__input"
                              value={projectTheme.background.to}
                              onChange={(e) => applyProjectBackground({ ...projectTheme.background, mode: 'gradient', to: e.target.value })}
                            />
                            <input
                              type="color"
                              className="editor-color-field__native"
                              value={normalizeHex(projectTheme.background.to, '#0A0000')}
                              onChange={(e) => applyProjectBackground({ ...projectTheme.background, mode: 'gradient', to: e.target.value })}
                            />
                          </label>

                          <div className="editor-angle-row">
                            <input
                              className="editor-angle-slider"
                              type="range"
                              min="0"
                              max="360"
                              step="1"
                              value={projectTheme.background.angle}
                              onChange={(e) => applyProjectBackground({ ...projectTheme.background, mode: 'gradient', angle: e.target.value })}
                            />
                            <input
                              className="input editor-angle-input"
                              type="number"
                              min="0"
                              max="360"
                              value={projectTheme.background.angle}
                              onChange={(e) => applyProjectBackground({ ...projectTheme.background, mode: 'gradient', angle: e.target.value })}
                            />
                          </div>

                          <div className="editor-color-grid">
                            {projectBackgroundGradientPresets.map(([from, to], index) => {
                              const gradientValue = `linear-gradient(${projectTheme.background.angle}deg, ${from}, ${to})`;
                              return (
                                <button
                                  key={`project-gradient-preset-${index}-${from}-${to}`}
                                  className={`editor-color-swatch${projectTheme.background.value === gradientValue ? ' is-active' : ''}`}
                                  style={{ background: gradientValue }}
                                  onClick={() => applyProjectBackground({ ...projectTheme.background, mode: 'gradient', base: from, to })}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="editor-project-panel__section">
                      <PanelHeading>System</PanelHeading>
                      <div className="editor-project-panel__grid">
                        <label className="editor-project-panel__field">
                          <span>Text</span>
                          <select className="input" value={projectTheme.textStyle} onChange={(e) => applyProjectStyleField('textStyle', e.target.value)}>
                            {window.DATA.TEXT_STYLE_OPTIONS.map((option) => (
                              <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                          </select>
                        </label>
                        <label className="editor-project-panel__field">
                          <span>Ambient</span>
                          <select className="input" value={projectTheme.ambientStyle} onChange={(e) => applyProjectStyleField('ambientStyle', e.target.value)}>
                            {window.DATA.AMBIENT_STYLE_OPTIONS.map((option) => (
                              <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                          </select>
                        </label>
                        <label className="editor-project-panel__field">
                          <span>CTA</span>
                          <select className="input" value={projectTheme.ctaStyle} onChange={(e) => applyProjectStyleField('ctaStyle', e.target.value)}>
                            {window.DATA.CTA_STYLE_OPTIONS.map((option) => (
                              <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                          </select>
                        </label>
                        <label className="editor-project-panel__field">
                          <span>Chrome</span>
                          <select className="input" value={projectTheme.chromeStyle} onChange={(e) => applyProjectStyleField('chromeStyle', e.target.value)}>
                            {window.DATA.CHROME_STYLE_OPTIONS.map((option) => (
                              <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                          </select>
                        </label>
                        <label className="editor-project-panel__field" style={{ gridColumn: '1 / -1' }}>
                          <span>Device frame</span>
                          <select className="input" value={projectTheme.frameStyle} onChange={(e) => applyProjectStyleField('frameStyle', e.target.value)}>
                            {[
                              ['ios-classic', 'iPhone Classic'],
                              ['ios-3d-right', 'iPhone 3D Right'],
                              ['ios-3d-left', 'iPhone 3D Left'],
                              ['android-flat', 'Android Flat'],
                            ].map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {tool === 'templates' && (
                <>
                  <PanelHeading>Template gallery</PanelHeading>
                  <div className="editor-template-gallery">
                    {window.DATA.STYLE_DIRECTIONS.map((direction) => (
                      <button key={direction.id} className="editor-template-card" onClick={() => openTemplateConfirm({ kind: 'direction', id: direction.id, label: direction.name, sublabel: direction.tag })}>
                        <TemplateGalleryCard app={app} direction={direction} current={current} variant={activeVariant} />
                        <div style={{ padding: '12px 12px 2px' }}>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{direction.name}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 3 }}>{direction.tag}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <PanelHeading>Layout presets</PanelHeading>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {window.DATA.SCREEN_LAYOUT_PRESETS.filter((preset) => preset.kind === current.kind).map((preset) => (
                      <button key={preset.id} className="editor-list-row" onClick={() => openTemplateConfirm({ kind: 'preset', id: preset.id, label: preset.name, sublabel: preset.tag })}>
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 600 }}>{preset.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{preset.tag}</div>
                        </div>
                        <span className="chip">{preset.kind}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {tool === 'elements' && (
                <>
                  <div className="seg" style={{ width: '100%', marginBottom: 14 }}>
                    {[
                      ['devices', 'Devices'],
                      ['images', 'Images'],
                      ['elements', 'Elements'],
                    ].map(([id, label]) => (
                      <button key={id} className={elementsLibraryTab === id ? 'on' : ''} onClick={() => setElementsLibraryTab(id)} style={{ flex: 1 }}>
                        {label}
                      </button>
                    ))}
                  </div>

                  <ElementLibraryBrowser
                    tab={elementsLibraryTab}
                    category={elementsLibraryCategory[elementsLibraryTab]}
                    onSelectCategory={(category) => setElementsLibraryCategory((currentValue) => ({ ...currentValue, [elementsLibraryTab]: category }))}
                    onBack={() => setElementsLibraryCategory((currentValue) => ({ ...currentValue, [elementsLibraryTab]: null }))}
                    onApplyItem={(itemLabel) => {
                      if (elementsLibraryTab === 'devices') {
                        const deviceMap = {
                          'iPhone 17': 'ios-classic',
                          '3D iPhone 17': 'ios-3d-right',
                          'Handheld iPhone 17': 'ios-3d-left',
                          'Floating iPhone 17': 'ios-classic',
                          'Tilted iPhone 17': 'ios-3d-right',
                          'Android Phone': 'android-flat',
                          'Tablet Frame': 'android-flat',
                          'Watch Companion': 'ios-classic',
                        };
                        onPatchCurrentSafe({ frameStyle: deviceMap[itemLabel] || 'ios-classic' });
                        return;
                      }
                      if (elementsLibraryTab === 'images') {
                        const imageDecoration = { ...window.SHIPSHOT.createDecoration('image'), text: itemLabel };
                        patchCurrent({
                          decorations: [...(current.decorations || []), imageDecoration],
                        });
                        setSelectedElement(`deco:${imageDecoration.id}`);
                        return;
                      }
                      if (elementsLibraryTab === 'elements') {
                        const decorMap = {
                          Shapes: 'badge',
                          Arrows: 'ribbon',
                          Icons: 'badge',
                          Decor: 'burst',
                          Ratings: 'stars',
                          Badges: 'badge',
                          Stickers: 'burst',
                          Patterns: 'ribbon',
                        };
                        addDecoration(decorMap[elementsLibraryCategory[elementsLibraryTab]] || 'badge');
                      }
                    }}
                  />

                  {selectedDecoration ? (
                    <>
                      <PanelHeading>Selected element</PanelHeading>
                      <input className="input" value={selectedDecoration.text} onChange={(e) => onPatchSelectedDecoration({ text: e.target.value })} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                        <input className="input" type="number" value={Math.round(selectedDecoration.w || 0)} onChange={(e) => onPatchSelectedDecoration({ w: Number(e.target.value) || 0 }, true)} onBlur={() => onPatchSelectedDecoration({ w: Number(selectedDecoration.w) || 0 })} />
                        <input className="input" type="number" value={Math.round(selectedDecoration.rotation || 0)} onChange={(e) => onPatchSelectedDecoration({ rotation: Number(e.target.value) || 0 }, true)} onBlur={() => onPatchSelectedDecoration({ rotation: Number(selectedDecoration.rotation) || 0 })} />
                      </div>
                      <button className="btn ghost sm" style={{ marginTop: 8 }} onClick={onRemoveSelectedDecoration}><window.I.Trash /> Remove</button>
                    </>
                  ) : null}
                </>
              )}

              {tool === 'text' && (
                <>
                  <PanelHeading>Text</PanelHeading>
                  <button className="btn" style={{ width: '100%', justifyContent: 'center', marginBottom: 18 }} onClick={addTextDecoration}>
                    <window.I.Type /> Add Text
                  </button>

                  <div style={{ paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <PanelHeading>Translate</PanelHeading>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                      <select className="input" value={textTranslateLocale} onChange={(e) => setTextTranslateLocale(e.target.value)}>
                        {window.DATA.COUNTRIES.map((locale) => (
                          <option key={locale.code} value={locale.code}>{locale.flag} {locale.language} · {locale.name}</option>
                        ))}
                      </select>
                      <button className="btn sm" onClick={translateCurrentText}><window.I.Wand /> Translate</button>
                    </div>
                  </div>

                  <div style={{ paddingTop: 18, marginTop: 18, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <PanelHeading>Custom Font</PanelHeading>
                    <input ref={customFontInputRef} type="file" accept=".ttf,.otf,.woff,.woff2" style={{ display: 'none' }} onChange={handleCustomFontUpload} />
                    <button className="btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => customFontInputRef.current?.click()}>
                      <window.I.Upload /> Upload
                    </button>
                    {customFontFileName ? (
                      <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 8 }}>{customFontFileName}</div>
                    ) : null}
                  </div>
                </>
              )}

              {tool === 'background' && (
                <>
                  <label className="editor-apply-toggle" style={{ marginBottom: 12 }}>
                    <input type="checkbox" checked={applyBackgroundToAllScreens} onChange={(e) => setApplyBackgroundToAllScreens(e.target.checked)} />
                    <span>Apply to all screens</span>
                  </label>
                  <div className="seg editor-background-seg" style={{ width: '100%', marginBottom: 12 }}>
                    {['solid', 'gradient', 'image'].map((mode) => (
                      <button key={mode} className={backgroundMode === mode ? 'on' : ''} onClick={() => setBackgroundMode(mode)} style={{ flex: 1, textTransform: 'capitalize' }}>{mode}</button>
                    ))}
                  </div>
                  {backgroundMode === 'solid' && (
                    <>
                      <div className="editor-background-stack">
                        <label className="editor-color-field">
                          <span className="editor-color-field__swatch" style={{ background: backgroundBaseColor }} />
                          <input
                            className="editor-color-field__input"
                            value={backgroundBaseColor}
                            onChange={(e) => setSolidBackground(e.target.value)}
                          />
                          <input
                            type="color"
                            className="editor-color-field__native"
                            value={normalizeHex(backgroundBaseColor)}
                            onChange={(e) => setSolidBackground(e.target.value)}
                          />
                        </label>

                        <div className="editor-round-swatches">
                          {backgroundCoreSwatches.map((value) => (
                            <button
                              key={value}
                              className={`editor-round-swatch${normalizeHex(backgroundBaseColor) === normalizeHex(value) ? ' is-active' : ''}`}
                              style={{ background: value }}
                              onClick={() => setBackgroundBaseColor(normalizeHex(value))}
                            />
                          ))}
                        </div>

                        <div className="editor-color-grid">
                          {backgroundSolidPresets.map((value, index) => (
                            <button
                              key={`${value}-${index}`}
                              className={`editor-color-swatch${normalizeHex(current?.bg || '') === normalizeHex(value) ? ' is-active' : ''}`}
                              style={{ background: value }}
                              onClick={() => setSolidBackground(value)}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  {backgroundMode === 'gradient' && (
                    <>
                      <div className="editor-background-stack">
                        <div className="editor-form-label">Color picker</div>
                        <label className="editor-color-field">
                          <span className="editor-color-field__swatch" style={{ background: backgroundBaseColor }} />
                          <input
                            className="editor-color-field__input"
                            value={backgroundBaseColor}
                            onChange={(e) => setGradientBackground(e.target.value, backgroundGradientTo, backgroundAngle)}
                          />
                          <input
                            type="color"
                            className="editor-color-field__native"
                            value={normalizeHex(backgroundBaseColor)}
                            onChange={(e) => setGradientBackground(e.target.value, backgroundGradientTo, backgroundAngle)}
                          />
                        </label>
                        <div className="editor-round-swatches">
                          {backgroundCoreSwatches.map((value) => (
                            <button
                              key={`gradient-${value}`}
                              className={`editor-round-swatch${normalizeHex(backgroundBaseColor) === normalizeHex(value) ? ' is-active' : ''}`}
                              style={{ background: value }}
                              onClick={() => setGradientBackground(value, deriveGradientPalette(value)[0][1], backgroundAngle)}
                            />
                          ))}
                        </div>
                        <label className="editor-color-field">
                          <span className="editor-color-field__swatch" style={{ background: backgroundGradientTo }} />
                          <input
                            className="editor-color-field__input"
                            value={backgroundGradientTo}
                            onChange={(e) => setGradientBackground(backgroundBaseColor, e.target.value, backgroundAngle)}
                          />
                          <input
                            type="color"
                            className="editor-color-field__native"
                            value={normalizeHex(backgroundGradientTo)}
                            onChange={(e) => setGradientBackground(backgroundBaseColor, e.target.value, backgroundAngle)}
                          />
                        </label>

                        <div className="editor-form-label">Angle</div>
                        <div className="editor-angle-row">
                          <input
                            className="editor-angle-slider"
                            type="range"
                            min="0"
                            max="360"
                            step="1"
                            value={backgroundAngle}
                            onChange={(e) => setGradientBackground(backgroundBaseColor, backgroundGradientTo, e.target.value)}
                          />
                          <input
                            className="input editor-angle-input"
                            type="number"
                            min="0"
                            max="360"
                            value={backgroundAngle}
                            onChange={(e) => setGradientBackground(backgroundBaseColor, backgroundGradientTo, e.target.value)}
                          />
                        </div>

                        <div className="editor-color-grid">
                          {backgroundGradientPresets.map(([from, to], index) => {
                            const value = `linear-gradient(${backgroundAngle}deg, ${from}, ${to})`;
                            return (
                              <button
                                key={`${from}-${to}-${index}`}
                                className="editor-color-swatch"
                                style={{ background: value }}
                                onClick={() => setGradientBackground(from, to, backgroundAngle)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                  {backgroundMode === 'image' && (
                    <>
                      <PanelHeading>Image-style presets</PanelHeading>
                      <div className="editor-preset-grid">
                        {backgroundImagePresets.map((value) => (
                          <button key={value} className="editor-preset-card" onClick={() => applyBackgroundPreset(value)}>
                            <div style={{ aspectRatio: '9 / 16', borderRadius: 10, background: value }} />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              {tool === 'uploads' && (
                <>
                  <div className="seg" style={{ width: '100%', marginBottom: 16 }}>
                    <button className={uploadAssetMode === 'project' ? 'on' : ''} onClick={() => setUploadAssetMode('project')} style={{ flex: 1 }}>Upload Assets</button>
                    <button className={uploadAssetMode === 'brand' ? 'on' : ''} onClick={() => setUploadAssetMode('brand')} style={{ flex: 1 }}>Brand Assets</button>
                  </div>
                  <div className="editor-upload-stack">
                    <div className="editor-upload-title">{uploadAssetMode === 'brand' ? 'Upload Brand Assets' : 'Upload Project Assets'}</div>
                    <input ref={mediaInputRef} type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={handlePhoneMediaUpload} />
                    <button className="btn editor-upload-btn" onClick={() => mediaInputRef.current?.click()}>
                      <window.I.Upload /> Upload
                    </button>
                    <div className="editor-upload-help">
                      {selectedIsPhone
                        ? 'Select a device to fit your screenshot inside the device'
                        : 'Select the mockup element on the canvas to place your media inside the device'}
                    </div>
                    {selectedCoreBox?.mediaSrc ? (
                      <div className="editor-upload-preview">
                        {String(selectedCoreBox.mediaType || '').startsWith('video/') ? (
                          <video src={selectedCoreBox.mediaSrc} controls muted style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                        ) : (
                          <img src={selectedCoreBox.mediaSrc} alt="" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                        )}
                      </div>
                    ) : null}
                    {selectedIsPhone && selectedCoreBox?.mediaSrc ? (
                      <>
                        <div className="seg" style={{ width: '100%' }}>
                          {['cover', 'contain'].map((fit) => (
                            <button key={fit} className={(selectedCoreBox.mediaFit || 'cover') === fit ? 'on' : ''} onClick={() => patchSelectedLayer({ mediaFit: fit })} style={{ flex: 1, textTransform: 'capitalize' }}>{fit}</button>
                          ))}
                        </div>
                        <button className="btn ghost sm" onClick={clearPhoneMedia}><window.I.Trash /> Remove media</button>
                      </>
                    ) : null}
                  </div>
                </>
              )}

              {(tool === 'templates' || tool === 'elements') ? (
                <div className="editor-inline-inspector">
                  <InspectorPanel
                    tool={tool === 'templates' ? 'style' : 'layout'}
                    app={app}
                    screen={current}
                    variant={activeVariant}
                    selected={selected}
                    screensLength={screens.length}
                    onPatch={patchCurrent}
                    onPatchTransient={patchCurrentTransient}
                    onPatchVariant={patchVariant}
                    onPatchVariantTransient={patchVariantTransient}
                    onMove={reorderScreens}
                    onApplyPreset={applyPreset}
                    onApplyStyleDirection={applyStyleDirection}
                    onAddDecoration={addDecoration}
                    onRegenerateScreen={regenerateCurrentScreen}
                    selectedDecoration={selectedDecoration}
                    onPatchSelectedDecoration={patchSelectedDecoration}
                    onRemoveSelectedDecoration={removeSelectedDecoration}
                    selectedElement={selectedElement}
                    onSelectElement={setSelectedElement}
                  />
                </div>
              ) : null}
              </>
              )}
            </>
          ) : (
            <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Select a screen to open the editor.</div>
          )}
        </div>
      </div>

      <div className="editor-main-stage">
        <div className="editor-main-toolbar">
          <div className="edit-workbench-top__group">
            <div className="variant-switcher" ref={variantMenuRef}>
              <button
                className={`variant-switcher__trigger${variantMenuOpen ? ' is-open' : ''}`}
                onClick={() => setVariantMenuOpen((currentValue) => !currentValue)}
                aria-haspopup="menu"
                aria-expanded={variantMenuOpen ? 'true' : 'false'}
                title="Switch localization"
              >
                <span className="variant-switcher__trigger-label">
                  <span className="variant-switcher__trigger-title">{activeVariantLabel}</span>
                  <span className="variant-switcher__trigger-country">{activeVariantCountryLabel}</span>
                </span>
                <window.I.ChevronD />
              </button>

              {variantMenuOpen ? (
                <div className="variant-switcher__menu" role="menu">
                  <div className="variant-switcher__menu-list">
                    {variantMenuItems.map((variant) => {
                      const isActiveVariant = variant.id === variantId;
                      return (
                        <button
                          key={variant.id}
                          className={`variant-switcher__item${isActiveVariant ? ' is-active' : ''}`}
                          onClick={() => {
                            setVariantId(variant.id);
                            setSelected(0);
                            setEditorOpen(!!variant.screensData?.[0]);
                            setVariantMenuOpen(false);
                          }}
                          role="menuitem"
                        >
                          <span className="variant-switcher__item-copy">
                            <span className="variant-switcher__item-title">
                              {variant.isPrimary ? 'Primary' : (variant.name || 'Localization')}
                            </span>
                            <span className="variant-switcher__item-meta">
                              {window.SHIPSHOT.localizationLabel(variant.country, 'full')}
                            </span>
                          </span>
                          {isActiveVariant ? <span className="chip accent">Active</span> : null}
                        </button>
                      );
                    })}
                  </div>
                  <button className="variant-switcher__add" onClick={openQuickVariantModal} role="menuitem">
                    Add +
                  </button>
                </div>
              ) : null}
            </div>
            <button className="btn ghost sm" onClick={undo} disabled={historyIndex === 0}><window.I.Undo /></button>
            <button className="btn ghost sm" onClick={redo} disabled={historyIndex >= history.length - 1}><window.I.Redo /></button>
          </div>
          <div className="edit-workbench-top__group">
            <button className="btn sm" onClick={addScreen}><window.I.Plus /> Add</button>
            <button className="btn primary" onClick={save}>Save</button>
            <button className="btn sm" onClick={() => { save(); setRoute?.({ screen: 'project', projectId: project.id, tab: 'exports' }); }}><window.I.Download /> Export</button>
          </div>
        </div>

        <div className={`edit-screen-stage is-${arrangement}`}>
          {screens.map((screen, index) => {
            const isSelected = index === selected;
            const isEditing = isSelected && editorOpen;
            return (
              <div
                key={screen.id}
                className="edit-stage-item"
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => { reorderScreens(dragIndex, index); setDragIndex(null); }}
                onDragEnd={() => setDragIndex(null)}
                onClick={() => openScreenEditor(index)}
                style={{ zIndex: isEditing ? 3 : (isSelected ? 2 : 1) }}
              >
                <div className={`edit-stage-card${isSelected ? ' is-selected' : ''}${isEditing ? ' is-editing' : ''}`}>
                  <div className="edit-stage-card__topbar">
                    <button className="editor-screen-action" onClick={(event) => { event.stopPropagation(); addScreenAfter(index); }} title="Add">
                      <window.I.Plus />
                    </button>
                    <button className="editor-screen-action" onClick={(event) => { event.stopPropagation(); setSelected(index); duplicateScreenAt(index); }} title="Duplicate">
                      <window.I.Copy />
                    </button>
                    <button className="editor-screen-action" onClick={(event) => { event.stopPropagation(); setSelected(index); setPendingRemoveScreen(index); }} title="Delete">
                      <window.I.Trash />
                    </button>
                    <button className="editor-screen-action" onClick={(event) => { event.stopPropagation(); moveScreen(index, 'left'); }} title="Move left">
                      <window.I.ChevronL />
                    </button>
                    <button className="editor-screen-action" onClick={(event) => { event.stopPropagation(); moveScreen(index, 'right'); }} title="Move right">
                      <window.I.ChevronR />
                    </button>
                  </div>
                  <div className="edit-stage-card__screen">
                    <ScreenshotCard
                      kind={screen.kind}
                      app={app}
                      template={screen.template}
                      width={324}
                      idx={index}
                      headline={screen.headline}
                      sub={screen.sub}
                      ctaLabel={screen.ctaLabel}
                      bg={screen.bg}
                      locale={activeVariant.assetLocale}
                      layout={screen.layout}
                      decorations={screen.decorations}
                      frameStyle={screen.frameStyle}
                      textStyle={screen.textStyle}
                      ambientStyle={screen.ambientStyle}
                      ctaStyle={screen.ctaStyle}
                      chromeStyle={screen.chromeStyle}
                      fontFamily={screen.fontFamily}
                      watermark={String(screen.frameStyle || '').includes('3d') ? 'Pro preview' : ''}
                      editable={isEditing}
                      activeElement={isEditing ? selectedElement : null}
                      onSelectElement={isEditing ? setSelectedElement : null}
                      onLayoutChange={isEditing ? ((layout) => patchCurrentTransient({ layout })) : null}
                      onDecorationsChange={isEditing ? ((decorations) => patchCurrentTransient({ decorations })) : null}
                      onDragCommit={isEditing ? commitTransient : null}
                      onDuplicateElement={isEditing ? duplicateSelectedLayer : null}
                      onDeleteElement={isEditing ? deleteSelectedLayer : null}
                      onMoveLayer={isEditing ? moveSelectedLayer : null}
                      onRotateElement={isEditing ? rotateSelectedLayer : null}
                      onTextChange={isEditing ? onPatchCurrentSafe : null}
                      selected={isSelected}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="editor-arrange-toggle">
          <button className="btn sm" onClick={() => setArrangement(arrangement === 'horizontal' ? 'vertical' : 'horizontal')}>
            {arrangement === 'horizontal' ? 'Arrange vertically' : 'Arrange horizontally'}
          </button>
        </div>
      </div>

      {templateModal ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1600, background: 'rgba(3,4,6,0.52)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setTemplateModal(null)}>
          <div className="card" style={{ width: 420, padding: 20 }} onClick={(event) => event.stopPropagation()}>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>Replace current screen template?</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 10 }}>
              <strong>{templateModal.label}</strong>
              <br />
              {templateModal.sublabel}
              <br />
              {templateModal.kind === 'direction'
                ? `This will replace the template/style direction across all ${activeVariant?.screensData?.length || 0} screens in the active localization.`
                : `This will replace the current screen on screen 0${selected + 1}.`}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
              <button className="btn sm" onClick={() => setTemplateModal(null)}>Cancel</button>
              <button className="btn primary sm" onClick={confirmTemplateReplace}>Replace</button>
            </div>
          </div>
        </div>
      ) : null}

      {quickVariantModal ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1600, background: 'rgba(3,4,6,0.52)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setQuickVariantModal(null)}>
          <div className="card" style={{ width: 440, padding: 20, background: 'var(--bg-1)', borderColor: 'var(--border-2)' }} onClick={(event) => event.stopPropagation()}>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>Add localization</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 10 }}>
              Choose how this localization should start, then set the target locale and audience. If you are mostly changing language, duplicating is the fastest path.
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 8 }}>Start from</div>
              <div className="seg" style={{ width: '100%' }}>
                <button className={quickVariantModal.mode === 'duplicate' ? 'on' : ''} onClick={() => setQuickVariantModal((currentValue) => ({ ...currentValue, mode: 'duplicate' }))} style={{ flex: 1 }}>Duplicate current</button>
                <button className={quickVariantModal.mode === 'scratch' ? 'on' : ''} onClick={() => setQuickVariantModal((currentValue) => ({ ...currentValue, mode: 'scratch' }))} style={{ flex: 1 }}>From scratch</button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 10, marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>Locale</div>
                <select className="input" value={quickVariantModal.country} onChange={(e) => setQuickVariantModal((currentValue) => ({ ...currentValue, country: e.target.value }))}>
                  {window.DATA.COUNTRIES.map((country) => <option key={country.code} value={country.code}>{country.flag} {country.language} · {country.name}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>Audience</div>
                <select className="input" value={quickVariantModal.audience} onChange={(e) => setQuickVariantModal((currentValue) => ({ ...currentValue, audience: e.target.value }))}>
                  {QUICK_VARIANT_AUDIENCES.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border-1)', fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
              {quickVariantModal.mode === 'duplicate'
                ? `This will duplicate ${activeVariant?.name || 'the current localization'}, then adapt copy and locale for ${window.SHIPSHOT.localizationLabel(quickVariantModal.country, 'full')}.`
                : `This will create a fresh ${activeVariant?.screensData?.length || project.screens || 6}-screen pack for ${window.SHIPSHOT.localizationLabel(quickVariantModal.country, 'full')} using the current template family.`}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
              <button className="btn sm" onClick={() => setQuickVariantModal(null)}>Cancel</button>
              <window.CreditButton actions={[{ key: 'ADD_LANGUAGE_VARIANT' }]} className="btn primary sm" icon={<window.I.Plus />} label="Create localization" onClick={createQuickVariant} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function InspectorPanel({ tool, app, screen, variant, selected, screensLength, onPatch, onPatchTransient, onPatchVariant, onMove, onApplyPreset, onApplyStyleDirection, onAddDecoration, onRegenerateScreen, selectedDecoration, onPatchSelectedDecoration, onRemoveSelectedDecoration, selectedElement, onSelectElement }) {
  const presets = window.DATA.SCREEN_LAYOUT_PRESETS.filter((preset) => preset.kind === screen.kind || tool === 'layout');
  const activeBox = screen.layout?.[selectedElement];

  const nudgeElement = (axis, amount) => {
    if (!selectedElement || !activeBox) return;
    const maxX = 100 - (activeBox.w || 0);
    const maxY = selectedElement === 'phone'
      ? 100 - (((activeBox.w || 0) * 2.06) / 2.16)
      : 94;
    onPatch({
      layout: {
        ...screen.layout,
        [selectedElement]: {
          ...activeBox,
          [axis]: Math.max(0, Math.min(axis === 'x' ? maxX : maxY, (activeBox[axis] || 0) + amount)),
        },
      },
    });
  };

  return (
    <div style={{ padding: 18 }}>
      <PanelHeading>Localization</PanelHeading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Name</div>
          <input className="input" value={variant.name} onChange={(e) => onPatchVariant({ name: e.target.value })} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Locale</div>
          <select className="input" value={variant.country} onChange={(e) => onPatchVariant({ country: e.target.value, locale: window.SHIPSHOT.localeForCountry(e.target.value), assetLocale: window.SHIPSHOT.pickAssetLocale(app, e.target.value) })}>
            {window.DATA.COUNTRIES.map((country) => <option key={country.code} value={country.code}>{country.flag} {country.language} · {country.name}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Audience</div>
        <input className="input" value={variant.audience} onChange={(e) => onPatchVariant({ audience: e.target.value })} />
      </div>
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Asset locale</div>
        <div className="input" style={{ display: 'flex', alignItems: 'center' }}>{variant.assetLocale || 'en-US'}</div>
      </div>

      {tool === 'text' && <>
        <PanelHeading>Headline</PanelHeading>
        <textarea className="input" style={{ height: 84, padding: 10, resize: 'none' }} value={screen.headline} onChange={(e) => onPatch({ headline: e.target.value })} />
        <PanelHeading>Subheadline</PanelHeading>
        <textarea className="input" style={{ height: 72, padding: 10, resize: 'none' }} value={screen.sub} onChange={(e) => onPatch({ sub: e.target.value })} />
        {screen.kind === 'cta' && <>
          <PanelHeading>CTA label</PanelHeading>
          <input className="input" value={screen.ctaLabel || ''} onChange={(e) => onPatch({ ctaLabel: e.target.value })} />
        </>}
        <PanelHeading>Screen type</PanelHeading>
        <div className="seg" style={{ width: '100%', flexWrap: 'wrap' }}>
          {['headline', 'feature', 'lifestyle', 'stat', 'cta'].map((kind) => (
            <button key={kind} className={screen.kind === kind ? 'on' : ''} onClick={() => onPatch({ kind, presetId: null, layout: window.SHIPSHOT.normalizeLayout(kind, screen.layout) })} style={{ flex: 1, textTransform: 'capitalize' }}>{kind}</button>
          ))}
        </div>
        <div style={{ marginTop: 10 }}>
          <window.CreditButton actions={[{ key: 'REGENERATE_SINGLE_SCREEN' }]} className="btn sm" icon={<window.I.Wand />} label="Regenerate this screen" onClick={onRegenerateScreen} style={{ width: '100%', justifyContent: 'center' }} />
        </div>
      </>}

      {tool === 'style' && <>
        <PanelHeading>Art direction</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginBottom: 14 }}>
          {window.DATA.STYLE_DIRECTIONS.map((direction) => (
            <button key={direction.id} onClick={() => onApplyStyleDirection(direction.id)} style={{ padding: 10, borderRadius: 10, background: screen.template === direction.templateId && screen.textStyle === direction.textStyle && screen.ambientStyle === direction.ambientStyle && screen.ctaStyle === direction.ctaStyle && screen.chromeStyle === direction.chromeStyle ? 'rgba(255,255,255,0.04)' : 'transparent', border: `1px solid ${screen.template === direction.templateId && screen.textStyle === direction.textStyle && screen.ambientStyle === direction.ambientStyle && screen.ctaStyle === direction.ctaStyle && screen.chromeStyle === direction.chromeStyle ? 'var(--accent-ring)' : 'var(--border-2)'}`, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{direction.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{direction.tag}</div>
                </div>
                <span className="chip">{direction.frameStyle.includes('3d') ? '3D' : '2D'}</span>
              </div>
            </button>
          ))}
        </div>
        <PanelHeading>Ready templates</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginBottom: 14 }}>
          {presets.map((preset) => (
            <button key={preset.id} onClick={() => onApplyPreset(preset.id)} style={{ padding: 10, borderRadius: 10, background: screen.presetId === preset.id ? 'rgba(255,255,255,0.04)' : 'transparent', border: `1px solid ${screen.presetId === preset.id ? 'var(--accent-ring)' : 'var(--border-2)'}`, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{preset.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{preset.tag}</div>
                </div>
                <span className="chip">{preset.kind}</span>
              </div>
            </button>
          ))}
        </div>
        <PanelHeading>Template</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {window.DATA.TEMPLATES.map((template) => (
            <button key={template.id} onClick={() => onPatch({ template: template.id })} style={{ padding: 8, borderRadius: 10, background: screen.template === template.id ? 'rgba(255,255,255,0.04)' : 'transparent', border: `1px solid ${screen.template === template.id ? 'var(--accent-ring)' : 'var(--border-2)'}`, textAlign: 'left' }}>
              <div style={{ aspectRatio: '4/3', background: template.bg, borderRadius: 8, marginBottom: 8 }} />
              <div style={{ fontSize: 12, fontWeight: 500 }}>{template.name}</div>
            </button>
          ))}
        </div>
        <PanelHeading>Background override</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            ['', 'Template'],
            ['linear-gradient(160deg, #0f1013, #20252c)', 'Ink'],
            ['linear-gradient(160deg, #f0ebe3, #d4cab6)', 'Sand'],
            ['linear-gradient(160deg, #201a2d, #51446f)', 'Night'],
            ['linear-gradient(160deg, #12313a, #2a6d75)', 'Ocean'],
            ['linear-gradient(160deg, #3d1e14, #a25c3c)', 'Clay'],
          ].map(([value, label]) => (
            <button key={label} onClick={() => onPatch({ bg: value })} style={{ padding: 6, borderRadius: 10, background: screen.bg === value ? 'rgba(255,255,255,0.04)' : 'transparent', border: `1px solid ${screen.bg === value ? 'var(--accent-ring)' : 'var(--border-2)'}` }}>
              <div style={{ aspectRatio: '4/3', borderRadius: 8, background: value || (window.DATA.TEMPLATES.find((template) => template.id === screen.template)?.bg || 'var(--bg-2)') }} />
              <div style={{ fontSize: 11, marginTop: 6 }}>{label}</div>
            </button>
          ))}
        </div>
        <PanelHeading>Text alignment</PanelHeading>
        <div className="seg" style={{ width: '100%' }}>
          {['left', 'center', 'right'].map((align) => (
            <button key={align} className={screen.layout?.headline?.align === align ? 'on' : ''} onClick={() => onPatch({ layout: { ...screen.layout, headline: { ...screen.layout.headline, align }, sub: { ...screen.layout.sub, align } } })} style={{ flex: 1, textTransform: 'capitalize' }}>{align}</button>
          ))}
        </div>
        <PanelHeading>Headline treatment</PanelHeading>
        <div className="seg" style={{ width: '100%', flexWrap: 'wrap' }}>
          {window.DATA.TEXT_STYLE_OPTIONS.map((option) => (
            <button key={option.id} className={screen.textStyle === option.id ? 'on' : ''} onClick={() => onPatch({ textStyle: option.id })} style={{ flex: 1, minWidth: 96 }}>{option.name}</button>
          ))}
        </div>
        <PanelHeading>Ambient</PanelHeading>
        <div className="seg" style={{ width: '100%', flexWrap: 'wrap' }}>
          {window.DATA.AMBIENT_STYLE_OPTIONS.map((option) => (
            <button key={option.id} className={screen.ambientStyle === option.id ? 'on' : ''} onClick={() => onPatch({ ambientStyle: option.id })} style={{ flex: 1, minWidth: 90 }}>{option.name}</button>
          ))}
        </div>
        <PanelHeading>CTA treatment</PanelHeading>
        <div className="seg" style={{ width: '100%', flexWrap: 'wrap' }}>
          {window.DATA.CTA_STYLE_OPTIONS.map((option) => (
            <button key={option.id} className={screen.ctaStyle === option.id ? 'on' : ''} onClick={() => onPatch({ ctaStyle: option.id })} style={{ flex: 1, minWidth: 90 }}>{option.name}</button>
          ))}
        </div>
        <PanelHeading>Top chrome</PanelHeading>
        <div className="seg" style={{ width: '100%', flexWrap: 'wrap' }}>
          {window.DATA.CHROME_STYLE_OPTIONS.map((option) => (
            <button key={option.id} className={screen.chromeStyle === option.id ? 'on' : ''} onClick={() => onPatch({ chromeStyle: option.id })} style={{ flex: 1, minWidth: 90 }}>{option.name}</button>
          ))}
        </div>
        <PanelHeading>Device frame</PanelHeading>
        <div className="seg" style={{ width: '100%', flexWrap: 'wrap' }}>
          {[
            ['ios-classic', 'iOS'],
            ['android-flat', 'Android'],
            ['ios-3d-left', '3D left'],
            ['ios-3d-right', '3D right'],
          ].map(([value, label]) => (
            <button key={value} className={screen.frameStyle === value ? 'on' : ''} onClick={() => onPatch({ frameStyle: value })} style={{ flex: 1, minWidth: 90 }}>
              {label}
            </button>
          ))}
        </div>
      </>}

      {tool === 'layout' && <>
        <PanelHeading>Ready templates</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
          {window.DATA.SCREEN_LAYOUT_PRESETS.map((preset) => (
            <button key={preset.id} onClick={() => onApplyPreset(preset.id)} style={{ padding: 10, borderRadius: 10, background: screen.presetId === preset.id ? 'rgba(255,255,255,0.04)' : 'transparent', border: `1px solid ${screen.presetId === preset.id ? 'var(--accent-ring)' : 'var(--border-2)'}`, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{preset.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{preset.tag}</div>
                </div>
                <span className="chip">{preset.kind}</span>
              </div>
            </button>
          ))}
        </div>
        <PanelHeading>Order</PanelHeading>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn sm" onClick={() => onMove(selected, Math.max(0, selected - 1))} disabled={selected === 0}><window.I.ChevronL /> Move left</button>
          <button className="btn sm" onClick={() => onMove(selected, Math.min(screensLength - 1, selected + 1))} disabled={selected === screensLength - 1}>Move right <window.I.ChevronR /></button>
        </div>
        <PanelHeading>Elements</PanelHeading>
        <div className="seg" style={{ width: '100%', flexWrap: 'wrap' }}>
          {['headline', 'sub', 'phone', 'cta'].concat((screen.decorations || []).map((item) => `deco:${item.id}`)).map((element) => (
            <button key={element} className={selectedElement === element ? 'on' : ''} onClick={() => onSelectElement(element)} style={{ flex: 1, textTransform: 'capitalize' }}>{element}</button>
          ))}
        </div>
        {activeBox ? <>
          <PanelHeading>Position</PanelHeading>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>X</div>
              <input className="input" type="number" value={Math.round(activeBox.x || 0)} onChange={(e) => onPatchTransient({
                layout: {
                  ...screen.layout,
                  [selectedElement]: { ...activeBox, x: Number(e.target.value) || 0 },
                },
              })} onBlur={() => onPatch({
                layout: {
                  ...screen.layout,
                  [selectedElement]: { ...screen.layout[selectedElement], x: Number(activeBox.x) || 0 },
                },
              })} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Y</div>
              <input className="input" type="number" value={Math.round(activeBox.y || 0)} onChange={(e) => onPatchTransient({
                layout: {
                  ...screen.layout,
                  [selectedElement]: { ...activeBox, y: Number(e.target.value) || 0 },
                },
              })} onBlur={() => onPatch({
                layout: {
                  ...screen.layout,
                  [selectedElement]: { ...screen.layout[selectedElement], y: Number(activeBox.y) || 0 },
                },
              })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 10 }}>
            <button className="btn sm" onClick={() => nudgeElement('y', -1)}>Up</button>
            <button className="btn sm" onClick={() => nudgeElement('x', -1)}>Left</button>
            <button className="btn sm" onClick={() => nudgeElement('x', 1)}>Right</button>
            <button className="btn sm" onClick={() => nudgeElement('y', 1)}>Down</button>
          </div>
        </> : null}
        <PanelHeading>Filmstrip</PanelHeading>
        <div style={{ fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.6 }}>
          Drag a screen thumbnail in the left rail to reorder it directly. On the canvas, drag text, device, CTA, or decorative chips.
        </div>
        <PanelHeading>Add elements</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {window.DATA.DECORATIVE_ELEMENTS.map((item) => (
            <button key={item.id} onClick={() => onAddDecoration(item.id)} className="editor-list-row" style={{ padding: 10, borderRadius: 12, display: 'block' }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{item.tag}</div>
            </button>
          ))}
        </div>
        {selectedDecoration ? <>
          <PanelHeading>Selected decoration</PanelHeading>
          <input className="input" value={selectedDecoration.text} onChange={(e) => onPatchSelectedDecoration({ text: e.target.value })} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Width</div>
              <input className="input" type="number" value={Math.round(selectedDecoration.w || 0)} onChange={(e) => onPatchSelectedDecoration({ w: Number(e.target.value) || 0 }, true)} onBlur={() => onPatchSelectedDecoration({ w: Number(selectedDecoration.w) || 0 })} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Rotation</div>
              <input className="input" type="number" value={Math.round(selectedDecoration.rotation || 0)} onChange={(e) => onPatchSelectedDecoration({ rotation: Number(e.target.value) || 0 }, true)} onBlur={() => onPatchSelectedDecoration({ rotation: Number(selectedDecoration.rotation) || 0 })} />
            </div>
          </div>
          <div className="seg" style={{ width: '100%', marginTop: 8 }}>
            {['light', 'dark', 'accent'].map((style) => (
              <button key={style} className={selectedDecoration.style === style ? 'on' : ''} onClick={() => onPatchSelectedDecoration({ style })} style={{ flex: 1, textTransform: 'capitalize' }}>{style}</button>
            ))}
          </div>
          <button className="btn ghost sm" style={{ marginTop: 8 }} onClick={onRemoveSelectedDecoration}><window.I.Trash /> Remove element</button>
        </> : null}
      </>}
    </div>
  );
}

function VariantsTab({ project, app, onSaveProject }) {
  const [country, setCountry] = React.useState('de-DE');
  const [audience, setAudience] = React.useState('Localized audience');
  const [pendingRemoveVariant, setPendingRemoveVariant] = React.useState(null);

  const setActive = (variantId) => {
    const variant = project.variantsData.find((item) => item.id === variantId);
    onSaveProject(project.id, {
      activeVariantId: variantId,
      screensData: variant.screensData,
      screens: variant.screensData.length,
      thumb: variant.screensData.map((screen) => screen.kind),
      country: variant.country,
      audience: variant.audience,
      styleId: variant.templateId,
    }, 'Active localization changed');
  };

  const addVariant = () => {
    const spend = window.__shipshotCreditsUI?.trySpend([{ key: 'ADD_LANGUAGE_VARIANT' }], {
      actionLabel: `Add localization ${window.SHIPSHOT.localizationLabel(country, 'compact')}`,
      successLabel: 'Localization created',
    });
    if (spend && !spend.success) return;
    const source = project.variantsData.find((item) => item.id === project.activeVariantId) || project.variantsData[0];
    const locale = window.SHIPSHOT.localeForCountry(country);
    const nextVariant = {
      ...source,
      id: `variant-${Date.now().toString(36)}`,
      name: window.SHIPSHOT.localizationOptionByCode(country).language,
      country,
      locale,
      audience,
      assetLocale: window.SHIPSHOT.pickAssetLocale(app, country),
      isPrimary: false,
      screensData: window.SHIPSHOT.localizeScreensForVariant(source.screensData, app, country),
    };
    onSaveProject(project.id, {
      variantsData: [...project.variantsData, nextVariant],
    }, 'Localization created');
  };

  const addGlobalSet = () => {
    const source = project.variantsData.find((item) => item.id === project.activeVariantId) || project.variantsData[0];
    const existing = new Set(project.variantsData.map((variant) => window.SHIPSHOT.localeForCountry(variant.country)));
    const markets = ['en-US', 'de-DE', 'fr-FR', 'ja', 'pt-BR'];
    const qty = markets.filter((market) => !existing.has(market)).length;
    if (qty > 0) {
      const spend = window.__shipshotCreditsUI?.trySpend([{ key: 'ADD_LANGUAGE_VARIANT', qty }], {
        actionLabel: 'Add top 5 locales',
        successLabel: 'Localization pack created',
      });
      if (spend && !spend.success) return;
    }
    const nextVariants = [...project.variantsData];
    markets.forEach((market) => {
      if (existing.has(market)) return;
      nextVariants.push({
        ...source,
        id: `variant-${market}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
        name: window.SHIPSHOT.localizationOptionByCode(market).language,
        country: market,
        locale: window.SHIPSHOT.localeForCountry(market),
        audience: market === 'en-US' ? 'Primary audience' : 'Localized audience',
        assetLocale: window.SHIPSHOT.pickAssetLocale(app, market),
        isPrimary: false,
        screensData: window.SHIPSHOT.localizeScreensForVariant(source.screensData, app, market),
      });
    });
    onSaveProject(project.id, { variantsData: nextVariants }, 'Global localization pack created');
  };

  const removeVariant = (variantId) => {
    const next = project.variantsData.filter((variant) => variant.id !== variantId);
    if (!next.length) return;
    const active = next.find((variant) => variant.id === project.activeVariantId) || next[0];
    onSaveProject(project.id, {
      variantsData: next,
      activeVariantId: active.id,
      screensData: active.screensData,
      screens: active.screensData.length,
      thumb: active.screensData.map((screen) => screen.kind),
      country: active.country,
      audience: active.audience,
      styleId: active.templateId,
    }, 'Variant removed');
  };

  return (
    <div style={{ padding: '24px 28px 60px', maxWidth: 1280, margin: '0 auto' }}>
      <ProjectConfirmModal
        open={Boolean(pendingRemoveVariant)}
        title="Delete Localization"
        body={pendingRemoveVariant ? `Delete "${pendingRemoveVariant.name}"? Its localized screens and settings will be removed from this project.` : ''}
        confirmLabel="Delete"
        onCancel={() => setPendingRemoveVariant(null)}
        onConfirm={() => {
          if (pendingRemoveVariant) removeVariant(pendingRemoveVariant.id);
          setPendingRemoveVariant(null);
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 18, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>Localizations</h2>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>Duplicate a localization for a target locale or audience, then edit it independently.</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select className="input" value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: 220 }}>
            {window.DATA.COUNTRIES.map((item) => <option key={item.code} value={item.code}>{item.flag} {item.language} · {item.name}</option>)}
          </select>
          <input className="input" value={audience} onChange={(e) => setAudience(e.target.value)} style={{ width: 220 }} />
          <window.CreditButton actions={[{ key: 'ADD_LANGUAGE_VARIANT', qty: ['en-US', 'de-DE', 'fr-FR', 'ja', 'pt-BR'].filter((market) => !project.variantsData.some((variant) => window.SHIPSHOT.localeForCountry(variant.country) === market)).length || 1 }]} className="btn sm" icon={<window.I.Users />} label="Top 5 locales" onClick={addGlobalSet} />
          <window.CreditButton actions={[{ key: 'ADD_LANGUAGE_VARIANT' }]} icon={<window.I.Globe />} label="Add localization" onClick={addVariant} />
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {project.variantsData.map((variant, index) => (
          <div key={variant.id} className="editor-list-row" style={{ gap: 14, alignItems: 'center', borderColor: project.activeVariantId === variant.id ? 'var(--border-2)' : 'var(--border-1)', background: project.activeVariantId === variant.id ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {variant.screensData.slice(0, 3).map((screen, screenIndex) => (
                <div key={screen.id} style={{ transform: `translateX(${screenIndex * -6}px)` }}>
                  <ScreenshotCard kind={screen.kind} app={app} template={screen.template || variant.templateId} width={40} idx={screenIndex} headline={screen.headline} sub={screen.sub} ctaLabel={screen.ctaLabel} bg={screen.bg} locale={variant.assetLocale} layout={screen.layout} decorations={screen.decorations} frameStyle={screen.frameStyle} textStyle={screen.textStyle} ambientStyle={screen.ambientStyle} ctaStyle={screen.ctaStyle} chromeStyle={screen.chromeStyle} fontFamily={screen.fontFamily} watermark={String(screen.frameStyle || '').includes('3d') ? 'Pro preview' : ''} />
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 500 }}>
                <span>{variant.name}</span>
                {variant.isPrimary ? <span className="chip">Primary</span> : null}
                {project.activeVariantId === variant.id ? <span className="chip accent">Active</span> : null}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{window.SHIPSHOT.localizationLabel(variant.country, 'full')} · {variant.audience} · {variant.screensData.length} screens · assets {variant.assetLocale || 'en-US'}</div>
            </div>
            <button className="btn sm" onClick={() => setActive(variant.id)}>Use</button>
            {!variant.isPrimary ? <button className="btn ghost sm" onClick={() => setPendingRemoveVariant(variant)}><window.I.Trash /> Remove</button> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

const EXPORT_CHANNEL_OPTIONS = [
  { id: 'app-store-connect', label: 'App Store' },
  { id: 'google-play', label: 'Google Play' },
  { id: 'custom', label: 'Custom' },
];

const EXPORT_FORMAT_OPTIONS = [
  { id: 'png', label: 'PNG' },
  { id: 'jpg', label: 'JPG' },
];

const APPLE_EXPORT_SPECS = [
  { id: 'apple-iphone-69', provider: 'app-store-connect', family: 'iphone', label: 'iPhone 6.9"', width: 1290, height: 2796, accepted: '1290×2796 portrait', requirement: 'Primary required iPhone upload set', ascDisplayTarget: 'APP_IPHONE_69', recommended: true },
  { id: 'apple-iphone-65', provider: 'app-store-connect', family: 'iphone', label: 'iPhone 6.5"', width: 1284, height: 2778, accepted: '1284×2778 portrait', requirement: 'Fallback if 6.9" is not supplied', ascDisplayTarget: 'APP_IPHONE_65' },
  { id: 'apple-iphone-63', provider: 'app-store-connect', family: 'iphone', label: 'iPhone 6.3"', width: 1179, height: 2556, accepted: '1179×2556 portrait', requirement: 'Optional explicit 6.3" set', ascDisplayTarget: 'APP_IPHONE_67' },
  { id: 'apple-iphone-61', provider: 'app-store-connect', family: 'iphone', label: 'iPhone 6.1"', width: 1170, height: 2532, accepted: '1170×2532 portrait', requirement: 'Optional explicit 6.1" set', ascDisplayTarget: 'APP_IPHONE_61' },
  { id: 'apple-iphone-55', provider: 'app-store-connect', family: 'iphone', label: 'iPhone 5.5"', width: 1242, height: 2208, accepted: '1242×2208 portrait', requirement: 'Legacy explicit set', ascDisplayTarget: 'APP_IPHONE_55' },
  { id: 'apple-ipad-13', provider: 'app-store-connect', family: 'ipad', label: 'iPad 13"', width: 2064, height: 2752, accepted: '2064×2752 portrait', requirement: 'Required if the app runs on iPad', ascDisplayTarget: 'APP_IPAD_PRO_13', recommended: true },
  { id: 'apple-ipad-11', provider: 'app-store-connect', family: 'ipad', label: 'iPad 11"', width: 1668, height: 2420, accepted: '1668×2420 portrait', requirement: 'Optional explicit iPad 11" set', ascDisplayTarget: 'APP_IPAD_PRO_3GEN_11' },
];

const GOOGLE_EXPORT_SPECS = [
  { id: 'google-phone', provider: 'google-play', family: 'phone', label: 'Phone portrait', width: 1080, height: 1920, accepted: '9:16 portrait', requirement: 'Recommended compliant phone slot', playImageType: 'phoneScreenshots', recommended: true },
  { id: 'google-seven-inch', provider: 'google-play', family: 'tablet', label: '7" tablet portrait', width: 1200, height: 1920, accepted: 'Within Play bounds', requirement: 'Optional 7-inch tablet slot', playImageType: 'sevenInchScreenshots' },
  { id: 'google-ten-inch', provider: 'google-play', family: 'tablet', label: '10" tablet portrait', width: 1600, height: 2560, accepted: 'Within Play bounds', requirement: 'Optional 10-inch tablet slot', playImageType: 'tenInchScreenshots' },
];

function exportSpecLabel(spec) {
  return `${spec.label} · ${spec.width}×${spec.height}`;
}

function specFilenamePart(spec) {
  return `${spec.provider}-${spec.label.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
}

function makeScreenSelectionKey(variantId, screenId) {
  return `${variantId}:${screenId}`;
}

function defaultSpecIdsForChannel(channel) {
  if (channel === 'app-store-connect') return APPLE_EXPORT_SPECS.filter((item) => item.recommended).map((item) => item.id);
  if (channel === 'google-play') return GOOGLE_EXPORT_SPECS.filter((item) => item.recommended).map((item) => item.id);
  return [];
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function ExportsTab({ project, app }) {
  const initialScreenKeys = React.useMemo(
    () => project.variantsData.flatMap((variant) => (variant.screensData || []).map((screen) => makeScreenSelectionKey(variant.id, screen.id))),
    [project.variantsData]
  );
  const [selectedIds, setSelectedIds] = React.useState(project.variantsData.map((variant) => variant.id));
  const [selectedScreenKeys, setSelectedScreenKeys] = React.useState(initialScreenKeys);
  const [channel, setChannel] = React.useState('app-store-connect');
  const [selectedSpecIds, setSelectedSpecIds] = React.useState(defaultSpecIdsForChannel('app-store-connect'));
  const [exportFormat, setExportFormat] = React.useState('png');
  const [exporting, setExporting] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const [jobMessage, setJobMessage] = React.useState('');
  const [customWidth, setCustomWidth] = React.useState(1290);
  const [customHeight, setCustomHeight] = React.useState(2796);
  const [integration, setIntegration] = React.useState(() => {
    try {
      return {
        ascAppId: '',
        bundleId: '',
        playPackageName: '',
        ...JSON.parse(localStorage.getItem('shipshot-export-integrations') || '{}'),
      };
    } catch {
      return { ascAppId: '', bundleId: '', playPackageName: '' };
    }
  });

  React.useEffect(() => {
    setSelectedIds(project.variantsData.map((variant) => variant.id));
    setSelectedScreenKeys(project.variantsData.flatMap((variant) => (variant.screensData || []).map((screen) => makeScreenSelectionKey(variant.id, screen.id))));
  }, [project.variantsData]);

  React.useEffect(() => {
    setSelectedSpecIds(defaultSpecIdsForChannel(channel));
  }, [channel]);

  const allSpecs = React.useMemo(() => {
    if (channel === 'app-store-connect') return APPLE_EXPORT_SPECS;
    if (channel === 'google-play') return GOOGLE_EXPORT_SPECS;
    const safeWidth = clamp(Math.round(Number(customWidth) || 1290), 320, 3840);
    const safeHeight = clamp(Math.round(Number(customHeight) || 2796), 320, 3840);
    return [{
      id: 'custom-size',
      provider: 'custom',
      family: 'custom',
      label: 'Custom export',
      width: safeWidth,
      height: safeHeight,
      accepted: `${safeWidth}×${safeHeight}`,
      requirement: 'Custom render slot',
    }];
  }, [channel, customWidth, customHeight]);

  const activeSpecs = React.useMemo(() => {
    if (channel === 'custom') return allSpecs;
    return allSpecs.filter((spec) => selectedSpecIds.includes(spec.id));
  }, [allSpecs, channel, selectedSpecIds]);

  const selectedVariants = React.useMemo(
    () => project.variantsData.filter((variant) => selectedIds.includes(variant.id)),
    [project.variantsData, selectedIds]
  );

  const selectedVariantPayloads = React.useMemo(() => selectedVariants.map((variant) => ({
    ...variant,
    screensData: (variant.screensData || []).filter((screen) => selectedScreenKeys.includes(makeScreenSelectionKey(variant.id, screen.id))),
  })).filter((variant) => variant.screensData.length), [selectedVariants, selectedScreenKeys]);

  const selectedScreensCount = selectedVariantPayloads.reduce((sum, variant) => sum + variant.screensData.length, 0);
  const selectedAssetCount = selectedScreensCount * activeSpecs.length;
  const exportExtension = exportFormat === 'jpg' ? 'jpg' : 'png';

  const loadJobs = React.useCallback(async () => {
    try {
      const response = await fetch('/api/jobs');
      const payload = await response.json();
      setJobs(Array.isArray(payload.jobs) ? payload.jobs.filter((job) => job.projectName === project.name) : []);
    } catch {
      setJobs([]);
    }
  }, [project.name]);

  React.useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  React.useEffect(() => {
    localStorage.setItem('shipshot-export-integrations', JSON.stringify(integration));
  }, [integration]);

  const triggerDownload = (filename, href) => {
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const toggleVariant = (variantId) => {
    setSelectedIds((current) => current.includes(variantId) ? current.filter((id) => id !== variantId) : [...current, variantId]);
  };

  const toggleScreen = (variantId, screenId) => {
    const key = makeScreenSelectionKey(variantId, screenId);
    setSelectedScreenKeys((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  };

  const toggleAllScreensForVariant = (variant) => {
    const keys = (variant.screensData || []).map((screen) => makeScreenSelectionKey(variant.id, screen.id));
    const allSelected = keys.every((key) => selectedScreenKeys.includes(key));
    setSelectedScreenKeys((current) => allSelected ? current.filter((key) => !keys.includes(key)) : [...new Set([...current, ...keys])]);
  };

  const toggleSpec = (specId) => {
    setSelectedSpecIds((current) => current.includes(specId) ? current.filter((id) => id !== specId) : [...current, specId]);
  };

  const renderDataUrl = async (variant, screen, spec) => window.exportScreenshotAsset({
    kind: screen.kind,
    template: screen.template || variant.templateId,
    app,
    screen,
    variant,
    width: spec.width,
    height: spec.height,
    format: exportFormat,
    watermark: String(screen.frameStyle || '').includes('3d') ? 'Pro preview' : '',
  });

  const buildManifest = (provider = channel) => ({
    provider,
    createdAt: new Date().toISOString(),
    projectId: project.id,
    projectName: project.name,
    appName: app.name,
    exportFormat,
    selectedSpecs: activeSpecs.map((spec) => ({
      id: spec.id,
      provider: spec.provider,
      family: spec.family,
      label: spec.label,
      width: spec.width,
      height: spec.height,
      ascDisplayTarget: spec.ascDisplayTarget || null,
      playImageType: spec.playImageType || null,
    })),
    integration: {
      ascAppId: integration.ascAppId || null,
      bundleId: integration.bundleId || null,
      playPackageName: integration.playPackageName || null,
    },
    outputs: selectedVariantPayloads.map((variant) => ({
      variantId: variant.id,
      name: variant.name,
      country: variant.country,
      locale: variant.locale,
      assetLocale: variant.assetLocale,
      screens: variant.screensData.map((screen, index) => ({
        id: screen.id,
        index: (project.variantsData.find((item) => item.id === variant.id)?.screensData || []).findIndex((item) => item.id === screen.id) + 1 || index + 1,
        kind: screen.kind,
        template: screen.template || variant.templateId,
        frameStyle: screen.frameStyle || 'ios-classic',
        caption: screen.headline || '',
        subcaption: screen.sub || '',
        outputs: activeSpecs.map((spec) => ({
          specId: spec.id,
          provider: spec.provider,
          label: spec.label,
          width: spec.width,
          height: spec.height,
          ascDisplayTarget: spec.ascDisplayTarget || null,
          playImageType: spec.playImageType || null,
          extension: exportExtension,
        })),
      })),
    })),
  });

  const buildAssetPack = async () => {
    const assets = [];
    for (const variant of selectedVariantPayloads) {
      const fullVariant = project.variantsData.find((item) => item.id === variant.id) || variant;
      for (const screen of variant.screensData) {
        const absoluteIndex = (fullVariant.screensData || []).findIndex((item) => item.id === screen.id);
        for (const spec of activeSpecs) {
          const dataUrl = await renderDataUrl(variant, screen, spec);
          const filename = `${project.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${variant.country.toLowerCase()}-screen-${String(absoluteIndex + 1).padStart(2, '0')}-${specFilenamePart(spec)}.${exportExtension}`;
          assets.push({
            id: `${variant.id}-${screen.id}-${spec.id}`,
            variant: variant.name,
            variantId: variant.id,
            screen: absoluteIndex + 1,
            screenId: screen.id,
            slot: spec.label,
            filename,
            path: `${variant.country}/${spec.provider}/${filename}`,
            format: exportFormat,
            dataUrl,
          });
        }
      }
    }
    return assets;
  };

  const exportManifest = (provider) => {
    const payload = buildManifest(provider);
    triggerDownload(`${project.name.replace(/\s+/g, '-').toLowerCase()}-${provider}-manifest.json`, URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })));
  };

  const prepareBackendPack = async () => {
    if (!selectedVariantPayloads.length || !activeSpecs.length || exporting) return null;
    setExporting(true);
    setJobMessage('Rendering selected assets on local backend…');
    try {
      const manifest = buildManifest('render-pack');
      const assets = await buildAssetPack();
      const response = await fetch('/api/render-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName: project.name, exportPreset: channel, manifest, assets }),
      });
      const job = await response.json();
      await loadJobs();
      setJobMessage(`Render pack ready: ${job.id}`);
      return { manifest, renderJob: job };
    } catch (error) {
      setJobMessage(`Render pack failed: ${error.message || 'unknown error'}`);
      return null;
    } finally {
      setExporting(false);
    }
  };

  const prepareBackendUpload = async (provider) => {
    const prepared = await prepareBackendPack();
    if (!prepared?.renderJob?.id) return;
    setJobMessage(`Preparing ${provider} upload job…`);
    try {
      const response = await fetch(provider === 'app-store-connect' ? '/api/upload/app-store-connect' : '/api/upload/google-play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          renderJobId: prepared.renderJob.id,
          manifest: { ...prepared.manifest, provider },
          integration,
        }),
      });
      const job = await response.json();
      await loadJobs();
      setJobMessage(`${provider === 'app-store-connect' ? 'App Store Connect' : 'Google Play'} job ready: ${job.id}`);
    } catch (error) {
      setJobMessage(`Upload prep failed: ${error.message || 'unknown error'}`);
    }
  };

  const exportSelectedAssets = async () => {
    if (!selectedVariantPayloads.length || !activeSpecs.length || exporting) return;
    setExporting(true);
    try {
      const assets = await buildAssetPack();
      for (const asset of assets) {
        triggerDownload(asset.filename, asset.dataUrl);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
    } finally {
      setExporting(false);
    }
  };

  const exportSingleScreen = async (variant, screen, index) => {
    if (!activeSpecs.length || exporting) return;
    setExporting(true);
    try {
      for (const spec of activeSpecs) {
        const dataUrl = await renderDataUrl(variant, screen, spec);
        const filename = `${project.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${variant.country.toLowerCase()}-screen-${String(index + 1).padStart(2, '0')}-${specFilenamePart(spec)}.${exportExtension}`;
        triggerDownload(filename, dataUrl);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
    } finally {
      setExporting(false);
    }
  };

  const exportPdf = () => {
    const popup = window.open('', '_blank', 'width=1200,height=900');
    if (!popup) return;
    const cards = selectedVariantPayloads.map((variant) => `
      <section style="page-break-after: always; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;">
        <h1 style="margin: 0 0 8px;">${project.name} · ${variant.name}</h1>
        <p style="margin: 0 0 18px; color: #555;">Locale: ${window.SHIPSHOT.localizationLabel(variant.country, 'full')} · Audience: ${variant.audience}</p>
        <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
          ${variant.screensData.map((screen, index) => `
            <div style="border:1px solid #ddd; border-radius:16px; overflow:hidden; padding:16px; background:${screen.bg || '#f7f7f7'};">
              <div style="font-size:12px; color:#666; margin-bottom:8px;">Screen 0${index + 1} · ${screen.kind}</div>
              <div style="font-size:28px; font-weight:700; line-height:1.05; margin-bottom:8px;">${escapeHtml(screen.headline || `${app.name}, clearly explained.`)}</div>
              <div style="font-size:15px; color:#444;">${escapeHtml(screen.sub || '')}</div>
            </div>
          `).join('')}
        </div>
      </section>
    `).join('');
    popup.document.write(`<!doctype html><html><head><title>${project.name} export</title></head><body style="margin:0;">${cards}</body></html>`);
    popup.document.close();
    popup.focus();
    popup.print();
  };

  return (
    <div style={{ padding: '24px 28px 60px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ display: 'grid', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 4, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Export setup</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Choisis la destination, le format de fichier, les tailles conformes, puis les écrans à sortir.</div>
          </div>
          <div className="seg" style={{ minWidth: 250 }}>
            {EXPORT_CHANNEL_OPTIONS.map((item) => (
              <button key={item.id} className={channel === item.id ? 'on' : ''} onClick={() => setChannel(item.id)} style={{ flex: 1 }}>{item.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '180px 180px 1fr', gap: 10, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>File format</div>
            <select className="input" value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              {EXPORT_FORMAT_OPTIONS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </div>
          {channel === 'custom' ? (
            <>
              <div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>Width</div>
                <input className="input" type="number" min="320" max="3840" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} />
              </div>
              <div>
                <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>Height</div>
                <input className="input" type="number" min="320" max="3840" value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} />
              </div>
            </>
          ) : (
            <div style={{ fontSize: 12, color: 'var(--text-3)', alignSelf: 'center' }}>
              {channel === 'app-store-connect'
                ? 'Apple accepte PNG/JPG et peut redescendre les tailles plus petites si tu fournis la résolution requise la plus haute.'
                : 'Google Play accepte JPG ou PNG 24-bit, min 320 px, max 3840 px, avec un ratio max 2:1.'}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8, marginBottom: 18 }}>
          {allSpecs.map((spec) => {
            const checked = channel === 'custom' ? true : selectedSpecIds.includes(spec.id);
            return (
              <label key={spec.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 12, borderRadius: 14, border: `1px solid ${checked ? 'var(--accent-ring)' : 'var(--border-1)'}` }}>
                {channel !== 'custom' ? <input type="checkbox" checked={checked} onChange={() => toggleSpec(spec.id)} /> : null}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{spec.label}</div>
                    <span className="chip">{spec.provider === 'app-store-connect' ? 'Apple' : spec.provider === 'google-play' ? 'Play' : 'Custom'}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 4 }}>{spec.accepted}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{spec.requirement}</div>
                </div>
              </label>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {project.variantsData.map((variant) => {
            const screensSelectedForVariant = (variant.screensData || []).filter((screen) => selectedScreenKeys.includes(makeScreenSelectionKey(variant.id, screen.id))).length;
            const allVariantScreensSelected = screensSelectedForVariant === (variant.screensData || []).length;
            return (
              <div key={variant.id} style={{ padding: 12, borderRadius: 14, border: '1px solid var(--border-1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <input type="checkbox" checked={selectedIds.includes(variant.id)} onChange={() => toggleVariant(variant.id)} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{variant.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{window.SHIPSHOT.localizationLabel(variant.country, 'full')} · {variant.audience}</div>
                  </div>
                  <button className="btn ghost sm" onClick={() => toggleAllScreensForVariant(variant)} disabled={!selectedIds.includes(variant.id)}>
                    {allVariantScreensSelected ? 'Clear screens' : 'All screens'}
                  </button>
                </div>

                <div style={{ display: 'grid', gap: 8 }}>
                  {(variant.screensData || []).map((screen, index) => {
                    const screenChecked = selectedScreenKeys.includes(makeScreenSelectionKey(variant.id, screen.id));
                    return (
                      <div key={screen.id} className="editor-list-row" style={{ padding: '8px 10px', borderRadius: 12 }}>
                        <input type="checkbox" checked={screenChecked} disabled={!selectedIds.includes(variant.id)} onChange={() => toggleScreen(variant.id, screen.id)} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12.5, fontWeight: 500 }}>Screen {String(index + 1).padStart(2, '0')} · {screen.kind}</div>
                          <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{screen.headline || 'Untitled screen'}</div>
                        </div>
                        <button className="btn sm" onClick={() => exportSingleScreen(variant, screen, index)} disabled={!selectedIds.includes(variant.id) || !screenChecked || !activeSpecs.length || exporting}>
                          <window.I.Download /> Screen
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingTop: 14, borderTop: '1px solid var(--border-1)' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{selectedVariantPayloads.length} localization{selectedVariantPayloads.length === 1 ? '' : 's'} · {selectedScreensCount} screen{selectedScreensCount === 1 ? '' : 's'} · {activeSpecs.length} size{activeSpecs.length === 1 ? '' : 's'}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{selectedAssetCount} file{selectedAssetCount === 1 ? '' : 's'} will be rendered in {exportFormat.toUpperCase()}.</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn sm" onClick={exportPdf}><window.I.Download /> PDF proof</button>
            <button className="btn primary" onClick={exportSelectedAssets} disabled={!selectedVariantPayloads.length || !activeSpecs.length || exporting}><window.I.Download /> {exporting ? 'Rendering…' : 'Export assets'}</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 4, paddingTop: 14, borderTop: '1px solid var(--border-1)' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Local backend pack</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{jobMessage || 'Write selected assets + manifest into local backend jobs.'}</div>
          </div>
          <button className="btn sm" onClick={prepareBackendPack} disabled={!selectedVariantPayloads.length || !activeSpecs.length || exporting}><window.I.Upload /> {exporting ? 'Working…' : 'Prepare backend pack'}</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gap: 10 }}>
          <PanelHeading>App Store Connect</PanelHeading>
          <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 12 }}>
            Backend required for direct upload. The realistic flow is: create screenshot set, reserve asset, upload each file, then commit. If UI is identical across device sizes, Apple says you can provide only the highest required resolution and let App Store Connect scale down.
          </div>
          <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
            <label>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>App Store Connect app ID</div>
              <input className="input" value={integration.ascAppId} onChange={(e) => setIntegration((current) => ({ ...current, ascAppId: e.target.value }))} />
            </label>
            <label>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>Bundle ID</div>
              <input className="input" value={integration.bundleId} onChange={(e) => setIntegration((current) => ({ ...current, bundleId: e.target.value }))} />
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <MetaRow k="Files" v="PNG / JPG, 1 to 10 screenshots per set" />
            <MetaRow k="Recommended set" v='iPhone 6.9" as primary, plus iPad 13" if iPad is supported' />
            <MetaRow k="API flow" v="appScreenshotSets → appScreenshots reservation → upload ops → commit" />
            <MetaRow k="Roles" v="Account Holder, Admin, App Manager, or Marketing" />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <button className="btn sm" onClick={() => window.open('https://appstoreconnect.apple.com/apps', '_blank', 'noopener,noreferrer')}><window.I.Apple /> Open ASC</button>
            <button className="btn sm" onClick={() => exportManifest('app-store-connect')} disabled={!selectedVariantPayloads.length || !activeSpecs.length}><window.I.Download /> Manifest</button>
            <button className="btn primary sm" onClick={() => prepareBackendUpload('app-store-connect')} disabled={!selectedVariantPayloads.length || !activeSpecs.length || exporting}><window.I.Upload /> Prepare ASC job</button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <PanelHeading>Google Play</PanelHeading>
          <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 12 }}>
            Google Play accepts JPG or 24-bit PNG screenshots without alpha, minimum 320 px, maximum 3840 px, and the longest side cannot exceed 2× the shortest side. Direct publishing should go through the Android Publisher edits flow.
          </div>
          <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
            <label>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 6 }}>Play package name</div>
              <input className="input" value={integration.playPackageName} onChange={(e) => setIntegration((current) => ({ ...current, playPackageName: e.target.value }))} />
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <MetaRow k="Image types" v='phoneScreenshots / sevenInchScreenshots / tenInchScreenshots' />
            <MetaRow k="Recommended phone" v="1080×1920 portrait" />
            <MetaRow k="API flow" v="edits.insert → edits.images.upload → edits.commit" />
            <MetaRow k="Why backend" v="OAuth/service account credentials must stay server-side" />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <button className="btn sm" onClick={() => window.open('https://play.google.com/console/u/0/developers/', '_blank', 'noopener,noreferrer')}><window.I.Device /> Open Play Console</button>
            <button className="btn sm" onClick={() => exportManifest('google-play')} disabled={!selectedVariantPayloads.length || !activeSpecs.length}><window.I.Download /> Manifest</button>
            <button className="btn primary sm" onClick={() => prepareBackendUpload('google-play')} disabled={!selectedVariantPayloads.length || !activeSpecs.length || exporting}><window.I.Upload /> Prepare Play job</button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <PanelHeading>What Changed</PanelHeading>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.6 }}>
            1. Export presets are now destination-first instead of one mixed list.
            <br />
            2. You can choose the exact compliant sizes to render.
            <br />
            3. Export works per screen as well as full pack.
            <br />
            4. The manifest carries provider-specific targets for a future direct backend upload.
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <PanelHeading>Local jobs</PanelHeading>
          {jobs.length === 0 ? (
            <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>No backend jobs yet for this project.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {jobs.slice(0, 6).map((job) => (
                <div key={job.id} className="editor-list-row" style={{ padding: 10, borderRadius: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{job.id}</div>
                    <span className="chip">{job.status}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 4 }}>{job.type}{job.provider ? ` · ${job.provider}` : ''}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 4 }}>{job.paths?.dir || job.paths?.renderDir || 'Local runtime job'}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HistoryTab({ project }) {
  const events = project.history || [];
  return (
    <div style={{ padding: '24px 28px 60px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>History</h2>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>Only local events created in this workspace are listed here.</div>
        </div>
      </div>
      {events.length === 0 ? (
        <div className="card" style={{ padding: 24, textAlign: 'center', color: 'var(--text-3)' }}>No local events yet.</div>
      ) : (
        <div style={{ position: 'relative', paddingLeft: 16 }}>
          <div style={{ position: 'absolute', left: 5, top: 6, bottom: 6, width: 1, background: 'var(--border-1)' }} />
          {events.map((event) => (
            <div key={event.id} style={{ position: 'relative', paddingBottom: 18 }}>
              <span style={{ position: 'absolute', left: -16, top: 5, width: 11, height: 11, borderRadius: 99, background: 'var(--bg-0)', border: '2px solid var(--accent)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{event.label}</div>
                <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{window.SHIPSHOT.formatRelative(event.when)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TemplateGalleryCard({ app, direction, current, variant }) {
  const previewKinds = ['headline', 'feature', 'feature', 'lifestyle'];
  const templateId = direction.templateId || current.template || 't1';
  const locale = variant?.assetLocale || variant?.locale || 'en-US';
  return (
    <div style={{ borderRadius: 18, padding: 10, background: window.DATA.TEMPLATES.find((template) => template.id === templateId)?.bg || 'var(--bg-2)', minHeight: 156, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
        {previewKinds.map((kind, index) => (
          <div key={`${direction.id}-${kind}-${index}`} style={{ width: 58, flex: '0 0 auto' }}>
            <ScreenshotCard
              kind={kind}
              app={app}
              template={templateId}
              width={58}
              idx={index}
              headline={current.headline}
              sub={current.sub}
              ctaLabel={current.ctaLabel}
              bg=""
              locale={locale}
              layout={window.SHIPSHOT.defaultLayoutForKind(kind)}
              decorations={[]}
              frameStyle={direction.frameStyle || current.frameStyle}
              textStyle={direction.textStyle || current.textStyle}
              ambientStyle={direction.ambientStyle || current.ambientStyle}
              ctaStyle={direction.ctaStyle || current.ctaStyle}
              chromeStyle={direction.chromeStyle || current.chromeStyle}
              fontFamily={current.fontFamily}
              watermark=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ElementLibraryBrowser({ tab, category, onSelectCategory, onBack, onApplyItem }) {
  const categories = ELEMENT_LIBRARY[tab] || [];
  const itemBase = category || categories[0] || 'Item';
  const itemCards = Array.from({ length: 8 }, (_, index) => `${itemBase} ${index + 1}`);

  if (!category) {
    return (
      <div className="editor-library-grid">
        {categories.map((label) => (
          <button key={label} className="editor-library-card" onClick={() => onSelectCategory(label)}>
            <div className="editor-library-card__thumb" />
            <div className="editor-library-card__label">{label}</div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700 }}>{category}</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{tab}</div>
        </div>
        <button className="btn ghost sm" onClick={onBack}><window.I.ChevronL /> Back</button>
      </div>
      <div className="editor-library-grid">
        {itemCards.map((label) => (
          <button key={label} className="editor-library-card" onClick={() => onApplyItem(label)}>
            <div className="editor-library-card__thumb" />
            <div className="editor-library-card__label">{label}</div>
          </button>
        ))}
      </div>
    </>
  );
}

function PanelHeading({ children }) {
  return <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 14, marginBottom: 8, fontWeight: 500 }}>{children}</div>;
}

function MetaRow({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12.5, gap: 12 }}>
      <span style={{ color: 'var(--text-3)' }}>{k}</span>
      <span style={{ color: 'var(--text-1)', textAlign: 'right' }}>{v}</span>
    </div>
  );
}

Object.assign(window, { ProjectScreen });
