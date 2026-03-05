import { Metadata } from "next";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";

export const metadata: Metadata = {
    title: "Case Studies | EnterpriseDev",
    description: "Enterprise engineering portfolios and success stories.",
};

export default function PortfolioPage() {
    return (
        <div className="pt-20">
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="absolute inset-0 hero-grid opacity-60" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-foreground">
                            Proven <span className="text-gradient">Systems</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary-text font-light leading-relaxed">
                            We engineer mission-critical systems for industry leaders. Explore our architectures and performance metrics.
                        </p>
                    </div>
                </div>
            </section>

            <CaseStudiesSection />
        </div>
    );
}
