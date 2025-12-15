import { useRef, memo, useState, useEffect } from "react";
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

const CertificationItem = memo(({ cert }) => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div
      className="min-h-screen md:h-screen w-full md:w-screen md:min-w-screen md:max-w-screen overflow-hidden flex items-center justify-center gap-[clamp(40px,6vw,100px)] py-10 md:py-0 px-[5%] md:pl-[0%] md:pr-[7%] md:shrink-0 box-border md:snap-start md:snap-always"
      ref={ref}
    >
      <motion.div
        variants={cardVariants}
        animate={isInView ? "animate" : "initial"}
        className="relative w-[90%] max-w-[1000px] bg-gradient-to-br from-[#1f1e39] to-[#161a31] rounded-2xl md:rounded-[20px] p-6 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.08)] transition-all duration-300 border border-white/5 shrink-0 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12)] hover:border-[rgba(122,87,219,0.2)]"
      >
        {/* Achievement Badge */}
        {cert.achievement && (
          <div className="absolute top-3 md:top-5 right-3 md:right-5 z-10">
            <span className={`px-2 md:px-3 lg:px-4 py-1 md:py-1.5 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] uppercase tracking-wide ${cert.achievement.includes('1st') || cert.achievement === 'Winner'
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

        {/* Logo */}
        <motion.div variants={childVariants} className="flex items-center justify-start mb-3 md:mb-4 relative z-[1]">
          {cert.logo ? (
            <img src={cert.logo} alt={cert.title} className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 object-contain transition-transform duration-300 hover:scale-105" loading="lazy" />
          ) : (
            <span className="text-4xl md:text-5xl leading-none">{cert.achievement?.includes('1st') || cert.achievement === 'Winner' ? '🏆' : '🎖️'}</span>
          )}
        </motion.div>

        {/* Content */}
        <div className="flex flex-col gap-2 md:gap-2.5 text-left relative z-[5]">
          {/* Date */}
          <motion.div variants={childVariants} className="text-[9px] md:text-[10px] font-semibold text-lavender uppercase tracking-wide md:tracking-[1.2px]">
            {cert.date}
          </motion.div>

          {/* Title Row with Download Button */}
          <div className="flex items-start justify-between gap-2 md:gap-4 flex-wrap">
            <motion.h2 variants={childVariants} className="text-[clamp(18px,4vw,30px)] md:text-[clamp(20px,4vw,30px)] font-black leading-tight bg-gradient-to-br from-white to-lavender bg-clip-text text-transparent tracking-tight m-0">
              {cert.title}
            </motion.h2>

            {/* Download Certificates Dropdown */}
            {cert.certificates && cert.certificates.length > 0 && (
              <motion.div variants={childVariants} className="shrink-0">
                <div className="group/dropdown relative">
                  <button className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 md:py-2 bg-[rgba(167,139,250,0.12)] border border-[rgba(167,139,250,0.4)] md:border-[1.5px] rounded-md md:rounded-lg text-lavender text-[10px] md:text-xs font-semibold cursor-pointer transition-all duration-300 whitespace-nowrap hover:bg-[rgba(167,139,250,0.2)] hover:border-lavender hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="md:w-5 md:h-5">
                      <path d="M10 13L10 4M10 13L7 10M10 13L13 10M4 16L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Certificates</span>
                  </button>
                  <div className="absolute top-[calc(100%+6px)] md:top-[calc(100%+8px)] right-0 bg-[rgba(31,30,57,0.98)] border border-[rgba(167,139,250,0.3)] rounded-lg md:rounded-[10px] p-1.5 md:p-2 min-w-[200px] md:min-w-[240px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-[10px] opacity-0 invisible -translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0">
                    {cert.certificates.map((certificate, idx) => (
                      <a key={idx} href={certificate.url} download target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center gap-2 md:gap-2.5 px-2 md:px-3 py-2 md:py-2.5 rounded text-white/80 text-xs md:text-[13px] font-medium cursor-pointer transition-all duration-200 hover:bg-[rgba(167,139,250,0.15)] hover:text-white">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-lavender md:w-4 md:h-4">
                            <path d="M8 10L8 3M8 10L6 8M8 10L10 8M3 13L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="truncate">{certificate.name}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Organizer */}
          <motion.p variants={childVariants} className="font-semibold text-[clamp(11px,1.6vw,14px)] md:text-[clamp(12px,1.6vw,14px)] text-white/80 m-0">
            {cert.organizer}
          </motion.p>

          {/* Description */}
          {cert.description && (
            <motion.p variants={childVariants} className="font-light text-[clamp(10px,1.3vw,13px)] md:text-[clamp(11px,1.3vw,13px)] leading-relaxed text-white/60 my-1 md:my-1.5">
              {cert.description}
            </motion.p>
          )}

          {/* Skills Tags */}
          {cert.skills && cert.skills.length > 0 && (
            <motion.div variants={childVariants} className="flex flex-wrap gap-1.5 md:gap-2 justify-center mt-2">
              {cert.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 md:px-3 py-1 md:py-[5px] rounded-full md:rounded-2xl bg-[rgba(92,51,204,0.15)] border border-[rgba(92,51,204,0.3)] text-[9px] md:text-[10px] font-semibold text-lavender backdrop-blur-[10px] transition-all duration-300 hover:bg-[rgba(92,51,204,0.25)] hover:border-[rgba(92,51,204,0.5)] hover:-translate-y-0.5"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div variants={childVariants} className="flex gap-2 md:gap-3 justify-center mt-3 md:mt-4 flex-wrap md:flex-row">
            {cert.projectUrl && cert.projectUrl.trim() !== "" && cert.projectUrl !== "#" && (
              <a href={cert.projectUrl} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-initial">
                <button className="w-full bg-gradient-to-br from-[#5c33cc] to-[#ca2f8c] px-3 md:px-5 py-1.5 md:py-2.5 rounded-md md:rounded-lg border-none font-semibold text-[11px] md:text-sm cursor-pointer text-white transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_6px_16px_rgba(92,51,204,0.2)] flex items-center justify-center gap-1 md:gap-1.5 min-h-[32px] md:min-h-[42px] max-w-[120px] md:max-w-none mx-auto hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(92,51,204,0.35)] active:translate-y-0">
                  <span>View Project</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="md:w-3.5 md:h-3.5">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </a>
            )}

            {cert.articleUrl && cert.articleUrl.trim() !== "" && cert.articleUrl !== "#" && (
              <a href={cert.articleUrl} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-initial">
                <button className="w-full bg-transparent px-3 md:px-5 py-1.5 md:py-2.5 rounded-md md:rounded-lg border border-[rgba(92,51,204,0.5)] md:border-2 font-semibold text-[11px] md:text-sm cursor-pointer text-lavender transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center gap-1 md:gap-1.5 min-h-[32px] md:min-h-[42px] max-w-[120px] md:max-w-none mx-auto hover:bg-[rgba(92,51,204,0.1)] hover:border-lavender hover:text-white hover:-translate-y-0.5 active:translate-y-0">
                  <span>Read Article</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="md:w-3.5 md:h-3.5">
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

  // Mobile: Simple vertical scroll (NO SNAP, cards stack)
  if (isMobile) {
    return (
      <div className="w-full">
        {certifications.map((cert, index) => (
          <CertificationItem cert={cert} key={index} />
        ))}
      </div>
    );
  }

  // Desktop: Horizontal transform with snap
  return (
    <div className="h-[400vh] relative will-change-transform" ref={ref}>
      <motion.div
        className="sticky top-0 flex h-screen w-max will-change-transform overflow-hidden"
        style={{ x: smoothX }}
      >
        {certifications.map((cert, index) => (
          <CertificationItem cert={cert} key={index} />
        ))}
      </motion.div>

      <section />
      <section />
    </div>
  );
});

Certifications.displayName = 'Certifications';

export default Certifications;
