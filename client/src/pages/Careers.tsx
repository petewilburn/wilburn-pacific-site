import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Careers() {
  return (
    <div className="pt-20 min-h-screen bg-background blueprint-grid">
      <section className="bg-card border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">Join the Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Build your career solving complex engineering challenges in heavy industry.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Open Role 1 */}
            <div className="bg-card border border-white/10 p-6 rounded-sm hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-mono font-bold text-white mb-2">Field Service Technician</h3>
              <p className="text-sm text-primary font-bold uppercase mb-4">Walla Walla, WA (On-Site)</p>
              <p className="text-muted-foreground mb-6">
                Seeking experienced technicians for crane troubleshooting, VFD programming, and mechanical repairs.
              </p>
              <Link href="/contact">
                <button className="text-sm font-bold text-white flex items-center hover:text-primary transition-colors">
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Open Role 2 */}
            <div className="bg-card border border-white/10 p-6 rounded-sm hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-mono font-bold text-white mb-2">Structural Welder</h3>
              <p className="text-sm text-primary font-bold uppercase mb-4">Project Based</p>
              <p className="text-muted-foreground mb-6">
                AWS D1.1 certified welders needed for runway reinforcement and custom fabrication projects.
              </p>
              <Link href="/contact">
                <button className="text-sm font-bold text-white flex items-center hover:text-primary transition-colors">
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* General Application */}
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-sm">
              <h3 className="text-lg font-mono font-bold text-white mb-2">Future Openings</h3>
              <p className="text-muted-foreground mb-6">
                Don't see your role? We are always looking for talented engineers and fabricators.
              </p>
              <a href="mailto:careers@wilburnpacific.com" className="text-sm font-bold text-primary flex items-center hover:text-white transition-colors">
                <Mail className="mr-2 w-4 h-4" /> Email Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}