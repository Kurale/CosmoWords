import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../constants';
import { Rocket } from 'lucide-react';

interface Props {
  onRestart: () => void;
}

const Slide4Success: React.FC<Props> = ({ onRestart }) => {
  return (
    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-4">
      
      {/* Planet Reveal */}
      <div className="relative w-64 h-64 md:w-96 md:h-96 mb-8">
        {/* Silhouette (initial) -> fades out */}
        <motion.div 
           initial={{ opacity: 1 }}
           animate={{ opacity: 0 }}
           transition={{ duration: 2, delay: 0.5 }}
           className="absolute inset-0 bg-black rounded-full shadow-[0_0_50px_rgba(0,0,0,1)] z-20 border-4 border-gray-800"
        />
        
        {/* Revealed Planet */}
        <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ 
                opacity: { duration: 2, delay: 0.5 },
                scale: { duration: 2, delay: 0.5 },
                rotate: { duration: 60, repeat: Infinity, ease: "linear" } 
            }}
            className="w-full h-full rounded-full overflow-hidden shadow-[0_0_60px_rgba(50,255,100,0.6)] relative z-10 bg-emerald-900"
        >
             {/* Planet Texture Placeholder */}
             <div className="w-full h-full bg-gradient-to-br from-green-400 via-teal-600 to-blue-800 relative">
                {/* Continents / Clouds */}
                <div className="absolute top-4 left-10 w-20 h-10 bg-white/30 blur-xl rounded-full" />
                <div className="absolute bottom-12 right-12 w-32 h-20 bg-green-300/40 blur-lg rounded-full" />
                <div className="absolute top-1/2 left-1/2 w-full h-8 bg-white/10 -rotate-12 blur-md" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <span className="text-xs text-white border border-dashed border-white p-2">Текстура Планеты</span>
                </div>
             </div>
        </motion.div>

        {/* Rings */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.4 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute inset-0 rounded-full border-[20px] border-purple-500/30 rotate-[75deg] scale-y-25 pointer-events-none"
        />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <h2 className="font-space text-3xl md:text-5xl text-yellow-300 mb-4 drop-shadow-lg">
          МОЛОДЕЦ! <br/> НОВАЯ ПЛАНЕТА ОТКРЫТА!
        </h2>
        <h3 className="text-xl md:text-3xl text-white mb-8">
          ЕЁ ИМЯ — <span className="text-cyan-400 font-bold">ПЛАНЕТА УМНИКОВ!</span>
        </h3>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playSound('click');
            onRestart();
          }}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2 mx-auto"
        >
           <Rocket className="w-6 h-6" />
           ИССЛЕДОВАТЬ СЛЕДУЮЩЕЕ СОЗВЕЗДИЕ!
        </motion.button>
      </motion.div>

    </div>
  );
};

export default Slide4Success;