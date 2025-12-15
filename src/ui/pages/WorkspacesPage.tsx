import React, { useState } from "react";
import Sidebar from "@/components/commons/Sidebar";
import { useTheme } from "@/utils/store/themeContext";
import {
    Folder,
    Plus,
    Settings,
    ChevronRight,
    Users,
    FileCode,
    Loader2,
} from "lucide-react";
import { useWorkspaces } from "@hooks/useWorkspaces";

export default function WorkspacesPage() {
    const { theme } = useTheme();
    const { data: workspaces, loading, error, refetch } = useWorkspaces();
    const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);

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
                    <h1 style={{ color: theme.colors.text.primary }}>Workspaces</h1>
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 20px",
                            background: theme.colors.primary,
                            color: theme.colors.onPrimary,
                            border: "none",
                            borderRadius: 8,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        <Plus size={18} />
                        New Workspace
                    </button>
                </header>

                <section className="content" style={{ padding: 24 }}>
                    {/* Loading State */}
                    {loading && (
                        <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
                            <Loader2 size={32} color={theme.colors.primary} style={{ animation: "spin 1s linear infinite" }} />
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div style={{ color: theme.colors.danger, padding: 20, textAlign: "center" }}>
                            Error loading workspaces: {error}
                            <button onClick={refetch} style={{ marginLeft: 10, color: theme.colors.primary }}>
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Workspaces Grid */}
                    {!loading && !error && (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                                gap: 20,
                            }}
                        >
                            {workspaces.map((workspace) => (
                                <div
                                    key={workspace.id}
                                    onClick={() => setSelectedWorkspace(workspace.id)}
                                    style={{
                                        background: theme.colors.surface,
                                        border:
                                            selectedWorkspace === workspace.id
                                                ? `2px solid ${theme.colors.primary}`
                                                : `1px solid ${theme.colors.border}`,
                                        borderRadius: 12,
                                        padding: 20,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {/* Header */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            marginBottom: 12,
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 8,
                                                    background: theme.colors.primary,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Folder size={20} color={theme.colors.onPrimary} />
                                            </div>
                                            <div>
                                                <h3 style={{ color: theme.colors.text.primary, margin: 0 }}>
                                                    {workspace.name}
                                                </h3>
                                                <p
                                                    style={{
                                                        color: theme.colors.text.secondary,
                                                        fontSize: 13,
                                                        margin: 0,
                                                    }}
                                                >
                                                    {workspace.description}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                                color: theme.colors.text.tertiary,
                                            }}
                                        >
                                            <Settings size={18} />
                                        </button>
                                    </div>

                                    {/* Stats */}
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 16,
                                            marginBottom: 16,
                                            paddingTop: 12,
                                            borderTop: `1px solid ${theme.colors.border}`,
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <FileCode size={16} color={theme.colors.text.tertiary} />
                                            <span style={{ color: theme.colors.text.secondary, fontSize: 13 }}>
                                                {workspace.projectCount} Projects
                                            </span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <Users size={16} color={theme.colors.text.tertiary} />
                                            <span style={{ color: theme.colors.text.secondary, fontSize: 13 }}>
                                                {workspace.memberCount} Members
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span style={{ color: theme.colors.text.tertiary, fontSize: 12 }}>
                                            Last activity: {workspace.lastActivity}
                                        </span>
                                        <ChevronRight size={18} color={theme.colors.text.tertiary} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && workspaces.length === 0 && (
                        <div
                            style={{
                                textAlign: "center",
                                padding: 60,
                                background: theme.colors.surface,
                                borderRadius: 12,
                                border: `1px dashed ${theme.colors.border}`,
                            }}
                        >
                            <Folder size={48} color={theme.colors.text.tertiary} />
                            <h3 style={{ color: theme.colors.text.primary, marginTop: 16 }}>
                                No Workspaces Yet
                            </h3>
                            <p style={{ color: theme.colors.text.secondary, marginBottom: 24 }}>
                                Create your first workspace to organize your projects
                            </p>
                            <button
                                style={{
                                    padding: "12px 24px",
                                    background: theme.colors.primary,
                                    color: theme.colors.onPrimary,
                                    border: "none",
                                    borderRadius: 8,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Create Workspace
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
