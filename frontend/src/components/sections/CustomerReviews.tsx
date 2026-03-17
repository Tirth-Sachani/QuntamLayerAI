"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ReviewCard, Review } from "./ReviewCard";
import reviewsData from "@/data/reviews.json";

export function CustomerReviews() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const oddReviews = reviewsData.filter((_, i) => i % 2 === 0);
    const evenReviews = reviewsData.filter((_, i) => i % 2 !== 0);

    // To create an infinite loop using Framer Motion y translation, we repeat the arrays 3 times.
    const leftColumn = [...oddReviews, ...oddReviews, ...oddReviews];
    const rightColumn = [...evenReviews, ...evenReviews, ...evenReviews];
    const mobileColumn = [...reviewsData, ...reviewsData, ...reviewsData];

    return (
        <section className="relative w-full h-[100vh] min-h-[700px] bg-[#0F172A] overflow-hidden flex items-center justify-center snap-center shrink-0">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[40%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[90px]" />
            </div>

            <div className="container relative z-10 mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between h-full gap-12 lg:gap-24">

                {/* Text Content */}
                <div className="flex-1 text-white z-20 md:pr-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                            Trusted by <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Industry Leaders</span>
                        </h2>
                        <p className="text-xl text-white/70 font-light max-w-xl leading-relaxed">
                            See how our enterprise-grade architecture and execution framework are transforming businesses worldwide.
                        </p>
                    </motion.div>
                </div>

                {/* Scrolling Columns Container */}
                <div
                    className="flex-1 flex justify-center lg:justify-end h-[150%] md:h-[180%] relative w-full pt-12 md:pt-0 -mx-8 px-8 sm:-mx-16 sm:px-16"
                    style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
                >
                    <div className="flex gap-4 lg:gap-6 w-full max-w-[700px] justify-center lg:justify-end min-w-max">
                        {/* Left Column (Odds) - Desktop Only */}
                        <div className="relative w-[280px] lg:w-[320px] shrink-0 h-full hidden md:block mt-24">
                            <motion.div
                                className="absolute top-0 flex flex-col gap-6 w-full"
                                animate={{ y: ["0%", "-33.33%"] }}
                                transition={{
                                    y: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 35,
                                        ease: "linear",
                                    },
                                }}
                            >
                                {leftColumn.map((review, i) => (
                                    <ReviewCard
                                        key={`left-${i}`}
                                        review={review as Review}
                                        isHovered={hoveredId === review.id}
                                        hasHoveredSibling={hoveredId !== null}
                                        onHoverStart={() => setHoveredId(review.id)}
                                        onHoverEnd={() => setHoveredId(null)}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* Right Column (Evens) - Desktop Only */}
                        <div className="relative w-[280px] lg:w-[320px] shrink-0 h-full hidden md:block">
                            <motion.div
                                className="absolute top-0 flex flex-col gap-6 w-full"
                                animate={{ y: ["-16.66%", "-50.00%"] }} // Offset start nicely to interleave them
                                transition={{
                                    y: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 45, // Slightly different speed for visual variance
                                        ease: "linear",
                                    },
                                }}
                            >
                                {rightColumn.map((review, i) => (
                                    <ReviewCard
                                        key={`right-${i}`}
                                        review={review as Review}
                                        isHovered={hoveredId === review.id}
                                        hasHoveredSibling={hoveredId !== null}
                                        onHoverStart={() => setHoveredId(review.id)}
                                        onHoverEnd={() => setHoveredId(null)}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        {/* Mobile Column - Single Column */}
                        <div className="relative w-full max-w-[320px] shrink-0 h-full md:hidden mt-12">
                            <motion.div
                                className="absolute top-0 flex flex-col gap-6 w-full"
                                animate={{ y: ["0%", "-33.33%"] }}
                                transition={{
                                    y: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 40,
                                        ease: "linear",
                                    },
                                }}
                            >
                                {mobileColumn.map((review, i) => (
                                    <ReviewCard
                                        key={`mobile-${i}`}
                                        review={review as Review}
                                        isHovered={hoveredId === review.id}
                                        hasHoveredSibling={hoveredId !== null}
                                        onHoverStart={() => setHoveredId(review.id)}
                                        onHoverEnd={() => setHoveredId(null)}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
