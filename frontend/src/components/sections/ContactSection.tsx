"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Shield, Lock, ArrowRight } from "lucide-react";

export function ContactSection() {
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 5000], [0, -300]);
    const y2 = useTransform(scrollY, [0, 5000], [0, -600]);
    const y3 = useTransform(scrollY, [0, 5000], [0, -250]);
    const y4 = useTransform(scrollY, [0, 5000], [0, -450]);
    const y5 = useTransform(scrollY, [0, 5000], [0, -200]);
    const y6 = useTransform(scrollY, [0, 5000], [0, -700]);
    const y7 = useTransform(scrollY, [0, 5000], [0, -350]);
    const y8 = useTransform(scrollY, [0, 5000], [0, -500]);

    const r1 = useTransform(scrollY, [0, 5000], [0, 45]);
    const r2 = useTransform(scrollY, [0, 5000], [0, -30]);

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        project_type: "",
        budget: "",
        message: "",
        nda: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        console.log("Submitting form data:", formData);
        try {
            const res = await fetch("http://localhost:5000/api/v1/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("Server response:", data);

            if (res.ok) {
                setSubmitted(true);
            } else {
                setError(data.message || "Submission failed on server");
                console.error("Form submission error:", data);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Could not connect to the server. Please ensure the backend is running.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto">
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-50 flex items-center justify-center">
                            <Shield className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight mb-4">Proposal Received</h3>
                        <p className="text-secondary-text text-lg font-light">
                            An enterprise architect will reach out within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-32 relative bg-white overflow-hidden">
            {/* 8 Floating UI Shapes (Parallax) */}
            <motion.div style={{ y: y1, rotate: r1 }} className="floating-shape w-48 h-48 rounded-[32px] top-[10%] right-[10%] hidden md:block bg-white/60 border border-gray-100" />
            <motion.div style={{ y: y2 }} className="floating-shape w-64 h-32 rounded-[24px] bottom-[15%] left-[5%] hidden md:block bg-white/80 border border-gray-100" />
            <motion.div style={{ y: y3 }} className="floating-shape w-24 h-24 rounded-full bottom-[40%] right-[5%] hidden md:block bg-blue-50/20 border border-blue-50" />
            <motion.div style={{ y: y4, rotate: r2 }} className="floating-shape w-32 h-32 rounded-[20px] top-[25%] left-[2%] hidden lg:block bg-white/70 border border-gray-50" />
            <motion.div style={{ y: y5 }} className="floating-shape w-16 h-16 rounded-full top-[15%] left-[45%] hidden lg:block bg-white/90 border border-gray-100" />
            <motion.div style={{ y: y6, rotate: r1 }} className="floating-shape w-36 h-48 rounded-[30px] top-[50%] left-[8%] hidden lg:block bg-white/50 border border-gray-100" />
            <motion.div style={{ y: y7 }} className="floating-shape w-12 h-12 rounded-full bottom-[20%] right-[45%] hidden md:block bg-blue-50/30 border border-blue-50" />
            <motion.div style={{ y: y8, rotate: r2 }} className="floating-shape w-20 h-20 rounded-[12px] bottom-[10%] left-[30%] hidden lg:block bg-white/40 border border-gray-100" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-8">
                            Engineer Your{" "}
                            <span className="text-gradient">Next Breakthrough</span>
                        </h2>
                        <p className="text-xl text-secondary-text mb-12 max-w-md font-light leading-relaxed">
                            Scale your enterprise with precision. We specialize in high-performance computing for mission-critical applications.
                        </p>

                        <div className="p-8 rounded-[24px] bg-background border border-border-light relative z-20 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-xl mb-6 tracking-tight">Enterprise Standard</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <Shield className="w-6 h-6 text-accent shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Bank-Grade Security</h4>
                                        <p className="text-sm text-secondary-text font-light">SOC2 compliant architecture and data encryption at rest/transit.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Lock className="w-6 h-6 text-accent shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Strict Confidentiality</h4>
                                        <p className="text-sm text-secondary-text font-light">All projects are protected by comprehensive NDAs before discussion.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                        <div className="rounded-[32px] border border-border-light bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-10 md:p-12 relative z-20">
                            <h3 className="text-2xl font-bold mb-8 tracking-tight">Initialize Project</h3>
                            <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">FULL NAME</label>
                                        <Input
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            suppressHydrationWarning
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">COMPANY</label>
                                        <Input
                                            placeholder="Acme Corp"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            required
                                            suppressHydrationWarning
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">WORK EMAIL</label>
                                        <Input
                                            type="email"
                                            placeholder="john@acmecorp.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            suppressHydrationWarning
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">PROJECT BUDGET</label>
                                        <select
                                            className="flex h-12 w-full rounded-full border border-border-light bg-white px-4 py-2 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 appearance-none cursor-pointer"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            required
                                            suppressHydrationWarning
                                        >
                                            <option value="" disabled>Select Budget Range</option>
                                            <option value="Under $50k">Under $50k</option>
                                            <option value="$50k - $100k">$50k - $100k</option>
                                            <option value="$100k - $250k">$100k - $250k</option>
                                            <option value="Above $250k">Above $250k</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-3">EXPECTED TIMELINE</label>
                                    <div className="flex flex-wrap gap-3">
                                        {["Under 1 Month", "1-3 Months", "3-6 Months", "Over 6 Months"].map((timeline) => (
                                            <button
                                                type="button"
                                                key={timeline}
                                                onClick={() => setFormData({ ...formData, project_type: timeline })}
                                                className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${formData.project_type === timeline
                                                    ? "bg-foreground text-white border-foreground shadow-md"
                                                    : "bg-white text-secondary-text border-border-light hover:border-gray-300 hover:bg-gray-50 bg-opacity-50"
                                                    }`}
                                                suppressHydrationWarning
                                            >
                                                {timeline}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">PROJECT BRIEF</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Describe your technical requirements..."
                                        className="flex w-full rounded-2xl border border-border-light bg-white px-4 py-3 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 resize-none placeholder:text-secondary-text"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        suppressHydrationWarning
                                    />
                                </div>
                                <div className="flex items-center gap-3 py-2">
                                    <button
                                        type="button"
                                        role="checkbox"
                                        aria-checked={formData.nda}
                                        onClick={() => setFormData({ ...formData, nda: !formData.nda })}
                                        className={`w-5 h-5 rounded flex items-center justify-center transition-all ${formData.nda ? "bg-accent border-accent text-white" : "bg-white border border-border-light hover:border-gray-400"
                                            }`}
                                        suppressHydrationWarning
                                    >
                                        {formData.nda && < Shield className="w-3.5 h-3.5 stroke-[3]" />}
                                    </button>
                                    <label className="text-sm text-secondary-text font-medium cursor-pointer select-none" onClick={() => setFormData({ ...formData, nda: !formData.nda })}>
                                        I require a Non-Disclosure Agreement (NDA) before discussing details.
                                    </label>
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    isLoading={isSubmitting}
                                    className="w-full h-14 text-base"
                                >
                                    Submit Proposal <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                {error && (
                                    <p className="text-red-500 text-sm text-center font-medium mt-2">
                                        {error}
                                    </p>
                                )}
                                <p className="text-center text-xs text-secondary-text flex items-center justify-center gap-1.5 font-medium pt-2">
                                    <Lock className="w-3.5 h-3.5" /> SECURE 256-BIT SSL ENCRYPTED
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
