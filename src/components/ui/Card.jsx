import { motion } from "motion/react";
import { memo } from "react";

const dragTransition = {
  bounceStiffness: 300,
  bounceDamping: 20,
  power: 0.2,
  timeConstant: 200
};

const Card = memo(({ style, text, image, icon: Icon, containerRef }) => {
  if (Icon) {
    return (
      <motion.div
        className="absolute cursor-grab will-change-transform"
        style={style}
        whileHover={{ scale: 1.1 }}
        drag
        dragConstraints={containerRef}
        dragElastic={0.8}
        dragTransition={dragTransition}
        dragMomentum={false}
      >
        <div className="pointer-events-none">
          <Icon width={60} height={60} />
        </div>
      </motion.div>
    );
  }

  if (image && !text) {
    return (
      <motion.img
        className="absolute w-15 cursor-grab will-change-transform"
        src={image}
        style={style}
        whileHover={{ scale: 1.05 }}
        drag
        dragConstraints={containerRef}
        dragElastic={0.8}
        dragTransition={dragTransition}
        dragMomentum={false}
        loading="lazy"
      />
    );
  }

  return (
    <motion.div
      className="absolute px-6 py-4 text-xl text-center whitespace-nowrap rounded-full ring ring-gray-700 font-extralight bg-storm cursor-grab will-change-transform"
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.8}
      dragTransition={dragTransition}
      dragMomentum={false}
    >
      {text}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;
