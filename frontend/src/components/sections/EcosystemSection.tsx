"use client";

import { motion } from "framer-motion";
import { Server, Shield, Gauge, Code2, GitBranch, Layers, Network, Webhook } from "lucide-react";

const categories = [
    {
        title: "Frontend",
        items: [
            { icon: Code2, label: "Next.js" },
            { icon: Layers, label: "Tailwind CSS" },
            { icon: Gauge, label: "Framer Motion" },
        ],
    },
    {
        title: "Backend",
        highlight: true,
        items: [
            { icon: Server, label: "Express.js" },
            { icon: Network, label: "REST API" },
            { icon: Webhook, label: "Python FastAPI" },
        ],
    },
    {
        title: "DevOps",
        items: [
            { icon: Shield, label: "Helmet.js" },
            { icon: GitBranch, label: "CI/CD" },
            { icon: Gauge, label: "Monitoring" },
        ],
    },
];

export function EcosystemSection() {
    return (
        <section className="py-24 md:py-32 relative bg-gradient-to-b from-black via-primary-950/10 to-black">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrated Tech Ecosystem</h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        A seamless full-stack engineering topology with four layers designed to iterate, ship, and scale with confidence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className={`rounded-xl border p-8 ${cat.highlight
                                    ? "border-primary-500/40 bg-primary-950/30 shadow-lg shadow-primary-600/10"
                                    : "border-white/10 bg-black/40"
                                }`}
                        >
                            <h3 className="text-xl font-semibold mb-6 text-center">{cat.title}</h3>
                            <div className="space-y-4">
                                {cat.items.map((item) => (
                                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                        <item.icon className="w-5 h-5 text-primary-400" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
