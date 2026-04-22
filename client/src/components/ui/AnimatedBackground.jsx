import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Animated Mesh Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-400/20 dark:bg-brand-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten opacity-70"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten opacity-70"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten opacity-60"
      />
      
      {/* Subtle Grain Effect Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default AnimatedBackground;
