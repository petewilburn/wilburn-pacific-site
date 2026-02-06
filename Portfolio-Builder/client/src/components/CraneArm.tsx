import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Added "export default" explicitly to fix the Import error
export default function CraneArm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Crane mechanics
  const boomRotation = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const cableExtension = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 50]);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.4,
      transition: {
        pathLength: { delay: i * 0.5, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.5, duration: 0.01 }
      }
    })
  };

  return (
    <div ref={containerRef} className="absolute right-0 top-20 w-[600px] h-[600px] pointer-events-none z-0 hidden xl:block">
      <motion.svg
        viewBox="0 0 500 500"
        className="w-full h-full stroke-slate-500 fill-none stroke-[1]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.path d="M 50 450 L 50 150 L 100 150 L 100 450 Z" variants={draw} custom={0} />
        <motion.path d="M 50 450 L 100 400 M 50 350 L 100 300 M 50 250 L 100 200" variants={draw} custom={1} />

        <motion.g style={{ rotate: boomRotation, transformOrigin: "75px 160px" }}>
          <motion.path d="M 75 160 L 350 160 L 350 130 L 75 130" variants={draw} custom={2} />
          <motion.path d="M 100 250 L 200 160" variants={draw} custom={3} />
          
          {/* FIX: Moved 'y2' out of style={} and used attrX/attrY for SVG motion values */}
          <motion.line
            x1="340" y1="160"
            x2="340" 
            // Framer Motion handles SVG attributes directly as props
            y2={cableExtension} 
            className="stroke-yellow-500 stroke-[2]"
          />
          <motion.path
            d="M 330 250 Q 340 270 350 250" 
            style={{ translateY: cableExtension }} 
            className="stroke-yellow-500" 
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}