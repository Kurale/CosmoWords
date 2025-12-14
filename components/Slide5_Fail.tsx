import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../constants';
import { RotateCcw } from 'lucide-react';

interface Props {
  onRetry: () => void;
}

const Slide5Fail: React.FC<Props> = ({ onRetry }) => {
  return (
    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6 bg-blue-950/80 backdrop-blur-sm">
      
      {/* Alien Character Placeholder */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-48 h-48 mb-8 border-4 border-dashed border-blue-400 bg-blue-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden"
      >
         <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-200">
            <span className="text-4xl mb-2">👾</span>
            <span className="text-xs text-center p-2">Дружелюбный инопланетянин</span>
         </div>
         {/* Blink effect */}
         <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-ping" />
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-black/50 border border-blue-500 rounded-xl p-6 md:p-10 max-w-2xl text-center shadow-2xl"
      >
        <h2 className="font-space text-2xl md:text-3xl text-blue-300 mb-4">
          Ракета ушла на дозаправку!
        </h2>
        <p className="text-lg text-white mb-8">
          Твоя миссия почти удалась! Соберись, и в следующий раз звёзды точно покорятся тебе!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playSound('click');
            onRetry();
          }}
          className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-full shadow-lg flex items-center justify-center gap-3 mx-auto text-xl"
        >
          <RotateCcw className="w-6 h-6" />
          ПОВТОРИТЬ СВЯЗЬ
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Slide5Fail;