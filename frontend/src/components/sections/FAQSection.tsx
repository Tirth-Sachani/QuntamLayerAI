"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "How do your tech stacks support long-term scalability?",
        a: "We use battle-tested, horizontally scalable architectures: Next.js for the frontend, Node.js/Express for backend services, MongoDB Atlas for data, and AWS/Vercel for infrastructure. Each layer can scale independently based on demand.",
    },
    {
        q: "What is your approach to reliability & uptime?",
        a: "Our infrastructure targets 99.99% uptime with multi-region deployment, automated failover, comprehensive health monitoring, and zero-downtime deployment pipelines.",
    },
    {
        q: "How do you ensure data security and compliance?",
        a: "We follow SOC2 Type II standards, implement end-to-end encryption at rest and in transit, apply OWASP security best practices, and conduct regular penetration testing.",
    },
    {
        q: "What does the typical engagement process look like?",
        a: "We follow a structured 6-phase framework: Discovery, Architecture Design, Development (agile sprints), Security Audit, Deployment, and ongoing Performance Optimization.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-4 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="border border-white/10 rounded-xl overflow-hidden bg-black/30"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-sm md:text-base pr-4">{faq.q}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-white/50 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-6 pb-6 text-sm text-white/50 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
