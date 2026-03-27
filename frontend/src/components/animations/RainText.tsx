"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface RainTextProps {
    text: string;
    className?: string;
    delay?: number;
    onComplete?: () => void;
}

/**
 * RainText Component - Letter-by-letter monsoon fall effect.
 * Fixed: Repaint bug on background-clip: text (gradients) and hydration stability.
 * Enhanced: Mounting logic for sequential Phase 1 -> Phase 2.
 */
export function RainText({ text, className = "", delay = 0, onComplete }: RainTextProps) {
    const containerRef = useRef<HTMLSpanElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isHydrated, setIsHydrated] = useState(false);

    // Split into words while preserving spaces
    const words = text.split(" ");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsHydrated(true);
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll(".rain-char");

        // Initial hidden state
        gsap.set(chars, {
            opacity: 0,
            y: -100,
            rotateX: -45,
            filter: "blur(10px)",
            force3D: true
        });

        const startAnimation = () => {
            if (!containerRef.current) return;
            const currentChars = containerRef.current.querySelectorAll(".rain-char");
            if (currentChars.length === 0) return;

            const tl = gsap.timeline({
                delay: delay,
                onComplete: () => {
                    // THE FIX: "Visibility Kick" + clearProps
                    gsap.set(currentChars, {
                        clearProps: "all",
                        opacity: 1,
                        filter: "none",
                        transform: "translateZ(0.1px)",
                    });

                    requestAnimationFrame(() => {
                        gsap.set(currentChars, { transform: "none" });
                    });

                    if (onComplete) onComplete();
                },
                defaults: { force3D: true }
            });

            tl.to(currentChars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: "blur(0px)",
                duration: 0.7,
                stagger: 0.03,
                ease: "bounce.out",
                onStart: () => {
                    gsap.set(currentChars, { willChange: "transform, opacity, filter" });
                }
            });

            tl.to(currentChars, {
                scale: 1.1,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                stagger: 0.03,
                ease: "power1.out"
            }, "-=0.4");
        };

        // Always use a small timeout to ensure DOM is ready after React mount
        // This is safer than document.readyState for components that mount late (Phase 2)
        const timer = setTimeout(startAnimation, 50);
        return () => clearTimeout(timer);
    }, [delay, text, onComplete]);

    return (
        <span ref={containerRef} className={`flex flex-wrap justify-center items-center w-full relative ${className}`}>
            {words.map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block whitespace-nowrap mx-[0.14em] py-1">
                    {word.split("").map((char, charIdx) => (
                        <span
                            key={charIdx}
                            className="rain-char inline-block"
                            style={{
                                opacity: 0, // Hidden until GSAP takes over
                                backfaceVisibility: "hidden",
                                transformStyle: "preserve-3d"
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </span>
            ))}
        </span>
    );
}
