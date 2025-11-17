import { memo } from "react";
import { motion } from "motion/react";
import { FlipWords } from "../animation";

const HeroText = memo(() => {
  const words = ["Secure", "Modern", "Scalable"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="font-medium"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi I'm Andrian
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="font-medium text-neutral-300"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            A Developer <br /> Dedicated to Crafting
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 5rem)' }}
            />
          </motion.div>
          <motion.p
            className="font-medium text-neutral-300"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Web Solutions
          </motion.p>
        </div>
      </div>
      {/* Mobile View */}
      <div className="flex- flex-col space-y-6 md:hidden">
        <motion.p
          className="font-medium"
          style={{ fontSize: 'clamp(1.75rem, 7vw, 2.5rem)' }}
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I'm Andrian
        </motion.p>
        <div>
          <motion.p
            className="font-black text-neutral-300"
            style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-white"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)' }}
            />
          </motion.div>
          <motion.p
            className="font-black text-neutral300"
            style={{ fontSize: 'clamp(1.75rem, 7vw, 2.5rem)' }}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Web Applications
          </motion.p>
        </div>
      </div>
    </div>
  );
});

HeroText.displayName = 'HeroText';

export default HeroText;
