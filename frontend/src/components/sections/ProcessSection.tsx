"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code2, Rocket, ShieldCheck, BarChart3 } from "lucide-react";

const steps = [
    { icon: Search, label: "Discovery", desc: "Requirements analysis & system audit" },
    { icon: PenTool, label: "Architecture", desc: "System design & technology selection" },
    { icon: Code2, label: "Development", desc: "Agile sprints with CI/CD integration" },
    { icon: ShieldCheck, label: "Security Audit", desc: "Penetration testing & compliance" },
    { icon: Rocket, label: "Deployment", desc: "Zero-downtime cloud deployment" },
    { icon: BarChart3, label: "Optimization", desc: "Performance monitoring & scaling" },
];

export function ProcessSection() {
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 5000], [0, -400]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -600]);
    const y3 = useTransform(scrollY, [0, 5000], [0, -300]);
    const y4 = useTransform(scrollY, [0, 5000], [0, -550]);
    const y5 = useTransform(scrollY, [0, 5000], [0, -200]);
    const y6 = useTransform(scrollY, [0, 5000], [0, -700]);
    const y7 = useTransform(scrollY, [0, 5000], [0, -450]);
    const y8 = useTransform(scrollY, [0, 5000], [0, -350]);

    const r1 = useTransform(scrollY, [0, 5000], [0, 45]);
    const r2 = useTransform(scrollY, [0, 5000], [0, -60]);

    return (
        <section className="py-32 relative bg-white overflow-hidden">
            {/* 8 Floating UI Shapes (Parallax) */}
            <motion.div style={{ y: y1, rotate: r1 }} className="floating-shape w-48 h-48 rounded-[30px] top-[15%] left-[8%] hidden lg:block bg-white/60 border border-gray-100" />
            <motion.div style={{ y: y2 }} className="floating-shape w-64 h-32 rounded-[24px] bottom-[25%] right-[5%] hidden lg:block bg-white/80 border border-gray-100" />
            <motion.div style={{ y: y3 }} className="floating-shape w-24 h-24 rounded-full top-[30%] right-[20%] hidden md:block bg-blue-50/20 border border-blue-50" />
            <motion.div style={{ y: y4, rotate: r2 }} className="floating-shape w-32 h-32 rounded-[20px] bottom-[15%] left-[10%] hidden lg:block bg-white/70 border border-gray-50" />
            <motion.div style={{ y: y5 }} className="floating-shape w-16 h-16 rounded-full bottom-[40%] right-[30%] hidden lg:block bg-white/90 border border-gray-100" />
            <motion.div style={{ y: y6, rotate: r1 }} className="floating-shape w-36 h-48 rounded-[28px] top-[40%] left-[2%] hidden lg:block bg-white/50 border border-gray-100" />
            <motion.div style={{ y: y7 }} className="floating-shape w-12 h-12 rounded-full bottom-[10%] left-[45%] hidden md:block bg-blue-50/30 border border-blue-50" />
            <motion.div style={{ y: y8, rotate: r2 }} className="floating-shape w-20 h-20 rounded-[12px] top-[20%] right-[35%] hidden lg:block bg-white/40 border border-gray-100" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Execution Blueprint</h2>
                    <p className="text-xl text-secondary-text max-w-2xl font-light">
                        A tested 6-phase framework for reliable enterprise deployments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.label}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative p-8 rounded-[24px] border border-border-light bg-background hover:bg-white transition-colors duration-300 z-20"
                        >
                            <div className="text-5xl font-black text-gray-100 absolute top-4 right-6 select-none opacity-50">
                                0{i + 1}
                            </div>
                            <div className="w-12 h-12 mb-6 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                <step.icon className="w-5 h-5" />
                            </div>
                            <h4 className="text-xl font-bold mb-3 tracking-tight">{step.label}</h4>
                            <p className="text-secondary-text leading-relaxed font-light">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
