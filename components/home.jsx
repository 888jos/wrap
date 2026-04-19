/* Home dashboard screen */

function HomeScreen({ setRoute }) {
  const { PROJECTS, GENERATIONS, APPS } = window.DATA;
  return (
    <div style={{ padding: '28px 36px 60px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Greeting */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Thursday · Apr 18</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 600, letterSpacing: '-0.025em' }}>Welcome back, Maya.</h1>
          <div style={{ color: 'var(--text-3)', marginTop: 6, fontSize: 14 }}>
            2 projects waiting on you. <span style={{ color: 'var(--accent)' }}>Otto — FR</span> is generating now.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setRoute({ screen: 'projects' })}><window.I.Folder /> All projects</button>
          <button className="btn primary" onClick={() => setRoute({ screen: 'new-project' })}><window.I.Plus /> New project</button>
        </div>
      </div>

      {/* Quick tiles row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
        <QuickTile label="Active projects" value="12" delta="+2 this week" icon={<window.I.Folder />} />
        <QuickTile label="Screens generated" value="148" delta="+38 this week" icon={<window.I.Sparkle />} tone="accent" />
        <QuickTile label="Pending exports" value="2" delta="Queue: 1 running" icon={<window.I.Download />} tone="warn" />
        <QuickTile label="Variants shipped" value="6" delta="Across 3 markets" icon={<window.I.Globe />} />
      </div>

      {/* Main split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Continue editing */}
          <Section title="Continue where you left off" actionLabel="See all" onAction={() => setRoute({ screen: 'projects' })}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {PROJECTS.slice(0, 3).map(p => (
                <ProjectCard key={p.id} project={p} onOpen={() => setRoute({ screen: 'project', projectId: p.id, tab: 'edit' })} />
              ))}
            </div>
          </Section>

          {/* Recent generations */}
          <Section title="Recent generations" actionLabel="Open history" onAction={() => setRoute({ screen: 'project', projectId: 'lumen-launch', tab: 'history' })}>
            <div className="card" style={{ padding: 4 }}>
              {GENERATIONS.map((g, i) => (
                <GenerationRow key={g.id} gen={g} last={i === GENERATIONS.length - 1} />
              ))}
            </div>
          </Section>

          {/* AI suggestions */}
          <Section title="Suggestions from Shipshot AI" icon={<window.I.Sparkle />}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              <SuggestionCard
                title="Localize Lumen for Japan"
                body="Your US set ranks well for Watch features. JP has 2.1× Watch penetration — a JP variant should surface the Watch screen earlier."
                action="Create JP variant" />
              <SuggestionCard
                title="Retest Glide's hook"
                body="Three variants outperform the original headline by 8–14% in heuristic scoring. Worth an A/B round."
                action="Open variants" tone="violet" />
            </div>
          </Section>
        </div>

        {/* Right rail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <UsageCard />
          <ActivityCard />
          <TipCard />
        </div>
      </div>
    </div>
  );
}

function QuickTile({ label, value, delta, icon, tone }) {
  const accent = tone === 'accent' ? 'var(--accent)' : tone === 'warn' ? 'var(--warn)' : 'var(--text-3)';
  return (
    <div className="card" style={{ padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-3)', fontSize: 12 }}>
        <span>{label}</span>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.03em', marginTop: 4 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 2 }}>{delta}</div>
    </div>
  );
}

function Section({ title, icon, actionLabel, onAction, children }) {
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <h2 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-2)', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {icon && <span style={{ color: 'var(--accent)' }}>{icon}</span>}
          {title}
        </h2>
        {actionLabel && <button className="btn ghost sm" onClick={onAction}>{actionLabel} <window.I.ChevronR /></button>}
      </div>
      {children}
    </section>
  );
}

function ProjectCard({ project, onOpen }) {
  const app = window.DATA.APPS.find(a => a.id === project.appId);
  const tone = { accent: 'var(--accent)', warn: 'var(--warn)', success: 'var(--success)', muted: 'var(--text-3)' }[project.statusTone] || 'var(--text-3)';
  return (
    <button onClick={onOpen} className="card" style={{
      padding: 0, textAlign: 'left', overflow: 'hidden',
      transition: 'border-color 150ms, transform 150ms',
      cursor: 'pointer',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.transform = 'none'; }}>
      {/* Thumb strip */}
      <div style={{
        display: 'flex', gap: 4, padding: 10, height: 148,
        background: 'radial-gradient(80% 100% at 50% 0%, var(--bg-2) 0%, var(--bg-1) 100%)',
        borderBottom: '1px solid var(--border-1)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {project.thumb.slice(0, 5).map((kind, i) => (
          <div key={i} style={{ transform: `translateY(${i * 2}px) scale(${1 - i * 0.02})`, transformOrigin: 'top center' }}>
            <ScreenshotCard kind={kind} app={app} template={templateForTone(project.tone)} width={68} idx={i} />
          </div>
        ))}
        {project.status === 'Generating' && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,11,13,0.9) 100%)', display: 'flex', alignItems: 'flex-end', padding: 10 }}>
            <span className="chip accent"><span className="dot accent" style={{ animation: 'pulse-accent 1.4s infinite' }} /> Generating · 2/5</span>
          </div>
        )}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: `linear-gradient(135deg, ${app.tint}, ${app.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{app.icon}</div>
            <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.name}</div>
          </div>
          <span className="dot" style={{ background: tone, boxShadow: project.status === 'Generating' ? `0 0 8px ${tone}` : 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', color: 'var(--text-3)', fontSize: 11.5, flexWrap: 'wrap' }}>
          <span>{project.status}</span>
          <span>·</span>
          <span>{project.country}</span>
          <span>·</span>
          <span>{project.screens} screens</span>
          <span>·</span>
          <span>{project.variants} variant{project.variants === 1 ? '' : 's'}</span>
          <span style={{ marginLeft: 'auto' }}>{project.updated}</span>
        </div>
      </div>
    </button>
  );
}

function templateForTone(tone) {
  const map = {
    'Premium minimal': 't1', 'Bold conversion': 't3',
    'Editorial lifestyle': 't4', 'High clarity utility': 't7',
    'Warm & playful': 't4',
  };
  return map[tone] || 't2';
}

function GenerationRow({ gen, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '10px 12px',
      borderBottom: last ? 'none' : '1px solid var(--border-1)',
    }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: gen.status === 'running' ? 'var(--accent)' : 'var(--text-3)' }}>
        {gen.status === 'running' ? <span className="dot accent pulse" /> : <window.I.Check />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, display: 'flex', gap: 8, alignItems: 'center' }}>
          {gen.project}
          {gen.status === 'running' && <span className="chip accent">Running</span>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <span className="mono">›</span> {gen.prompt}
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{gen.screens} screens</div>
      <div style={{ fontSize: 11.5, color: 'var(--text-3)', width: 80, textAlign: 'right' }}>{gen.time}</div>
      <button className="btn ghost sm">Open</button>
    </div>
  );
}

function SuggestionCard({ title, body, action, tone }) {
  const color = tone === 'violet' ? 'var(--violet)' : 'var(--accent)';
  const soft = tone === 'violet' ? 'var(--violet-soft)' : 'var(--accent-soft)';
  return (
    <div className="card" style={{ padding: 16, borderColor: 'var(--border-1)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: 99, background: soft, filter: 'blur(30px)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color, fontWeight: 500, letterSpacing: '0.02em', marginBottom: 8 }}>
        <window.I.Sparkle /> INSIGHT
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, letterSpacing: '-0.01em' }}>{title}</div>
      <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 12 }}>{body}</div>
      <button className="btn sm" style={{ background: soft, color, border: 'none' }}>{action} →</button>
    </div>
  );
}

function UsageCard() {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>This month</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <UsageRow label="Generations" used={148} total={400} />
        <UsageRow label="Variants" used={6} total={50} />
        <UsageRow label="Exports" used={22} total={200} />
        <UsageRow label="Repo analyses" used={4} total={10} tone="warn" />
      </div>
      <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 8, fontSize: 11.5, color: 'var(--text-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Studio plan</span>
        <button style={{ color: 'var(--accent)', fontWeight: 500 }}>Manage →</button>
      </div>
    </div>
  );
}

function UsageRow({ label, used, total, tone }) {
  const pct = (used / total) * 100;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: 'var(--text-2)' }}>{label}</span>
        <span className="mono" style={{ color: 'var(--text-3)' }}>{used}<span style={{ opacity: 0.5 }}>/{total}</span></span>
      </div>
      <div style={{ height: 3, background: 'var(--bg-3)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: tone === 'warn' ? 'var(--warn)' : 'var(--accent)' }} />
      </div>
    </div>
  );
}

function ActivityCard() {
  const items = [
    { who: 'You', what: 'exported', target: 'Seen — BF CPP pack', time: '1h', color: 'var(--accent)' },
    { who: 'Shipshot AI', what: 'finished generating', target: 'Otto FR (5 screens)', time: '3h', color: 'var(--violet)' },
    { who: 'Jonas M.', what: 'commented on', target: 'Glide DE · Screen 3', time: 'yesterday', color: 'var(--amber)' },
    { who: 'You', what: 'duplicated', target: 'Lumen → JP variant', time: '2d', color: 'var(--cyan)' },
  ];
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Activity</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12.5 }}>
            <div style={{ width: 22, height: 22, borderRadius: 99, background: 'var(--bg-3)', flexShrink: 0, border: `1.5px solid ${a.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: a.color }}>{a.who[0]}</div>
            <div style={{ flex: 1, color: 'var(--text-2)', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>{a.who}</span> {a.what} <span style={{ color: 'var(--text-1)' }}>{a.target}</span>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{a.time} ago</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TipCard() {
  return (
    <div style={{ padding: 16, borderRadius: 12, background: 'linear-gradient(160deg, var(--bg-2), var(--bg-1))', border: '1px solid var(--border-1)', position: 'relative', overflow: 'hidden' }}>
      <div className="noise" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)', fontSize: 11, fontWeight: 500, letterSpacing: '0.05em', marginBottom: 8 }}><window.I.Bolt /> TIP</div>
      <div style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 10, color: 'var(--text-2)' }}>
        Connect your repo and Shipshot will extract value props, features, and screen flow. Skip the blank prompt.
      </div>
      <button className="btn sm" style={{ gap: 6 }}><window.I.Github /> Connect GitHub</button>
    </div>
  );
}

Object.assign(window, { HomeScreen });
