import { motion } from "framer-motion";

// --- STATIC PROJECT DATA ---
const projects = [
  {
    id: 1,
    title: "Riverport Crane Retrofit",
    location: "Riverport Industrial Park, WA",
    imageUrl: "https://placehold.co/800x600/1e293b/fbbf24?text=Riverport+Retrofit",
    challenge: "An aging 50-ton bridge crane suffered from fatigue cracks and obsolete relay logic controls, causing frequent downtime.",
    solution: "Conducted FEA to identify stress concentrations. Installed cover plates to reinforce the girder and replaced controls with a Magnetek VFD system.",
    outcome: "Zero safety incidents; improved positioning accuracy by 200%; extended crane life by 15 years.",
    metrics: { "Capacity": "50 Ton", "Span": "85 ft", "Downtime": "-95%" }
  },
  {
    id: 2,
    title: "Mill #4 Custom Gantry",
    location: "Inland Paper Mill, OR",
    imageUrl: "https://placehold.co/800x600/1e293b/38bdf8?text=Mill+%234+Gantry",
    challenge: "Client needed to lift 20-ton rolls in a facility with only 18 feet of headroom.",
    solution: "Designed a custom low-profile double-girder gantry with a nested hoist trolley to maximize hook height.",
    outcome: "Achieved required lift height with 6 inches of clearance; reduced load cycle time by 40%.",
    metrics: { "Capacity": "20 Ton", "Clearance": "6 in", "Cycle Time": "-40%" }
  },
  {
    id: 3,
    title: "Marine Jib Installation",
    location: "Port of Tacoma, WA",
    imageUrl: "https://placehold.co/800x600/1e293b/94a3b8?text=Marine+Jib",
    challenge: "Required a heavy-lift dockside jib crane capable of withstanding corrosive marine environments.",
    solution: "Engineered a custom jib with galvanized structural members, sealed bearings, and wireless telemetry for safe operation.",
    outcome: "Successfully commissioned with 125% load test certification.",
    metrics: { "Capacity": "10 Ton", "Reach": "40 ft", "Coating": "C5-M" }
  }
];

export default function Projects() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="bg-card border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 text-primary font-mono text-sm uppercase tracking-widest mb-2">
              <span className="w-2 h-2 bg-primary block" />
              <span>Portfolio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-white mb-6">Featured Case Studies</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Real-world applications of our engineering expertise. From complex modernizations to critical repairs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
              <div key={project.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 border-b border-white/10 pb-16 last:border-0">
                {/* Image Side */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                   <div className="aspect-[4/3] bg-muted relative rounded-sm overflow-hidden group tech-border">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                   </div>
                </div>

                {/* Content Side */}
                <div className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="font-mono text-secondary text-sm mb-2">{project.location}</div>
                  <h2 className="text-3xl font-mono font-bold text-white mb-6">{project.title}</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-primary font-mono text-xs uppercase tracking-widest mb-2">The Challenge</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-primary font-mono text-xs uppercase tracking-widest mb-2">The Solution</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-primary font-mono text-xs uppercase tracking-widest mb-2">Outcome</h4>
                      <p className="text-white text-sm leading-relaxed border-l-2 border-primary pl-4">{project.outcome}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="bg-white/5 p-3 rounded-sm border border-white/5">
                          <div className="text-xs text-muted-foreground uppercase mb-1">{key}</div>
                          <div className="text-lg font-mono font-bold text-white">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}