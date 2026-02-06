import { motion } from "framer-motion";
import { type Project } from "@shared/schema";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "wouter";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-card border border-white/10 overflow-hidden hover:border-primary/50 transition-colors"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center relative blueprint-grid">
             {/* Abstract industrial pattern */}
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-400 via-slate-900 to-black"></div>
             <span className="font-mono text-muted-foreground text-xs uppercase tracking-widest z-10">Project Image Placeholder</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-primary text-xs font-mono uppercase tracking-wider">
            <MapPin className="w-3 h-3 mr-1" />
            {project.location}
          </div>
          <div className="bg-background/80 backdrop-blur px-2 py-1 rounded text-xs font-mono border border-white/10">
            ID: {project.id.toString().padStart(3, '0')}
          </div>
        </div>

        <h3 className="text-xl font-bold font-mono text-white mb-2 leading-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-4 transition-all duration-300">
           <p className="text-sm text-gray-300 line-clamp-2 mb-4">{project.challenge}</p>
           <Link href={`/projects`}>
             <button className="flex items-center text-xs font-mono font-bold text-white hover:text-primary transition-colors uppercase tracking-widest">
               View Case Study <ArrowUpRight className="ml-1 w-3 h-3" />
             </button>
           </Link>
        </div>
      </div>
    </motion.div>
  );
}
