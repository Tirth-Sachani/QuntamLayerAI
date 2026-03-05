import { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
    title: "Digital Capabilities | EnterpriseDev",
    description: "Explore our comprehensive suite of enterprise engineering services.",
};

export default function ServicesPage() {
    return (
        <div className="pt-20">
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="absolute inset-0 hero-grid opacity-60" />
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-foreground">
                            Services & <span className="text-gradient">Capabilities</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary-text font-light leading-relaxed">
                            We provide end-to-end technical strategy and implementation for complex enterprise workloads. From legacy modernization to cloud-native platforms.
                        </p>
                    </div>
                </div>
            </section>

            <ServicesSection />
        </div>
    );
}
