"use client";

import { motion } from "framer-motion";
import { Database, Globe, Cpu } from "lucide-react";

const tiers = [
    { icon: Globe, label: "Frontend", desc: "Next.js + React with SSR/SSG for blazing-fast page loads", color: "from-blue-500 to-cyan-500" },
    { icon: Cpu, label: "Core Engine", desc: "Express.js business logic layer with async processing", color: "from-primary-500 to-primary-700" },
    { icon: Database, label: "Data Layer", desc: "MongoDB Atlas with automatic replication and sharding", color: "from-indigo-500 to-purple-600" },
];

const techStack = [
    { name: "Next.js", desc: "React framework with server-side rendering and static generation for optimal SEO." },
    { name: "Node.js", desc: "JavaScript runtime built on V8 for high-throughput, event-driven backend services." },
    { name: "MongoDB Atlas", desc: "Fully managed, multi-cloud database service with enterprise-grade security." },
    { name: "AWS", desc: "Cloud infrastructure providing compute, storage, and networking at global scale." },
];

export function ArchitectureSection() {
    return (
        <section className="py-24 md:py-32 relative">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Reference Architecture</h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        A modern, event-driven topology built designed for high availability, low latency, and horizontal scalability across regions.
                    </p>
                </motion.div>

                {/* Architecture Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="group relative rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-8 hover:border-primary-500/40 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                                <tier.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{tier.label}</h3>
                            <p className="text-sm text-white/50 leading-relaxed">{tier.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tech Stack Deep Dive */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Tech Stack Deep Dive</h3>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {techStack.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="rounded-xl border border-white/10 bg-black/30 p-6 hover:border-primary-500/30 transition-all"
                        >
                            <h4 className="text-lg font-semibold mb-2 text-primary-400">{tech.name}</h4>
                            <p className="text-sm text-white/50 leading-relaxed">{tech.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
