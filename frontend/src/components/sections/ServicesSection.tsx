"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, GitBranch, Shield, Zap, Globe, Server } from "lucide-react";
import { Card } from "../ui/Card";
import Tilt from "react-parallax-tilt";

const services = [
    { icon: Code2, title: "Custom AI Apps", desc: "Enterprise AI solutions with custom models, RAG, and intelligent automation pipelines." },
    { icon: Globe, title: "Cloud Architecture", desc: "Scalable cloud architectures with microservices, container orchestration, and automated management." },
    { icon: Shield, title: "DevOps & Security", desc: "End-to-end DevSecOps pipelines with continuous deployment and enterprise-grade compliance." },
    { icon: Zap, title: "Performance Tuning", desc: "Sub-millisecond latency optimization, caching layers, and high-concurrency systems." },
    { icon: GitBranch, title: "System Integration", desc: "Seamless API integrations, legacy system modernization, and data warehousing." },
    { icon: Server, title: "API Development", desc: "Robust REST and GraphQL APIs designed for scalability, versioning, and developer experience." },
];

export function ServicesSection() {
    const { scrollY } = useScroll();

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
        <section className="py-32 relative bg-white overflow-hidden">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((svc, i) => (
                        <motion.div
                            key={svc.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Tilt glareEnable={true} glareMaxOpacity={0.03} glareColor="#000" scale={1.02} transitionSpeed={2000} className="h-full">
                                <Card className="p-8 h-full bg-white border border-border-light hover:border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] relative z-20">
                                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-8">
                                        <svc.icon className="w-6 h-6 text-foreground" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{svc.title}</h3>
                                    <p className="text-secondary-text leading-relaxed">{svc.desc}</p>
                                </Card>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
