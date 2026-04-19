/* Mock App Store screenshots — purely CSS/SVG, no images.
   Each renders a phone with a "creative" (headline, feature, lifestyle, stat, cta). */

function ScreenshotCard({ kind = 'headline', template = 't1', app = { name: 'Lumen', icon: 'L', tint: 'oklch(80% 0.12 60)', tint2: 'oklch(65% 0.14 30)' }, width = 180, headline, sub, idx = 0, selected = false }) {
  const h = width * 2.16; // iPhone aspect
  const tmpl = (window.DATA.TEMPLATES.find(t => t.id === template) || window.DATA.TEMPLATES[0]);
  const copy = creativeCopy(kind, app, headline, sub);
  return (
    <div style={{
      width, height: h,
      borderRadius: width * 0.12,
      background: tmpl.bg,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: selected
        ? `0 0 0 2px var(--accent), 0 10px 24px rgba(0,0,0,0.5)`
        : `0 10px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)`,
      fontFamily: tmpl.type === 'mono' ? 'var(--font-mono)' : (tmpl.type === 'serif' ? '"Fraunces","Iowan Old Style","Georgia",serif' : 'var(--font-sans)'),
      color: tmpl.accent,
      transition: 'transform 200ms, box-shadow 200ms',
    }}>
      {/* ambient blob */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(60% 40% at 50% ${kind === 'headline' ? '110%' : '-10%'}, ${app.tint2} 0%, transparent 60%)`,
        opacity: 0.55, mixBlendMode: 'soft-light',
      }} />

      {/* top chrome — app icon + name */}
      <div style={{ padding: width * 0.07, display: 'flex', alignItems: 'center', gap: 6, opacity: 0.9 }}>
        <div style={{ width: width * 0.07, height: width * 0.07, borderRadius: width * 0.02, background: `linear-gradient(135deg, ${app.tint}, ${app.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: width * 0.04 }}>{app.icon}</div>
        <div style={{ fontSize: width * 0.045, fontWeight: 600, letterSpacing: '-0.02em' }}>{app.name}</div>
      </div>

      {/* creative body */}
      <div style={{ padding: `0 ${width * 0.07}px`, marginTop: width * 0.04 }}>
        {kind === 'headline' && (
          <div style={{ fontSize: width * 0.13, lineHeight: 1.02, fontWeight: 700, letterSpacing: '-0.03em', textWrap: 'balance' }}>
            {copy.head}
          </div>
        )}
        {kind === 'feature' && (
          <>
            <div style={{ fontSize: width * 0.095, lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.025em' }}>{copy.head}</div>
            <div style={{ marginTop: width * 0.02, fontSize: width * 0.04, opacity: 0.7 }}>{copy.sub}</div>
          </>
        )}
        {kind === 'stat' && (
          <div>
            <div style={{ fontSize: width * 0.04, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{copy.sub}</div>
            <div style={{ fontSize: width * 0.28, lineHeight: 0.95, fontWeight: 800, letterSpacing: '-0.04em', marginTop: width * 0.02 }}>{copy.head}</div>
          </div>
        )}
        {kind === 'lifestyle' && (
          <div style={{ fontSize: width * 0.075, lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em', fontStyle: tmpl.type === 'serif' ? 'italic' : 'normal' }}>{copy.head}</div>
        )}
        {kind === 'cta' && (
          <>
            <div style={{ fontSize: width * 0.1, lineHeight: 1.05, fontWeight: 700, letterSpacing: '-0.025em' }}>{copy.head}</div>
            <div style={{ marginTop: width * 0.04, fontSize: width * 0.038, opacity: 0.7 }}>{copy.sub}</div>
          </>
        )}
      </div>

      {/* device mock */}
      <div style={{ position: 'absolute', left: width * 0.12, right: width * 0.12, bottom: -width * 0.1, top: width * (kind === 'stat' ? 0.75 : (kind === 'headline' ? 0.55 : 0.62)) }}>
        <FakePhone app={app} kind={kind} tmpl={tmpl} width={width * 0.76} idx={idx} />
      </div>

      {kind === 'cta' && (
        <div style={{
          position: 'absolute', bottom: width * 0.12, left: '50%', transform: 'translateX(-50%)',
          background: tmpl.accent, color: tmpl.type === 'mono' ? '#0a0b0d' : (tmpl.accent === '#fff' ? '#0a0b0d' : '#fff'),
          padding: `${width * 0.03}px ${width * 0.08}px`,
          borderRadius: 999, fontSize: width * 0.04, fontWeight: 600,
          zIndex: 3,
        }}>Get the app</div>
      )}
    </div>
  );
}

function FakePhone({ app, kind, tmpl, width = 140, idx = 0 }) {
  const h = width * 2.06;
  // Draw a tiny stylized iOS app screen
  return (
    <div style={{
      width, height: h, borderRadius: width * 0.16,
      background: '#0a0b0d',
      boxShadow: `0 8px 20px rgba(0,0,0,0.5), inset 0 0 0 3px rgba(255,255,255,0.08)`,
      padding: width * 0.05,
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* notch */}
      <div style={{ position: 'absolute', top: width * 0.03, left: '50%', transform: 'translateX(-50%)', width: width * 0.3, height: width * 0.07, borderRadius: 99, background: '#000', zIndex: 2 }} />

      <div style={{
        width: '100%', height: '100%', borderRadius: width * 0.1,
        background: `linear-gradient(160deg, ${app.tint}, ${app.tint2})`,
        padding: width * 0.06, display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* status */}
        <div style={{ height: width * 0.12 }} />
        {/* app chrome: title + timer-ish visual based on idx */}
        <PhoneScene idx={idx} width={width} app={app} />
      </div>
    </div>
  );
}

function PhoneScene({ idx = 0, width, app }) {
  // Different fake UI per idx
  const variants = [
    // Focus timer dial
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: width * 0.04, color: '#fff', flex: 1, justifyContent: 'center' }}>
        <div style={{ fontSize: width * 0.042, opacity: 0.75, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Deep work</div>
        <div style={{ position: 'relative', width: width * 0.6, height: width * 0.6 }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4"/>
            <circle cx="50" cy="50" r="44" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="276" strokeDashoffset="80" transform="rotate(-90 50 50)"/>
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: width * 0.18, fontWeight: 600, fontFeatureSettings: '"tnum"', letterSpacing: '-0.03em' }}>18:42</div>
            <div style={{ fontSize: width * 0.035, opacity: 0.6 }}>25 min · forest</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: width * 0.03, marginTop: width * 0.02 }}>
          {['25','50','90'].map((m,i) => (
            <div key={m} style={{ padding: `${width*0.015}px ${width*0.04}px`, borderRadius: 99, background: i===0 ? '#fff' : 'rgba(255,255,255,0.12)', color: i===0 ? app.tint2 : '#fff', fontSize: width * 0.035, fontWeight: 600 }}>{m}</div>
          ))}
        </div>
      </div>
    ),
    // Library list
    () => (
      <div style={{ color: '#fff', flex: 1, display: 'flex', flexDirection: 'column', gap: width * 0.02 }}>
        <div style={{ fontSize: width * 0.075, fontWeight: 700, marginBottom: width * 0.03, letterSpacing: '-0.02em' }}>Ambient</div>
        {['Dawn forest','Rain on leaves','Binaural 40hz','Hearth'].map((t,i)=>(
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: width * 0.03, padding: width * 0.02, borderRadius: width * 0.03, background: i === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)' }}>
            <div style={{ width: width * 0.08, height: width * 0.08, borderRadius: width * 0.02, background: `hsl(${i*60+40} 70% 55%)` }} />
            <div style={{ flex: 1, fontSize: width * 0.038, fontWeight: 500 }}>{t}</div>
            <div style={{ fontSize: width * 0.03, opacity: 0.6 }}>{2+i}:{['14','02','49','30'][i]}</div>
          </div>
        ))}
      </div>
    ),
    // Calendar / streak
    () => (
      <div style={{ color: '#fff', flex: 1, display: 'flex', flexDirection: 'column', gap: width * 0.03 }}>
        <div style={{ fontSize: width * 0.075, fontWeight: 700, letterSpacing: '-0.02em' }}>Streak · 24 days</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: width * 0.015 }}>
          {Array.from({ length: 28 }).map((_,i)=> (
            <div key={i} style={{ aspectRatio: 1, borderRadius: width * 0.018, background: i > 22 ? 'rgba(255,255,255,0.1)' : `rgba(255,255,255,${0.25 + Math.random()*0.7})` }} />
          ))}
        </div>
        <div style={{ marginTop: width * 0.03, display: 'flex', gap: width * 0.03 }}>
          <StatBlock label="Sessions" value="132" width={width} />
          <StatBlock label="Hours" value="68" width={width} />
        </div>
      </div>
    ),
    // Today view
    () => (
      <div style={{ color: '#fff', flex: 1, display: 'flex', flexDirection: 'column', gap: width * 0.03 }}>
        <div style={{ fontSize: width * 0.04, opacity: 0.7 }}>Today</div>
        <div style={{ fontSize: width * 0.085, fontWeight: 700, letterSpacing: '-0.02em' }}>Ship the roadmap</div>
        <div style={{ padding: width * 0.04, borderRadius: width * 0.05, background: 'rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: width * 0.02 }}>
          <div style={{ fontSize: width * 0.035, opacity: 0.7 }}>Next session</div>
          <div style={{ fontSize: width * 0.06, fontWeight: 600 }}>50 min · dawn</div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 99 }}><div style={{ width: '42%', height: '100%', background: '#fff', borderRadius: 99 }} /></div>
        </div>
      </div>
    ),
    // Chart
    () => (
      <div style={{ color: '#fff', flex: 1, display: 'flex', flexDirection: 'column', gap: width * 0.04 }}>
        <div style={{ fontSize: width * 0.075, fontWeight: 700, letterSpacing: '-0.02em' }}>This week</div>
        <svg viewBox="0 0 100 50" style={{ width: '100%', flex: 1 }}>
          <path d="M 0 40 C 10 30 20 35 30 25 S 50 10 60 15 S 85 5 100 8" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 40 C 10 30 20 35 30 25 S 50 10 60 15 S 85 5 100 8 L 100 50 L 0 50 Z" fill="rgba(255,255,255,0.15)" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: width * 0.028, opacity: 0.6 }}>
          {['M','T','W','T','F','S','S'].map((d,i)=><div key={i}>{d}</div>)}
        </div>
      </div>
    ),
    // Settings-ish
    () => (
      <div style={{ color: '#fff', flex: 1, display: 'flex', flexDirection: 'column', gap: width * 0.025 }}>
        <div style={{ fontSize: width * 0.075, fontWeight: 700, letterSpacing: '-0.02em' }}>Tonight</div>
        {['Sleep mode','Do not disturb','Auto-start 8pm'].map((t,i)=>(
          <div key={t} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: width * 0.02, borderRadius: width * 0.025, background: 'rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: width * 0.035 }}>{t}</div>
            <div style={{ width: width * 0.09, height: width * 0.05, borderRadius: 99, background: i===2 ? 'rgba(255,255,255,0.25)' : '#fff', display: 'flex', alignItems: 'center', padding: 1, justifyContent: i===2 ? 'flex-start' : 'flex-end' }}>
              <div style={{ width: width * 0.04, height: width * 0.04, borderRadius: 99, background: i===2 ? '#fff' : app.tint2 }} />
            </div>
          </div>
        ))}
      </div>
    ),
  ];
  const V = variants[idx % variants.length];
  return <V />;
}

function StatBlock({ label, value, width }) {
  return (
    <div style={{ flex: 1, padding: width * 0.03, borderRadius: width * 0.04, background: 'rgba(255,255,255,0.1)' }}>
      <div style={{ fontSize: width * 0.03, opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: width * 0.09, fontWeight: 700, letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
}

function creativeCopy(kind, app, headline, sub) {
  const lib = {
    Lumen: {
      headline: { head: 'Finally, deep work that sticks.' },
      feature: { head: 'Presets that match your day', sub: '25 / 50 / 90-minute sessions with ambient packs.' },
      stat: { head: '4.9★', sub: '18,204 focus sessions today' },
      lifestyle: { head: '“I ship on the days I use Lumen.”' },
      cta: { head: 'Start your first 25.', sub: 'Free · no account needed.' },
    },
    Glide: {
      headline: { head: 'Your pickleball coach, in your pocket.' },
      feature: { head: 'Drills that adapt to your level', sub: 'Daily plans, on-court or at home.' },
      stat: { head: '+42%', sub: 'Dink accuracy after 2 weeks' },
      lifestyle: { head: '“Played my first 3.5 tournament last month.”' },
      cta: { head: 'Get on court this week.', sub: '7-day free trial.' },
    },
    Breadcrumb: {
      headline: { head: 'The trip, without the scrolling.' },
      feature: { head: 'Works offline, remembers everything', sub: 'Drop a photo, write a line, move on.' },
      stat: { head: '120k', sub: 'Trips saved on Breadcrumb' },
      lifestyle: { head: '“Like a film journal, but for travel.”' },
      cta: { head: 'Start your next trip.', sub: 'Free forever.' },
    },
    Seen: {
      headline: { head: 'The reading list you actually open.' },
      feature: { head: 'See covers, not just links', sub: 'Drag in a URL, get a shelf.' },
      stat: { head: '50%', sub: 'Off first year · ends Monday' },
      lifestyle: { head: '“My bookshelf, but for the internet.”' },
      cta: { head: 'Build your shelf.', sub: 'Import from Safari, Pocket, Instapaper.' },
    },
    Otto: {
      headline: { head: 'Scan once. Pantry, sorted.' },
      feature: { head: 'Family-friendly lists', sub: 'Share with a partner, kids, a sitter.' },
      stat: { head: '3×', sub: 'Faster than typing it in' },
      lifestyle: { head: '“Sunday shop, done in 10.”' },
      cta: { head: 'Try Otto free.', sub: 'No ads. No inventory nonsense.' },
    },
  };
  const base = (lib[app.name] || lib.Lumen)[kind] || { head: 'Your app, worth opening.', sub: '' };
  return { head: headline || base.head, sub: sub || base.sub };
}

Object.assign(window, { ScreenshotCard, FakePhone, PhoneScene });
