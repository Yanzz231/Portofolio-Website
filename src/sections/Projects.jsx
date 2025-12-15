import { useRef, memo, useState, useEffect } from "react";
import { myProjects } from "../constants";
import { motion, useInView, useScroll, useTransform, useSpring } from "motion/react";

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
    scale: 0.8,
    rotate: -10,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
      duration: 0.8,
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const ProjectItem = memo(({ project, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div
      className="min-h-screen md:h-screen w-full md:w-screen md:min-w-screen md:max-w-screen overflow-hidden flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[clamp(40px,6vw,100px)] py-10 md:py-0 px-[5%] md:pl-[0%] md:pr-[5%] md:shrink-0 box-border md:snap-start md:snap-always "
      ref={ref}
    >
      {/* Image Container */}
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="group w-[90%] md:w-[45%] max-w-[500px] md:max-w-[650px] rounded-3xl overflow-hidden relative shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]  hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.2),0_0_120px_rgba(92,51,204,0.4)]"
      >
        <img
          src={project.images[0]}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(92,51,204,0.3)] via-transparent to-[rgba(202,47,140,0.3)] z-[1] pointer-events-none opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      </motion.div>

      {/* Text Container */}
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="w-[90%] md:w-[45%] max-w-[500px] md:max-w-[550px] flex flex-col gap-6 md:gap-8 shrink-0"
      >
        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <motion.div variants={childVariants} className="flex gap-2 flex-wrap mb-2 md:mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-4 py-1.5 rounded-[20px] bg-[rgba(92,51,204,0.15)] border border-[rgba(92,51,204,0.3)] text-xs font-semibold text-lavender backdrop-blur-[10px] transition-all duration-300 hover:bg-[rgba(92,51,204,0.25)] hover:border-[rgba(92,51,204,0.5)] hover:-translate-y-0.5"
              >
                {tag.name}
              </span>
            ))}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          variants={childVariants}
          className="text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,7vw,80px)] font-black leading-tight bg-gradient-to-br from-white to-lavender bg-clip-text text-transparent tracking-tight"
        >
          {project.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={childVariants}
          className="font-light text-[clamp(13px,1.5vw,18px)] md:text-[clamp(14px,1.5vw,18px)] leading-relaxed text-white/80"
        >
          {project.description}
        </motion.p>

        {/* Button */}
        {project.href && project.href.trim() !== "" && (
          <motion.div variants={childVariants} className="flex gap-4 mt-4 md:mt-6">
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              <button className="group/btn relative overflow-hidden bg-gradient-to-br from-[#5c33cc] to-[#ca2f8c] px-6 md:px-8 py-3 md:py-3.5 rounded-xl border-none font-semibold text-sm md:text-base cursor-pointer text-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_10px_30px_rgba(92,51,204,0.3),0_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-center min-h-[44px] md:min-h-[48px] hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(92,51,204,0.5),0_0_0_1px_rgba(255,255,255,0.2)] active:translate-y-0 before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#7a57db] before:to-[#ea4884] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
                <span className="relative z-[1]">View Project</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-2 relative z-[1]">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
});

ProjectItem.displayName = 'ProjectItem';

const Projects = memo(() => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const xTranslate = useTransform(scrollYProgress, (latest) => {
    const projectIndex = Math.min(
      Math.floor(latest * myProjects.length),
      myProjects.length - 1
    );

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    return -viewportWidth * projectIndex;
  });

  const smoothX = useSpring(xTranslate, {
    stiffness: 150,
    damping: 35,
    mass: 0.5
  });

  // Mobile: Simple vertical scroll (NO SNAP, cards stack)
  if (isMobile) {
    return (
      <div className="w-full ">
        {myProjects.map((project, index) => (
          <ProjectItem project={project} index={index} key={project.id} />
        ))}
      </div>
    );
  }

  // Desktop: Horizontal transform with snap
  return (
    <div className="h-[400vh] relative will-change-transform" ref={ref}>
      <motion.div
        className="sticky top-0 flex h-screen  w-max will-change-transform overflow-hidden"
        style={{ x: smoothX }}
      >
        {myProjects.map((project, index) => (
          <ProjectItem project={project} index={index} key={project.id} />
        ))}
      </motion.div>

      <section />
      <section />
      <section />
      <section />
    </div>
  );
});

Projects.displayName = 'Projects';

export default Projects;
