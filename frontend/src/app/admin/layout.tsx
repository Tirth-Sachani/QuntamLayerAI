"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-[#f5f7fa]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-sm overflow-hidden border border-white/10">
                            <Image
                                src="/favicon.ico"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-gray-900">QuntamLayerAI CRM</span>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <SidebarLink href="/admin/dashboard" icon="📊" label="Dashboard" active={pathname === "/admin/dashboard"} />
                    <SidebarLink href="/admin/leads" icon="📋" label="Leads" active={pathname?.startsWith("/admin/leads") ?? false} />
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={() => {
                            localStorage.removeItem("admin_token");
                            window.location.href = "/admin";
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Search leads..."
                            className="w-72 h-10 px-4 rounded-lg bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
                            🔔
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
                            ⚙️
                        </button>
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                            T
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ href, icon, label, active }: { href: string; icon: string; label: string; active: boolean }) {
    return (
        <a
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
        >
            <span className="text-base">{icon}</span> {label}
        </a>
    );
}
