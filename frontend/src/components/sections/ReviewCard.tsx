"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export interface Review {
    id: number;
    name: string;
    company: string;
    rating: number;
    image: string;
    review: string;
}

interface ReviewCardProps {
    review: Review;
    isHovered: boolean;
    hasHoveredSibling: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}

export function ReviewCard({ review, isHovered, hasHoveredSibling, onHoverStart, onHoverEnd }: ReviewCardProps) {
    return (
        <motion.div
            className="relative w-[320px] h-[240px] rounded-[24px] p-6 flex flex-col justify-between cursor-pointer border border-white/20 shrink-0"
            style={{
                background: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
            }}
            animate={{
                opacity: hasHoveredSibling && !isHovered ? 0.2 : 1,
                scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            onClick={() => {
                // Mobile tap behavior
                if (isHovered) {
                    onHoverEnd();
                } else {
                    onHoverStart();
                }
            }}
            layout
        >
            <div className="flex items-center gap-4">
                <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg"
                    loading="lazy"
                />
                <div>
                    <h4 className="text-white font-semibold text-base">{review.name}</h4>
                    <p className="text-white/70 text-sm font-light">{review.company}</p>
                </div>
            </div>

            <div className="flex gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-[14px] h-[14px] ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-white/20 text-white/20"}`}
                    />
                ))}
            </div>

            <p className="mt-4 text-white/90 text-[15px] leading-relaxed line-clamp-3 font-light">
                &quot;{review.review}&quot;
            </p>
        </motion.div>
    );
}
