const SHIPSHOT_CREDITS_KEY = 'shipshot_credits';

const CREDIT_COSTS = {
  GENERATE_PACK_3_SCREENS: 3,
  GENERATE_PACK_6_SCREENS: 5,
  ADD_LANGUAGE_VARIANT: 2,
  REGENERATE_SINGLE_SCREEN: 1,
  GENERATE_COPY_ONLY: 1,
  EXPORT_PNG: 0,
  EXPORT_PDF: 0,
  EXPORT_ZIP: 0,
  UPLOAD_APP_STORE_CONNECT: 0,
};

const PLANS = {
  free: {
    label: 'Free',
    creditsTotal: 10,
    creditsMonthly: 0,
    rolloverMultiplier: 0,
    renewable: false,
  },
  indie: {
    label: 'Indie',
    creditsMonthly: 20,
    rolloverMultiplier: 2,
    renewable: true,
  },
  maker: {
    label: 'Maker',
    creditsMonthly: 60,
    rolloverMultiplier: 2,
    renewable: true,
  },
  studio: {
    label: 'Studio',
    creditsMonthly: 200,
    rolloverMultiplier: 2,
    renewable: true,
  },
};

function creditsPlan(planId) {
  return PLANS[planId] || PLANS.maker;
}

function monthlyAllocation(planId) {
  const plan = creditsPlan(planId);
  return plan.creditsMonthly || plan.creditsTotal || 0;
}

function rolloverCap(planId) {
  const plan = creditsPlan(planId);
  if (!plan.renewable) return plan.creditsTotal || 0;
  return monthlyAllocation(planId) * (plan.rolloverMultiplier || 1);
}

function nextRenewalDate(fromDate = new Date()) {
  const next = new Date(fromDate);
  next.setUTCHours(0, 0, 0, 0);
  next.setUTCMonth(next.getUTCMonth() + 1);
  return next;
}

function baseCreditsState(planId = 'maker') {
  const plan = creditsPlan(planId);
  const initialBalance = plan.renewable ? plan.creditsMonthly : plan.creditsTotal;
  return {
    plan: planId,
    balance: initialBalance || 0,
    totalUsed: 0,
    renewsAt: plan.renewable ? nextRenewalDate().toISOString() : null,
    history: [],
  };
}

function emitCreditsUpdate() {
  window.dispatchEvent(new CustomEvent('shipshot:credits-updated', {
    detail: getCredits(),
  }));
}

function persistCredits(state) {
  localStorage.setItem(SHIPSHOT_CREDITS_KEY, JSON.stringify({
    ...state,
    history: Array.isArray(state.history) ? state.history.slice(0, 20) : [],
  }));
  emitCreditsUpdate();
}

function normalizeCredits(raw) {
  const planId = raw?.plan && PLANS[raw.plan] ? raw.plan : 'maker';
  const plan = creditsPlan(planId);
  return {
    plan: planId,
    balance: Number.isFinite(raw?.balance) ? Math.max(0, raw.balance) : (plan.renewable ? plan.creditsMonthly : plan.creditsTotal || 0),
    totalUsed: Number.isFinite(raw?.totalUsed) ? Math.max(0, raw.totalUsed) : 0,
    renewsAt: plan.renewable ? (raw?.renewsAt || nextRenewalDate().toISOString()) : null,
    history: Array.isArray(raw?.history) ? raw.history.slice(0, 20) : [],
  };
}

function loadCreditsState() {
  try {
    const raw = localStorage.getItem(SHIPSHOT_CREDITS_KEY);
    if (!raw) {
      const initial = baseCreditsState('maker');
      persistCredits(initial);
      return initial;
    }
    return normalizeCredits(JSON.parse(raw));
  } catch {
    const initial = baseCreditsState('maker');
    persistCredits(initial);
    return initial;
  }
}

function maybeRechargeState(state) {
  const plan = creditsPlan(state.plan);
  if (!plan.renewable || !state.renewsAt) return state;
  let nextState = { ...state };
  let renewsAt = new Date(nextState.renewsAt);
  let changed = false;
  while (renewsAt.getTime() <= Date.now()) {
    nextState.balance = Math.min(
      nextState.balance + plan.creditsMonthly,
      rolloverCap(nextState.plan)
    );
    renewsAt = nextRenewalDate(renewsAt);
    nextState.renewsAt = renewsAt.toISOString();
    changed = true;
  }
  if (changed) persistCredits(nextState);
  return nextState;
}

function getCreditsState() {
  return maybeRechargeState(loadCreditsState());
}

function getCredits() {
  const state = getCreditsState();
  return {
    balance: state.balance,
    plan: state.plan,
    renewsAt: state.renewsAt ? new Date(state.renewsAt) : null,
  };
}

function canAfford(actionKey) {
  const cost = CREDIT_COSTS[actionKey] || 0;
  return getCreditsState().balance >= cost;
}

function calcCost(actions) {
  return (actions || []).reduce((total, action) => {
    const qty = Math.max(1, Number(action?.qty || 1));
    return total + ((CREDIT_COSTS[action?.key] || 0) * qty);
  }, 0);
}

function appendHistory(state, action, cost) {
  return [{
    date: new Date().toISOString(),
    action,
    cost,
    balanceAfter: state.balance,
  }, ...(state.history || [])].slice(0, 20);
}

function spend(actionKey, qty = 1, label = actionKey) {
  const state = getCreditsState();
  const cost = (CREDIT_COSTS[actionKey] || 0) * Math.max(1, Number(qty || 1));
  if (state.balance < cost) {
    return { success: false, newBalance: state.balance, spent: 0 };
  }
  const nextState = {
    ...state,
    balance: state.balance - cost,
    totalUsed: state.totalUsed + cost,
  };
  nextState.history = appendHistory(nextState, label, cost);
  persistCredits(nextState);
  return { success: true, newBalance: nextState.balance, spent: cost };
}

function spendActions(actions, label = 'Composite action') {
  const state = getCreditsState();
  const cost = calcCost(actions);
  if (state.balance < cost) {
    return { success: false, newBalance: state.balance, spent: 0, cost };
  }
  const nextState = {
    ...state,
    balance: state.balance - cost,
    totalUsed: state.totalUsed + cost,
  };
  nextState.history = appendHistory(nextState, label, cost);
  persistCredits(nextState);
  return { success: true, newBalance: nextState.balance, spent: cost, cost };
}

function recharge() {
  const state = getCreditsState();
  const plan = creditsPlan(state.plan);
  if (!plan.renewable) return { newBalance: state.balance, added: 0 };
  const nextBalance = Math.min(
    state.balance + plan.creditsMonthly,
    rolloverCap(state.plan)
  );
  const added = Math.max(0, nextBalance - state.balance);
  const nextState = {
    ...state,
    balance: nextBalance,
    renewsAt: nextRenewalDate(state.renewsAt ? new Date(state.renewsAt) : new Date()).toISOString(),
  };
  nextState.history = appendHistory(nextState, 'Monthly recharge', -added);
  persistCredits(nextState);
  return { newBalance: nextState.balance, added };
}

function addCredits(amount) {
  const state = getCreditsState();
  const nextState = {
    ...state,
    balance: state.balance + Math.max(0, Number(amount || 0)),
  };
  nextState.history = appendHistory(nextState, 'Top-up credits', -Math.max(0, Number(amount || 0)));
  persistCredits(nextState);
  return { newBalance: nextState.balance };
}

function getHistory() {
  return getCreditsState().history.slice(0, 20);
}

function setPlan(planId) {
  if (!PLANS[planId]) return getCreditsState();
  const nextState = normalizeCredits({
    ...getCreditsState(),
    plan: planId,
    renewsAt: creditsPlan(planId).renewable ? nextRenewalDate().toISOString() : null,
  });
  if (creditsPlan(planId).renewable) {
    nextState.balance = Math.min(Math.max(nextState.balance, creditsPlan(planId).creditsMonthly), rolloverCap(planId));
  } else {
    nextState.balance = Math.min(nextState.balance, creditsPlan(planId).creditsTotal || nextState.balance);
  }
  nextState.history = appendHistory(nextState, `Plan switched to ${creditsPlan(planId).label}`, 0);
  persistCredits(nextState);
  return nextState;
}

function setCredits(amount) {
  const state = getCreditsState();
  const nextState = {
    ...state,
    balance: Math.max(0, Number(amount || 0)),
  };
  persistCredits(nextState);
  return nextState;
}

function resetCredits() {
  const nextState = baseCreditsState('maker');
  persistCredits(nextState);
  return nextState;
}

window.SHIPSHOT_CREDITS = {
  STORAGE_KEY: SHIPSHOT_CREDITS_KEY,
  CREDIT_COSTS,
  PLANS,
  getCredits,
  getCreditsState,
  getHistory,
  canAfford,
  calcCost,
  spend,
  spendActions,
  recharge,
  addCredits,
  setPlan,
  setCredits,
  resetCredits,
  monthlyAllocation,
  rolloverCap,
};

window.SignalDev = {
  setCredits: (n) => window.SHIPSHOT_CREDITS.setCredits(n),
  setPlan: (plan) => window.SHIPSHOT_CREDITS.setPlan(plan),
  resetCredits: () => window.SHIPSHOT_CREDITS.resetCredits(),
  simulateRecharge: () => window.SHIPSHOT_CREDITS.recharge(),
};

getCreditsState();
