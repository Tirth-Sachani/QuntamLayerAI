"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import Tilt from "react-parallax-tilt";

const studies = [
    {
        client: "Global FinTech",
        title: "High-Frequency Trading API",
        metric: "12ms",
        metricLabel: "Avg Latency",
        desc: "Architected a distributed trading engine processing 2M+ events per day with zero data loss.",
    },
    {
        client: "Healthcare Provider",
        title: "HIPAA Compliant Cloud",
        metric: "100%",
        metricLabel: "Compliance",
        desc: "Migrated legacy infrastructure to AWS with full SOC2 and HIPAA compliance pipelines.",
    },
];

export function CaseStudiesSection() {
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 5000], [0, -350]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -650]);
    const y3 = useTransform(scrollY, [0, 5000], [0, -200]);
    const y4 = useTransform(scrollY, [0, 5000], [0, -450]);
    const y5 = useTransform(scrollY, [0, 5000], [0, -250]);
    const y6 = useTransform(scrollY, [0, 5000], [0, -750]);
    const y7 = useTransform(scrollY, [0, 5000], [0, -300]);
    const y8 = useTransform(scrollY, [0, 5000], [0, -500]);

    const r1 = useTransform(scrollY, [0, 5000], [0, 60]);
    const r2 = useTransform(scrollY, [0, 5000], [0, -30]);

    return (
        <section className="py-32 relative bg-background overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />

            {/* 8 Floating UI Shapes (Parallax) */}
            <motion.div style={{ y: y1, rotate: r1 }} className="floating-shape w-40 h-40 rounded-[28px] top-[20%] right-[5%] hidden lg:block bg-white/60 border border-white" />
            <motion.div style={{ y: y2 }} className="floating-shape w-72 h-36 rounded-[24px] bottom-[30%] left-[2%] hidden lg:block bg-white/80 border border-white" />
            <motion.div style={{ y: y3 }} className="floating-shape w-20 h-20 rounded-full top-[40%] right-[15%] hidden md:block bg-blue-50/50 border border-blue-100" />
            <motion.div style={{ y: y4, rotate: r2 }} className="floating-shape w-32 h-32 rounded-[24px] bottom-[10%] left-[20%] hidden lg:block bg-white/70 border border-gray-50" />
            <motion.div style={{ y: y5 }} className="floating-shape w-12 h-12 rounded-full top-[10%] left-[30%] hidden lg:block bg-white/90 border border-white" />
            <motion.div style={{ y: y6, rotate: r1 }} className="floating-shape w-36 h-48 rounded-[30px] top-[60%] right-[8%] hidden lg:block bg-white/50 border border-white" />
            <motion.div style={{ y: y7 }} className="floating-shape w-16 h-16 rounded-full bottom-[20%] right-[40%] hidden md:block bg-blue-50/60 border border-blue-100" />
            <motion.div style={{ y: y8, rotate: r2 }} className="floating-shape w-24 h-24 rounded-[16px] top-[15%] left-[8%] hidden lg:block bg-white/40 border border-white" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Proven Systems</h2>
                        <p className="text-xl text-secondary-text max-w-2xl font-light">
                            Engineering solutions deployed at scale for industry leaders.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Button variant="outline" className="rounded-full bg-white relative z-20 hover:bg-black hover:text-white">
                            View All Case Studies <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {studies.map((study, i) => (
                        <motion.div
                            key={study.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="z-20 relative"
                        >
                            <Tilt glareEnable={true} glareMaxOpacity={0.03} glareColor="#000" scale={1.01} transitionSpeed={2000} className="h-full">
                                <div className="group h-full overflow-hidden rounded-[32px] bg-white border border-border-light shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500">
                                    <div className="p-6 sm:p-10 md:p-14">
                                        <span className="inline-block px-3 py-1 bg-gray-100 text-secondary-text text-sm font-medium rounded-full mb-8">
                                            {study.client}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight group-hover:text-accent transition-colors duration-300">
                                            {study.title}
                                        </h3>
                                        <p className="text-lg text-secondary-text leading-relaxed font-light mb-12">
                                            {study.desc}
                                        </p>
                                        <div className="pt-8 border-t border-gray-100 flex items-baseline gap-4">
                                            <span className="text-5xl font-black tracking-tighter text-foreground">{study.metric}</span>
                                            <span className="text-secondary-text font-medium">{study.metricLabel}</span>
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
