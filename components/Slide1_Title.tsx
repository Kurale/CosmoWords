import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../constants';
import { Rocket, Star } from 'lucide-react';

interface Props {
  onStart: () => void;
}

const Slide1Title: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-4 text-center">
      
      {/* Comet Animation */}
      <motion.div 
        className="absolute top-10 left-[-100px]"
        animate={{ x: "120vw", y: "40vh" }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
      >
        <div className="w-32 h-2 bg-gradient-to-r from-transparent to-white opacity-50 rotate-12 blur-sm" />
        <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_10px_rgba(255,255,255,0.8)] absolute right-0 top-[-4px]" />
      </motion.div>

      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="font-space text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] mb-8"
      >
        ЗВЁЗДНЫЙ ПУТЬ <br /> ЧИТАТЕЛЯ!
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-2xl text-blue-100 mb-12 max-w-2xl font-bold"
      >
        Зажги все звёзды в созвездии, пока ракета не улетела!
      </motion.p>

      {/* Start Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playSound('click');
          onStart();
        }}
        className="group relative w-48 h-48 rounded-full border-4 border-cyan-500 bg-black/50 flex flex-col items-center justify-center overflow-hidden hover:bg-cyan-900/30 transition-colors shadow-[0_0_30px_rgba(6,182,212,0.6)]"
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-spin-slow" />
        <Rocket className="w-12 h-12 text-cyan-400 mb-2 group-hover:text-white transition-colors" />
        <span className="font-space text-2xl text-white">СТАРТ!</span>
      </motion.button>
    </div>
  );
};

export default Slide1Title;