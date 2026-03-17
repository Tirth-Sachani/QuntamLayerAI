"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Button } from "../ui/Button";

export function Navbar() {
    const scrollDirection = useScrollDirection();
    const [isHovered, setIsHovered] = useState(false);

    // Desktop: 50% width by default, 70% on hover.
    // Mobile: fixed 90% width or similar based on Tailwind breakpoints
    const navbarWidth = isHovered ? "70%" : "50%";

    return (
        <div className="fixed top-0 left-0 right-0 flex justify-center z-50 pointer-events-none pt-6">
            <motion.nav
                className="pointer-events-auto flex items-center justify-between px-6 h-16 w-[90%] md:w-[50%]"
                style={{
                    borderRadius: "40px",
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: isHovered
                        ? "0 10px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)"
                        : "0 4px 20px rgba(0, 0, 0, 0.05)",
                }}
                animate={{
                    width: typeof window !== "undefined" && window.innerWidth >= 768 ? navbarWidth : "90%",
                    y: scrollDirection === "down" ? "-120%" : "0%",
                    opacity: scrollDirection === "down" ? 0 : 1,
                }}
                transition={{
                    width: { duration: 0.3, ease: "easeInOut" },
                    y: { duration: scrollDirection === "down" ? 0.4 : 0.35, ease: "easeInOut" },
                    opacity: { duration: scrollDirection === "down" ? 0.4 : 0.35, ease: "easeInOut" },
                    boxShadow: { duration: 0.3 },
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href="/" className="flex items-center space-x-3 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center font-bold text-white shadow-sm">
                        E
                    </div>
                    <span className="font-bold text-lg hidden lg:inline-block tracking-tight text-foreground">
                        EnterpriseDev
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 lg:space-x-10 shrink-0">
                    <Link href="/services" className="text-sm font-medium text-black hover:text-black/70 transition-colors">Services</Link>
                    <Link href="/portfolio" className="text-sm font-medium text-black hover:text-black/70 transition-colors">Portfolio</Link>
                    <Link href="/process" className="text-sm font-medium text-black hover:text-black/70 transition-colors">Process</Link>
                    <Link href="/about" className="text-sm font-medium text-black hover:text-black/70 transition-colors">About</Link>
                </div>

                {/* Mobile & Desktop CTA */}
                <div className="flex items-center shrink-0">
                    <Link href="/contact">
                        <Button className="rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] text-sm px-5 h-10">
                            Get a Quote
                        </Button>
                    </Link>
                </div>
            </motion.nav>
        </div>
    );
}
