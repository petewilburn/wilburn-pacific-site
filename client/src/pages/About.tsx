import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-background blueprint-grid">
      <section className="bg-card border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">About Wilburn Pacific</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Engineering-led crane modernization and structural solutions for the Pacific Northwest.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                <strong className="text-white">Wilburn Pacific</strong> was founded on a simple principle: 
                Heavy industry deserves better engineering. While others focus on swapping parts, we focus on 
                solving the root cause of mechanical fatigue and structural inefficiency.
              </p>
              <p>
                Based in Walla Walla, WA, we serve mills, foundries, and manufacturing plants across the region. 
                Our team combines mechanical, structural and controls engineering with practical, boots-on-the-ground rigging 
                and fabrication expertise.
              </p>
              <p>                We don't just fix cranes; we modernize them to meet 21st-century safety and production standards.
              </p>
            </div>

            <div className="bg-card/50 border border-white/10 p-8 rounded-sm">
              <h3 className="text-xl font-mono font-bold text-white mb-6">Our Qualifications</h3>
              <ul className="space-y-4">
                {[
                  "Licensed Professional Engineers (PE)",
                  "AWS D1.1 Certified Welders",
                  "CMAA Specification Compliance",
                  "Licensed Electrical Administrators",
                  "24/7 Emergency Response Capability"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}