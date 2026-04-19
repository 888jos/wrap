const useState = React.useState;
/* Projects list + New project flow + Templates + Assets + Exports + Settings */

function ProjectsScreen({ setRoute }) {
  const { PROJECTS, APPS } = window.DATA;
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState('all');
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Projects</h1>
          <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>12 projects · 6 apps · 2 generating now</div>
        </div>
        <button className="btn primary" onClick={() => setRoute({ screen: 'new-project' })}><window.I.Plus /> New project</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--border-1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: 'var(--bg-2)', borderRadius: 6, border: '1px solid var(--border-2)', flex: '0 0 240px' }}>
            <window.I.Search style={{ color: 'var(--text-3)' }} />
            <input placeholder="Find a project…" style={{ background: 'transparent', border: 'none', fontSize: 13, flex: 1, color: 'var(--text-1)' }} />
          </div>
          <div className="seg">
            {['all', 'editing', 'generating', 'exported', 'archived'].map(f => (
              <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f[0].toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn sm"><window.I.Filter /> App</button>
          <button className="btn sm"><window.I.Filter /> Country</button>
          <button className="btn sm"><window.I.Filter /> Sort: Recent</button>
          <div className="seg">
            <button className={view==='grid'?'on':''} onClick={()=>setView('grid')}><window.I.Grid /></button>
            <button className={view==='list'?'on':''} onClick={()=>setView('list')}><window.I.Layers /></button>
          </div>
        </div>

        {view === 'grid' ? (
          <div style={{ padding: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {PROJECTS.map(p => <ProjectCard key={p.id} project={p} onOpen={() => setRoute({ screen: 'project', projectId: p.id, tab: 'overview' })} />)}
            {/* Empty create card */}
            <button onClick={() => setRoute({ screen: 'new-project' })} style={{
              background: 'transparent', border: '1.5px dashed var(--border-2)', borderRadius: 12,
              minHeight: 280, color: 'var(--text-3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'border-color 150ms, color 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-ring)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.color = 'var(--text-3)'; }}>
              <window.I.Plus />
              <div style={{ fontSize: 13, fontWeight: 500 }}>New project</div>
              <div style={{ fontSize: 11.5 }}>From prompt · repo · screenshots</div>
            </button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ color: 'var(--text-3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {['Project','Status','Country','Screens','Variants','Exports','Last edited',''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontWeight: 500, borderBottom: '1px solid var(--border-1)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map(p => {
                const app = APPS.find(a => a.id === p.appId);
                const tone = { accent: 'var(--accent)', warn: 'var(--warn)', success: 'var(--success)', muted: 'var(--text-3)' }[p.statusTone];
                return (
                  <tr key={p.id} onClick={() => setRoute({ screen: 'project', projectId: p.id, tab: 'overview' })} style={{ cursor: 'pointer', borderBottom: '1px solid var(--border-1)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 5, background: `linear-gradient(135deg, ${app.tint}, ${app.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>{app.icon}</div>
                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-2)' }}>
                        <span className="dot" style={{ background: tone }} /> {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-2)' }}>{p.country}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-2)' }} className="mono">{p.screens}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-2)' }} className="mono">{p.variants}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-2)' }} className="mono">{p.exports}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-3)' }}>{p.updated}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                      <button className="btn ghost icon sm"><window.I.Dots /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── NEW PROJECT FLOW ───────────────────────────────────────────
function NewProjectFlow({ setRoute }) {
  const { APPS, COUNTRIES } = window.DATA;
  const [step, setStep] = useState(0);
  const [source, setSource] = useState('prompt');
  const [app, setApp] = useState('new');
  const [country, setCountry] = useState('US');
  const [audience, setAudience] = useState('Students, 18–24');
  const [style, setStyle] = useState('t1');
  const steps = ['Source', 'App', 'Audience', 'Style', 'Review'];
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 80px' }}>
      <button className="btn ghost sm" onClick={() => setRoute({ screen: 'home' })} style={{ marginBottom: 16 }}>
        <window.I.ChevronL /> Cancel
      </button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>New project</h1>
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Step {step + 1} of {steps.length}</div>
      </div>
      <div style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 24 }}>Bring source material and some constraints; we'll generate the first draft.</div>

      {/* Stepper */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1 }}>
            <div style={{ height: 3, borderRadius: 99, background: i <= step ? 'var(--accent)' : 'var(--bg-3)', transition: 'background 200ms' }} />
            <div style={{ fontSize: 11.5, color: i === step ? 'var(--text-1)' : 'var(--text-3)', fontWeight: i === step ? 500 : 400, marginTop: 6 }}>
              <span className="mono" style={{ marginRight: 6, color: i <= step ? 'var(--accent)' : 'var(--text-4)' }}>0{i+1}</span>{s}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 28, minHeight: 360 }}>
        {step === 0 && <StepSource value={source} onChange={setSource} />}
        {step === 1 && <StepApp value={app} onChange={setApp} />}
        {step === 2 && <StepAudience country={country} setCountry={setCountry} audience={audience} setAudience={setAudience} />}
        {step === 3 && <StepStyle value={style} onChange={setStyle} />}
        {step === 4 && <StepReview source={source} app={app} country={country} audience={audience} style={style} />}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <button className="btn" onClick={() => step > 0 ? setStep(step - 1) : setRoute({ screen: 'home' })}>Back</button>
        {step < steps.length - 1 ? (
          <button className="btn primary" onClick={() => setStep(step + 1)}>Continue <window.I.ChevronR /></button>
        ) : (
          <button className="btn primary" onClick={() => setRoute({ screen: 'project', projectId: 'lumen-launch', tab: 'generate' })}>
            <window.I.Sparkle /> Create & start generating
          </button>
        )}
      </div>
    </div>
  );
}

function StepSource({ value, onChange }) {
  const options = [
    { id: 'prompt', icon: <window.I.Wand />, title: 'Prompt only', body: 'Describe the app in a sentence. Fastest start.', tag: 'Fastest' },
    { id: 'screens', icon: <window.I.Image />, title: 'Raw screenshots', body: 'Drop in iPhone captures. We find the narrative.', tag: 'Most common' },
    { id: 'url', icon: <window.I.Apple />, title: 'App Store URL', body: 'Pull metadata, icon, current screenshots.', tag: 'Quick' },
    { id: 'repo', icon: <window.I.Github />, title: 'Codebase / repo', body: 'Analyze Swift/RN/Flutter source for deep understanding.', tag: 'Deepest' },
  ];
  return (
    <div>
      <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>Where should we start from?</h2>
      <div style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 20 }}>You can mix sources — this just seeds the first draft.</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {options.map(o => {
          const on = value === o.id;
          return (
            <button key={o.id} onClick={() => onChange(o.id)} style={{
              textAlign: 'left', padding: 16, borderRadius: 10,
              background: on ? 'var(--bg-3)' : 'var(--bg-2)',
              border: `1px solid ${on ? 'var(--accent-ring)' : 'var(--border-2)'}`,
              display: 'flex', flexDirection: 'column', gap: 8, position: 'relative',
              transition: 'all 150ms',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: on ? 'var(--accent)' : 'var(--text-2)' }}>
                {o.icon}
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-1)' }}>{o.title}</span>
                <span style={{ marginLeft: 'auto' }} className="chip">{o.tag}</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{o.body}</div>
              {on && <div style={{ position: 'absolute', top: 10, right: 10, color: 'var(--accent)' }}><window.I.Check /></div>}
            </button>
          );
        })}
      </div>

      {/* Context-sensitive input */}
      <div style={{ marginTop: 20 }}>
        {value === 'prompt' && (
          <div>
            <Label>Prompt</Label>
            <textarea className="input" style={{ height: 100, padding: 12, fontSize: 13.5, lineHeight: 1.5, resize: 'none' }} defaultValue="A focus timer iOS app with an ambient sound library. Premium, calm. Emphasize 25/50/90-min sessions and the Apple Watch companion." />
          </div>
        )}
        {value === 'screens' && (
          <div style={{ padding: 32, border: '1.5px dashed var(--border-2)', borderRadius: 10, textAlign: 'center', color: 'var(--text-3)' }}>
            <window.I.Upload style={{ width: 24, height: 24 }} />
            <div style={{ marginTop: 8, fontSize: 13 }}>Drop iPhone screenshots here</div>
            <div style={{ fontSize: 11.5, marginTop: 2 }}>PNG, JPG · up to 30 · min 1170×2532</div>
          </div>
        )}
        {value === 'url' && (
          <div>
            <Label>App Store URL</Label>
            <input className="input" defaultValue="https://apps.apple.com/us/app/lumen-focus/id1234567890" />
          </div>
        )}
        {value === 'repo' && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 14, background: 'var(--bg-2)', border: '1px solid var(--border-2)', borderRadius: 10 }}>
            <window.I.Github style={{ color: 'var(--text-2)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>maya/lumen-ios</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>Swift · 148 files · main · read access granted</div>
            </div>
            <button className="btn sm">Change repo</button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepApp({ value, onChange }) {
  const { APPS } = window.DATA;
  return (
    <div>
      <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>Which app is this for?</h2>
      <div style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 20 }}>Link to an existing app or register a new one.</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
        <button onClick={() => onChange('new')} style={{ padding: 16, borderRadius: 10, background: value === 'new' ? 'var(--bg-3)' : 'var(--bg-2)', border: `1px solid ${value === 'new' ? 'var(--accent-ring)' : 'var(--border-2)'}`, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}><window.I.Plus /></div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>New app</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>Register from scratch</div>
        </button>
        {APPS.slice(0, 5).map(a => (
          <button key={a.id} onClick={() => onChange(a.id)} style={{ padding: 16, borderRadius: 10, background: value === a.id ? 'var(--bg-3)' : 'var(--bg-2)', border: `1px solid ${value === a.id ? 'var(--accent-ring)' : 'var(--border-2)'}`, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${a.tint}, ${a.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 }}>{a.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{a.category}</div>
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div><Label>App name</Label><input className="input" defaultValue="Lumen" /></div>
        <div><Label>Platform</Label>
          <div className="seg" style={{ width: '100%' }}>
            <button className="on" style={{ flex: 1 }}>iOS</button>
            <button style={{ flex: 1 }}>Android</button>
            <button style={{ flex: 1 }}>Both</button>
          </div>
        </div>
        <div><Label>Category</Label><input className="input" defaultValue="Productivity" /></div>
        <div><Label>Screenshot count</Label>
          <div className="seg" style={{ width: '100%' }}>
            {[3,5,6,8,10].map(n => <button key={n} className={n===6?'on':''} style={{ flex: 1 }}>{n}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepAudience({ country, setCountry, audience, setAudience }) {
  const { COUNTRIES } = window.DATA;
  const audiences = ['Students, 18–24', 'Knowledge workers, 25–40', 'Creatives & writers', 'ADHD / focus seekers', 'Parents, 30–45'];
  const angles = ['Hero features', 'Problem → solution', 'Before / after', 'Social proof first', 'Price-led (CPP)'];
  return (
    <div>
      <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>Who and where?</h2>
      <div style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 20 }}>Pick a primary. You can add variants later.</div>

      <Label>Primary country</Label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {COUNTRIES.map(c => (
          <button key={c.code} onClick={() => setCountry(c.code)} className="btn sm" style={{ background: country === c.code ? 'var(--bg-3)' : 'var(--bg-2)', borderColor: country === c.code ? 'var(--accent-ring)' : 'var(--border-2)' }}>
            <span>{c.flag}</span> {c.name}
          </button>
        ))}
      </div>

      <Label>Primary audience</Label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {audiences.map(a => (
          <button key={a} onClick={() => setAudience(a)} className="btn sm" style={{ background: audience === a ? 'var(--bg-3)' : 'var(--bg-2)', borderColor: audience === a ? 'var(--accent-ring)' : 'var(--border-2)' }}>{a}</button>
        ))}
      </div>

      <Label>Positioning angle</Label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {angles.map((a, i) => (
          <button key={a} className="btn sm" style={{ background: i === 0 ? 'var(--bg-3)' : 'var(--bg-2)', borderColor: i === 0 ? 'var(--accent-ring)' : 'var(--border-2)' }}>{a}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <Label>Tone</Label>
          <div className="seg" style={{ width: '100%' }}>
            {['Premium','Warm','Bold','Editorial'].map((t,i) => <button key={t} className={i===0?'on':''} style={{ flex: 1 }}>{t}</button>)}
          </div>
        </div>
        <div>
          <Label>Use device frames?</Label>
          <div className="seg" style={{ width: '100%' }}>
            <button className="on" style={{ flex: 1 }}>Yes, iPhone 15 Pro</button>
            <button style={{ flex: 1 }}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepStyle({ value, onChange }) {
  const { TEMPLATES, APPS } = window.DATA;
  const app = APPS[0];
  return (
    <div>
      <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>Pick a creative system</h2>
      <div style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 20 }}>You can remix this later — it's a starting point, not a cage.</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {TEMPLATES.slice(0, 8).map(t => (
          <button key={t.id} onClick={() => onChange(t.id)} style={{ padding: 6, borderRadius: 12, background: value === t.id ? 'var(--bg-3)' : 'var(--bg-2)', border: `1px solid ${value === t.id ? 'var(--accent-ring)' : 'var(--border-2)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: '100%', padding: '10px 0', display: 'flex', justifyContent: 'center' }}>
              <ScreenshotCard kind="headline" app={app} template={t.id} width={90} idx={0} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, marginTop: 2 }}>{t.name}</div>
            <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginBottom: 4 }}>{t.density} density</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepReview({ source, app, country, audience, style }) {
  const { TEMPLATES, APPS, COUNTRIES } = window.DATA;
  const a = APPS.find(x => x.id === app) || APPS[0];
  const c = COUNTRIES.find(x => x.code === country);
  const t = TEMPLATES.find(x => x.id === style);
  const items = [
    ['Source', source === 'prompt' ? 'Prompt only' : source === 'screens' ? 'Raw screenshots (12)' : source === 'url' ? 'App Store URL' : 'Codebase · maya/lumen-ios'],
    ['App', `${a.name} · ${a.category}`],
    ['Platform', 'iOS · 6 screens · iPhone 15 Pro frame'],
    ['Market', `${c.flag} ${c.name}`],
    ['Audience', audience],
    ['Angle', 'Hero features'],
    ['Tone', 'Premium'],
    ['Creative system', t.name],
    ['AI copy generation', 'On'],
  ];
  return (
    <div>
      <h2 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>Ready to generate</h2>
      <div style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 20 }}>First draft takes ~45s. You'll land in the editor.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--border-1)', borderRadius: 10, overflow: 'hidden' }}>
        {items.map(([k, v], i) => (
          <div key={k} style={{ padding: '12px 14px', background: i % 2 === 0 ? 'var(--bg-2)' : 'var(--bg-1)', borderBottom: i < items.length - 2 ? '1px solid var(--border-1)' : 'none' }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{k}</div>
            <div style={{ fontSize: 13 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: 14, background: 'var(--accent-soft)', borderRadius: 10, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ color: 'var(--accent)' }}><window.I.Sparkle /></span>
        <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55 }}>
          We'll spend <span className="mono" style={{ color: 'var(--accent)' }}>~18</span> credits on this generation. After first draft, regenerates cost 3 credits per screen.
        </div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 11.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 500 }}>{children}</div>;
}

Object.assign(window, { ProjectsScreen, NewProjectFlow, Label });
