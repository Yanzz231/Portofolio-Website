import { useRef, memo, useState, useEffect } from "react";
import { Card, Frameworks } from "../components/ui";
import { Globe } from "../components/3d";
import { CvIcon } from "../components/icons";

const About = memo(() => {
  const grid2Container = useRef();
  const globeContainer = useRef();
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowGlobe(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (globeContainer.current) {
      observer.observe(globeContainer.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/images/misc/coding-pov.png"
            alt="Coding POV"
            loading="lazy"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Andrian Pratama</p>
            <p className="subtext">
              As an undergraduate Computer Science student at Bina Nusantara University and a Fullstack Developer with 3 years of experience in web and mobile application development, highly enthusiastic about system architecture and cloud technologies.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full relative"
          >
            <p className="font-bold text-gray-300 text-center px-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
              Soft Skills
            </p>
            <Card
              style={{ rotate: "20deg", top: "10%", left: "15%" }}
              text="Collaboration"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "25%", right: "20%" }}
              text="Adaptability"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "45deg", bottom: "25%", left: "10%" }}
              text="Analytical Thinking"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "60%", right: "15%" }}
              text="Problem Solving"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", bottom: "15%", right: "25%" }}
              text="Leadership"
              containerRef={grid2Container}
            />
          </div>
        </div>
        <div ref={globeContainer} className="grid-black-color grid-3">
          <div className="z-10 w-[60%]">
            <p className="headtext">Location</p>
            <p className="subtext">
              Based in Tangerang, Indonesia. Open to remote work worldwide
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            {showGlobe && <Globe />}
          </figure>
        </div>
        <div className="grid-special-color grid-4 relative overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-4 size-full z-10">
            <p className="text-center headtext">
              Download My CV
            </p>
            <a
              href="/CV.pdf"
              download="Andrian_Pratama_CV.pdf"
              className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-indigo to-royal rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg"
              style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}
            >
              Download CV
            </a>
          </div>
          <CvIcon className="absolute -top-20 -right-20 opacity-10" width={250} height={250} />
        </div>
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Teck Stack</p>
            <p className="subtext">
              I specialize in a variety of languages, frameworks, and tools taht
              allow me to build robust and scalable applications
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
