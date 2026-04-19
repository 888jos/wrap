const useState = React.useState;
/* Project workspace: Overview, Generate, App Intelligence, Edit, Variants, Exports, History */

function ProjectScreen({ projectId, tab, setRoute }) {
  const { PROJECTS, APPS } = window.DATA;
  const project = PROJECTS.find(p => p.id === projectId) || PROJECTS[0];
  const app = APPS.find(a => a.id === project.appId);
  const activeTab = tab || 'overview';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Project header */}
      <div style={{ padding: '16px 28px 0', borderBottom: '1px solid var(--border-1)', background: 'var(--bg-0)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: `linear-gradient(135deg, ${app.tint}, ${app.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>{app.icon}</div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{app.name} · {project.country}</div>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em', display: 'flex', alignItems: 'center', gap: 8 }}>
                {project.name}
                <span className={`chip ${project.statusTone === 'accent' ? 'accent' : ''}`}>
                  <span className={`dot ${project.statusTone}`} /> {project.status}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ display: 'flex', marginRight: 8 }}>
              {['MR','JM','+'].map((a, i) => (
                <div key={i} style={{ width: 24, height: 24, borderRadius: 99, border: '2px solid var(--bg-0)', marginLeft: i ? -8 : 0, background: i === 2 ? 'var(--bg-3)' : `linear-gradient(135deg, oklch(72% 0.15 ${285 + i*60}), oklch(80% 0.13 45))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{a}</div>
              ))}
            </div>
            <button className="btn sm"><window.I.Copy /> Duplicate</button>
            <button className="btn sm"><window.I.Globe /> New variant</button>
            <button className="btn primary sm"><window.I.Download /> Export</button>
          </div>
        </div>

        {/* Project tabs */}
        <div style={{ display: 'flex', gap: 2 }}>
          {window.DATA.PROJECT_TABS.map(t => {
            const on = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setRoute({ screen: 'project', projectId, tab: t.id })} style={{
                padding: '8px 12px', fontSize: 13, fontWeight: on ? 500 : 400,
                color: on ? 'var(--text-1)' : 'var(--text-3)',
                borderBottom: `2px solid ${on ? 'var(--accent)' : 'transparent'}`,
                marginBottom: -1,
                transition: 'color 120ms, border-color 120ms',
              }}>{t.label}</button>
            );
          })}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'overview' && <OverviewTab project={project} app={app} setRoute={setRoute} />}
        {activeTab === 'generate' && <GenerateTab project={project} app={app} setRoute={setRoute} />}
        {activeTab === 'edit' && <EditorTab project={project} app={app} />}
        {activeTab === 'variants' && <VariantsTab project={project} app={app} />}
        {activeTab === 'exports' && <ExportsTab project={project} app={app} />}
        {activeTab === 'history' && <HistoryTab project={project} app={app} />}
      </div>
    </div>
  );
}

// ─── Overview ──────────────────────────────────────────────────
function OverviewTab({ project, app, setRoute }) {
  return (
    <div style={{ padding: '28px 28px 60px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Active set strip */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Active set</div>
              <div style={{ fontSize: 15, fontWeight: 500, marginTop: 2 }}>Primary · US · {project.screens} screens</div>
            </div>
            <button className="btn sm" onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'edit' })}>
              Open editor <window.I.ChevronR />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {project.thumb.map((k, i) => (
              <div key={i} style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <ScreenshotCard kind={k} app={app} template={templateForTone(project.tone)} width={128} idx={i} />
                <div style={{ fontSize: 10.5, color: 'var(--text-3)' }} className="mono">0{i+1} · {k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* App intelligence teaser */}
        <Section title="App intelligence" icon={<window.I.Sparkle />} actionLabel="See full analysis" onAction={() => setRoute({ screen: 'project', projectId: project.id, tab: 'generate' })}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 12 }}>{window.DATA.APP_INTEL.summary}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {window.DATA.APP_INTEL.vps.slice(0, 4).map(v => (
                <div key={v.label} style={{ padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 8, border: '1px solid var(--border-1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500 }}>{v.label}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>{Math.round(v.conf * 100)}%</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }} className="mono">{v.src}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Variants */}
        <Section title="Variants" actionLabel="Manage all" onAction={() => setRoute({ screen: 'project', projectId: project.id, tab: 'variants' })}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <VariantMini label="Primary" sublabel="US · Students" active kind={project.thumb[0]} app={app} />
            <VariantMini label="DE localize" sublabel="Germany · Weekend" kind={project.thumb[0]} app={app} />
            <VariantMini label="BF 50% CPP" sublabel="Price-led hook" kind={project.thumb[0]} app={app} tone="rose" />
          </div>
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Project</div>
          <MetaRow k="Status" v={<span><span className="dot accent" /> {project.status}</span>} />
          <MetaRow k="Audience" v={project.audience} />
          <MetaRow k="Country" v={project.country} />
          <MetaRow k="Tone" v={project.tone} />
          <MetaRow k="Exports" v={`${project.exports} packs`} />
          <MetaRow k="Last edit" v={project.updated} />
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Recent generations</div>
          {window.DATA.GENERATIONS.slice(0, 3).map((g, i) => (
            <div key={g.id} style={{ padding: '8px 0', borderTop: i ? '1px solid var(--border-1)' : 'none' }}>
              <div style={{ fontSize: 12.5, fontWeight: 500 }}>{g.prompt.slice(0, 42)}…</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{g.screens} screens · {g.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetaRow({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12.5 }}>
      <span style={{ color: 'var(--text-3)' }}>{k}</span>
      <span style={{ color: 'var(--text-1)' }}>{v}</span>
    </div>
  );
}

function VariantMini({ label, sublabel, active, kind = 'headline', app, tone }) {
  return (
    <div style={{ padding: 10, borderRadius: 10, background: active ? 'var(--bg-2)' : 'var(--bg-1)', border: `1px solid ${active ? 'var(--accent-ring)' : 'var(--border-1)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <ScreenshotCard kind={kind} app={app} template={tone === 'rose' ? 't3' : 't1'} width={110} idx={0} />
      <div style={{ alignSelf: 'stretch' }}>
        <div style={{ fontSize: 12.5, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
          {active && <span className="dot accent" />}{label}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{sublabel}</div>
      </div>
    </div>
  );
}

// ─── Generate ──────────────────────────────────────────────────
function GenerateTab({ project, app, setRoute }) {
  const [prompt, setPrompt] = useState('Lead with the focus session hero, then ambient library, then Apple Watch. Students angle — quiet confidence, not hype.');
  const [count, setCount] = useState(6);
  const [running, setRunning] = useState(false);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 0, height: '100%' }}>
      <div style={{ padding: '24px 28px 60px', overflow: 'auto' }}>
        {/* Prompt composer */}
        <div className="card" style={{ padding: 18, background: 'var(--bg-1)', borderColor: 'var(--border-2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, left: -30, width: 120, height: 120, borderRadius: 99, background: 'var(--accent-soft)', filter: 'blur(40px)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, position: 'relative' }}>
            <span style={{ color: 'var(--accent)' }}><window.I.Sparkle /></span>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Generate</span>
            <span className="chip" style={{ marginLeft: 'auto' }}>Draft 4 · v3</span>
          </div>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} style={{
            width: '100%', minHeight: 100, padding: 12, fontSize: 14, lineHeight: 1.55, resize: 'none',
            background: 'var(--bg-2)', border: '1px solid var(--border-2)', borderRadius: 8, color: 'var(--text-1)',
            fontFamily: 'var(--font-sans)', position: 'relative',
          }} />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10, marginBottom: 12 }}>
            <InlineToggle label="Audience" val={project.audience} />
            <InlineToggle label="Country" val={project.country} />
            <InlineToggle label="Angle" val="Hero features" />
            <InlineToggle label="Tone" val="Premium" />
            <InlineToggle label="Style" val="Premium Minimal" />
            <InlineToggle label="Device frame" val="iPhone 15 Pro" />
            <InlineToggle label="Screens" val={`${count}`} />
            <button className="btn ghost sm" style={{ color: 'var(--text-3)' }}><window.I.Plus /> Add</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 6, color: 'var(--text-3)', fontSize: 12 }}>
              <span className="chip"><window.I.Github /> maya/lumen-ios</span>
              <span className="chip"><window.I.Image /> 12 raw screens</span>
              <span className="chip"><window.I.Apple /> Store metadata</span>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 11.5, color: 'var(--text-3)' }} className="mono">~18 credits</span>
              <button className="btn" onClick={() => setRunning(false)}>Regenerate 1 screen</button>
              <button className="btn primary" onClick={() => setRunning(!running)}>
                {running ? <><span className="dot accent pulse" /> Generating…</> : <><window.I.Sparkle /> Generate draft</>}
              </button>
            </div>
          </div>
        </div>

        {/* Result grid */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '24px 0 10px' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>Draft 4 · {count} screens</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn ghost sm"><window.I.Undo /> Previous</button>
            <button className="btn ghost sm">Compare to v2</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 20 }}>
          {Array.from({ length: count }).map((_, i) => {
            const kinds = ['headline','feature','feature','lifestyle','stat','cta'];
            const generating = running && i > 1;
            return (
              <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                <ScreenshotCard kind={kinds[i % 6]} app={app} template="t1" width={180} idx={i} selected={i === 0} />
                {generating && (
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: 'linear-gradient(135deg, rgba(10,11,13,0.7), rgba(10,11,13,0.9))', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
                    <span className="chip accent"><span className="dot accent pulse" /> generating</span>
                  </div>
                )}
                <div style={{ marginTop: 8, fontSize: 11.5, display: 'flex', justifyContent: 'space-between', color: 'var(--text-3)' }}>
                  <span className="mono">0{i+1}</span>
                  <span>{kinds[i % 6]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Intel rail */}
      <div style={{ borderLeft: '1px solid var(--border-1)', background: 'var(--bg-1)', padding: 20, overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.04em', marginBottom: 12 }}>
          <window.I.Sparkle /> APP INTELLIGENCE
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 16 }}>{window.DATA.APP_INTEL.summary}</div>

        <Label>Value props detected</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
          {window.DATA.APP_INTEL.vps.map(v => (
            <div key={v.label} style={{ padding: '8px 10px', background: 'var(--bg-2)', borderRadius: 7, border: '1px solid var(--border-1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 12.5 }}>{v.label}</div>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--accent)' }}>{Math.round(v.conf*100)}%</span>
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 2 }} className="mono">↳ {v.src}</div>
            </div>
          ))}
        </div>

        <Label>Suggested narrative</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 18 }}>
          {window.DATA.APP_INTEL.narrative.map(n => (
            <div key={n.n} style={{ display: 'flex', gap: 8, padding: '6px 2px', fontSize: 12.5 }}>
              <span className="mono" style={{ color: 'var(--accent)', width: 18 }}>0{n.n}</span>
              <span style={{ color: 'var(--text-3)', width: 64, fontSize: 11 }}>{n.role}</span>
              <span style={{ color: 'var(--text-2)', flex: 1 }}>{n.line}</span>
            </div>
          ))}
        </div>

        <Label>Features detected ({window.DATA.APP_INTEL.features.length})</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 18 }}>
          {window.DATA.APP_INTEL.features.map(f => <span key={f} className="chip">{f}</span>)}
        </div>

        <Label>Recommended directions</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {window.DATA.APP_INTEL.directions.map(d => (
            <button key={d} className="btn sm" style={{ justifyContent: 'space-between', width: '100%' }}>
              <span>{d}</span><window.I.ChevronR />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InlineToggle({ label, val }) {
  return (
    <button className="btn sm" style={{ background: 'var(--bg-2)', borderColor: 'var(--border-2)' }}>
      <span style={{ color: 'var(--text-3)' }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{val}</span>
      <window.I.ChevronD />
    </button>
  );
}

// ─── Editor ──────────────────────────────────────────────────
function EditorTab({ project, app }) {
  const [sel, setSel] = useState(0);
  const [tool, setTool] = useState('text');
  const kinds = project.thumb;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 320px', height: '100%', overflow: 'hidden' }}>
      {/* Filmstrip */}
      <div style={{ borderRight: '1px solid var(--border-1)', background: 'var(--bg-1)', padding: 12, overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Screens</div>
          <button className="btn ghost icon sm"><window.I.Plus /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {kinds.map((k, i) => (
            <button key={i} onClick={() => setSel(i)} style={{
              display: 'flex', gap: 10, alignItems: 'center',
              padding: 6, borderRadius: 8,
              background: sel === i ? 'var(--bg-3)' : 'transparent',
              border: `1px solid ${sel === i ? 'var(--accent-ring)' : 'transparent'}`,
              textAlign: 'left',
            }}>
              <span style={{ color: 'var(--text-4)', fontSize: 10 }}><window.I.Drag /></span>
              <div style={{ flexShrink: 0, transform: 'scale(0.9)', transformOrigin: 'left' }}>
                <ScreenshotCard kind={k} app={app} template={templateForTone(project.tone)} width={56} idx={i} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>0{i+1}</div>
                <div style={{ fontSize: 12, fontWeight: 500, textTransform: 'capitalize' }}>{k}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div style={{ background: 'var(--bg-0)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {/* Editor topbar */}
        <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8, borderBottom: '1px solid var(--border-1)' }}>
          <div className="seg">
            {[
              ['text', <window.I.Type />, 'Text'],
              ['style', <window.I.Palette />, 'Style'],
              ['bg', <window.I.Image />, 'Background'],
              ['device', <window.I.Device />, 'Device'],
              ['layout', <window.I.Layers />, 'Layout'],
            ].map(([id, icon, label]) => (
              <button key={id} className={tool === id ? 'on' : ''} onClick={() => setTool(id)} style={{ gap: 6, display: 'inline-flex', alignItems: 'center' }}>
                {icon} {label}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn ghost sm"><window.I.Undo /></button>
          <button className="btn ghost sm"><window.I.Redo /></button>
          <div style={{ width: 1, height: 18, background: 'var(--border-2)', margin: '0 4px' }} />
          <div className="seg">
            <button className="on">100%</button>
            <button>Fit</button>
          </div>
          <div style={{ width: 1, height: 18, background: 'var(--border-2)', margin: '0 4px' }} />
          <span className="chip"><span className="dot success" /> v14 · saved 2s ago</span>
        </div>

        {/* Canvas body */}
        <div className="grid-bg" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30, overflow: 'auto', position: 'relative' }}>
          {/* Prev/Next */}
          <button className="btn icon" style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }} onClick={() => setSel(Math.max(0, sel - 1))}><window.I.ChevronL /></button>
          <button className="btn icon" style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)' }} onClick={() => setSel(Math.min(kinds.length - 1, sel + 1))}><window.I.ChevronR /></button>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -14, border: '2px dashed var(--accent-ring)', borderRadius: 32, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -38, left: 0, display: 'flex', gap: 6 }}>
              <span className="chip accent" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', borderColor: 'transparent' }}>Screen 0{sel+1} · {kinds[sel]}</span>
              <span className="chip">6.7" · 1290×2796</span>
            </div>
            <ScreenshotCard kind={kinds[sel]} app={app} template={templateForTone(project.tone)} width={320} idx={sel} />
            <div style={{ position: 'absolute', bottom: -38, right: 0, fontSize: 11, color: 'var(--text-3)' }} className="mono">
              aligned to grid · safe area ✓
            </div>
          </div>
        </div>

        {/* Comments footer */}
        <div style={{ height: 36, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, borderTop: '1px solid var(--border-1)', fontSize: 12, color: 'var(--text-3)' }}>
          <window.I.Users /> Jonas is viewing
          <span>·</span>
          <span>2 comments on this screen</span>
          <div style={{ flex: 1 }} />
          <span className="mono">Autosave on</span>
        </div>
      </div>

      {/* Right inspector */}
      <div style={{ borderLeft: '1px solid var(--border-1)', background: 'var(--bg-1)', overflow: 'auto' }}>
        <InspectorPanel tool={tool} />
      </div>
    </div>
  );
}

function InspectorPanel({ tool }) {
  return (
    <div style={{ padding: 18 }}>
      {tool === 'text' && <>
        <PanelHeading>Headline</PanelHeading>
        <textarea className="input" style={{ height: 60, padding: 10, resize: 'none' }} defaultValue="Finally, deep work that sticks." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
          <div><Label>Font</Label><button className="btn" style={{ width: '100%', justifyContent: 'space-between' }}>Inter Tight <window.I.ChevronD /></button></div>
          <div><Label>Weight</Label><div className="seg" style={{ width: '100%' }}><button>400</button><button>500</button><button className="on">600</button><button>700</button></div></div>
          <div><Label>Size</Label><input className="input" defaultValue="72" /></div>
          <div><Label>Tracking</Label><input className="input" defaultValue="-2%" /></div>
        </div>
        <PanelHeading>Subheadline</PanelHeading>
        <textarea className="input" style={{ height: 44, padding: 10, resize: 'none' }} defaultValue="Presets that match your day." />
        <PanelHeading>AI copy</PanelHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['Sharpen hook','Shorten to 5 words','Translate → German','Make it punchier'].map(a => (
            <button key={a} className="btn sm" style={{ justifyContent: 'space-between', width: '100%' }}>
              <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><window.I.Sparkle /> {a}</span><window.I.ChevronR />
            </button>
          ))}
        </div>
      </>}
      {tool === 'style' && <>
        <PanelHeading>Palette</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 14 }}>
          {['#e9e6dd','#c8c3b6','#0a0b0d','oklch(80% 0.12 60)','oklch(65% 0.14 30)','oklch(84% 0.18 130)'].map((c, i) => (
            <div key={i} style={{ aspectRatio: 1, background: c, borderRadius: 6, border: i === 1 ? '2px solid var(--accent)' : '1px solid var(--border-2)' }} />
          ))}
        </div>
        <PanelHeading>Background</PanelHeading>
        <div className="seg" style={{ width: '100%', marginBottom: 10 }}>
          <button className="on" style={{ flex: 1 }}>Gradient</button><button style={{ flex: 1 }}>Solid</button><button style={{ flex: 1 }}>Image</button>
        </div>
        <div style={{ height: 80, borderRadius: 10, background: 'linear-gradient(160deg, #e9e6dd, #c8c3b6)', marginBottom: 14 }} />
        <PanelHeading>Corner radius</PanelHeading>
        <input type="range" min="0" max="40" defaultValue="24" style={{ width: '100%' }} />
        <PanelHeading>Effects</PanelHeading>
        {['Noise','Vignette','Film grain','Glow'].map((e, i) => (
          <div key={e} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 12.5 }}>
            <span>{e}</span>
            <div style={{ width: 30, height: 16, borderRadius: 99, background: i === 0 ? 'var(--accent)' : 'var(--bg-4)', padding: 2, display: 'flex', justifyContent: i === 0 ? 'flex-end' : 'flex-start' }}>
              <div style={{ width: 12, height: 12, borderRadius: 99, background: '#fff' }} />
            </div>
          </div>
        ))}
      </>}
      {tool === 'bg' && <div style={{ color: 'var(--text-3)', fontSize: 13 }}>Background presets…</div>}
      {tool === 'device' && <>
        <PanelHeading>Device frame</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {['iPhone 15 Pro','iPhone 15','Pixel 8','iPad Pro','None','Custom'].map((d, i) => (
            <button key={d} className="btn sm" style={{ flexDirection: 'column', height: 60, padding: 6, background: i === 0 ? 'var(--bg-3)' : 'var(--bg-2)' }}>
              <window.I.Device />
              <span style={{ fontSize: 10.5 }}>{d}</span>
            </button>
          ))}
        </div>
        <PanelHeading>Angle & crop</PanelHeading>
        {['Tilt X','Tilt Y','Crop top','Crop bottom'].map(r => (
          <div key={r} style={{ padding: '6px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}><span style={{ color: 'var(--text-3)' }}>{r}</span><span className="mono" style={{ color: 'var(--text-2)' }}>0°</span></div>
            <input type="range" min="-20" max="20" defaultValue="0" style={{ width: '100%' }} />
          </div>
        ))}
      </>}
      {tool === 'layout' && <>
        <PanelHeading>Layout</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {['Top','Center','Bottom','Split','Full-bleed','Offset'].map((l, i) => (
            <button key={l} className="btn sm" style={{ height: 54, background: i === 0 ? 'var(--bg-3)' : 'var(--bg-2)' }}>{l}</button>
          ))}
        </div>
        <PanelHeading>Order</PanelHeading>
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Drag screens in the filmstrip to reorder.</div>
      </>}
    </div>
  );
}

function PanelHeading({ children }) {
  return <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 14, marginBottom: 8, fontWeight: 500 }}>{children}</div>;
}

// ─── Variants ──────────────────────────────────────────────────
function VariantsTab({ project, app }) {
  const variants = [
    { name: 'Primary', sub: 'US · Students, 18–24', active: true, country: '🇺🇸', kinds: project.thumb, tpl: 't1', diff: 'Base' },
    { name: 'DE localize', sub: 'Germany · Weekend players', country: '🇩🇪', kinds: project.thumb, tpl: 't1', diff: '6 hooks · 1 image' },
    { name: 'JP premium', sub: 'Japan · Watch-first', country: '🇯🇵', kinds: project.thumb, tpl: 't4', diff: 'Reorder · tone' },
    { name: 'BF 50% CPP', sub: 'Price-led · 7-day', country: '🇺🇸', kinds: project.thumb, tpl: 't3', diff: 'Stat + CTA' },
  ];
  const [compare, setCompare] = useState([0, 3]);
  return (
    <div style={{ padding: '24px 28px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em' }}>Variants</h2>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>{variants.length} variants · {variants.length * project.screens} screens total</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn sm"><window.I.Globe /> Duplicate for country…</button>
          <button className="btn sm"><window.I.Users /> Duplicate for audience…</button>
          <button className="btn primary sm"><window.I.Plus /> New variant</button>
        </div>
      </div>

      {/* Variants list */}
      <div className="card" style={{ padding: 0, marginBottom: 24 }}>
        {variants.map((v, i) => (
          <div key={v.name} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
            borderBottom: i < variants.length - 1 ? '1px solid var(--border-1)' : 'none',
            background: v.active ? 'var(--bg-2)' : 'transparent',
          }}>
            <input type="checkbox" checked={compare.includes(i)} onChange={() => setCompare(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i].slice(-2))} style={{ accentColor: 'oklch(84% 0.18 130)' }} />
            <div style={{ display: 'flex', gap: 4 }}>
              {v.kinds.slice(0, 3).map((k, j) => (
                <div key={j} style={{ transform: `translateX(${j * -6}px)` }}><ScreenshotCard kind={k} app={app} template={v.tpl} width={40} idx={j} /></div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 500 }}>
                {v.country} {v.name}
                {v.active && <span className="chip accent">Active</span>}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{v.sub}</div>
            </div>
            <span style={{ fontSize: 11.5, color: 'var(--text-3)' }} className="mono">Δ {v.diff}</span>
            <span style={{ fontSize: 11.5, color: 'var(--text-3)', width: 70, textAlign: 'right' }}>{v.kinds.length} screens</span>
            <button className="btn sm">Open</button>
            <button className="btn ghost icon sm"><window.I.Dots /></button>
          </div>
        ))}
      </div>

      {/* Compare */}
      <div className="card" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Compare</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>Select two variants above to compare side-by-side.</div>
          </div>
          <div className="seg"><button className="on">Side by side</button><button>Diff</button><button>Overlay</button></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {compare.map((idx, col) => {
            const v = variants[idx];
            return (
              <div key={col}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>{v.country} {v.name}</div>
                  <span className="chip">{v.sub}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: 8, background: 'var(--bg-2)', borderRadius: 10 }}>
                  {v.kinds.map((k, j) => <ScreenshotCard key={j} kind={k} app={app} template={v.tpl} width={120} idx={j} />)}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 8, fontSize: 12.5, color: 'var(--text-2)' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Changes:</span> headline on 01, 02, 06 · background swap on 01 · stat value on 05 · CTA copy on 06.
        </div>
      </div>
    </div>
  );
}

// ─── Exports ───────────────────────────────────────────────────
function ExportsTab({ project, app }) {
  const [sizes, setSizes] = useState(['6.7','6.5','5.5']);
  return (
    <div style={{ padding: '24px 28px 60px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Export pack</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 18 }}>Generate App Store-ready PNGs in all target sizes.</div>

        <PanelHeading>Variants to include</PanelHeading>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Primary (US)','DE localize','JP premium'].map((v, i) => (
            <label key={v} style={{ display: 'inline-flex', gap: 6, alignItems: 'center', padding: '6px 10px', borderRadius: 6, background: 'var(--bg-2)', border: '1px solid var(--border-2)', fontSize: 12.5 }}>
              <input type="checkbox" defaultChecked={i < 2} style={{ accentColor: 'oklch(84% 0.18 130)' }} /> {v}
            </label>
          ))}
        </div>

        <PanelHeading>Device sizes</PanelHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            ['6.9\"', '1320×2868', 'iPhone 16 Pro Max'],
            ['6.7\"', '1290×2796', 'iPhone 15 Pro Max'],
            ['6.5\"', '1242×2688', 'iPhone 11 Pro Max'],
            ['5.5\"', '1242×2208', 'iPhone 8 Plus'],
            ['iPad 13\"', '2064×2752', 'iPad Pro'],
            ['iPad 12.9\"', '2048×2732', 'iPad Pro old'],
          ].map(([s, r, n]) => {
            const on = sizes.includes(s.replace(/\D/g, '').slice(0,2).replace(/(\d)(\d)/, '$1.$2')) || (s.startsWith('6.7') || s.startsWith('6.5') || s.startsWith('5.5'));
            return (
              <label key={s} style={{ padding: 10, borderRadius: 8, background: on ? 'var(--bg-3)' : 'var(--bg-2)', border: `1px solid ${on ? 'var(--accent-ring)' : 'var(--border-2)'}`, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{s}</span>
                  <input type="checkbox" defaultChecked={on} style={{ accentColor: 'oklch(84% 0.18 130)' }} />
                </div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 2 }}>{r}</div>
                <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{n}</div>
              </label>
            );
          })}
        </div>

        <PanelHeading>Naming</PanelHeading>
        <input className="input" defaultValue="lumen_v3_{variant}_{size}_{index}.png" />
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }} className="mono">
          → lumen_v3_us_6.7_01.png, lumen_v3_us_6.7_02.png …
        </div>

        <PanelHeading>Format</PanelHeading>
        <div className="seg">
          <button className="on">PNG</button>
          <button>JPG (quality 92)</button>
          <button>WebP</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, padding: 14, background: 'var(--bg-2)', borderRadius: 10, border: '1px solid var(--border-1)' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>36 PNGs · ~22 MB ZIP</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>2 variants × 6 screens × 3 sizes</div>
          </div>
          <button className="btn primary"><window.I.Download /> Export pack</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <PanelHeading>Queue</PanelHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Lumen v3 · US pack', progress: 72, status: 'Rendering' },
              { name: 'Seen BF CPP · all', progress: 100, status: 'Ready', done: true },
              { name: 'Glide DE · 6.7"', progress: 100, status: 'Ready', done: true },
            ].map(j => (
              <div key={j.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{j.name}</span>
                  <span style={{ color: j.done ? 'var(--success)' : 'var(--accent)' }}>{j.status}</span>
                </div>
                <div style={{ height: 3, background: 'var(--bg-3)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${j.progress}%`, height: '100%', background: j.done ? 'var(--success)' : 'var(--accent)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <PanelHeading>Readiness</PanelHeading>
          {[
            ['All screens generated', true],
            ['Copy localized for each variant', true],
            ['Safe areas respected', true],
            ['No TM violations detected', true],
            ['Store character limits OK', false],
          ].map(([label, ok]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 12.5 }}>
              <span style={{ color: ok ? 'var(--success)' : 'var(--warn)' }}>{ok ? <window.I.Check /> : <window.I.Flag />}</span>
              <span style={{ color: ok ? 'var(--text-1)' : 'var(--text-2)', flex: 1 }}>{label}</span>
              {!ok && <button className="btn ghost sm">Review</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── History ───────────────────────────────────────────────────
function HistoryTab({ project, app }) {
  const events = [
    { when: 'Just now', who: 'Shipshot AI', what: 'Generated draft v14', tone: 'accent', detail: 'Regenerated screen 03 · "Lead with Apple Watch Live Activity"' },
    { when: '2h ago', who: 'Maya R.', what: 'Edited headline on screen 01', tone: 'muted', detail: '"Finally, deep work that sticks." (was "Focus, without the noise.")' },
    { when: '2h ago', who: 'Maya R.', what: 'Swapped creative system to Premium Minimal', tone: 'muted' },
    { when: 'Yesterday', who: 'Shipshot AI', what: 'Generated draft v13', tone: 'accent', detail: '6 screens · "Premium minimal, students angle"' },
    { when: 'Yesterday', who: 'Jonas M.', what: 'Commented on screen 05', tone: 'muted', detail: '"Can we try a stat above 90% instead?"' },
    { when: '2 days ago', who: 'Shipshot AI', what: 'Analyzed repo maya/lumen-ios', tone: 'violet', detail: '148 files · 4 value props · 8 features detected' },
    { when: '2 days ago', who: 'Maya R.', what: 'Created project', tone: 'muted' },
  ];
  return (
    <div style={{ padding: '24px 28px 60px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>History</h2>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>Every change, every generation.</div>
        </div>
        <div className="seg"><button className="on">All</button><button>Generations</button><button>Edits</button><button>Comments</button></div>
      </div>
      <div style={{ position: 'relative', paddingLeft: 16 }}>
        <div style={{ position: 'absolute', left: 5, top: 6, bottom: 6, width: 1, background: 'var(--border-1)' }} />
        {events.map((e, i) => {
          const tc = e.tone === 'accent' ? 'var(--accent)' : e.tone === 'violet' ? 'var(--violet)' : 'var(--text-3)';
          return (
            <div key={i} style={{ position: 'relative', paddingBottom: 18 }}>
              <span style={{ position: 'absolute', left: -16, top: 5, width: 11, height: 11, borderRadius: 99, background: 'var(--bg-0)', border: `2px solid ${tc}` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>
                  <span style={{ color: tc }}>{e.who}</span>
                  <span style={{ color: 'var(--text-2)', fontWeight: 400 }}> {e.what}</span>
                </div>
                <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{e.when}</span>
              </div>
              {e.detail && <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.55 }}>{e.detail}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { ProjectScreen });
