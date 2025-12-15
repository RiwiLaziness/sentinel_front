import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

type ApiState<T> = {
    data: T;
    loading: boolean;
    error: string | null;
    refetch: () => void;
};

/* ======================================================
   BILLING TYPES
====================================================== */

export interface Plan {
    id: string;
    name: string;
    price: number;
    period: string;
    features: string[];
    maxProjects: number;
    maxScansPerMonth: number;
}

export interface Subscription {
    id: string;
    planId: string;
    planName: string;
    status: "ACTIVE" | "CANCELLED" | "EXPIRED";
    currentPeriodStart: string;
    currentPeriodEnd: string;
    price: number;
}

export interface Payment {
    id: string;
    amount: number;
    status: "PAID" | "PENDING" | "FAILED";
    description: string;
    createdAt: string;
}

/* ======================================================
   PLANS HOOK
====================================================== */

export function usePlans(): ApiState<Plan[]> {
    const [data, setData] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API}/api/plans`);
            if (!res.ok) throw new Error("Failed to load plans");
            const json = await res.json();
            const rawData = Array.isArray(json) ? json : (json.content || []);

            // Map backend DTO to Frontend Interface
            const mappedPlans = rawData.map((p: any) => ({
                id: p.id,
                name: p.name,
                price: p.priceUsd ?? 0,
                period: "month", // Default to monthly
                features: [
                    p.maxProjects === -1 ? "Unlimited Projects" : `${p.maxProjects} Projects`,
                    p.maxUsers === -1 ? "Unlimited Users" : `${p.maxUsers} Users`,
                    p.maxDomains > 0 ? `${p.maxDomains} Domains` : null,
                    p.maxRepos > 0 ? `${p.maxRepos} Repositories` : null,
                    p.includesBlockchain ? "Blockchain Security" : null,
                    p.recommended ? "Recommended Choice" : null
                ].filter(Boolean),
                maxProjects: p.maxProjects,
                maxScansPerMonth: -1 // specific field not in generic plan DTO, defaulting
            }));

            setData(mappedPlans);
        } catch (e: any) {
            setError(e.message);
            // Fallback to mock data if API fails
            setData([
                {
                    id: "free",
                    name: "Free",
                    price: 0,
                    period: "month",
                    features: ["3 Projects", "10 Scans/month", "Community Support"],
                    maxProjects: 3,
                    maxScansPerMonth: 10,
                },
                {
                    id: "pro",
                    name: "Professional",
                    price: 49,
                    period: "month",
                    features: ["Unlimited Projects", "Unlimited Scans", "Priority Support", "Advanced Analytics"],
                    maxProjects: -1,
                    maxScansPerMonth: -1,
                },
                {
                    id: "enterprise",
                    name: "Enterprise",
                    price: 199,
                    period: "month",
                    features: ["Everything in Pro", "Dedicated Support", "Custom Integrations", "SLA Guarantee"],
                    maxProjects: -1,
                    maxScansPerMonth: -1,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    return { data, loading, error, refetch: fetchPlans };
}

/* ======================================================
   SUBSCRIPTION HOOK
====================================================== */

export function useSubscription(): ApiState<Subscription | null> {
    const [data, setData] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscription = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            const res = await fetch(`${API}/api/subscriptions/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error("Failed to load subscription");
            const json = await res.json();
            setData(json);
        } catch (e: any) {
            setError(e.message);
            // Fallback mock
            setData({
                id: "sub-1",
                planId: "pro",
                planName: "Professional",
                status: "ACTIVE",
                currentPeriodStart: "2025-12-01T00:00:00Z",
                currentPeriodEnd: "2026-01-01T00:00:00Z",
                price: 49,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    return { data, loading, error, refetch: fetchSubscription };
}

/* ======================================================
   PAYMENT HISTORY HOOK
====================================================== */

export function usePaymentHistory(): ApiState<Payment[]> {
    const [data, setData] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            // Fixed URL: /api/payments-history/me
            const res = await fetch(`${API}/api/payments-history/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error("Failed to load payment history");
            const json = await res.json();
            // Ensure array safety
            setData(Array.isArray(json) ? json : (json.content || []));
        } catch (e: any) {
            setError(e.message);
            // Fallback mock
            setData([
                {
                    id: "pay-1",
                    amount: 49,
                    status: "PAID",
                    description: "Professional Plan - December 2025",
                    createdAt: "2025-12-15T10:00:00Z",
                },
                {
                    id: "pay-2",
                    amount: 49,
                    status: "PAID",
                    description: "Professional Plan - November 2025",
                    createdAt: "2025-11-15T10:00:00Z",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return { data, loading, error, refetch: fetchPayments };
}
