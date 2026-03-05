"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Lead {
    id: string;
    name: string;
    company: string;
    email: string;
    phone?: string;
    budget?: string;
    project_type?: string;
    message?: string;
    status: string;
    nda?: boolean;
    createdAt?: { seconds: number };
}

const STATUSES = ["New", "Contacted", "In Discussion", "Closed"];

export default function LeadDetailPage() {
    const [lead, setLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token) { router.push("/admin"); return; }

        fetch(`http://localhost:5000/api/v1/admin/leads/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
            .then((data) => setLead(data.lead))
            .catch(() => router.push("/admin/leads"))
            .finally(() => setLoading(false));
    }, [id, router]);

    const updateStatus = async (status: string) => {
        const token = localStorage.getItem("admin_token");
        await fetch(`http://localhost:5000/api/v1/admin/leads/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status }),
        });
        setLead((prev) => prev ? { ...prev, status } : null);
    };

    const deleteLead = async () => {
        if (!confirm("Are you sure you want to delete this lead?")) return;
        const token = localStorage.getItem("admin_token");
        await fetch(`http://localhost:5000/api/v1/admin/leads/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        router.push("/admin/leads");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!lead) return <p className="text-center text-gray-400 py-20">Lead not found</p>;

    const details = [
        { label: "Full Name", value: lead.name, icon: "👤" },
        { label: "Company", value: lead.company, icon: "🏢" },
        { label: "Email", value: lead.email, icon: "📧", isLink: true },
        { label: "Phone", value: lead.phone || "Not provided", icon: "📱" },
        { label: "Budget", value: lead.budget || "Not specified", icon: "💰" },
        { label: "Timeline", value: lead.project_type || "Not specified", icon: "📅" },
        { label: "NDA Required", value: lead.nda ? "Yes" : "No", icon: "🔒" },
        { label: "Submitted", value: lead.createdAt?.seconds ? new Date(lead.createdAt.seconds * 1000).toLocaleString() : "Unknown", icon: "🕐" },
    ];

    return (
        <div>
            {/* Back + Actions */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => router.push("/admin/leads")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition">
                    ← Back to Leads
                </button>
                <div className="flex items-center gap-3">
                    <select
                        value={lead.status}
                        onChange={(e) => updateStatus(e.target.value)}
                        className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 cursor-pointer focus:ring-2 focus:ring-blue-500"
                    >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={deleteLead} className="px-4 py-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 font-medium transition">
                        Delete
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Details Card */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Lead Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                        {details.map((d) => (
                            <div key={d.label}>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{d.icon} {d.label}</p>
                                {d.isLink ? (
                                    <a href={`mailto:${d.value}`} className="text-sm text-blue-600 font-medium">{d.value}</a>
                                ) : (
                                    <p className="text-sm text-gray-900 font-medium">{d.value}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Status History</h3>
                    <div className="space-y-3">
                        {STATUSES.map((s, i) => {
                            const isActive = s === lead.status || (s === "New" && lead.status === "new");
                            const isPast = STATUSES.indexOf(lead.status === "new" ? "New" : lead.status) >= i;
                            return (
                                <div key={s} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${isActive ? "bg-blue-600 text-white" : isPast ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                                        {isPast ? "✓" : i + 1}
                                    </div>
                                    <span className={`text-sm font-medium ${isActive ? "text-blue-700" : isPast ? "text-gray-700" : "text-gray-400"}`}>{s}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Project Brief */}
            {lead.message && (
                <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">📝 Project Brief</h3>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                </div>
            )}
        </div>
    );
}
