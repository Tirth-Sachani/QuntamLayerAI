"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Fingerprint } from "lucide-react";

const certifications = [
    { icon: ShieldCheck, label: "ISO 27001" },
    { icon: Lock, label: "GDPR" },
    { icon: Fingerprint, label: "SOC2 Type II" },
];

export function SecuritySection() {
    return (
        <section className="py-24 md:py-32 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Security & Compliance Standards</h2>
                    <p className="text-white/50 max-w-2xl mx-auto">
                        We build on battle-tested security protocols. All data, communications, and infrastructure are secured per industry best practices.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md"
                        >
                            <cert.icon className="w-6 h-6 text-primary-400" />
                            <span className="font-medium text-sm tracking-wide uppercase">{cert.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
