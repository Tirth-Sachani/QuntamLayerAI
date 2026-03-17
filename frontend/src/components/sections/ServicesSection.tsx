"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Code2, GitBranch, Shield, Zap, Globe, Server, X, ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";

const services = [
    {
        icon: Code2,
        title: "Custom AI Apps",
        shortDesc: "Enterprise AI solutions with custom models, RAG, and intelligent automation pipelines.",
        fullDesc: "Deploy transformative AI capabilities tailored to your specific enterprise needs. We build custom Copilots, implement Retrieval-Augmented Generation (RAG) for your proprietary data, and design automated intelligent workflows that scale.",
        techStack: ["OpenAI", "LangChain", "Vector Databases", "Python"],
        color: "#3B82F6", // Soft Blue
        bgTint: "rgba(59, 130, 246, 0.08)",
        shadow: "rgba(59, 130, 246, 0.4)",
    },
    {
        icon: Globe,
        title: "Cloud Architecture",
        shortDesc: "Scalable cloud architectures with microservices, container orchestration, and automated management.",
        fullDesc: "Modernize your infrastructure with robust, high-availability cloud solutions. We design resilient microservices, deploy advanced container orchestration with Kubernetes, and implement GitOps for automated infrastructure management.",
        techStack: ["AWS", "Kubernetes", "Terraform", "Docker"],
        color: "#10B981", // Mint Green
        bgTint: "rgba(16, 185, 129, 0.08)",
        shadow: "rgba(16, 185, 129, 0.4)",
    },
    {
        icon: Shield,
        title: "DevOps & Security",
        shortDesc: "End-to-end DevSecOps pipelines with continuous deployment and enterprise-grade compliance.",
        fullDesc: "Secure your software supply chain while accelerating delivery. Our DevSecOps implementations include automated vulnerability scanning, shift-left security tooling, and zero-downtime continuous deployment pipelines.",
        techStack: ["GitHub Actions", "SonarQube", "HashiCorp Vault", "Snyk"],
        color: "#8B5CF6", // Soft Purple
        bgTint: "rgba(139, 92, 246, 0.08)",
        shadow: "rgba(139, 92, 246, 0.4)",
    },
    {
        icon: Zap,
        title: "Performance Tuning",
        shortDesc: "Sub-millisecond latency optimization, caching layers, and high-concurrency systems.",
        fullDesc: "Eliminate bottlenecks and deliver lightning-fast digital experiences. We optimize database queries, implement multi-tier caching strategies, and architect high-concurrency systems capable of handling massive traffic spikes.",
        techStack: ["Redis", "CDN", "Rust", "Go"],
        color: "#F97316", // Orange Glow
        bgTint: "rgba(249, 115, 22, 0.08)",
        shadow: "rgba(249, 115, 22, 0.4)",
    },
    {
        icon: GitBranch,
        title: "System Integration",
        shortDesc: "Seamless API integrations, legacy system modernization, and data warehousing.",
        fullDesc: "Unify your digital ecosystem by seamlessly connecting disparate systems. We build robust ETL pipelines, execute risk-free legacy modernizations, and engineer event-driven architectures for real-time data synchronization.",
        techStack: ["Kafka", "Airflow", "GraphQL", "Snowflake"],
        color: "#06B6D4", // Cyan Glow
        bgTint: "rgba(6, 182, 212, 0.08)",
        shadow: "rgba(6, 182, 212, 0.4)",
    },
    {
        icon: Server,
        title: "API Development",
        shortDesc: "Robust REST and GraphQL APIs designed for scalability, versioning, and developer experience.",
        fullDesc: "Power your applications with enterprise-grade APIs. We focus on rigorous API design, comprehensive documentation, secure rate-limiting, and backwards-compatible versioning to ensure an exceptional developer experience.",
        techStack: ["Node.js", "GraphQL", "PostgreSQL", "OpenAPI"],
        color: "#EC4899", // Pink Glow
        bgTint: "rgba(236, 72, 153, 0.08)",
        shadow: "rgba(236, 72, 153, 0.4)",
    },
];

export function ServicesSection() {
    const { scrollY } = useScroll();
    const [activeCard, setActiveCard] = useState<typeof services[0] | null>(null);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveCard(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (activeCard) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeCard]);

    const y1 = useTransform(scrollY, [0, 5000], [0, -400]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -600]);
    const y3 = useTransform(scrollY, [0, 5000], [0, -250]);
    const y4 = useTransform(scrollY, [0, 5000], [0, -500]);
    const y5 = useTransform(scrollY, [0, 5000], [0, -200]);
    const y6 = useTransform(scrollY, [0, 5000], [0, -700]);
    const y7 = useTransform(scrollY, [0, 5000], [0, -350]);
    const y8 = useTransform(scrollY, [0, 5000], [0, -450]);

    const r1 = useTransform(scrollY, [0, 5000], [0, 45]);
    const r2 = useTransform(scrollY, [0, 5000], [0, -45]);

    return (
        <section className="py-32 relative bg-white overflow-hidden scroll-mt-24" id="services">
            {/* 8 Floating UI Shapes (Parallax) */}
            <motion.div style={{ y: y1, rotate: r1 }} className="floating-shape w-48 h-48 rounded-[32px] top-[10%] left-[5%] hidden lg:block bg-white/60 border border-gray-100" />
            <motion.div style={{ y: y2 }} className="floating-shape w-64 h-32 rounded-[24px] top-[40%] right-[3%] hidden lg:block bg-white/80 border border-gray-100" />
            <motion.div style={{ y: y3 }} className="floating-shape w-24 h-24 rounded-full bottom-[10%] left-[15%] hidden md:block bg-blue-50/20 border border-blue-50" />
            <motion.div style={{ y: y4, rotate: r2 }} className="floating-shape w-32 h-32 rounded-[20px] bottom-[20%] right-[10%] hidden lg:block bg-white/70 border border-gray-50" />
            <motion.div style={{ y: y5 }} className="floating-shape w-16 h-16 rounded-full top-[15%] right-[20%] hidden lg:block bg-white/90 border border-gray-100" />
            <motion.div style={{ y: y6, rotate: r1 }} className="floating-shape w-40 h-48 rounded-[30px] bottom-[30%] left-[2%] hidden lg:block bg-white/50 border border-gray-100" />
            <motion.div style={{ y: y7 }} className="floating-shape w-12 h-12 rounded-full bottom-[5%] left-[45%] hidden md:block bg-blue-50/20 border border-blue-50" />
            <motion.div style={{ y: y8, rotate: r2 }} className="floating-shape w-20 h-20 rounded-[12px] top-[25%] left-[30%] hidden lg:block bg-white/40 border border-gray-100" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Digital Capabilities</h2>
                    <p className="text-xl text-secondary-text max-w-2xl font-light">
                        Purpose-built engineering services designed for enterprise-scale challenges and high-value contracts.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
                    <AnimatePresence>
                        {services.map((svc, i) => (
                            <motion.div
                                key={`grid-${svc.title}`}
                                layoutId={`card-container-${svc.title}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full relative group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl"
                                role="button"
                                tabIndex={0}
                                aria-label={`Expand ${svc.title} details`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setActiveCard(svc);
                                    }
                                }}
                                onClick={() => setActiveCard(svc)}
                                whileHover={{ y: -8, scale: 1.02 }}
                                whileTap={{ scale: 0.94, rotate: (i % 2 === 0 ? 1 : -1) }}
                            >
                                <motion.div
                                    layoutId={`card-bg-${svc.title}`}
                                    className="absolute inset-0 bg-white rounded-3xl overflow-hidden"
                                    style={{
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                                        border: "1px solid var(--border-light, #e5e7eb)",
                                    }}
                                />

                                {/* Hover background tint */}
                                <motion.div
                                    layoutId={`card-tint-${svc.title}`}
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
                                    style={{ backgroundColor: svc.bgTint }}
                                />

                                {/* Hover border glow & shadow override using inset box-shadow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
                                    style={{ boxShadow: `inset 0 0 0 2px ${svc.color}, 0 20px 40px ${svc.shadow}` }}
                                />

                                <div className="relative z-10 p-8 h-full flex flex-col pointer-events-none">
                                    <motion.div
                                        layoutId={`card-icon-container-${svc.title}`}
                                        className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300 origin-center cursor-pointer"
                                    >
                                        <svc.icon className="w-6 h-6 text-slate-800 transition-colors duration-300" style={{ color: "var(--icon-color, currentColor)" }} />
                                    </motion.div>

                                    {/* Style injection hack for hover colors since Framer Motion layoutId and inline styles can clash on children */}
                                    <style jsx>{`
                                        .group:hover .hover-color-target {
                                            color: ${svc.color} !important;
                                        }
                                        .group:hover .hover-icon-target {
                                            --icon-color: ${svc.color} !important;
                                        }
                                        .group:hover .hover-underline-target {
                                            width: 100% !important;
                                        }
                                    `}</style>

                                    <motion.h3
                                        layoutId={`card-title-${svc.title}`}
                                        className="text-2xl font-bold mb-4 inline-block relative hover-color-target text-slate-900 transition-colors duration-300 max-w-fit"
                                    >
                                        {svc.title}
                                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 hover-underline-target" style={{ backgroundColor: svc.color }} />
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`card-desc-${svc.title}`}
                                        className="text-slate-500 leading-relaxed hover-color-target transition-colors duration-300"
                                    >
                                        {svc.shortDesc}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Expanded Card Modal */}
            <AnimatePresence>
                {activeCard && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-0 z-[100] bg-black/30"
                            onClick={() => setActiveCard(null)}
                            aria-hidden="true"
                        />
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 lg:p-12 pointer-events-none" style={{ perspective: "1200px" }}>
                            <motion.div
                                layoutId={`card-container-${activeCard.title}`}
                                className="w-full max-w-2xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[90vh] rounded-3xl relative"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="dialog-title"
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 18,
                                    mass: 0.8,
                                    bounce: 0.3
                                }}
                                style={{ backgroundColor: '#ffffff', transformOrigin: "center center" }}
                            >
                                <motion.div
                                    layoutId={`card-bg-${activeCard.title}`}
                                    className="absolute inset-0 bg-white rounded-3xl"
                                    style={{
                                        border: `2px solid ${activeCard.color}`,
                                        boxShadow: `0 30px 60px ${activeCard.shadow}`
                                    }}
                                />

                                <motion.div
                                    layoutId={`card-tint-${activeCard.title}`}
                                    className="absolute inset-0 rounded-3xl pointer-events-none"
                                />

                                <div className="relative z-10 flex flex-col h-full scrollbar-thin">
                                    {/* Header */}
                                    <div
                                        className="p-8 md:p-10 shrink-0 border-b border-gray-100 relative overflow-hidden"
                                        style={{ backgroundColor: activeCard.bgTint }}
                                    >
                                        <button
                                            onClick={() => setActiveCard(null)}
                                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-black/5 flex items-center justify-center hover:bg-white transition-all hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-offset-2 z-20"
                                            style={{ '--tw-ring-color': activeCard.color } as React.CSSProperties}
                                            aria-label="Close details"
                                        >
                                            <X className="w-5 h-5 text-gray-600" />
                                        </button>

                                        <motion.div
                                            layoutId={`card-icon-container-${activeCard.title}`}
                                            className="w-16 h-16 rounded-2xl bg-white border flex items-center justify-center mb-6 shadow-sm relative z-10"
                                            style={{ borderColor: `${activeCard.color}40` }}
                                        >
                                            <activeCard.icon className="w-8 h-8" style={{ color: activeCard.color }} />
                                        </motion.div>
                                        <motion.h3
                                            id="dialog-title"
                                            layoutId={`card-title-${activeCard.title}`}
                                            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 relative z-10"
                                        >
                                            {activeCard.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`card-desc-${activeCard.title}`}
                                            className="text-lg text-slate-600 md:pr-12 relative z-10"
                                        >
                                            {activeCard.shortDesc}
                                        </motion.p>
                                    </div>

                                    {/* Body */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(8px)" }}
                                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(4px)" }}
                                        transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.2 }}
                                        className="p-8 md:p-10 overflow-y-auto flex-1 bg-white"
                                    >
                                        <div className="mb-10">
                                            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Detailed Overview</h4>
                                            <p className="text-slate-700 leading-relaxed md:text-lg">{activeCard.fullDesc}</p>
                                        </div>

                                        <div className="mb-10">
                                            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Technology Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeCard.techStack.map((tech, idx) => (
                                                    <motion.span
                                                        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 + (idx * 0.05) }}
                                                        key={tech}
                                                        className="px-4 py-2 rounded-full text-sm font-medium border"
                                                        style={{
                                                            backgroundColor: activeCard.bgTint,
                                                            color: activeCard.color,
                                                            borderColor: `${activeCard.color}30`
                                                        }}
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <motion.button
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.4 }}
                                            className="w-full md:w-auto px-8 py-4 rounded-full text-white font-semibold flex items-center justify-center gap-2 group transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2"
                                            style={{ backgroundColor: activeCard.color, boxShadow: `0 8px 20px ${activeCard.shadow}`, '--tw-ring-color': activeCard.color } as React.CSSProperties}
                                        >
                                            <span>Start {activeCard.title.split(' ')[1] || 'Your'} Project</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}

