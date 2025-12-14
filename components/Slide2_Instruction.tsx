import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../constants';
import { CheckCircle, Play } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const Slide2Instruction: React.FC<Props> = ({ onNext }) => {
  const steps = [
    "Нажимай на звёзды в созвездии по порядку.",
    "Читай слово, которое появится на зажжённой звезде.",
    "Следи за ракетой-таймером! Она летит к краю Галактики.",
    "Успей активировать все звёзды до того, как ракета исчезнет!",
    "Успех откроет тебе новую планету!",
  ];

  return (
    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-900/60 border border-cyan-500/50 backdrop-blur-md rounded-xl p-8 max-w-4xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-8"
      >
        
        {/* Text Instructions */}
        <div className="flex-1">
          <h2 className="font-space text-3xl text-cyan-300 mb-6 border-b border-cyan-500/30 pb-2">
            Миссия: Созвездие Словариус
          </h2>
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-3 text-lg md:text-xl text-blue-50"
              >
                <div className="mt-1 min-w-[24px]">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Visual Aid Placeholder */}
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-cyan-500/30 rounded-lg bg-black/20 min-h-[200px] relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                <p className="text-cyan-400/50 text-sm">
                  Анимированная гифка: <br/>Тусклая звезда -> Клик -> Яркая звезда со словом
                </p>
            </div>
            {/* Simple CSS animation to mimic the gif description */}
            <div className="w-16 h-16 rounded-full bg-gray-700 animate-pulse relative z-10">
                 <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] opacity-0 animate-[ping_3s_ease-in-out_infinite]">СЛОВО</div>
            </div>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => {
          playSound('click');
          onNext();
        }}
        className="mt-8 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-12 rounded-full shadow-lg flex items-center gap-3 text-xl transition-transform hover:scale-105"
      >
        <Play fill="currentColor" />
        ПРИНЯТЬ. ВЗЛЕТАЕМ!
      </motion.button>
    </div>
  );
};

export default Slide2Instruction;