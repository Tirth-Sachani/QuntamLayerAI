import { Metadata } from "next";
import { ProcessSection } from "@/components/sections/ProcessSection";

export const metadata: Metadata = {
    title: "Execution Process | EnterpriseDev",
    description: "Our enterprise execution blueprint and engineering methodology.",
};

export default function ProcessPage() {
    return (
        <div className="pt-20">
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="absolute inset-0 hero-grid opacity-60" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-foreground">
                            Execution <span className="text-gradient">Blueprint</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary-text font-light leading-relaxed">
                            A tested 6-phase framework for reliable enterprise deployments. From strategic discovery to zero-downtime scaling.
                        </p>
                    </div>
                </div>
            </section>

            <ProcessSection />
        </div>
    );
}
