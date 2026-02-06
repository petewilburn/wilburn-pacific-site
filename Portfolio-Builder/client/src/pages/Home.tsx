import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import CraneArm from "@/components/CraneArm"; // Import the Crane Arm

// --- STATIC DATA (Replaces Database) ---
const services = [
  {
    id: 1,
    title: "Crane Design & Engineering",
    description: "Custom design of CMAA-compliant bridge cranes, gantries, and monorails. PE-stamped drawings and FEA analysis included.",
    icon: "crane"
  },
  {
    id: 2,
    title: "Controls & Automation",
    description: "Modernizing aging cranes with Variable Frequency Drives (VFDs), anti-sway technology, and wireless telemetry.",
    icon: "cpu"
  },
  {
    id: 3,
    title: "Structural Fabrication",
    description: "Precision fabrication of runway beams and box girders. AWS D1.1 certified welding and NDT testing.",
    icon: "hammer"
  }
];

const projects = [
  {
    id: 1,
    title: "Riverport Crane Retrofit",
    category: "Modernization",
    imageUrl: "https://placehold.co/800x600/1e293b/fbbf24?text=Riverport+Retrofit",
    description: "Structural reinforcement and VFD upgrade for a 50-ton bridge crane."
  },
  {
    id: 2,
    title: "Mill #4 Custom Gantry",
    category: "Design & Fab",
    imageUrl: "https://placehold.co/800x600/1e293b/38bdf8?text=Mill+%234+Gantry",
    description: "Low-profile double-girder gantry designed for 18ft headroom."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-background blueprint-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        
        {/* --- THE CRANE ARM COMPONENT --- */}
        <CraneArm /> 

        {/* Background Accent */}
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 px-3 py-1 border border-primary/30 bg-primary/10 rounded-sm"
            >
              <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest">
                Industrial Engineering Excellence
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-mono font-bold text-white mb-6 leading-tight"
            >
              Engineered <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Lifting Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Wilburn Pacific specializes in crane modernization, structural engineering, and automated controls for heavy industry. We solve the problems others walk away from.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <button className="bg-primary hover:bg-primary/90 text-background font-mono font-bold py-4 px-8 rounded-sm uppercase tracking-wide flex items-center justify-center transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  Request Consultation
                </button>
              </Link>
              <Link href="/projects">
                <button className="border border-white/20 hover:border-white text-white font-mono font-bold py-4 px-8 rounded-sm uppercase tracking-wide flex items-center justify-center transition-all bg-white/5 hover:bg-white/10">
                  View Projects <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-auto mb-2" />
          <span className="text-[10px] font-mono uppercase tracking-widest writing-vertical">Scroll</span>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">Core Capabilities</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            <p className="text-muted-foreground max-w-md mt-4 md:mt-0 font-mono text-sm">
              Integrated engineering services designed to extend equipment life and improve safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
               <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "35+", label: "Years Experience" },
              { value: "1.2k", label: "Projects Completed" },
              { value: "100%", label: "Safety Record" },
              { value: "24/7", label: "Support Coverage" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-mono font-bold mb-2">{stat.value}</div>
                <div className="font-mono text-sm uppercase tracking-widest opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-background relative blueprint-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-white">Featured Projects</h2>
            <Link href="/projects">
              <button className="hidden md:flex items-center text-primary font-mono text-sm font-bold uppercase tracking-wider hover:text-white transition-colors">
                View All Case Studies <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
               <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section Remains Unchanged Below... */}
      <section className="py-24 bg-slate-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-mono font-bold text-white mb-6">Precision Engineering. <br/>Uncompromised Safety.</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We understand the critical nature of heavy lifting equipment. Our team brings decades of specialized experience to every project, ensuring your systems are compliant, efficient, and reliable.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Licensed Professional Engineers (PE)",
                  "Custom Fabrication & Installation",
                  "Turnkey Project Management",
                  "OSHA & ASME Compliance Experts"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white font-mono text-sm">
                    <CheckCircle2 className="w-5 h-5 text-secondary mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 border-2 border-dashed border-white/10 rounded-sm translate-x-4 translate-y-4" />
              <div className="relative bg-background p-8 rounded-sm border border-white/10 shadow-2xl">
                 <div className="font-mono text-xs text-primary mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Client Testimonial</div>
                 <p className="text-xl text-white italic mb-6">"Wilburn Pacific's team diagnosed a structural issue our previous consultants missed. Their retrofit solution saved us over $500k in replacement costs."</p>
                 <div className="flex items-center">
                   <div className="w-10 h-10 bg-white/10 rounded-full mr-4 flex items-center justify-center font-bold text-white">MK</div>
                   <div>
                     <div className="text-white font-bold font-mono">Michael Kowalski</div>
                     <div className="text-muted-foreground text-xs">Plant Manager, Titan Steel</div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
