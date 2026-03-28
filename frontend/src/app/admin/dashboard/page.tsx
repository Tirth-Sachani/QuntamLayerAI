"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_BASE } from "@/services/api";

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

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token) { router.push("/admin"); return; }

        fetch(`${API_BASE}/api/admin/leads`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => { if (!res.ok) throw new Error("Unauthorized"); return res.json(); })
            .then((data) => setLeads(data.leads || []))
            .catch(() => { localStorage.removeItem("admin_token"); router.push("/admin"); })
            .finally(() => setLoading(false));
    }, [router]);

    const stats = [
        { label: "Total Leads", value: leads.length, icon: "📋", color: "bg-blue-50 text-blue-700 border-blue-200" },
        { label: "New", value: leads.filter((l) => l.status === "new" || l.status === "New").length, icon: "🆕", color: "bg-green-50 text-green-700 border-green-200" },
        { label: "In Discussion", value: leads.filter((l) => l.status === "In Discussion").length, icon: "💬", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
        { label: "Closed", value: leads.filter((l) => l.status === "Closed").length, icon: "✅", color: "bg-gray-50 text-gray-700 border-gray-200" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Overview of your lead pipeline</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className={`p-5 rounded-xl border ${stat.color} transition-shadow hover:shadow-sm`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{stat.icon}</span>
                        </div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-sm font-medium opacity-70 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Recent Leads</h2>
                    <Link
                      href="/admin/leads/"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View All Leads &rarr;
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Name</th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Company</th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Email</th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Budget</th>
                                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.slice(0, 5).map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => router.push(`/admin/leads/${lead.id}`)}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{lead.company}</td>
                                    <td className="px-6 py-4 text-sm text-blue-600">{lead.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">{lead.budget || "—"}</td>
                                    <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">No leads yet</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        new: "bg-green-50 text-green-700 border-green-200",
        New: "bg-green-50 text-green-700 border-green-200",
        Contacted: "bg-blue-50 text-blue-700 border-blue-200",
        "In Discussion": "bg-yellow-50 text-yellow-700 border-yellow-200",
        Closed: "bg-gray-100 text-gray-600 border-gray-200",
    };

    return (
        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
            {status}
        </span>
    );
}
