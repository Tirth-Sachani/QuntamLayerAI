import { Metadata } from "next";
import { Shield, Code2, Rocket, Globe } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
    title: "About Us | QuntamLayerAI",
    description: "About our engineering team and vision.",
};

const principles = [
    { icon: Shield, title: "Uncompromising Security", desc: "Security is embedded into every line of code, not bolted on as an afterthought. We build bank-grade infrastructure." },
    { icon: Code2, title: "Engineering Excellence", desc: "We favor robust, tested, and high-performance architectural designs over temporary trendy solutions." },
    { icon: Rocket, title: "Performance First", desc: "Sub-millisecond latency and high concurrency are the baseline requirements for our deliverables." },
    { icon: Globe, title: "Global Scale", desc: "Our systems are designed from day one to operate across multiple regions with zero data loss or downtime." }
];

export default function AboutPage() {
    return (
        <div className="pt-20">
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="absolute inset-0 hero-grid opacity-60" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-foreground">
                            Enterprise <span className="text-gradient">Architects</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary-text font-light leading-relaxed">
                            We are a team of senior distributed systems engineers building the foundations of the next generation of digital enterprise.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Core Engineering Principles</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {principles.map((p, i) => (
                            <Card key={i} className="p-10 border-border-light bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8">
                                    <p.icon className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 tracking-tight">{p.title}</h3>
                                <p className="text-secondary-text leading-relaxed font-light">{p.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
