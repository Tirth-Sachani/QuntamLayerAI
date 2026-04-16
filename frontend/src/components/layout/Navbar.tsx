"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Button } from "../ui/Button";
import Image from "next/image";

export function Navbar() {
    const scrollDirection = useScrollDirection();
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    // Desktop: 50% width by default, 70% on hover.
    // Mobile: fixed 90% width or similar based on Tailwind breakpoints
    const navbarWidth = isHovered ? "70%" : "50%";

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Process", href: "/process" },
        { name: "About", href: "/about" },
    ];

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
                    width: isMounted && window.innerWidth >= 768 ? navbarWidth : "90%",
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
                    <div className="relative w-8 h-8 rounded-full bg-black flex items-center justify-center shadow-sm overflow-hidden border border-white/10">
                        <Image 
                            src="/next.svg" 
                            alt="Logo" 
                            width={32} 
                            height={32} 
                            className="object-contain"
                        />
                    </div>
                    <span className="font-bold text-lg hidden lg:inline-block tracking-tight text-foreground">
                        QuntamLayerAI
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6 lg:space-x-10 shrink-0">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-black hover:text-black/70 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile & Desktop CTA */}
                <div className="flex items-center space-x-3 shrink-0">
                    <Link href="/contact" className="hidden sm:block">
                        <Button className="rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] text-sm px-5 h-10">
                            Get a Quote
                        </Button>
                    </Link>
                    
                    {/* Hamburger Menu Icon */}
                    <button
                        className="md:hidden p-2 text-black hover:bg-black/5 rounded-full transition-colors pointer-events-auto"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] pointer-events-auto"
                        />
                        
                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[70] pointer-events-auto shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <span className="font-bold text-xl tracking-tight text-black">Menu</span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
                                    aria-label="Close Menu"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col p-6 space-y-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-lg font-medium text-black hover:text-black/60 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="pt-6 border-t border-gray-100">
                                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full rounded-xl py-6 text-base font-semibold">
                                            Get a Quote
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-auto p-6 text-center text-sm text-gray-500">
                                © 2026 QuntamLayerAI
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
