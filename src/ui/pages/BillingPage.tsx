import React from "react";
import Sidebar from "@/components/commons/Sidebar";
import { useTheme } from "@/utils/store/themeContext";
import {
    CreditCard,
    CheckCircle,
    Clock,
    Loader2,
} from "lucide-react";
import { usePlans, useSubscription, usePaymentHistory } from "@hooks/useBilling";

export default function BillingPage() {
    const { theme } = useTheme();
    const { data: plans, loading: plansLoading } = usePlans();
    const { data: subscription, loading: subLoading } = useSubscription();
    const { data: payments, loading: paymentsLoading } = usePaymentHistory();

    const loading = plansLoading || subLoading || paymentsLoading;

    return (
        <div className="app" style={{ background: theme.colors.background }}>
            <Sidebar />

            <main className="main">
                <header
                    className="header"
                    style={{
                        background: theme.colors.surface,
                        borderBottom: `1px solid ${theme.colors.border}`,
                    }}
                >
                    <h1 style={{ color: theme.colors.text.primary }}>Billing & Plans</h1>
                </header>

                <section className="content" style={{ padding: 24 }}>
                    {/* Loading State */}
                    {loading && (
                        <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
                            <Loader2 size={32} color={theme.colors.primary} style={{ animation: "spin 1s linear infinite" }} />
                        </div>
                    )}

                    {!loading && (
                        <>
                            {/* Current Plan */}
                            <div
                                style={{
                                    background: theme.colors.surface,
                                    border: `1px solid ${theme.colors.border}`,
                                    borderRadius: 12,
                                    padding: 24,
                                    marginBottom: 24,
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                    <CreditCard size={24} color={theme.colors.primary} />
                                    <h2 style={{ color: theme.colors.text.primary, margin: 0 }}>Current Plan</h2>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    <span
                                        style={{
                                            background: theme.colors.primary,
                                            color: theme.colors.onPrimary,
                                            padding: "8px 16px",
                                            borderRadius: 8,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {subscription?.planName ?? "Free"}
                                    </span>
                                    <span style={{ color: theme.colors.text.secondary }}>
                                        {subscription?.currentPeriodEnd
                                            ? `Renews on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                                            : "No active subscription"}
                                    </span>
                                </div>
                            </div>

                            {/* Plans Grid */}
                            <h3 style={{ color: theme.colors.text.primary, marginBottom: 16 }}>Available Plans</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                                {(plans || []).map((plan) => {
                                    const isCurrent = subscription?.planId === plan.id;
                                    return (
                                        <div
                                            key={plan.id}
                                            style={{
                                                background: theme.colors.surface,
                                                border: isCurrent
                                                    ? `2px solid ${theme.colors.primary}`
                                                    : `1px solid ${theme.colors.border}`,
                                                borderRadius: 12,
                                                padding: 24,
                                                position: "relative",
                                            }}
                                        >
                                            {isCurrent && (
                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        top: -12,
                                                        right: 16,
                                                        background: theme.colors.primary,
                                                        color: theme.colors.onPrimary,
                                                        padding: "4px 12px",
                                                        borderRadius: 12,
                                                        fontSize: 12,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Current Plan
                                                </span>
                                            )}

                                            <h3 style={{ color: theme.colors.text.primary, marginBottom: 8 }}>{plan.name}</h3>
                                            <div style={{ marginBottom: 16 }}>
                                                <span style={{ fontSize: 32, fontWeight: 700, color: theme.colors.text.primary }}>
                                                    ${plan.price}
                                                </span>
                                                <span style={{ color: theme.colors.text.secondary }}>/{plan.period}</span>
                                            </div>

                                            <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                                                {(plan.features || []).map((feature, idx) => (
                                                    <li
                                                        key={idx}
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 8,
                                                            color: theme.colors.text.secondary,
                                                            marginBottom: 8,
                                                        }}
                                                    >
                                                        <CheckCircle size={16} color={theme.colors.success} />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            <button
                                                style={{
                                                    width: "100%",
                                                    padding: "12px 24px",
                                                    borderRadius: 8,
                                                    border: isCurrent ? "none" : `1px solid ${theme.colors.primary}`,
                                                    background: isCurrent ? theme.colors.surface : theme.colors.primary,
                                                    color: isCurrent ? theme.colors.text.tertiary : theme.colors.onPrimary,
                                                    fontWeight: 600,
                                                    cursor: isCurrent ? "not-allowed" : "pointer",
                                                }}
                                                disabled={isCurrent}
                                            >
                                                {isCurrent ? "Current Plan" : "Upgrade"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Payment History */}
                            <div
                                style={{
                                    background: theme.colors.surface,
                                    border: `1px solid ${theme.colors.border}`,
                                    borderRadius: 12,
                                    padding: 24,
                                    marginTop: 24,
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                    <Clock size={20} color={theme.colors.primary} />
                                    <h3 style={{ color: theme.colors.text.primary, margin: 0 }}>Payment History</h3>
                                </div>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr>
                                            {["Date", "Description", "Amount", "Status"].map((h) => (
                                                <th
                                                    key={h}
                                                    style={{
                                                        textAlign: "left",
                                                        padding: "12px 8px",
                                                        borderBottom: `1px solid ${theme.colors.border}`,
                                                        color: theme.colors.text.secondary,
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(payments || []).map((payment) => (
                                            <tr key={payment.id}>
                                                <td style={{ padding: "12px 8px", color: theme.colors.text.primary }}>
                                                    {new Date(payment.createdAt).toLocaleDateString()}
                                                </td>
                                                <td style={{ padding: "12px 8px", color: theme.colors.text.secondary }}>
                                                    {payment.description}
                                                </td>
                                                <td style={{ padding: "12px 8px", color: theme.colors.text.primary }}>
                                                    ${payment.amount.toFixed(2)}
                                                </td>
                                                <td style={{ padding: "12px 8px" }}>
                                                    <span
                                                        style={{
                                                            background:
                                                                payment.status === "PAID"
                                                                    ? theme.colors.success
                                                                    : payment.status === "PENDING"
                                                                        ? theme.colors.warning
                                                                        : theme.colors.danger,
                                                            color: theme.colors.onPrimary,
                                                            padding: "4px 8px",
                                                            borderRadius: 4,
                                                            fontSize: 12,
                                                        }}
                                                    >
                                                        {payment.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {payments.length === 0 && (
                                            <tr>
                                                <td colSpan={4} style={{ textAlign: "center", padding: 20, color: theme.colors.text.tertiary }}>
                                                    No payments yet
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}
