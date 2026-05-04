/* App shell: sidebar + topbar + layout */

function Logo({ size = 22, compact = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: compact ? 0 : 10 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.22,
          background: 'linear-gradient(135deg, #fff4ef, #ffb48d)',
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
        }}>S</div>
      </div>
      {!compact && <span style={{ fontWeight: 700, letterSpacing: '-0.02em', fontSize: 22 }}>Signal</span>}
    </div>
  );
}

function Sidebar({ route, setRoute }) {
  const { NAV, NAV_SECONDARY, WORKSPACE } = window.DATA;
  const activeJob = (WORKSPACE.wrapJobs || [])[0];
  const sections = React.useMemo(() => NAV.reduce((acc, item) => {
    const key = item.section || 'Navigation';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {}), [NAV]);

  const { user } = window.useAuth?.() || { user: null };
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  const findSectionForScreen = React.useCallback((screen) => {
    for (const [section, items] of Object.entries(sections)) {
      if (items.some((item) => item.id === screen)) return section;
    }
    if ((NAV_SECONDARY || []).some((item) => item.id === screen)) return 'Workspace';
    return Object.keys(sections)[0] || ((NAV_SECONDARY || []).length ? 'Workspace' : '');
  }, [sections, NAV_SECONDARY]);

  const [openSection, setOpenSection] = React.useState(() => {
    const initial = findSectionForScreen(route?.screen);
    return initial === 'Workspace' ? '' : initial;
  });
  const [workspaceOpen, setWorkspaceOpen] = React.useState(true);

  React.useEffect(() => {
    const nextSection = findSectionForScreen(route?.screen);
    if (!nextSection || nextSection === 'Workspace') return;
    setOpenSection(nextSection);
  }, [route?.screen, findSectionForScreen]);

  const handleSignOut = async () => {
    try {
      const { signOut } = await import('../lib/workspace.js');
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const openWebsite = () => {
    window.openStandaloneSite?.();
  };

  return (
    <aside style={{
      width: 232, flexShrink: 0, background: 'var(--bg-1)',
      borderRight: '1px solid var(--border-1)',
      display: 'flex', flexDirection: 'column',
      padding: '14px 12px',
      gap: 14,
    }}>
      <div style={{ padding: '2px 6px 0' }}>
        <Logo />
      </div>

      {activeJob ? window.wrapJobCard?.(activeJob) : null}

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', minHeight: 0 }}>
        {Object.entries(sections).map(([section, items]) => (
          <div key={section} style={{ display: 'grid', gap: 4 }}>
            <button
              onClick={() => setOpenSection((current) => current === section ? '' : section)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                width: '100%',
                padding: '2px 8px 6px',
                color: openSection === section ? 'var(--text-1)' : 'var(--text-3)',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textAlign: 'left',
              }}
            >
              <span>{section}</span>
              <window.I.ChevronD style={{ width: 14, height: 14, transform: openSection === section ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 140ms ease' }} />
            </button>
            {openSection === section ? (
              <div style={{ display: 'grid', gap: 2 }}>
                {items.map((item) => (
                  <NavRow
                    key={item.id}
                    item={item}
                    active={route.screen === item.id}
                    onClick={() => setRoute({ screen: item.id })}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {NAV_SECONDARY.length ? (
        <div style={{ display: 'grid', gap: 4, paddingTop: 12, borderTop: '1px solid var(--border-1)' }}>
          <button
            onClick={() => setWorkspaceOpen((current) => !current)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              width: '100%',
              padding: '0 8px 4px',
              color: workspaceOpen ? 'var(--text-1)' : 'var(--text-3)',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textAlign: 'left',
            }}
          >
            <span>Workspace</span>
            <window.I.ChevronD style={{ width: 14, height: 14, transform: workspaceOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 140ms ease' }} />
          </button>
          {workspaceOpen ? (
            <div style={{ display: 'grid', gap: 2 }}>
              {NAV_SECONDARY.map((item) => (
                <NavRow
                  key={item.id}
                  item={item}
                  active={route.screen === item.id}
                  onClick={() => setRoute({ screen: item.id })}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <button
        onClick={openWebsite}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          padding: '10px 12px',
          borderRadius: 10,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
          border: '1px solid var(--border-1)',
          color: 'var(--text-1)',
          fontSize: 12.5,
          marginTop: 10,
          width: '100%',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <window.I.ArrowUpRight style={{ width: 14, height: 14, color: 'var(--accent)' }} />
          Open website
        </span>
        <span style={{ color: 'var(--text-3)', fontSize: 11 }}>new tab</span>
      </button>

      {user ? (
        <button
          onClick={handleSignOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            borderRadius: 8,
            background: 'transparent',
            border: '1px solid var(--border-1)',
            color: 'var(--text-2)',
            fontSize: 12,
            cursor: 'pointer',
            marginTop: 6,
            width: '100%',
          }}
        >
          <div style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 10 }}>
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
            {user.email}
          </span>
          <window.I.LogOut style={{ width: 14, height: 14 }} />
        </button>
      ) : (
        <button
          onClick={() => setAuthModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '10px 12px',
            borderRadius: 8,
            background: 'linear-gradient(135deg, var(--accent), var(--accent))',
            border: 'none',
            color: 'var(--accent-fg)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: 6,
            width: '100%',
          }}
        >
          <window.I.LogIn style={{ width: 16, height: 16 }} />
          Sign In
        </button>
      )}

      <div style={{ fontSize: 10.5, color: 'var(--text-4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 8 }}>
        © 2026 Signal
      </div>

      {authModalOpen && <window.AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onSuccess={() => setAuthModalOpen(false)} />}
    </aside>
  );
}

function NavRow({ item, active, onClick, compact = false }) {
  const Icon = window.I[item.icon];
  const iconNode = Icon ? <Icon /> : null;
  return (
    <button onClick={onClick} title={item.label} style={{
      display: 'flex', alignItems: 'center', justifyContent: compact ? 'center' : 'flex-start', gap: 10, width: '100%',
      padding: compact ? '8px 6px' : '10px 12px', borderRadius: 10,
      background: active ? 'var(--accent-soft)' : 'transparent',
      color: active ? 'var(--accent)' : 'var(--text-2)',
      fontSize: 12, fontWeight: active ? 500 : 400,
      textAlign: 'left', transition: 'background 100ms',
    }}>
      <span style={{ color: active ? 'var(--accent)' : 'var(--text-3)', width: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{iconNode}</span>
      {!compact && <span style={{ flex: 1 }}>{item.label}</span>}
      {!compact && item.count ? <span style={{ fontSize: 11, color: 'var(--text-3)' }} className="mono">{item.count}</span> : null}
      {!compact && item.badge ? <span style={{ fontSize: 10, fontWeight: 600, background: 'var(--accent)', color: 'var(--accent-fg)', padding: '1px 6px', borderRadius: 99 }}>{item.badge}</span> : null}
    </button>
  );
}

function accountInitials(user, account) {
  if (account?.initials) return String(account.initials).slice(0, 2).toUpperCase();
  if (user?.email) return user.email.charAt(0).toUpperCase();
  return 'S';
}

function AccountMenu({ setRoute }) {
  const { WORKSPACE = {} } = window.DATA || {};
  const account = WORKSPACE.account || {};
  const credits = window.SHIPSHOT_CREDITS?.getCreditsState?.() || { plan: 'maker', balance: 0 };
  const plan = window.SHIPSHOT_CREDITS?.PLANS?.[credits.plan] || window.SHIPSHOT_CREDITS?.PLANS?.maker || null;
  const { user, loading } = window.useAuth?.() || { user: null, loading: false };
  const [open, setOpen] = React.useState(false);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const openSettings = () => {
    setOpen(false);
    setRoute?.({ screen: 'settings' });
  };

  const handleTriggerClick = () => {
    if (loading) return;
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setOpen((value) => !value);
  };

  const handleSignOut = async () => {
    setPending(true);
    try {
      const { signOut } = await import('../lib/workspace.js');
      await signOut();
      setOpen(false);
      setRoute?.({ screen: 'home' });
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        className="btn ghost sm"
        onClick={handleTriggerClick}
        title={user ? 'Open account menu' : 'Sign in'}
        style={{
          width: 34,
          height: 34,
          padding: 0,
          borderRadius: 999,
          display: 'grid',
          placeItems: 'center',
          background: user ? 'var(--accent)' : 'var(--bg-2)',
          color: user ? 'var(--accent-fg)' : 'var(--text-1)',
          border: user ? 'none' : '1px solid var(--border-1)',
          fontWeight: 700,
        }}
      >
        {accountInitials(user, account)}
      </button>

      {open ? (
        <div
          className="card"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            width: 300,
            padding: 14,
            zIndex: 1200,
            boxShadow: 'var(--shadow-lg)',
            display: 'grid',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 999, background: 'var(--accent)', color: 'var(--accent-fg)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14 }}>
              {accountInitials(user, account)}
            </div>
            <div style={{ minWidth: 0, display: 'grid', gap: 2 }}>
              <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {account.workspaceName || 'Signal'}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.email || 'Signed in'}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 8, padding: '10px 12px', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--border-1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12.5 }}>
              <span style={{ color: 'var(--text-3)' }}>Plan</span>
              <span>{account.plan || plan?.label || 'Maker'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12.5 }}>
              <span style={{ color: 'var(--text-3)' }}>Credits</span>
              <span>{credits.balance}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12.5 }}>
              <span style={{ color: 'var(--text-3)' }}>Mode</span>
              <span>{window.SHIPSHOT_SUPABASE ? 'Synced' : 'Local only'}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <button className="btn sm" onClick={openSettings} style={{ justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <window.I.Settings style={{ width: 14, height: 14 }} />
                Account settings
              </span>
              <window.I.ChevronR style={{ width: 14, height: 14 }} />
            </button>
            <button className="btn ghost sm" onClick={handleSignOut} disabled={pending} style={{ justifyContent: 'space-between', opacity: pending ? 0.65 : 1 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <window.I.LogOut style={{ width: 14, height: 14 }} />
                {pending ? 'Signing out...' : 'Sign out'}
              </span>
            </button>
          </div>
        </div>
      ) : null}

      {authModalOpen ? (
        <window.AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={() => {
            setAuthModalOpen(false);
            setOpen(true);
          }}
        />
      ) : null}
    </div>
  );
}

function TopBar({ crumbs = [], right = null, sidebarCollapsed = false, onToggleSidebar, setRoute }) {
  return (
    <div style={{
      height: 48, flexShrink: 0,
      display: 'grid', alignItems: 'center', gridTemplateColumns: 'minmax(0, 1fr) auto',
      padding: '0 16px',
      gap: 12,
      borderBottom: '1px solid var(--border-1)',
      background: 'var(--bg-0)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-2)', fontSize: 13, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0, overflow: 'hidden' }}>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span style={{ color: 'var(--text-4)' }}><window.I.ChevronR /></span>}
            <button
              type="button"
              onClick={crumb.route && index !== crumbs.length - 1 ? () => setRoute?.(crumb.route) : undefined}
              disabled={!crumb.route || index === crumbs.length - 1}
              style={{ color: index === crumbs.length - 1 ? 'var(--text-1)' : 'var(--text-2)', fontWeight: index === crumbs.length - 1 ? 500 : 400, display: 'inline-flex', alignItems: 'center', gap: 6, minWidth: 0, cursor: crumb.route && index !== crumbs.length - 1 ? 'pointer' : 'default', opacity: 1, background: 'transparent', border: 'none', padding: 0 }}
            >
              {crumb.icon && <span style={{ color: 'var(--text-3)' }}>{crumb.icon}</span>}
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{crumb.label}</span>
            </button>
          </React.Fragment>
        ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
        {right}
      </div>
    </div>
  );
}

function creditsTone(credits) {
  const allocation = window.SHIPSHOT_CREDITS.monthlyAllocation(credits.plan) || 1;
  const ratio = credits.balance / allocation;
  if (ratio < 0.1) return { fg: '#ffb4a2', bg: 'rgba(120,24,24,0.38)', border: 'rgba(255,120,120,0.28)', icon: '⚠️' };
  if (ratio < 0.3) return { fg: '#ffd089', bg: 'rgba(120,72,8,0.32)', border: 'rgba(255,180,80,0.24)', icon: '💎' };
  return { fg: '#b7f7c6', bg: 'rgba(18,86,52,0.28)', border: 'rgba(60,200,120,0.22)', icon: '💎' };
}

function CreditsBadge({ credits, onClick }) {
  const tone = creditsTone(credits);
  const plan = window.SHIPSHOT_CREDITS.PLANS[credits.plan] || window.SHIPSHOT_CREDITS.PLANS.maker;
  return (
    <button
      className="btn sm"
      onClick={onClick}
      style={{
        background: tone.bg,
        color: tone.fg,
        border: `1px solid ${tone.border}`,
        gap: 8,
      }}
    >
      <span>{tone.icon}</span>
      <span>{credits.balance} credits</span>
      <span style={{ opacity: 0.8 }}>[{plan.label}]</span>
    </button>
  );
}

function CreditsPanel({ open, credits, onClose }) {
  if (!open) return null;
  const plan = window.SHIPSHOT_CREDITS.PLANS[credits.plan] || window.SHIPSHOT_CREDITS.PLANS.maker;
  const allocation = window.SHIPSHOT_CREDITS.monthlyAllocation(credits.plan);
  const cap = window.SHIPSHOT_CREDITS.rolloverCap(credits.plan);
  const history = window.SHIPSHOT_CREDITS.getHistory();
  const renewsAt = credits.renewsAt ? new Date(credits.renewsAt) : null;
  const days = renewsAt ? Math.max(0, Math.ceil((renewsAt.getTime() - Date.now()) / 86400000)) : null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1400, background: 'rgba(3,4,6,0.4)' }} onClick={onClose}>
      <div className="card" style={{ position: 'absolute', top: 16, right: 16, width: 380, padding: 18, boxShadow: 'var(--shadow-lg)' }} onClick={(event) => event.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>💎 Credits — {plan.label}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 4 }}>Local prototype billing logic, stored in localStorage.</div>
          </div>
          <button className="btn ghost icon sm" onClick={onClose}><window.I.X /></button>
        </div>

        <div style={{ marginTop: 14, display: 'grid', gap: 8, fontSize: 13 }}>
          <CreditMetaRow label="Current balance" value={`${credits.balance} / ${allocation || cap} credits`} />
          <CreditMetaRow label="Renewal" value={renewsAt ? `in ${days} day${days === 1 ? '' : 's'} (${renewsAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })})` : 'No renewal'} />
          <CreditMetaRow label="Roll-over" value={plan.renewable ? `up to ${cap} credits max` : 'No roll-over'} />
        </div>

        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-1)' }}>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', marginBottom: 10 }}>Recent history</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.length === 0 ? <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>No credit transactions yet.</div> : history.map((item, index) => (
              <div key={`${item.date}-${index}`} style={{ display: 'grid', gridTemplateColumns: '52px 1fr auto auto', gap: 8, alignItems: 'center', fontSize: 12.5 }}>
                <span style={{ color: 'var(--text-3)' }}>{new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.action}</span>
                <span style={{ color: item.cost > 0 ? '#ffb4a2' : '#b7f7c6' }}>{item.cost > 0 ? `−${item.cost}` : `+${Math.abs(item.cost)}`}</span>
                <span style={{ color: 'var(--text-3)' }}>→ {item.balanceAfter}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn sm" onClick={() => { window.SHIPSHOT_CREDITS.addCredits(15); onClose(); }}>Buy credits</button>
          <button className="btn primary sm" onClick={() => { window.SHIPSHOT_CREDITS.setPlan('studio'); onClose(); }}>Upgrade plan</button>
        </div>
      </div>
    </div>
  );
}

function CreditMetaRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ color: 'var(--text-3)' }}>{label}</span>
      <span style={{ textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function CreditsToast({ toast, onOpen }) {
  if (!toast) return null;
  const bg = toast.tone === 'warn' ? 'rgba(120,72,8,0.92)' : (toast.tone === 'success' ? 'rgba(18,86,52,0.92)' : 'rgba(20,24,31,0.92)');
  return (
    <button
      onClick={onOpen}
      style={{
        position: 'fixed',
        right: 18,
        bottom: 18,
        zIndex: 1500,
        padding: '12px 14px',
        borderRadius: 12,
        background: bg,
        color: '#fff',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: 420,
        textAlign: 'left',
      }}
    >
      {toast.message}
    </button>
  );
}

function InsufficientCreditsModal({ data, onClose, onBuy, onUpgrade }) {
  if (!data) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1450, background: 'rgba(3,4,6,0.46)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div className="card" style={{ width: 440, padding: 22 }} onClick={(event) => event.stopPropagation()}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Crédits insuffisants</div>
        <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
          Cette action nécessite {data.cost} crédits.
          <br />
          Votre solde actuel : {data.balance} crédits.
          <br />
          Il vous manque {data.missing} crédits.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
          <button className="btn" onClick={onBuy}>Acheter un pack Boost — 4€ / 15 crédits</button>
          <button className="btn primary" onClick={onUpgrade}>Upgrader en Studio — 39€/mois</button>
          <button className="btn ghost" onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

function CreditButton({ actions, icon, label, className = 'btn primary', onClick, disabled = false, style = {} }) {
  const cost = window.SHIPSHOT_CREDITS.calcCost(actions || []);
  const credits = window.SHIPSHOT_CREDITS.getCreditsState();
  const affordable = credits.balance >= cost;
  const title = !affordable && cost > 0 ? 'Crédits insuffisants — Recharger →' : '';
  return (
    <button
      className={className}
      title={title}
      aria-disabled={disabled || !affordable}
      onClick={() => {
        if (disabled) return;
        if (!affordable && cost > 0) {
          window.__shipshotCreditsUI?.showInsufficient(cost, label);
          return;
        }
        onClick?.();
      }}
      style={{
        ...style,
        opacity: disabled || !affordable ? 0.62 : 1,
        cursor: disabled || !affordable ? 'not-allowed' : 'pointer',
      }}
    >
      {icon ? <>{icon} </> : null}
      <span>{label}</span>
      {typeof cost === 'number' ? <span style={{ marginLeft: 8, padding: '1px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.14)', fontSize: 11, fontWeight: 700 }}>{cost} credit{cost === 1 ? '' : 's'}</span> : null}
    </button>
  );
}

Object.assign(window, { Logo, Sidebar, TopBar, NavRow, AccountMenu, CreditsBadge, CreditsPanel, CreditsToast, InsufficientCreditsModal, CreditButton });
