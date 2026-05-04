/* Mock App Store screenshots — purely CSS/SVG, no images.
   Each renders a phone with a "creative" (headline, feature, lifestyle, stat, cta). */

function mergeLayout(kind, layout) {
  return window.SHIPSHOT?.normalizeLayout
    ? window.SHIPSHOT.normalizeLayout(kind, layout)
    : layout;
}

function visibleElements(kind) {
  return {
    headline: true,
    sub: ['feature', 'stat', 'cta'].includes(kind),
    phone: true,
    cta: kind === 'cta',
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

const SCREENSHOT_FALLBACK_ICON = () => null;
const SCREENSHOT_REQUIRED_ICONS = ['ArrowUp', 'ChevronD', 'Copy', 'Lock', 'RotateBoth', 'Trash'];

if (typeof window !== 'undefined') {
  window.I = window.I || {};
  SCREENSHOT_REQUIRED_ICONS.forEach((name) => {
    if (typeof window.I[name] !== 'function') {
      window.I[name] = SCREENSHOT_FALLBACK_ICON;
    }
  });
}

function boxStyle(box, width, height, extra) {
  return {
    position: 'absolute',
    left: `${box.x}%`,
    top: `${box.y}%`,
    width: `${box.w}%`,
    ...extra,
  };
}

function snapBoxToScreenCenter(box) {
  if (!box) return { box, guides: { x: false, y: false } };
  const snapThreshold = 1.6;
  const centerX = (box.x || 0) + ((box.w || 0) / 2);
  const centerY = (box.y || 0) + ((box.h || 0) / 2);
  let nextX = box.x || 0;
  let nextY = box.y || 0;
  let snapX = false;
  let snapY = false;
  if (Math.abs(centerX - 50) <= snapThreshold) {
    nextX = 50 - ((box.w || 0) / 2);
    snapX = true;
  }
  if (Math.abs(centerY - 50) <= snapThreshold) {
    nextY = 50 - ((box.h || 0) / 2);
    snapY = true;
  }
  return {
    box: { ...box, x: nextX, y: nextY },
    guides: { x: snapX, y: snapY },
  };
}

function framePresentation(frameStyle) {
  if (frameStyle === 'android-flat') {
    return { shellRadius: 0.11, shellColor: '#14171b', rotate: 0, skew: 0, shadow: '0 16px 32px rgba(0,0,0,0.34)' };
  }
  if (frameStyle === 'ios-3d-left') {
    return { shellRadius: 0.16, shellColor: '#08090c', rotate: -10, skew: -4, shadow: '18px 24px 32px rgba(0,0,0,0.28)' };
  }
  if (frameStyle === 'ios-3d-right') {
    return { shellRadius: 0.16, shellColor: '#08090c', rotate: 10, skew: 4, shadow: '-18px 24px 32px rgba(0,0,0,0.28)' };
  }
  return { shellRadius: 0.16, shellColor: '#0a0b0d', rotate: 0, skew: 0, shadow: '0 8px 20px rgba(0,0,0,0.5), inset 0 0 0 3px rgba(255,255,255,0.08)' };
}

function ambientPresentation(style, app, kind) {
  if (style === 'clean') return { background: 'transparent', opacity: 0 };
  if (style === 'spotlight') {
    return { background: `radial-gradient(48% 36% at 52% 28%, ${app.tint2} 0%, transparent 70%)`, opacity: 0.68, mixBlendMode: 'screen' };
  }
  if (style === 'mesh') {
    return { background: `radial-gradient(42% 38% at 18% 20%, ${app.tint} 0%, transparent 70%), radial-gradient(52% 40% at 78% 18%, ${app.tint2} 0%, transparent 74%), radial-gradient(60% 46% at 52% 100%, rgba(255,255,255,0.18) 0%, transparent 72%)`, opacity: 0.74, mixBlendMode: 'soft-light' };
  }
  if (style === 'halo') {
    return { background: `radial-gradient(42% 34% at 50% 62%, rgba(255,255,255,0.42) 0%, transparent 58%), radial-gradient(62% 44% at 50% ${kind === 'headline' ? '110%' : '0%'}, ${app.tint2} 0%, transparent 66%)`, opacity: 0.72, mixBlendMode: 'screen' };
  }
  return { background: `radial-gradient(60% 40% at 50% ${kind === 'headline' ? '110%' : '-10%'}, ${app.tint2} 0%, transparent 60%)`, opacity: 0.55, mixBlendMode: 'soft-light' };
}

function headlinePresentation(textStyle, kind, tmpl, width, align) {
  const shared = {
    width: '100%',
    textAlign: align || 'left',
    textWrap: 'balance',
  };
  if (textStyle === 'jumbo') {
    return { ...shared, fontSize: kind === 'stat' ? width * 0.23 : (kind === 'headline' ? width * 0.145 : width * 0.108), lineHeight: 0.96, fontWeight: 800, letterSpacing: '-0.045em' };
  }
  if (textStyle === 'editorial') {
    return { ...shared, fontSize: kind === 'headline' ? width * 0.118 : width * 0.094, lineHeight: 1.04, fontWeight: 560, letterSpacing: '-0.028em', fontStyle: tmpl.type === 'serif' ? 'italic' : 'normal' };
  }
  if (textStyle === 'mono-label') {
    return { ...shared, fontSize: kind === 'headline' ? width * 0.108 : width * 0.09, lineHeight: 1, fontWeight: 700, letterSpacing: '-0.032em', textTransform: 'uppercase' };
  }
  if (textStyle === 'soft') {
    return { ...shared, fontSize: kind === 'headline' ? width * 0.12 : width * 0.092, lineHeight: 1.06, fontWeight: 640, letterSpacing: '-0.03em' };
  }
  return { ...shared, fontSize: kind === 'stat' ? width * 0.2 : (kind === 'headline' ? width * 0.13 : width * 0.095), lineHeight: kind === 'stat' ? 0.95 : 1.02, fontWeight: kind === 'lifestyle' ? 500 : (kind === 'stat' ? 800 : 700), letterSpacing: '-0.03em', fontStyle: kind === 'lifestyle' && tmpl.type === 'serif' ? 'italic' : 'normal' };
}

function subPresentation(textStyle, kind, width, align) {
  if (textStyle === 'mono-label') {
    return { width: '100%', fontSize: width * 0.036, opacity: 0.82, textTransform: 'uppercase', letterSpacing: '0.09em', textAlign: align || 'left', lineHeight: 1.42 };
  }
  if (textStyle === 'editorial') {
    return { width: '100%', fontSize: width * 0.038, opacity: 0.76, textAlign: align || 'left', lineHeight: 1.48 };
  }
  if (textStyle === 'soft') {
    return { width: '100%', fontSize: width * 0.041, opacity: 0.68, textAlign: align || 'left', lineHeight: 1.42 };
  }
  return { width: '100%', fontSize: width * 0.04, opacity: 0.72, textTransform: kind === 'stat' ? 'uppercase' : 'none', letterSpacing: kind === 'stat' ? '0.08em' : 'normal', textAlign: align || 'left', lineHeight: 1.35 };
}

function ctaPresentation(style, tmpl, width) {
  if (style === 'block') {
    return { background: tmpl.accent, color: tmpl.type === 'mono' ? '#0a0b0d' : (tmpl.accent === '#fff' ? '#0a0b0d' : '#fff'), padding: `${width * 0.032}px ${width * 0.024}px`, borderRadius: width * 0.02, fontSize: width * 0.04, fontWeight: 700, border: 'none' };
  }
  if (style === 'outline') {
    return { background: 'transparent', color: tmpl.accent, padding: `${width * 0.028}px ${width * 0.02}px`, borderRadius: 999, fontSize: width * 0.039, fontWeight: 650, border: `1.5px solid ${tmpl.accent}` };
  }
  if (style === 'glass') {
    return { background: 'rgba(255,255,255,0.16)', color: '#fff', padding: `${width * 0.03}px ${width * 0.02}px`, borderRadius: 999, fontSize: width * 0.04, fontWeight: 650, border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(10px)' };
  }
  return { background: tmpl.accent, color: tmpl.type === 'mono' ? '#0a0b0d' : (tmpl.accent === '#fff' ? '#0a0b0d' : '#fff'), padding: `${width * 0.03}px ${width * 0.02}px`, borderRadius: 999, fontSize: width * 0.04, fontWeight: 600, border: 'none' };
}

function chromePresentation(style, width, app) {
  if (style === 'hidden') return null;
  if (style === 'minimal') {
    return { wrapper: { padding: width * 0.052, display: 'flex', alignItems: 'center', gap: 6, opacity: 0.78 }, icon: { width: width * 0.056, height: width * 0.056, borderRadius: width * 0.018 }, text: { fontSize: width * 0.036, fontWeight: 600, letterSpacing: '-0.015em' } };
  }
  if (style === 'floating') {
    return { wrapper: { margin: width * 0.055, padding: `${width * 0.018}px ${width * 0.024}px`, display: 'inline-flex', alignItems: 'center', gap: 6, opacity: 0.96, background: 'rgba(255,255,255,0.14)', borderRadius: 999, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }, icon: { width: width * 0.062, height: width * 0.062, borderRadius: width * 0.02 }, text: { fontSize: width * 0.038, fontWeight: 650, letterSpacing: '-0.02em' } };
  }
  return { wrapper: { padding: width * 0.07, display: 'flex', alignItems: 'center', gap: 6, opacity: 0.9 }, icon: { width: width * 0.07, height: width * 0.07, borderRadius: width * 0.02 }, text: { fontSize: width * 0.045, fontWeight: 600, letterSpacing: '-0.02em' } };
}

function mergeDecorations(decorations) {
  return window.SHIPSHOT?.normalizeDecorations
    ? window.SHIPSHOT.normalizeDecorations(decorations)
    : (Array.isArray(decorations) ? decorations : []);
}

function parseActiveElement(activeElement) {
  if (!activeElement) return { kind: null, id: null };
  if (activeElement.startsWith('deco:')) return { kind: 'deco', id: activeElement.slice(5) };
  return { kind: 'core', id: activeElement };
}

function decorationBounds(decoration) {
  return {
    x: decoration.x,
    y: decoration.y,
    w: decoration.w,
  };
}

function boxHeightForElement(box, elementId) {
  if (!box) return 0;
  if (elementId === 'phone') return ((box.w || 0) * 2.06) / 2.16;
  if (elementId === 'chrome') return 8;
  if (elementId === 'image') return Math.max((box.w || 0) * 0.82, 16);
  if (elementId === 'headline') return 18;
  if (elementId === 'sub') return 12;
  if (elementId === 'cta') return 8;
  if (elementId === 'burst') return box.w || 0;
  return Math.max((box.w || 0) * 0.28, 10);
}

function updateDecoration(decorations, id, patch) {
  return decorations.map((item) => item.id === id ? { ...item, ...patch } : item);
}

function resolveFontFamily(fontFamily, fallback = 'var(--font-sans)') {
  return fontFamily || fallback;
}

function applyTextBoxOverrides(baseStyle, box, fallbackColor = '') {
  const next = { ...baseStyle };
  if (typeof box?.fontSizeScale === 'number' && box.fontSizeScale > 0) {
    next.fontSize = (baseStyle.fontSize || 16) * box.fontSizeScale;
  }
  if (typeof box?.fontWeight === 'number' && box.fontWeight > 0) {
    next.fontWeight = box.fontWeight;
  }
  if (typeof box?.lineHeight === 'number' && box.lineHeight > 0) {
    next.lineHeight = box.lineHeight;
  }
  if (box?.fontStyle) {
    next.fontStyle = box.fontStyle;
  }
  if (box?.textDecoration) {
    next.textDecoration = box.textDecoration;
  }
  if (box?.color || fallbackColor) {
    next.color = box?.color || fallbackColor;
  }
  return next;
}

function defaultTextPanelMetrics(role, { kind = 'headline', templateId = 't1', textStyle = 'crisp', ctaStyle = 'pill', width = 324, align = 'left' } = {}) {
  const tmpl = (window.DATA?.TEMPLATES || []).find((item) => item.id === templateId) || (window.DATA?.TEMPLATES || [])[0] || { accent: '#111', type: 'sans' };
  if (role === 'headline') {
    return headlinePresentation(textStyle, kind, tmpl, width, align);
  }
  if (role === 'sub') {
    return subPresentation(textStyle, kind, width, align);
  }
  if (role === 'cta') {
    return { textAlign: 'center', ...ctaPresentation(ctaStyle, tmpl, width) };
  }
  return {
    fontSize: Math.max(18, width * 0.08),
    lineHeight: 1.02,
    fontWeight: 700,
    letterSpacing: '-0.03em',
    textAlign: align || 'left',
    color: '#f5f6f8',
  };
}

function DecorationChip({ decoration, width, accent }) {
  if (decoration.type === 'image') {
    const radius = Math.max(0, Number(decoration.borderRadius) || 0);
    const borderWidth = Math.max(0, Number(decoration.borderWidth) || 0);
    const shadow = `${Number(decoration.shadowX) || 0}px ${Number(decoration.shadowY) || 0}px ${Math.max(0, Number(decoration.shadowBlur) || 0)}px ${decoration.shadowColor || '#000000'}`;
    const transformParts = [
      decoration.flipX ? 'scaleX(-1)' : '',
      decoration.flipY ? 'scaleY(-1)' : '',
    ].filter(Boolean);
    const transform = transformParts.length ? transformParts.join(' ') : 'none';
    return (
      <div style={{ width: '100%', aspectRatio: '4 / 5', borderRadius: radius, overflow: 'hidden', border: borderWidth ? `${borderWidth}px solid ${decoration.borderColor || '#000000'}` : 'none', boxShadow: shadow, transform }}>
        {decoration.mediaSrc ? (
          <img src={decoration.mediaSrc} alt="" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${accent}, rgba(255,255,255,0.16))`, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: width * 0.04, color: '#fff', fontSize: Math.max(10, width * 0.036), fontWeight: 700, letterSpacing: '-0.02em' }}>
            {decoration.text || 'Image'}
          </div>
        )}
      </div>
    );
  }

  if (decoration.type === 'text') {
    const textStyle = applyTextBoxOverrides({
      width: '100%',
      color: decoration.style === 'dark' ? '#fff' : '#f5f6f8',
      fontSize: Math.max(12, width * 0.07),
      fontWeight: 700,
      lineHeight: 1.02,
      letterSpacing: '-0.03em',
      textAlign: decoration.align || 'left',
      fontFamily: resolveFontFamily(decoration.fontFamily, 'var(--font-sans)'),
    }, decoration, decoration.style === 'dark' ? '#fff' : '#f5f6f8');
    return (
      <div style={textStyle}>
        {decoration.text}
      </div>
    );
  }

  const fg = decoration.style === 'dark' ? '#fff' : (decoration.style === 'accent' ? '#fff' : '#0a0b0d');
  const bg = decoration.style === 'dark'
    ? 'rgba(10,11,13,0.72)'
    : (decoration.style === 'accent' ? accent : 'rgba(255,255,255,0.8)');
  const fontSize = Math.max(8, width * (decoration.type === 'quote' ? 0.03 : 0.034));
  const fontFamily = resolveFontFamily(decoration.fontFamily, 'var(--font-sans)');

  if (decoration.type === 'laurel') {
    return (
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: width * 0.016, color: fg }}>
        <span style={{ fontSize: fontSize * 1.5, lineHeight: 1 }}>❦</span>
        <div style={{ padding: `${width * 0.012}px ${width * 0.026}px`, borderRadius: 999, background: bg, fontSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily }}>{decoration.text}</div>
        <span style={{ fontSize: fontSize * 1.5, lineHeight: 1, transform: 'scaleX(-1)' }}>❦</span>
      </div>
    );
  }

  if (decoration.type === 'stars') {
    return (
      <div style={{ width: '100%', padding: `${width * 0.014}px ${width * 0.024}px`, borderRadius: 999, background: bg, color: fg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: width * 0.012, fontSize, fontWeight: 700, fontFamily }}>
        <span>★★★★★</span>
        <span>{decoration.text}</span>
      </div>
    );
  }

  if (decoration.type === 'burst') {
    return (
      <div style={{ width: '100%', aspectRatio: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', clipPath: 'polygon(50% 0%, 61% 15%, 79% 7%, 76% 27%, 94% 31%, 82% 45%, 100% 58%, 80% 64%, 86% 84%, 67% 77%, 62% 100%, 48% 84%, 33% 100%, 28% 78%, 9% 86%, 14% 65%, 0% 58%, 17% 46%, 5% 30%, 24% 26%, 21% 8%, 39% 15%)', background: accent, color: '#fff', fontSize, fontWeight: 800, lineHeight: 1.1, padding: width * 0.025, fontFamily }}>
        {decoration.text}
      </div>
    );
  }

  if (decoration.type === 'quote') {
    return (
      <div style={{ width: '100%', padding: `${width * 0.02}px ${width * 0.024}px`, borderRadius: width * 0.045, background: bg, color: fg, fontSize, lineHeight: 1.35, fontWeight: 600, fontFamily }}>
        "{decoration.text}"
      </div>
    );
  }

  if (decoration.type === 'ribbon') {
    return (
      <div style={{ width: '100%', padding: `${width * 0.012}px ${width * 0.02}px`, background: bg, color: fg, borderRadius: width * 0.02, fontSize, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily }}>
        {decoration.text}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', padding: `${width * 0.014}px ${width * 0.024}px`, borderRadius: 999, background: bg, color: fg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize, fontWeight: 700, fontFamily }}>
      {decoration.text}
    </div>
  );
}

function ScreenshotCard({ kind = 'headline', template = 't1', app = { name: 'Preview', icon: 'P', tint: 'oklch(80% 0.12 60)', tint2: 'oklch(65% 0.14 30)' }, width = 180, headline, sub, ctaLabel, bg = null, locale = 'en-US', idx = 0, selected = false, layout = null, decorations = null, frameStyle = 'ios-classic', textStyle = 'crisp', ambientStyle = 'glow', ctaStyle = 'pill', chromeStyle = 'solid', watermark = '', fontFamily = '', editable = false, activeElement = null, onSelectElement = null, onLayoutChange = null, onDecorationsChange = null, onDragCommit = null, onDuplicateElement = null, onDeleteElement = null, onMoveLayer = null, onRotateElement = null, onTextChange = null }) {
  const h = width * 2.16; // iPhone aspect
  const tmpl = (window.DATA.TEMPLATES.find(t => t.id === template) || window.DATA.TEMPLATES[0]);
  const copy = creativeCopy(kind, app, headline, sub, locale);
  const background = bg || tmpl.bg;
  const [draftLayout, setDraftLayout] = React.useState(() => mergeLayout(kind, layout));
  const [draftDecorations, setDraftDecorations] = React.useState(() => mergeDecorations(decorations));
  const elements = draftLayout;
  const decorationItems = draftDecorations;
  const frameRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const rotateRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const [editingTextId, setEditingTextId] = React.useState(null);
  const [editingTextValue, setEditingTextValue] = React.useState('');
  const [hoveredElementId, setHoveredElementId] = React.useState(null);
  const editingTextareaRef = React.useRef(null);
  const visible = visibleElements(kind);
  const active = parseActiveElement(activeElement);
  const ambient = ambientPresentation(ambientStyle, app, kind);
  const headlineStyles = applyTextBoxOverrides(headlinePresentation(textStyle, kind, tmpl, width, elements?.headline?.align), elements?.headline, tmpl.accent);
  const subStyles = applyTextBoxOverrides(subPresentation(textStyle, kind, width, elements?.sub?.align), elements?.sub, tmpl.accent);
  const ctaStyles = applyTextBoxOverrides(ctaPresentation(ctaStyle, tmpl, width), elements?.cta, ctaPresentation(ctaStyle, tmpl, width).color);
  const chrome = chromePresentation(chromeStyle, width, app);
  const screenFontFamily = resolveFontFamily(fontFamily, tmpl.type === 'mono' ? 'var(--font-mono)' : (tmpl.type === 'serif' ? '"Fraunces","Iowan Old Style","Georgia",serif' : 'var(--font-sans)'));

  React.useEffect(() => {
    if (!dragRef.current) {
      setDraftLayout(mergeLayout(kind, layout));
    }
  }, [kind, layout]);

  React.useEffect(() => {
    if (!dragRef.current) {
      setDraftDecorations(mergeDecorations(decorations));
    }
  }, [decorations]);

  React.useEffect(() => {
    if (!activeElement || activeElement !== editingTextId) {
      setEditingTextId(null);
    }
  }, [activeElement, editingTextId]);

  React.useEffect(() => {
    if (!editingTextareaRef.current) return;
    editingTextareaRef.current.style.height = 'auto';
    editingTextareaRef.current.style.height = `${editingTextareaRef.current.scrollHeight}px`;
  }, [editingTextId, editingTextValue]);

  React.useEffect(() => {
    const handleMove = (event) => {
      const drag = dragRef.current;
      const rotate = rotateRef.current;
      const frame = frameRef.current;
      if (!editable || !frame) return;
      if (rotate) {
        const deltaX = event.clientX - rotate.lastX;
        rotate.lastX = event.clientX;
        if (Math.abs(deltaX) > 0.05) {
          onRotateElement?.(deltaX * 0.55);
        }
        return;
      }
      if (!drag) return;
      const rect = frame.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dx = ((event.clientX - drag.startX) / rect.width) * 100;
      const dy = ((event.clientY - drag.startY) / rect.height) * 100;
      drag.pending = { dx, dy };
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const currentDrag = dragRef.current;
        if (!currentDrag || !currentDrag.pending) return;
        const { dx: nextDx, dy: nextDy } = currentDrag.pending;
        if (currentDrag.type === 'layout') {
          const source = currentDrag.source[currentDrag.elementId];
          if (!source) return;
          const nextElement = {
            ...source,
            x: source.x + nextDx,
            y: source.y + nextDy,
          };
          const snapped = snapBoxToScreenCenter({
            ...nextElement,
            h: boxHeightForElement(nextElement, currentDrag.elementId),
          });
          const nextLayout = {
            ...currentDrag.source,
            [currentDrag.elementId]: {
              ...nextElement,
              x: snapped.box.x,
              y: snapped.box.y,
            },
          };
          currentDrag.latestLayout = nextLayout;
          setDraftLayout(nextLayout);
        } else {
          const source = currentDrag.source.find((item) => item.id === currentDrag.elementId);
          if (!source) return;
          const nextDecoration = {
            ...source,
            x: source.x + nextDx,
            y: source.y + nextDy,
          };
          const decorationBox = decorationBounds(nextDecoration);
          const snapped = snapBoxToScreenCenter({
            ...decorationBox,
            h: boxHeightForElement(decorationBox, nextDecoration.type),
          });
          const nextDecorations = updateDecoration(currentDrag.source, currentDrag.elementId, nextDecoration);
          const snappedDecorations = updateDecoration(nextDecorations, currentDrag.elementId, {
            ...nextDecoration,
            x: snapped.box.x,
            y: snapped.box.y,
          });
          currentDrag.latestDecorations = snappedDecorations;
          setDraftDecorations(snappedDecorations);
        }
      });
    };
    const handleUp = () => {
      const drag = dragRef.current;
      if (rotateRef.current) {
        rotateRef.current = null;
      }
      if (!drag) return;
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (drag.type === 'layout' && drag.latestLayout) onLayoutChange?.(drag.latestLayout);
      if (drag.type === 'deco' && drag.latestDecorations) onDecorationsChange?.(drag.latestDecorations);
      dragRef.current = null;
      onDragCommit?.();
    };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [editable, onLayoutChange, onDecorationsChange, onDragCommit]);

  const startDrag = (type, elementId, source, event) => {
    if (!editable) return;
    if (editingTextId === elementId) return;
    event.preventDefault();
    event.stopPropagation();
    onSelectElement?.(type === 'deco' ? `deco:${elementId}` : elementId);
    dragRef.current = {
      type,
      elementId,
      startX: event.clientX,
      startY: event.clientY,
      source,
    };
  };

  const startRotate = (event) => {
    if (!editable || !selectedBox) return;
    event.preventDefault();
    event.stopPropagation();
    rotateRef.current = {
      lastX: event.clientX,
    };
  };

  const renderHandle = (elementId, box, child) => {
    if (!box) return child;
    const selectedBox = active.kind === 'core' && active.id === elementId;
    const hovered = hoveredElementId === elementId;
    return (
      <div
        onPointerDown={editable ? ((event) => startDrag('layout', elementId, elements, event)) : undefined}
        onPointerEnter={editable ? (() => setHoveredElementId(elementId)) : undefined}
        onPointerLeave={editable ? (() => setHoveredElementId((currentValue) => currentValue === elementId ? null : currentValue)) : undefined}
        onClick={editable ? ((event) => {
          event.stopPropagation();
          onSelectElement?.(elementId);
        }) : undefined}
        style={{
          ...boxStyle(box, width, h),
          transform: `rotate(${box.rotation || 0}deg)`,
          transformOrigin: 'center center',
          cursor: editable ? 'grab' : 'default',
          outline: editable ? (selectedBox ? '2px solid var(--accent)' : (hovered ? '1.5px solid rgba(255,255,255,0.7)' : 'none')) : 'none',
          outlineOffset: editable ? 4 : 0,
          borderRadius: 12,
          zIndex: box.z || 1,
          display: box.hidden ? 'none' : 'block',
        }}
      >
        {editable && (selectedBox || hovered) ? (
          <div style={{ position: 'absolute', top: -22, left: 0, fontSize: 10, padding: '2px 6px', borderRadius: 999, background: selectedBox ? 'var(--accent)' : 'rgba(10,11,13,0.6)', color: selectedBox ? 'var(--accent-fg)' : '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {elementId}
          </div>
        ) : null}
        {child}
      </div>
    );
  };

  const startInlineEdit = (elementId, value, event) => {
    if (!editable) return;
    event?.stopPropagation?.();
    onSelectElement?.(elementId);
    setEditingTextId(elementId);
    setEditingTextValue(value || '');
  };

  const commitInlineEdit = () => {
    if (!editingTextId) return;
    const nextValue = editingTextValue.trim();
    if (editingTextId === 'headline') onTextChange?.({ headline: nextValue });
    if (editingTextId === 'sub') onTextChange?.({ sub: nextValue });
    if (editingTextId === 'cta') onTextChange?.({ ctaLabel: nextValue });
    if (editingTextId.startsWith('deco:')) {
      const decoId = editingTextId.slice(5);
      onDecorationsChange?.(updateDecoration(decorationItems, decoId, { text: nextValue || 'New text' }));
    }
    setEditingTextId(null);
  };

  const renderInlineText = (elementId, value, textStyles, multiline = true) => {
    const isEditing = editingTextId === elementId;
    if (isEditing) {
      return (
        <textarea
          ref={editingTextareaRef}
          autoFocus
          value={editingTextValue}
          onChange={(event) => {
            setEditingTextValue(event.target.value);
            event.target.style.height = 'auto';
            event.target.style.height = `${event.target.scrollHeight}px`;
          }}
          onBlur={commitInlineEdit}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              setEditingTextId(null);
            }
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey || !multiline)) {
              event.preventDefault();
              commitInlineEdit();
            }
          }}
          className="editor-inline-textarea"
          rows={multiline ? 1 : 1}
          style={{
            ...textStyles,
            width: '100%',
            minHeight: multiline ? width * 0.12 : width * 0.09,
            height: multiline ? 'auto' : width * 0.09,
            resize: 'none',
            background: 'transparent',
            color: textStyles.color || 'inherit',
            border: 'none',
            borderRadius: 0,
            padding: 0,
            outline: 'none',
            overflow: 'visible',
            boxShadow: 'none',
            caretColor: textStyles.color || 'currentColor',
          }}
        />
      );
    }
    return (
      <div
        onDoubleClick={(event) => startInlineEdit(elementId, value, event)}
        style={{ ...textStyles, cursor: editable ? 'text' : 'inherit' }}
      >
        {value}
      </div>
    );
  };

  const renderDecoration = (decoration) => {
    const box = decorationBounds(decoration);
    const selectedBox = active.kind === 'deco' && active.id === decoration.id;
    const hovered = hoveredElementId === `deco:${decoration.id}`;
    const cloneType = String(decoration.type || '');
    const cloneText = decoration.text || (cloneType === 'sub' ? copy.sub : (cloneType === 'cta' ? (ctaLabel || 'Get the app') : copy.head));
    const cloneFontFamily = resolveFontFamily(decoration.fontFamily, screenFontFamily);
    let cloneChild = null;
    if (cloneType === 'headline') cloneChild = <div style={applyTextBoxOverrides({ ...headlineStyles, fontFamily: cloneFontFamily, textAlign: decoration.align || headlineStyles.textAlign }, decoration, headlineStyles.color || tmpl.accent)}>{cloneText}</div>;
    else if (cloneType === 'sub') cloneChild = <div style={applyTextBoxOverrides({ ...subStyles, fontFamily: cloneFontFamily, textAlign: decoration.align || subStyles.textAlign }, decoration, subStyles.color || tmpl.accent)}>{cloneText}</div>;
    else if (cloneType === 'cta') cloneChild = <div style={applyTextBoxOverrides({ display: 'inline-flex', justifyContent: 'center', width: '100%', ...ctaStyles, fontFamily: cloneFontFamily, textAlign: decoration.align || 'center' }, decoration, ctaStyles.color)}>{cloneText}</div>;
    else if (cloneType === 'text') cloneChild = renderInlineText(`deco:${decoration.id}`, cloneText, applyTextBoxOverrides({ color: '#f5f6f8', fontSize: width * 0.08, fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.03em', fontFamily: cloneFontFamily, textAlign: decoration.align || 'left' }, decoration, '#f5f6f8'), true);
    else if (cloneType === 'phone') cloneChild = <div style={{ width: '100%', pointerEvents: 'none' }}><FakePhone app={app} kind={kind} tmpl={tmpl} width={width * (box.w / 100)} idx={idx} locale={locale} frameStyle={frameStyle} /></div>;
    else if (cloneType === 'chrome') cloneChild = (
      <div style={{ width: '100%', display: 'inline-flex', alignItems: 'center', gap: width * 0.016, padding: `${width * 0.018}px ${width * 0.024}px`, borderRadius: decoration.style === 'floating' ? 999 : width * 0.02, background: decoration.style === 'floating' ? 'rgba(255,255,255,0.14)' : 'transparent', border: decoration.style === 'floating' ? '1px solid rgba(255,255,255,0.12)' : 'none', color: tmpl.accent }}>
        <div style={{ width: width * 0.07, height: width * 0.07, borderRadius: width * 0.02, background: `linear-gradient(135deg, ${app.tint}, ${app.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: width * 0.04 }}>{app.icon}</div>
        <div style={{ fontSize: width * 0.042, fontWeight: decoration.style === 'minimal' ? 600 : 650, letterSpacing: '-0.02em' }}>{app.name}</div>
      </div>
    );
    return (
      <div
        key={decoration.id}
        onPointerDown={(event) => startDrag('deco', decoration.id, decorationItems, event)}
        onPointerEnter={editable ? (() => setHoveredElementId(`deco:${decoration.id}`)) : undefined}
        onPointerLeave={editable ? (() => setHoveredElementId((currentValue) => currentValue === `deco:${decoration.id}` ? null : currentValue)) : undefined}
        onClick={(event) => {
          event.stopPropagation();
          onSelectElement?.(`deco:${decoration.id}`);
        }}
        style={{
          ...boxStyle(box, width, h),
          transform: `rotate(${decoration.rotation || 0}deg)`,
          transformOrigin: 'center center',
          cursor: 'grab',
          outline: editable ? (selectedBox ? '2px solid var(--accent)' : (hovered ? '1.5px solid rgba(255,255,255,0.7)' : 'none')) : 'none',
          outlineOffset: 3,
          borderRadius: 12,
          zIndex: decoration.z || 4,
          display: decoration.hidden ? 'none' : 'block',
        }}
      >
        {cloneChild || <DecorationChip decoration={decoration} width={width} accent={app.tint2} />}
      </div>
    );
  };

  const selectedBox = React.useMemo(() => {
    if (!active.kind) return null;
    if (active.kind === 'deco') {
      const decoration = decorationItems.find((item) => item.id === active.id);
      return decoration ? { ...decorationBounds(decoration), h: boxHeightForElement(decorationBounds(decoration), decoration.type), rotation: decoration.rotation || 0 } : null;
    }
    const box = elements?.[active.id] || null;
    return box ? { ...box, h: boxHeightForElement(box, active.id) } : null;
  }, [active.kind, active.id, decorationItems, elements]);

  const centerGuides = React.useMemo(() => {
    if (!selectedBox) return { x: false, y: false, centerX: 0, centerY: 0 };
    const centerX = selectedBox.x + ((selectedBox.w || 0) / 2);
    const centerY = selectedBox.y + ((selectedBox.h || 0) / 2);
    return {
      x: Math.abs(centerX - 50) <= 1.2,
      y: Math.abs(centerY - 50) <= 1.2,
      centerX,
      centerY,
    };
  }, [selectedBox]);

  const floatingToolbar = editable && selectedBox ? (
    <>
      <div
        style={{
          position: 'absolute',
          left: `${Math.max(4, selectedBox.x + (selectedBox.w / 2) - 18)}%`,
          top: `${Math.max(3, selectedBox.y - 6)}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: 120,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 2,
          padding: '4px',
          borderRadius: 12,
          background: 'rgba(8,9,12,0.92)',
          boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
        }}
      >
        <button className="editor-float-btn" onClick={(event) => { event.stopPropagation(); onDuplicateElement?.(); }}><window.I.Copy /></button>
        <button className="editor-float-btn" onClick={(event) => { event.stopPropagation(); onDeleteElement?.(); }}><window.I.Trash /></button>
        <button className="editor-float-btn" onClick={(event) => { event.stopPropagation(); onMoveLayer?.('back'); }}><window.I.ChevronD /></button>
        <button className="editor-float-btn" onClick={(event) => { event.stopPropagation(); onMoveLayer?.('up'); }}><window.I.ArrowUp /></button>
      </div>
      <button
        className="editor-rotate-btn"
        onPointerDown={startRotate}
        style={{
          position: 'absolute',
          left: `${selectedBox.x + (selectedBox.w / 2)}%`,
          top: `${Math.min(96, selectedBox.y + (selectedBox.h || Math.max(18, selectedBox.w * 0.32)) + 4)}%`,
          transform: 'translate(-50%, 0)',
          zIndex: 120,
        }}
      >
        <window.I.RotateBoth />
      </button>
    </>
  ) : null;

  const coreRenderables = [
    (!editable && chrome && elements.chrome && !elements.chrome.hidden) ? {
      id: 'chrome',
      z: elements.chrome?.z || 10,
      hidden: elements.chrome?.hidden,
      node: renderHandle(
        'chrome',
        elements.chrome,
        <div style={{ width: '100%', display: 'inline-flex', alignItems: 'center', gap: width * 0.016, padding: `${width * 0.018}px ${width * 0.024}px`, borderRadius: chromeStyle === 'floating' ? 999 : width * 0.02, background: chromeStyle === 'floating' ? 'rgba(255,255,255,0.14)' : 'transparent', border: chromeStyle === 'floating' ? '1px solid rgba(255,255,255,0.12)' : 'none', backdropFilter: chromeStyle === 'floating' ? 'blur(8px)' : 'none' }}>
          <div style={{ width: chromeStyle === 'minimal' ? width * 0.056 : width * 0.07, height: chromeStyle === 'minimal' ? width * 0.056 : width * 0.07, borderRadius: chromeStyle === 'minimal' ? width * 0.018 : width * 0.02, background: `linear-gradient(135deg, ${app.tint}, ${app.tint2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: width * 0.04 }}>{app.icon}</div>
          <div style={{ color: tmpl.accent, fontSize: chrome.text.fontSize, fontWeight: chrome.text.fontWeight, letterSpacing: chrome.text.letterSpacing }}>{app.name}</div>
        </div>
      ),
    } : null,
    visible.headline ? { id: 'headline', z: elements.headline?.z || 40, hidden: elements.headline?.hidden, node: renderHandle('headline', elements.headline, renderInlineText('headline', copy.head, { ...headlineStyles, fontFamily: resolveFontFamily(elements.headline?.fontFamily, screenFontFamily) }, true)) } : null,
    visible.sub ? { id: 'sub', z: elements.sub?.z || 30, hidden: elements.sub?.hidden, node: renderHandle('sub', elements.sub, renderInlineText('sub', copy.sub, { ...subStyles, fontFamily: resolveFontFamily(elements.sub?.fontFamily, screenFontFamily) }, true)) } : null,
    visible.phone ? { id: 'phone', z: elements.phone?.z || 20, hidden: elements.phone?.hidden, node: renderHandle('phone', elements.phone, <div style={{ width: '100%', pointerEvents: 'none' }}><FakePhone app={app} kind={kind} tmpl={tmpl} width={width * (elements.phone.w / 100)} idx={idx} locale={locale} frameStyle={frameStyle} phoneLayout={elements.phone} /></div>) } : null,
    visible.cta ? { id: 'cta', z: elements.cta?.z || 50, hidden: elements.cta?.hidden, node: renderHandle('cta', elements.cta, renderInlineText('cta', ctaLabel || 'Get the app', { display: 'inline-flex', justifyContent: 'center', width: '100%', ...ctaStyles, zIndex: 3, fontFamily: resolveFontFamily(elements.cta?.fontFamily, screenFontFamily) }, false)) } : null,
  ].filter(Boolean).filter((item) => !item.hidden).sort((a, b) => a.z - b.z);

  return (
    <div ref={frameRef} style={{
      width, height: h,
      borderRadius: width * 0.12,
      background,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: selected
        ? `0 0 0 2px var(--accent), 0 10px 24px rgba(0,0,0,0.5)`
        : `0 10px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)`,
      fontFamily: screenFontFamily,
      color: tmpl.accent,
      transition: 'transform 200ms, box-shadow 200ms',
    }} onClick={() => editable && onSelectElement?.(null)}>
      {/* ambient blob */}
      <div style={{ position: 'absolute', inset: 0, background: ambient.background, opacity: ambient.opacity, mixBlendMode: ambient.mixBlendMode || 'soft-light' }} />

      {editable && centerGuides.x ? (
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'rgba(244,98,31,0.8)', zIndex: 110, pointerEvents: 'none' }} />
      ) : null}
      {editable && centerGuides.y ? (
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'rgba(244,98,31,0.8)', zIndex: 110, pointerEvents: 'none' }} />
      ) : null}
      {editable && (centerGuides.x || centerGuides.y) ? (
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 111, pointerEvents: 'none' }}>
          <div className="editor-center-lock">
            <window.I.Lock />
            <span>{centerGuides.x && centerGuides.y ? 'Centered' : (centerGuides.x ? 'H center' : 'V center')}</span>
          </div>
        </div>
      ) : null}

      {decorationItems.filter((item) => !item.hidden).sort((a, b) => (a.z || 60) - (b.z || 60)).map(renderDecoration)}

      {coreRenderables.map((item) => <React.Fragment key={item.id}>{item.node}</React.Fragment>)}
      {floatingToolbar}

      {watermark ? (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: width * 0.08, pointerEvents: 'none' }}>
          <div style={{ padding: `${width * 0.015}px ${width * 0.028}px`, borderRadius: 999, background: 'rgba(10,11,13,0.58)', color: '#fff', fontSize: width * 0.032, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', backdropFilter: 'blur(8px)' }}>
            {watermark}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FakePhone({ app, kind, tmpl, width = 140, idx = 0, locale = 'en-US', frameStyle = 'ios-classic', phoneLayout = null }) {
  const h = width * 2.06;
  const frame = framePresentation(frameStyle);
  const customShadow = phoneLayout?.shadowColor
    ? `${Number(phoneLayout.shadowX) || 0}px ${Number(phoneLayout.shadowY) || 0}px ${Math.max(0, Number(phoneLayout.shadowBlur) || 0)}px ${phoneLayout.shadowColor}`
    : '';
  const phoneShadow = customShadow ? `${customShadow}, ${frame.shadow}` : frame.shadow;
  const mediaSrc = phoneLayout?.mediaSrc || '';
  const mediaType = String(phoneLayout?.mediaType || '');
  const mediaFit = phoneLayout?.mediaFit || 'cover';
  // Draw a tiny stylized iOS app screen
  return (
    <div style={{
      width, height: h, borderRadius: width * 0.16,
      background: frame.shellColor,
      boxShadow: phoneShadow,
      padding: width * 0.05,
      margin: '0 auto',
      overflow: 'hidden',
      position: 'relative',
      transform: `perspective(${width * 8}px) rotateY(${frame.rotate}deg) rotateX(${Math.abs(frame.skew) * 0.3}deg)`,
      transformStyle: 'preserve-3d',
    }}>
      {/* notch */}
      {frameStyle !== 'android-flat' ? (
        <div style={{ position: 'absolute', top: width * 0.03, left: '50%', transform: 'translateX(-50%)', width: width * 0.3, height: width * 0.07, borderRadius: 99, background: '#000', zIndex: 2 }} />
      ) : (
        <div style={{ position: 'absolute', top: width * 0.03, left: '50%', transform: 'translateX(-50%)', width: width * 0.14, height: width * 0.014, borderRadius: 99, background: 'rgba(255,255,255,0.16)', zIndex: 2 }} />
      )}

      <div style={{
        width: '100%', height: '100%', borderRadius: width * frame.shellRadius,
        background: `linear-gradient(160deg, ${app.tint}, ${app.tint2})`,
        padding: width * 0.06, display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}>
        {mediaSrc ? (
          mediaType.startsWith('video/')
            ? <video src={mediaSrc} autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: mediaFit, zIndex: 0 }} />
            : <img src={mediaSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: mediaFit, zIndex: 0 }} />
        ) : null}
        {mediaSrc ? null : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,9,13,0.04), rgba(7,9,13,0.18))', zIndex: 0 }} />}
        {!mediaSrc ? (
          <>
            <div style={{ height: width * 0.12, position: 'relative', zIndex: 1 }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flex: 1 }}>
              <PhoneScene idx={idx} width={width} app={app} locale={locale} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function uiLocale(locale) {
  const dict = {
    'en-US': { deep_work: 'Deep work', ambient: 'Ambient', today: 'Today', next_session: 'Next session', this_week: 'This week', tonight: 'Tonight', sleep_mode: 'Sleep mode', dnd: 'Do not disturb', auto_start: 'Auto-start 8pm', sessions: 'Sessions', hours: 'Hours', forest: 'forest', dawn: 'dawn' },
    'en-GB': { deep_work: 'Deep work', ambient: 'Ambient', today: 'Today', next_session: 'Next session', this_week: 'This week', tonight: 'Tonight', sleep_mode: 'Sleep mode', dnd: 'Do not disturb', auto_start: 'Auto-start 8pm', sessions: 'Sessions', hours: 'Hours', forest: 'forest', dawn: 'dawn' },
    'de-DE': { deep_work: 'Fokuszeit', ambient: 'Klange', today: 'Heute', next_session: 'Naechste Session', this_week: 'Diese Woche', tonight: 'Heute Abend', sleep_mode: 'Schlafmodus', dnd: 'Nicht stoeren', auto_start: 'Automatisch 20 Uhr', sessions: 'Sessions', hours: 'Stunden', forest: 'Wald', dawn: 'Morgen' },
    'fr-FR': { deep_work: 'Concentration', ambient: 'Ambiances', today: 'Aujourd hui', next_session: 'Prochaine session', this_week: 'Cette semaine', tonight: 'Ce soir', sleep_mode: 'Mode sommeil', dnd: 'Ne pas deranger', auto_start: 'Demarrage auto 20h', sessions: 'Sessions', hours: 'Heures', forest: 'foret', dawn: 'aube' },
    'ja-JP': { deep_work: '集中', ambient: 'サウンド', today: '今日', next_session: '次のセッション', this_week: '今週', tonight: '今夜', sleep_mode: 'スリープモード', dnd: '通知オフ', auto_start: '20時に自動開始', sessions: '回数', hours: '時間', forest: 'forest', dawn: 'dawn' },
    'pt-BR': { deep_work: 'Foco', ambient: 'Ambientes', today: 'Hoje', next_session: 'Proxima sessao', this_week: 'Nesta semana', tonight: 'Hoje a noite', sleep_mode: 'Modo sono', dnd: 'Nao perturbe', auto_start: 'Inicio automatico 20h', sessions: 'Sessoes', hours: 'Horas', forest: 'floresta', dawn: 'amanhecer' },
  };
  return dict[locale] || dict['en-US'];
}

function PhoneScene({ idx = 0, width, app, locale = 'en-US' }) {
  const t = uiLocale(locale);
  // Different fake UI per idx
  const variants = [
    // Focus timer dial
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: width * 0.04, color: '#fff', flex: 1, justifyContent: 'center' }}>
        <div style={{ fontSize: width * 0.042, opacity: 0.75, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t.deep_work}</div>
        <div style={{ position: 'relative', width: width * 0.6, height: width * 0.6 }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4"/>
            <circle cx="50" cy="50" r="44" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="276" strokeDashoffset="80" transform="rotate(-90 50 50)"/>
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: width * 0.18, fontWeight: 600, fontFeatureSettings: '"tnum"', letterSpacing: '-0.03em' }}>18:42</div>
            <div style={{ fontSize: width * 0.035, opacity: 0.6 }}>25 min · {t.forest}</div>
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
        <div style={{ fontSize: width * 0.075, fontWeight: 700, marginBottom: width * 0.03, letterSpacing: '-0.02em' }}>{t.ambient}</div>
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
          <StatBlock label={t.sessions} value="132" width={width} />
          <StatBlock label={t.hours} value="68" width={width} />
        </div>
      </div>
    ),
    // Today view
    () => (
      <div style={{ color: '#fff', flex: 1, display: 'flex', flexDirection: 'column', gap: width * 0.03 }}>
        <div style={{ fontSize: width * 0.04, opacity: 0.7 }}>{t.today}</div>
        <div style={{ fontSize: width * 0.085, fontWeight: 700, letterSpacing: '-0.02em' }}>Ship the roadmap</div>
        <div style={{ padding: width * 0.04, borderRadius: width * 0.05, background: 'rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: width * 0.02 }}>
          <div style={{ fontSize: width * 0.035, opacity: 0.7 }}>{t.next_session}</div>
          <div style={{ fontSize: width * 0.06, fontWeight: 600 }}>50 min · {t.dawn}</div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 99 }}><div style={{ width: '42%', height: '100%', background: '#fff', borderRadius: 99 }} /></div>
        </div>
      </div>
    ),
    // Chart
    () => (
      <div style={{ color: '#fff', flex: 1, display: 'flex', flexDirection: 'column', gap: width * 0.04 }}>
        <div style={{ fontSize: width * 0.075, fontWeight: 700, letterSpacing: '-0.02em' }}>{t.this_week}</div>
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
        <div style={{ fontSize: width * 0.075, fontWeight: 700, letterSpacing: '-0.02em' }}>{t.tonight}</div>
        {[t.sleep_mode, t.dnd, t.auto_start].map((label,i)=>(
          <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: width * 0.02, borderRadius: width * 0.025, background: 'rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: width * 0.035 }}>{label}</div>
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

function creativeCopy(kind, app, headline, sub, locale = 'en-US') {
  const appName = app?.name || 'Your app';
  const localized = window.SHIPSHOT?.localizedCopyForLocale
    ? window.SHIPSHOT.localizedCopyForLocale(kind, appName, locale)
    : null;
  const base = localized
    ? { head: localized.headline || `${appName}, worth opening.`, sub: localized.sub || '' }
    : { head: `${appName}, worth opening.`, sub: '' };
  return { head: headline || base.head, sub: sub || base.sub };
}

function parseGradientStops(input, fallbackA = '#1b1f24', fallbackB = '#323a45') {
  const raw = String(input || '');
  const matches = raw.match(/(#[0-9a-fA-F]{3,8}|oklch\([^)]*\)|rgba?\([^)]*\)|hsla?\([^)]*\)|[a-zA-Z]+)/g) || [];
  const colors = matches.filter((item) => !item.includes('deg') && item.toLowerCase() !== 'linear' && item.toLowerCase() !== 'gradient');
  return [colors[0] || fallbackA, colors[1] || colors[0] || fallbackB];
}

function escapeXml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function wrapSvgText(value, maxChars) {
  const words = String(value || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.slice(0, 4);
}

function svgTextBlock(lines, x, y, fontSize, lineHeight, color, weight = 700, align = 'start', family = 'Bricolage Grotesque, Arial, sans-serif', italic = false) {
  return `
    <text x="${x}" y="${y}" fill="${escapeXml(color)}" font-size="${fontSize}" font-family="${escapeXml(family)}" font-weight="${weight}" text-anchor="${align}" ${italic ? 'font-style="italic"' : ''}>
      ${lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join('')}
    </text>
  `;
}

function exportPhoneSceneSvg(kind, app, width, height, locale, frameStyle) {
  const t = uiLocale(locale);
  const inset = width * 0.08;
  const top = height * 0.14;
  const card = 'rgba(255,255,255,0.14)';
  const text = '#fff';
  const isAndroid = frameStyle === 'android-flat';
  return `
    <g>
      ${!isAndroid ? `<rect x="${width * 0.36}" y="${height * 0.03}" width="${width * 0.28}" height="${width * 0.06}" rx="${width * 0.03}" fill="#000" />` : `<rect x="${width * 0.43}" y="${height * 0.035}" width="${width * 0.14}" height="${width * 0.012}" rx="${width * 0.006}" fill="rgba(255,255,255,0.24)" />`}
      <text x="${inset}" y="${top}" fill="${text}" font-size="${width * 0.07}" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="700">${escapeXml(app.name)}</text>
      ${kind === 'stat'
        ? `
          <text x="${inset}" y="${top + width * 0.15}" fill="${text}" font-size="${width * 0.18}" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="800">24</text>
          <text x="${inset + width * 0.17}" y="${top + width * 0.15}" fill="rgba(255,255,255,0.72)" font-size="${width * 0.05}" font-family="Bricolage Grotesque, Arial, sans-serif">days</text>
          <rect x="${inset}" y="${top + width * 0.23}" width="${width * 0.84}" height="${width * 0.42}" rx="${width * 0.06}" fill="${card}" />
          <path d="M ${inset + width * 0.06} ${top + width * 0.53} C ${inset + width * 0.22} ${top + width * 0.36}, ${inset + width * 0.45} ${top + width * 0.47}, ${inset + width * 0.78} ${top + width * 0.28}" stroke="#fff" stroke-width="${width * 0.018}" fill="none" stroke-linecap="round" />
        `
        : `
          <rect x="${inset}" y="${top + width * 0.1}" width="${width * 0.84}" height="${width * 0.54}" rx="${width * 0.08}" fill="${card}" />
          <circle cx="${width * 0.5}" cy="${top + width * 0.37}" r="${width * 0.18}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="${width * 0.018}" />
          <path d="M ${width * 0.5} ${top + width * 0.19} A ${width * 0.18} ${width * 0.18} 0 1 1 ${width * 0.64} ${top + width * 0.49}" stroke="#fff" stroke-width="${width * 0.018}" fill="none" stroke-linecap="round" />
          <text x="${width * 0.5}" y="${top + width * 0.4}" fill="#fff" font-size="${width * 0.13}" font-family="DM Mono, monospace" font-weight="700" text-anchor="middle">18:42</text>
          <text x="${width * 0.5}" y="${top + width * 0.49}" fill="rgba(255,255,255,0.72)" font-size="${width * 0.038}" font-family="Bricolage Grotesque, Arial, sans-serif" text-anchor="middle">${escapeXml(kind === 'headline' ? t.deep_work : t.today)}</text>
        `}
    </g>
  `;
}

function renderScreenshotSvg({ kind = 'headline', template = 't1', app, screen, variant, width = 1290, height = 2796, watermark = '' }) {
  const tmpl = (window.DATA?.TEMPLATES || []).find((item) => item.id === (screen.template || template)) || (window.DATA?.TEMPLATES || [])[0] || { bg: 'linear-gradient(160deg, #111, #333)', accent: '#fff', type: 'sans' };
  const copy = creativeCopy(kind, app, screen.headline, screen.sub, variant.assetLocale || variant.locale || 'en-US');
  const [bgA, bgB] = parseGradientStops(screen.bg || tmpl.bg, app.tint || '#111', app.tint2 || '#333');
  const layout = mergeLayout(kind, screen.layout);
  const decorations = mergeDecorations(screen.decorations);
  const visible = visibleElements(kind);
  const phoneBox = layout.phone || { x: 12, y: 48, w: 76 };
  const phoneWidth = width * (phoneBox.w / 100);
  const phoneHeight = phoneWidth * 2.06;
  const phoneX = width * (phoneBox.x / 100);
  const phoneY = height * (phoneBox.y / 100);
  const frame = framePresentation(screen.frameStyle || 'ios-classic');
  const fontFamily = tmpl.type === 'mono' ? 'DM Mono, monospace' : (tmpl.type === 'serif' ? 'Fraunces, Georgia, serif' : 'Bricolage Grotesque, Arial, sans-serif');

  const decorationSvg = decorations.map((decoration) => {
    const x = width * (decoration.x / 100);
    const y = height * (decoration.y / 100);
    const w = width * (decoration.w / 100);
    const h = decoration.type === 'burst' ? w : Math.max(w * 0.28, 58);
    const bg = decoration.style === 'dark' ? 'rgba(10,11,13,0.72)' : (decoration.style === 'accent' ? (app.tint2 || '#f56217') : 'rgba(255,255,255,0.82)');
    const fg = decoration.style === 'dark' || decoration.style === 'accent' ? '#fff' : '#0a0b0d';
    if (decoration.type === 'burst') {
      return `
        <g transform="translate(${x} ${y}) rotate(${decoration.rotation || 0} ${w / 2} ${w / 2})">
          <polygon points="${w * 0.5},0 ${w * 0.65},${w * 0.18} ${w},${w * 0.28} ${w * 0.8},${w * 0.5} ${w},${w * 0.78} ${w * 0.65},${w} ${w * 0.5},${w * 0.82} ${w * 0.34},${w} 0,${w * 0.78} ${w * 0.16},${w * 0.5} 0,${w * 0.28} ${w * 0.34},${w * 0.18}" fill="${bg}" />
          <text x="${w * 0.5}" y="${w * 0.54}" fill="${fg}" font-size="${Math.max(18, w * 0.12)}" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="800" text-anchor="middle">${escapeXml(decoration.text)}</text>
        </g>
      `;
    }
    return `
      <g transform="translate(${x} ${y}) rotate(${decoration.rotation || 0} ${w / 2} ${h / 2})">
        <rect width="${w}" height="${h}" rx="${Math.min(999, h / 2)}" fill="${bg}" />
        <text x="${w / 2}" y="${h * 0.58}" fill="${fg}" font-size="${Math.max(18, w * 0.1)}" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="700" text-anchor="middle">${escapeXml(decoration.type === 'stars' ? `★★★★★ ${decoration.text}` : decoration.text)}</text>
      </g>
    `;
  }).join('');

  const headlineBox = layout.headline || { x: 7, y: 16, w: 72, align: 'left' };
  const subBox = layout.sub || { x: 7, y: 30, w: 56, align: 'left' };
  const ctaBox = layout.cta || { x: 50, y: 84, w: 42, align: 'center' };
  const ambient = ambientPresentation(screen.ambientStyle || 'glow', app, kind);
  const headlineStyles = applyTextBoxOverrides(headlinePresentation(screen.textStyle || 'crisp', kind, tmpl, width, headlineBox.align), headlineBox, tmpl.accent || '#fff');
  const subStyles = applyTextBoxOverrides(subPresentation(screen.textStyle || 'crisp', kind, width, subBox.align), subBox, tmpl.accent || '#fff');
  const chrome = chromePresentation(screen.chromeStyle || 'solid', width, app);
  const ctaStyles = applyTextBoxOverrides(ctaPresentation(screen.ctaStyle || 'pill', tmpl, width), ctaBox, ctaPresentation(screen.ctaStyle || 'pill', tmpl, width).color);
  const headlineLineAdvance = headlineStyles.fontSize * (headlineStyles.lineHeight || 1);
  const subLineAdvance = subStyles.fontSize * (subStyles.lineHeight || 1.35);
  const headlineLines = wrapSvgText(copy.head, kind === 'stat' ? 10 : 18);
  const subLines = wrapSvgText(copy.sub, 30);
  const alignToAnchor = { left: 'start', center: 'middle', right: 'end' };
  const anchorX = (box) => {
    if ((box.align || 'left') === 'center') return width * ((box.x + (box.w / 2)) / 100);
    if ((box.align || 'left') === 'right') return width * ((box.x + box.w) / 100);
    return width * (box.x / 100);
  };

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${escapeXml(bgA)}" />
          <stop offset="100%" stop-color="${escapeXml(bgB)}" />
        </linearGradient>
        <radialGradient id="orb" cx="50%" cy="${kind === 'headline' ? '100%' : '10%'}" r="65%">
          <stop offset="0%" stop-color="${escapeXml(app.tint2 || '#f56217')}" stop-opacity="0.55" />
          <stop offset="100%" stop-color="${escapeXml(app.tint2 || '#f56217')}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${width * 0.12}" fill="url(#bg)" />
      ${ambient.opacity > 0 ? `<rect x="0" y="0" width="${width}" height="${height}" rx="${width * 0.12}" fill="url(#orb)" opacity="${ambient.opacity}" />` : ''}
      ${decorationSvg}
      ${chrome ? `
        <g>
          ${screen.chromeStyle === 'floating' ? `<rect x="${width * 0.055}" y="${height * 0.052}" width="${width * 0.26}" height="${height * 0.048}" rx="${height * 0.024}" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.14)" />` : ''}
          <rect x="${screen.chromeStyle === 'minimal' ? width * 0.052 : width * 0.07}" y="${screen.chromeStyle === 'minimal' ? height * 0.05 : height * 0.055}" width="${screen.chromeStyle === 'minimal' ? width * 0.056 : width * 0.07}" height="${screen.chromeStyle === 'minimal' ? width * 0.056 : width * 0.07}" rx="${screen.chromeStyle === 'minimal' ? width * 0.018 : width * 0.02}" fill="${escapeXml(app.tint || '#fff')}" />
          <text x="${screen.chromeStyle === 'minimal' ? width * 0.08 : width * 0.105}" y="${screen.chromeStyle === 'minimal' ? height * 0.086 : height * 0.102}" fill="#fff" font-size="${width * 0.04}" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="700" text-anchor="middle">${escapeXml(app.icon || 'A')}</text>
          <text x="${screen.chromeStyle === 'minimal' ? width * 0.12 : width * 0.16}" y="${screen.chromeStyle === 'minimal' ? height * 0.084 : height * 0.102}" fill="${escapeXml(tmpl.accent || '#fff')}" font-size="${chrome.text.fontSize}" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="${chrome.text.fontWeight}">${escapeXml(app.name || 'Preview')}</text>
        </g>
      ` : ''}
      ${visible.headline ? svgTextBlock(headlineLines, anchorX(headlineBox), height * (headlineBox.y / 100), headlineStyles.fontSize, headlineLineAdvance, tmpl.accent || '#fff', headlineStyles.fontWeight, alignToAnchor[headlineBox.align || 'left'], fontFamily, headlineStyles.fontStyle === 'italic') : ''}
      ${visible.sub ? svgTextBlock(subLines, anchorX(subBox), height * (subBox.y / 100), subStyles.fontSize, subLineAdvance, 'rgba(255,255,255,0.72)', 500, alignToAnchor[subBox.align || 'left'], 'Bricolage Grotesque, Arial, sans-serif') : ''}
      ${visible.phone ? `
        <g transform="translate(${phoneX} ${phoneY})">
          <g transform="translate(${phoneWidth / 2} ${phoneHeight / 2}) rotate(${frame.rotate}) translate(${-phoneWidth / 2} ${-phoneHeight / 2})">
            <rect x="0" y="0" width="${phoneWidth}" height="${phoneHeight}" rx="${phoneWidth * 0.16}" fill="${escapeXml(frame.shellColor)}" />
            <rect x="${phoneWidth * 0.03}" y="${phoneHeight * 0.03}" width="${phoneWidth * 0.94}" height="${phoneHeight * 0.94}" rx="${phoneWidth * frame.shellRadius}" fill="url(#bg)" />
            ${exportPhoneSceneSvg(kind, app, phoneWidth * 0.94, phoneHeight * 0.94, variant.assetLocale || variant.locale || 'en-US', screen.frameStyle || 'ios-classic').replace('<g>', `<g transform="translate(${phoneWidth * 0.03} ${phoneHeight * 0.03})">`)}
          </g>
        </g>
      ` : ''}
      ${visible.cta ? `
        <g>
          <rect x="${width * (ctaBox.x / 100)}" y="${height * (ctaBox.y / 100)}" width="${width * (ctaBox.w / 100)}" height="${height * 0.05}" rx="${ctaStyles.borderRadius === 999 ? height * 0.025 : ctaStyles.borderRadius}" fill="${escapeXml(ctaStyles.background)}" stroke="${ctaStyles.border && ctaStyles.border !== 'none' ? escapeXml(ctaStyles.color) : 'transparent'}" />
          <text x="${width * ((ctaBox.x + (ctaBox.w / 2)) / 100)}" y="${height * ((ctaBox.y + 3.4) / 100)}" fill="${escapeXml(ctaStyles.color)}" font-size="${ctaStyles.fontSize * 0.7}" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="${ctaStyles.fontWeight}" text-anchor="middle">${escapeXml(screen.ctaLabel || 'Get the app')}</text>
        </g>
      ` : ''}
      ${watermark ? `
        <g>
          <rect x="${width * 0.72}" y="${height * 0.9}" width="${width * 0.19}" height="${height * 0.04}" rx="${height * 0.02}" fill="rgba(10,11,13,0.56)" />
          <text x="${width * 0.815}" y="${height * 0.927}" fill="#fff" font-size="${width * 0.024}" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="800" text-anchor="middle">${escapeXml(watermark)}</text>
        </g>
      ` : ''}
    </svg>
  `;
}

function svgToRasterDataUrl(svgString, width, height, mimeType = 'image/png', quality = 0.92) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (mimeType === 'image/jpeg') {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
      }
      context.drawImage(image, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL(mimeType, quality));
    };
    image.onerror = (error) => {
      URL.revokeObjectURL(url);
      reject(error);
    };
    image.src = url;
  });
}

async function exportScreenshotPng(options) {
  const svg = renderScreenshotSvg(options);
  return svgToRasterDataUrl(svg, options.width, options.height, 'image/png');
}

async function exportScreenshotAsset(options) {
  const svg = renderScreenshotSvg(options);
  const format = String(options.format || 'png').toLowerCase();
  const mimeType = format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const quality = typeof options.quality === 'number' ? options.quality : 0.92;
  return svgToRasterDataUrl(svg, options.width, options.height, mimeType, quality);
}

window.SHIPSHOT = window.SHIPSHOT || {};
Object.assign(window.SHIPSHOT, { defaultTextPanelMetrics });
Object.assign(window, { ScreenshotCard, FakePhone, PhoneScene, renderScreenshotSvg, exportScreenshotPng, exportScreenshotAsset });
