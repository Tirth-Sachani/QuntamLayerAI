"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { HeroParticles } from "../animations/HeroParticles";
import { RainText } from "../animations/RainText";

export function HeroSection() {
    const { scrollY } = useScroll();
    const [phase1Finished, setPhase1Finished] = useState(false);

    const y1 = useTransform(scrollY, [0, 5000], [0, -500]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -700]);
    const y3 = useTransform(scrollY, [0, 5000], [0, -300]);
    const y4 = useTransform(scrollY, [0, 5000], [0, -600]);
    const y5 = useTransform(scrollY, [0, 5000], [0, -250]);
    const y6 = useTransform(scrollY, [0, 5000], [0, -800]);
    const y7 = useTransform(scrollY, [0, 5000], [0, -400]);
    const y8 = useTransform(scrollY, [0, 5000], [0, -550]);

    const r1 = useTransform(scrollY, [0, 5000], [0, 90]);
    const r2 = useTransform(scrollY, [0, 5000], [0, -60]);

    return (
        <section className="relative min-h-[100vh] flex items-center overflow-hidden pt-24 bg-background">
            {/* Neo Minimal Grid Background */}
            <div className="absolute inset-0 hero-grid opacity-60 pointer-events-none" />
            <HeroParticles />

            {/* 8 Floating UI Shapes (Parallax) */}
            <motion.div style={{ y: y1, rotate: r1 }} className="floating-shape w-48 h-48 rounded-[32px] top-[15%] right-[10%] hidden md:block bg-white/60 border border-white" />
            <motion.div style={{ y: y2 }} className="floating-shape w-64 h-32 rounded-[24px] bottom-[20%] left-[5%] hidden md:block bg-white/80 border border-white" />
            <motion.div style={{ y: y3 }} className="floating-shape w-24 h-24 rounded-full top-[30%] left-[15%] hidden md:block bg-blue-50/80 border border-blue-100" />
            <motion.div style={{ y: y4, rotate: r2 }} className="floating-shape w-32 h-32 rounded-[20px] bottom-[30%] right-[20%] hidden lg:block bg-white/70 border border-gray-50" />
            <motion.div style={{ y: y5 }} className="floating-shape w-16 h-16 rounded-full top-[10%] left-[40%] hidden lg:block bg-white/90 border border-white" />
            <motion.div style={{ y: y6, rotate: r1 }} className="floating-shape w-40 h-48 rounded-[30px] top-[40%] right-[2%] hidden lg:block bg-white/50 border border-white" />
            <motion.div style={{ y: y7 }} className="floating-shape w-12 h-12 rounded-full bottom-[15%] right-[35%] hidden md:block bg-blue-50/60 border border-blue-100" />
            <motion.div style={{ y: y8, rotate: r2 }} className="floating-shape w-20 h-20 rounded-[12px] top-[20%] left-[30%] hidden lg:block bg-white/40 border border-white" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-border-light shadow-sm text-secondary-text text-sm font-medium mb-10 tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse" />
                            QuntamLayerAI Infrastructure
                        </div>

                        <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-black leading-[0.95] tracking-[-0.03em] mb-8 text-foreground flex flex-col items-center w-full">
                            <RainText text="Built for scale." onComplete={() => setPhase1Finished(true)} />{" "}
                            <div className="block w-full text-black mt-2 pb-2 min-h-[1.2em]">
                                {phase1Finished && (
                                    <RainText text="Engineered for Performance." delay={0} />
                                )}
                            </div>
                        </h1>

                        <p className="text-xl md:text-2xl text-secondary-text max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-tight px-4">
                            Designing advanced digital infrastructure for the world's most demanding enterprise applications.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">

                            <Link href="/contact">
                                <Button size="lg" className="h-14 px-8 text-base w-full sm:w-auto">
                                    Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-base w-full sm:w-auto border-border-light bg-white">
                                <Play className="mr-2 h-5 w-5" /> View Architecture
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
