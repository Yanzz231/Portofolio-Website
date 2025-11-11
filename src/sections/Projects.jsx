import { useState, memo, useCallback, useMemo } from "react";
import { Project } from "../components/ui";
import { myProjects } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";

const Projects = memo(() => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 100, mass: 0.5 });
  const springY = useSpring(y, { damping: 15, stiffness: 100, mass: 0.5 });

  const handleMouseMove = useCallback((e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  }, [x, y]);

  const [preview, setPreview] = useState(null);

  const projectsList = useMemo(() =>
    myProjects.map((project) => (
      <Project key={project.id} {...project} setPreview={setPreview} />
    )),
    [setPreview]
  );

  return (
    <section
      onMouseMove={preview ? handleMouseMove : undefined}
      className="relative c-space section-spacing"
    >
      <h2 className="text-heading">My Selected Projects</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {projectsList}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
          loading="lazy"
        />
      )}
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
