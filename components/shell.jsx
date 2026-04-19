/* App shell: sidebar + topbar + layout */

// Shell uses React.useState directly; top-level destructure removed to avoid cross-file name collisions

function Logo({ size = 22 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.22,
        background: 'conic-gradient(from 210deg, oklch(84% 0.18 130), oklch(72% 0.15 285), oklch(82% 0.14 85), oklch(84% 0.18 130))',
        position: 'relative',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.4)',
      }}>
        <div style={{
          position: 'absolute', inset: size * 0.14, borderRadius: size * 0.14,
          background: 'var(--bg-0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: size * 0.5, fontWeight: 800, color: 'var(--text-1)',
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.06em',
        }}>s</div>
      </div>
      <span style={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: 15 }}>Shipshot</span>
    </div>
  );
}

function Sidebar({ route, setRoute }) {
  const { NAV, NAV_SECONDARY, PROJECTS, APPS } = window.DATA;
  const [pinOpen, setPinOpen] = React.useState(true);
  return (
    <aside style={{
      width: 232, flexShrink: 0, background: 'var(--bg-1)',
      borderRight: '1px solid var(--border-1)',
      display: 'flex', flexDirection: 'column',
      padding: '14px 12px',
      gap: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 6px 0' }}>
        <Logo />
        <button className="btn ghost icon sm" style={{ color: 'var(--text-3)' }} title="Keyboard shortcuts">
          <window.I.Cmd />
        </button>
      </div>

      <button
        onClick={() => setRoute({ screen: 'new-project' })}
        className="btn primary"
        style={{ justifyContent: 'space-between', height: 34, paddingLeft: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <window.I.Plus /> New project
        </span>
        <span style={{ display: 'inline-flex', gap: 2 }}>
          <span className="kbd" style={{ background: 'rgba(0,0,0,0.18)', border: 'none', color: 'var(--accent-fg)', opacity: 0.8 }}>⌘</span>
          <span className="kbd" style={{ background: 'rgba(0,0,0,0.18)', border: 'none', color: 'var(--accent-fg)', opacity: 0.8 }}>N</span>
        </span>
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(item => (
          <NavRow key={item.id} item={item} active={route.screen === item.id} onClick={() => setRoute({ screen: item.id })} />
        ))}
      </div>

      {/* Pinned projects */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
        <button onClick={() => setPinOpen(!pinOpen)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', color: 'var(--text-3)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <window.I.ChevronD style={{ transform: pinOpen ? 'none' : 'rotate(-90deg)', transition: 'transform 150ms' }} />
          Pinned
        </button>
        {pinOpen && PROJECTS.slice(0, 3).map(p => {
          const app = APPS.find(a => a.id === p.appId);
          const active = route.screen === 'project' && route.projectId === p.id;
          return (
            <button key={p.id} onClick={() => setRoute({ screen: 'project', projectId: p.id, tab: 'overview' })}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6,
                background: active ? 'var(--bg-3)' : 'transparent',
                color: active ? 'var(--text-1)' : 'var(--text-2)',
                textAlign: 'left', width: '100%',
              }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: `linear-gradient(135deg, ${app.tint}, ${app.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{app.icon}</div>
              <span style={{ fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{p.name.replace(/—.*$/, '').trim()}</span>
              {p.status === 'Generating' && <span className="dot accent" style={{ animation: 'pulse-accent 1.4s ease-in-out infinite' }} />}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1 }} />

      {/* Credits widget */}
      <div style={{ padding: 12, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border-1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <div style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>Generation credits</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }} className="mono">618 / 1000</div>
        </div>
        <div style={{ height: 4, background: 'var(--bg-4)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: '61.8%', height: '100%', background: 'var(--accent)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--text-3)' }}>
          <span>Renews May 1</span>
          <button style={{ color: 'var(--text-1)', fontWeight: 500 }}>Upgrade →</button>
        </div>
      </div>

      {NAV_SECONDARY.map(item => (
        <NavRow key={item.id} item={item} active={route.screen === item.id} onClick={() => setRoute({ screen: item.id })} />
      ))}

      {/* Account */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px' }}>
        <div style={{ width: 26, height: 26, borderRadius: 99, background: 'linear-gradient(135deg, oklch(72% 0.15 285), oklch(80% 0.13 45))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>MR</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 500 }}>Maya Reyes</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Indie Studio · Pro</div>
        </div>
        <button className="btn ghost icon sm"><window.I.ChevronR /></button>
      </div>
    </aside>
  );
}

function NavRow({ item, active, onClick }) {
  const Icon = window.I[item.icon];
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 9, width: '100%',
      padding: '6px 8px', borderRadius: 6,
      background: active ? 'var(--bg-3)' : 'transparent',
      color: active ? 'var(--text-1)' : 'var(--text-2)',
      fontSize: 13, fontWeight: active ? 500 : 400,
      textAlign: 'left', transition: 'background 100ms',
    }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-2)'; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <span style={{ color: active ? 'var(--text-1)' : 'var(--text-3)' }}><Icon /></span>
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.count && <span style={{ fontSize: 11, color: 'var(--text-3)' }} className="mono">{item.count}</span>}
      {item.badge && <span style={{ fontSize: 10, fontWeight: 600, background: 'var(--accent)', color: 'var(--accent-fg)', padding: '1px 6px', borderRadius: 99 }}>{item.badge}</span>}
    </button>
  );
}

function TopBar({ route, crumbs = [], right = null }) {
  return (
    <div style={{
      height: 48, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px',
      borderBottom: '1px solid var(--border-1)',
      background: 'var(--bg-0)',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)', fontSize: 13 }}>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: 'var(--text-4)' }}><window.I.ChevronR /></span>}
            <button style={{ color: i === crumbs.length - 1 ? 'var(--text-1)' : 'var(--text-2)', fontWeight: i === crumbs.length - 1 ? 500 : 400, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {c.icon && <span style={{ color: 'var(--text-3)' }}>{c.icon}</span>}
              {c.label}
            </button>
          </React.Fragment>
        ))}
      </div>

      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <button className="btn" style={{ background: 'var(--bg-2)', height: 28, width: 320, paddingLeft: 10, paddingRight: 8, justifyContent: 'flex-start', color: 'var(--text-3)', fontWeight: 400 }}>
          <window.I.Search />
          <span>Search projects, assets, commands…</span>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 2 }}>
            <span className="kbd">⌘</span><span className="kbd">K</span>
          </span>
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {right}
      </div>
    </div>
  );
}

Object.assign(window, { Logo, Sidebar, TopBar, NavRow });
