import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CraneArm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  // Animate the rotation of the jib (lifting)
  const rotation = useTransform(scrollYProgress, [0, 1], [-15, 10]);
  // Animate the extension of the trolley/hook (moving along the arm)
  const trolleyX = useTransform(scrollYProgress, [0, 1], [40, 160]);
  // Animate the cable length (dropping down)
  const cableLength = useTransform(scrollYProgress, [0.2, 0.8], [20, 120]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-30"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full text-blue-500/40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Main Tower / Mast */}
        <line x1="30" y1="180" x2="30" y2="40" />
        <line x1="25" y1="180" x2="35" y2="180" />
        {/* Lattice structure on mast */}
        {[60, 80, 100, 120, 140, 160].map((y) => (
          <path key={y} d={`M25 ${y} L35 ${y-10} M35 ${y} L25 ${y-10}`} strokeWidth="0.2" />
        ))}

        {/* Pivot Point and Jib */}
        <motion.g style={{ rotate: rotation, originX: "30px", originY: "40px" }}>
          {/* Main Jib Beam */}
          <line x1="30" y1="40" x2="180" y2="40" />
          <line x1="30" y1="35" x2="180" y2="35" />
          
          {/* Lattice for Jib */}
          {[50, 70, 90, 110, 130, 150, 170].map((x) => (
            <path key={x} d={`M${x} 35 L${x+10} 40 M${x} 40 L${x+10} 35`} strokeWidth="0.2" />
          ))}

          {/* Trolley */}
          <motion.g style={{ x: trolleyX }}>
            <rect x="-5" y="38" width="10" height="4" fill="currentColor" />
            {/* Cable */}
            <motion.line 
              x1="0" 
              y1="42" 
              x2="0" 
              style={{ y2: cableLength }} 
              strokeDasharray="2,2"
            />
            {/* Hook */}
            <motion.path 
              style={{ y: cableLength }}
              d="M-3 0 L3 0 M0 0 L0 5 A3 3 0 1 1 -3 2" 
              transform="translate(0, 0)"
            />
          </motion.g>

          {/* Counterweight Jib (shorter back part) */}
          <line x1="30" y1="40" x2="0" y2="40" />
          <rect x="5" y="40" width="10" height="15" fill="currentColor" />
        </motion.g>

        {/* Guy wires / Support cables */}
        <line x1="30" y1="20" x2="30" y2="40" strokeWidth="1" />
        <line x1="30" y1="20" x2="100" y2="35" strokeWidth="0.2" opacity="0.5" />
      </svg>
    </div>
  );
}
