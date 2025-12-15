import React, { useState } from "react";
import { useTheme } from "@/utils/store/themeContext";
import { useProjects } from "@/hooks/useProjects"; // Using absolute alias
import { Plus, Box, Loader2 } from "lucide-react";

export function ProjectsList({ workspaceId }: { workspaceId: string }) {
    const { theme } = useTheme();
    const { projects, loading, error, createProject, refetch } = useProjects(workspaceId);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [creating, setCreating] = useState(false);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setCreating(true);
            await createProject({ name, description });
            setIsCreateModalOpen(false);
            setName("");
            setDescription("");
            // refetch handles update automatically via state, but explicit refetch ensures sync
        } catch (err) {
            console.error("Failed to create project", err);
        } finally {
            setCreating(false);
        }
    };

    if (loading && projects.length === 0) return <div style={{ padding: 20 }}>Loading projects...</div>;
    if (error) return <div style={{ color: theme.colors.danger }}>Error: {error}</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ color: theme.colors.text.primary, margin: 0 }}>Projects</h3>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 16px",
                        background: theme.colors.primary,
                        color: theme.colors.onPrimary,
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        fontSize: 14
                    }}
                >
                    <Plus size={16} />
                    New Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: 40,
                    border: `1px dashed ${theme.colors.border}`,
                    borderRadius: 8,
                    background: theme.colors.background
                }}>
                    <Box size={32} color={theme.colors.text.tertiary} />
                    <p style={{ color: theme.colors.text.secondary }}>No projects found in this workspace</p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            style={{
                                background: theme.colors.background,
                                border: `1px solid ${theme.colors.border}`,
                                borderRadius: 8,
                                padding: 16,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                <Box size={20} color={theme.colors.primary} />
                                <h4 style={{ margin: 0, color: theme.colors.text.primary }}>{project.name}</h4>
                            </div>
                            <p style={{ color: theme.colors.text.secondary, fontSize: 13, margin: "0 0 12px 0" }}>
                                {project.description || "No description"}
                            </p>
                            <div style={{ display: "flex", gap: 12, fontSize: 12, color: theme.colors.text.tertiary }}>
                                <span>{project.repoCount || 0} Repos</span>
                                <span>{project.domainCount || 0} Domains</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isCreateModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                >
                    <form
                        onSubmit={handleCreate}
                        style={{
                            background: theme.colors.surface,
                            padding: 24,
                            borderRadius: 12,
                            width: 400,
                            border: `1px solid ${theme.colors.border}`,
                        }}
                    >
                        <h2 style={{ color: theme.colors.text.primary, marginTop: 0 }}>New Project</h2>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: "block", color: theme.colors.text.secondary, marginBottom: 8, fontSize: 14 }}>
                                Project Name
                            </label>
                            <input
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="My Project"
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: 8,
                                    border: `1px solid ${theme.colors.border}`,
                                    background: theme.colors.background,
                                    color: theme.colors.text.primary,
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: "block", color: theme.colors.text.secondary, marginBottom: 8, fontSize: 14 }}>
                                Description
                            </label>
                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Optional description"
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: 8,
                                    border: `1px solid ${theme.colors.border}`,
                                    background: theme.colors.background,
                                    color: theme.colors.text.primary,
                                }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                style={{
                                    padding: "8px 16px",
                                    background: "transparent",
                                    color: theme.colors.text.secondary,
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={creating}
                                style={{
                                    padding: "8px 16px",
                                    background: theme.colors.primary,
                                    color: theme.colors.onPrimary,
                                    border: "none",
                                    borderRadius: 8,
                                    cursor: "pointer",
                                    opacity: creating ? 0.7 : 1,
                                }}
                            >
                                {creating ? "Creating..." : "Create Project"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
