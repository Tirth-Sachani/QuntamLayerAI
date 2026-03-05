import { PageTransition } from "@/components/animations/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
    return <PageTransition>{children}</PageTransition>;
}
