const useState = React.useState;
/* Templates, Assets, Exports (global), Settings */

function TemplatesScreen({ setRoute }) {
  const { TEMPLATES, APPS } = window.DATA;
  const app = APPS[0];
  const [cat, setCat] = useState('all');
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Creative systems</h1>
          <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>Structured systems, not blank templates. Each is tuned for a category and density.</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn sm">Import system</button>
          <button className="btn primary sm"><window.I.Plus /> New system</button>
        </div>
      </div>

      <div className="seg" style={{ marginBottom: 18 }}>
        {['all','utility','lifestyle','games','finance','wellness','dev','custom'].map(c => (
          <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)} style={{ textTransform: 'capitalize' }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {TEMPLATES.map(t => (
          <div key={t.id} className="card" style={{ padding: 14, transition: 'border-color 150ms', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-1)'}>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '10px 0 14px', background: 'var(--bg-2)', borderRadius: 10, marginBottom: 12 }}>
              {['headline','feature','stat'].map((k, i) => (
                <div key={i} style={{ transform: `translateY(${i * 4}px) scale(${1 - i*0.04})` }}>
                  <ScreenshotCard kind={k} app={app} template={t.id} width={72} idx={i} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{t.name}</div>
              <span className="chip">{t.density}</span>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 10 }}>{t.tag}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn sm" style={{ flex: 1 }}>Preview</button>
              <button className="btn primary sm" style={{ flex: 1 }}>Use system</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssetsScreen({ setRoute }) {
  const { APPS } = window.DATA;
  const [tab, setTab] = useState('raw');
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Assets</h1>
          <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>Raw screenshots, brand, backgrounds, and reusable blocks.</div>
        </div>
        <button className="btn primary sm"><window.I.Upload /> Upload</button>
      </div>
      <div className="seg" style={{ marginBottom: 16 }}>
        {[['raw','Raw screenshots',42],['logo','Logos',8],['color','Brand colors',12],['bg','Backgrounds',24],['block','Blocks',16]].map(([id,l,n]) => (
          <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{l} <span className="mono" style={{ opacity: 0.5, marginLeft: 4 }}>{n}</span></button>
        ))}
      </div>

      {tab === 'raw' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
          {Array.from({ length: 18 }).map((_, i) => {
            const app = APPS[i % APPS.length];
            return (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{
                  aspectRatio: '9/19.5', borderRadius: 14,
                  background: `linear-gradient(160deg, ${app.tint}, ${app.tint2})`,
                  padding: 10, overflow: 'hidden', position: 'relative',
                  border: '1px solid var(--border-1)',
                }}>
                  <div style={{ height: 14, marginBottom: 6 }} />
                  <PhoneScene idx={i} width={120} app={app} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{app.name}-{(i+1).toString().padStart(2,'0')}.png</span>
                  <span className="mono">1290×2796</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'color' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {[
            ['Lumen · Ember', 'oklch(65% 0.14 30)'],
            ['Lumen · Amber', 'oklch(80% 0.12 60)'],
            ['Glide · Deep', 'oklch(62% 0.14 220)'],
            ['Glide · Mint', 'oklch(78% 0.14 180)'],
            ['Otto · Clay', 'oklch(62% 0.17 20)'],
            ['Otto · Wheat', 'oklch(80% 0.13 45)'],
            ['Accent · Lime', 'oklch(84% 0.18 130)'],
            ['Base · Ink', '#0a0b0d'],
            ['Base · Bone', '#e9e6dd'],
            ['Sys · Warn', 'oklch(82% 0.14 85)'],
            ['Sys · Rose', 'oklch(70% 0.14 15)'],
            ['Sys · Violet', 'oklch(72% 0.15 285)'],
          ].map(([n, c]) => (
            <div key={n} className="card" style={{ padding: 10 }}>
              <div style={{ aspectRatio: 1, background: c, borderRadius: 8, marginBottom: 8 }} />
              <div style={{ fontSize: 12, fontWeight: 500 }}>{n}</div>
              <div className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{c}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'bg' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {window.DATA.TEMPLATES.map(t => (
            <div key={t.id} className="card" style={{ padding: 10 }}>
              <div style={{ aspectRatio: '16/10', background: t.bg, borderRadius: 8 }} />
              <div style={{ fontSize: 12, fontWeight: 500, marginTop: 8 }}>{t.name} bg</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'logo' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {APPS.concat(APPS.slice(0,3)).map((a, i) => (
            <div key={i} className="card" style={{ padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, background: `linear-gradient(135deg, ${a.tint}, ${a.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 26 }}>{a.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{a.name}</div>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)' }} className="mono">1024×1024</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'block' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {['Stat block · big number','Feature row','Testimonial card','Before/After split','CTA footer','Star rating bar','Badge row','Timeline'].map(b => (
            <div key={b} className="card" style={{ padding: 14 }}>
              <div style={{ aspectRatio: '16/10', background: 'var(--bg-2)', borderRadius: 8, border: '1px dashed var(--border-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', fontSize: 11 }} className="mono">{b}</div>
              <div style={{ fontSize: 12, fontWeight: 500, marginTop: 8 }}>{b}</div>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>Used in 3 projects</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExportsScreen({ setRoute }) {
  const rows = [
    { name: 'Seen — Black Friday CPP pack', when: '1h ago', size: '28 MB', status: 'Ready', count: 36 },
    { name: 'Lumen v3 — US primary', when: '3h ago', size: '22 MB', status: 'Rendering', count: 18, progress: 72 },
    { name: 'Glide DE — 6.7" only', when: 'Yesterday', size: '6.4 MB', status: 'Ready', count: 6 },
    { name: 'Breadcrumb draft pack', when: '3d ago', size: '19 MB', status: 'Ready', count: 24 },
    { name: 'Otto preview — internal', when: '5d ago', size: '12 MB', status: 'Expired', count: 12 },
  ];
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Exports</h1>
          <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 4 }}>All packs rendered across your workspace. Expire after 30 days.</div>
        </div>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ color: 'var(--text-3)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {['Pack','Status','Files','Size','Rendered','Links',''].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 500, borderBottom: '1px solid var(--border-1)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border-1)' : 'none' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{r.name}</td>
                <td style={{ padding: '12px 16px' }}>
                  {r.status === 'Rendering' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="chip accent"><span className="dot accent pulse" /> {r.progress}%</span>
                    </div>
                  ) : r.status === 'Expired' ? (
                    <span style={{ color: 'var(--text-3)' }}><span className="dot" /> Expired</span>
                  ) : (
                    <span style={{ color: 'var(--success)' }}><span className="dot success" /> Ready</span>
                  )}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-2)' }} className="mono">{r.count}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-2)' }} className="mono">{r.size}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-3)' }}>{r.when}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button className="btn ghost sm" style={{ color: 'var(--accent)' }}>Share link</button>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  {r.status === 'Ready' ? <button className="btn sm"><window.I.Download /> Download</button> : <button className="btn ghost icon sm"><window.I.Dots /></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsScreen({ setRoute }) {
  const [tab, setTab] = useState('workspace');
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1100, margin: '0 auto' }}>
      <h1 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Settings</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[['workspace','Workspace'],['brand','Brand defaults'],['billing','Billing & credits'],['integrations','Integrations'],['repo','Code sources'],['export','Export defaults'],['members','Members'],['api','API keys']].map(([id,l]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              textAlign: 'left', padding: '7px 10px', borderRadius: 6, fontSize: 13,
              background: tab === id ? 'var(--bg-3)' : 'transparent',
              color: tab === id ? 'var(--text-1)' : 'var(--text-2)',
              fontWeight: tab === id ? 500 : 400,
            }}>{l}</button>
          ))}
        </div>
        <div>
          {tab === 'workspace' && <SettingsCard title="Workspace">
            <Field k="Workspace name" v={<input className="input" defaultValue="Indie Studio" />} />
            <Field k="Slug" v={<input className="input" defaultValue="indie-studio" />} />
            <Field k="Default platform" v={<div className="seg"><button className="on">iOS</button><button>Android</button><button>Both</button></div>} />
            <Field k="Default market" v={<input className="input" defaultValue="United States" />} />
          </SettingsCard>}
          {tab === 'brand' && <SettingsCard title="Brand defaults">
            <Field k="Primary font" v={<input className="input" defaultValue="Inter Tight" />} />
            <Field k="Accent color" v={<div style={{ display: 'flex', gap: 6 }}>{['oklch(84% 0.18 130)','oklch(72% 0.15 285)','oklch(82% 0.14 85)','oklch(82% 0.13 210)'].map((c,i)=><div key={c} style={{ width: 28, height: 28, borderRadius: 6, background: c, border: i===0?'2px solid var(--text-1)':'1px solid var(--border-2)' }} />)}</div>} />
            <Field k="Default device frame" v={<div className="seg"><button className="on">iPhone 15 Pro</button><button>iPhone 15</button><button>None</button></div>} />
            <Field k="Default tone" v={<div className="seg"><button className="on">Premium</button><button>Warm</button><button>Bold</button></div>} />
          </SettingsCard>}
          {tab === 'billing' && <SettingsCard title="Billing">
            <div style={{ padding: 16, background: 'var(--bg-2)', borderRadius: 10, border: '1px solid var(--border-1)', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>Studio plan · $49/mo</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Renews May 1, 2026</div>
                </div>
                <button className="btn sm">Manage plan</button>
              </div>
              <UsageRow label="Generations" used={148} total={400} />
              <div style={{ height: 6 }} />
              <UsageRow label="Repo analyses" used={4} total={10} tone="warn" />
            </div>
            <Field k="Billing email" v={<input className="input" defaultValue="billing@indiestudio.co" />} />
            <Field k="Tax ID" v={<input className="input" placeholder="Optional" />} />
          </SettingsCard>}
          {tab === 'integrations' && <SettingsCard title="Integrations">
            {[
              ['GitHub', 'Read source for app analysis', 'Connected · maya', true],
              ['App Store Connect', 'Push screenshots directly', 'Not connected', false],
              ['Figma', 'Import components as blocks', 'Not connected', false],
              ['Slack', 'Notify channel on export', 'Connected · #ship', true],
            ].map(([n, d, s, on]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--border-1)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}>{n === 'GitHub' ? <window.I.Github /> : n === 'App Store Connect' ? <window.I.Apple /> : <window.I.Layers />}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{n}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{d}</div>
                </div>
                <div style={{ fontSize: 12, color: on ? 'var(--success)' : 'var(--text-3)' }}>{on && <span className="dot success" />} {s}</div>
                <button className="btn sm">{on ? 'Configure' : 'Connect'}</button>
              </div>
            ))}
          </SettingsCard>}
          {(tab === 'repo' || tab === 'export' || tab === 'members' || tab === 'api') && (
            <SettingsCard title={{repo:'Code sources',export:'Export defaults',members:'Members',api:'API keys'}[tab]}>
              <div style={{ color: 'var(--text-3)', fontSize: 13 }}>Manage {tab} here.</div>
            </SettingsCard>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsCard({ title, children }) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <h3 style={{ margin: '0 0 18px', fontSize: 15, fontWeight: 500 }}>{title}</h3>
      {children}
    </div>
  );
}

function Field({ k, v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-1)', alignItems: 'center' }}>
      <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{k}</div>
      <div>{v}</div>
    </div>
  );
}

Object.assign(window, { TemplatesScreen, AssetsScreen, ExportsScreen, SettingsScreen });
