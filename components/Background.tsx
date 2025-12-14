import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  // Generate random stars for the background
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#020024] via-[#090979] to-[#00d4ff]/10">
      {/* Deep Space Overlay */}
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      
      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Decorative Nebula/Gas clouds (CSS Gradients) */}
      <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-purple-900/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-blue-900/20 blur-[100px] rounded-full" />

      {/* Background Ship Silhouette (Placeholder) */}
      <div className="absolute bottom-10 right-10 w-64 h-64 opacity-20 pointer-events-none">
         <div className="w-full h-full border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center text-gray-500 text-xs text-center p-2">
            Изображение: Стилизованный космический корабль (фоновый)
         </div>
      </div>
    </div>
  );
};

export default Background;