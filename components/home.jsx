/* Marketing landing */

const PRODUCT_FEATURE_GROUPS = [
  {
    title: 'Discovery',
    items: [
      { id: 'discover-opportunities', label: 'Discover Opportunities', detail: 'Surface whitespace, weak categories, and app-growth opportunities.' },
      { id: 'explore-apps', label: 'Explore Apps', detail: 'Search the landscape and inspect players, listings, and product signals.' },
      { id: 'market-insights', label: 'Market Insights', detail: 'Turn broad category movement into a clearer strategic read.' },
      { id: 'hot-app-ideas', label: 'Hot App Ideas', detail: 'Spot promising directions before you commit product effort.' },
    ],
  },
  {
    title: 'Analyze',
    items: [
      { id: 'keyword-explorer', label: 'Keyword Explorer', detail: 'Expand keywords, intent, and demand from one place.' },
      { id: 'aso-analyzer', label: 'ASO Analyzer', detail: 'Review metadata quality, screenshots, reviews, and listing health.' },
      { id: 'reviews', label: 'Reviews Intelligence', detail: 'Extract pain points, claims, and user language from reviews.' },
      { id: 'rank-history', label: 'Rank History', detail: 'Track movement and visibility across terms and time.' },
      { id: 'competitors', label: 'Competitors', detail: 'See positioning pressure, creative patterns, and market overlap.' },
    ],
  },
  {
    title: 'Track & Create',
    items: [
      { id: 'app-tracking', label: 'App Tracking', detail: 'Keep tracked apps and their core signals aligned in one workspace.' },
      { id: 'pricing-calculator', label: 'Pricing Calculator', detail: 'Model international pricing and package framing decisions.' },
      { id: 'revenue-insights', label: 'Revenue Insights', detail: 'Connect monetization thinking back to positioning and offers.' },
      { id: 'screenshot-generator', label: 'Screenshot Generator', detail: 'Create screenshot directions and projects from app context.' },
      { id: 'idea-validator', label: 'Idea Validator', detail: 'Validate a concept before turning it into a project.' },
      { id: 'ai-agents', label: 'AI Agents', detail: 'Use guided automation to move from insight to action faster.' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { id: 'my-apps', label: 'My Apps', detail: 'Keep your source apps and metadata anchored in the same place.' },
      { id: 'my-projects', label: 'My Projects', detail: 'Turn insights into screenshot, launch, and creative workstreams.' },
      { id: 'creative-systems', label: 'Creative Systems', detail: 'Reuse patterns, layouts, and design directions consistently.' },
      { id: 'exports', label: 'Exports', detail: 'Package outputs for delivery instead of leaving them in drafts.' },
    ],
  },
];

const SOLUTION_PATHS = [
  { id: 'launches', label: 'New app launches', detail: 'Go from raw concept to validation, positioning, screenshots, and first listing system.' },
  { id: 'aso-refresh', label: 'ASO refreshes', detail: 'Rework metadata, reviews, visuals, and category language around a sharper listing.' },
  { id: 'creative-production', label: 'Creative production', detail: 'Turn research and product context into screenshot systems and projects.' },
  { id: 'competitive-research', label: 'Competitive research', detail: 'Compare rivals, messaging pressure, proof strategies, and whitespace.' },
  { id: 'pricing-expansion', label: 'Pricing & expansion', detail: 'Model pricing logic and localization decisions before rollout.' },
  { id: 'team-workflow', label: 'Team workflow', detail: 'Keep growth, strategy, and creative teams aligned on the same source of truth.' },
];

const SITE_NAV_LINKS = [
  { id: 'product', label: 'Product', items: PRODUCT_FEATURE_GROUPS.flatMap((group) => group.items) },
  { id: 'solution', label: 'Solution', items: SOLUTION_PATHS },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

const SITE_LOGOS = ['Northstar', 'Velora', 'Framekit', 'Juniper', 'Monark'];

const SITE_WHY_CARDS = [
  {
    title: 'Signal Research',
    body: 'Turn scattered market clues into a readable view of demand, pressure, and opportunity before choosing what to build next.',
    metric: 'Demand clarity',
    value: '92%',
  },
  {
    title: 'Narrative Systems',
    body: 'Shape sharper messaging, proof, and positioning so strategy does not get lost between research and launch.',
    metric: 'Message lift',
    value: '+34%',
  },
  {
    title: 'Execution Flow',
    body: 'Move from insight to pages, offers, and commercial assets in one system instead of rebuilding context across tools.',
    metric: 'Faster shipping',
    value: '3x',
  },
];

const SITE_TOOL_TABS = [
  {
    id: 'positioning',
    label: 'Positioning',
    title: 'Sharper positioning, before the launch gets expensive',
    body: 'Signal clarifies who you are for, what angle wins, and where your message still feels interchangeable.',
    mode: 'positioning',
  },
  {
    id: 'messaging',
    label: 'Messaging',
    title: 'Build a consistent message across pages and offers',
    body: 'Keep headlines, proof, objections, and call-to-action logic aligned around one commercial narrative.',
    mode: 'messaging',
  },
  {
    id: 'pricing',
    label: 'Pricing',
    title: 'Pressure-test pricing before it becomes guesswork',
    body: 'Compare value framing, package ladders, and monetization logic from the same workspace.',
    mode: 'pricing',
  },
];

const SITE_CORE_FEATURES = [
  { title: 'Market Mapping', body: 'See where the category is crowded, weak, or wide open.' },
  { title: 'Message Architecture', body: 'Shape a clearer hierarchy for pages, campaigns, and launches.' },
  { title: 'Offer Design', body: 'Make packaging and pricing feel intentional instead of improvised.' },
  { title: 'Proof Systems', body: 'Turn evidence, reviews, and claims into credible conversion assets.' },
  { title: 'Launch Readiness', body: 'Spot what is still vague before teams commit design and growth effort.' },
  { title: 'Delivery Handoff', body: 'Keep creative, growth, and stakeholders aligned on the same source of truth.' },
];

const SITE_ANALYTICS_TABS = [
  {
    id: 'signal',
    label: 'Signal Summary',
    title: 'A readable executive layer for what changed and what to do next.',
    mode: 'summary',
  },
  {
    id: 'pages',
    label: 'Page Review',
    title: 'See which sections, claims, and proof blocks still weaken conversion momentum.',
    mode: 'pages',
  },
  {
    id: 'offers',
    label: 'Offer Review',
    title: 'Compare packages, plan framing, and call-to-action strength without leaving the same system.',
    mode: 'offers',
  },
];

const SITE_TESTIMONIALS = [
  { type: 'stat', value: '41%', label: 'faster page iterations' },
  {
    type: 'quote',
    quote: 'Signal gave us a cleaner story, a better offer structure, and far less debate between strategy and design.',
    author: 'Lina Morel',
    role: 'Growth Lead, Vanta Studio',
    dark: true,
  },
  { type: 'stat', value: '$12M', label: 'pipeline influenced by pages rebuilt with clearer positioning' },
  { type: 'stat', value: '2.8x', label: 'more aligned launch reviews across teams' },
  {
    type: 'quote',
    quote: 'It feels like the missing commercial layer between research, copy, offers, and the final page.',
    author: 'Marc Delon',
    role: 'Founder, Northstar Labs',
  },
];

const SITE_FAQ = [
  {
    q: 'What does Signal actually replace?',
    a: 'Signal replaces scattered research docs, fragmented messaging notes, rough pricing experiments, and static page briefs with one connected commercial workspace.',
  },
  {
    q: 'Who is Signal for?',
    a: 'It is built for founders, growth teams, strategists, and creative operators who need better commercial clarity before launch and scaling decisions.',
  },
  {
    q: 'Is this only for landing pages?',
    a: 'No. Pages are one output. Signal is designed to improve the thinking behind positioning, proof, offers, and how teams ship them.',
  },
  {
    q: 'Can I open the marketing site outside the product UI?',
    a: 'Yes. The sidebar button opens this marketing site in a standalone tab, separate from the workspace shell.',
  },
];

function resolveMarketingVideo() {
  const configured = window.__SIGNAL_MARKETING_VIDEO__ || null;
  if (typeof configured === 'string' && configured.trim()) {
    return { kind: configured.includes('youtube') || configured.includes('vimeo') || configured.includes('loom') ? 'embed' : 'video', src: configured.trim() };
  }
  if (configured && typeof configured === 'object' && configured.src) {
    return {
      kind: configured.kind || configured.type || 'video',
      src: configured.src,
      title: configured.title || 'Signal overview',
      poster: configured.poster || '',
    };
  }
  return {
    kind: 'video',
    src: '/assets/signal-demo.mp4',
    title: 'Signal overview',
    poster: '',
  };
}

function normalizeEmbedUrl(source) {
  if (!source) return '';
  if (source.includes('youtube.com/watch?v=')) {
    const url = new URL(source);
    const id = url.searchParams.get('v');
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : source;
  }
  if (source.includes('youtu.be/')) {
    const id = source.split('youtu.be/')[1]?.split('?')[0];
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : source;
  }
  if (source.includes('vimeo.com/') && !source.includes('/video/')) {
    const id = source.split('vimeo.com/')[1]?.split('?')[0];
    return id ? `https://player.vimeo.com/video/${id}` : source;
  }
  if (source.includes('loom.com/share/')) {
    return source.replace('loom.com/share/', 'loom.com/embed/');
  }
  return source;
}

function scrollToSection(id) {
  const node = document.getElementById(id);
  if (!node) return;
  node.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openStandaloneSite() {
  const url = new URL(window.location.href);
  url.searchParams.delete('editor');
  url.searchParams.delete('projectId');
  url.searchParams.delete('tab');
  url.searchParams.set('site', '1');
  window.open(url.toString(), '_blank', 'noopener,noreferrer');
}

function readMarketingLocation() {
  try {
    const url = new URL(window.location.href);
    return {
      page: url.searchParams.get('sitePage') || 'home',
      focus: url.searchParams.get('siteFocus') || '',
    };
  } catch {
    return { page: 'home', focus: '' };
  }
}

function writeMarketingLocation(page, focus = '') {
  const url = new URL(window.location.href);
  if (!page || page === 'home') {
    url.searchParams.delete('sitePage');
  } else {
    url.searchParams.set('sitePage', page);
  }
  if (focus) {
    url.searchParams.set('siteFocus', focus);
  } else {
    url.searchParams.delete('siteFocus');
  }
  window.history.pushState({}, '', url.toString());
}

function enterWorkspace() {
  const url = new URL(window.location.href);
  url.searchParams.delete('site');
  url.searchParams.delete('sitePage');
  url.searchParams.delete('siteFocus');
  window.location.href = url.toString();
}

function CountUpText({ value, duration = 1400, className = '' }) {
  const ref = React.useRef(null);
  const [displayValue, setDisplayValue] = React.useState(() => String(value));
  const [started, setStarted] = React.useState(false);

  const parsed = React.useMemo(() => {
    const raw = String(value).trim();
    const match = raw.match(/^([^0-9+-]*)([+-]?)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return null;
    return {
      prefix: `${match[1] || ''}${match[2] || ''}`,
      numeric: Number.parseFloat(match[3]),
      decimals: (match[3].split('.')[1] || '').length,
      suffix: match[4] || '',
    };
  }, [value]);

  React.useEffect(() => {
    if (!parsed || started) return undefined;
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      });
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [parsed, started]);

  React.useEffect(() => {
    if (!parsed || !started) {
      setDisplayValue(String(value));
      return undefined;
    }

    let frameId = 0;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.numeric * eased;
      const formatted = parsed.decimals > 0 ? current.toFixed(parsed.decimals) : String(Math.round(current));
      setDisplayValue(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };
    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [parsed, started, duration, value]);

  return <span ref={ref} className={className}>{displayValue}</span>;
}

function SignalMarketingVideo() {
  const [errored, setErrored] = React.useState(false);
  const video = resolveMarketingVideo();
  const embedSrc = video.kind === 'embed' ? normalizeEmbedUrl(video.src) : '';

  return (
    <div className="signal-site__video-shell js-reveal">
      <div className="signal-site__video-topbar">
        <span className="signal-site__video-pill">Product walkthrough</span>
        <span className="signal-site__video-meta"><CountUpText value="2" /> min overview</span>
      </div>

      <div className="signal-site__video-frame">
        {!errored && video.kind === 'embed' && embedSrc ? (
          <iframe
            src={embedSrc}
            title={video.title || 'Signal video'}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : null}

        {!errored && video.kind !== 'embed' ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster={video.poster || undefined}
            onError={() => setErrored(true)}
          >
            <source src={video.src} />
          </video>
        ) : null}

        {(errored || !video.src) ? (
          <div className="signal-site__video-fallback">
            <div className="signal-site__video-fallback-icon"><window.I.Play /></div>
            <strong>Video integration ready</strong>
            <span>Set `window.__SIGNAL_MARKETING_VIDEO__` to a `MP4`, `Loom`, `Vimeo`, or `YouTube` source to replace this fallback.</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SiteTopbar({ standalone = false, setRoute, onNavigateMarketing }) {
  const [openMenu, setOpenMenu] = React.useState(null);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const navigateToMarketing = (page, focus = '') => {
    writeMarketingLocation(page, focus);
    onNavigateMarketing?.(page, focus);
    setOpenMenu(null);
  };

  return (
    <header ref={rootRef} className="signal-site__topbar">
      <div className="signal-site__nav-shell">
        <button className="signal-site__brand" onClick={() => scrollToSection('hero')}>
          <span className="signal-site__brand-mark">S</span>
          <span>Signal</span>
        </button>
        <nav className="signal-site__nav">
          {SITE_NAV_LINKS.map((item) => (
            <div key={item.id} className="signal-site__nav-item">
              <button
                className={`signal-site__nav-trigger${openMenu === item.id ? ' is-open' : ''}`}
                onClick={() => {
                  if (item.items) {
                    setOpenMenu((value) => value === item.id ? null : item.id);
                    return;
                  }
                  if (item.id === 'pricing' || item.id === 'contact') {
                    navigateToMarketing('home', item.id);
                    return;
                  }
                  scrollToSection(item.id);
                }}
              >
                <span>{item.label}</span>
                {item.items ? <window.I.ChevronD style={{ width: 14, height: 14 }} /> : null}
              </button>
              {item.items && openMenu === item.id ? (
                item.id === 'product' ? (
                  <div className="signal-site__nav-dropdown signal-site__nav-dropdown--product">
                    {PRODUCT_FEATURE_GROUPS.map((group) => (
                      <div key={group.title} className="signal-site__nav-dropdown-col">
                        <div className="signal-site__nav-dropdown-title">{group.title}</div>
                        {group.items.map((entry) => (
                          <button
                            key={entry.id}
                            className="signal-site__nav-dropdown-item"
                            onClick={() => {
                              navigateToMarketing(item.id, entry.id);
                            }}
                          >
                            <strong>{entry.label}</strong>
                            <span>{entry.detail}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="signal-site__nav-dropdown">
                    {item.items.map((entry) => (
                      <button
                        key={entry.id}
                        className="signal-site__nav-dropdown-item"
                        onClick={() => {
                          navigateToMarketing(item.id, entry.id);
                        }}
                      >
                        <strong>{entry.label}</strong>
                        <span>{entry.detail}</span>
                      </button>
                    ))}
                  </div>
                )
              ) : null}
            </div>
          ))}
        </nav>
        <div className="signal-site__nav-actions">
          {!standalone ? <button className="signal-site__link-btn" onClick={() => setRoute?.({ screen: 'settings' })}>Login</button> : null}
          <button className="signal-site__cta-btn" onClick={standalone ? enterWorkspace : openStandaloneSite}>Get a Demo</button>
        </div>
      </div>
    </header>
  );
}

function MarketingMockup({ mode }) {
  if (mode === 'pricing') {
    return (
      <div className="signal-site__mock-window">
      <div className="signal-site__mock-window-head">
        <span>Offer ladder</span>
        <span>Updated <CountUpText value="2" />m ago</span>
      </div>
        <div className="signal-site__pricing-mock-grid">
          <div className="signal-site__pricing-mock-card">
            <div className="signal-site__pricing-mock-name">Starter</div>
            <div className="signal-site__pricing-mock-price">€29</div>
            <div className="signal-site__pricing-mock-copy">Simple entry point for focused teams.</div>
          </div>
          <div className="signal-site__pricing-mock-card signal-site__pricing-mock-card--accent">
            <div className="signal-site__pricing-mock-badge">Best fit</div>
            <div className="signal-site__pricing-mock-name">Growth</div>
            <div className="signal-site__pricing-mock-price">€89</div>
            <div className="signal-site__pricing-mock-copy">Best for commercial systems, offers, and launch execution.</div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'messaging') {
    return (
      <div className="signal-site__mock-window">
      <div className="signal-site__mock-window-head">
        <span>Message architecture</span>
        <span><CountUpText value="6" /> proof blocks</span>
      </div>
        <div className="signal-site__message-mock">
          <div className="signal-site__message-line signal-site__message-line--xl" />
          <div className="signal-site__message-line signal-site__message-line--md" />
          <div className="signal-site__message-grid">
            <div className="signal-site__message-note">
              <strong>Primary claim</strong>
              <span>Sharper promise with a clearer buyer outcome.</span>
            </div>
            <div className="signal-site__message-note">
              <strong>Proof</strong>
              <span>Customer evidence and commercial credibility where it matters.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signal-site__mock-window">
      <div className="signal-site__mock-window-head">
        <span>Market view</span>
        <span><CountUpText value="12" /> active signals</span>
      </div>
      <div className="signal-site__chart">
        <div className="signal-site__chart-bars">
          <span style={{ height: '36%' }} />
          <span style={{ height: '52%' }} />
          <span style={{ height: '68%' }} />
          <span style={{ height: '58%' }} />
          <span style={{ height: '84%' }} />
          <span style={{ height: '74%' }} />
        </div>
        <div className="signal-site__chart-summary">
          <div>
            <strong>Clear whitespace</strong>
            <span>Opportunity around commercial clarity and proof quality.</span>
          </div>
          <div>
            <strong>Pressure zone</strong>
            <span>Competitors cluster around the same generic message.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsMock({ mode }) {
  if (mode === 'pages') {
    return (
      <div className="signal-site__analytics-mock">
        <div className="signal-site__analytics-toolbar">
          <span className="signal-site__tag">Live review</span>
          <span>Landing page audit</span>
        </div>
        <div className="signal-site__analytics-table">
          {[
            ['Hero promise', 'Strong', 'Clear but too generic'],
            ['Proof block', 'Weak', 'Needs sharper evidence'],
            ['Pricing CTA', 'Medium', 'Plan framing still unclear'],
            ['FAQ', 'Strong', 'Good objection handling'],
          ].map(([name, tone, note]) => (
            <div key={name} className="signal-site__analytics-row">
              <span>{name}</span>
              <span>{tone}</span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'offers') {
    return (
      <div className="signal-site__analytics-mock">
        <div className="signal-site__offer-grid">
          <div className="signal-site__offer-card">
            <strong>Starter</strong>
            <span>Better entry price, weaker differentiation.</span>
          </div>
          <div className="signal-site__offer-card signal-site__offer-card--accent">
            <strong>Growth</strong>
            <span>Best margin and clearest commercial story.</span>
          </div>
          <div className="signal-site__offer-card">
            <strong>Studio</strong>
            <span>Strong perceived value, needs clearer scope language.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signal-site__analytics-mock">
      <div className="signal-site__summary-grid">
        <div className="signal-site__summary-card">
          <strong>Story drift</strong>
          <span>Pages and pricing are not reinforcing the same promise.</span>
        </div>
        <div className="signal-site__summary-card">
          <strong>Proof gap</strong>
          <span>Value claims outpace evidence across the current page.</span>
        </div>
        <div className="signal-site__summary-card">
          <strong>Next move</strong>
          <span>Rebuild hero, pricing framing, and testimonial order first.</span>
        </div>
      </div>
    </div>
  );
}

function ProductOverviewPage({ focusId }) {
  return (
    <div className="signal-site__subpage">
      <section className="signal-site__subhero js-reveal">
        <div className="signal-site__eyebrow signal-site__eyebrow--light">Product overview</div>
        <h1>The full Signal platform, explained through the jobs teams actually need done.</h1>
        <p>
          Signal is not one feature with a long tail of add-ons. It is a connected workspace that helps teams discover opportunities,
          diagnose what matters, create stronger assets, and ship with clearer alignment.
        </p>
      </section>

      {PRODUCT_FEATURE_GROUPS.map((group, groupIndex) => (
        <section key={group.title} className={`signal-site__product-band js-reveal${groupIndex % 2 === 1 ? ' is-reversed' : ''}`}>
          <div className="signal-site__product-band-copy">
            <div className="signal-site__eyebrow signal-site__eyebrow--light">{group.title}</div>
            <h2>{group.title} is where teams {groupIndex === 0 ? 'find the opportunity' : groupIndex === 1 ? 'understand what is weak' : groupIndex === 2 ? 'turn insight into execution' : 'keep the whole system aligned'}.</h2>
            <p>
              {group.title === 'Discovery' && 'Use these surfaces to scan the market, inspect the landscape, and identify where a listing, idea, or category still has room to win.'}
              {group.title === 'Analyze' && 'This is the diagnostic layer: keywords, ASO, reviews, ranks, and competitors become one readable set of signals instead of separate opinions.'}
              {group.title === 'Track & Create' && 'When the direction is clear, Signal helps teams monitor important movement and convert strategy into screenshots, projects, and monetization decisions.'}
              {group.title === 'Workspace' && 'The workspace layer keeps apps, projects, systems, and exports tied together so execution does not drift after the strategy is decided.'}
            </p>
          </div>
          <div className="signal-site__product-band-grid">
            {group.items.map((item) => (
              <article key={item.id} id={item.id} className={`signal-site__feature-catalog-card${focusId === item.id ? ' is-focused' : ''}`}>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SolutionOverviewPage({ focusId }) {
  return (
    <div className="signal-site__subpage">
      <section className="signal-site__subhero js-reveal">
        <div className="signal-site__eyebrow signal-site__eyebrow--light">Solution overview</div>
        <h1>Use Signal for the full commercial workflow, not just one isolated task.</h1>
        <p>
          Whether you are validating a new concept, refreshing an App Store presence, producing screenshot systems, or aligning a
          growth team, Signal gives each workflow a clearer path from insight to output.
        </p>
      </section>

      <section className="signal-site__subsection js-reveal">
        <div className="signal-site__subsection-head">
          <div className="signal-site__eyebrow signal-site__eyebrow--light">Use cases</div>
          <h2>Different workflows. One commercial system.</h2>
          <p>Signal adapts to the real scenario in front of the team instead of forcing everyone through the same generic playbook.</p>
        </div>
        <div className="signal-site__solution-journey">
          {SOLUTION_PATHS.map((item, index) => (
            <article key={item.id} id={item.id} className={`signal-site__solution-journey-card${focusId === item.id ? ' is-focused' : ''}`}>
              <div className="signal-site__solution-journey-meta">
                <span className="signal-site__solution-step">0{index + 1}</span>
                <strong>{item.label}</strong>
              </div>
              <div className="signal-site__solution-journey-body">
                <p>{item.detail}</p>
                <div className="signal-site__solution-outcome">Best when you need clearer direction, tighter execution, and less back-and-forth between strategy and production.</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MarketingLanding({ standalone = false, setRoute }) {
  const [activeTool, setActiveTool] = React.useState('positioning');
  const [activeAnalytics, setActiveAnalytics] = React.useState('signal');
  const [yearly, setYearly] = React.useState(true);
  const [openFaq, setOpenFaq] = React.useState(SITE_FAQ[0]?.q || null);
  const initialMarketingLocation = React.useMemo(() => readMarketingLocation(), []);
  const [marketingPage, setMarketingPage] = React.useState(initialMarketingLocation.page);
  const [marketingFocus, setMarketingFocus] = React.useState(initialMarketingLocation.focus);

  const activeToolData = SITE_TOOL_TABS.find((item) => item.id === activeTool) || SITE_TOOL_TABS[0];
  const activeAnalyticsData = SITE_ANALYTICS_TABS.find((item) => item.id === activeAnalytics) || SITE_ANALYTICS_TABS[0];

  React.useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.js-reveal'));
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const handlePopState = () => {
      const next = readMarketingLocation();
      setMarketingPage(next.page);
      setMarketingFocus(next.focus);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleMarketingNavigate = (page, focus = '') => {
    setMarketingPage(page || 'home');
    setMarketingFocus(focus || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (!marketingFocus) return;
    const id = window.setTimeout(() => {
      const target = document.getElementById(marketingFocus);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (marketingPage === 'home') {
        scrollToSection(marketingFocus);
      }
    }, 80);
    return () => window.clearTimeout(id);
  }, [marketingPage, marketingFocus]);

  return (
    <div className={`signal-site signal-site--light${standalone ? ' signal-site--standalone' : ''}`}>
      <div className="signal-site__paper-grid" />
      <SiteTopbar standalone={standalone} setRoute={setRoute} onNavigateMarketing={handleMarketingNavigate} />

      <main className="signal-site__main">
        {marketingPage === 'product' ? (
          <ProductOverviewPage focusId={marketingFocus} />
        ) : marketingPage === 'solution' ? (
          <SolutionOverviewPage focusId={marketingFocus} />
        ) : (
          <>
        <section id="hero" className="signal-site__hero signal-site__hero--centered js-reveal">
          <div className="signal-site__eyebrow signal-site__eyebrow--light">Trusted by modern growth teams</div>
          <h1>Turn market noise into sharper positioning, pages, and pricing.</h1>
          <p>
            Signal is the commercial workspace for teams who need cleaner decisions before they commit design,
            launches, campaigns, and monetization bets.
          </p>
          <div className="signal-site__hero-actions signal-site__hero-actions--center">
            <button className="signal-site__cta-btn signal-site__cta-btn--lg" onClick={() => scrollToSection('pricing')}>Start 14-day trial</button>
            <span className="signal-site__hero-note">No credit card required</span>
          </div>

          <div className="signal-site__hero-frame">
            <SignalMarketingVideo />
          </div>
        </section>

        <section className="signal-site__logos js-reveal">
          <div className="signal-site__logos-title">Trusted by founders, growth operators, and strategy teams</div>
          <div className="signal-site__logos-row">
            {SITE_LOGOS.map((logo) => <span key={logo}>{logo}</span>)}
          </div>
        </section>

        <section id="product" className="signal-site__section js-reveal">
          <div className="signal-site__section-head signal-site__section-head--center">
            <div className="signal-site__eyebrow signal-site__eyebrow--light">Power pack</div>
            <h2>Why teams choose Signal</h2>
            <p>Signal simplifies the commercial layer between research, positioning, pricing, and the final page.</p>
          </div>
          <div className="signal-site__why-grid">
            {SITE_WHY_CARDS.map((card, index) => (
              <article key={card.title} className="signal-site__why-card js-reveal" style={{ '--reveal-delay': `${index * 80}ms` }}>
                <div className="signal-site__why-metric">
                  <strong><CountUpText value={card.value} /></strong>
                  <span>{card.metric}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="solution" className="signal-site__section signal-site__section--tools js-reveal">
          <div className="signal-site__tools-layout">
            <div className="signal-site__tools-copy">
              <div className="signal-site__eyebrow signal-site__eyebrow--light">Key tools</div>
              <h2>Commercial AI that moves launches forward faster.</h2>
              <div className="signal-site__tool-tabs">
                {SITE_TOOL_TABS.map((tab) => (
                  <button key={tab.id} className={activeTool === tab.id ? 'is-active' : ''} onClick={() => setActiveTool(tab.id)}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="signal-site__tools-panel">
              <h3>{activeToolData.title}</h3>
              <p>{activeToolData.body}</p>
              <MarketingMockup mode={activeToolData.mode} />
            </div>
          </div>
        </section>

        <section id="features" className="signal-site__section signal-site__section--dark js-reveal">
          <div className="signal-site__dark-wrap">
            <div className="signal-site__section-head signal-site__section-head--center">
              <div className="signal-site__eyebrow">Core features</div>
              <h2>What’s inside Signal?</h2>
              <p>The product is built to make commercial decisions feel sharper, faster, and more connected.</p>
            </div>
            <div className="signal-site__core-grid">
              {SITE_CORE_FEATURES.map((feature, index) => (
                <article key={feature.title} className="signal-site__core-card js-reveal" style={{ '--reveal-delay': `${index * 70}ms` }}>
                  <div className="signal-site__core-icon" />
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="analytics" className="signal-site__section js-reveal">
          <div className="signal-site__section-head signal-site__section-head--center">
            <h2>Advanced analytics and reporting</h2>
            <p>Not just charts. A clearer explanation of what changed, what matters, and what to fix next.</p>
          </div>
          <div className="signal-site__analytics-tabs">
            {SITE_ANALYTICS_TABS.map((tab) => (
              <button key={tab.id} className={activeAnalytics === tab.id ? 'is-active' : ''} onClick={() => setActiveAnalytics(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="signal-site__analytics-panel">
            <div className="signal-site__analytics-copy">
              <h3>{activeAnalyticsData.title}</h3>
            </div>
            <AnalyticsMock mode={activeAnalyticsData.mode} />
          </div>
        </section>

        <section id="reviews" className="signal-site__section js-reveal">
          <div className="signal-site__section-head signal-site__section-head--center">
            <div className="signal-site__eyebrow signal-site__eyebrow--light">Customer reviews</div>
            <h2>Trusted by growing companies worldwide</h2>
          </div>
          <div className="signal-site__testimonial-grid">
            {SITE_TESTIMONIALS.map((item, index) => (
              item.type === 'stat' ? (
                <article key={`${item.value}-${index}`} className="signal-site__testimonial-stat">
                  <strong><CountUpText value={item.value} duration={1600} /></strong>
                  <span>{item.label}</span>
                </article>
              ) : (
                <article key={item.author} className={`signal-site__testimonial-quote${item.dark ? ' is-dark' : ''}`}>
                  <p>"{item.quote}"</p>
                  <div>
                    <strong>{item.author}</strong>
                    <span>{item.role}</span>
                  </div>
                </article>
              )
            ))}
          </div>
        </section>

        <section id="pricing" className="signal-site__section js-reveal">
          <div className="signal-site__section-head signal-site__section-head--center">
            <div className="signal-site__eyebrow signal-site__eyebrow--light">Pricing</div>
            <h2>Choose the plan that matches your team.</h2>
          </div>
          <div className="signal-site__billing-toggle">
            <span className={!yearly ? 'is-active' : ''}>Monthly</span>
            <button className={`signal-site__switch${yearly ? ' is-on' : ''}`} onClick={() => setYearly((value) => !value)}>
              <span />
            </button>
            <span className={yearly ? 'is-active' : ''}>Yearly</span>
            <em>Save 20%</em>
          </div>
          <div className="signal-site__pricing-grid signal-site__pricing-grid--2">
            {[
              {
                name: 'Starter',
                price: yearly ? '€39' : '€49',
                caption: 'Perfect for lean teams getting commercial clarity in place.',
                bullets: ['Commercial research workspace', 'Page and message systems', 'Up to 5 active projects'],
              },
              {
                name: 'Growth',
                price: yearly ? '€79' : '€99',
                caption: 'For teams that want Signal across positioning, pages, and offers.',
                bullets: ['Unlimited projects', 'Advanced pricing and proof workflows', 'Priority support and exports'],
                featured: true,
              },
            ].map((plan) => (
              <article key={plan.name} className={`signal-site__price-card${plan.featured ? ' is-featured' : ''}`}>
                {plan.featured ? <div className="signal-site__price-badge">Most popular</div> : null}
                <h3>{plan.name}</h3>
                <p>{plan.caption}</p>
                <div className="signal-site__price-value"><CountUpText value={plan.price} duration={1500} /><small>/mo</small></div>
                <button className={plan.featured ? 'signal-site__cta-btn' : 'signal-site__outline-btn'}>Start 14-day trial</button>
                <ul>
                  {plan.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="signal-site__section js-reveal">
          <div className="signal-site__faq-layout">
            <div>
              <div className="signal-site__eyebrow signal-site__eyebrow--light">FAQ</div>
              <h2>Frequently asked questions</h2>
              <p className="signal-site__faq-intro">Get clear answers before you commit your team to a new commercial system.</p>
            </div>
            <div className="signal-site__faq-list">
              {SITE_FAQ.map((item) => {
                const isOpen = openFaq === item.q;
                return (
                  <article key={item.q} className={`signal-site__faq-item${isOpen ? ' is-open' : ''}`}>
                    <button onClick={() => setOpenFaq(isOpen ? null : item.q)}>
                      <span>{item.q}</span>
                      <span>{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen ? <p>{item.a}</p> : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="signal-site__section signal-site__section--cta js-reveal">
          <div className="signal-site__final-cta">
            <h2>Try Signal free for 14 days</h2>
            <p>Start building a clearer commercial system for your launches, pages, and offers today.</p>
            <button className="signal-site__cta-btn signal-site__cta-btn--lg">Get 14 Days Free Trial</button>
          </div>
          <footer className="signal-site__footer">
            <div className="signal-site__footer-brand">
              <div className="signal-site__brand">
                <span className="signal-site__brand-mark">S</span>
                <span>Signal</span>
              </div>
              <p>Signal helps teams move from research noise to sharper positioning, pricing, and launch execution.</p>
            </div>
            <div className="signal-site__footer-columns">
              <div>
                <strong>Product</strong>
                <span>Research</span>
                <span>Messaging</span>
                <span>Pricing</span>
              </div>
              <div>
                <strong>Resources</strong>
                <span>Case studies</span>
                <span>Guides</span>
                <span>Contact</span>
              </div>
              <div>
                <strong>Company</strong>
                <span>About</span>
                <span>Privacy</span>
                <span>Terms</span>
              </div>
            </div>
          </footer>
        </section>
          </>
        )}
      </main>
    </div>
  );
}

function HomeScreen({ setRoute }) {
  return <MarketingLanding setRoute={setRoute} />;
}

Object.assign(window, { HomeScreen, MarketingLanding, openStandaloneSite });
