import { useRef, memo } from "react";
import { certifications } from "../constants";
import { motion, useInView, useScroll, useTransform, useSpring } from "motion/react";

const cardVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 100,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

const childVariants = {
  initial: {
    y: 30,
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

const CertificationItem = memo(({ cert, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="certItem" ref={ref}>
      <motion.div
        variants={cardVariants}
        animate={isInView ? "animate" : "initial"}
        className="certCard"
      >
        {cert.achievement && (
          <div className="certBadge">
            <span className={`certBadgeText ${cert.achievement.includes('1st') || cert.achievement === 'Winner'
              ? 'bg-gradient-to-r from-orange to-coral'
              : cert.achievement.includes('2nd')
                ? 'bg-gradient-to-r from-sand to-orange'
                : cert.achievement.includes('3rd')
                  ? 'bg-gradient-to-r from-aqua to-mint'
                  : 'bg-gradient-to-r from-lavender to-royal'
              }`}>
              {cert.achievement}
            </span>
          </div>
        )}

        <motion.div variants={childVariants} className="certLogoWrapper">
          {cert.logo ? (
            <img src={cert.logo} alt={cert.title} className="certLogo" loading="lazy" />
          ) : (
            <span className="certEmoji">{cert.achievement?.includes('1st') || cert.achievement === 'Winner' ? '🏆' : '🎖️'}</span>
          )}
        </motion.div>

        <div className="certContent">
          <motion.div variants={childVariants} className="certDate">
            {cert.date}
          </motion.div>

          <motion.h2 variants={childVariants} className="certTitle">
            {cert.title}
          </motion.h2>

          <motion.p variants={childVariants} className="certOrganizer">
            {cert.organizer}
          </motion.p>

          {cert.description && (
            <motion.p variants={childVariants} className="certDesc">
              {cert.description}
            </motion.p>
          )}

          {cert.skills && cert.skills.length > 0 && (
            <motion.div variants={childVariants} className="certTags">
              {cert.skills.map((skill, idx) => (
                <span key={idx} className="certTag">
                  {skill}
                </span>
              ))}
            </motion.div>
          )}

          <motion.div variants={childVariants} className="certButtons">
            {cert.projectUrl && cert.projectUrl.trim() !== "" && cert.projectUrl !== "#" && (
              <a href={cert.projectUrl} target="_blank" rel="noopener noreferrer">
                <button className="certBtnPrimary">
                  <span>View Project</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </a>
            )}

            {cert.articleUrl && cert.articleUrl.trim() !== "" && cert.articleUrl !== "#" && (
              <a href={cert.articleUrl} target="_blank" rel="noopener noreferrer">
                <button className="certBtnSecondary">
                  <span>Read Article</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

CertificationItem.displayName = 'CertificationItem';

const Certifications = memo(() => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const xTranslate = useTransform(scrollYProgress, (latest) => {
    const certIndex = Math.min(
      Math.floor(latest * certifications.length),
      certifications.length - 1
    );

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    return -viewportWidth * certIndex;
  });

  const smoothX = useSpring(xTranslate, {
    stiffness: 150,
    damping: 35,
    mass: 0.5
  });

  return (
    <div className="certifications" ref={ref}>
      <motion.div className="certList" style={{ x: smoothX }}>
        {certifications.map((cert, index) => (
          <CertificationItem cert={cert} index={index} key={index} />
        ))}
      </motion.div>

      <section />
      <section />
    </div>
  );
});

Certifications.displayName = 'Certifications';

export default Certifications;
