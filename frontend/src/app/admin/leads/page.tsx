"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Lead {
    id: string;
    name: string;
    company: string;
    email: string;
    budget?: string;
    project_type?: string;
    message?: string;
    status: string;
    nda?: boolean;
    createdAt?: { seconds: number };
}

const STATUSES = ["New", "Contacted", "In Discussion", "Closed"];

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<"kanban" | "table">("kanban");
    const router = useRouter();

    useEffect(() => { 
        const fetchLeadsInner = () => {
            const token = localStorage.getItem("admin_token");
            if (!token) { router.push("/admin"); return; }

            fetch("http://localhost:5000/api/v1/admin/leads", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
                .then((data) => setLeads(data.leads || []))
                .catch(() => { localStorage.removeItem("admin_token"); router.push("/admin"); })
                .finally(() => setLoading(false));
        };
        fetchLeadsInner(); 
    }, [router]);

    const updateStatus = async (id: string, status: string) => {
        const token = localStorage.getItem("admin_token");
        await fetch(`http://localhost:5000/api/v1/admin/leads/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status }),
        });
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    };

    const deleteLead = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;
        const token = localStorage.getItem("admin_token");
        await fetch(`http://localhost:5000/api/v1/admin/leads/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setLeads((prev) => prev.filter((l) => l.id !== id));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Leads Pipeline</h1>
                    <p className="text-gray-500 text-sm mt-1">Visual sales management for high-value development accounts.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button onClick={() => setView("table")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${view === "table" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
                            📊 Table
                        </button>
                        <button onClick={() => setView("kanban")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${view === "kanban" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>
                            📋 Kanban
                        </button>
                    </div>
                </div>
            </div>

            {view === "kanban" ? (
                <KanbanView leads={leads} updateStatus={updateStatus} router={router} />
            ) : (
                <TableView leads={leads} updateStatus={updateStatus} deleteLead={deleteLead} router={router} />
            )}
        </div>
    );
}

function KanbanView({ leads, updateStatus, router }: { leads: Lead[]; updateStatus: (id: string, status: string) => void; router: ReturnType<typeof useRouter> }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATUSES.map((status) => {
                const col = leads.filter((l) => l.status === status || (status === "New" && l.status === "new"));
                const totalBudget = col.reduce((sum, l) => {
                    const match = l.budget?.match(/[\d,]+/);
                    return sum + (match ? parseInt(match[0].replace(/,/g, "")) * 1000 : 0);
                }, 0);

                return (
                    <div key={status} className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                    {status === "New" && "🆕"} {status === "Contacted" && "📞"} {status === "In Discussion" && "💬"} {status === "Closed" && "✅"} {status}
                                </h3>
                                <p className="text-xs text-gray-400 mt-0.5">{col.length} leads · ${(totalBudget / 1000).toFixed(0)}k total</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {col.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-sm cursor-pointer transition group"
                                    onClick={() => router.push(`/admin/leads/${lead.id}`)}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        {lead.project_type && (
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider">{lead.project_type}</span>
                                        )}
                                        <span className="text-[10px] text-gray-400">
                                            {lead.createdAt?.seconds ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString() : ""}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-gray-900 mt-1">{lead.name}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">{lead.company}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-sm font-bold text-blue-600">{lead.budget || "—"}</span>
                                        {/* Status quick-change */}
                                        <select
                                            value={lead.status}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => { e.stopPropagation(); updateStatus(lead.id, e.target.value); }}
                                            className="text-[10px] bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 text-gray-500 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                        >
                                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                            ))}
                            {col.length === 0 && (
                                <p className="text-center text-xs text-gray-300 py-8">No leads</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function TableView({ leads, updateStatus, deleteLead, router }: { leads: Lead[]; updateStatus: (id: string, status: string) => void; deleteLead: (id: string) => void; router: ReturnType<typeof useRouter> }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Name</th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Company</th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Email</th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Budget</th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Timeline</th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 cursor-pointer" onClick={() => router.push(`/admin/leads/${lead.id}`)}>{lead.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{lead.company}</td>
                                <td className="px-6 py-4 text-sm text-blue-600">{lead.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{lead.budget || "—"}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{lead.project_type || "—"}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={lead.status}
                                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                                        className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-500"
                                    >
                                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => deleteLead(lead.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
