import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound, ROCKET_DURATION } from '../constants';
import { Rocket, Star as StarIcon } from 'lucide-react';
import { LevelConfig } from '../types';

interface Props {
  levelConfig: LevelConfig;
  onWin: () => void;
  onLose: () => void;
}

const Slide3Game: React.FC<Props> = ({ levelConfig, onWin, onLose }) => {
  const [activeStarIndex, setActiveStarIndex] = useState<number>(0);
  const [wordVisible, setWordVisible] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const { stars, theme } = levelConfig;

  // Reset state when level changes
  useEffect(() => {
    setActiveStarIndex(0);
    setWordVisible(false);
    setGameEnded(false);
  }, [levelConfig]);

  // Handle clicked on a star
  const handleStarClick = (index: number) => {
    if (gameEnded) return;

    if (index === activeStarIndex && !wordVisible) {
      // Correct star clicked
      playSound('success');
      setWordVisible(true);
    } else if (index < activeStarIndex) {
        // Already activated
    } else {
       // Wrong star
       playSound('fail');
    }
  };

  // Handle background click to dismiss word and advance
  const handleNextStep = () => {
    if (wordVisible && !gameEnded) {
      playSound('click');
      setWordVisible(false);
      
      const nextIndex = activeStarIndex + 1;
      
      if (nextIndex >= stars.length) {
        setGameEnded(true);
        onWin();
      } else {
        setActiveStarIndex(nextIndex);
      }
    }
  };

  return (
    <div className="relative z-10 h-full w-full overflow-hidden select-none">
      
      {/* Background Click Handler for 'Next' action when word is visible */}
      {wordVisible && (
        <div 
          className="absolute inset-0 z-40 bg-black/10 cursor-pointer"
          onClick={handleNextStep}
        />
      )}

      {/* Level Title Overlay (Fades out) */}
      <motion.div 
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -50 }}
        transition={{ duration: 2, delay: 1 }}
        className={`absolute top-4 w-full text-center pointer-events-none z-0 ${theme.primary} font-space text-2xl opacity-50`}
      >
        УРОВЕНЬ {levelConfig.id}: {levelConfig.name.toUpperCase()}
      </motion.div>

      {/* Constellation SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {stars.map((star, i) => {
          if (i === stars.length - 1) return null;
          const nextStar = stars[i + 1];
          const isLineActive = i < activeStarIndex;
          
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${star.x}%`}
              y1={`${star.y}%`}
              x2={`${nextStar.x}%`}
              y2={`${nextStar.y}%`}
              stroke={isLineActive ? theme.line : "#4b5563"} 
              strokeWidth={isLineActive ? 4 : 2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
              className={isLineActive ? `drop-shadow-[0_0_8px_${theme.line}]` : ""}
            />
          );
        })}
      </svg>

      {/* Stars */}
      {stars.map((star, index) => {
        const isActive = index === activeStarIndex;
        const isCompleted = index < activeStarIndex;
        const isLocked = index > activeStarIndex;

        return (
          <div
            key={star.id}
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            onClick={() => handleStarClick(index)}
          >
            <motion.div
              animate={{
                scale: isActive && wordVisible ? 1.5 : isCompleted ? 1 : 0.8,
                opacity: isLocked ? 0.5 : 1,
              }}
              whileHover={{ scale: isLocked ? 0.8 : 1.2 }}
            >
              {/* Star Visual */}
              <div 
                className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 
                  ${isCompleted 
                    ? `${theme.starCompleted} shadow-[0_0_20px_rgba(255,255,255,0.8)]` 
                    : isActive 
                      ? `${theme.starActive} animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.8)]` 
                      : 'bg-gray-600'
                  }`}
              >
                <StarIcon className={`w-8 h-8 ${isCompleted ? 'text-white' : 'text-gray-300'}`} fill={isCompleted ? "currentColor" : "none"} />
              </div>

              {/* Word Popup */}
              <AnimatePresence>
                {isActive && wordVisible && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: 0 }}
                    animate={{ scale: 1, opacity: 1, y: -70 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none"
                  >
                    <div className={`bg-black/80 border-2 ${theme.primary} border-current ${theme.primary} font-space text-4xl px-6 py-2 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)]`}>
                      {star.word}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        );
      })}

      {/* Rocket Timer */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <motion.div
          // Reset animation when level ID changes by using the key
          key={levelConfig.id} 
          initial={{ x: "-5vw", y: "105vh", rotate: 45 }}
          animate={{ x: "105vw", y: "-5vh" }}
          transition={{ 
            duration: ROCKET_DURATION, 
            ease: "linear",
          }}
          onAnimationComplete={() => {
            if (!gameEnded) {
              setGameEnded(true);
              onLose();
            }
          }}
          className="absolute w-24 h-24"
        >
          {/* Rocket Graphic Placeholder */}
          <div className="relative w-full h-full">
             <div className="absolute inset-0 bg-transparent flex items-center justify-center transform -rotate-45">
                <Rocket className="w-16 h-16 text-white fill-gray-200 drop-shadow-lg" />
             </div>
             {/* Engine trail */}
             <div className={`absolute bottom-0 left-0 w-8 h-8 ${theme.rocketTrail} rounded-full blur-md animate-ping`} />
          </div>
        </motion.div>
      </div>

      {/* Instruction hint if waiting for user */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-white/50 text-sm bg-black/30 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
            {wordVisible ? "Нажми в любом месте, чтобы продолжить..." : "Нажми на следующую звезду!"}
        </p>
      </div>
    </div>
  );
};

export default Slide3Game;