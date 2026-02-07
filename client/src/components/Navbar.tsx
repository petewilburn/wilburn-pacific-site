import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Capabilities" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-12 w-auto flex items-center justify-center">
              <img src="/logo.svg" alt="Wilburn Pacific" className="h-10 w-auto" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-lg leading-none tracking-tighter text-primary">WILBURN</span>
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">PACIFIC</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "font-mono text-sm tracking-wide transition-colors duration-200 uppercase",
                  isActive(link.href) 
                    ? "text-primary border-b-2 border-primary pb-1" 
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
              <button className="bg-primary hover:bg-primary/90 text-background font-mono font-bold py-2 px-6 rounded-sm text-sm uppercase tracking-wide transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                Request Consult
              </button>
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-4 font-mono text-base uppercase border-l-2 transition-all",
                    isActive(link.href)
                      ? "border-primary text-primary bg-white/5"
                      : "border-transparent text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
