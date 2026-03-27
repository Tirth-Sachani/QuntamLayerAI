"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code2, Rocket, ShieldCheck, BarChart3 } from "lucide-react";
import { CustomerReviews } from "./CustomerReviews";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const steps = [
    { id: "01", icon: Search, label: "Discovery", desc: "In-depth requirements analysis, comprehensive system auditing, and stakeholder alignment to ensure a solid foundation for the entire project lifecycle.", bg: "linear-gradient(135deg, #e3f2ff, #f5fbff)" },
    { id: "02", icon: PenTool, label: "Architecture", desc: "Strategic system design, robust technology stack selection, and scalability planning to support long-term enterprise growth and high-performance demands.", bg: "linear-gradient(135deg, #e8f8f5, #f2fffb)" },
    { id: "03", icon: Code2, label: "Development", desc: "High-velocity agile sprints coupled with seamless CI/CD integration, ensuring continuous delivery of features with the highest coding standards and performance.", bg: "linear-gradient(135deg, #f4ecff, #faf6ff)" },
    { id: "04", icon: ShieldCheck, label: "Security Audit", desc: "Rigorous penetration testing, multi-layered vulnerability assessments, and strict compliance audits to safeguard enterprise data and maintain user trust.", bg: "linear-gradient(135deg, #fff4e8, #fffaf5)" },
    { id: "05", icon: Rocket, label: "Deployment", desc: "Sophisticated zero-downtime cloud deployment strategies, automated rollback mechanisms, and global edge-delivery for immediate, reliable availability.", bg: "linear-gradient(135deg, #e9f7ff, #f7fcff)" },
    { id: "06", icon: BarChart3, label: "Optimization", desc: "Real-time performance monitoring, AI-driven scaling, and continuous code optimization to ensure peak efficiency under any load conditions.", bg: "linear-gradient(135deg, #fef1ff, #fff6ff)" },
];

export function ProcessSection() {
    const { scrollY } = useScroll();

    // Parallax background values
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

    const sectionRef = useRef<HTMLElement>(null);
    const gridWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const section = sectionRef.current;
        const gridWrap = gridWrapRef.current;
        if (!section || !gridWrap) return;

        const cards = gsap.utils.toArray<HTMLElement>(".process-card");

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top -=5%", // Start slightly earlier for headspace
                        end: "+=6000px", // Extended scroll for 3x2 reveal
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // PLAN:
                // 1, 2, 3 reveal horizontally in a row.
                // 4, 5, 6 reveal by stacking ON TOP of 1, 2, 3 with offset.

                // Final positions in the grid
                // Card 1: Left
                // Card 2: Center
                // Card 3: Right
                // Card 4: Top of 1
                // Card 5: Top of 2
                // Card 6: Top of 3

                const cardWidth = 400; // Slightly smaller to guarantee fit
                const spacing = 30;
                const offsetX = 20; // More compact stacking
                const offsetY = 20;

                // Initialize all cards offscreen LEFT
                gsap.set(cards, { x: "-120vw", opacity: 0, scale: 0.9 });

                // Step 1: Reveal 1, 2, 3
                [0, 1, 2].forEach((idx, i) => {
                    const finalX = (i - 1) * (cardWidth + spacing);
                    tl.to(cards[idx], {
                        x: finalX,
                        y: -50, // Move up for more bottom clearance
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: "power2.out"
                    }, i * 1.5);
                });

                // Step 2: Reveal 4, 5, 6 stacking on top
                [3, 4, 5].forEach((idx, i) => {
                    const baseIdx = idx - 3;
                    const finalX = (baseIdx - 1) * (cardWidth + spacing) + offsetX;
                    const finalY = -50 + offsetY;

                    tl.to(cards[idx], {
                        x: finalX,
                        y: finalY,
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: "power2.out"
                    }, 4.5 + i * 1.5);
                });
            });

            return () => mm.revert();
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <section ref={sectionRef} className="relative bg-white overflow-hidden min-h-screen flex flex-col items-center justify-start pt-12 pb-20">
                {/* Background Shapes */}
                <motion.div style={{ y: y1, rotate: r1 }} className="floating-shape w-48 h-48 rounded-[30px] top-[15%] left-[8%] hidden lg:block bg-white/60 border border-gray-100 absolute z-0" />
                <motion.div style={{ y: y2 }} className="floating-shape w-64 h-32 rounded-[24px] bottom-[25%] right-[5%] hidden lg:block bg-white/80 border border-gray-100 absolute z-0" />
                <motion.div style={{ y: y3 }} className="floating-shape w-24 h-24 rounded-full top-[30%] right-[20%] hidden md:block bg-blue-50/20 border border-blue-50 absolute z-0" />
                <motion.div style={{ y: y4, rotate: r2 }} className="floating-shape w-32 h-32 rounded-[20px] bottom-[15%] left-[10%] hidden lg:block bg-white/70 border border-gray-50 absolute z-0" />
                <motion.div style={{ y: y5 }} className="floating-shape w-16 h-16 rounded-full bottom-[40%] right-[30%] hidden lg:block bg-white/90 border border-gray-100 absolute z-0" />
                <motion.div style={{ y: y6, rotate: r1 }} className="floating-shape w-36 h-48 rounded-[28px] top-[40%] left-[2%] hidden lg:block bg-white/50 border border-gray-100 absolute z-0" />
                <motion.div style={{ y: y7 }} className="floating-shape w-12 h-12 rounded-full bottom-[10%] left-[45%] hidden md:block bg-blue-50/30 border border-blue-50 absolute z-0" />
                <motion.div style={{ y: y8, rotate: r2 }} className="floating-shape w-20 h-20 rounded-[12px] top-[20%] right-[35%] hidden lg:block bg-white/40 border border-gray-100 absolute z-0" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-gray-900 leading-tight">Execution Blueprint</h2>
                        <p className="text-xl text-secondary-text max-w-2xl mx-auto font-light">
                            A tested 6-phase framework for reliable enterprise deployments.
                        </p>
                    </motion.div>
                </div>

                {/* Grid Wrapper Container */}
                <div ref={gridWrapRef} className="relative z-20 w-full max-w-[1400px] h-[550px] md:h-[600px] flex items-center justify-center">
                    {steps.map((step, i) => (
                        <div
                            key={step.id}
                            className="process-card absolute shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden"
                            style={{
                                width: "400px",
                                height: "400px",
                                borderRadius: "54px",
                                padding: "40px",
                                background: step.bg,
                                transform: "translateZ(0)",
                                // Higher step ID (index i) = higher z-index (shows on top).
                                // Phase 4 lands on top of 1, etc.
                                zIndex: i + 1,
                            }}
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/60 flex items-center justify-center text-accent shadow-sm backdrop-blur-md border border-white/40">
                                    <step.icon className="w-8 h-8" />
                                </div>
                                <div className="text-8xl font-black text-black/5 select-none leading-none tracking-tighter">
                                    {step.id}
                                </div>
                            </div>
                            <h4 className="text-3xl font-bold mb-4 tracking-tighter text-gray-900">{step.label}</h4>
                            <p className="text-base text-gray-700 leading-relaxed font-normal opacity-90">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="md:hidden flex flex-col gap-6 px-6 pb-20 mt-12 w-full">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="relative flex flex-col items-start border border-black/5 p-8"
                            style={{
                                borderRadius: "32px",
                                background: step.bg,
                            }}
                        >
                            <div className="text-4xl font-black text-black/5 absolute top-6 right-6 select-none">
                                {step.id}
                            </div>
                            <div className="w-12 h-12 mb-6 rounded-xl bg-white/50 flex items-center justify-center text-accent shadow-sm backdrop-blur-sm">
                                <step.icon className="w-5 h-5" />
                            </div>
                            <h4 className="text-xl font-bold mb-3 tracking-tight text-gray-900">{step.label}</h4>
                            <p className="text-sm text-gray-700 leading-relaxed font-light">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <CustomerReviews />
        </>
    );
}
