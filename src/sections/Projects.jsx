import { useEffect, useRef, useState, memo } from "react";
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
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={project.images[0]} alt={project.title} loading="lazy" />
        <div className="pImg-overlay" />
      </motion.div>

      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        {project.tags && project.tags.length > 0 && (
          <motion.div variants={childVariants} className="flex gap-2 flex-wrap mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag.id} className="project-tag">
                {tag.name}
              </span>
            ))}
          </motion.div>
        )}

        <motion.h1 variants={childVariants}>{project.title}</motion.h1>
        <motion.p variants={childVariants}>{project.description}</motion.p>

        <motion.div variants={childVariants} className="flex gap-4 mt-6">
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            <button className="project-btn-primary">
              <span>View Project</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-2">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
});

ProjectItem.displayName = 'ProjectItem';

const Projects = memo(() => {
  const ref = useRef(null);
  const containerRef = useRef(null);

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

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList " style={{ x: smoothX }}>
        {myProjects.map((project, index) => (
          <ProjectItem project={project} index={index} key={project.id} />
        ))}
      </motion.div>

      <section />
      <section />
    </div>
  );
});

Projects.displayName = 'Projects';

export default Projects;
