"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const solutions = [
    {
        icon: Brain,
        title: "Custom AI Apps",
        desc: "Enterprise-grade AI solutions built with custom models, retrieval-augmented generation (RAG), and intelligent automation pipelines.",
        tags: ["GPT Integration", "LangChain", "Vector DB"],
    },
    {
        icon: Cloud,
        title: "API & Cloud Architecture",
        desc: "Scalable, high-availability cloud architectures with microservices, container orchestration, and automated infrastructure management.",
        tags: ["REST APIs", "Docker", "AWS"],
    },
    {
        icon: ShieldCheck,
        title: "DevOps & Security",
        desc: "End-to-end DevSecOps pipelines with continuous deployment, real-time monitoring, and enterprise-grade compliance (SOC2, GDPR).",
        tags: ["CI/CD", "SAST/DAST", "Monitoring"],
    },
];

export function SolutionsSection() {
    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Solutions</h2>
                        <p className="text-white/50 max-w-xl">
                            Purpose-built engineering services designed for enterprise-scale challenges.
                        </p>
                    </div>
                    <Link href="/services" className="hidden md:flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors">
                        View All Solutions <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {solutions.map((sol, i) => (
                        <motion.div
                            key={sol.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="group rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden hover:border-primary-500/40 transition-all duration-300"
                        >
                            {/* Card image area */}
                            <div className="h-48 bg-gradient-to-br from-primary-900/40 to-primary-600/10 flex items-center justify-center">
                                <sol.icon className="w-16 h-16 text-primary-400/60 group-hover:text-primary-400 transition-colors" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">{sol.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed mb-4">{sol.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {sol.tags.map((tag) => (
                                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
