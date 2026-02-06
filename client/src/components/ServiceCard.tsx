import { motion } from "framer-motion";
import { type Service } from "@shared/schema";
import { Cog, Ruler, Anchor, Zap, Box, Construction } from "lucide-react";

const icons: Record<string, any> = {
  Cog, Ruler, Anchor, Zap, Box, Construction
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = icons[service.icon] || Box;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-card border border-white/5 hover:border-primary/50 p-8 relative overflow-hidden transition-all duration-300 tech-border"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={120} strokeWidth={0.5} />
      </div>

      <div className="relative z-10">
        <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
          <Icon className="w-6 h-6 text-primary group-hover:text-background transition-colors duration-300" />
        </div>

        <h3 className="text-xl font-mono font-bold text-white mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          {service.description}
        </p>

        {service.features && (
          <ul className="space-y-2">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center text-xs text-muted-foreground font-mono">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
