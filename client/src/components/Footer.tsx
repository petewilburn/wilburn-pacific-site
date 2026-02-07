import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Footer() {
  const [location, setLocation] = useLocation();

  // Handler for Service Section (Anchors)
  const handleServiceClick = (slug: string) => {
    if (location === "/services") {
      const element = document.getElementById(slug);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      setLocation(`/services#${slug}`);
    }
  };

  // --- NEW: Handler for Main Pages (About, Careers, etc.) ---
  const handlePageClick = (path: string) => {
    if (location === path) {
      // If already on the page, smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If navigating, ScrollToTop.tsx will handle the smooth scroll
      setLocation(path);
    }
  };

  return (
    <footer className="bg-card border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6 group cursor-pointer">
              <img src="/logo.svg" alt="Wilburn Pacific" className="h-6 w-6 object-contain" />
              <span className="font-mono font-bold text-lg text-white">WILBURN PACIFIC</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Precision engineering solutions for complex lifting and structural challenges. 
              Reliability built on decades of technical expertise.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded bg-white/5 hover:bg-primary hover:text-background transition-colors flex items-center justify-center cursor-pointer">
                <span className="font-mono font-bold text-xs">LI</span>
              </div>
              <div className="w-8 h-8 rounded bg-white/5 hover:bg-primary hover:text-background transition-colors flex items-center justify-center cursor-pointer">
                <span className="font-mono font-bold text-xs">IG</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono font-bold text-white mb-6 uppercase text-sm tracking-wider">Services</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <button onClick={() => handleServiceClick("automation")} className="hover:text-primary transition-colors flex items-center group text-left">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Crane Modernization
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick("engineering")} className="hover:text-primary transition-colors flex items-center group text-left">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Structural Engineering
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick("automation")} className="hover:text-primary transition-colors flex items-center group text-left">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Automation Controls
                </button>
              </li>
              <li>
                <button onClick={() => handleServiceClick("rigging")} className="hover:text-primary transition-colors flex items-center group text-left">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" /> Rigging Consulting
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-bold text-white mb-6 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {/* --- UPDATED LINKS TO USE CLICK HANDLER --- */}
              <li>
                <button onClick={() => handlePageClick("/projects")} className="hover:text-primary transition-colors text-left">
                  Projects
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick("/about")} className="hover:text-primary transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick("/careers")} className="hover:text-primary transition-colors text-left">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick("/contact")} className="hover:text-primary transition-colors text-left">
                  Contact
                </button>
              </li>
              {/* ------------------------------------------ */}
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-bold text-white mb-6 uppercase text-sm tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 shrink-0" />
                <span>Walla Walla, WA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground font-mono">
          <p>© {new Date().getFullYear()} Wilburn Pacific Company. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}