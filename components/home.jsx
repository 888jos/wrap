/* Marketing landing for Signal - App Growth Workspace */

const PRODUCT_CATEGORIES = [
  {
    id: 'discover',
    label: 'Discover',
    items: [
      { id: 'trending', label: 'Trending Apps', detail: 'See what\'s rising in the charts' },
      { id: 'hot-ideas', label: 'Hot Ideas', detail: 'Find validated app concepts' },
      { id: 'idea-validator', label: 'Idea Validator', detail: 'Test ideas before building' },
    ],
  },
  {
    id: 'analyze',
    label: 'Analyze',
    items: [
      { id: 'keyword-explorer', label: 'Keyword Explorer', detail: 'Expand and track search terms' },
      { id: 'aso-analyzer', label: 'ASO Analyzer', detail: 'Review metadata and listing health' },
      { id: 'competitors', label: 'Competitor Analysis', detail: 'Benchmark against rivals' },
      { id: 'reviews', label: 'Reviews', detail: 'Extract pain points from users' },
    ],
  },
  {
    id: 'track',
    label: 'Track',
    items: [
      { id: 'app-tracking', label: 'App Tracking', detail: 'Monitor rankings and visibility' },
      { id: 'rank-history', label: 'Rank History', detail: 'Track performance over time' },
      { id: 'market-insights', label: 'Market Insights', detail: 'Understand market trends' },
    ],
  },
  {
    id: 'create',
    label: 'Create',
    items: [
      { id: 'screenshots', label: 'Screenshot Generator', detail: 'Create store visuals' },
      { id: 'my-projects', label: 'Projects', detail: 'Turn insights into deliverables' },
      { id: 'templates', label: 'Creative Systems', detail: 'Design templates and themes' },
    ],
  },
];

const USE_CASES = [
  { id: 'find-idea', label: 'Find your next app idea', detail: 'Validate concepts before investing development time.' },
  { id: 'grow-ranking', label: 'Grow your App Store ranking', detail: 'Target the right keywords and outperform competitors.' },
  { id: 'optimize-screenshots', label: 'Optimize your screenshots', detail: 'Understand what converts and rebuild your store presence.' },
  { id: 'analyze-competitors', label: 'Analyze competitors', detail: 'See what they do well, where they fail, and how to win.' },
];

const WHY_CARDS = [
  {
    title: 'Find real opportunities',
    body: 'Spot keywords you can actually rank for. Identify gaps your competitors missed. Validate ideas before you build.',
  },
  {
    title: 'Understand your market',
    body: 'Track rankings, competitors, and reviews. See what works — and what doesn\'t. Focus on what moves installs.',
  },
  {
    title: 'Ship faster',
    body: 'Generate screenshots, assets, and ASO updates. Turn insights into real projects. Go from idea to execution in one flow.',
  },
];

const HOW_IT_WORKS_STEPS = [
  { number: '1', title: 'Import an app or describe your idea', body: 'Paste an App Store link or explain what you want to build.' },
  { number: '2', title: 'Get the signal', body: 'Signal generates keywords, competitors, positioning, and opportunities.' },
  { number: '3', title: 'Build and ship', body: 'Turn insights into screenshots, ASO updates, and real deliverables.' },
];

const PRODUCT_MODULES = [
  { id: 'opportunity', icon: '🎯', title: 'Opportunity Finder', detail: 'Surface keywords and gaps you can win' },
  { id: 'keyword', icon: '🔍', title: 'Keyword Explorer', detail: 'Expand and track search terms' },
  { id: 'tracking', icon: '📊', title: 'App Tracking', detail: 'Monitor rankings and visibility' },
  { id: 'aso', icon: '⚡', title: 'ASO Analyzer', detail: 'Review metadata and listing health' },
  { id: 'competitors', icon: '🏁', title: 'Competitor Reports', detail: 'Benchmark against rivals' },
  { id: 'reviews', icon: '💬', title: 'Reviews', detail: 'Extract pain points from users' },
  { id: 'screenshot', icon: '🎨', title: 'Screenshot Generator', detail: 'Create store visuals from context' },
  { id: 'validator', icon: '✨', title: 'Idea Validator', detail: 'Test concepts before building' },
  { id: 'projects', icon: '📁', title: 'Projects', detail: 'Turn insights into deliverables' },
];

const USE_CASE_CARDS = [
  { title: 'Find your next app idea', body: 'Validate concepts before writing a single line of code.' },
  { title: 'Grow your App Store ranking', body: 'Target the right keywords and outperform competitors.' },
  { title: 'Fix your screenshots', body: 'Understand what converts and rebuild your store presence.' },
  { title: 'Analyze competitors', body: 'See what they do well, where they fail, and how to win.' },
];

const FAQ_ITEMS = [
  {
    q: 'What is Signal?',
    a: 'Signal is an app growth workspace that helps you find opportunities, analyze your market, and ship assets faster.',
  },
  {
    q: 'Do I need an app to use Signal?',
    a: 'No. You can start from an idea and still get insights, keywords, and competitors.',
  },
  {
    q: 'How is this different from ASO tools?',
    a: 'Signal doesn\'t just show data. It connects discovery, analysis, and execution so you know what to do next.',
  },
  {
    q: 'Can I use this for multiple apps?',
    a: 'Yes. Signal is built around app workspaces, tracked apps, and projects.',
  },
  {
    q: 'Can I generate screenshots?',
    a: 'Yes. Signal helps turn app context and market insights into screenshot and creative projects.',
  },
  {
    q: 'Who is Signal for?',
    a: 'Indie makers, app founders, ASO operators, growth marketers, and small app teams.',
  },
];

function MarketingHeader({ onCTA }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(null);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 48,
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#F4621F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            color: 'white',
            fontSize: 16,
          }}>S</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#111' }}>Signal</span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center', flex: 1 }}>
          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: 15,
                color: '#444',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '8px 0',
              }}
              onMouseEnter={() => setDropdownOpen('product')}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              Product ▾
            </button>
            {dropdownOpen === 'product' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 12,
                  padding: '24px',
                  minWidth: 900,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  marginTop: 4,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 24,
                  animation: 'fadeIn 0.2s ease-out',
                }}
                onMouseEnter={() => setDropdownOpen('product')}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {PRODUCT_CATEGORIES.map(category => (
                  <div key={category.id}>
                    <div style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#F4621F',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 12,
                    }}>
                      {category.label}
                    </div>
                    {category.items.map(item => (
                      <a key={item.id} href={`#${item.id}`} style={{
                        display: 'block',
                        padding: '8px 12px',
                        textDecoration: 'none',
                        color: '#111',
                        borderRadius: 8,
                        transition: 'background 0.15s ease',
                        marginBottom: 4,
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(244, 98, 31, 0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{item.detail}</div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: 15,
                color: '#444',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '8px 0',
              }}
              onMouseEnter={() => setDropdownOpen('usecases')}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              Use Cases ▾
            </button>
            {dropdownOpen === 'usecases' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 12,
                  padding: '12px 0',
                  minWidth: 240,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  marginTop: 4,
                }}
                onMouseEnter={() => setDropdownOpen('usecases')}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {USE_CASES.map(item => (
                  <a key={item.id} href={`#${item.id}`} style={{
                    display: 'block',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    color: '#111',
                  }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{item.detail}</div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#pricing" style={{ fontSize: 15, color: '#444', fontWeight: 500, textDecoration: 'none' }}>Pricing</a>

          <a href="#contact" style={{ fontSize: 15, color: '#444', fontWeight: 500, textDecoration: 'none' }}>Contact</a>

          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: 15,
                color: '#444',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '8px 0',
              }}
              onMouseEnter={() => setDropdownOpen('resources')}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              Resources ▾
            </button>
            {dropdownOpen === 'resources' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 12,
                  padding: '12px 0',
                  minWidth: 180,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  marginTop: 4,
                }}
                onMouseEnter={() => setDropdownOpen('resources')}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {['Blog', 'Guides', 'Changelog', 'Help Center'].map(item => (
                  <a key={item} href="#" style={{
                    display: 'block',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    color: '#111',
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onCTA}
            style={{
              background: '#F4621F',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            Start for free
          </button>
        </nav>
      </div>
    </header>
  );
}

function HeroSection({ onCTA }) {
  return (
    <section style={{
      padding: '120px 24px',
      textAlign: 'center',
      background: 'linear-gradient(180deg, #fff 0%, #fafafa 100%)',
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{
          fontSize: 72,
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 24,
          color: '#111',
          letterSpacing: '-0.03em',
          animation: 'slideUp 0.6s ease-out',
        }}>
          Find the signal.<br />
          Build what matters.
        </h1>

        <p style={{
          fontSize: 22,
          lineHeight: 1.6,
          color: '#444',
          marginBottom: 48,
          maxWidth: 720,
          margin: '0 auto 48px',
          animation: 'slideUp 0.6s ease-out 0.1s both',
        }}>
          Stop guessing what to build or optimize. Signal turns any app — or idea — into clear opportunities, keywords, competitors, and assets you can ship.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 16, animation: 'slideUp 0.6s ease-out 0.2s both' }}>
          <button
            onClick={onCTA}
            style={{
              background: '#F4621F',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: 9999,
              fontSize: 17,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Start for free
          </button>
          <button
            style={{
              background: 'white',
              color: '#333',
              border: '1px solid #ddd',
              padding: '16px 32px',
              borderRadius: 9999,
              fontSize: 17,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            See how it works
          </button>
        </div>

        <p style={{ fontSize: 14, color: '#888', margin: 0 }}>
          No credit card required
        </p>

        {/* Hero visual placeholder */}
        <div style={{
          marginTop: 80,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
          border: '1px solid rgba(0,0,0,0.1)',
        }}>
          <div style={{
            aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 18,
            fontWeight: 500,
          }}>
            Dashboard Preview
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilityStrip() {
  return (
    <section style={{
      padding: '60px 24px',
      textAlign: 'center',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
    }}>
      <p style={{
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
      }}>
        Built for indie makers, ASO teams, app founders, and growth operators
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 48,
        flexWrap: 'wrap',
      }}>
        {['App Store research', 'Keyword tracking', 'Competitor intelligence', 'Screenshot workflows'].map(badge => (
          <div key={badge} style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatYouGetSection() {
  return (
    <section style={{
      padding: '120px 24px',
      background: 'white',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 48,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 80,
          color: '#111',
        }}>
          Everything you need to grow an app — in one workspace
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
        }}>
          {WHY_CARDS.map((card, i) => (
            <div key={i} style={{
              background: 'white',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 24,
              padding: 48,
            }}>
              <h3 style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 16,
                color: '#111',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: '#555',
                margin: 0,
              }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section style={{
      padding: '120px 24px',
      background: '#fafafa',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 48,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 80,
          color: '#111',
        }}>
          From idea to shipped assets — in minutes
        </h2>

        <div style={{ display: 'grid', gap: 48 }}>
          {HOW_IT_WORKS_STEPS.map(step => (
            <div key={step.number} style={{
              display: 'flex',
              gap: 32,
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#F4621F',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 800,
                flexShrink: 0,
              }}>
                {step.number}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: 12,
                  color: '#111',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: '#555',
                  margin: 0,
                }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductModulesSection() {
  return (
    <section style={{
      padding: '120px 24px',
      background: 'white',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 48,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 24,
          color: '#111',
        }}>
          One workspace. Not 10 tools.
        </h2>

        <p style={{
          fontSize: 20,
          textAlign: 'center',
          color: '#555',
          marginBottom: 80,
          maxWidth: 720,
          margin: '0 auto 80px',
        }}>
          No more switching between dashboards, spreadsheets, and guesswork. Signal connects discovery, analysis, and execution in one place.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {PRODUCT_MODULES.map(module => (
            <div key={module.id} style={{
              background: 'white',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 16,
              padding: 32,
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{module.icon}</div>
              <h4 style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
                color: '#111',
              }}>
                {module.title}
              </h4>
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: 0,
                lineHeight: 1.6,
              }}>
                {module.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section style={{
      padding: '120px 24px',
      background: '#fafafa',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 48,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 80,
          color: '#111',
        }}>
          Built for builders
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 32,
        }}>
          {USE_CASE_CARDS.map((card, i) => (
            <div key={i} style={{
              background: 'white',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 20,
              padding: 40,
            }}>
              <h3 style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 12,
                color: '#111',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: '#555',
                margin: 0,
              }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PositioningSection() {
  return (
    <section style={{
      padding: '120px 24px',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      color: 'white',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: 56,
          fontWeight: 800,
          marginBottom: 32,
          color: 'white',
        }}>
          Stop building blindly
        </h2>
        <p style={{
          fontSize: 22,
          lineHeight: 1.6,
          marginBottom: 48,
          opacity: 0.9,
        }}>
          Most apps fail because decisions are based on assumptions. Signal replaces guesswork with data, context, and actionable insights.
        </p>
        <p style={{
          fontSize: 28,
          fontWeight: 700,
          margin: 0,
          color: '#F4621F',
        }}>
          Know what to build. Know what to fix. Know what to ship.
        </p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section style={{
      padding: '120px 24px',
      background: '#f8f8f8',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(244, 98, 31, 0.1)',
            color: '#F4621F',
            padding: '6px 16px',
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 600,
          }}>
            ● Customer Reviews
          </span>
        </div>

        <h2 style={{
          fontSize: 48,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 16,
          color: '#111',
        }}>
          Trusted by 2500+ companies
        </h2>

        <p style={{
          fontSize: 16,
          textAlign: 'center',
          color: '#666',
          maxWidth: 600,
          margin: '0 auto 64px',
        }}>
          Trusted by over 2,500 companies worldwide, we take pride in delivering reliable solutions that drive real results
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}>
          {/* Testimonial card 1 */}
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: 32,
            border: '1px solid rgba(0,0,0,0.06)',
          }}>
            <div style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: '#333',
              marginBottom: 24,
            }}>
              "Signal helped me turn a vague app idea into a concrete launch plan."
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>James Carter</div>
                <div style={{ fontSize: 13, color: '#888' }}>Founder & CEO</div>
              </div>
            </div>
          </div>

          {/* Stats card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.2) 0%, rgba(255, 218, 185, 0.2) 100%)',
            borderRadius: 16,
            padding: 40,
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#111',
              marginBottom: 8,
            }}>
              10X
            </div>
            <div style={{ fontSize: 15, color: '#666', fontWeight: 500 }}>
              More insights
            </div>
          </div>

          {/* Testimonial card 2 */}
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: 32,
            border: '1px solid rgba(0,0,0,0.06)',
          }}>
            <div style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: '#333',
              marginBottom: 24,
            }}>
              "Instead of staring at ASO data, I finally knew what to do next."
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>William Harris</div>
                <div style={{ fontSize: 13, color: '#888' }}>Growth Lead</div>
              </div>
            </div>
          </div>

          {/* Stats card 2 */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(250, 112, 154, 0.2) 0%, rgba(254, 225, 64, 0.2) 100%)',
            borderRadius: 16,
            padding: 40,
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#111',
              marginBottom: 8,
            }}>
              3X
            </div>
            <div style={{ fontSize: 15, color: '#666', fontWeight: 500 }}>
              Faster shipping
            </div>
          </div>

          {/* Testimonial card 3 */}
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: 32,
            border: '1px solid rgba(0,0,0,0.06)',
          }}>
            <div style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: '#333',
              marginBottom: 24,
            }}>
              "This feels less like a dashboard and more like a growth workspace."
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Matthew Brooks</div>
                <div style={{ fontSize: 13, color: '#888' }}>Indie Maker</div>
              </div>
            </div>
          </div>

          {/* Testimonial card 4 - spanning 2 columns */}
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: 32,
            border: '1px solid rgba(0,0,0,0.06)',
            gridColumn: 'span 2',
          }}>
            <div style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: '#333',
              marginBottom: 24,
            }}>
              "We used Signal to validate our app idea before building. The competitor analysis and keyword research saved us months of guesswork."
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Daniel Parker</div>
                <div style={{ fontSize: 13, color: '#888' }}>Product Manager</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection({ onCTA }) {
  const [billingPeriod, setBillingPeriod] = React.useState('monthly');

  const plans = [
    {
      name: 'Basic',
      price: billingPeriod === 'monthly' ? 29 : 23,
      subtitle: 'Perfect for small teams who want to simplify their financial workflows',
      features: [
        'Smart invoicing & tracking',
        'Automated bank sync',
        'Real-time financial dashboard',
        'Custom budget reports',
      ],
      cta: 'Get Started Now',
      highlight: false,
    },
    {
      name: 'Unlimited',
      label: 'Unlimited',
      price: billingPeriod === 'monthly' ? 59 : 47,
      subtitle: 'Ideal for growing businesses that need advanced automation',
      features: [
        'AI driven financial forecasting',
        'Multi-account management',
        'Advanced analytics & reporting',
        'Automated tax summaries',
      ],
      cta: 'Get Started Now',
      highlight: true,
    },
  ];

  return (
    <section id="pricing" style={{
      padding: '120px 24px',
      background: '#fafafa',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(244, 98, 31, 0.1)',
            color: '#F4621F',
            padding: '6px 16px',
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 24,
          }}>
            ● Pricing
          </span>
        </div>

        <h2 style={{
          fontSize: 56,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 48,
          color: '#111',
        }}>
          Choose the perfect plan
        </h2>

        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 64,
        }}>
          <button
            onClick={() => setBillingPeriod('monthly')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 16,
              fontWeight: 600,
              color: billingPeriod === 'monthly' ? '#111' : '#888',
              cursor: 'pointer',
              padding: '8px 16px',
            }}
          >
            Monthly
          </button>
          <div style={{
            width: 48,
            height: 24,
            background: billingPeriod === 'yearly' ? '#F4621F' : '#ddd',
            borderRadius: 9999,
            position: 'relative',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
          >
            <div style={{
              position: 'absolute',
              width: 20,
              height: 20,
              background: 'white',
              borderRadius: '50%',
              top: 2,
              left: billingPeriod === 'yearly' ? 26 : 2,
              transition: 'left 0.2s',
            }} />
          </div>
          <button
            onClick={() => setBillingPeriod('yearly')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 16,
              fontWeight: 600,
              color: billingPeriod === 'yearly' ? '#111' : '#888',
              cursor: 'pointer',
              padding: '8px 16px',
            }}
          >
            Yearly
          </button>
          {billingPeriod === 'yearly' && (
            <span style={{
              background: 'rgba(244, 98, 31, 0.15)',
              color: '#F4621F',
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 700,
            }}>
              SAVE 20%
            </span>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 32,
          maxWidth: 900,
          margin: '0 auto',
        }}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              background: plan.highlight ? 'linear-gradient(135deg, rgba(135, 206, 250, 0.15) 0%, rgba(255, 182, 193, 0.15) 100%)' : 'white',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 20,
              padding: 40,
              position: 'relative',
            }}>
              {plan.label && (
                <div style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  color: '#F4621F',
                  fontSize: 13,
                  fontWeight: 700,
                }}>
                  {plan.label}
                </div>
              )}

              <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 16,
                color: '#111',
              }}>
                {plan.name}
              </h3>

              <div style={{
                fontSize: 48,
                fontWeight: 800,
                marginBottom: 8,
                color: '#111',
              }}>
                ${plan.price}
                <span style={{ fontSize: 18, fontWeight: 500, color: '#666' }}>/month</span>
              </div>

              <p style={{
                fontSize: 14,
                color: '#666',
                marginBottom: 32,
                lineHeight: 1.5,
              }}>
                {plan.subtitle}
              </p>

              <button
                onClick={onCTA}
                style={{
                  width: '100%',
                  background: '#111',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  borderRadius: 9999,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: 32,
                }}
              >
                {plan.cta}
              </button>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {plan.features.map(feature => (
                  <li key={feature} style={{
                    fontSize: 14,
                    color: '#333',
                    marginBottom: 14,
                    paddingLeft: 28,
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: '2px solid #111',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: 64,
          padding: '40px',
          background: 'white',
          borderRadius: 16,
          border: '1px solid rgba(0,0,0,0.08)',
        }}>
          <h3 style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 12,
            color: '#111',
          }}>
            Looking for enterprise solutions?
          </h3>
          <p style={{
            fontSize: 15,
            color: '#666',
            marginBottom: 24,
          }}>
            Contact us for a custom quote
          </p>
          <button
            onClick={onCTA}
            style={{
              background: '#111',
              color: 'white',
              border: 'none',
              padding: '14px 32px',
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState(null);

  return (
    <section style={{
      padding: '120px 24px',
      background: 'white',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 48,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 80,
          color: '#111',
        }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'grid', gap: 16 }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{
              borderBottom: '1px solid rgba(0,0,0,0.08)',
            }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '24px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#111',
                }}>
                  {item.q}
                </span>
                <span style={{
                  fontSize: 24,
                  color: '#888',
                  transition: 'transform 0.2s',
                  transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                }}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <div style={{
                  padding: '0 0 24px 0',
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: '#555',
                }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection({ onCTA }) {
  return (
    <section style={{
      padding: '120px 24px',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      color: 'white',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 56,
          fontWeight: 800,
          marginBottom: 48,
          color: 'white',
          lineHeight: 1.2,
        }}>
          Stop guessing.<br />
          Start building what works.
        </h2>

        <button
          onClick={onCTA}
          style={{
            background: '#F4621F',
            color: 'white',
            border: 'none',
            padding: '18px 40px',
            borderRadius: 9999,
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          Start for free
        </button>

        <p style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.6)',
          margin: 0,
        }}>
          No credit card required
        </p>
      </div>
    </section>
  );
}

function MarketingFooter() {
  return (
    <footer style={{
      padding: '80px 24px 40px',
      background: '#111',
      color: 'white',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          gap: 80,
          marginBottom: 60,
          flexWrap: 'wrap',
        }}>
          <div style={{ minWidth: 240 }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Signal</div>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
              App growth workspace for indie makers and small teams.
            </p>
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, opacity: 0.5 }}>PRODUCT</div>
            {PRODUCT_CATEGORIES.flatMap(cat => cat.items).slice(0, 5).map(item => (
              <div key={item.id} style={{ fontSize: 14, color: '#aaa', marginBottom: 8 }}>
                {item.label}
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, opacity: 0.5 }}>USE CASES</div>
            {USE_CASES.map(item => (
              <div key={item.id} style={{ fontSize: 14, color: '#aaa', marginBottom: 8 }}>
                {item.label}
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, opacity: 0.5 }}>RESOURCES</div>
            {['Blog', 'Guides', 'Changelog', 'Help Center'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#aaa', marginBottom: 8 }}>
                {item}
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, opacity: 0.5 }}>COMPANY</div>
            {['About', 'Contact', 'Careers'].map(item => (
              <div key={item} style={{ fontSize: 14, color: '#aaa', marginBottom: 8 }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #333',
          paddingTop: 32,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 13,
          color: '#666',
        }}>
          <div>© 2024 Signal. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MarketingLanding({ setRoute }) {
  const handleCTA = () => {
    // Go to onboarding
    setRoute({ screen: 'onboarding' });
  };

  return (
    <div style={{
      background: 'white',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      <MarketingHeader onCTA={handleCTA} />
      <HeroSection onCTA={handleCTA} />
      <CredibilityStrip />
      <WhatYouGetSection />
      <HowItWorksSection />
      <ProductModulesSection />
      <UseCasesSection />
      <PositioningSection />
      <TestimonialsSection />
      <PricingSection onCTA={handleCTA} />
      <FAQSection />
      <FinalCTASection onCTA={handleCTA} />
      <MarketingFooter />
    </div>
  );
}

function HomeScreen({ setRoute }) {
  return <MarketingLanding setRoute={setRoute} />;
}

Object.assign(window, { HomeScreen, MarketingLanding });
