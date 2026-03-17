import { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
    title: "Contact | QuntamLayerAI",
    description: "Get in touch for enterprise engineering solutions.",
};

export default function ContactPage() {
    return (
        <div className="pt-20">
            <ContactSection />
        </div>
    );
}
