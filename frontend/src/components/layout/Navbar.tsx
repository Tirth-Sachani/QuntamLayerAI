"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Button } from "../ui/Button";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.08)] border-b border-border-light"
                    : "bg-transparent border-transparent"
            )}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center font-bold text-white shadow-sm">
                        E
                    </div>
                    <span className="font-bold text-xl hidden sm:inline-block tracking-tight text-foreground">
                        EnterpriseDev
                    </span>
                </Link>
                <div className="hidden md:flex space-x-10">
                    <Link href="/services" className="text-sm font-medium text-secondary-text hover:text-black transition-colors">Services</Link>
                    <Link href="/portfolio" className="text-sm font-medium text-secondary-text hover:text-black transition-colors">Portfolio</Link>
                    <Link href="/process" className="text-sm font-medium text-secondary-text hover:text-black transition-colors">Process</Link>
                    <Link href="/about" className="text-sm font-medium text-secondary-text hover:text-black transition-colors">About</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/contact">
                        <Button className="shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)]">Get a Quote</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
