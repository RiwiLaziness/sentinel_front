import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

/* ======================================================
   COMMON
====================================================== */

type ApiState<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};

/* ======================================================
   DASHBOARD SUMMARY (KPIs)
====================================================== */

export interface DashboardSummary {
  activeScans: number;
  criticalFindings: number;
  qualityGatePassRate: number;
  projectsMonitored: number;
}

export function useDashboardSummary(): ApiState<DashboardSummary | null> {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/dashboard/summary`);
        if (!res.ok) throw new Error("Failed to load dashboard summary");
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e: any) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchSummary();
    const interval = setInterval(fetchSummary, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, error };
}

/* ======================================================
   ACTIVE SCANS
====================================================== */

export interface ActiveScan {
  id: string;
  project: string;
  type: "SAST" | "DAST" | "CONTAINER";
  status: string;
  elapsed: string;
}

export function useActiveScans(): ApiState<ActiveScan[]> {
  const [data, setData] = useState<ActiveScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchActiveScans = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/scans/active`);
        if (!res.ok) throw new Error("Failed to load active scans");
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e: any) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchActiveScans();
    const interval = setInterval(fetchActiveScans, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, error };
}

/* ======================================================
   VULNERABILITY TRENDS
====================================================== */

export interface VulnerabilityTrend {
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export function useVulnerabilityTrends(
  range: "7d" | "30d" | "90d" = "30d"
): ApiState<VulnerabilityTrend[]> {
  const [data, setData] = useState<VulnerabilityTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchTrends = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API}/api/dashboard/vulnerabilities/trends?range=${range}`
        );
        if (!res.ok) throw new Error("Failed to load vulnerability trends");
        const json = await res.json();
        if (mounted) setData(json.data ?? json);
      } catch (e: any) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTrends();

    return () => {
      mounted = false;
    };
  }, [range]);

  return { data, loading, error };
}

/* ======================================================
   RECENT SCANS
====================================================== */

export interface RecentScan {
  id: string;
  project: string;
  type: string;
  qualityGate: "PASS" | "FAIL";
  vulnerabilities: string;
  completedAt: string;
}

export function useRecentScans(limit = 5): ApiState<RecentScan[]> {
  const [data, setData] = useState<RecentScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchRecentScans = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API}/api/scans?limit=${limit}&sort=completedAt`
        );
        if (!res.ok) throw new Error("Failed to load recent scans");
        const json = await res.json();
        if (mounted) setData(json.items ?? json);
      } catch (e: any) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRecentScans();

    return () => {
      mounted = false;
    };
  }, [limit]);

  return { data, loading, error };
}

/* ======================================================
   TOP RISK PROJECTS
====================================================== */

export interface TopRiskProject {
  project: string;
  critical: number;
  high: number;
}

export function useTopRiskProjects(): ApiState<TopRiskProject[]> {
  const [data, setData] = useState<TopRiskProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchTopRisk = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/dashboard/top-risk-projects`);
        if (!res.ok) throw new Error("Failed to load top risk projects");
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e: any) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTopRisk();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}

/* ======================================================
   NOTIFICATIONS
====================================================== */

export interface DashboardNotification {
  id: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  message: string;
  createdAt: string;
}

export function useDashboardNotifications(): ApiState<
  DashboardNotification[]
> {
  const [data, setData] = useState<DashboardNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API}/api/notifications?scope=dashboard`
        );
        if (!res.ok) throw new Error("Failed to load notifications");
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e: any) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 20000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, loading, error };
}
