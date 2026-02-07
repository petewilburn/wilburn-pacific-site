import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

// Updated Data with 'slug' for navigation anchors
const services = [
  {
    id: 1,
    slug: "engineering", // Matches "Structural Engineering"
    title: "Crane Design & Engineering",
    description: "Custom design of CMAA-compliant bridge cranes, gantries, and monorails. PE-stamped drawings and FEA analysis included.",
    icon: "crane",
    category: "Design",
    features: ["CMAA Compliant", "PE-Stamped Drawings", "FEA Analysis"]
  },
  {
    id: 2,
    slug: "automation", // Matches "Crane Modernization" & "Automation"
    title: "Controls & Automation",
    description: "Modernizing aging cranes with Variable Frequency Drives (VFDs), anti-sway technology, and wireless telemetry.",
    icon: "cpu",
    category: "Modernization",
    features: ["VFD Installation", "Anti-Sway Tech", "Wireless Telemetry"]
  },
  {
    id: 3,
    slug: "fabrication",
    title: "Structural Fabrication",
    description: "Precision fabrication of runway beams and box girders. AWS D1.1 certified welding and NDT testing.",
    icon: "hammer",
    category: "Fabrication",
    features: ["AWS D1.1 Certified", "Precision Manufacturing", "NDT Testing"]
  },
  {
    id: 4,
    slug: "rigging", // Matches "Rigging Consulting"
    title: "Rigging & Field Services",
    description: "Installation of overhead systems, load testing (up to 125%), and runway alignment using laser surveys.",
    icon: "truck",
    category: "Installation",
    features: ["Load Testing", "Laser Alignment", "Turnkey Installation"]
  },
  {
    id: 5,
    slug: "maintenance",
    title: "Maintenance & Inspections",
    description: "OSHA 1910.179 periodic inspections and preventative maintenance programs to minimize downtime.",
    icon: "clipboard",
    category: "Maintenance",
    features: ["OSHA Compliant", "Periodic Inspections", "Preventative Programs"]
  },
  {
    id: 6,
    slug: "support",
    title: "Emergency Repair",
    description: "24/7 breakdown support for critical production cranes. Structural and electrical troubleshooting.",
    icon: "alert",
    category: "Support",
    features: ["24/7 Support", "Structural Repair", "Electrical Troubleshooting"]
  }
];

export default function Services() {
  return (
    <div className="pt-20 min-h-screen bg-background blueprint-grid">
      {/* Header */}
      <section className="bg-card border-b border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">Engineering Capabilities</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              From modernization of legacy cranes to ground-up design of custom lifting devices, we deliver solutions engineered for performance and safety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
               // WRAPPER DIV: This holds the ID and the scroll margin
               <div key={service.id} id={service.slug} className="scroll-mt-32">
                  <ServiceCard service={service} index={index} />
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-card border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-mono font-bold text-white mb-4">Our Engineering Process</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { step: "01", title: "Assessment", desc: "On-site evaluation and structural analysis" },
               { step: "02", title: "Design", desc: "PE-stamped engineered drawings and calculations" },
               { step: "03", title: "Fabrication", desc: "Precision manufacturing to tight tolerances" },
               { step: "04", title: "Installation", desc: "Turnkey installation and load testing" },
             ].map((item, i) => (
               <div key={i} className="relative p-6 border border-white/5 bg-background/50 hover:border-primary/50 transition-colors group">
                 <div className="text-6xl font-mono font-bold text-white/5 group-hover:text-primary/10 absolute top-2 right-2 transition-colors">
                   {item.step}
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3 pt-4">{item.title}</h3>
                 <p className="text-muted-foreground text-sm">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Resources CTA */}
      <section className="py-20 bg-primary/10 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-mono font-bold text-white mb-4">Technical Resources</h2>
          <p className="text-muted-foreground mb-8">Download our capabilities statement and certification documents.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center bg-card border border-white/10 hover:border-primary text-white py-3 px-6 rounded-sm font-mono text-sm uppercase transition-colors">
              <FileText className="w-4 h-4 mr-2 text-primary" /> Capabilities Statement
            </button>
            <button className="flex items-center justify-center bg-card border border-white/10 hover:border-primary text-white py-3 px-6 rounded-sm font-mono text-sm uppercase transition-colors">
              <Download className="w-4 h-4 mr-2 text-primary" /> ISO Certifications
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}