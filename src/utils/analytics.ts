type MetricsEvent = {
  name: string;
  timestamp: string;
  payload?: Record<string, unknown>;
};

interface MetricsSnapshot {
  pageViews: Record<string, number>;
  eventCounts: Record<string, number>;
  recentEvents: MetricsEvent[];
  lastUpdated: string;
}

const STORAGE_KEY = 'dr_infantil_metrics';
const MAX_RECENT_EVENTS = 50;

const isBrowser = typeof window !== 'undefined';

function getInitialSnapshot(): MetricsSnapshot {
  return {
    pageViews: {},
    eventCounts: {},
    recentEvents: [],
    lastUpdated: new Date().toISOString()
  };
}

function readSnapshot(): MetricsSnapshot {
  if (!isBrowser) {
    return getInitialSnapshot();
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getInitialSnapshot();
    }
    const parsed = JSON.parse(stored) as MetricsSnapshot;
    if (!parsed.pageViews || !parsed.eventCounts || !Array.isArray(parsed.recentEvents)) {
      return getInitialSnapshot();
    }
    return parsed;
  } catch (error) {
    console.warn('[analytics] Failed to parse metrics snapshot', error);
    return getInitialSnapshot();
  }
}

function writeSnapshot(snapshot: MetricsSnapshot) {
  if (!isBrowser) {
    return;
  }

  const data: MetricsSnapshot = {
    ...snapshot,
    lastUpdated: new Date().toISOString(),
    recentEvents: snapshot.recentEvents.slice(0, MAX_RECENT_EVENTS)
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function trackEvent(name: string, payload?: Record<string, unknown>) {
  if (!isBrowser) {
    return;
  }

  const snapshot = readSnapshot();
  snapshot.eventCounts[name] = (snapshot.eventCounts[name] ?? 0) + 1;
  snapshot.recentEvents = [
    {
      name,
      timestamp: new Date().toISOString(),
      payload
    },
    ...snapshot.recentEvents
  ];

  writeSnapshot(snapshot);
}

export function trackPageView(pageId: string) {
  if (!isBrowser) {
    return;
  }

  const snapshot = readSnapshot();
  snapshot.pageViews[pageId] = (snapshot.pageViews[pageId] ?? 0) + 1;

  snapshot.recentEvents = [
    {
      name: 'page_view',
      timestamp: new Date().toISOString(),
      payload: { pageId }
    },
    ...snapshot.recentEvents
  ];

  writeSnapshot(snapshot);
}

export function getMetricsSnapshot(): MetricsSnapshot {
  return readSnapshot();
}

export function resetMetrics() {
  if (!isBrowser) {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
}

export type { MetricsSnapshot };
