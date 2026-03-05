"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Server, Database, Globe, Cpu } from "lucide-react";

const techStack = [
    { name: "Next.js", icon: Globe, desc: "React framework with server-side rendering for optimal performance." },
    { name: "Node.js", icon: Cpu, desc: "JavaScript runtime built on V8 for high-throughput backend services." },
    { name: "MongoDB", icon: Database, desc: "Fully managed, multi-cloud database service." },
    { name: "AWS", icon: Server, desc: "Cloud infrastructure providing compute at global scale." },
];

export function TechnologySection() {
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 5000], [0, -350]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -650]);
    const y3 = useTransform(scrollY, [0, 5000], [0, -250]);
    const y4 = useTransform(scrollY, [0, 5000], [0, -500]);
    const y5 = useTransform(scrollY, [0, 5000], [0, -200]);
    const y6 = useTransform(scrollY, [0, 5000], [0, -750]);
    const y7 = useTransform(scrollY, [0, 5000], [0, -400]);
    const y8 = useTransform(scrollY, [0, 5000], [0, -550]);

    const r1 = useTransform(scrollY, [0, 5000], [0, 90]);
    const r2 = useTransform(scrollY, [0, 5000], [0, -45]);

    return (
        <section className="py-32 relative bg-background overflow-hidden">
            <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

            {/* 8 Floating UI Shapes (Parallax) */}
            <motion.div style={{ y: y1, rotate: r1 }} className="floating-shape w-40 h-40 rounded-[24px] top-[10%] left-[8%] hidden lg:block bg-white/60 border border-white" />
            <motion.div style={{ y: y2 }} className="floating-shape w-56 h-28 rounded-[20px] bottom-[20%] right-[5%] hidden lg:block bg-white/80 border border-white" />
            <motion.div style={{ y: y3 }} className="floating-shape w-24 h-24 rounded-full top-[50%] left-[15%] hidden md:block bg-blue-50/30 border border-blue-50" />
            <motion.div style={{ y: y4, rotate: r2 }} className="floating-shape w-32 h-32 rounded-[16px] bottom-[30%] left-[5%] hidden lg:block bg-white/70 border border-gray-50" />
            <motion.div style={{ y: y5 }} className="floating-shape w-16 h-16 rounded-full top-[15%] right-[25%] hidden lg:block bg-white/90 border border-white" />
            <motion.div style={{ y: y6, rotate: r1 }} className="floating-shape w-36 h-48 rounded-[30px] top-[60%] right-[3%] hidden lg:block bg-white/50 border border-white" />
            <motion.div style={{ y: y7 }} className="floating-shape w-12 h-12 rounded-full bottom-[10%] left-[45%] hidden md:block bg-blue-50/40 border border-blue-50" />
            <motion.div style={{ y: y8, rotate: r2 }} className="floating-shape w-20 h-20 rounded-[12px] top-[25%] left-[30%] hidden lg:block bg-white/40 border border-white" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Foundation Layers</h2>
                    <p className="text-xl text-secondary-text max-w-2xl mx-auto font-light">
                        Our reference architecture uses an event-driven topology designed for high availability and low latency.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {techStack.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[24px] bg-white border border-border-light p-8 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300 z-20 relative"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6">
                                <tech.icon className="w-6 h-6 text-foreground" />
                            </div>
                            <h4 className="text-xl font-bold mb-3 tracking-tight">{tech.name}</h4>
                            <p className="text-sm text-secondary-text leading-relaxed font-light">{tech.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
