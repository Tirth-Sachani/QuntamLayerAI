import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t border-border-light bg-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center space-x-3 mb-6">
                            <div className="relative w-8 h-8 rounded-lg bg-black flex items-center justify-center shadow-sm overflow-hidden border border-white/10">
                                <Image
                                    src="/favicon.ico"
                                    alt="Logo"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-foreground">QuntamLayerAI</span>
                        </Link>
                        <p className="text-sm text-secondary-text leading-relaxed">
                            Building the next generation of digital infrastructure for global enterprises. Scalable, secure, and performant.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Solutions</h4>
                        <ul className="space-y-4 text-sm text-secondary-text">
                            <li><Link href="/services" className="hover:text-black transition-colors">AI Engineering</Link></li>
                            <li><Link href="/services" className="hover:text-black transition-colors">Enterprise Cloud</Link></li>
                            <li><Link href="/services" className="hover:text-black transition-colors">DevSecOps</Link></li>
                            <li><Link href="/services" className="hover:text-black transition-colors">API Systems</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-secondary-text">
                            <li><Link href="#" className="hover:text-black transition-colors">Technical Docs</Link></li>
                            <li><Link href="/portfolio" className="hover:text-black transition-colors">Case Studies</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">White Papers</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Open Source</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Secure Architecture Partners</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-xs font-mono text-secondary-text">AWS</div>
                            <div className="h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-xs font-mono text-secondary-text">MongoDB</div>
                            <div className="h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-xs font-mono text-secondary-text">Vercel</div>
                            <div className="h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-xs font-mono text-secondary-text">Cloudflare</div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-secondary-text">
                    <p>© {new Date().getFullYear()} QuntamLayerAI. All systems operational.</p>
                    <div className="flex space-x-8">
                        <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-black transition-colors">Security Terms</Link>
                        <Link href="#" className="hover:text-black transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
