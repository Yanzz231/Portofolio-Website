import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { memo, useMemo } from "react";

const ParallaxBackground = memo(() => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 100,
    mass: 0.5
  });

  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  const backgroundStyles = useMemo(() => ({
    sky: {
      backgroundImage: "url(/assets/images/backgrounds/sky.jpg)",
      backgroundPosition: "bottom",
      backgroundSize: "cover",
    },
    mountain3: {
      backgroundImage: "url(/assets/images/backgrounds/mountain-3.png)",
      backgroundPosition: "bottom",
      backgroundSize: "cover",
    },
    planets: {
      backgroundImage: "url(/assets/images/backgrounds/planets.png)",
      backgroundPosition: "bottom",
      backgroundSize: "cover",
    },
    mountain2: {
      backgroundImage: "url(/assets/images/backgrounds/mountain-2.png)",
      backgroundPosition: "bottom",
      backgroundSize: "cover",
    },
    mountain1: {
      backgroundImage: "url(/assets/images/backgrounds/mountain-1.png)",
      backgroundPosition: "bottom",
      backgroundSize: "cover",
    }
  }), []);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Background Sky */}
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={backgroundStyles.sky}
        />
        {/* Mountain Layer 3 */}
        <motion.div
          className="absolute inset-0 -z-40 will-change-transform"
          style={{
            ...backgroundStyles.mountain3,
            y: mountain3Y,
          }}
        />
        {/* Planets */}
        <motion.div
          className="absolute inset-0 -z-30 will-change-transform"
          style={{
            ...backgroundStyles.planets,
            x: planetsX,
          }}
        />
        {/* Mountain Layer 2 */}
        <motion.div
          className="absolute inset-0 -z-20 will-change-transform"
          style={{
            ...backgroundStyles.mountain2,
            y: mountain2Y,
          }}
        />
        {/* Mountaine Layer 1 */}
        <motion.div
          className="absolute inset-0 -z-10 will-change-transform"
          style={{
            ...backgroundStyles.mountain1,
            y: mountain1Y,
          }}
        />
      </div>
    </section>
  );
});

ParallaxBackground.displayName = 'ParallaxBackground';

export default ParallaxBackground;
