import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideState } from './types';
import { GAME_LEVELS } from './constants';
import Background from './components/Background';
import Slide1Title from './components/Slide1_Title';
import Slide2Instruction from './components/Slide2_Instruction';
import Slide3Game from './components/Slide3_Game';
import Slide4Success from './components/Slide4_Success';
import Slide5Fail from './components/Slide5_Fail';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<SlideState>(SlideState.TITLE);
  const [levelIndex, setLevelIndex] = useState<number>(0);

  const goToSlide = (slide: SlideState) => {
    setCurrentSlide(slide);
  };

  const handleStartGame = () => {
    setLevelIndex(0); // Reset to first level on full start
    goToSlide(SlideState.INSTRUCTION);
  };

  const handleStartMission = () => {
    goToSlide(SlideState.GAME);
  };

  const handleWin = () => {
    goToSlide(SlideState.SUCCESS);
  };

  const handleLose = () => {
    goToSlide(SlideState.FAIL);
  };

  // Called from Success screen to go to next level
  const handleNextLevel = () => {
    const nextLevelIndex = (levelIndex + 1) % GAME_LEVELS.length;
    setLevelIndex(nextLevelIndex);
    goToSlide(SlideState.GAME);
  };

  // Called from Fail screen to retry current level
  const handleRetry = () => {
    goToSlide(SlideState.GAME);
  };

  const currentLevelConfig = GAME_LEVELS[levelIndex];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Shared Background */}
      <Background />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {currentSlide === SlideState.TITLE && (
          <motion.div
            key="title"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Slide1Title onStart={handleStartGame} />
          </motion.div>
        )}

        {currentSlide === SlideState.INSTRUCTION && (
          <motion.div
            key="instruction"
            className="absolute inset-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Slide2Instruction onNext={handleStartMission} />
          </motion.div>
        )}

        {currentSlide === SlideState.GAME && (
          <motion.div
            key={`game-${levelIndex}`} // Key change triggers remount/animation
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Slide3Game 
              levelConfig={currentLevelConfig} 
              onWin={handleWin} 
              onLose={handleLose} 
            />
          </motion.div>
        )}

        {currentSlide === SlideState.SUCCESS && (
          <motion.div
            key="success"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Slide4Success onRestart={handleNextLevel} />
          </motion.div>
        )}

        {currentSlide === SlideState.FAIL && (
          <motion.div
            key="fail"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Slide5Fail onRetry={handleRetry} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;