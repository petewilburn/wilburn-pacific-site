import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import CraneArm from "@/components/CraneArm"; 

const services = [
  {
    id: 1,
    title: "Crane Design & Engineering",
    category: "Engineering",
    description: "Custom design of CMAA-compliant bridge cranes, gantries, and monorails. PE-stamped drawings and FEA analysis included.",
    features: ["CMAA Compliant", "PE Stamped", "FEA Analysis"],
    icon: "crane"
  },
  {
    id: 2,
    title: "Controls & Automation",
    category: "Modernization",
    description: "Modernizing aging cranes with Variable Frequency Drives (VFDs), anti-sway technology, and wireless telemetry.",
    features: ["VFD Upgrades", "PLC Integration", "Anti-Sway"],
    icon: "cpu"
  },
  {
    id: 3,
    title: "Structural Fabrication",
    category: "Manufacturing",
    description: "Precision fabrication of runway beams and box girders. AWS D1.1 certified welding and NDT testing.",
    features: ["AWS D1.1 Certified", "NDT Testing", "Custom Fab"],
    icon: "hammer"
  }
];

const projects = [
  {
    id: 1,
    title: "Riverport Crane Retrofit",
    location: "Riverport, WA",
    category: "Modernization",
    imageUrl: "/images/crane-retrofit.jpg",
    description: "Structural reinforcement and VFD upgrade for a 50-ton bridge crane.",
    challenge: "Aging 50-ton bridge crane with fatigue cracks.", 
    solution: "Reinforced girder and replaced controls with VFD.",
    outcome: "Extended service life by 15 years.",
    metrics: { "Capacity": "50 Ton" } 
  },
  {
    id: 2,
    title: "Mill #4 Custom Gantry",
    location: "Inland Paper, OR",
    category: "Design & Fab",
    imageUrl: "/images/mill-gantry.jpg",
    description: "Low-profile double-girder gantry designed for 18ft headroom.",
    challenge: "Low headroom clearance (18ft).",
    solution: "Custom double-girder design with nested trolley.",
    outcome: "Maximized hook height.",
    metrics: { "Clearance": "6 in" }
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-background blueprint-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <CraneArm /> 

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            {/* <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4 px-3 py-1 border border-primary/30 bg-primary/10 rounded-sm"
            >
              <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest">
                Industrial Engineering Excellence
              </span>
            </motion.div> */}
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-mono font-bold text-white mb-6 leading-tight">
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
      </section>

      {/* Services Section */}
      <section className="py-24 bg-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">Core Capabilities</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
               <ServiceCard key={service.id} service={service} index={index} />
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

      {/* NEW CALL TO ACTION (CTA) SECTION */}
      <section className="py-24 bg-card border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-6">
            Ready to Modernize Your Operations?
          </h2> */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            From emergency repairs to full-scale crane retrofits, we bring engineering precision to every lift.
          </p>
          <Link href="/contact">
            <button className="bg-primary hover:bg-primary/90 text-background font-mono font-bold py-5 px-10 rounded-sm uppercase tracking-wide transition-all hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              Get a Quote Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}